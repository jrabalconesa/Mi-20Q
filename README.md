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
- Base de más de 4.000 candidatos: al menos 1.000 animales, objetos, lugares y personas.
- Los 60 candidatos originales se conservan como núcleo curado y se combinan con el catálogo generado.
- Cada pregunta declara explícitamente las categorías en las que puede utilizarse.
- La pantalla inicial muestra los candidatos conocidos y la partida mantiene visible la categoría activa.
- La aplicación detecta un despliegue nuevo y ofrece recargarlo sin dejar pestañas antiguas ejecutándose indefinidamente.
- `tests`: pruebas unitarias.

## Algoritmo

Cada respuesta se transforma en un valor entre 0 y 1. Las primeras preguntas utilizan atributos semánticos para reducir el conjunto. Después, el motor realiza cortes alfabéticos medianos sobre los candidatos empatados, lo que permite separar más de 1.000 opciones en menos de veinte respuestas sin recorrer cuadráticamente todas las preguntas.

Consulta [DATA_SOURCES.md](DATA_SOURCES.md) para conocer el origen y las condiciones de los datos.

## Próximas mejoras

- Guardar estadísticas en localStorage.
- Incorporar aprendizaje cuando falle.
- Añadir un backend y moderación de aportaciones.
- Incorporar un modo de depuración del motor.
