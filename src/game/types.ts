export interface GameData {
  palabras: number
  tinta: number
  palabrasTotales: number
  era: string
  upgrades: string[]
  racha: number
  wpm: number
  ultimoTipeo: number
  legado: number
  legadoUpgrades: string[]
  prestigeCount: number
  palabraIndex: number
  palabraActual: string
}

export type UpgradeEffect =
  | 'palabras_ps'
  | 'tinta_ps'
  | 'palabras_por_palabra'
  | 'tinta_por_palabra_mult'

export type LegacyEffect =
  | 'mult_global'
  | 'tipeo_mult'
  | 'tinta_mult'
  | 'racha_inicial'
  | 'tinta_inicial'
  | 'free_idle_upgrades'
  | 'prestige_mult'

export interface Upgrade {
  id: string
  name: string
  desc: string
  cost: number
  cat: 'idle' | 'tipeo' | 'tinta'
  effect_type: UpgradeEffect
  effect_value: number
}

export interface LegacyUpg {
  id: string
  name: string
  desc: string
  cost: number
  effect_type: LegacyEffect
  effect_value: number
  requires?: string[]
  row: number
  col: number
}

export interface Era {
  id: string
  name: string
  desc: string
  threshold: number
  mult: number
}
