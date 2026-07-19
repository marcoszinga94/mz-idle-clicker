import { useRef, useCallback, useEffect } from 'react';
import type { GameData, LegacyUpg } from '../game/types';
import { LEGACY_UPGRADES } from '../game/data';
import { fmtNum, getTreeConnections } from '../game/logic';
import { ERAS } from '../game/eras';

interface Props {
  data: GameData;
  onBuy: (id: string) => void;
  onClose: () => void;
}

const CELL_W = 160;
const CELL_H = 84;
const GAP_X = 16;
const GAP_Y = 12;
const ROWS = 8;
const COLS = 10;
const COL_H = 28;
const DRAG_THRESHOLD = 8;

const ERA_NAMES = ERAS.map(e => e.name);

function getNodePos(row: number, col: number) {
  return {
    x: col * (CELL_W + GAP_X),
    y: COL_H + 16 + row * (CELL_H + GAP_Y),
  };
}

function buildPath(conn: TreeConnection): string {
  const from = getNodePos(conn.from.row, conn.from.col);
  const to = getNodePos(conn.to.row, conn.to.col);
  const x1 = from.x + CELL_W / 2;
  const y1 = from.y + CELL_H;
  const x2 = to.x + CELL_W / 2;
  const y2 = to.y;
  const cy = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
}

function buildBranchPath(parent: { row: number; col: number }, children: TreeConnection[]): string[] {
  if (children.length === 0) return [];
  if (children.length === 1) return [buildPath(children[0])];

  const from = getNodePos(parent.row, parent.col);
  const cx = from.x + CELL_W / 2;
  const cy = from.y + CELL_H;

  const firstChild = children[0];
  const lastChild = children[children.length - 1];
  const firstPos = getNodePos(firstChild.to.row, firstChild.to.col);
  const lastPos = getNodePos(lastChild.to.row, lastChild.to.col);
  const midX = (firstPos.x + lastPos.x) / 2 + CELL_W / 2;
  const firstY = firstPos.y;
  const branchY = cy + (firstY - cy) * 0.45;

  const paths: string[] = [];

  const trunk = `M ${cx} ${cy} L ${midX} ${branchY}`;
  paths.push(trunk);

  for (const child of children) {
    const to = getNodePos(child.to.row, child.to.col);
    const ex = to.x + CELL_W / 2;
    const ey = to.y;
    const cy2 = (branchY + ey) / 2;
    const branchPath = `M ${midX} ${branchY} C ${midX} ${cy2}, ${ex} ${cy2}, ${ex} ${ey}`;
    paths.push(branchPath);
  }

  return paths;
}

function isOwned(data: GameData, id: string): boolean {
  return data.legadoUpgrades.includes(id);
}

function canAfford(data: GameData, cost: number): boolean {
  return data.legado >= cost;
}

function meetsReqs(data: GameData, node: LegacyUpg): boolean {
  if (!node.requires) return true;
  return node.requires.every(r => data.legadoUpgrades.includes(r));
}

function nodeState(data: GameData, node: LegacyUpg): 'owned' | 'available' | 'blocked' | 'unaffordable' {
  if (isOwned(data, node.id)) return 'owned';
  if (!meetsReqs(data, node)) return 'blocked';
  if (!canAfford(data, node.cost)) return 'unaffordable';
  return 'available';
}

export default function LegacyTreeModal({ data, onBuy, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, scrollX: 0, scrollY: 0, moved: false });

  const startDrag = useCallback((clientX: number, clientY: number) => {
    const d = dragRef.current;
    d.dragging = true;
    d.startX = clientX;
    d.startY = clientY;
    const el = containerRef.current;
    if (el) {
      d.scrollX = el.scrollLeft;
      d.scrollY = el.scrollTop;
    }
  }, []);

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    const d = dragRef.current;
    const dx = clientX - d.startX;
    const dy = clientY - d.startY;
    if (!d.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      d.dragging = true;
    }
    d.moved = true;
    const el = containerRef.current;
    if (el) {
      el.scrollLeft = d.scrollX - dx;
      el.scrollTop = d.scrollY - dy;
    }
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current.dragging = false;
    dragRef.current.moved = false;
  }, []);

  useEffect(() => {
    const onUp = () => { dragRef.current.dragging = false; };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    startDrag(e.clientX, e.clientY);
  }, [startDrag]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current.dragging) return;
    e.preventDefault();
    moveDrag(e.clientX, e.clientY);
  }, [moveDrag]);

  const onMouseUp = useCallback(() => endDrag(), [endDrag]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }
  }, [startDrag]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current.dragging) return;
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }
  }, [moveDrag]);

  const onTouchEnd = useCallback(() => endDrag(), [endDrag]);

  const connections = getTreeConnections();

  const totalW = COLS * (CELL_W + GAP_X) - GAP_X + 40;
  const totalH = ROWS * (CELL_H + GAP_Y) - GAP_Y + COL_H + 40;

  const totalNodes = LEGACY_UPGRADES.length;
  const ownedCount = data.legadoUpgrades.length;
  const progressPct = Math.round((ownedCount / totalNodes) * 100);

  const grouped: Record<string, TreeConnection[]> = {};
  for (const conn of connections) {
    if (!grouped[conn.fromId]) grouped[conn.fromId] = [];
    grouped[conn.fromId].push(conn);
  }

  const svgPaths: { key: string; d: string; owned: boolean }[] = [];
  for (const [parentId, children] of Object.entries(grouped)) {
    const parent = LEGACY_UPGRADES.find(u => u.id === parentId);
    if (!parent) continue;
    const allOwned = children.every(c =>
      isOwned(data, c.fromId) && isOwned(data, c.toId)
    );
    const paths = buildBranchPath(parent, children);
    for (const p of paths) {
      svgPaths.push({
        key: `${parentId}->${children.map(c => c.toId).join('+')}`,
        d: p,
        owned: allOwned,
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div
        className="card w-full md:w-[94vw] md:max-w-6xl h-full md:max-h-[90vh] md:m-2 p-0 animate-fade-in flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0 border-b border-surface-border/50">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-text flex items-center gap-2">
                🌳 Árbol de Legado
              </h2>
              <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                <span className="text-accent-purple font-mono font-semibold">{fmtNum(data.legado)}</span>
                <span className="text-text-dim">puntos</span>
                <span className="text-text-dim">·</span>
                <span>{ownedCount}/{totalNodes}</span>
                <span className="text-text-dim">habilidades</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-36">
              <div className="h-1.5 rounded-full bg-surface-card overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-[10px] text-text-dim mt-0.5 text-right">{progressPct}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] text-text-dim">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-green shadow-sm shadow-accent-green/50" /> dueño</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> disponible</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-red/60" /> bloqueado</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-surface-border/60" /> caro</span>
            </div>
            <button className="text-text-dim hover:text-text text-lg leading-none px-2 transition-colors" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tree area */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative overflow-auto flex-1 min-h-0 bg-gradient-to-br from-surface-card/20 via-surface-card/10 to-surface-card/5 cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* Subtle dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div style={{ width: totalW, height: totalH, position: 'relative' }}>
            {/* Column headers (era names) */}
            {ERA_NAMES.map((name, col) => (
              <div
                key={col}
                className="absolute text-[9px] uppercase tracking-widest text-text-dim font-semibold text-center pointer-events-none"
                style={{
                  left: col * (CELL_W + GAP_X) + 14,
                  top: 6,
                  width: CELL_W,
                }}
              >
                {name}
              </div>
            ))}

            {/* SVG connections */}
            <svg
              width={totalW}
              height={totalH}
              className="absolute inset-0 pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="path-owned" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3fb950" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2ea043" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="path-locked" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#30363d" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#21262d" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {svgPaths.map(sp => (
                <path
                  key={sp.key}
                  d={sp.d}
                  fill="none"
                  stroke={sp.owned ? 'url(#path-owned)' : 'url(#path-locked)'}
                  strokeWidth={sp.owned ? 2.5 : 1.2}
                  strokeLinecap="round"
                  style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                />
              ))}
            </svg>

            {/* Skill nodes */}
            {LEGACY_UPGRADES.map(node => {
              const pos = getNodePos(node.row, node.col);
              const state = nodeState(data, node);
              const canClick = state === 'available';

              const shadow = {
                owned: 'shadow-[0_0_12px_rgba(63,185,80,0.25)]',
                available: 'hover:shadow-[0_0_16px_rgba(88,166,255,0.35)]',
                blocked: '',
                unaffordable: '',
              }[state];

              const borderAccent = {
                owned: 'border-l-accent-green',
                available: 'border-l-accent',
                blocked: 'border-l-accent-red/50',
                unaffordable: 'border-l-surface-border/30',
              }[state];

              return (
                <button
                  key={node.id}
                  onClick={() => canClick && onBuy(node.id)}
                  disabled={!canClick}
                  className={`absolute flex flex-col p-2.5 rounded-lg border border-l-2 transition-all duration-200 cursor-default ${borderAccent} ${shadow}`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    width: CELL_W,
                    height: CELL_H,
                    background: state === 'owned'
                      ? 'linear-gradient(135deg, rgba(63,185,80,0.08), rgba(63,185,80,0.02))'
                      : state === 'available'
                        ? 'linear-gradient(135deg, rgba(88,166,255,0.06), transparent)'
                        : '',
                  }}
                >
                  <div className="flex items-center justify-between gap-1 min-w-0">
                    <span className={`text-[11px] font-semibold truncate flex items-center gap-1 ${
                      state === 'owned' ? 'text-accent-green' :
                      state === 'available' ? 'text-text' :
                      state === 'blocked' ? 'text-text-muted' :
                      'text-text-dim'
                    }`}>
                      {state === 'owned' && (
                        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                      )}
                      {state === 'blocked' && (
                        <svg className="w-3 h-3 flex-shrink-0 text-accent-red/70" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M4 8a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 014 8z" />
                        </svg>
                      )}
                      {node.name}
                    </span>
                    <span className={`flex-shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded-md ${
                      state === 'owned' ? 'bg-accent-green/15 text-accent-green' :
                      state === 'available' ? 'bg-accent/15 text-accent' :
                      state === 'blocked' ? 'bg-accent-red/10 text-accent-red/60' :
                      'bg-surface-border/20 text-text-dim'
                    }`}>
                      {fmtNum(node.cost)}
                    </span>
                  </div>
                  <div className={`text-[9px] leading-tight mt-1 line-clamp-2 ${
                    state === 'owned' ? 'text-text-dim' :
                    state === 'available' ? 'text-text-dim' :
                    'text-text-dim/60'
                  }`}>
                    {node.desc}
                  </div>
                  {state === 'blocked' && node.requires && (
                    <div className="text-[7px] text-accent-red/60 mt-1 truncate leading-tight">
                      Requiere: {node.requires.map(r => {
                        const p = LEGACY_UPGRADES.find(u => u.id === r);
                        return p ? p.name : r;
                      }).join(', ')}
                    </div>
                  )}
                  {state === 'unaffordable' && (
                    <div className="text-[7px] text-accent-orange/60 mt-1 leading-tight">
                      Faltan {fmtNum(node.cost - data.legado)} PP
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
