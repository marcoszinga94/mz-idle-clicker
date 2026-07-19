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
    <div className="card px-4 py-2 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-wider">Palabras</span>
          <span className="text-xl font-bold font-mono text-accent">{fmtNum(data.palabras)}</span>
        </div>
        <div className="w-px h-6 bg-surface-border" />
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-wider">Tinta</span>
          <span className="text-xl font-bold font-mono text-accent-green">{fmtNum(data.tinta)}</span>
        </div>
        <div className="w-px h-6 bg-surface-border" />
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-wider">Legado</span>
          <span className="text-lg font-bold font-mono text-accent-purple">{fmtNum(data.legado)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-text-muted">
            <span className="text-accent">+{fmtNum(pp)}</span> palabras/s
            <span className="mx-1">·</span>
            <span className="text-accent-green">+{fmtNum(tp)}</span> tinta/s
          </div>
          <div className="text-xs text-text-muted">
            Racha <span className="text-accent-orange font-mono">{data.racha}</span> · Prestigios <span className="text-accent-purple font-mono">{data.prestigeCount}</span>
          </div>
        </div>
        <button className="btn text-[11px] opacity-50 hover:opacity-100" onClick={onReset} title="Reiniciar juego">
          ↺
        </button>
      </div>
    </div>
  );
}
