# Auditoría de secuencias de preguntas

Generado con `npm run audit:questions` el 2026-08-14T21:45:01.996Z.

El informe simula respuestas exactas para candidatos representativos. Si el motor hace una suposición incorrecta antes de 20 preguntas, la simulación responde que no y comprueba que la partida continúe.

## Resumen

| Categoría | Objetivo | Resultado | Preguntas | Suposiciones | Incidencias |
| --- | --- | --- | ---: | --- | --- |
| animal | Toro | OK | 6 | Toro | Sin incidencias |
| animal | Tigre | OK | 9 | Tigre | Sin incidencias |
| animal | Tiburón | OK | 10 | Tiburón | Sin incidencias |
| animal | Delfín | OK | 9 | Delfín | Sin incidencias |
| animal | Abeja | OK | 10 | Abeja | Sin incidencias |
| animal | Águila | OK | 8 | Águila | Sin incidencias |
| object | Cuchara | OK | 11 | Cuchara | Sin incidencias |
| object | Teléfono móvil | OK | 20 | Teléfono móvil | Sin incidencias |
| object | Silla | OK | 20 | Silla | Sin incidencias |
| object | Coche | OK | 20 | Coche | Sin incidencias |
| object | Libro | OK | 20 | Libro | Sin incidencias |
| object | Guitarra | OK | 8 | Guitarra | Sin incidencias |
| place | París | OK | 17 | París | Sin incidencias |
| place | Murcia | OK | 17 | Murcia | Sin incidencias |
| place | Cartagena (España) | OK | 17 | Cartagena (España) | Sin incidencias |
| place | Monte Everest | OK | 10 | Monte Everest | Sin incidencias |
| place | Gran Cañón | OK | 9 | Gran Cañón | Sin incidencias |
| place | Taj Mahal | OK | 17 | Taj Mahal | Sin incidencias |
| person | Mahatma Gandhi | OK | 19 | Mahatma Gandhi | Sin incidencias |
| person | Pedro Sánchez | OK | 20 | Pedro Sánchez | Sin incidencias |
| person | Don Quijote de la Mancha | OK | 6 | Don Quijote de la Mancha | Sin incidencias |
| person | Fernando Alonso | OK | 20 | Fernando Alonso | Sin incidencias |
| person | Rosalía | OK | 20 | Rosalía | Sin incidencias |
| person | Julio César | OK | 20 | Julio César | Sin incidencias |
| person | Elon Musk | OK | 10 | Elon Musk | Sin incidencias |

## Secuencias

### animal: Toro

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> Sí
3. ¿Es un animal doméstico, de granja o mascota común? -> Sí
4. ¿Tiene cuatro patas o más? -> Sí
5. ¿Es más grande que un perro? -> Sí
6. ¿Es un macho bovino, como un toro? -> Sí

**Suposiciones**
- Tras 6: Toro (acierto)

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
8. ¿Es un macho bovino, como un toro? -> No lo sé
9. ¿Tiene rayas? -> Sí

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
6. ¿Tiene plumas? -> No
7. ¿Tiene cuatro patas o más? -> No
8. ¿Tiene escamas? -> Sí
9. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
10. ¿Es más grande que un perro? -> Sí

**Suposiciones**
- Tras 10: Tiburón (acierto)

**Incidencias**: Sin incidencias.

### animal: Delfín

Estado: won. Preguntas: 9.

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

**Suposiciones**
- Tras 9: Delfín (acierto)

**Incidencias**: Sin incidencias.

### animal: Abeja

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es principalmente carnívoro o depredador? -> No
2. ¿Es un mamífero? -> No
3. ¿Es un animal doméstico, de granja o mascota común? -> No
4. ¿Es más grande que una caja de zapatos? -> No
5. ¿Puede ser peligroso para las personas? -> No
6. ¿Tiene plumas? -> No
7. ¿Tiene cuatro patas o más? -> Sí
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
6. ¿Tiene plumas? -> Sí
7. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí

**Suposiciones**
- Tras 8: Águila (acierto)

**Incidencias**: Sin incidencias.

### object: Cuchara

Estado: won. Preguntas: 11.

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

**Suposiciones**
- Tras 11: Cuchara (acierto)

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
8. ¿Tiene mango o asa para sujetarlo? -> No
9. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
10. ¿Es flexible o blando? -> No
11. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
12. ¿Es un cubierto o utensilio para comer? -> No
13. ¿Tiene una parte cóncava para recoger o contener algo? -> No
14. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
15. ¿Su función principal es almacenar, contener o transportar cosas? -> No
16. ¿Es un vehículo o medio de transporte? -> No
17. ¿Está hecho principalmente de metal o plástico? -> Sí
18. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
19. ¿Está asociado a un deporte o juego? -> No
20. ¿Es líquido? -> No

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
9. ¿Está asociado a un deporte o juego? -> No
10. ¿Es un cubierto o utensilio para comer? -> No
11. ¿Tiene una parte cóncava para recoger o contener algo? -> No
12. ¿Tiene mango o asa para sujetarlo? -> No
13. ¿Su función principal es almacenar, contener o transportar cosas? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es flexible o blando? -> No
16. ¿Es líquido? -> No
17. ¿Se usa para limpiar? -> No
18. ¿Es un vehículo o medio de transporte? -> No
19. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
20. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No

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
10. ¿Es un vehículo o medio de transporte? -> Sí
11. ¿Está asociado a un deporte o juego? -> No
12. ¿Es un cubierto o utensilio para comer? -> No
13. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
14. ¿Es líquido? -> No
15. ¿Tiene una parte cóncava para recoger o contener algo? -> No
16. ¿Tiene mango o asa para sujetarlo? -> No
17. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
18. ¿Está hecho principalmente de metal o plástico? -> Sí
19. ¿Es flexible o blando? -> No
20. ¿Se usa para limpiar? -> No

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
18. ¿Tiene una parte cóncava para recoger o contener algo? -> No
19. ¿Es un cubierto o utensilio para comer? -> No
20. ¿Es líquido? -> No

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

### place: París

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Es una ciudad, país o división política? -> Sí
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
9. ¿Es una capital? -> No lo sé
10. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
11. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
12. ¿Es un desierto o zona árida? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es un monumento famoso? -> No
17. ¿Está asociado principalmente a la religión? -> No

**Suposiciones**
- Tras 17: París (acierto)

**Incidencias**: Sin incidencias.

### place: Murcia

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es una ciudad, país o división política? -> Sí
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
9. ¿Es una capital? -> No
10. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
11. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
12. ¿Es un desierto o zona árida? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es un monumento famoso? -> No
17. ¿Está asociado principalmente a la religión? -> No

**Suposiciones**
- Tras 17: Murcia (acierto)

**Incidencias**: Sin incidencias.

### place: Cartagena (España)

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es una ciudad, país o división política? -> Sí
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
9. ¿Es una capital? -> No
10. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
11. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
12. ¿Es un desierto o zona árida? -> No
13. ¿Es una elevación natural, como una montaña o volcán? -> No
14. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
15. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
16. ¿Es un monumento famoso? -> No
17. ¿Está asociado principalmente a la religión? -> No

**Suposiciones**
- Tras 17: Cartagena (España) (acierto)

**Incidencias**: Sin incidencias.

### place: Monte Everest

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es una ciudad, país o división política? -> No
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Es una capital? -> No lo sé
8. ¿Es un desierto o zona árida? -> No
9. ¿Tiene acceso al mar o está junto a la costa? -> No
10. ¿Es una elevación natural, como una montaña o volcán? -> Sí

**Suposiciones**
- Tras 10: Monte Everest (acierto)

**Incidencias**: Sin incidencias.

### place: Gran Cañón

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es una ciudad, país o división política? -> No
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Es una capital? -> No lo sé
8. ¿Es un desierto o zona árida? -> Sí
9. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí

**Suposiciones**
- Tras 9: Gran Cañón (acierto)

**Incidencias**: Sin incidencias.

### place: Taj Mahal

Estado: won. Preguntas: 17.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Es una ciudad, país o división política? -> Sí
3. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
4. ¿Es un lugar real? -> Sí
5. ¿Existe de forma física y tangible? -> Sí
6. ¿Nació o se originó antes del año 1900? -> No lo sé
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
9. ¿Es una capital? -> No lo sé
10. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
11. ¿Es principalmente agua, como un río, lago, mar u océano? -> No
12. ¿Es una elevación natural, como una montaña o volcán? -> No
13. ¿Es un desierto o zona árida? -> No
14. ¿Es un lugar geográfico o una estructura construida por el hombre? -> Sí
15. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
16. ¿Es un monumento famoso? -> Sí
17. ¿Está asociado principalmente a la religión? -> No

**Suposiciones**
- Tras 17: Taj Mahal (acierto)

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
9. ¿Nació o se originó antes del año 1900? -> Sí
10. ¿Es conocido principalmente por escribir? -> No
11. ¿Es una figura histórica? -> Sí
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
3. ¿Es un personaje de ficción? -> No
4. ¿Es (o fue) una persona real de carne y hueso? -> Sí
5. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
6. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
7. ¿Nació o se originó antes del año 1900? -> No
8. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
9. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
10. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
11. ¿Nació después de 1950? -> Sí
12. ¿Tuvo o tiene poder político formal? -> Sí
13. ¿Pertenece al ámbito hispanohablante? -> No
14. ¿Es una persona o personaje de género femenino? -> No
15. ¿Está asociado a Roma o al Imperio romano? -> No
16. ¿Pertenece a la Antigüedad clásica? -> No
17. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
18. ¿Es una figura histórica? -> No
19. ¿Está asociado principalmente a Asia? -> No
20. ¿Es conocido por ser multimillonario? -> No

**Suposiciones**
- Tras 20: Pedro Sánchez (acierto)

**Incidencias**: Sin incidencias.

### person: Don Quijote de la Mancha

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es de origen español? -> Sí
3. ¿Es un personaje de ficción? -> Sí
4. ¿Es (o fue) una persona real de carne y hueso? -> No
5. ¿Pertenece al ámbito hispanohablante? -> Sí
6. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé

**Suposiciones**
- Tras 6: Don Quijote de la Mancha (acierto)

**Incidencias**: Sin incidencias.

### person: Fernando Alonso

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> Sí
3. ¿Es (o fue) una persona real de carne y hueso? -> Sí
4. ¿Es conocido principalmente por el deporte? -> Sí
5. ¿Se asocia normalmente a un equipo, grupo o banda? -> A veces
6. ¿Es una persona o personaje de género femenino? -> No
7. ¿Pertenece al ámbito hispanohablante? -> Sí
8. ¿Es conocido principalmente por la música? -> No
9. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
10. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
11. ¿Está asociado a Roma o al Imperio romano? -> No
12. ¿Es conocido principalmente por escribir? -> No
13. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
14. ¿Pertenece a la Antigüedad clásica? -> No
15. ¿Nació después de 1950? -> Sí
16. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
17. ¿Usa o usó un seudónimo o nombre artístico? -> No
18. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
19. ¿Nació o se originó antes del año 1900? -> No
20. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> No

**Suposiciones**
- Tras 20: Fernando Alonso (acierto)

**Incidencias**: Sin incidencias.

### person: Rosalía

Estado: won. Preguntas: 20.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es un personaje de ficción? -> No
4. ¿Es (o fue) una persona real de carne y hueso? -> Sí
5. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
6. ¿Nació después de 1950? -> Sí
7. ¿Es una persona o personaje de género femenino? -> Sí
8. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
9. ¿Es conocido principalmente por la música? -> Sí
10. ¿Usa o usó un seudónimo o nombre artístico? -> No
11. ¿Es conocido principalmente por el deporte? -> No
12. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
13. ¿Pertenece al ámbito hispanohablante? -> No
14. ¿Es conocido principalmente por escribir? -> No
15. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
16. ¿Está asociado a Roma o al Imperio romano? -> No
17. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No
18. ¿Pertenece a la Antigüedad clásica? -> No
19. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
20. ¿Nació o se originó antes del año 1900? -> No

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
6. ¿Nació o se originó antes del año 1900? -> Sí
7. ¿Es una persona o personaje de género femenino? -> No
8. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
9. ¿Está asociado principalmente a Asia? -> No
10. ¿Es una figura histórica? -> Sí
11. ¿Nació después de 1950? -> No
12. ¿Pertenece al ámbito hispanohablante? -> No
13. ¿Es conocido principalmente por escribir? -> No
14. ¿Es conocido principalmente por la música? -> No
15. ¿Es conocido principalmente por el deporte? -> No
16. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
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
3. ¿Es un personaje de ficción? -> No
4. ¿Es (o fue) una persona real de carne y hueso? -> Sí
5. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
6. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
7. ¿Nació o se originó antes del año 1900? -> No
8. ¿Se asocia normalmente a un equipo, grupo o banda? -> No lo sé
9. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
10. ¿Nació después de 1950? -> Sí

**Suposiciones**
- Tras 10: Elon Musk (acierto)

**Incidencias**: Sin incidencias.
