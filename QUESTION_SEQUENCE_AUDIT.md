# Auditoría de secuencias de preguntas

Generado con `npm run audit:questions` el 2026-08-14T22:43:05.905Z.

El informe simula respuestas exactas para candidatos representativos. Si el motor hace una suposición incorrecta antes de 20 preguntas, la simulación responde que no y comprueba que la partida continúe.

## Resumen

| Categoría | Objetivo | Resultado | Preguntas | Suposiciones | Incidencias |
| --- | --- | --- | ---: | --- | --- |
| animal | Toro | OK | 8 | Toro | Sin incidencias |
| animal | Tigre | OK | 9 | Tigre | Sin incidencias |
| animal | Tiburón | OK | 10 | Tiburón | Sin incidencias |
| animal | Delfín | OK | 12 | Delfín | Sin incidencias |
| animal | Abeja | OK | 10 | Abeja | Sin incidencias |
| animal | Águila | OK | 8 | Águila | Sin incidencias |
| animal | Lobo | OK | 11 | Lobo | Sin incidencias |
| animal | Cabra | OK | 10 | Cabra | Sin incidencias |
| animal | Pato | OK | 8 | Pato | Sin incidencias |
| animal | Pulpo | OK | 11 | Pulpo | Sin incidencias |
| object | Cuchara | OK | 13 | Cuchara | Sin incidencias |
| object | Teléfono móvil | OK | 20 | Teléfono móvil | Sin incidencias |
| object | Silla | OK | 20 | Silla | Sin incidencias |
| object | Coche | OK | 20 | Coche | Sin incidencias |
| object | Libro | OK | 20 | Libro | Sin incidencias |
| object | Guitarra | OK | 8 | Guitarra | Sin incidencias |
| object | Lámpara | OK | 20 | Lámpara | Sin incidencias |
| object | Llave | OK | 20 | Llave | Sin incidencias |
| object | Botella | OK | 13 | Botella | Sin incidencias |
| object | Balón | OK | 20 | Balón | Sin incidencias |
| object | Mochila | OK | 17 | Mochila | Sin incidencias |
| place | París | OK | 16 | París | Sin incidencias |
| place | Murcia | OK | 18 | Murcia | Sin incidencias |
| place | Cartagena (España) | OK | 20 | Cartagena (España) | Sin incidencias |
| place | Madrid | OK | 16 | Madrid | Sin incidencias |
| place | Barcelona | OK | 20 | Barcelona | Sin incidencias |
| place | Sevilla | OK | 14 | Sevilla | Sin incidencias |
| place | Valencia | OK | 20 | Valencia | Sin incidencias |
| place | Zaragoza | OK | 20 | Zaragoza | Sin incidencias |
| place | Bilbao | OK | 15 | Bilbao | Sin incidencias |
| place | Las Palmas de Gran Canaria | OK | 17 | Las Palmas de Gran Canaria | Sin incidencias |
| place | Santa Cruz de Tenerife | OK | 17 | Santa Cruz de Tenerife | Sin incidencias |
| place | Ceuta | OK | 17 | Ceuta | Sin incidencias |
| place | Melilla | OK | 17 | Melilla | Sin incidencias |
| place | Islas Canarias | OK | 8 | Islas Canarias | Sin incidencias |
| place | Islas Baleares | OK | 8 | Islas Baleares | Sin incidencias |
| place | Río Amazonas | OK | 10 | Río Amazonas | Sin incidencias |
| place | Río Nilo | OK | 8 | Río Nilo | Sin incidencias |
| place | Monte Everest | OK | 11 | Monte Everest | Sin incidencias |
| place | Gran Cañón | OK | 10 | Gran Cañón | Sin incidencias |
| place | Taj Mahal | OK | 18 | Taj Mahal | Sin incidencias |
| person | Mahatma Gandhi | OK | 19 | Mahatma Gandhi | Sin incidencias |
| person | Pedro Sánchez | OK | 20 | Pedro Sánchez | Sin incidencias |
| person | Don Quijote de la Mancha | OK | 11 | Don Quijote de la Mancha | Sin incidencias |
| person | Fernando Alonso | OK | 20 | Fernando Alonso | Sin incidencias |
| person | Rosalía | OK | 20 | Rosalía | Sin incidencias |
| person | Julio César | OK | 20 | Julio César | Sin incidencias |
| person | Elon Musk | OK | 10 | Elon Musk | Sin incidencias |
| person | Hipatia de Alejandría | OK | 20 | Hipatia de Alejandría | Sin incidencias |
| person | Zeus | OK | 12 | Zeus | Sin incidencias |
| person | Poseidón | OK | 14 | Poseidón | Sin incidencias |
| person | Afrodita | OK | 12 | Afrodita | Sin incidencias |
| person | Hércules | OK | 11 | Hércules | Sin incidencias |
| person | Ulises | OK | 12 | Ulises | Sin incidencias |
| person | Cupido | OK | 13 | Cupido | Sin incidencias |
| person | Ares | OK | 13 | Ares | Sin incidencias |
| person | Marte | OK | 11 | Marte | Sin incidencias |
| person | Minotauro | OK | 14 | Minotauro | Sin incidencias |
| person | Atenea | OK | 12 | Atenea | Sin incidencias |
| person | Medusa | OK | 13 | Medusa | Sin incidencias |
| person | Perseo | OK | 11 | Perseo | Sin incidencias |
| person | Orión | OK | 11 | Orión | Sin incidencias |
| person | Casiopea | OK | 14 | Casiopea | Sin incidencias |
| person | Centauro | OK | 13 | Centauro | Sin incidencias |
| person | Sherlock Holmes | OK | 8 | Sherlock Holmes | Sin incidencias |
| person | Harry Potter | OK | 6 | Harry Potter | Sin incidencias |
| person | Mafalda | OK | 6 | Mafalda | Sin incidencias |

## Secuencias

### animal: Toro

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> Sí
4. ¿Es más grande que una caja de zapatos? -> Sí
5. ¿Es más grande que un perro? -> Sí
6. ¿Tiene manchas en el pelaje? -> A veces
7. ¿Es un macho bovino, como un toro? -> Sí
8. ¿Tiene cornamenta o cuernos visibles? -> Sí

**Suposiciones**
- Tras 8: Toro (acierto)

**Incidencias**: Sin incidencias.

### animal: Tigre

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Tiene cuatro patas o más? -> Sí
7. ¿Es más grande que un perro? -> Sí
8. ¿Tiene rayas? -> Sí
9. ¿Vive normalmente en España o en la fauna ibérica? -> No

**Suposiciones**
- Tras 9: Tigre (acierto)

**Incidencias**: Sin incidencias.

### animal: Tiburón

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Es un ave? -> No
7. ¿Tiene cuatro patas o más? -> No
8. ¿Tiene escamas? -> Sí
9. ¿Es un reptil? -> No
10. ¿Es más grande que un perro? -> Sí

**Suposiciones**
- Tras 10: Tiburón (acierto)

**Incidencias**: Sin incidencias.

### animal: Delfín

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> No
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Nace de un huevo? -> No
7. ¿Vive normalmente en España o en la fauna ibérica? -> No
8. ¿Es más grande que un perro? -> Sí
9. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
10. ¿Tiene rayas? -> No lo sé
11. ¿Tiene manchas en el pelaje? -> No lo sé
12. ¿Es un felino? -> No lo sé

**Suposiciones**
- Tras 12: Delfín (acierto)

**Incidencias**: Sin incidencias.

### animal: Abeja

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Es más grande que una caja de zapatos? -> No
5. ¿Puede ser peligroso para las personas? -> No
6. ¿Es un ave? -> No
7. ¿Es un insecto? -> Sí
8. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
9. ¿Es un animal vertebrado? -> No lo sé
10. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí

**Suposiciones**
- Tras 10: Abeja (acierto)

**Incidencias**: Sin incidencias.

### animal: Águila

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Es un ave? -> Sí
7. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí

**Suposiciones**
- Tras 8: Águila (acierto)

**Incidencias**: Sin incidencias.

### animal: Lobo

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Tiene cuatro patas o más? -> Sí
7. ¿Es más grande que un perro? -> A veces
8. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
9. ¿Tiene rayas? -> No lo sé
10. ¿Tiene manchas en el pelaje? -> No lo sé
11. ¿Es un felino? -> No lo sé

**Suposiciones**
- Tras 11: Lobo (acierto)

**Incidencias**: Sin incidencias.

### animal: Cabra

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> Sí
4. ¿Es más grande que una caja de zapatos? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Tiene rayas? -> No lo sé
7. ¿Tiene manchas en el pelaje? -> No lo sé
8. ¿Es un felino? -> No lo sé
9. ¿Tiene cornamenta o cuernos visibles? -> Sí
10. ¿Es más grande que un perro? -> A veces

**Suposiciones**
- Tras 10: Cabra (acierto)

**Incidencias**: Sin incidencias.

### animal: Pato

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Es más grande que una caja de zapatos? -> No
5. ¿Puede ser peligroso para las personas? -> No
6. ¿Es un ave? -> Sí
7. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí

**Suposiciones**
- Tras 8: Pato (acierto)

**Incidencias**: Sin incidencias.

### animal: Pulpo

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> Sí
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Puede ser peligroso para las personas? -> No
5. ¿Es más grande que una caja de zapatos? -> No
6. ¿Es un ave? -> No
7. ¿Tiene cuatro patas o más? -> No
8. ¿Tiene escamas? -> No
9. ¿Es un animal vertebrado? -> No
10. ¿Nace de un huevo? -> Sí
11. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí

**Suposiciones**
- Tras 11: Pulpo (acierto)

**Incidencias**: Sin incidencias.

### object: Cuchara

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Su función principal es almacenar, contener o transportar cosas? -> No
8. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
9. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
10. ¿Está hecho principalmente de metal o plástico? -> Sí
11. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> Sí
12. ¿Tiene una parte cóncava para recoger o contener algo? -> Sí
13. ¿Es un cubierto o utensilio para comer? -> Sí

**Suposiciones**
- Tras 13: Cuchara (acierto)

**Incidencias**: Sin incidencias.

### object: Teléfono móvil

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
7. ¿Es más grande que una caja de zapatos? -> No
8. ¿Tiene pantalla? -> Sí
9. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
10. ¿Tiene mango o asa para sujetarlo? -> No
11. ¿Tiene una parte cóncava para recoger o contener algo? -> No
12. ¿Es un mueble? -> No
13. ¿Es flexible o blando? -> No
14. ¿Su función principal es almacenar, contener o transportar cosas? -> No
15. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
16. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
17. ¿Es un vehículo o medio de transporte? -> No
18. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
19. ¿Está hecho principalmente de metal o plástico? -> Sí
20. ¿Se usa para limpiar? -> No

**Suposiciones**
- Tras 20: Teléfono móvil (acierto)

**Incidencias**: Sin incidencias.

### object: Silla

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> No
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
7. ¿Es más grande que una caja de zapatos? -> Sí
8. ¿Está hecho principalmente de metal o plástico? -> No
9. ¿Es un mueble? -> Sí
10. ¿Tiene una parte cóncava para recoger o contener algo? -> No
11. ¿Tiene pantalla? -> No
12. ¿Tiene mango o asa para sujetarlo? -> No
13. ¿Está asociado a un deporte o juego? -> No
14. ¿Su función principal es almacenar, contener o transportar cosas? -> No
15. ¿Es flexible o blando? -> No
16. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
17. ¿Es líquido? -> No
18. ¿Se usa para limpiar? -> No
19. ¿Es un vehículo o medio de transporte? -> No
20. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No

**Suposiciones**
- Tras 20: Silla (acierto)

**Incidencias**: Sin incidencias.

### object: Coche

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> No
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es más grande que una caja de zapatos? -> Sí
7. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
8. ¿Su función principal es almacenar, contener o transportar cosas? -> Sí
9. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
10. ¿Tiene pantalla? -> No
11. ¿Está asociado a un deporte o juego? -> No
12. ¿Es líquido? -> No
13. ¿Tiene una parte cóncava para recoger o contener algo? -> No
14. ¿Tiene mango o asa para sujetarlo? -> No
15. ¿Es un vehículo o medio de transporte? -> Sí
16. ¿Es un mueble? -> No
17. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
18. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
19. ¿Está hecho principalmente de metal o plástico? -> Sí
20. ¿Es flexible o blando? -> No

**Suposiciones**
- Tras 20: Coche (acierto)

**Incidencias**: Sin incidencias.

### object: Libro

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Su función principal es almacenar, contener o transportar cosas? -> No
8. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
9. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
10. ¿Está hecho principalmente de metal o plástico? -> No
11. ¿Es más grande que una caja de zapatos? -> No
12. ¿Está asociado a un deporte o juego? -> No
13. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es un vehículo o medio de transporte? -> No
16. ¿Es flexible o blando? -> No
17. ¿Tiene mango o asa para sujetarlo? -> No
18. ¿Es un mueble? -> No
19. ¿Tiene una parte cóncava para recoger o contener algo? -> No
20. ¿Tiene pantalla? -> No

**Suposiciones**
- Tras 20: Libro (acierto)

**Incidencias**: Sin incidencias.

### object: Guitarra

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
7. ¿Es más grande que una caja de zapatos? -> Sí
8. ¿Tiene mango o asa para sujetarlo? -> Sí

**Suposiciones**
- Tras 8: Guitarra (acierto)

**Incidencias**: Sin incidencias.

### object: Lámpara

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> A veces
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es más grande que una caja de zapatos? -> No
7. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
8. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
9. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
10. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
11. ¿Está hecho principalmente de metal o plástico? -> Sí
12. ¿Su función principal es almacenar, contener o transportar cosas? -> No
13. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
14. ¿Es un vehículo o medio de transporte? -> No
15. ¿Está asociado a un deporte o juego? -> No
16. ¿Tiene pantalla? -> No
17. ¿Es un mueble? -> A veces
18. ¿Tiene mango o asa para sujetarlo? -> No
19. ¿Tiene una parte cóncava para recoger o contener algo? -> No
20. ¿Es flexible o blando? -> No

**Suposiciones**
- Tras 20: Lámpara (acierto)

**Incidencias**: Sin incidencias.

### object: Llave

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Su función principal es almacenar, contener o transportar cosas? -> No
8. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
9. ¿Está hecho principalmente de metal o plástico? -> Sí
10. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
11. ¿Tiene pantalla? -> No
12. ¿Tiene mango o asa para sujetarlo? -> No
13. ¿Tiene una parte cóncava para recoger o contener algo? -> No
14. ¿Es flexible o blando? -> No
15. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
16. ¿Es un mueble? -> No
17. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
18. ¿Está asociado a un deporte o juego? -> No
19. ¿Es líquido? -> No
20. ¿Se usa para limpiar? -> No

**Suposiciones**
- Tras 20: Llave (acierto)

**Incidencias**: Sin incidencias.

### object: Botella

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Su función principal es almacenar, contener o transportar cosas? -> Sí
8. ¿Tiene una parte cóncava para recoger o contener algo? -> Sí
9. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> Sí
10. ¿Tiene mango o asa para sujetarlo? -> No
11. ¿Está hecho principalmente de metal o plástico? -> A veces
12. ¿Es más grande que una caja de zapatos? -> No
13. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí

**Suposiciones**
- Tras 13: Botella (acierto)

**Incidencias**: Sin incidencias.

### object: Balón

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Su función principal es almacenar, contener o transportar cosas? -> No
8. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
9. ¿Está hecho principalmente de metal o plástico? -> No
10. ¿Está asociado a un deporte o juego? -> Sí
11. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
12. ¿Es más grande que una caja de zapatos? -> No
13. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es un vehículo o medio de transporte? -> No
16. ¿Es flexible o blando? -> A veces
17. ¿Tiene una parte cóncava para recoger o contener algo? -> No
18. ¿Tiene mango o asa para sujetarlo? -> No
19. ¿Tiene pantalla? -> No
20. ¿Es un mueble? -> No

**Suposiciones**
- Tras 20: Balón (acierto)

**Incidencias**: Sin incidencias.

### object: Mochila

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es comestible? -> No
4. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> Sí
7. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
8. ¿Su función principal es almacenar, contener o transportar cosas? -> Sí
9. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
10. ¿Está hecho principalmente de metal o plástico? -> No
11. ¿Está asociado a un deporte o juego? -> No
12. ¿Es más grande que una caja de zapatos? -> No
13. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
14. ¿Es un vehículo o medio de transporte? -> No
15. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
16. ¿Es flexible o blando? -> Sí
17. ¿Tiene mango o asa para sujetarlo? -> Sí

**Suposiciones**
- Tras 17: Mochila (acierto)

**Incidencias**: Sin incidencias.

### place: París

Estado: won. Preguntas: 16.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Es una ciudad, país o división política? -> Sí
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Tiene acceso al mar o está junto a la costa? -> No
7. ¿Nació o se originó antes del año 1900? -> Sí
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
9. ¿Está en América? -> No
10. ¿Es una capital? -> Sí
11. ¿Está en Europa? -> Sí
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Está en Francia? -> Sí

**Suposiciones**
- Tras 16: París (acierto)

**Incidencias**: Sin incidencias.

### place: Murcia

Estado: won. Preguntas: 18.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en Europa? -> Sí
9. ¿Está junto al estrecho de Gibraltar? -> No lo sé
10. ¿Está en la isla de Tenerife? -> No lo sé
11. ¿Está en la isla de Gran Canaria? -> No lo sé
12. ¿Es capital de una comunidad autónoma? -> Sí
13. ¿Es una ciudad grande o muy poblada? -> Sí
14. ¿Está en Andalucía? -> No
15. ¿Está en la Región de Murcia? -> Sí
16. ¿Es una capital? -> No
17. ¿Es capital de provincia? -> Sí
18. ¿Es una ciudad autónoma? -> No

**Suposiciones**
- Tras 18: Murcia (acierto)

**Incidencias**: Sin incidencias.

### place: Cartagena (España)

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> Sí
9. ¿Está junto al estrecho de Gibraltar? -> No lo sé
10. ¿Está en la isla de Tenerife? -> No lo sé
11. ¿Está en la isla de Gran Canaria? -> No lo sé
12. ¿Está en Andalucía? -> No
13. ¿Está en Galicia? -> No
14. ¿Está en el País Vasco? -> No
15. ¿Es capital de una comunidad autónoma? -> No
16. ¿Es capital de provincia? -> No
17. ¿Está en la Región de Murcia? -> Sí
18. ¿Es una ciudad autónoma? -> No
19. ¿Es una isla o un archipiélago? -> No
20. ¿Es una ciudad grande o muy poblada? -> No

**Suposiciones**
- Tras 20: Cartagena (España) (acierto)

**Incidencias**: Sin incidencias.

### place: Madrid

Estado: won. Preguntas: 16.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en Europa? -> Sí
9. ¿Está junto al estrecho de Gibraltar? -> No lo sé
10. ¿Está en la isla de Tenerife? -> No lo sé
11. ¿Está en la isla de Gran Canaria? -> No lo sé
12. ¿Es capital de una comunidad autónoma? -> Sí
13. ¿Es una ciudad grande o muy poblada? -> Sí
14. ¿Está en Andalucía? -> No
15. ¿Está en la Región de Murcia? -> No
16. ¿Está en la Comunidad de Madrid? -> Sí

**Suposiciones**
- Tras 16: Madrid (acierto)

**Incidencias**: Sin incidencias.

### place: Barcelona

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Nació o se originó antes del año 1900? -> Sí
9. ¿Está en Europa? -> Sí
10. ¿Es una capital? -> No
11. ¿Está en América? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de una comunidad autónoma? -> Sí
17. ¿Está junto al estrecho de Gibraltar? -> No lo sé
18. ¿Está en la isla de Tenerife? -> No lo sé
19. ¿Está en la isla de Gran Canaria? -> No lo sé
20. ¿Está en la Comunidad Valenciana? -> No

**Suposiciones**
- Tras 20: Barcelona (acierto)

**Incidencias**: Sin incidencias.

### place: Sevilla

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en Europa? -> Sí
9. ¿Está junto al estrecho de Gibraltar? -> No lo sé
10. ¿Está en la isla de Tenerife? -> No lo sé
11. ¿Está en la isla de Gran Canaria? -> No lo sé
12. ¿Es capital de una comunidad autónoma? -> Sí
13. ¿Es una ciudad grande o muy poblada? -> Sí
14. ¿Está en Andalucía? -> Sí

**Suposiciones**
- Tras 14: Sevilla (acierto)

**Incidencias**: Sin incidencias.

### place: Valencia

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Nació o se originó antes del año 1900? -> Sí
9. ¿Está en Europa? -> Sí
10. ¿Es una capital? -> No
11. ¿Está en América? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de una comunidad autónoma? -> Sí
17. ¿Está junto al estrecho de Gibraltar? -> No lo sé
18. ¿Está en la isla de Tenerife? -> No lo sé
19. ¿Está en la isla de Gran Canaria? -> No lo sé
20. ¿Está en la Comunidad Valenciana? -> Sí

**Suposiciones**
- Tras 20: Valencia (acierto)

**Incidencias**: Sin incidencias.

### place: Zaragoza

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Nació o se originó antes del año 1900? -> Sí
9. ¿Está en Europa? -> Sí
10. ¿Es una capital? -> No
11. ¿Está en América? -> No
12. ¿Es una elevación natural, como una montaña o volcán? -> No
13. ¿Es un desierto o zona árida? -> No
14. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Está junto al estrecho de Gibraltar? -> No lo sé
17. ¿Está en la isla de Tenerife? -> No lo sé
18. ¿Está en la isla de Gran Canaria? -> No lo sé
19. ¿Está en Aragón? -> Sí
20. ¿Es capital de una comunidad autónoma? -> Sí

**Suposiciones**
- Tras 20: Zaragoza (acierto)

**Incidencias**: Sin incidencias.

### place: Bilbao

Estado: won. Preguntas: 15.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> Sí
9. ¿Está junto al estrecho de Gibraltar? -> No lo sé
10. ¿Está en la isla de Tenerife? -> No lo sé
11. ¿Está en la isla de Gran Canaria? -> No lo sé
12. ¿Está en Andalucía? -> No
13. ¿Está en Galicia? -> No
14. ¿Está en el País Vasco? -> Sí
15. ¿Es capital de una comunidad autónoma? -> No

**Suposiciones**
- Tras 15: Bilbao (acierto)

**Incidencias**: Sin incidencias.

### place: Las Palmas de Gran Canaria

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> No
9. ¿Está en América? -> No
10. ¿Nació o se originó antes del año 1900? -> Sí
11. ¿Es una capital? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de provincia? -> Sí
17. ¿Está en la isla de Tenerife? -> No

**Suposiciones**
- Tras 17: Las Palmas de Gran Canaria (acierto)

**Incidencias**: Sin incidencias.

### place: Santa Cruz de Tenerife

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> No
9. ¿Está en América? -> No
10. ¿Nació o se originó antes del año 1900? -> Sí
11. ¿Es una capital? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de provincia? -> Sí
17. ¿Está en la isla de Tenerife? -> Sí

**Suposiciones**
- Tras 17: Santa Cruz de Tenerife (acierto)

**Incidencias**: Sin incidencias.

### place: Ceuta

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> No
9. ¿Está en América? -> No
10. ¿Nació o se originó antes del año 1900? -> Sí
11. ¿Es una capital? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de provincia? -> No
17. ¿Está junto al estrecho de Gibraltar? -> Sí

**Suposiciones**
- Tras 17: Ceuta (acierto)

**Incidencias**: Sin incidencias.

### place: Melilla

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en Europa? -> No
9. ¿Está en América? -> No
10. ¿Nació o se originó antes del año 1900? -> Sí
11. ¿Es una capital? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es capital de provincia? -> No
17. ¿Está junto al estrecho de Gibraltar? -> No

**Suposiciones**
- Tras 17: Melilla (acierto)

**Incidencias**: Sin incidencias.

### place: Islas Canarias

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Está en Europa? -> No
8. ¿Está en América? -> No

**Suposiciones**
- Tras 8: Islas Canarias (acierto)

**Incidencias**: Sin incidencias.

### place: Islas Baleares

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
7. ¿Está en Europa? -> Sí
8. ¿Tiene acceso al mar o está junto a la costa? -> Sí

**Suposiciones**
- Tras 8: Islas Baleares (acierto)

**Incidencias**: Sin incidencias.

### place: Río Amazonas

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Es una ciudad, país o división política? -> No
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Es principalmente agua, como un río, lago, mar u océano? -> Sí
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
9. ¿Está en América? -> Sí
10. ¿Es un desierto o zona árida? -> No

**Suposiciones**
- Tras 10: Río Amazonas (acierto)

**Incidencias**: Sin incidencias.

### place: Río Nilo

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Es una ciudad, país o división política? -> No
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Es principalmente agua, como un río, lago, mar u océano? -> Sí
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No

**Suposiciones**
- Tras 8: Río Nilo (acierto)

**Incidencias**: Sin incidencias.

### place: Monte Everest

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
8. ¿Tiene acceso al mar o está junto a la costa? -> No
9. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
10. ¿Es un desierto o zona árida? -> No
11. ¿Es una elevación natural, como una montaña o volcán? -> Sí

**Suposiciones**
- Tras 11: Monte Everest (acierto)

**Incidencias**: Sin incidencias.

### place: Gran Cañón

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
8. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
9. ¿Es un desierto o zona árida? -> Sí
10. ¿Está en América? -> Sí

**Suposiciones**
- Tras 10: Gran Cañón (acierto)

**Incidencias**: Sin incidencias.

### place: Taj Mahal

Estado: won. Preguntas: 18.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Tiene acceso al mar o está junto a la costa? -> No
7. ¿Nació o se originó antes del año 1900? -> No lo sé
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
9. ¿Es una capital? -> No lo sé
10. ¿Está en Europa? -> No
11. ¿Está en América? -> No
12. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Es un desierto o zona árida? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es una ciudad grande o muy poblada? -> No lo sé
17. ¿Es un monumento famoso? -> Sí
18. ¿Está asociado principalmente a la religión? -> No

**Suposiciones**
- Tras 18: Taj Mahal (acierto)

**Incidencias**: Sin incidencias.

### person: Mahatma Gandhi

Estado: won. Preguntas: 19.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> No
5. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
7. ¿Está asociado principalmente a Asia? -> Sí
8. ¿Es una persona o personaje de género femenino? -> No
9. ¿Es una figura histórica? -> Sí
10. ¿Es conocido principalmente por escribir? -> No
11. ¿Nació o se originó antes del año 1900? -> Sí
12. ¿Nació después de 1950? -> No
13. ¿Es conocido principalmente por la música? -> No
14. ¿Pertenece al ámbito hispanohablante? -> No
15. ¿Es conocido principalmente por el deporte? -> No
16. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
17. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
18. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> Sí
19. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí

**Suposiciones**
- Tras 19: Mahatma Gandhi (acierto)

**Incidencias**: Sin incidencias.

### person: Pedro Sánchez

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
5. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No
7. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
8. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
9. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
10. ¿Nació después de 1950? -> Sí
11. ¿Tuvo o tiene poder político formal? -> Sí
12. ¿Pertenece al ámbito hispanohablante? -> No
13. ¿Es una persona o personaje de género femenino? -> No
14. ¿Está asociado a Roma o al Imperio romano? -> No
15. ¿Pertenece a la Antigüedad clásica? -> No
16. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
17. ¿Es una figura histórica? -> No
18. ¿Está asociado principalmente a Asia? -> No
19. ¿Es conocido por ser multimillonario? -> No
20. ¿Es conocido principalmente por el deporte? -> No

**Suposiciones**
- Tras 20: Pedro Sánchez (acierto)

**Incidencias**: Sin incidencias.

### person: Don Quijote de la Mancha

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> Sí
3. ¿Es un personaje de ficción? -> Sí
4. ¿Es (o fue) una persona real de carne y hueso? -> No
5. ¿Es un personaje de cómic o tira cómica? -> No lo sé
6. ¿Está asociado a la magia? -> No lo sé
7. ¿Es conocido como detective? -> No lo sé
8. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
9. ¿Pertenece a la mitología griega? -> No
10. ¿Es conocido principalmente por escribir? -> Sí
11. ¿Pertenece al ámbito hispanohablante? -> Sí

**Suposiciones**
- Tras 11: Don Quijote de la Mancha (acierto)

**Incidencias**: Sin incidencias.

### person: Fernando Alonso

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> Sí
3. ¿Es un personaje de ficción? -> No
4. ¿Es (o fue) una persona real de carne y hueso? -> Sí
5. ¿Es conocido principalmente por el deporte? -> Sí
6. ¿Se asocia normalmente a un equipo, grupo o banda? -> A veces
7. ¿Es una persona o personaje de género femenino? -> No
8. ¿Pertenece al ámbito hispanohablante? -> Sí
9. ¿Es conocido principalmente por la música? -> No
10. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
11. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
12. ¿Está asociado a Roma o al Imperio romano? -> No
13. ¿Es conocido principalmente por escribir? -> No
14. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
15. ¿Pertenece a la Antigüedad clásica? -> No
16. ¿Nació después de 1950? -> Sí
17. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
18. ¿Usa o usó un seudónimo o nombre artístico? -> No
19. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
20. ¿Nació o se originó antes del año 1900? -> No

**Suposiciones**
- Tras 20: Fernando Alonso (acierto)

**Incidencias**: Sin incidencias.

### person: Rosalía

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
5. ¿Nació después de 1950? -> Sí
6. ¿Es una persona o personaje de género femenino? -> Sí
7. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
8. ¿Es conocido principalmente por la música? -> Sí
9. ¿Usa o usó un seudónimo o nombre artístico? -> No
10. ¿Es conocido principalmente por el deporte? -> No
11. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
12. ¿Pertenece al ámbito hispanohablante? -> No
13. ¿Es conocido principalmente por escribir? -> No
14. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
15. ¿Está asociado a Roma o al Imperio romano? -> No
16. ¿Pertenece a la Antigüedad clásica? -> No
17. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
18. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
19. ¿Nació o se originó antes del año 1900? -> No
20. ¿Está asociado principalmente a Asia? -> No

**Suposiciones**
- Tras 20: Rosalía (acierto)

**Incidencias**: Sin incidencias.

### person: Julio César

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
5. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
6. ¿Es una figura histórica? -> Sí
7. ¿Es una persona o personaje de género femenino? -> No
8. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
9. ¿Está asociado principalmente a Asia? -> No
10. ¿Nació o se originó antes del año 1900? -> Sí
11. ¿Nació después de 1950? -> No
12. ¿Pertenece al ámbito hispanohablante? -> No
13. ¿Es conocido principalmente por escribir? -> No
14. ¿Es conocido principalmente por la música? -> No
15. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
16. ¿Es conocido principalmente por el deporte? -> No
17. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
18. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
19. ¿Está asociado a Roma o al Imperio romano? -> Sí
20. ¿Pertenece a la Antigüedad clásica? -> Sí

**Suposiciones**
- Tras 20: Julio César (acierto)

**Incidencias**: Sin incidencias.

### person: Elon Musk

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
5. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No
7. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
8. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
9. ¿Nació después de 1950? -> Sí
10. ¿Es conocido por ser multimillonario? -> Sí

**Suposiciones**
- Tras 10: Elon Musk (acierto)

**Incidencias**: Sin incidencias.

### person: Hipatia de Alejandría

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
5. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
6. ¿Está asociado principalmente a Asia? -> No
7. ¿Es una persona o personaje de género femenino? -> Sí
8. ¿Nació después de 1950? -> No
9. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
10. ¿Es una figura histórica? -> Sí
11. ¿Es conocido principalmente por escribir? -> No
12. ¿Nació o se originó antes del año 1900? -> Sí
13. ¿Pertenece al ámbito hispanohablante? -> No
14. ¿Es conocido principalmente por la música? -> No
15. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
16. ¿Es conocido principalmente por el deporte? -> No
17. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
18. ¿Pertenece a la Antigüedad clásica? -> Sí
19. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
20. ¿Tuvo o tiene poder político formal? -> No

**Suposiciones**
- Tras 20: Hipatia de Alejandría (acierto)

**Incidencias**: Sin incidencias.

### person: Zeus

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> Sí
11. ¿Es una persona o personaje de género femenino? -> No
12. ¿Es el dios principal del Olimpo? -> Sí

**Suposiciones**
- Tras 12: Zeus (acierto)

**Incidencias**: Sin incidencias.

### person: Poseidón

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> Sí
11. ¿Es una persona o personaje de género femenino? -> No
12. ¿Es el dios principal del Olimpo? -> No
13. ¿Está asociado principalmente a la guerra? -> No
14. ¿Está asociado principalmente al mar? -> Sí

**Suposiciones**
- Tras 14: Poseidón (acierto)

**Incidencias**: Sin incidencias.

### person: Afrodita

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> Sí
11. ¿Es una persona o personaje de género femenino? -> Sí
12. ¿Está asociado al amor o la belleza? -> Sí

**Suposiciones**
- Tras 12: Afrodita (acierto)

**Incidencias**: Sin incidencias.

### person: Hércules

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> Sí
7. ¿Es un personaje de cómic o tira cómica? -> No lo sé
8. ¿Está asociado a la magia? -> No lo sé
9. ¿Es conocido como detective? -> No lo sé
10. ¿Es conocido por vencer a un monstruo mitológico? -> Sí
11. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> Sí

**Suposiciones**
- Tras 11: Hércules (acierto)

**Incidencias**: Sin incidencias.

### person: Ulises

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> Sí
7. ¿Es un personaje de cómic o tira cómica? -> No lo sé
8. ¿Está asociado a la magia? -> No lo sé
9. ¿Es conocido como detective? -> No lo sé
10. ¿Es conocido por vencer a un monstruo mitológico? -> No
11. ¿Es famoso por un largo viaje legendario? -> Sí
12. ¿Está asociado principalmente al mar? -> A veces

**Suposiciones**
- Tras 12: Ulises (acierto)

**Incidencias**: Sin incidencias.

### person: Cupido

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> No
11. ¿Está asociado principalmente a la guerra? -> No
12. ¿Pertenece a la mitología romana? -> Sí
13. ¿Está asociado al amor o la belleza? -> Sí

**Suposiciones**
- Tras 13: Cupido (acierto)

**Incidencias**: Sin incidencias.

### person: Ares

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> Sí
11. ¿Es una persona o personaje de género femenino? -> No
12. ¿Es el dios principal del Olimpo? -> No
13. ¿Está asociado principalmente a la guerra? -> Sí

**Suposiciones**
- Tras 13: Ares (acierto)

**Incidencias**: Sin incidencias.

### person: Marte

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> No
11. ¿Está asociado principalmente a la guerra? -> Sí

**Suposiciones**
- Tras 11: Marte (acierto)

**Incidencias**: Sin incidencias.

### person: Minotauro

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> No
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es un personaje de cómic o tira cómica? -> No lo sé
9. ¿Está asociado a la magia? -> No lo sé
10. ¿Es conocido como detective? -> No lo sé
11. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
12. ¿Es una persona o personaje de género femenino? -> No
13. ¿Es mitad humano y mitad animal? -> No
14. ¿Es una criatura monstruosa de la mitología? -> Sí

**Suposiciones**
- Tras 14: Minotauro (acierto)

**Incidencias**: Sin incidencias.

### person: Atenea

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> Sí
6. ¿Es un personaje de cómic o tira cómica? -> No lo sé
7. ¿Está asociado a la magia? -> No lo sé
8. ¿Es conocido como detective? -> No lo sé
9. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
10. ¿Pertenece a la mitología griega? -> Sí
11. ¿Es una persona o personaje de género femenino? -> Sí
12. ¿Está asociado al amor o la belleza? -> No

**Suposiciones**
- Tras 12: Atenea (acierto)

**Incidencias**: Sin incidencias.

### person: Medusa

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> No
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es un personaje de cómic o tira cómica? -> No lo sé
9. ¿Está asociado a la magia? -> No lo sé
10. ¿Es conocido como detective? -> No lo sé
11. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
12. ¿Es una persona o personaje de género femenino? -> Sí
13. ¿Es una criatura monstruosa de la mitología? -> Sí

**Suposiciones**
- Tras 13: Medusa (acierto)

**Incidencias**: Sin incidencias.

### person: Perseo

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> Sí
7. ¿Es un personaje de cómic o tira cómica? -> No lo sé
8. ¿Está asociado a la magia? -> No lo sé
9. ¿Es conocido como detective? -> No lo sé
10. ¿Es conocido por vencer a un monstruo mitológico? -> Sí
11. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No

**Suposiciones**
- Tras 11: Perseo (acierto)

**Incidencias**: Sin incidencias.

### person: Orión

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> Sí
7. ¿Es un personaje de cómic o tira cómica? -> No lo sé
8. ¿Está asociado a la magia? -> No lo sé
9. ¿Es conocido como detective? -> No lo sé
10. ¿Es conocido por vencer a un monstruo mitológico? -> No
11. ¿Es famoso por un largo viaje legendario? -> No

**Suposiciones**
- Tras 11: Orión (acierto)

**Incidencias**: Sin incidencias.

### person: Casiopea

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> No
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es un personaje de cómic o tira cómica? -> No lo sé
9. ¿Está asociado a la magia? -> No lo sé
10. ¿Es conocido como detective? -> No lo sé
11. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
12. ¿Es una persona o personaje de género femenino? -> Sí
13. ¿Es una criatura monstruosa de la mitología? -> No
14. ¿También da nombre a una constelación? -> Sí

**Suposiciones**
- Tras 14: Casiopea (acierto)

**Incidencias**: Sin incidencias.

### person: Centauro

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> No
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es un personaje de cómic o tira cómica? -> No lo sé
9. ¿Está asociado a la magia? -> No lo sé
10. ¿Es conocido como detective? -> No lo sé
11. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
12. ¿Es una persona o personaje de género femenino? -> No
13. ¿Es mitad humano y mitad animal? -> Sí

**Suposiciones**
- Tras 13: Centauro (acierto)

**Incidencias**: Sin incidencias.

### person: Sherlock Holmes

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es un dios o una diosa? -> No
6. ¿Es un héroe o semidiós de la mitología? -> No
7. ¿Pertenece a la mitología griega? -> No
8. ¿Es una figura histórica? -> No

**Suposiciones**
- Tras 8: Sherlock Holmes (acierto)

**Incidencias**: Sin incidencias.

### person: Harry Potter

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es una persona o personaje de género femenino? -> No
6. ¿Aparece principalmente en cine, televisión o espectáculos? -> Sí

**Suposiciones**
- Tras 6: Harry Potter (acierto)

**Incidencias**: Sin incidencias.

### person: Mafalda

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es (o fue) una persona real de carne y hueso? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es una persona o personaje de género femenino? -> Sí
6. ¿Es conocido como detective? -> No lo sé

**Suposiciones**
- Tras 6: Mafalda (acierto)

**Incidencias**: Sin incidencias.
