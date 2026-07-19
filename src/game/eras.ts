import type { Era } from './types';

export const ERAS: Era[] = [
  {
    id: 'gestos',
    name: 'Gestos y Señales',
    desc: 'Primeros intentos de comunicación. Gruñidos, gestos y marcas en la pared.',
    threshold: 0,
    mult: 1,
  },
  {
    id: 'pictogramas',
    name: 'Pictogramas Rupestres',
    desc: 'Dibujos en cavernas. Cada símbolo vale más que mil gestos.',
    threshold: 10,
    mult: 2,
  },
  {
    id: 'arcilla',
    name: 'Tablillas de Arcilla',
    desc: 'Escritura cuneiforme en tablillas de barro. El primer sistema de escritura.',
    threshold: 100,
    mult: 3,
  },
  {
    id: 'papiro',
    name: 'Papiro y Jeroglíficos',
    desc: 'Rollos de papiro y tinta. Los escribas egipcios registran la historia.',
    threshold: 1_000,
    mult: 5,
  },
  {
    id: 'pergamino',
    name: 'Pergamino Iluminado',
    desc: 'Monjes copistas ilustran manuscritos con pan de oro y vitela.',
    threshold: 10_000,
    mult: 8,
  },
  {
    id: 'papel_tinta',
    name: 'Papel y Tinta',
    desc: 'La imprenta de Gutenberg democratiza el conocimiento.',
    threshold: 100_000,
    mult: 13,
  },
  {
    id: 'lapiz',
    name: 'Lápiz y Libreta',
    desc: 'Escritura portátil para todos. Poe, Austen, Dickens escriben a mano.',
    threshold: 1_000_000,
    mult: 21,
  },
  {
    id: 'maquina',
    name: 'Máquina de Escribir',
    desc: 'Teclas mecánicas que vuelan. Hemingway, Kerouac, la época dorada.',
    threshold: 10_000_000,
    mult: 34,
  },
  {
    id: 'teclado',
    name: 'Teclado Digital',
    desc: 'Procesadores de texto, internet, blogs. El mundo escribe en pantallas.',
    threshold: 100_000_000,
    mult: 55,
  },
  {
    id: 'neuronal',
    name: 'IA y Dictado Mental',
    desc: 'Escribir es pensar. Interfaces cerebro-computadora generan bibliotecas enteras.',
    threshold: 1_000_000_000,
    mult: 89,
  },
];

export function getEra(palabrasTotales: number): Era {
  let era = ERAS[0];
  for (const e of ERAS) {
    if (palabrasTotales >= e.threshold) era = e;
    else break;
  }
  return era;
}

export function getNextEra(currentId: string): Era | null {
  const idx = ERAS.findIndex(e => e.id === currentId);
  if (idx < 0 || idx >= ERAS.length - 1) return null;
  return ERAS[idx + 1];
}

export function getEraProgress(palabrasTotales: number): { current: Era; next: Era | null; progress: number } {
  const current = getEra(palabrasTotales);
  const next = getNextEra(current.id);
  if (!next) return { current, next: null, progress: 1 };
  const range = next.threshold - current.threshold;
  const progress = Math.min(1, (palabrasTotales - current.threshold) / range);
  return { current, next, progress };
}
