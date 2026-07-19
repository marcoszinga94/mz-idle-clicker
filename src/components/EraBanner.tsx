import type { GameData } from '../game/types';
import { getEraProgress } from '../game/eras';
import { fmtNum } from '../game/logic';

interface Props {
  data: GameData;
}

const ERA_ICONS: Record<string, string> = {
  gestos: '🫃',
  pictogramas: '🖐️',
  arcilla: '🏺',
  papiro: '📜',
  pergamino: '📖',
  papel_tinta: '📰',
  lapiz: '✏️',
  maquina: '⌨️',
  teclado: '💻',
  neuronal: '🧠',
};

export default function EraBanner({ data }: Props) {
  const { current, next, progress } = getEraProgress(data.palabrasTotales);
  const icon = ERA_ICONS[current.id] || '✍️';

  return (
    <div className="card px-4 py-2 flex items-center gap-3">
      <span className="text-2xl era-glow">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text">{current.name}</span>
          <span className="text-[11px] text-text-muted">×{current.mult}</span>
        </div>
        <div className="text-[12px] text-text-muted truncate">{current.desc}</div>
      </div>
      {next && (
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-text-dim">Próxima era</div>
            <div className="text-xs text-text-muted">{next.name} ×{next.mult}</div>
          </div>
          <div className="w-24">
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-accent"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-text-dim text-right mt-0.5">
              {fmtNum(data.palabrasTotales)} / {fmtNum(next.threshold)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
