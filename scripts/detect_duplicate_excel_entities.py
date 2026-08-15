"""Detecta entidades duplicadas en un Excel por igualdad de atributos.

El script lee un archivo .xlsx sin dependencias externas, identifica columnas de
identidad y compara el resto de columnas como firma de atributos. Dos o mas
filas con la misma firma se consideran duplicadas candidatas.

Ejemplos:
  python scripts/detect_duplicate_excel_entities.py catalogo.xlsx
  python scripts/detect_duplicate_excel_entities.py catalogo.xlsx --sheet Entidades --output duplicados.csv
  python scripts/detect_duplicate_excel_entities.py catalogo.xlsx --attribute-columns mammal,bird,fish
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import unicodedata
import zipfile
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree

XML_MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
XML_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"

DEFAULT_IDENTITY_HEADERS = {
    "id",
    "identificador",
    "entityid",
    "entity_id",
    "candidateid",
    "candidate_id",
    "nombre",
    "name",
    "entidad",
    "entity",
    "candidato",
    "candidate",
}
DEFAULT_CATEGORY_HEADERS = {"categoria", "category", "tipo", "type"}


@dataclass(frozen=True)
class SheetData:
    name: str
    rows: list[list[str]]


def normalized_header(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(char for char in value if not unicodedata.combining(char))
    return re.sub(r"[^a-z0-9_]+", "", value.casefold().replace(" ", "_"))


def normalized_cell(value: str) -> str:
    value = re.sub(r"\s+", " ", value.strip())
    lowered = value.casefold()
    aliases = {
        "verdadero": "true",
        "si": "true",
        "sí": "true",
        "yes": "true",
        "falso": "false",
        "no": "false",
    }
    return aliases.get(lowered, lowered)


def split_columns(value: str | None) -> set[str]:
    if not value:
        return set()
    return {normalized_header(item) for item in value.split(",") if item.strip()}


def col_index(cell_ref: str) -> int:
    letters = re.match(r"[A-Z]+", cell_ref)
    if not letters:
        return 0
    index = 0
    for char in letters.group(0):
        index = index * 26 + ord(char) - ord("A") + 1
    return index - 1


def xml_text(element: ElementTree.Element) -> str:
    return "".join(element.itertext())


def read_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    try:
        root = ElementTree.fromstring(archive.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    return [xml_text(item) for item in root.findall(f"{{{XML_MAIN_NS}}}si")]


def workbook_target_path(target: str) -> str:
    target = target.lstrip("/")
    if target.startswith("xl/"):
        return target
    return f"xl/{target}".replace("xl/../", "")


def read_workbook_sheets(archive: zipfile.ZipFile) -> list[tuple[str, str]]:
    workbook = ElementTree.fromstring(archive.read("xl/workbook.xml"))
    relationships = ElementTree.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    rels_by_id = {
        rel.attrib["Id"]: rel.attrib["Target"]
        for rel in relationships.findall(f"{{{PKG_REL_NS}}}Relationship")
    }
    sheets = []
    for sheet in workbook.findall(f".//{{{XML_MAIN_NS}}}sheet"):
        rel_id = sheet.attrib[f"{{{XML_REL_NS}}}id"]
        target = rels_by_id[rel_id]
        sheets.append((sheet.attrib["name"], workbook_target_path(target)))
    return sheets


def cell_value(cell: ElementTree.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        inline = cell.find(f"{{{XML_MAIN_NS}}}is")
        return xml_text(inline) if inline is not None else ""
    value = cell.find(f"{{{XML_MAIN_NS}}}v")
    if value is None:
        return ""
    text = value.text or ""
    if cell_type == "s":
        return shared_strings[int(text)] if text else ""
    if cell_type == "b":
        return "true" if text == "1" else "false"
    return text


def read_sheet(archive: zipfile.ZipFile, name: str, path: str, shared_strings: list[str]) -> SheetData:
    root = ElementTree.fromstring(archive.read(path))
    rows = []
    for row in root.findall(f".//{{{XML_MAIN_NS}}}row"):
        values: list[str] = []
        for cell in row.findall(f"{{{XML_MAIN_NS}}}c"):
            index = col_index(cell.attrib.get("r", "A1"))
            while len(values) <= index:
                values.append("")
            values[index] = cell_value(cell, shared_strings)
        rows.append(values)
    return SheetData(name=name, rows=rows)


def load_xlsx(path: Path, selected_sheet: str | None) -> SheetData:
    with zipfile.ZipFile(path) as archive:
        shared_strings = read_shared_strings(archive)
        sheets = read_workbook_sheets(archive)
        if selected_sheet:
            sheet_match = next(
                ((name, sheet_path) for name, sheet_path in sheets if name == selected_sheet),
                None,
            )
            if sheet_match is None and selected_sheet.isdigit():
                index = int(selected_sheet) - 1
                sheet_match = sheets[index] if 0 <= index < len(sheets) else None
            if sheet_match is None:
                available = ", ".join(name for name, _ in sheets)
                raise SystemExit(f"No existe la hoja '{selected_sheet}'. Hojas disponibles: {available}")
        else:
            sheet_match = sheets[0]
        return read_sheet(archive, sheet_match[0], sheet_match[1], shared_strings)


def row_value(row: list[str], index: int) -> str:
    return row[index] if index < len(row) else ""


def infer_columns(
    headers: list[str],
    attribute_columns: set[str],
    identity_columns: set[str],
    ignore_columns: set[str],
) -> tuple[list[int], list[int]]:
    normalized = [normalized_header(header) for header in headers]
    if attribute_columns:
        attribute_indexes = [index for index, header in enumerate(normalized) if header in attribute_columns]
    else:
        inferred_identity = DEFAULT_IDENTITY_HEADERS | DEFAULT_CATEGORY_HEADERS | identity_columns
        attribute_indexes = [
            index
            for index, header in enumerate(normalized)
            if header and header not in inferred_identity and header not in ignore_columns
        ]
    identity_indexes = [
        index
        for index, header in enumerate(normalized)
        if header in (DEFAULT_IDENTITY_HEADERS | DEFAULT_CATEGORY_HEADERS | identity_columns)
        and header not in ignore_columns
    ]
    return identity_indexes, attribute_indexes


def duplicate_groups(
    rows: Iterable[list[str]],
    attribute_indexes: list[int],
    category_index: int | None,
    ignore_empty_attributes: bool,
) -> dict[tuple[str, tuple[str, ...]], list[tuple[int, list[str]]]]:
    groups: dict[tuple[str, tuple[str, ...]], list[tuple[int, list[str]]]] = defaultdict(list)
    for row_number, row in rows:
        signature = tuple(normalized_cell(row_value(row, index)) for index in attribute_indexes)
        if ignore_empty_attributes and all(not value for value in signature):
            continue
        category = normalized_cell(row_value(row, category_index)) if category_index is not None else ""
        groups[(category, signature)].append((row_number, row))
    return {signature: members for signature, members in groups.items() if len(members) > 1}


def write_csv(
    output_path: Path | None,
    sheet_name: str,
    headers: list[str],
    identity_indexes: list[int],
    duplicates: dict[tuple[str, tuple[str, ...]], list[tuple[int, list[str]]]],
) -> None:
    destination = output_path.open("w", newline="", encoding="utf-8") if output_path else sys.stdout
    try:
        writer = csv.writer(destination)
        writer.writerow([
            "duplicate_group",
            "group_size",
            "sheet",
            "excel_row",
            *[headers[index] for index in identity_indexes],
            "attribute_signature",
        ])
        for group_number, (signature, members) in enumerate(duplicates.items(), start=1):
            for row_number, row in members:
                writer.writerow([
                    group_number,
                    len(members),
                    sheet_name,
                    row_number,
                    *[row_value(row, index) for index in identity_indexes],
                    json.dumps(signature[1], ensure_ascii=False, separators=(",", ":")),
                ])
    finally:
        if output_path:
            destination.close()


def main() -> int:
    parser = argparse.ArgumentParser(description="Detecta entidades con atributos duplicados en un .xlsx.")
    parser.add_argument("xlsx", type=Path, help="Ruta al archivo Excel .xlsx.")
    parser.add_argument("--sheet", help="Nombre de hoja o indice 1-based. Por defecto usa la primera hoja.")
    parser.add_argument("--header-row", type=int, default=1, help="Fila 1-based que contiene cabeceras.")
    parser.add_argument("--attribute-columns", help="Columnas de atributos separadas por coma. Si se omite, se infieren.")
    parser.add_argument("--identity-columns", help="Columnas adicionales de identidad separadas por coma.")
    parser.add_argument("--ignore-columns", help="Columnas a ignorar separadas por coma.")
    parser.add_argument("--category-column", help="Columna para separar duplicados por categoria.")
    parser.add_argument("--ignore-empty-attributes", action="store_true", help="Ignora filas sin atributos.")
    parser.add_argument("--output", type=Path, help="CSV de salida. Si se omite, escribe en stdout.")
    args = parser.parse_args()

    if not args.xlsx.exists():
        raise SystemExit(f"No existe el archivo: {args.xlsx}")

    sheet = load_xlsx(args.xlsx, args.sheet)
    if args.header_row < 1 or args.header_row > len(sheet.rows):
        raise SystemExit(f"La fila de cabecera {args.header_row} no existe en la hoja '{sheet.name}'.")

    headers = sheet.rows[args.header_row - 1]
    normalized_headers = [normalized_header(header) for header in headers]
    identity_columns = split_columns(args.identity_columns)
    ignore_columns = split_columns(args.ignore_columns)
    attribute_columns = split_columns(args.attribute_columns)
    identity_indexes, attribute_indexes = infer_columns(headers, attribute_columns, identity_columns, ignore_columns)
    if not attribute_indexes:
        raise SystemExit("No se encontraron columnas de atributos. Usa --attribute-columns o revisa las cabeceras.")

    category_index = None
    category_column = normalized_header(args.category_column) if args.category_column else None
    for index, header in enumerate(normalized_headers):
        if category_column and header == category_column:
            category_index = index
            break
        if not category_column and header in DEFAULT_CATEGORY_HEADERS:
            category_index = index
            break

    rows = list(enumerate(sheet.rows[args.header_row:], start=args.header_row + 1))
    duplicates = duplicate_groups(rows, attribute_indexes, category_index, args.ignore_empty_attributes)
    write_csv(args.output, sheet.name, headers, identity_indexes, duplicates)

    print(
        f"Analizadas {len(rows)} entidades; {len(duplicates)} grupos duplicados encontrados.",
        file=sys.stderr,
    )
    return 1 if duplicates else 0


if __name__ == "__main__":
    raise SystemExit(main())
