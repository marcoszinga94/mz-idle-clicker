import { useRef, useEffect, useState, useCallback } from 'react';
import type { GameData } from '../game/types';
import { fmtNum, getPalabrasPorPalabra, getTintaPorPalabra, getRachaMult } from '../game/logic';

interface Props {
  data: GameData;
  onFrase: (frase: string) => void;
  onError: () => void;
  extraClass?: string;
}

function charsMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return norm(a) === norm(b);
}

function isDiacritic(ch: string): boolean {
  if (DIACRITICS.has(ch)) return true;
  const cp = ch.codePointAt(0)!;
  if (cp >= 0x0300 && cp <= 0x036f) return true;       // Combining diacritical marks
  if (cp >= 0x1dc0 && cp <= 0x1dff) return true;       // Combining diacritical marks supplement
  if (cp >= 0x20d0 && cp <= 0x20ff) return true;       // Combining diacritical marks for symbols
  if (cp >= 0xfe20 && cp <= 0xfe2f) return true;       // Combining half marks
  return false;
}

const DIACRITICS = new Set([
  "'", '`', '^', '~', '"',
  '\u00b4', // ´ ACUTE ACCENT
  '\u00a8', // ¨ DIAERESIS
  '\u02dc', // ˜ SMALL TILDE
]);

const COMPOSE: Record<string, Record<string, string>> = {
  "'": { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' },
  '\u00b4': { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' },
  '`': { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù' },
  '"': { u: 'ü', a: 'ä', e: 'ë', i: 'ï', o: 'ö' },
  '\u00a8': { u: 'ü', a: 'ä', e: 'ë', i: 'ï', o: 'ö' },
  '~': { n: 'ñ', a: 'ã', o: 'õ' },
  '\u02dc': { n: 'ñ', a: 'ã', o: 'õ' },
  '^': { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û' },
};

export default function WriterScreen({ data, onFrase, onError, extraClass = '' }: Props) {
  const [input, setInput] = useState('');
  const [lastFrase, setLastFrase] = useState('');
  const [showPop, setShowPop] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const target = data.palabraActual || 'Escribe la frase aqui';
  const completedRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [target]);

  useEffect(() => {
    const h = () => inputRef.current?.focus();
    window.addEventListener('click', h);
    return () => window.removeEventListener('click', h);
  }, []);

  const submitFrase = useCallback((frase: string) => {
    if (frase.length === 0 || completedRef.current) return;
    completedRef.current = true;
    setInput('');
    setLastFrase(frase);
    setShowPop(true);
    setJustCompleted(true);
    onFrase(frase);
    setTimeout(() => {
      setShowPop(false);
      setJustCompleted(false);
      completedRef.current = false;
    }, 400);
  }, [onFrase]);

  useEffect(() => {
    if (charsMatch(input, target) && target.length > 0 && !completedRef.current) {
      submitFrase(target);
    }
  }, [input, target, submitFrase]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (justCompleted) return;
    let val = e.target.value;

    if (val.length > target.length) return;

    // Compose diacritic + letter → accented char
    if (val.length >= 2) {
      const comb = val[val.length - 2];
      const letter = val[val.length - 1];
      const composed = COMPOSE[comb]?.[letter];
      if (composed) {
        val = val.slice(0, -2) + composed;
      }
    }

    if (val.length > target.length) return;

    if (val.length > 0) {
      const lastIdx = val.length - 1;
      if (!charsMatch(val[lastIdx], target[lastIdx]) && !isDiacritic(val[lastIdx])) {
        onError();
      }
    }

    setInput(val);
  }, [target, justCompleted, onError]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !justCompleted) {
      e.preventDefault();
      if (charsMatch(input, target) && target.length > 0) {
        submitFrase(target);
      }
    }
  }, [input, target, justCompleted, submitFrase]);

  const pp = getPalabrasPorPalabra(data);
  const tp = getTintaPorPalabra(data);
  const rachaMult = getRachaMult(data);
  const puntos = target.length * pp * rachaMult;
  const tinta = target.length * tp * rachaMult;

  const letras = target.split('').map((ch, i) => {
    const typed = input[i];
    if (typed === undefined) return { ch, state: 'pending' as const };
    if (charsMatch(typed, ch)) return { ch, state: 'correct' as const };
    if (isDiacritic(typed)) return { ch, state: 'accent' as const };
    return { ch, state: 'wrong' as const };
  });

  const completada = charsMatch(input, target);
  const errores = letras.some(l => l.state === 'wrong');

  return (
    <div className={`card p-4 glow-blue flex flex-col gap-3 overflow-y-auto ${extraClass}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-text-muted">
          Escribe la frase exacta
        </span>
        {data.racha > 0 && (
          <span className="badge badge-orange">
            🔥 ×{rachaMult.toFixed(1)} (racha {data.racha})
          </span>
        )}
      </div>

      <div className="text-center py-4 px-2">
        <div
          className="text-xl md:text-2xl font-serif tracking-wide leading-relaxed select-none break-words"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {letras.map((l, i) => {
            const isSpace = l.ch === ' ';
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-100 ${
                  isSpace ? 'px-1' : ''
                } ${
                  l.state === 'correct' ? 'text-accent-green' :
                  l.state === 'wrong' ? 'text-accent-red underline decoration-wavy' :
                  l.state === 'accent' ? 'text-text-muted' :
                  'text-text-dim'
                }`}
              >
                {isSpace ? '\u00A0\u25CB\u00A0' : l.ch}
              </span>
            );
          })}
        </div>

        <div className="relative max-w-md mx-auto mt-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={justCompleted ? '' : 'Tipea la frase aqui...'}
            className={`writer-input text-center text-base md:text-lg border-b-2 transition-colors w-full ${
              justCompleted ? 'border-accent-green' :
              input.length === 0 ? 'border-surface-border' :
              completada ? 'border-accent-green' :
              errores ? 'border-accent-red' :
              'border-accent'
            }`}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            readOnly={justCompleted}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-dim">
        <span>
          Frase #{data.palabraIndex + 1} · {target.length} caracteres
          <span className="ml-2 text-accent">{Math.round(data.wpm)} PPM</span>
          {errores && <span className="text-accent-red ml-2">Corrige antes de continuar</span>}
        </span>
        <span>
          +{fmtNum(puntos)} palabras · +{fmtNum(tinta)} tinta
        </span>
      </div>

      {lastFrase && showPop && (
        <div className="word-pop text-sm text-accent-green font-mono text-center">
          ✓ Completada — +{fmtNum(puntos)} palabras · +{fmtNum(tinta)} tinta
        </div>
      )}
    </div>
  );
}
