import type { GameData } from '../game/types';
import { fmtNum, getPrestigeCost, getPrestigeGain } from '../game/logic';

interface Props {
  data: GameData;
  onPrestige: () => void;
  onOpenLegacyTree: () => void;
}

export default function PrestigePanel({ data, onPrestige, onOpenLegacyTree }: Props) {
  const cost = getPrestigeCost(data);
  const gain = getPrestigeGain(data);
  const canPrestige = data.palabrasTotales >= cost;

  return (
    <div className="card p-3 flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text">Legado</h2>

      <div className="text-center p-4 bg-surface-card rounded-lg border border-surface-border">
        <div className="text-xs text-text-muted mb-1">Publicar Obra Maestra</div>
        <div className="text-2xl font-bold text-accent-purple font-mono">{fmtNum(gain)}</div>
        <div className="text-[11px] text-text-dim">
          Puntos de Legado
          {!canPrestige && (
            <span className="block text-accent-orange mt-1">
              Necesitas {fmtNum(cost)} palabras totales
            </span>
          )}
        </div>
      </div>

      <button
        className={`btn w-full ${canPrestige ? 'btn-success' : ''}`}
        disabled={!canPrestige}
        onClick={onPrestige}
      >
        📖 Publicar Obra Maestra
      </button>

      <p className="text-[11px] text-text-dim text-center leading-relaxed">
        Al publicar, perderás tus palabras, tinta y mejoras actuales,
        pero ganarás Puntos de Legado para mejoras permanentes.
      </p>

      <div className="border-t border-surface-border pt-3 mt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted">Puntos de Legado</span>
          <span className="text-sm font-mono text-accent-purple font-bold">{fmtNum(data.legado)}</span>
        </div>
        <button className="btn w-full btn-primary" onClick={onOpenLegacyTree}>
          🌳 Abrir Árbol de Legado
        </button>
      </div>
    </div>
  );
}
