# Fuentes de la base de conocimiento

El catálogo ampliado se genera de forma estática con `scripts/generate_catalog.py`. La aplicación publicada no consulta servicios externos durante una partida.

- **Animales:** nombres comunes españoles y grupos taxonómicos de [BirdNET+ Taxonomy](https://birdnet.cornell.edu/taxonomy/), complementados con [Princeton WordNet](https://wordnet.princeton.edu/) y [Open Multilingual WordNet](https://omwn.org/). BirdNET mantiene referencias a sus autoridades taxonómicas; OMW solo redistribuye wordnets con licencias abiertas.
- **Objetos:** Princeton WordNet y Open Multilingual WordNet. Se utilizan lemas españoles e hiperonimia para asignar tipos generales.
- **Lugares:** [GeoNames](https://www.geonames.org/), publicado con licencia Creative Commons Attribution 4.0. Se emplean nombres, población, coordenadas, capitalidad y continente.
- **Personas:** [Pantheon 1.0](https://pantheon.world/data/datasets), con licencia Creative Commons Attribution-ShareAlike 4.0. Referencia recomendada: Yu, A. Z. et al. (2016), *Pantheon 1.0, a manually verified dataset of globally famous biographies*.

El archivo resultante conserva identificadores de cada fuente para facilitar futuras correcciones. Los metadatos pueden contener errores o quedar desactualizados; por eso los 60 candidatos iniciales se mantienen como núcleo revisado manualmente.
