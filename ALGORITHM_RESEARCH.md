# Investigación del algoritmo de veinte preguntas

## Fuentes primarias

- La solicitud de patente estadounidense **US 2006/0230008 A1**, de Robin Burgener, describe una matriz bidireccional de objetos por preguntas. Las respuestas priorizan objetos y los objetos mejor clasificados priorizan preguntas. También indica que los candidatos se ponderan, no se eliminan rígidamente, para tolerar percepciones y respuestas inconsistentes.
- La misma solicitud describe dos criterios de selección: buscar una división Sí/No cercana al 50/50 y, periódicamente, elegir una pregunta que confirme o descarte al candidato líder.
- El recorrido y las preguntas frecuentes oficiales de 20Q describen la clasificación inicial Animal/Vegetal/Mineral/Otro, las respuestas graduadas, las suposiciones intermedias, que «No lo sé» no aporta evidencia y el aprendizaje posterior a la partida.
- La documentación oficial del juguete confirma la versión compacta de cuatro respuestas: Sí, No, A veces y No lo sé; después de un fallo puede formular cinco preguntas adicionales.

## Evidencia académica complementaria

- El problema distributivo de veinte preguntas se relaciona con códigos de Huffman: una estrategia óptima necesita, en promedio, entre `H(p)` y `H(p) + 1` preguntas cuando puede construir particiones arbitrarias.
- En presencia de respuestas ruidosas, la actualización bayesiana y la reducción esperada de entropía proporcionan una política robusta. La literatura de adquisición de conocimiento mediante 20 Questions también combina representación bayesiana y aprendizaje de relaciones entidad-pregunta.

## Traducción al motor de esta aplicación

1. Cada candidato mantiene una probabilidad posterior.
2. Sí, No y A veces se convierten en verosimilitudes con un suelo de ruido; «No lo sé» no altera el posterior.
3. Una pregunta se valora por información mutua: entropía de su respuesta menos la ambigüedad esperada de sus celdas candidato-pregunta.
4. Periódicamente se añade un bono a preguntas que separan al líder del resto.
5. Las preguntas visibles deben describir propiedades reales del dominio. No se emplean cortes alfabéticos: cuando faltan atributos, el motor prefiere reconocer la incertidumbre y aprender antes que romper la experiencia con una búsqueda por nombre.
6. Una partida acertada actualiza localmente las celdas observadas mediante una media limitada y suavizada con tres observaciones previas. Una derrota puede añadir un candidato y una pregunta diferenciadora.
7. El catálogo se divide por categoría y se carga bajo demanda; la pantalla inicial no descarga ni revela la lista completa.

## Diferencias deliberadas

La aplicación conserva Animal, Objeto, Lugar y Persona/personaje porque el catálogo disponible está organizado en esos cuatro dominios. Cambiar únicamente las etiquetas a Animal/Vegetal/Mineral/Otro produciría clasificaciones falsas y reduciría el porcentaje de acierto. La primera pregunta interna de animales sí sigue el ejemplo documentado de «encontrarlo en una granja»; los demás dominios comienzan con un filtro amplio equivalente.

En animales, los filtros taxonómicos y observables se ponderan por relevancia. Por ejemplo, un posible guepardo se separa mediante mamífero, felino, dieta carnívora, manchas, comparación de tamaño y velocidad, sin preguntar por su posición alfabética.

## Enlaces

- https://patentimages.storage.googleapis.com/41/59/17/cfd8c51aa658a2/US20060230008A1.pdf
- https://20q.net/quicktour.html
- https://20q.net/faq.html
- https://www.20q.net/static/I7044.pdf
- https://arxiv.org/abs/1611.01655
- https://doi.org/10.1239/jap/1331216837
- https://arxiv.org/abs/1806.08554
