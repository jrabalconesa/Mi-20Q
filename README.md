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
- `src/engine`: puntuación, ranking y selección de preguntas.
- `src/components`: componentes visuales.
- `src/hooks`: estado de la partida.
- `src/stats.ts`: estadísticas locales y últimas diez partidas.
- `tests`: pruebas unitarias.

## Algoritmo

Cada respuesta se transforma en un valor entre 0 y 1. El motor compara ese valor con el atributo de cada candidato y calcula una puntuación media. La siguiente pregunta se elige intentando dividir de forma equilibrada a los candidatos más probables.

## Próximas mejoras

- Añadir al menos 60 candidatos completos.
- Guardar estadísticas en localStorage.
- Incorporar aprendizaje cuando falle.
- Añadir un backend y moderación de aportaciones.
- Incorporar un modo de depuración del motor.
