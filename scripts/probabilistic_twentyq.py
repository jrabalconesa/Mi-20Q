from __future__ import annotations

import math
import re
import sys
import zipfile
from dataclasses import dataclass
from pathlib import Path

SMOOTHED_NO = 0.02
SMOOTHED_YES = 0.98
SMOOTHED_SOMETIMES = 0.5

AttributeValue = bool | float
Answer = str


@dataclass(frozen=True)
class Question:
    id: str
    text: str
    attribute: str
    categories: tuple[str, ...]


@dataclass(frozen=True)
class Candidate:
    name: str
    category: str
    attributes: dict[str, AttributeValue]


QUESTION_SPECS: tuple[Question, ...] = (
    Question("universal_artificial_or_fictional", "¿Es un objeto o personaje de ficción / creado por el ser humano?", "artificialOrFictional", ("animal", "object", "place", "person")),
    Question("universal_indoors", "¿Se puede encontrar normalmente en interiores o dentro de una casa?", "indoors", ("animal", "object", "place", "person")),
    Question("universal_larger_shoebox", "¿Es más grande que una caja de zapatos?", "largerThanShoebox", ("animal", "object", "place", "person")),
    Question("universal_digital_electronic", "¿Se interactúa con ello principalmente de forma digital o electrónica?", "digitalOrElectronic", ("animal", "object", "place", "person")),
    Question("universal_tangible", "¿Existe de forma física y tangible?", "tangible", ("animal", "object", "place", "person")),
    Question("animal_vertebrate", "¿Es un animal vertebrado?", "vertebrate", ("animal",)),
    Question("animal_mammal", "¿Es un mamífero?", "mammal", ("animal",)),
    Question("animal_domestic_farm_pet", "¿Es un animal doméstico, de granja o mascota común?", "domesticFarmPet", ("animal",)),
    Question("animal_air_or_water", "¿Suele desplazarse principalmente por el aire o el agua?", "movesByAirOrWater", ("animal",)),
    Question("animal_carnivore_predator", "¿Es principalmente carnívoro o depredador?", "carnivore", ("animal",)),
    Question("animal_four_or_more_legs", "¿Tiene cuatro patas o más?", "fourOrMoreLegs", ("animal",)),
    Question("animal_feline_or_canid", "¿Pertenece a la familia de los felinos o cánidos?", "felineOrCanid", ("animal",)),
    Question("object_moving_mechanical_electronic", "¿Tiene partes móviles, mecánicas o electrónicas?", "movingMechanicalElectronic", ("object",)),
    Question("object_work_study_tool", "¿Se utiliza principalmente como una herramienta de trabajo o estudio?", "workStudyTool", ("object",)),
    Question("object_store_contain_transport", "¿Su función principal es almacenar, contener o transportar cosas?", "storeContainTransport", ("object",)),
    Question("object_wearable", "¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo?", "wearable", ("object",)),
    Question("object_kitchen_food", "¿Se utiliza principalmente en la cocina o está relacionado con la alimentación?", "kitchenFood", ("object",)),
    Question("object_metal_or_plastic", "¿Está hecho principalmente de metal o plástico?", "metalOrPlastic", ("object",)),
    Question("person_real", "¿Es (o fue) una persona real de carne y hueso?", "realPerson", ("person",)),
    Question("culture_before_1900", "¿Nació o se originó antes del año 1900?", "before1900", ("place", "person")),
    Question("person_art_entertainment_sport", "¿Es una figura conocida principalmente por el arte, entretenimiento o deporte?", "artEntertainmentSport", ("person",)),
    Question("place_geographic_or_built", "¿Es un lugar geográfico o una estructura construida por el hombre?", "geographicOrBuilt", ("place",)),
    Question("culture_western_hemisphere", "¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)?", "westernHemisphere", ("place", "person")),
    Question("person_woman", "¿Es una persona o personaje de género femenino?", "woman", ("person",)),
    Question("person_science_politics_leadership", "¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico?", "sciencePoliticsLeadership", ("person",)),
)


DEMO_CANDIDATES: tuple[Candidate, ...] = (
    Candidate("Tigre", "animal", {"artificialOrFictional": False, "indoors": False, "largerThanShoebox": True, "digitalOrElectronic": False, "tangible": True, "vertebrate": True, "mammal": True, "domesticFarmPet": False, "movesByAirOrWater": False, "carnivore": True, "fourOrMoreLegs": True, "felineOrCanid": True}),
    Candidate("Ardilla", "animal", {"artificialOrFictional": False, "indoors": False, "largerThanShoebox": 0.5, "digitalOrElectronic": False, "tangible": True, "vertebrate": True, "mammal": True, "domesticFarmPet": False, "movesByAirOrWater": False, "carnivore": False, "fourOrMoreLegs": True, "felineOrCanid": False}),
    Candidate("Delfín", "animal", {"artificialOrFictional": False, "indoors": False, "largerThanShoebox": True, "digitalOrElectronic": False, "tangible": True, "vertebrate": True, "mammal": True, "domesticFarmPet": False, "movesByAirOrWater": True, "carnivore": True, "fourOrMoreLegs": False, "felineOrCanid": False}),
    Candidate("Silla", "object", {"artificialOrFictional": True, "indoors": True, "largerThanShoebox": True, "digitalOrElectronic": False, "tangible": True, "movingMechanicalElectronic": False, "workStudyTool": False, "storeContainTransport": False, "wearable": False, "kitchenFood": False, "metalOrPlastic": 0.5}),
    Candidate("Marie Curie", "person", {"artificialOrFictional": False, "indoors": 0.5, "largerThanShoebox": True, "digitalOrElectronic": False, "tangible": True, "realPerson": True, "before1900": True, "artEntertainmentSport": False, "westernHemisphere": True, "woman": True, "sciencePoliticsLeadership": True}),
    Candidate("París", "place", {"artificialOrFictional": True, "indoors": False, "largerThanShoebox": True, "digitalOrElectronic": False, "tangible": True, "before1900": True, "geographicOrBuilt": True, "westernHemisphere": True}),
)


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip()).casefold()


def question_part(text: str) -> str | None:
    match = re.search(r"¿[^?]+\?", text)
    return match.group(0).strip() if match else None


def extract_questions_from_docx(docx_path: Path) -> list[str]:
    with zipfile.ZipFile(docx_path) as archive:
        xml = archive.read("word/document.xml").decode("utf-8")
    texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", xml)
    paragraphs = " ".join(re.sub(r"<[^>]+>", "", text) for text in texts)
    return [question for question in (question_part(part) for part in re.split(r"(?=¿)", paragraphs)) if question]


def load_questions_from_word(docx_path: Path) -> list[Question]:
    extracted = extract_questions_from_docx(docx_path)
    specs_by_text = {normalize_text(question.text): question for question in QUESTION_SPECS}
    loaded = [specs_by_text[normalize_text(text)] for text in extracted if normalize_text(text) in specs_by_text]
    if len(loaded) != 25:
        raise ValueError(f"Se esperaban 25 preguntas optimizadas y se cargaron {len(loaded)} desde {docx_path}")
    return loaded


def smooth(value: AttributeValue | None) -> float:
    if value is True:
        return SMOOTHED_YES
    if value is False:
        return SMOOTHED_NO
    if isinstance(value, (int, float)):
        return min(SMOOTHED_YES, max(SMOOTHED_NO, float(value)))
    return SMOOTHED_SOMETIMES


def answer_probability(answer: Answer) -> float:
    return {"si": SMOOTHED_YES, "sí": SMOOTHED_YES, "no": SMOOTHED_NO, "a veces": SMOOTHED_SOMETIMES}.get(answer, SMOOTHED_SOMETIMES)


def entropy(distribution: dict[str, float]) -> float:
    return -sum(probability * math.log2(probability) for probability in distribution.values() if probability > 0)


def select_next_question(
    questions: list[Question],
    candidates: list[Candidate],
    posterior: dict[str, float],
    asked: set[str],
) -> Question:
    current_entropy = entropy(posterior)
    ranked: list[tuple[float, float, str, Question]] = []
    for question in questions:
        if question.id in asked:
            continue
        compatible = [candidate for candidate in candidates if candidate.category in question.categories]
        mean = sum(posterior[candidate.name] * smooth(candidate.attributes.get(question.attribute)) for candidate in compatible)
        mass = sum(posterior[candidate.name] for candidate in compatible) or 1.0
        mean /= mass
        distance = abs(mean - 0.5)
        entropy_score = current_entropy * (1 - distance * 2)
        ranked.append((distance, -entropy_score, question.id, question))
    return sorted(ranked)[0][3]


def update_posterior(
    question: Question,
    answer: Answer,
    candidates: list[Candidate],
    posterior: dict[str, float],
) -> dict[str, float]:
    actual = answer_probability(answer)
    weights: dict[str, float] = {}
    for candidate in candidates:
        expected = smooth(candidate.attributes.get(question.attribute))
        likelihood = min(SMOOTHED_YES, max(SMOOTHED_NO, 1 - abs(expected - actual)))
        weights[candidate.name] = posterior[candidate.name] * likelihood
    total = sum(weights.values()) or 1.0
    return {name: weight / total for name, weight in weights.items()}


def answer_for_target(target: Candidate, question: Question) -> Answer:
    expected = smooth(target.attributes.get(question.attribute))
    if expected >= 0.75:
        return "sí"
    if expected <= 0.25:
        return "no"
    return "a veces"


def simulate_first_three_turns(questions: list[Question], target_name: str = "Tigre") -> None:
    target = next(candidate for candidate in DEMO_CANDIDATES if candidate.name == target_name)
    candidates = [candidate for candidate in DEMO_CANDIDATES if candidate.category == target.category]
    category_questions = [question for question in questions if target.category in question.categories]
    posterior = {candidate.name: 1 / len(candidates) for candidate in candidates}
    asked: set[str] = set()

    print(f"Simulación rápida; categoría: {target.category}; objetivo oculto: {target.name}")
    for turn in range(1, 4):
        question = select_next_question(category_questions, candidates, posterior, asked)
        answer = answer_for_target(target, question)
        asked.add(question.id)
        posterior = update_posterior(question, answer, candidates, posterior)
        leader, probability = max(posterior.items(), key=lambda item: item[1])
        print(f"Turno {turn}: {question.text} -> {answer} | líder: {leader} ({probability:.3f}) | entropía: {entropy(posterior):.3f}")


def default_docx_path() -> Path:
    return Path.home() / "Downloads" / "Mi 20Q" / "📋 Mi 20Q_Nuevo Listado Maestro de Preguntas.docx"


def main(argv: list[str]) -> int:
    docx_path = Path(argv[1]) if len(argv) > 1 else default_docx_path()
    questions = load_questions_from_word(docx_path)
    print(f"Preguntas cargadas desde Word: {len(questions)}")
    simulate_first_three_turns(questions)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
