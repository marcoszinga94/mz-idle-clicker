# IdleClicker — La Evolución de la Escritura

> Idle clicker que recorre la historia de la escritura, desde los gestos prehistóricos hasta las interfaces neuronales, mientras escribís frases reales.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)

## Características

- **Diez eras progresivas:** Gestos, Pictogramas, Tablillas de Arcilla, Papiro, Pergamino, Papel y Tinta, Lápiz, Máquina de Escribir, Teclado Digital e IA. Cada era multiplica la producción y cambia la ambientación visual.
- **Dos recursos:** palabras (producción idle) y tinta (moneda de mejoras). Las palabras acumuladas definen la era y el avance hacia la siguiente.
- **Pantalla de escritura:** hay que teclear la frase propuesta; al completarla se suman palabras y tinta, sube la racha y se calcula el ritmo de escritura (WPM) de forma adaptativa. El manejo de tildes y eñes está contemplado.
- **Racha:** cada frase consecutiva aumenta un multiplicador; se pierde si pasa demasiado tiempo sin escribir.
- **Veintidós mejoras:** repartidas en tres categorías (idle, tipeo y tinta), con coste creciente y efecto permanente durante la partida.
- **Prestigio ("Publicar Obra Maestra"):** reinicia palabras, tinta y mejoras a cambio de Puntos de Legado, cuya ganancia escala con el total acumulado.
- **Árbol de Legado:** 41 nodos organizados por filas y columnas, con requisitos entre nodos. Incluye multiplicadores globales, bonus de tipeo y tinta, racha inicial, tinta inicial, mejoras idle gratuitas y multiplicador de prestigio.
- **Guardado automático:** persiste en `localStorage` cada 30 segundos y al cerrar la pestaña, con migración de partidas antiguas.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Astro 5 |
| UI | React 19 (isla cliente) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 3 + CSS propio |
| Persistencia | `localStorage` |

## Estructura del proyecto

```text
src/
├── pages/index.astro        # Entrada de la isla React
├── components/
│   ├── App.tsx              # Estado, tick, guardado y pestañas
│   ├── WriterScreen.tsx     # Captura y validación de frases
│   ├── EraBanner.tsx        # Era actual y progreso
│   ├── UpgradesPanel.tsx    # Tienda de mejoras
│   ├── PrestigePanel.tsx    # Publicación de la obra maestra
│   └── LegacyTreeModal.tsx  # Árbol de legado interactivo
├── game/
│   ├── types.ts             # Modelo de datos
│   ├── eras.ts              # Definición de las diez eras
│   ├── data.ts              # Mejoras y nodos de legado
│   ├── words.ts             # Banco de frases
│   └── logic.ts             # Cálculos, acciones y guardado
└── styles/game.css          # Estilos del juego
```

## Puesta en marcha

### Requisitos

- Node.js 18 o superior
- npm

### Instalación

```bash
npm install
npm run dev
```

Astro indica la URL local en la terminal.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualiza la build de producción |

## Despliegue

El resultado de `npm run build` es un sitio estático apto para cualquier hosting de archivos estáticos. No necesita backend: la partida se guarda en el navegador.

## Estado del proyecto

Jugable y completo en su bucle principal: eras, tipeo, mejoras, prestigio y árbol de legado. Sin tests automatizados ni linting configurado.

## Licencia

Sin licencia definida.

## Autor

Marcos Zingaretti — https://github.com/marcoszinga94
