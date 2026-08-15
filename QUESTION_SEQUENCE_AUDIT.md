# Auditoría de secuencias de preguntas

Generado con `npm run audit:questions` el 2026-08-15T12:15:22.272Z.

El informe simula respuestas exactas para candidatos representativos. Si el motor hace una suposición incorrecta antes de 20 preguntas, la simulación responde que no y comprueba que la partida continúe.

## Resumen

| Categoría | Objetivo | Resultado | Preguntas | Suposiciones | Incidencias |
| --- | --- | --- | ---: | --- | --- |
| animal | Ornitorrinco | OK | 8 | Ornitorrinco | Sin incidencias |
| animal | Toro | OK | 7 | Toro | Sin incidencias |
| animal | Tigre | OK | 12 | Tigre | Sin incidencias |
| animal | Tiburón | OK | 8 | Tiburón | Sin incidencias |
| animal | Delfín | OK | 6 | Ballena (fallo), Delfín | Hace una o más suposiciones incorrectas antes del final. |
| animal | Abeja | OK | 4 | Abeja | Sin incidencias |
| animal | Águila | OK | 10 | Águila | Sin incidencias |
| animal | Búho | OK | 9 | Búho | Sin incidencias |
| animal | Lobo | OK | 11 | Lobo | Sin incidencias |
| animal | Cabra | OK | 9 | Cabra | Sin incidencias |
| animal | Pato | OK | 8 | Pato | Sin incidencias |
| animal | Ganso | OK | 8 | Ganso | Sin incidencias |
| animal | Pulpo | OK | 10 | Pulpo | Sin incidencias |
| animal | Cigüeña | OK | 10 | Cigüeña | Sin incidencias |
| animal | Hipopótamo | OK | 11 | Hipopótamo | Sin incidencias |
| animal | Rinoceronte | OK | 8 | Rinoceronte | Sin incidencias |
| animal | Jirafa | OK | 8 | Jirafa | Sin incidencias |
| animal | Cebra | OK | 12 | Cebra | Sin incidencias |
| animal | Canguro | OK | 6 | Ballena (fallo), Delfín (fallo), Canguro | Hace una o más suposiciones incorrectas antes del final. |
| animal | Panda | OK | 14 | Panda | Sin incidencias |
| object | Cuchara | OK | 10 | Cuchara | Sin incidencias |
| object | Teléfono móvil | OK | 6 | Teléfono móvil | Sin incidencias |
| object | Silla | OK | 7 | Silla | Sin incidencias |
| object | Coche | OK | 6 | Coche | Sin incidencias |
| object | Libro | OK | 12 | Libro | Sin incidencias |
| object | Guitarra | OK | 6 | Guitarra | Sin incidencias |
| object | Lámpara | OK | 10 | Lámpara | Sin incidencias |
| object | Llave | OK | 11 | Llave | Sin incidencias |
| object | Botella | OK | 10 | Botella | Sin incidencias |
| object | Balón | OK | 9 | Balón | Sin incidencias |
| object | Mochila | OK | 6 | Mochila | Sin incidencias |
| place | París | OK | 5 | París | Sin incidencias |
| place | Murcia | OK | 13 | Murcia | Sin incidencias |
| place | Cartagena (España) | OK | 11 | Cartagena (España) | Sin incidencias |
| place | Madrid | OK | 14 | Madrid | Sin incidencias |
| place | Barcelona | OK | 6 | Barcelona | Sin incidencias |
| place | Sevilla | OK | 8 | Córdoba (fallo), Granada (fallo), Jaén (fallo), Sevilla | Hace una o más suposiciones incorrectas antes del final. |
| place | Valencia | OK | 6 | Alicante (fallo), Castellón de la Plana (fallo), Valencia | Hace una o más suposiciones incorrectas antes del final. |
| place | Zaragoza | OK | 8 | Huesca (fallo), Teruel (fallo), Zaragoza | Hace una o más suposiciones incorrectas antes del final. |
| place | Bilbao | OK | 10 | Bilbao | Sin incidencias |
| place | Las Palmas de Gran Canaria | OK | 11 | Las Palmas de Gran Canaria | Sin incidencias |
| place | Santa Cruz de Tenerife | OK | 11 | Santa Cruz de Tenerife | Sin incidencias |
| place | Ceuta | OK | 11 | Ceuta | Sin incidencias |
| place | Melilla | OK | 11 | Melilla | Sin incidencias |
| place | Islas Canarias | OK | 10 | Islas Canarias | Sin incidencias |
| place | Islas Baleares | OK | 8 | Islas Baleares | Sin incidencias |
| place | Río Amazonas | OK | 3 | Nueva York (fallo), Machu Picchu (fallo), Gran Cañón (fallo), Río Amazonas | Hace una o más suposiciones incorrectas antes del final. |
| place | Río Nilo | OK | 3 | Playa (fallo), Bosque (fallo), Desierto del Sáhara (fallo), Monte Everest (fallo), Taj Mahal (fallo), Río Nilo | Hace una o más suposiciones incorrectas antes del final. |
| place | Monte Everest | OK | 3 | Playa (fallo), Bosque (fallo), Desierto del Sáhara (fallo), Monte Everest | Hace una o más suposiciones incorrectas antes del final. |
| place | Gran Cañón | OK | 3 | Nueva York (fallo), Machu Picchu (fallo), Gran Cañón | Hace una o más suposiciones incorrectas antes del final. |
| place | Taj Mahal | OK | 3 | Playa (fallo), Bosque (fallo), Desierto del Sáhara (fallo), Monte Everest (fallo), Taj Mahal | Hace una o más suposiciones incorrectas antes del final. |
| person | Mahatma Gandhi | OK | 10 | Mahatma Gandhi | Sin incidencias |
| person | Pedro Sánchez | OK | 8 | Pedro Sánchez | Sin incidencias |
| person | Don Quijote de la Mancha | OK | 7 | Don Quijote de la Mancha | Sin incidencias |
| person | Fernando Alonso | OK | 7 | Fernando Alonso | Sin incidencias |
| person | Rosalía | OK | 11 | Rosalía | Sin incidencias |
| person | Julio César | OK | 8 | Julio César | Sin incidencias |
| person | Elon Musk | OK | 10 | Elon Musk | Sin incidencias |
| person | Hipatia de Alejandría | OK | 10 | Hipatia de Alejandría | Sin incidencias |
| person | Zeus | OK | 9 | Zeus | Sin incidencias |
| person | Poseidón | OK | 11 | Poseidón | Sin incidencias |
| person | Afrodita | OK | 9 | Afrodita | Sin incidencias |
| person | Hércules | OK | 10 | Hércules | Sin incidencias |
| person | Ulises | OK | 11 | Ulises | Sin incidencias |
| person | Cupido | OK | 10 | Cupido | Sin incidencias |
| person | Ares | OK | 10 | Ares | Sin incidencias |
| person | Marte | OK | 8 | Marte | Sin incidencias |
| person | Minotauro | OK | 9 | Minotauro | Sin incidencias |
| person | Atenea | OK | 9 | Atenea | Sin incidencias |
| person | Medusa | OK | 10 | Minotauro (fallo), Medusa | Hace una o más suposiciones incorrectas antes del final. |
| person | Perseo | OK | 9 | Perseo | Sin incidencias |
| person | Orión | OK | 10 | Orión | Sin incidencias |
| person | Casiopea | OK | 11 | Casiopea | Sin incidencias |
| person | Centauro | OK | 11 | Minotauro (fallo), Centauro | Hace una o más suposiciones incorrectas antes del final. |
| person | Sherlock Holmes | OK | 9 | Sherlock Holmes | Sin incidencias |
| person | Harry Potter | OK | 10 | Harry Potter | Sin incidencias |
| person | Mafalda | OK | 9 | Mafalda | Sin incidencias |

## Secuencias

### animal: Ornitorrinco

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> Sí
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es un mamífero que pone huevos? -> Sí
7. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
8. ¿Tiene un pico parecido al de un pato? -> Sí

**Suposiciones**
- Tras 8: Ornitorrinco (acierto)

**Incidencias**: Sin incidencias.

### animal: Toro

Estado: won. Preguntas: 7.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> Sí
3. ¿Es principalmente carnívoro o depredador? -> No
4. ¿Tiene cuatro patas o más? -> Sí
5. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
6. ¿Tiene cornamenta o cuernos visibles? -> Sí
7. ¿Es un macho bovino, como un toro? -> Sí

**Suposiciones**
- Tras 7: Toro (acierto)

**Incidencias**: Sin incidencias.

### animal: Tigre

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es principalmente carnívoro o depredador? -> Sí
7. ¿Es más grande que un perro? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> No
9. ¿Vive normalmente en España o en la fauna ibérica? -> No
10. ¿Puede ser peligroso para las personas? -> Sí
11. ¿Es un felino? -> Sí
12. ¿Tiene rayas? -> Sí

**Suposiciones**
- Tras 12: Tigre (acierto)

**Incidencias**: Sin incidencias.

### animal: Tiburón

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> No
3. ¿Tiene cuatro patas o más? -> No
4. ¿Tiene escamas? -> Sí
5. ¿Es un reptil? -> No
6. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
7. ¿Es más grande que un perro? -> Sí
8. ¿Nace de un huevo? -> Sí

**Suposiciones**
- Tras 8: Tiburón (acierto)

**Incidencias**: Sin incidencias.

### animal: Delfín

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> No
6. ¿Es un cánido, como un perro, lobo o zorro? -> No

**Suposiciones**
- Tras 6: Ballena (fallo)
- Tras 6: Delfín (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### animal: Abeja

Estado: won. Preguntas: 4.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> No
3. ¿Tiene cuatro patas o más? -> Sí
4. ¿Es un insecto? -> Sí

**Suposiciones**
- Tras 4: Abeja (acierto)

**Incidencias**: Sin incidencias.

### animal: Águila

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> Sí
3. ¿Tiene plumas? -> Sí
4. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
5. ¿Es principalmente carnívoro o depredador? -> Sí
6. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
7. ¿Puede ser peligroso para las personas? -> Sí
8. ¿Es más grande que una caja de zapatos? -> Sí
9. ¿Es principalmente nocturno? -> No
10. ¿Es conocido por un patrón blanco y negro? -> No

**Suposiciones**
- Tras 10: Águila (acierto)

**Incidencias**: Sin incidencias.

### animal: Búho

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> Sí
3. ¿Tiene plumas? -> Sí
4. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
5. ¿Es principalmente carnívoro o depredador? -> Sí
6. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
7. ¿Puede ser peligroso para las personas? -> Sí
8. ¿Es más grande que una caja de zapatos? -> A veces
9. ¿Es principalmente nocturno? -> Sí

**Suposiciones**
- Tras 9: Búho (acierto)

**Incidencias**: Sin incidencias.

### animal: Lobo

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es principalmente carnívoro o depredador? -> Sí
7. ¿Es más grande que un perro? -> A veces
8. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
9. ¿Puede ser peligroso para las personas? -> Sí
10. ¿Suele desplazarse principalmente por el aire o el agua? -> No
11. ¿Es un cánido, como un perro, lobo o zorro? -> Sí

**Suposiciones**
- Tras 11: Lobo (acierto)

**Incidencias**: Sin incidencias.

### animal: Cabra

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> Sí
3. ¿Es principalmente carnívoro o depredador? -> No
4. ¿Tiene cuatro patas o más? -> Sí
5. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
6. ¿Tiene cornamenta o cuernos visibles? -> Sí
7. ¿Es un macho bovino, como un toro? -> No
8. ¿Es más grande que una caja de zapatos? -> No
9. ¿Tiene pezuñas? -> Sí

**Suposiciones**
- Tras 9: Cabra (acierto)

**Incidencias**: Sin incidencias.

### animal: Pato

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> Sí
3. ¿Tiene plumas? -> Sí
4. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
5. ¿Es principalmente carnívoro o depredador? -> No
6. ¿Es un animal doméstico, de granja o mascota común? -> No
7. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
8. ¿Es más grande que una caja de zapatos? -> No

**Suposiciones**
- Tras 8: Pato (acierto)

**Incidencias**: Sin incidencias.

### animal: Ganso

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> Sí
3. ¿Tiene plumas? -> Sí
4. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
5. ¿Es principalmente carnívoro o depredador? -> No
6. ¿Es un animal doméstico, de granja o mascota común? -> No
7. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
8. ¿Es más grande que una caja de zapatos? -> Sí

**Suposiciones**
- Tras 8: Ganso (acierto)

**Incidencias**: Sin incidencias.

### animal: Pulpo

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> No
3. ¿Tiene cuatro patas o más? -> No
4. ¿Tiene escamas? -> No
5. ¿Nace de un huevo? -> Sí
6. ¿Es un animal vertebrado? -> No
7. ¿Es un insecto? -> No
8. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
9. ¿Vive normalmente en España o en la fauna ibérica? -> No
10. ¿Es más grande que una caja de zapatos? -> No

**Suposiciones**
- Tras 10: Pulpo (acierto)

**Incidencias**: Sin incidencias.

### animal: Cigüeña

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Es un mamífero? -> No
2. ¿Es un ave? -> Sí
3. ¿Tiene plumas? -> Sí
4. ¿Vive normalmente en España o en la fauna ibérica? -> Sí
5. ¿Es principalmente carnívoro o depredador? -> Sí
6. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
7. ¿Puede ser peligroso para las personas? -> No
8. ¿Es más grande que una caja de zapatos? -> Sí
9. ¿Tiene el cuello muy largo? -> Sí
10. ¿Es conocido por un patrón blanco y negro? -> Sí

**Suposiciones**
- Tras 10: Cigüeña (acierto)

**Incidencias**: Sin incidencias.

### animal: Hipopótamo

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es principalmente carnívoro o depredador? -> No
7. ¿Es más grande que un perro? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> Sí
9. ¿Tiene trompa? -> No
10. ¿Pasa mucho tiempo en el agua aunque también viva en tierra? -> Sí
11. ¿Tiene pezuñas? -> Sí

**Suposiciones**
- Tras 11: Hipopótamo (acierto)

**Incidencias**: Sin incidencias.

### animal: Rinoceronte

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> Sí
4. ¿Tiene pezuñas? -> Sí
5. ¿Vive normalmente en España o en la fauna ibérica? -> No
6. ¿Tiene cuatro patas o más? -> Sí
7. ¿Tiene manchas en el pelaje? -> No
8. ¿Es más grande que un perro? -> Sí

**Suposiciones**
- Tras 8: Rinoceronte (acierto)

**Incidencias**: Sin incidencias.

### animal: Jirafa

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> Sí
4. ¿Tiene pezuñas? -> Sí
5. ¿Vive normalmente en España o en la fauna ibérica? -> No
6. ¿Tiene cuatro patas o más? -> Sí
7. ¿Tiene manchas en el pelaje? -> Sí
8. ¿Tiene el cuello muy largo? -> Sí

**Suposiciones**
- Tras 8: Jirafa (acierto)

**Incidencias**: Sin incidencias.

### animal: Cebra

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es principalmente carnívoro o depredador? -> No
7. ¿Es más grande que un perro? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> No
9. ¿Vive normalmente en España o en la fauna ibérica? -> No
10. ¿Puede ser peligroso para las personas? -> A veces
11. ¿Tiene rayas? -> Sí
12. ¿Tiene pezuñas? -> Sí

**Suposiciones**
- Tras 12: Cebra (acierto)

**Incidencias**: Sin incidencias.

### animal: Canguro

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> No
6. ¿Es un cánido, como un perro, lobo o zorro? -> No

**Suposiciones**
- Tras 6: Ballena (fallo)
- Tras 6: Delfín (fallo)
- Tras 6: Canguro (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### animal: Panda

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Es un mamífero? -> Sí
2. ¿Es un animal doméstico, de granja o mascota común? -> No
3. ¿Tiene cornamenta o cuernos visibles? -> No
4. ¿Nace de un huevo? -> No
5. ¿Tiene cuatro patas o más? -> Sí
6. ¿Es principalmente carnívoro o depredador? -> A veces
7. ¿Es más grande que un perro? -> Sí
8. ¿Suele desplazarse principalmente por el aire o el agua? -> No
9. ¿Vive normalmente en España o en la fauna ibérica? -> No
10. ¿Puede ser peligroso para las personas? -> A veces
11. ¿Es un felino? -> No
12. ¿Tiene rayas? -> No
13. ¿Es conocido por un patrón blanco y negro? -> Sí
14. ¿Tiene pezuñas? -> No

**Suposiciones**
- Tras 14: Panda (acierto)

**Incidencias**: Sin incidencias.

### object: Cuchara

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> No
4. ¿Su función principal es almacenar, contener o transportar cosas? -> No
5. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
6. ¿Tiene mango o asa para sujetarlo? -> Sí
7. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> Sí
8. ¿Es un cubierto o utensilio para comer? -> Sí
9. ¿Tiene una parte cóncava para recoger o contener algo? -> Sí
10. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No

**Suposiciones**
- Tras 10: Cuchara (acierto)

**Incidencias**: Sin incidencias.

### object: Teléfono móvil

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Tiene pantalla? -> Sí
4. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
5. ¿Es más grande que una caja de zapatos? -> No
6. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí

**Suposiciones**
- Tras 6: Teléfono móvil (acierto)

**Incidencias**: Sin incidencias.

### object: Silla

Estado: won. Preguntas: 7.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> No
3. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
4. ¿Es un mueble? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Su función principal es almacenar, contener o transportar cosas? -> No
7. ¿Es flexible o blando? -> No

**Suposiciones**
- Tras 7: Silla (acierto)

**Incidencias**: Sin incidencias.

### object: Coche

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> No
3. ¿Tiene pantalla? -> No
4. ¿Su función principal es almacenar, contener o transportar cosas? -> Sí
5. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
6. ¿Es un vehículo o medio de transporte? -> Sí

**Suposiciones**
- Tras 6: Coche (acierto)

**Incidencias**: Sin incidencias.

### object: Libro

Estado: won. Preguntas: 12.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> No
4. ¿Su función principal es almacenar, contener o transportar cosas? -> No
5. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
6. ¿Tiene mango o asa para sujetarlo? -> No
7. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
8. ¿Es más grande que una caja de zapatos? -> No
9. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
10. ¿Está hecho principalmente de metal o plástico? -> No
11. ¿Está asociado a un deporte o juego? -> No
12. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No

**Suposiciones**
- Tras 12: Libro (acierto)

**Incidencias**: Sin incidencias.

### object: Guitarra

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Tiene pantalla? -> Sí
4. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
5. ¿Es más grande que una caja de zapatos? -> Sí
6. ¿Tiene mango o asa para sujetarlo? -> Sí

**Suposiciones**
- Tras 6: Guitarra (acierto)

**Incidencias**: Sin incidencias.

### object: Lámpara

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> Sí
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> A veces
3. ¿Tiene pantalla? -> No
4. ¿Es más grande que una caja de zapatos? -> No
5. ¿Está hecho principalmente de metal o plástico? -> Sí
6. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> No
7. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> Sí
8. ¿Su función principal es almacenar, contener o transportar cosas? -> No
9. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
10. ¿Es un mueble? -> A veces

**Suposiciones**
- Tras 10: Lámpara (acierto)

**Incidencias**: Sin incidencias.

### object: Llave

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> No
4. ¿Su función principal es almacenar, contener o transportar cosas? -> No
5. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
6. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
7. ¿Está hecho principalmente de metal o plástico? -> Sí
8. ¿Se utiliza principalmente como una herramienta de trabajo o estudio? -> Sí
9. ¿Se interactúa con ello principalmente de forma digital o electrónica? -> No
10. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> No
11. ¿Tiene mango o asa para sujetarlo? -> No

**Suposiciones**
- Tras 11: Llave (acierto)

**Incidencias**: Sin incidencias.

### object: Botella

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> No
4. ¿Su función principal es almacenar, contener o transportar cosas? -> Sí
5. ¿Tiene una parte cóncava para recoger o contener algo? -> Sí
6. ¿Tiene mango o asa para sujetarlo? -> No
7. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> Sí
8. ¿Se utiliza principalmente en la cocina o está relacionado con la alimentación? -> Sí
9. ¿Está hecho principalmente de metal o plástico? -> A veces
10. ¿Es más grande que una caja de zapatos? -> No

**Suposiciones**
- Tras 10: Botella (acierto)

**Incidencias**: Sin incidencias.

### object: Balón

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> A veces
4. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> No
5. ¿Su función principal es almacenar, contener o transportar cosas? -> No
6. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No
7. ¿Está hecho principalmente de metal o plástico? -> No
8. ¿Está asociado a un deporte o juego? -> Sí
9. ¿Tiene una parte cóncava para recoger o contener algo? -> No

**Suposiciones**
- Tras 9: Balón (acierto)

**Incidencias**: Sin incidencias.

### object: Mochila

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Tiene partes móviles, mecánicas o electrónicas? -> No
2. ¿Se puede llevar fácilmente en la mano o en un bolsillo? -> Sí
3. ¿Es flexible o blando? -> Sí
4. ¿Es comestible? -> No
5. ¿Es algo que las personas visten, calzan o llevan puesto en el cuerpo? -> Sí
6. ¿Se puede encontrar normalmente en interiores o dentro de una casa? -> No

**Suposiciones**
- Tras 6: Mochila (acierto)

**Incidencias**: Sin incidencias.

### place: París

Estado: won. Preguntas: 5.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
3. ¿Está en América? -> No
4. ¿Está en Europa? -> Sí
5. ¿Está en Francia? -> Sí

**Suposiciones**
- Tras 5: París (acierto)

**Incidencias**: Sin incidencias.

### place: Murcia

Estado: won. Preguntas: 13.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> Sí
5. ¿Está en Castilla y León? -> No
6. ¿Está en Andalucía? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en América? -> No
9. ¿Está en Castilla-La Mancha? -> No
10. ¿Está en Galicia? -> No
11. ¿Está en Extremadura? -> No
12. ¿Está en el País Vasco? -> No
13. ¿Está en la Región de Murcia? -> Sí

**Suposiciones**
- Tras 13: Murcia (acierto)

**Incidencias**: Sin incidencias.

### place: Cartagena (España)

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> Sí
5. ¿Está en Castilla y León? -> No
6. ¿Está en Andalucía? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en América? -> No
9. ¿Está en Galicia? -> No
10. ¿Está en el País Vasco? -> No
11. ¿Está en la Región de Murcia? -> Sí

**Suposiciones**
- Tras 11: Cartagena (España) (acierto)

**Incidencias**: Sin incidencias.

### place: Madrid

Estado: won. Preguntas: 14.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> Sí
5. ¿Está en Castilla y León? -> No
6. ¿Está en Andalucía? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en América? -> No
9. ¿Está en Castilla-La Mancha? -> No
10. ¿Está en Galicia? -> No
11. ¿Está en Extremadura? -> No
12. ¿Está en el País Vasco? -> No
13. ¿Está en la Región de Murcia? -> No
14. ¿Está en la Comunidad de Madrid? -> Sí

**Suposiciones**
- Tras 14: Madrid (acierto)

**Incidencias**: Sin incidencias.

### place: Barcelona

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
4. ¿Está en Europa? -> Sí
5. ¿Está en Cataluña? -> Sí
6. ¿Tiene acceso al mar o está junto a la costa? -> Sí

**Suposiciones**
- Tras 6: Barcelona (acierto)

**Incidencias**: Sin incidencias.

### place: Sevilla

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> Sí
5. ¿Está en Castilla y León? -> No
6. ¿Está en Andalucía? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en América? -> No

**Suposiciones**
- Tras 8: Córdoba (fallo)
- Tras 8: Granada (fallo)
- Tras 8: Jaén (fallo)
- Tras 8: Sevilla (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Valencia

Estado: won. Preguntas: 6.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
4. ¿Está en Europa? -> Sí
5. ¿Está en Cataluña? -> No
6. ¿Está en la Comunidad Valenciana? -> Sí

**Suposiciones**
- Tras 6: Alicante (fallo)
- Tras 6: Castellón de la Plana (fallo)
- Tras 6: Valencia (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Zaragoza

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
4. ¿Está en Europa? -> Sí
5. ¿Está en Cataluña? -> No
6. ¿Está en la Comunidad Valenciana? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> No
8. ¿Está en Aragón? -> Sí

**Suposiciones**
- Tras 8: Huesca (fallo)
- Tras 8: Teruel (fallo)
- Tras 8: Zaragoza (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Bilbao

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> Sí
5. ¿Está en Castilla y León? -> No
6. ¿Está en Andalucía? -> No
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Está en América? -> No
9. ¿Está en Galicia? -> No
10. ¿Está en el País Vasco? -> Sí

**Suposiciones**
- Tras 10: Bilbao (acierto)

**Incidencias**: Sin incidencias.

### place: Las Palmas de Gran Canaria

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> No
5. ¿Es una ciudad, país o división política? -> Sí
6. ¿Es una ciudad grande o muy poblada? -> Sí
7. ¿Está en América? -> No
8. ¿Es una capital? -> No
9. ¿Tiene acceso al mar o está junto a la costa? -> Sí
10. ¿Está en la isla de Tenerife? -> No
11. ¿Es capital de una comunidad autónoma? -> Sí

**Suposiciones**
- Tras 11: Las Palmas de Gran Canaria (acierto)

**Incidencias**: Sin incidencias.

### place: Santa Cruz de Tenerife

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> No
5. ¿Es una ciudad, país o división política? -> Sí
6. ¿Es una ciudad grande o muy poblada? -> Sí
7. ¿Está en América? -> No
8. ¿Es una capital? -> No
9. ¿Tiene acceso al mar o está junto a la costa? -> Sí
10. ¿Está en la isla de Tenerife? -> Sí
11. ¿Es capital de una comunidad autónoma? -> Sí

**Suposiciones**
- Tras 11: Santa Cruz de Tenerife (acierto)

**Incidencias**: Sin incidencias.

### place: Ceuta

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> No
5. ¿Es una ciudad, país o división política? -> Sí
6. ¿Es una ciudad grande o muy poblada? -> No
7. ¿Está en América? -> No
8. ¿Tiene acceso al mar o está junto a la costa? -> Sí
9. ¿Es una capital? -> No
10. ¿Es una ciudad autónoma? -> Sí
11. ¿Está junto al estrecho de Gibraltar? -> Sí

**Suposiciones**
- Tras 11: Ceuta (acierto)

**Incidencias**: Sin incidencias.

### place: Melilla

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Está en Europa? -> No
5. ¿Es una ciudad, país o división política? -> Sí
6. ¿Es una ciudad grande o muy poblada? -> No
7. ¿Está en América? -> No
8. ¿Tiene acceso al mar o está junto a la costa? -> Sí
9. ¿Es una capital? -> No
10. ¿Es una ciudad autónoma? -> Sí
11. ¿Está junto al estrecho de Gibraltar? -> No

**Suposiciones**
- Tras 11: Melilla (acierto)

**Incidencias**: Sin incidencias.

### place: Islas Canarias

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
5. ¿Es capital de provincia? -> No
6. ¿Está en América? -> No
7. ¿Está en Europa? -> No
8. ¿Es una isla o un archipiélago? -> Sí
9. ¿Es una capital? -> No
10. ¿Es una ciudad grande o muy poblada? -> No

**Suposiciones**
- Tras 10: Islas Canarias (acierto)

**Incidencias**: Sin incidencias.

### place: Islas Baleares

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Está en España? -> Sí
2. ¿Es un objeto o lugar de ficción / creado por el ser humano? -> No
3. ¿Es una ciudad, país o división política? -> Sí
4. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
5. ¿Es una ciudad grande o muy poblada? -> No
6. ¿Está en Europa? -> Sí
7. ¿Tiene acceso al mar o está junto a la costa? -> Sí
8. ¿Es capital de provincia? -> No

**Suposiciones**
- Tras 8: Islas Baleares (acierto)

**Incidencias**: Sin incidencias.

### place: Río Amazonas

Estado: won. Preguntas: 3.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
3. ¿Está en América? -> Sí

**Suposiciones**
- Tras 3: Nueva York (fallo)
- Tras 3: Machu Picchu (fallo)
- Tras 3: Gran Cañón (fallo)
- Tras 3: Río Amazonas (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Río Nilo

Estado: won. Preguntas: 3.

**Preguntas**
1. ¿Está en España? -> No
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
3. ¿Está en Europa? -> No

**Suposiciones**
- Tras 3: Playa (fallo)
- Tras 3: Bosque (fallo)
- Tras 3: Desierto del Sáhara (fallo)
- Tras 3: Monte Everest (fallo)
- Tras 3: Taj Mahal (fallo)
- Tras 3: Río Nilo (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Monte Everest

Estado: won. Preguntas: 3.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
3. ¿Está en Europa? -> No

**Suposiciones**
- Tras 3: Playa (fallo)
- Tras 3: Bosque (fallo)
- Tras 3: Desierto del Sáhara (fallo)
- Tras 3: Monte Everest (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Gran Cañón

Estado: won. Preguntas: 3.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
3. ¿Está en América? -> Sí

**Suposiciones**
- Tras 3: Nueva York (fallo)
- Tras 3: Machu Picchu (fallo)
- Tras 3: Gran Cañón (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### place: Taj Mahal

Estado: won. Preguntas: 3.

**Preguntas**
1. ¿Está en España? -> No lo sé
2. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
3. ¿Está en Europa? -> No

**Suposiciones**
- Tras 3: Playa (fallo)
- Tras 3: Bosque (fallo)
- Tras 3: Desierto del Sáhara (fallo)
- Tras 3: Monte Everest (fallo)
- Tras 3: Taj Mahal (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### person: Mahatma Gandhi

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
4. ¿Está asociado principalmente a Asia? -> Sí
5. ¿Tuvo o tiene poder político formal? -> No
6. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> No
7. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
8. ¿Es una persona o personaje de género femenino? -> No
9. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> Sí
10. ¿Está asociado a Roma o al Imperio romano? -> No

**Suposiciones**
- Tras 10: Mahatma Gandhi (acierto)

**Incidencias**: Sin incidencias.

### person: Pedro Sánchez

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
5. ¿Nació o se originó antes del año 1900? -> No
6. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
7. ¿Nació después de 1950? -> Sí
8. ¿Tuvo o tiene poder político formal? -> Sí

**Suposiciones**
- Tras 8: Pedro Sánchez (acierto)

**Incidencias**: Sin incidencias.

### person: Don Quijote de la Mancha

Estado: won. Preguntas: 7.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
4. ¿Es de origen español? -> Sí
5. ¿Pertenece al ámbito hispanohablante? -> Sí
6. ¿Es un personaje de ficción? -> Sí
7. ¿Es (o fue) una persona real de carne y hueso? -> No

**Suposiciones**
- Tras 7: Don Quijote de la Mancha (acierto)

**Incidencias**: Sin incidencias.

### person: Fernando Alonso

Estado: won. Preguntas: 7.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> Sí
3. ¿Pertenece al ámbito hispanohablante? -> Sí
4. ¿Es conocido principalmente por el deporte? -> Sí
5. ¿Es una persona o personaje de género femenino? -> No
6. ¿Es conocido principalmente por la música? -> No
7. ¿Aparece principalmente en cine, televisión o espectáculos? -> No

**Suposiciones**
- Tras 7: Fernando Alonso (acierto)

**Incidencias**: Sin incidencias.

### person: Rosalía

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> Sí
4. ¿Es conocido principalmente por escribir? -> No
5. ¿Nació después de 1950? -> Sí
6. ¿Es una persona o personaje de género femenino? -> Sí
7. ¿Es conocido principalmente por la música? -> Sí
8. ¿Usa o usó un seudónimo o nombre artístico? -> No
9. ¿Es conocido principalmente por el deporte? -> No
10. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
11. ¿Pertenece al ámbito hispanohablante? -> No

**Suposiciones**
- Tras 11: Rosalía (acierto)

**Incidencias**: Sin incidencias.

### person: Julio César

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> Sí
3. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> Sí
4. ¿Tuvo o tiene poder político formal? -> Sí
5. ¿Es una figura histórica? -> Sí
6. ¿Está asociado a Roma o al Imperio romano? -> Sí
7. ¿Es una persona o personaje de género femenino? -> No
8. ¿Pertenece a la Antigüedad clásica? -> Sí

**Suposiciones**
- Tras 8: Julio César (acierto)

**Incidencias**: Sin incidencias.

### person: Elon Musk

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
5. ¿Es un personaje de ficción? -> No
6. ¿Nació o se originó antes del año 1900? -> No
7. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
8. ¿Nació después de 1950? -> Sí
9. ¿Es una persona o personaje de género femenino? -> No
10. ¿Es conocido por ser multimillonario? -> Sí

**Suposiciones**
- Tras 10: Elon Musk (acierto)

**Incidencias**: Sin incidencias.

### person: Hipatia de Alejandría

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> No
5. ¿Se encuentra o se originó en el hemisferio occidental (ej. América, Europa Occidental)? -> No
6. ¿Está asociado principalmente a Asia? -> No
7. ¿Es una persona o personaje de género femenino? -> Sí
8. ¿Está relacionado principalmente con la ciencia, la política o el liderazgo histórico? -> Sí
9. ¿Pertenece a la Antigüedad clásica? -> Sí
10. ¿Tuvo o tiene poder político formal? -> No

**Suposiciones**
- Tras 10: Hipatia de Alejandría (acierto)

**Incidencias**: Sin incidencias.

### person: Zeus

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es una persona o personaje de género femenino? -> No
9. ¿Es el dios principal del Olimpo? -> Sí

**Suposiciones**
- Tras 9: Zeus (acierto)

**Incidencias**: Sin incidencias.

### person: Poseidón

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es una persona o personaje de género femenino? -> No
9. ¿Es el dios principal del Olimpo? -> No
10. ¿Está asociado principalmente a la guerra? -> No
11. ¿Está asociado principalmente al mar? -> Sí

**Suposiciones**
- Tras 11: Poseidón (acierto)

**Incidencias**: Sin incidencias.

### person: Afrodita

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es una persona o personaje de género femenino? -> Sí
9. ¿Está asociado al amor o la belleza? -> Sí

**Suposiciones**
- Tras 9: Afrodita (acierto)

**Incidencias**: Sin incidencias.

### person: Hércules

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> Sí
8. ¿Es conocido por vencer a un monstruo mitológico? -> Sí
9. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> Sí
10. ¿Destaca por una fuerza extraordinaria? -> Sí

**Suposiciones**
- Tras 10: Hércules (acierto)

**Incidencias**: Sin incidencias.

### person: Ulises

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> Sí
8. ¿Es conocido por vencer a un monstruo mitológico? -> No
9. ¿Es famoso por un largo viaje legendario? -> Sí
10. ¿También da nombre a una constelación? -> No
11. ¿Está asociado principalmente al mar? -> A veces

**Suposiciones**
- Tras 11: Ulises (acierto)

**Incidencias**: Sin incidencias.

### person: Cupido

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> No
8. ¿Está asociado principalmente a la guerra? -> No
9. ¿Pertenece a la mitología romana? -> Sí
10. ¿Está asociado al amor o la belleza? -> Sí

**Suposiciones**
- Tras 10: Cupido (acierto)

**Incidencias**: Sin incidencias.

### person: Ares

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es una persona o personaje de género femenino? -> No
9. ¿Es el dios principal del Olimpo? -> No
10. ¿Está asociado principalmente a la guerra? -> Sí

**Suposiciones**
- Tras 10: Ares (acierto)

**Incidencias**: Sin incidencias.

### person: Marte

Estado: won. Preguntas: 8.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> No
8. ¿Está asociado principalmente a la guerra? -> Sí

**Suposiciones**
- Tras 8: Marte (acierto)

**Incidencias**: Sin incidencias.

### person: Minotauro

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> No
8. ¿Pertenece a la mitología griega? -> Sí
9. ¿Es una criatura monstruosa de la mitología? -> Sí

**Suposiciones**
- Tras 9: Minotauro (acierto)

**Incidencias**: Sin incidencias.

### person: Atenea

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> Sí
7. ¿Pertenece a la mitología griega? -> Sí
8. ¿Es una persona o personaje de género femenino? -> Sí
9. ¿Está asociado al amor o la belleza? -> No

**Suposiciones**
- Tras 9: Atenea (acierto)

**Incidencias**: Sin incidencias.

### person: Medusa

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> No
8. ¿Pertenece a la mitología griega? -> Sí
9. ¿Es una criatura monstruosa de la mitología? -> Sí
10. ¿Es mitad humano y mitad animal? -> No

**Suposiciones**
- Tras 9: Minotauro (fallo)
- Tras 10: Medusa (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### person: Perseo

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> Sí
8. ¿Es conocido por vencer a un monstruo mitológico? -> Sí
9. ¿Está asociado a la religión, la espiritualidad o la filosofía? -> No

**Suposiciones**
- Tras 9: Perseo (acierto)

**Incidencias**: Sin incidencias.

### person: Orión

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> Sí
8. ¿Es conocido por vencer a un monstruo mitológico? -> No
9. ¿Es famoso por un largo viaje legendario? -> No
10. ¿Está asociado a la caza? -> Sí

**Suposiciones**
- Tras 10: Orión (acierto)

**Incidencias**: Sin incidencias.

### person: Casiopea

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> No
8. ¿Pertenece a la mitología griega? -> Sí
9. ¿Es una criatura monstruosa de la mitología? -> No
10. ¿También da nombre a una constelación? -> Sí
11. ¿Es una persona o personaje de género femenino? -> Sí

**Suposiciones**
- Tras 11: Casiopea (acierto)

**Incidencias**: Sin incidencias.

### person: Centauro

Estado: won. Preguntas: 11.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> No
8. ¿Pertenece a la mitología griega? -> Sí
9. ¿Es una criatura monstruosa de la mitología? -> Sí
10. ¿Es mitad humano y mitad animal? -> Sí
11. ¿Es una persona o personaje de género femenino? -> No

**Suposiciones**
- Tras 9: Minotauro (fallo)
- Tras 11: Centauro (acierto)

**Incidencias**: Hace una o más suposiciones incorrectas antes del final..

### person: Sherlock Holmes

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> No
2. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es un personaje de ficción? -> Sí
5. ¿Es (o fue) una persona real de carne y hueso? -> No
6. ¿Es un dios o una diosa? -> No
7. ¿Es un héroe o semidiós de la mitología? -> No
8. ¿Pertenece a la mitología griega? -> No
9. ¿Es una figura histórica? -> No

**Suposiciones**
- Tras 9: Sherlock Holmes (acierto)

**Incidencias**: Sin incidencias.

### person: Harry Potter

Estado: won. Preguntas: 10.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
5. ¿Es un personaje de ficción? -> Sí
6. ¿Es (o fue) una persona real de carne y hueso? -> No
7. ¿Pertenece a la mitología griega? -> No
8. ¿Aparece principalmente en cine, televisión o espectáculos? -> Sí
9. ¿Nació después de 1950? -> Sí
10. ¿Es una persona o personaje de género femenino? -> No

**Suposiciones**
- Tras 10: Harry Potter (acierto)

**Incidencias**: Sin incidencias.

### person: Mafalda

Estado: won. Preguntas: 9.

**Preguntas**
1. ¿Sigue con vida? -> Sí
2. ¿Es de origen español? -> No
3. ¿Es una figura conocida principalmente por el arte, entretenimiento o deporte? -> No
4. ¿Es conocido por la política, el activismo o el liderazgo social? -> No
5. ¿Es un personaje de ficción? -> Sí
6. ¿Es (o fue) una persona real de carne y hueso? -> No
7. ¿Pertenece a la mitología griega? -> No
8. ¿Aparece principalmente en cine, televisión o espectáculos? -> No
9. ¿Pertenece al ámbito hispanohablante? -> Sí

**Suposiciones**
- Tras 9: Mafalda (acierto)

**Incidencias**: Sin incidencias.
