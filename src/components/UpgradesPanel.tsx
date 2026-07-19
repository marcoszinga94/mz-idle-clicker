import type { GameData } from '../game/types';
import { UPGRADES_BY_CAT } from '../game/data';
import { fmtNum } from '../game/logic';

interface Props {
  data: GameData;
  onBuy: (id: string) => void;
}

const CAT_LABELS: Record<string, string> = {
  idle: 'Generación Automática',
  tipeo: 'Poder de Tipeo',
  tinta: 'Producción de Tinta',
};

const CAT_COLS: Record<string, string> = {
  idle: 'grid-cols-1',
  tipeo: 'grid-cols-1',
  tinta: 'grid-cols-1',
};

export default function UpgradesPanel({ data, onBuy }: Props) {
  return (
    <div className="card p-3 overflow-y-auto min-h-0">
      <h2 className="text-sm font-semibold text-text mb-3">Mejoras</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.entries(UPGRADES_BY_CAT) as [string, typeof UPGRADES_BY_CAT.idle][]).map(([cat, upgrades]) => {
          const sorted = [...upgrades].sort((a, b) => a.cost - b.cost);
          return (
          <div key={cat} className="min-w-0">
            <h3 className="text-xs uppercase tracking-wider text-accent mb-2">
              {CAT_LABELS[cat]}
            </h3>
            <div className={`grid ${CAT_COLS[cat]} gap-1.5`}>
              {sorted.map(u => {
                const owned = data.upgrades.includes(u.id);
                const canBuy = data.tinta >= u.cost && !owned;
                return (
                  <button
                    key={u.id}
                    onClick={() => canBuy && onBuy(u.id)}
                    disabled={owned || !canBuy}
                    className={`flex flex-col gap-1 px-2.5 py-2 rounded-lg text-left transition-all ${
                      owned
                        ? 'bg-surface-card/60 border border-surface-border/50'
                        : canBuy
                          ? 'bg-surface-card border border-surface-border hover:border-accent hover:bg-surface-hover cursor-pointer'
                          : 'bg-surface-card/40 border border-surface-border/30 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-medium truncate ${owned ? 'text-text-muted' : 'text-text'}`}>
                        {owned ? '✓ ' : ''}{u.name}
                      </span>
                      <span className="flex-shrink-0">
                        {owned ? (
                          <span className="badge badge-green text-[10px]">OK</span>
                        ) : (
                          <span className={`badge text-[10px] ${canBuy ? 'badge-blue' : 'badge-orange'}`}>
                            {fmtNum(u.cost)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-[10px] text-text-dim leading-tight">{u.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
