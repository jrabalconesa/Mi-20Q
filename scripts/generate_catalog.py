"""Genera el catálogo estático ampliado de 20Q a partir de fuentes abiertas.

Requiere WordNet + Open Multilingual WordNet disponibles mediante NLTK_DATA.
Los archivos de Pantheon y GeoNames se pasan por argumentos y solo se usan
durante la generación; la aplicación no realiza peticiones de red en ejecución.
"""

from __future__ import annotations

import argparse
import bz2
import csv
import json
import re
import unicodedata
import zipfile
from collections.abc import Iterable
from pathlib import Path
from typing import Any

from nltk.corpus import wordnet as wn


TARGET_PER_CATEGORY = 1000


def normalized_name(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    return "".join(char for char in value if not unicodedata.combining(char)).casefold()


def display_lemma(value: str) -> str:
    value = value.replace("_", " ").strip()
    return value[:1].upper() + value[1:]


def usable_name(value: str) -> bool:
    return (
        2 <= len(value) <= 52
        and any(char.isalpha() for char in value)
        and not any(char in value for char in "()[]{};=/\\")
    )


def ancestor_names(synset: Any) -> set[str]:
    ancestors = {synset.name()}
    for path in synset.hypernym_paths():
        ancestors.update(item.name() for item in path)
    return ancestors


def has_any(ancestors: set[str], roots: Iterable[str]) -> bool:
    return any(root in ancestors for root in roots)


ANIMAL_ROOTS: dict[str, tuple[str, ...]] = {
    "mammal": ("mammal.n.01",),
    "bird": ("bird.n.01",),
    "fish": ("fish.n.01",),
    "reptile": ("reptile.n.01",),
    "amphibian": ("amphibian.n.03",),
    "insect": ("insect.n.01",),
    "arachnid": ("arachnid.n.01",),
    "mollusk": ("mollusk.n.01",),
    "crustacean": ("crustacean.n.01",),
    "vertebrate": ("vertebrate.n.01",),
    "invertebrate": ("invertebrate.n.01",),
    "aquatic": ("aquatic_vertebrate.n.01", "marine_animal.n.01", "fish.n.01"),
}


OBJECT_ROOTS: dict[str, tuple[str, ...]] = {
    "tool": ("tool.n.01",),
    "vehicle": ("vehicle.n.01",),
    "furniture": ("furniture.n.01",),
    "wearable": ("clothing.n.01", "garment.n.01"),
    "device": ("device.n.01",),
    "machine": ("machine.n.01",),
    "musicalInstrument": ("musical_instrument.n.01",),
    "weapon": ("weapon.n.01",),
    "container": ("container.n.01",),
    "kitchen": ("kitchen_utensil.n.01", "cooking_utensil.n.01"),
    "gameEquipment": ("game_equipment.n.01", "sports_equipment.n.01"),
}


def wordnet_rows(
    lexname: str,
    prefix: str,
    roots: dict[str, tuple[str, ...]],
    target: int = TARGET_PER_CATEGORY,
    excluded_names: set[str] | None = None,
) -> list[list[Any]]:
    choices: list[tuple[int, int, str, Any]] = []
    animal_root = wn.synset("animal.n.01")
    human_root = wn.synset("human.n.01")
    for synset in wn.all_synsets("n"):
        if synset.lexname() != lexname:
            continue
        ancestors = {item for path in synset.hypernym_paths() for item in path}
        if lexname == "noun.animal" and (animal_root not in ancestors or human_root in ancestors):
            continue
        names = sorted({display_lemma(name) for name in synset.lemma_names("spa")}, key=lambda item: (-len(item), item))
        names = [name for name in names if usable_name(name)]
        if not names:
            continue
        frequency = max((lemma.count() for lemma in synset.lemmas("eng")), default=0)
        choices.append((-frequency, len(names[0]), names[0], synset))

    rows: list[list[Any]] = []
    seen: set[str] = set(excluded_names or set())
    for _, _, name, synset in sorted(choices, key=lambda item: item[:3]):
        normalized = normalized_name(name)
        if normalized in seen:
            continue
        seen.add(normalized)
        ancestors = ancestor_names(synset)
        attributes = {key: has_any(ancestors, values) for key, values in roots.items()}
        stable_id = re.sub(r"[^a-z0-9]+", "-", synset.name().lower()).strip("-")
        rows.append([f"{prefix}-{stable_id}", name, attributes])
        if len(rows) == target:
            return rows
    raise RuntimeError(f"Solo se encontraron {len(rows)} términos para {lexname}")


def birdnet_animal_rows(path: Path) -> list[list[Any]]:
    quotas = {"Aves": 250, "Mammalia": 200, "Insecta": 200, "Amphibia": 150, "Reptilia": 100}
    group_attributes: dict[str, dict[str, bool]] = {}
    for group in quotas:
        attributes = {key: False for key in ANIMAL_ROOTS}
        if group == "Aves":
            attributes.update({"bird": True, "vertebrate": True})
        elif group == "Mammalia":
            attributes.update({"mammal": True, "vertebrate": True})
        elif group == "Insecta":
            attributes.update({"insect": True, "invertebrate": True})
        elif group == "Amphibia":
            attributes.update({"amphibian": True, "vertebrate": True})
        elif group == "Reptilia":
            attributes.update({"reptile": True, "vertebrate": True})
        group_attributes[group] = attributes
    with path.open(encoding="utf-8") as source:
        records = list(csv.DictReader(source))
    records.sort(key=lambda row: -int(row.get("observations_count") or 0))

    rows: list[list[Any]] = []
    seen: set[str] = set()
    counts = {group: 0 for group in quotas}
    for record in records:
        group = record.get("taxon_group", "")
        if group not in quotas or counts[group] >= quotas[group]:
            continue
        name = (record.get("common_name_es") or record.get("common_name_es_ES") or "").strip()
        normalized = normalized_name(name)
        if not usable_name(name) or normalized in seen:
            continue
        seen.add(normalized)
        counts[group] += 1
        rows.append([f"birdnet-{record['birdnet_id'].lower()}", name, group_attributes[group]])

    missing = TARGET_PER_CATEGORY - len(rows)
    supplements = wordnet_rows("noun.animal", "wn-animal", ANIMAL_ROOTS, missing, seen)
    return rows + supplements


def read_country_continents(path: Path) -> dict[str, str]:
    result: dict[str, str] = {}
    with path.open(encoding="utf-8") as source:
        for line in source:
            if line.startswith("#"):
                continue
            fields = line.rstrip("\n").split("\t")
            if len(fields) > 8:
                result[fields[0]] = fields[8]
    return result


def place_rows(cities_zip: Path, country_info: Path) -> list[list[Any]]:
    continents = read_country_continents(country_info)
    records: list[dict[str, Any]] = []
    with zipfile.ZipFile(cities_zip) as archive:
        member = next(name for name in archive.namelist() if name.endswith(".txt"))
        with archive.open(member) as raw:
            for byte_line in raw:
                fields = byte_line.decode("utf-8").rstrip("\n").split("\t")
                if len(fields) < 19:
                    continue
                records.append({
                    "id": fields[0],
                    "name": fields[1],
                    "lat": float(fields[4]),
                    "lng": float(fields[5]),
                    "feature": fields[7],
                    "country": fields[8],
                    "population": int(fields[14] or 0),
                })

    rows: list[list[Any]] = []
    seen: set[str] = set()
    for record in sorted(records, key=lambda item: (-item["population"], item["name"])):
        name = record["name"].strip()
        normalized = normalized_name(name)
        if not usable_name(name) or normalized in seen:
            continue
        seen.add(normalized)
        continent = continents.get(record["country"], "")
        attributes = {
            "natural": False,
            "urban": True,
            "famous": record["population"] >= 1_000_000,
            "largeCity": record["population"] >= 1_000_000,
            "megaCity": record["population"] >= 5_000_000,
            "capital": record["feature"] == "PPLC",
            "mountain": False,
            "desert": False,
            "building": False,
            "europe": continent == "EU",
            "americas": continent in {"NA", "SA"},
            "asia": continent == "AS",
            "africa": continent == "AF",
            "oceania": continent == "OC",
            "northernHemisphere": record["lat"] >= 0,
            "southernHemisphere": record["lat"] < 0,
            "easternHemisphere": record["lng"] >= 0,
            "westernHemisphere": record["lng"] < 0,
        }
        rows.append([f"geonames-{record['id']}", name, attributes])
        if len(rows) == TARGET_PER_CATEGORY:
            return rows
    raise RuntimeError(f"Solo se encontraron {len(rows)} lugares")


def person_rows(pantheon_bz2: Path) -> list[list[Any]]:
    with bz2.open(pantheon_bz2, "rt", encoding="utf-8") as source:
        records = list(csv.DictReader(source, delimiter="\t"))
    records.sort(key=lambda row: -float(row.get("HPI") or 0))

    rows: list[list[Any]] = []
    seen: set[str] = set()
    for record in records:
        name = record["name"].strip()
        normalized = normalized_name(name)
        if not usable_name(name) or normalized in seen:
            continue
        seen.add(normalized)
        birth_year = int(float(record.get("birthyear") or 0))
        occupation = record.get("occupation", "").upper()
        domain = record.get("domain", "").upper()
        continent = record.get("continentName", "")
        artist = domain == "ARTS" or occupation in {
            "ACTOR", "COMPOSER", "DANCER", "FILM DIRECTOR", "MUSICIAN", "PAINTER", "SINGER"
        }
        attributes = {
            "realPerson": True,
            "historical": birth_year < 1900,
            "artist": artist,
            "sports": domain == "SPORTS",
            "scientist": domain == "SCIENCE" or occupation in {"ASTRONOMER", "CHEMIST", "PHYSICIST"},
            "politician": occupation in {"POLITICIAN", "POLITICAL SCIENTIST", "MILITARY PERSONNEL"},
            "writer": occupation in {"WRITER", "POET", "PLAYWRIGHT", "JOURNALIST"},
            "woman": record.get("gender", "").casefold() == "female",
            "europe": continent == "Europe",
            "americas": continent in {"North America", "South America"},
            "asia": continent == "Asia",
            "africa": continent == "Africa",
            "bornBefore1900": birth_year < 1900,
            "bornBefore1800": birth_year < 1800,
            "bornAfter1950": birth_year >= 1950,
        }
        rows.append([f"pantheon-{record['en_curid']}", name, attributes])
        if len(rows) == TARGET_PER_CATEGORY:
            return rows
    raise RuntimeError(f"Solo se encontraron {len(rows)} personas")


def emit_typescript(output: Path, rows: dict[str, list[list[Any]]]) -> None:
    output.mkdir(parents=True, exist_ok=True)
    for category, category_rows in rows.items():
        lines = [
            "// Archivo generado por scripts/generate_catalog.py. No editar a mano.",
            "// Fuentes: BirdNET+ Taxonomy, Princeton WordNet/OMW, GeoNames y Pantheon 1.0.",
            "import type { AttributeValue, Candidate } from '../../types/game'",
            "",
            "type CatalogRow = [id: string, name: string, attributes: Record<string, AttributeValue>]",
            "",
            "const rows: CatalogRow[] = [",
        ]
        lines.extend(f"  {json.dumps(row, ensure_ascii=False, separators=(',', ':'))}," for row in category_rows)
        lines.extend([
            "]",
            "",
            "export const generatedCandidates: Candidate[] = rows.map(([id, name, attributes]) => ({",
            f"  id, name, category: '{category}', attributes",
            "}))",
        ])
        (output / f"{category}.ts").write_text("\n".join(lines), encoding="utf-8", newline="\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pantheon", type=Path, required=True)
    parser.add_argument("--birdnet", type=Path, required=True)
    parser.add_argument("--cities", type=Path, required=True)
    parser.add_argument("--countries", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True, help="Directorio src/data/generated de salida")
    args = parser.parse_args()

    rows = {
        "animal": birdnet_animal_rows(args.birdnet),
        "object": wordnet_rows("noun.artifact", "wn-object", OBJECT_ROOTS),
        "place": place_rows(args.cities, args.countries),
        "person": person_rows(args.pantheon),
    }
    emit_typescript(args.out, rows)
    print({category: len(values) for category, values in rows.items()})


if __name__ == "__main__":
    main()
