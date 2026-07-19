import type { GameData, LegacyUpg } from './types';
import { UPGRADES, LEGACY_UPGRADES, getIdleUpgradeIds } from './data';
import { getEra } from './eras';
import FRASES, { shuffleArray } from './words';

// ── Formateo ──────────────────────────────────────────

export function fmtNum(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000_000) return (abs / 1_000_000_000_000).toFixed(2) + 'T';
  if (abs >= 1_000_000_000) return (abs / 1_000_000_000).toFixed(2) + 'B';
  if (abs >= 1_000_000) return (abs / 1_000_000).toFixed(2) + 'M';
  if (abs >= 10_000) return Math.floor(abs / 1_000).toLocaleString() + 'K';
  if (abs >= 1) return Math.floor(abs).toLocaleString();
  if (abs > 0) return abs.toFixed(1);
  return '0';
}

// ── Pool de frases ────────────────────────────────────

let frasePool: string[] = [];

function getFrase(index: number): string {
  if (frasePool.length === 0) frasePool = shuffleArray(FRASES);
  return frasePool[index % frasePool.length];
}

export function pickFrase(index: number): string {
  return getFrase(index);
}

// ── Cálculos ──────────────────────────────────────────

function getProdMultipliers(data: GameData): { global: number; tipeo: number; tinta: number } {
  let global = 1;
  let tipeo = 1;
  let tintaVal = 1;
  for (const id of data.legadoUpgrades) {
    const lu = LEGACY_UPGRADES.find(u => u.id === id);
    if (!lu) continue;
    switch (lu.effect_type) {
      case 'mult_global': global *= lu.effect_value; break;
      case 'tipeo_mult': tipeo *= lu.effect_value; break;
      case 'tinta_mult': tintaVal *= lu.effect_value; break;
    }
  }
  return { global, tipeo, tinta: tintaVal };
}

function getEraMult(data: GameData): number {
  return getEra(data.palabrasTotales).mult;
}

export function getPalabrasPs(data: GameData): number {
  let base = 0;
  for (const id of data.upgrades) {
    const u = UPGRADES.find(x => x.id === id);
    if (u && u.effect_type === 'palabras_ps') base += u.effect_value;
  }
  const mults = getProdMultipliers(data);
  return base * getEraMult(data) * mults.global;
}

export function getTintaPs(data: GameData): number {
  let base = getPalabrasPs(data) * 0.1;
  for (const id of data.upgrades) {
    const u = UPGRADES.find(x => x.id === id);
    if (u && u.effect_type === 'tinta_ps') base += u.effect_value;
  }
  const mults = getProdMultipliers(data);
  return base * mults.tinta * mults.global;
}

export function getPalabrasPorPalabra(data: GameData): number {
  let base = 0;
  for (const id of data.upgrades) {
    const u = UPGRADES.find(x => x.id === id);
    if (u && u.effect_type === 'palabras_por_palabra') base += u.effect_value;
  }
  const mults = getProdMultipliers(data);
  return (1 + base) * getEraMult(data) * mults.global * mults.tipeo;
}

export function getTintaPorPalabra(data: GameData): number {
  let base = 0.5;
  for (const id of data.upgrades) {
    const u = UPGRADES.find(x => x.id === id);
    if (u && u.effect_type === 'tinta_por_palabra_mult') base *= u.effect_value;
  }
  const mults = getProdMultipliers(data);
  return base * getEraMult(data) * mults.global * mults.tinta;
}

export function getRachaMult(data: GameData): number {
  return 1 + data.racha * 0.1;
}

export function getRachaTimeout(target: string, wpm: number): number {
  const wordCount = Math.max(1, target.length / 5);
  const expectedSec = wordCount / (wpm / 60);
  return Math.max(5000, Math.min(60000, Math.round(expectedSec * 4)));
}

function getRachaInicial(data: GameData): number {
  let bonus = 0;
  for (const id of data.legadoUpgrades) {
    const lu = LEGACY_UPGRADES.find(u => u.id === id);
    if (lu && lu.effect_type === 'racha_inicial') bonus += lu.effect_value;
  }
  return bonus;
}

function getTintaInicial(data: GameData): number {
  let bonus = 0;
  for (const id of data.legadoUpgrades) {
    const lu = LEGACY_UPGRADES.find(u => u.id === id);
    if (lu && lu.effect_type === 'tinta_inicial') bonus += lu.effect_value;
  }
  return bonus;
}

function getFreeIdleUpgrades(data: GameData): number {
  let count = 0;
  for (const id of data.legadoUpgrades) {
    const lu = LEGACY_UPGRADES.find(u => u.id === id);
    if (lu && lu.effect_type === 'free_idle_upgrades') count += lu.effect_value;
  }
  return count;
}

function getPrestigeMult(data: GameData): number {
  let mult = 1;
  for (const id of data.legadoUpgrades) {
    const lu = LEGACY_UPGRADES.find(u => u.id === id);
    if (lu && lu.effect_type === 'prestige_mult') mult *= lu.effect_value;
  }
  return mult;
}

// ── Estado inicial ────────────────────────────────────

export function createInitialState(): GameData {
  frasePool = shuffleArray(FRASES);
  return {
    palabras: 0,
    tinta: 0,
    palabrasTotales: 0,
    era: 'gestos',
    upgrades: [],
    racha: 0,
    wpm: 30,
    ultimoTipeo: 0,
    legado: 0,
    legadoUpgrades: [],
    prestigeCount: 0,
    palabraIndex: 0,
    palabraActual: getFrase(0),
  };
}

// ── Game tick ─────────────────────────────────────────

export function gameTick(data: GameData): GameData {
  const now = Date.now();

  const palabrasPs = getPalabrasPs(data);
  const tintaPs = getTintaPs(data);
  const delta = 0.1;

  let next = {
    ...data,
    upgrades: [...data.upgrades],
    legadoUpgrades: [...data.legadoUpgrades],
    palabras: data.palabras + palabrasPs * delta,
    tinta: data.tinta + tintaPs * delta,
    palabrasTotales: data.palabrasTotales + palabrasPs * delta,
    racha: now - data.ultimoTipeo > getRachaTimeout(data.palabraActual, data.wpm) ? 0 : data.racha,
    palabraActual: data.palabraActual,
  };

  next.era = getEra(next.palabrasTotales).id;
  return next;
}

// ── Acciones manuales ─────────────────────────────────

export function handleFrase(data: GameData, frase: string): GameData {
  const now = Date.now();
  const target = data.palabraActual;

  if (frase !== target) return data;

  const len = Math.max(1, frase.length);

  const nuevaRacha = data.racha + 1;

  const elapsed = now - data.ultimoTipeo;
  let newWpm = data.wpm;
  if (data.ultimoTipeo > 0 && elapsed > 0) {
    const phraseWpm = (frase.length / 5) / (elapsed / 60000);
    newWpm = Math.max(5, Math.min(200, data.wpm * 0.6 + phraseWpm * 0.4));
  }

  const rachaMult = getRachaMult(data);
  const tipeoBonus = getPalabrasPorPalabra(data);
  const tintaBonus = getTintaPorPalabra(data);

  const palabrasGanadas = len * tipeoBonus * rachaMult;
  const tintaGanada = len * tintaBonus * rachaMult;

  const nextIndex = data.palabraIndex + 1;
  const nextFrase = getFrase(nextIndex);

  return {
    ...data,
    upgrades: [...data.upgrades],
    legadoUpgrades: [...data.legadoUpgrades],
    palabras: data.palabras + palabrasGanadas,
    tinta: data.tinta + tintaGanada,
    palabrasTotales: data.palabrasTotales + palabrasGanadas,
    racha: nuevaRacha,
    wpm: newWpm,
    ultimoTipeo: now,
    palabraIndex: nextIndex,
    palabraActual: nextFrase,
  };
}

export function buyUpgrade(data: GameData, upgradeId: string): GameData {
  if (data.upgrades.includes(upgradeId)) return data;
  const u = UPGRADES.find(x => x.id === upgradeId);
  if (!u) return data;
  if (data.tinta < u.cost) return data;
  return {
    ...data,
    upgrades: [...data.upgrades, upgradeId],
    tinta: data.tinta - u.cost,
  };
}

// ── Prestigio ─────────────────────────────────────────

export function getPrestigeCost(data: GameData): number {
  return Math.floor(80 * Math.pow(data.prestigeCount + 1, 1.6));
}

export function getPrestigeGain(data: GameData): number {
  const div = 20 + 12 * data.prestigeCount;
  const raw = Math.floor(Math.sqrt(data.palabrasTotales) / div);
  return Math.max(1, Math.floor(raw * getPrestigeMult(data)));
}

export function prestigePublish(data: GameData): GameData {
  const gain = getPrestigeGain(data);
  if (data.palabrasTotales < getPrestigeCost(data)) return data;

  frasePool = shuffleArray(FRASES);

  const next: GameData = {
    ...createInitialState(),
    legado: data.legado + gain,
    legadoUpgrades: [...data.legadoUpgrades],
    prestigeCount: data.prestigeCount + 1,
    wpm: 30,
  };

  const freeIdle = getFreeIdleUpgrades(next);
  if (freeIdle > 0) {
    next.upgrades = getIdleUpgradeIds(freeIdle);
  }

  const tintaBonus = getTintaInicial(next);
  if (tintaBonus > 0) {
    next.tinta = tintaBonus;
  }

  const rachaBase = getRachaInicial(next);
  if (rachaBase > 0) {
    next.racha = rachaBase;
  }

  return next;
}

export function buyLegacyUpgrade(data: GameData, id: string): GameData {
  if (data.legadoUpgrades.includes(id)) return data;
  const lu = LEGACY_UPGRADES.find(u => u.id === id);
  if (!lu) return data;
  if (data.legado < lu.cost) return data;

  if (lu.requires) {
    for (const req of lu.requires) {
      if (!data.legadoUpgrades.includes(req)) return data;
    }
  }

  const next: GameData = {
    ...data,
    upgrades: [...data.upgrades],
    legadoUpgrades: [...data.legadoUpgrades, id],
    legado: data.legado - lu.cost,
  };

  if (lu.effect_type === 'free_idle_upgrades') {
    const newFree = getFreeIdleUpgrades(next);
    const ids = getIdleUpgradeIds(newFree);
    for (const id of ids) {
      if (!next.upgrades.includes(id)) next.upgrades.push(id);
    }
  }

  if (lu.effect_type === 'tinta_inicial') {
    next.tinta += lu.effect_value;
  }

  if (lu.effect_type === 'racha_inicial') {
    next.racha += lu.effect_value;
  }

  return next;
}

// ── Tree helpers ───────────────────────────────────────

export function getChildren(id: string): LegacyUpg[] {
  return LEGACY_UPGRADES.filter(u => u.requires?.includes(id));
}

export function getParent(node: LegacyUpg): LegacyUpg | null {
  if (!node.requires || node.requires.length === 0) return null;
  return LEGACY_UPGRADES.find(u => u.id === node.requires[0]) ?? null;
}

export interface TreeConnection {
  fromId: string
  toId: string
  from: { row: number; col: number }
  to: { row: number; col: number }
}

export function getTreeConnections(): TreeConnection[] {
  const conns: TreeConnection[] = [];
  for (const node of LEGACY_UPGRADES) {
    if (!node.requires) continue;
    for (const reqId of node.requires) {
      const parent = LEGACY_UPGRADES.find(u => u.id === reqId);
      if (parent) {
        conns.push({
          fromId: parent.id,
          toId: node.id,
          from: { row: parent.row, col: parent.col },
          to: { row: node.row, col: node.col },
        });
      }
    }
  }
  return conns;
}

export function getLegacyCount(data: GameData): number {
  return data.legadoUpgrades.length;
}

export function getTotalLegacyNodes(): number {
  return LEGACY_UPGRADES.length;
}

// ── Save / Load ───────────────────────────────────────

const SAVE_KEY = 'idleclicker-save-v2';

export function saveGame(data: GameData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch { /* */ }
}

export function loadGame(): GameData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const partial = JSON.parse(raw) as Partial<GameData>;
    const defaults = createInitialState();
    const data: GameData = { ...defaults, ...partial, upgrades: partial.upgrades ?? [], legadoUpgrades: partial.legadoUpgrades ?? [] };
    if (partial.palabraIndex === undefined || !data.palabraActual) {
      data.palabraIndex = 0;
      data.palabraActual = getFrase(0);
    }
    return data;
  } catch {
    return null;
  }
}

export function resetGame(): GameData {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch { /* */ }
  return createInitialState();
}
