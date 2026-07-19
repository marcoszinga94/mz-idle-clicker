import type { Upgrade, LegacyUpg } from './types';

export const UPGRADES: Upgrade[] = [
  // ── Idle ─────────────────────────────────────────────
  {
    id: 'manos',
    name: 'Señales con las Manos',
    desc: '+0.5 palabras/s',
    cost: 10,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 0.5,
  },
  {
    id: 'pigmentos',
    name: 'Pigmentos Naturales',
    desc: '+2 palabras/s',
    cost: 50,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 2,
  },
  {
    id: 'estilete',
    name: 'Estilete de Arcilla',
    desc: '+8 palabras/s',
    cost: 200,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 8,
  },
  {
    id: 'pincel',
    name: 'Pincel de Junco',
    desc: '+32 palabras/s',
    cost: 1_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 32,
  },
  {
    id: 'pluma',
    name: 'Pluma de Ganso',
    desc: '+128 palabras/s',
    cost: 5_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 128,
  },
  {
    id: 'grafito',
    name: 'Grafito Natural',
    desc: '+512 palabras/s',
    cost: 25_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 512,
  },
  {
    id: 'cinta',
    name: 'Cinta de Máquina',
    desc: '+2,048 palabras/s',
    cost: 100_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 2048,
  },
  {
    id: 'procesador',
    name: 'Procesador de Texto',
    desc: '+8,192 palabras/s',
    cost: 500_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 8192,
  },
  {
    id: 'neuronal',
    name: 'Red Neuronal',
    desc: '+32,768 palabras/s',
    cost: 2_000_000,
    cat: 'idle',
    effect_type: 'palabras_ps',
    effect_value: 32768,
  },

  // ── Tipeo ────────────────────────────────────────────
  {
    id: 'dedos',
    name: 'Dedos Ágiles',
    desc: '+2 palabras por palabra tipeada',
    cost: 20,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 2,
  },
  {
    id: 'vocabulario',
    name: 'Vocabulario Amplio',
    desc: '+5 palabras por palabra tipeada',
    cost: 100,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 5,
  },
  {
    id: 'taquigrafia',
    name: 'Taquigrafía',
    desc: '+15 palabras por palabra tipeada',
    cost: 500,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 15,
  },
  {
    id: 'mecanografia',
    name: 'Mecanografía',
    desc: '+50 palabras por palabra tipeada',
    cost: 2_500,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 50,
  },
  {
    id: 'dictado',
    name: 'Dictado por Voz',
    desc: '+200 palabras por palabra tipeada',
    cost: 10_000,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 200,
  },
  {
    id: 'pensamiento',
    name: 'Pensamiento Directo',
    desc: '+1,000 palabras por palabra tipeada',
    cost: 100_000,
    cat: 'tipeo',
    effect_type: 'palabras_por_palabra',
    effect_value: 1000,
  },

  // ── Tinta ────────────────────────────────────────────
  {
    id: 'tintero',
    name: 'Tintero de Tinta',
    desc: '+1 tinta/s',
    cost: 100,
    cat: 'tinta',
    effect_type: 'tinta_ps',
    effect_value: 1,
  },
  {
    id: 'cartucho',
    name: 'Cartucho Recargable',
    desc: '+10 tinta/s',
    cost: 2_000,
    cat: 'tinta',
    effect_type: 'tinta_ps',
    effect_value: 10,
  },
  {
    id: 'tanque',
    name: 'Tanque de Tinta',
    desc: '+100 tinta/s',
    cost: 50_000,
    cat: 'tinta',
    effect_type: 'tinta_ps',
    effect_value: 100,
  },
  {
    id: 'rio_tinta',
    name: 'Río de Tinta',
    desc: '+1,000 tinta/s',
    cost: 1_000_000,
    cat: 'tinta',
    effect_type: 'tinta_ps',
    effect_value: 1000,
  },
  {
    id: 'calidad',
    name: 'Tinta de Calidad',
    desc: '×1.5 tinta por palabra',
    cost: 1_000,
    cat: 'tinta',
    effect_type: 'tinta_por_palabra_mult',
    effect_value: 1.5,
  },
  {
    id: 'premium',
    name: 'Tinta Premium',
    desc: '×2 tinta por palabra',
    cost: 10_000,
    cat: 'tinta',
    effect_type: 'tinta_por_palabra_mult',
    effect_value: 2,
  },
  {
    id: 'magica',
    name: 'Tinta Mágica',
    desc: '×3 tinta por palabra',
    cost: 100_000,
    cat: 'tinta',
    effect_type: 'tinta_por_palabra_mult',
    effect_value: 3,
  },
];

export const LEGACY_UPGRADES: LegacyUpg[] = [
  // ══════════════════════════════════════════════════════
  //  ÁRBOL DE LEGADO — 46 habilidades
  // ══════════════════════════════════════════════════════
  //
  //  Col: 0      1        2       3       4       5       6        7        8
  // ─────────────────────────────────────────────────────────────────────────────
  //  R0:                                          [Herencia]
  //                     ╱──────────────────────────────────────╲
  //  R1:                      [TintaFina]                              [ManosExp]
  //                 ╱───────│──────────╲                        ╱───│─────╲
  //  R2:       [T.Prem] [TintMay] [Caligraf]             [Efic] [Dedos] [Memoria]
  //            ╱   ╲      ╱  ╲      ╱  ╲                  │    ╱  ╲      │
  //  R3: [T.Leg] [Cart] [Tanque] [Pincel] [Maest] [Mecanog] [Vocab] [HerramBas]
  //          │      │       │        │        │     ╱  ╲     ╱  ╲       │
  //  R4: [T.Div] [Rio] [Barril] [LetraP] [Genio] [Taq] [R.Elite] [Dictado] [HerramAv]
  //                                                │      │         │          │
  //  R5:                                       [Pensa] [R.Legen] [Autoesc] [HerramExp]
  //                                                │        │         │          │
  //  R6:                                      [Cluster] [R.Maxima] [BotsIA] [HerramDef]
  //                                                │                             │
  //  R7:                                     [RedNeuron]                   [IAGen]
  //
  //  Col 9 (separate small branch): Tintero-Viejo → Arranque → LegadoEsc → Sabiduria → Leyenda

  // ── Raíz ─────────────────────────────────────────────
  {
    id: 'leg_herencia',
    name: 'Herencia Cultural',
    desc: '+10% producción global',
    cost: 2,
    effect_type: 'mult_global',
    effect_value: 1.1,
    row: 0, col: 4,
  },

  // ── Rama Producción ────────── Herencia → Manos → Efic → Maest → Genio ─
  {
    id: 'leg_manos',
    name: 'Manos Expertas',
    desc: '+15% producción global',
    cost: 5,
    effect_type: 'mult_global',
    effect_value: 1.15,
    requires: ['leg_herencia'],
    row: 1, col: 6,
  },
  {
    id: 'leg_eficiencia',
    name: 'Eficiencia',
    desc: '+25% producción global',
    cost: 10,
    effect_type: 'mult_global',
    effect_value: 1.25,
    requires: ['leg_manos'],
    row: 2, col: 5,
  },
  {
    id: 'leg_maestria',
    name: 'Maestría',
    desc: '+40% producción global',
    cost: 18,
    effect_type: 'mult_global',
    effect_value: 1.4,
    requires: ['leg_eficiencia'],
    row: 3, col: 5,
  },
  {
    id: 'leg_genio',
    name: 'Genio',
    desc: '+75% producción global',
    cost: 32,
    effect_type: 'mult_global',
    effect_value: 1.75,
    requires: ['leg_maestria'],
    row: 4, col: 5,
  },

  // ── Rama Tinta ───────────── Herencia → TintaFina → T.Prem → T.Leg → T.Div ─
  {
    id: 'leg_tinta_fina',
    name: 'Tinta Fina',
    desc: '+10% generación de tinta',
    cost: 4,
    effect_type: 'tinta_mult',
    effect_value: 1.1,
    requires: ['leg_herencia'],
    row: 1, col: 2,
  },
  {
    id: 'leg_tinta_premium',
    name: 'Tinta Premium',
    desc: '+20% generación de tinta',
    cost: 8,
    effect_type: 'tinta_mult',
    effect_value: 1.2,
    requires: ['leg_tinta_fina'],
    row: 2, col: 1,
  },
  {
    id: 'leg_tinta_legendaria',
    name: 'Tinta Legendaria',
    desc: '+30% generación de tinta',
    cost: 16,
    effect_type: 'tinta_mult',
    effect_value: 1.3,
    requires: ['leg_tinta_premium'],
    row: 3, col: 0,
  },
  {
    id: 'leg_tinta_divina',
    name: 'Tinta Divina',
    desc: '+50% generación de tinta',
    cost: 28,
    effect_type: 'tinta_mult',
    effect_value: 1.5,
    requires: ['leg_tinta_legendaria'],
    row: 4, col: 0,
  },

  // ── Rama Tintero ───────── TintaFina → TinteroMayor → Tanque → Barril ─
  {
    id: 'leg_tintero_mayor',
    name: 'Tintero Mayor',
    desc: '+25 tinta/s',
    cost: 6,
    effect_type: 'tinta_ps',
    effect_value: 25,
    requires: ['leg_tinta_fina'],
    row: 2, col: 2,
  },
  {
    id: 'leg_tanque',
    name: 'Tanque de Tinta',
    desc: '+100 tinta/s',
    cost: 12,
    effect_type: 'tinta_ps',
    effect_value: 100,
    requires: ['leg_tintero_mayor'],
    row: 3, col: 2,
  },
  {
    id: 'leg_barril',
    name: 'Barril de Tinta',
    desc: '+500 tinta/s',
    cost: 22,
    effect_type: 'tinta_ps',
    effect_value: 500,
    requires: ['leg_tanque'],
    row: 4, col: 2,
  },

  // ── Rama Cartucho ──────── T.Premium → Cartucho → Río de Tinta ─
  {
    id: 'leg_cartucho',
    name: 'Cartucho Recargable',
    desc: '+10 tinta/s',
    cost: 10,
    effect_type: 'tinta_ps',
    effect_value: 10,
    requires: ['leg_tinta_premium'],
    row: 3, col: 1,
  },
  {
    id: 'leg_rio',
    name: 'Río de Tinta',
    desc: '+1,000 tinta/s',
    cost: 20,
    effect_type: 'tinta_ps',
    effect_value: 1000,
    requires: ['leg_cartucho'],
    row: 4, col: 1,
  },

  // ── Rama Caligrafía ───── TintaFina → Caligrafía → Pincel → LetraPerfecta ─
  {
    id: 'leg_caligrafia',
    name: 'Caligrafía',
    desc: '+3 palabras por palabra tipeada',
    cost: 6,
    effect_type: 'palabras_por_palabra',
    effect_value: 3,
    requires: ['leg_tinta_fina'],
    row: 2, col: 3,
  },
  {
    id: 'leg_pincel',
    name: 'Pincel Fino',
    desc: '+1 racha base',
    cost: 12,
    effect_type: 'racha_inicial',
    effect_value: 1,
    requires: ['leg_caligrafia'],
    row: 3, col: 3,
  },
  {
    id: 'leg_letra',
    name: 'Letra Perfecta',
    desc: '+8 palabras por palabra tipeada',
    cost: 24,
    effect_type: 'palabras_por_palabra',
    effect_value: 8,
    requires: ['leg_pincel'],
    row: 4, col: 3,
  },

  // ── Rama Tipeo ──────────── Manos → Dedos → Mecanog ───────────────────
  {
    id: 'leg_dedos',
    name: 'Dedos Firmes',
    desc: '+5% producción por tipeo',
    cost: 4,
    effect_type: 'tipeo_mult',
    effect_value: 1.05,
    requires: ['leg_manos'],
    row: 2, col: 6,
  },

  // ── Subrama Taquigrafía ── Dedos → Mecanog → Taquig → Pensamiento → Cluster → RedNeuronal
  {
    id: 'leg_mecanografia',
    name: 'Mecanografía',
    desc: '+2 racha base',
    cost: 8,
    effect_type: 'racha_inicial',
    effect_value: 2,
    requires: ['leg_dedos'],
    row: 3, col: 6,
  },
  {
    id: 'leg_taquigrafia',
    name: 'Taquigrafía',
    desc: '+15 palabras por palabra tipeada',
    cost: 14,
    effect_type: 'palabras_por_palabra',
    effect_value: 15,
    requires: ['leg_mecanografia'],
    row: 4, col: 6,
  },
  {
    id: 'leg_pensamiento',
    name: 'Pensamiento Directo',
    desc: '+50 palabras por palabra tipeada',
    cost: 22,
    effect_type: 'palabras_por_palabra',
    effect_value: 50,
    requires: ['leg_taquigrafia'],
    row: 5, col: 6,
  },
  {
    id: 'leg_cluster',
    name: 'Cluster de IAs',
    desc: '+200 palabras por palabra tipeada',
    cost: 34,
    effect_type: 'palabras_por_palabra',
    effect_value: 200,
    requires: ['leg_pensamiento'],
    row: 6, col: 6,
  },
  {
    id: 'leg_red_neuronal',
    name: 'Red Neuronal',
    desc: '+1,000 palabras por palabra tipeada',
    cost: 50,
    effect_type: 'palabras_por_palabra',
    effect_value: 1000,
    requires: ['leg_cluster'],
    row: 7, col: 6,
  },

  // ── Subrama Racha ───────── Dedos → Mecanog → RachaElite → RLegendaria → RMaxima
  {
    id: 'leg_racha_elite',
    name: 'Racha Elite',
    desc: '+2 racha base',
    cost: 12,
    effect_type: 'racha_inicial',
    effect_value: 2,
    requires: ['leg_mecanografia'],
    row: 4, col: 7,
  },
  {
    id: 'leg_racha_legendaria',
    name: 'Racha Legendaria',
    desc: '+5 racha base',
    cost: 22,
    effect_type: 'racha_inicial',
    effect_value: 5,
    requires: ['leg_racha_elite'],
    row: 5, col: 7,
  },
  {
    id: 'leg_racha_maxima',
    name: 'Racha Máxima',
    desc: '+10 racha base',
    cost: 36,
    effect_type: 'racha_inicial',
    effect_value: 10,
    requires: ['leg_racha_legendaria'],
    row: 6, col: 7,
  },

  // ── Subrama Dictado ──────── Dedos → Vocabulario → Dictado → Autoescritura → BotsIA
  {
    id: 'leg_vocabulario',
    name: 'Vocabulario Amplio',
    desc: '+5 palabras por palabra tipeada',
    cost: 8,
    effect_type: 'palabras_por_palabra',
    effect_value: 5,
    requires: ['leg_dedos'],
    row: 3, col: 7,
  },
  {
    id: 'leg_dictado',
    name: 'Dictado por Voz',
    desc: '+20 palabras por palabra tipeada',
    cost: 14,
    effect_type: 'palabras_por_palabra',
    effect_value: 20,
    requires: ['leg_vocabulario'],
    row: 4, col: 8,
  },
  {
    id: 'leg_autoescritura',
    name: 'Autoescritura',
    desc: '+80 palabras por palabra tipeada',
    cost: 24,
    effect_type: 'palabras_por_palabra',
    effect_value: 80,
    requires: ['leg_dictado'],
    row: 5, col: 8,
  },
  {
    id: 'leg_bots',
    name: 'Bots de Escritura',
    desc: '×1.10 producción por tipeo',
    cost: 38,
    effect_type: 'tipeo_mult',
    effect_value: 1.1,
    requires: ['leg_autoescritura'],
    row: 6, col: 8,
  },
  {
    id: 'leg_ia_generativa',
    name: 'IA Generativa',
    desc: '×1.25 producción por tipeo',
    cost: 52,
    effect_type: 'tipeo_mult',
    effect_value: 1.25,
    requires: ['leg_bots'],
    row: 7, col: 8,
  },

  // ── Rama Herramientas ── Manos → Memoria → Básicas → Avanzadas → Expertas → Definitivas
  {
    id: 'leg_memoria',
    name: 'Memoria Muscular',
    desc: 'Empiezas con racha +1',
    cost: 3,
    effect_type: 'racha_inicial',
    effect_value: 1,
    requires: ['leg_manos'],
    row: 2, col: 7,
  },
  {
    id: 'leg_herramientas',
    name: 'Herramientas Básicas',
    desc: 'Empiezas con 1 mejora idle',
    cost: 6,
    effect_type: 'free_idle_upgrades',
    effect_value: 1,
    requires: ['leg_memoria'],
    row: 3, col: 8,
  },
  {
    id: 'leg_avanzadas',
    name: 'Herramientas Avanzadas',
    desc: '+1 mejora idle gratis',
    cost: 14,
    effect_type: 'free_idle_upgrades',
    effect_value: 1,
    requires: ['leg_herramientas'],
    row: 4, col: 9,
  },
  {
    id: 'leg_expertas',
    name: 'Herramientas Expertas',
    desc: '+1 mejora idle gratis',
    cost: 24,
    effect_type: 'free_idle_upgrades',
    effect_value: 1,
    requires: ['leg_avanzadas'],
    row: 5, col: 9,
  },
  {
    id: 'leg_definitivas',
    name: 'Herramientas Definitivas',
    desc: '+1 mejora idle gratis',
    cost: 40,
    effect_type: 'free_idle_upgrades',
    effect_value: 1,
    requires: ['leg_expertas'],
    row: 6, col: 9,
  },

  // ── Rama Legado ────────── TinteroViejo → Arranque → LegadoEsc → Sabiduria → Leyenda
  {
    id: 'leg_tintero',
    name: 'Tintero Viejo',
    desc: '+50 tinta al empezar',
    cost: 2,
    effect_type: 'tinta_inicial',
    effect_value: 50,
    row: 0, col: 8,
  },
  {
    id: 'leg_arrranque',
    name: 'Arranque Rápido',
    desc: '+200 tinta al empezar',
    cost: 5,
    effect_type: 'tinta_inicial',
    effect_value: 200,
    requires: ['leg_tintero'],
    row: 1, col: 8,
  },
  {
    id: 'leg_escriba',
    name: 'Legado del Escriba',
    desc: '+10% legado ganado',
    cost: 12,
    effect_type: 'prestige_mult',
    effect_value: 1.1,
    requires: ['leg_arrranque'],
    row: 2, col: 8,
  },
  {
    id: 'leg_sabiduria',
    name: 'Sabiduría',
    desc: '+25% legado ganado',
    cost: 20,
    effect_type: 'prestige_mult',
    effect_value: 1.25,
    requires: ['leg_escriba'],
    row: 3, col: 9,
  },
  {
    id: 'leg_leyenda',
    name: 'Leyenda',
    desc: '+50% legado ganado',
    cost: 35,
    effect_type: 'prestige_mult',
    effect_value: 1.5,
    requires: ['leg_sabiduria'],
    row: 4, col: 9,
  },
];

export const UPGRADES_BY_CAT = {
  idle: UPGRADES.filter(u => u.cat === 'idle'),
  tipeo: UPGRADES.filter(u => u.cat === 'tipeo'),
  tinta: UPGRADES.filter(u => u.cat === 'tinta'),
} as const;

export function getLegacyByRow(): LegacyUpg[][] {
  const maxRow = Math.max(...LEGACY_UPGRADES.map(u => u.row));
  const rows: LegacyUpg[][] = Array.from({ length: maxRow + 1 }, () => []);
  for (const u of LEGACY_UPGRADES) {
    rows[u.row].push(u);
  }
  return rows;
}

export function getLegacyByCol(row: number): LegacyUpg[] {
  return LEGACY_UPGRADES.filter(u => u.row === row).sort((a, b) => a.col - b.col);
}

const IDLE_IDS = UPGRADES.filter(u => u.cat === 'idle').map(u => u.id);
export function getIdleUpgradeIds(count: number): string[] {
  return IDLE_IDS.slice(0, count);
}
