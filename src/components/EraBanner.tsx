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
    <div className="card px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 md:gap-3">
      <span className="text-lg md:text-2xl era-glow flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-xs md:text-sm font-semibold text-text truncate">{current.name}</span>
          <span className="text-[10px] md:text-[11px] text-text-muted flex-shrink-0">×{current.mult}</span>
        </div>
        <div className="text-[10px] md:text-[12px] text-text-muted truncate leading-tight md:leading-normal">{current.desc}</div>
      </div>
      {next && (
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <div className="w-20 md:w-24">
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-accent"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
            <div className="text-[9px] md:text-[10px] text-text-dim text-right mt-0.5 leading-tight">
              {fmtNum(data.palabrasTotales)} / {fmtNum(next.threshold)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
