import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameData } from '../game/types';
import { createInitialState, gameTick, loadGame, saveGame, resetGame, handleFrase, buyUpgrade, prestigePublish, buyLegacyUpgrade, getPrestigeCost } from '../game/logic';
import { getEra } from '../game/eras';
import EraBanner from './EraBanner';
import WriterScreen from './WriterScreen';
import ResourceBar from './ResourceBar';
import UpgradesPanel from './UpgradesPanel';
import PrestigePanel from './PrestigePanel';
import LegacyTreeModal from './LegacyTreeModal';

type Tab = 'escribir' | 'mejoras' | 'legado';

const TABS: { id: Tab; icon: string }[] = [
  { id: 'escribir', icon: '✍️' },
  { id: 'mejoras', icon: '🔧' },
  { id: 'legado', icon: '📖' },
];

export default function App() {
  const [data, setData] = useState<GameData>(() => loadGame() || createInitialState());
  const [showLegacyTree, setShowLegacyTree] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('escribir');
  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => gameTick(prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const save = setInterval(() => saveGame(dataRef.current), 30000);
    return () => clearInterval(save);
  }, []);

  useEffect(() => {
    const h = () => saveGame(dataRef.current);
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, []);

  const act = useCallback((fn: (d: GameData) => GameData) => setData(fn), []);

  const onFrase = useCallback((frase: string) => {
    act(d => {
      if (frase.length === 0) return d;
      return handleFrase(d, frase);
    });
  }, [act]);

  const onError = useCallback(() => {}, []);

  const onBuyUpgrade = useCallback((id: string) => {
    act(d => buyUpgrade(d, id));
  }, [act]);

  const onPrestige = useCallback(() => {
    const d = dataRef.current;
    if (d.palabrasTotales < getPrestigeCost(d)) return;
    act(prestigePublish);
  }, [act]);

  const onBuyLegacy = useCallback((id: string) => {
    act(d => buyLegacyUpgrade(d, id));
  }, [act]);

  const era = getEra(data.palabrasTotales);
  const eraIdx = ['gestos', 'pictogramas', 'arcilla', 'papiro', 'pergamino', 'papel_tinta', 'lapiz', 'maquina', 'teclado', 'neuronal'].indexOf(era.id);

  const bgColors = [
    'from-stone-950 via-stone-900 to-amber-950',
    'from-stone-950 via-orange-950 to-amber-950',
    'from-orange-950 via-yellow-950 to-stone-950',
    'from-amber-950 via-yellow-950 to-stone-900',
    'from-stone-900 via-indigo-950 to-stone-950',
    'from-stone-900 via-blue-950 to-stone-950',
    'from-stone-950 via-slate-900 to-stone-900',
    'from-slate-900 via-gray-900 to-zinc-900',
    'from-gray-950 via-blue-950 to-indigo-950',
    'from-indigo-950 via-purple-950 to-black',
  ];
  const bgClass = bgColors[eraIdx] || bgColors[0];

  return (
    <div className={`h-dvh p-1.5 md:p-3 flex flex-col gap-1.5 md:gap-2 overflow-hidden bg-gradient-to-b ${bgClass}`}>
      <ResourceBar data={data} onReset={() => { setData(resetGame()); }} />
      <EraBanner data={data} />
      <WriterScreen data={data} onFrase={onFrase} onError={onError} extraClass="flex-1 min-h-[200px]" />

      {/* Desktop panels (hidden below lg) */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_24rem] gap-2 min-h-0 overflow-y-auto">
        <UpgradesPanel data={data} onBuy={onBuyUpgrade} />
        <PrestigePanel
          data={data}
          onPrestige={onPrestige}
          onOpenLegacyTree={() => setShowLegacyTree(true)}
        />
      </div>

      {/* Mobile bottom section */}
      <div className="lg:hidden flex flex-col gap-1.5">
        {/* Tab bar */}
        <div className="flex items-stretch gap-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === t.id
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'bg-surface-card/50 text-text-muted border border-surface-border/30'
              }`}
            >
              {t.icon} {t.id === 'escribir' ? 'Escribir' : t.id === 'mejoras' ? 'Mejoras' : 'Legado'}
            </button>
          ))}
        </div>
        {/* Panel content (only when not on escribir tab) */}
        {activeTab !== 'escribir' && (
          <div className="max-h-[35vh] overflow-y-auto">
            {activeTab === 'mejoras' && <UpgradesPanel data={data} onBuy={onBuyUpgrade} />}
            {activeTab === 'legado' && (
              <PrestigePanel
                data={data}
                onPrestige={onPrestige}
                onOpenLegacyTree={() => setShowLegacyTree(true)}
              />
            )}
          </div>
        )}
      </div>

      {showLegacyTree && (
        <LegacyTreeModal
          data={data}
          onBuy={onBuyLegacy}
          onClose={() => setShowLegacyTree(false)}
        />
      )}
    </div>
  );
}
