# 20Q MVP

Juego web de veinte preguntas construido con React, TypeScript y Vite.

Publicación prevista: `https://jrabalconesa.github.io/Mi-20Q/`.

## Instalación

```bash
npm install
npm run dev
```

## Validación

```bash
npm run test
npm run build
```

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` valida y publica `dist` al hacer `push` a `main`. En GitHub, configura **Settings > Pages > Build and deployment > Source** como **GitHub Actions**.

La opción `base: '/Mi-20Q/'` de Vite corresponde al nombre del repositorio. Si cambia el nombre, hay que actualizar esa ruta.

## Arquitectura

- `src/data`: candidatos y preguntas.
- El catálogo generado se divide por categoría y se carga bajo demanda al comenzar, sin descargar ni mostrar las demás categorías.
- `src/engine`: puntuación, ranking y selección de preguntas.
- `src/components`: componentes visuales.
- `src/hooks`: estado de la partida.
- `src/stats.ts`: estadísticas locales y últimas diez partidas.
- `src/learning.ts`: aprendizaje local validado y composición de la base de conocimiento.
- Base de más de 4.000 candidatos: al menos 1.000 animales, objetos, lugares y personas.
- Los 60 candidatos originales se conservan como núcleo curado y se combinan con el catálogo generado.
- Cada pregunta declara explícitamente las categorías en las que puede utilizarse.
- La pantalla inicial no revela los candidatos conocidos y la partida mantiene visible únicamente la categoría activa.
- La aplicación detecta un despliegue nuevo y ofrece recargarlo sin dejar pestañas antiguas ejecutándose indefinidamente.
- `tests`: pruebas unitarias.

## Algoritmo

El motor mantiene una distribución de probabilidad sobre los candidatos. Cada respuesta aporta evidencia con una pequeña tolerancia a errores y la siguiente pregunta se elige por entropía esperada, cobertura y probabilidad actual. Primero prioriza preguntas semánticas y, cuando quedan candidatos difíciles de separar, utiliza cortes alfabéticos medianos para conservar la garantía de búsqueda dentro de veinte respuestas.

Las respuestas disponibles son **Sí**, **No**, **A veces** y **No lo sé**. Una suposición temprana incorrecta descarta ese candidato y la partida continúa. Las partidas acertadas refuerzan localmente las relaciones candidato-pregunta. Si el juego falla al final, solicita la palabra correcta y una pregunta que la diferencie de su última respuesta. El candidato, el historial útil y esa nueva distinción se guardan únicamente en `localStorage` y se integran en partidas posteriores.

La investigación y la correspondencia entre fuentes y decisiones técnicas están documentadas en [ALGORITHM_RESEARCH.md](ALGORITHM_RESEARCH.md).

Consulta [DATA_SOURCES.md](DATA_SOURCES.md) para conocer el origen y las condiciones de los datos.

## Próximas mejoras

- Añadir un backend y moderación de aportaciones.
- Permitir exportar, importar y moderar el conocimiento aprendido entre dispositivos.
- Incorporar un modo de depuración del motor.
