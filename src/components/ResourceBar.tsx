import type { GameData } from '../game/types';
import { fmtNum, getPalabrasPs, getTintaPs } from '../game/logic';

interface Props {
  data: GameData;
  onReset: () => void;
}

export default function ResourceBar({ data, onReset }: Props) {
  const pp = getPalabrasPs(data);
  const tp = getTintaPs(data);

  return (
    <div className="card px-3 md:px-4 py-1.5 md:py-2 flex items-center justify-between gap-2 md:gap-4 flex-wrap">
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-wider">Palabras</span>
          <span className="text-base md:text-xl font-bold font-mono text-accent">{fmtNum(data.palabras)}</span>
        </div>
        <div className="hidden sm:block w-px h-5 md:h-6 bg-surface-border" />
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-wider">Tinta</span>
          <span className="text-base md:text-xl font-bold font-mono text-accent-green">{fmtNum(data.tinta)}</span>
        </div>
        <div className="hidden md:block w-px h-6 bg-surface-border" />
        <div className="hidden md:flex items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-wider">Legado</span>
          <span className="text-lg font-bold font-mono text-accent-purple">{fmtNum(data.legado)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="text-right">
          <div className="text-[10px] md:text-xs text-text-muted leading-tight">
            <span className="text-accent">+{fmtNum(pp)}</span> p/s
            <span className="mx-1">·</span>
            <span className="text-accent-green">+{fmtNum(tp)}</span> t/s
          </div>
          <div className="text-[10px] md:text-xs text-text-muted leading-tight">
            🔥{data.racha} · ⭐{data.prestigeCount}
          </div>
        </div>
        <button className="btn text-[11px] opacity-50 hover:opacity-100" onClick={onReset} title="Reiniciar juego">
          ↺
        </button>
      </div>
    </div>
  );
}
