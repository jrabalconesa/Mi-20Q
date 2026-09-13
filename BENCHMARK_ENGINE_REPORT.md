# Benchmark del motor 20Q

Generado por `npm run test -- scripts/benchmarkEngine.test.ts` el 2026-09-13T12:34:25.829Z.

La muestra usa una semilla fija para escoger 50 candidatos repartidos entre animal, objeto, lugar y persona. Cada partida responde con los atributos reales del candidato objetivo y se corta en 20 turnos de interacción.

## Resumen

| Métrica | Valor |
| --- | ---: |
| Partidas simuladas | 50 |
| Éxito antes de la pregunta 20 | 10.0% |
| Promedio de preguntas hasta certeza > 90% | 6.33 |
| Casos que alcanzan certeza > 90% | 3 |
| Candidatos fallidos o que requieren más de 20 turnos | 45 |

## Candidatos fallidos o lentos

| Categoría | Candidato | Estado | Preguntas | Turnos | Certeza >90% en pregunta | Suposición final | Fallos previos |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| person | Kublai Khan | guessing | 20 | 20 | no alcanzada | Gengis Kan |  |
| person | James Clerk Maxwell | guessing | 20 | 20 | no alcanzada | Alan Turing |  |
| object | Tino | guessing | 20 | 20 | no alcanzada | Máquina |  |
| person | James Prescott Joule | guessing | 20 | 20 | no alcanzada | Alan Turing |  |
| object | Sendero | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Bula | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Vestíbulo | guessing | 20 | 20 | no alcanzada | Casa |  |
| animal | Jilguero | lost | 15 | 16 | no alcanzada |  | Garza |
| animal | Zurcidora | lost | 17 | 18 | no alcanzada |  | Mariquita |
| object | Quiosco | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Dirk | guessing | 20 | 20 | no alcanzada | Fusil |  |
| place | Sanya | lost | 16 | 17 | no alcanzada |  | Shanghai |
| person | Theodoric the Great | guessing | 20 | 20 | no alcanzada | Adolf Hitler |  |
| object | Comedor | guessing | 20 | 20 | no alcanzada | Casa |  |
| place | Huainan | lost | 16 | 17 | no alcanzada |  | Shanghai |
| person | Zenón de Elea | guessing | 20 | 20 | no alcanzada | Leonardo da Vinci |  |
| animal | Collalba | lost | 15 | 16 | no alcanzada |  | Garza |
| place | Madinah | lost | 16 | 17 | no alcanzada |  | Shanghai |
| place | Guankou | lost | 16 | 17 | no alcanzada |  | Shanghai |
| person | Arminius | guessing | 20 | 20 | no alcanzada | Adolf Hitler |  |
| animal | Cisne | lost | 15 | 16 | no alcanzada |  | Garza |
| animal | Candelita | lost | 15 | 16 | no alcanzada |  | Garza |
| object | Alfombrilla | guessing | 20 | 20 | no alcanzada | Casa |  |
| place | Jaboatão dos Guararapes | lost | 17 | 18 | no alcanzada |  | San Jose |
| place | Zigong | lost | 16 | 17 | no alcanzada |  | Shanghai |
| place | Adana | lost | 16 | 17 | no alcanzada |  | Shanghai |
| person | Epictetus | guessing | 20 | 20 | no alcanzada | Gautama Buddha |  |
| place | Comilla | lost | 16 | 17 | no alcanzada |  | Dongying |
| place | Zhenjiang | lost | 16 | 17 | no alcanzada |  | Dongying |
| object | Labor | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Recubrimiento | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Mansión | guessing | 20 | 20 | no alcanzada | Casa |  |
| object | Cubículo | guessing | 20 | 20 | no alcanzada | Silla |  |
| animal | Langur | guessing | 20 | 20 | no alcanzada | Mapache |  |
| animal | Pardillo | lost | 15 | 16 | no alcanzada |  | Garza |
| person | Jean Piaget | guessing | 20 | 20 | no alcanzada | Leonardo da Vinci |  |
| place | Tanta | lost | 16 | 17 | no alcanzada |  | Dongying |
| place | Fushun | lost | 16 | 17 | no alcanzada |  | Shanghai |
| person | Tina Turner | guessing | 20 | 20 | no alcanzada | Marilyn Monroe |  |
| animal | Bienteveo | lost | 15 | 16 | no alcanzada |  | Garza |
| animal | Colimbo | lost | 15 | 16 | no alcanzada |  | Garza |
| place | Tlaquepaque | lost | 17 | 18 | no alcanzada |  | San Jose |
| person | Max Planck | guessing | 20 | 20 | no alcanzada | Alan Turing |  |
| person | Heinrich Böll | lost | 19 | 20 | no alcanzada |  | Jean-Paul Sartre |
| person | Sun Yat-sen | guessing | 20 | 20 | no alcanzada | Gengis Kan |  |
