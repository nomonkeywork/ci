'use client';

import { useState, useEffect } from 'react';

const DEFAULT_VARIANTS = [
  { slot1: 'do the monkey work. ', slot2: 'do the real work.' },
  { slot1: 'do the monkey moves. ', slot2: 'make the money moves.' },
  { slot1: 'deal with the monkey business. ', slot2: 'deal with the money business.' },
];

const TYPE_SPEED = 45;
const ERASE_SPEED = 28;
const HOLD_MS = 2800;
const START_DELAY = 700;

type Variant = { slot1: string; slot2: string };
type Setter = React.Dispatch<React.SetStateAction<string>>;

export default function TypewriterLines({
  className,
  style,
  variants = DEFAULT_VARIANTS,
  staticWe = 'We',
  staticYou = 'You',
}: {
  className?: string;
  style?: React.CSSProperties;
  variants?: Variant[];
  staticWe?: string;
  staticYou?: string;
}) {
  const [slot1, setSlot1] = useState('');
  const [slot2, setSlot2] = useState('');
  const [youVisible, setYouVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState<1 | 2>(1);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let alive = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const clear = () =>
      timers.forEach((t) => {
        clearTimeout(t);
        clearInterval(t as unknown as number);
      });

    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const t = setTimeout(r, ms);
        timers.add(t);
      });

    const type = (setter: Setter, text: string) =>
      new Promise<void>((r) => {
        let i = 0;
        const iv = setInterval(() => {
          if (!alive) {
            clearInterval(iv);
            return;
          }
          setter(text.slice(0, ++i));
          if (i >= text.length) {
            clearInterval(iv);
            timers.delete(iv as unknown as ReturnType<typeof setTimeout>);
            r();
          }
        }, TYPE_SPEED);
        timers.add(iv as unknown as ReturnType<typeof setTimeout>);
      });

    const erase = (setter: Setter) =>
      new Promise<void>((r) => {
        const iv = setInterval(() => {
          if (!alive) {
            clearInterval(iv);
            return;
          }
          setter((prev) => {
            if (prev.length <= 1) {
              clearInterval(iv);
              timers.delete(iv as unknown as ReturnType<typeof setTimeout>);
              setTimeout(r, 0);
              return '';
            }
            return prev.slice(0, -1);
          });
        }, ERASE_SPEED);
        timers.add(iv as unknown as ReturnType<typeof setTimeout>);
      });

    (async () => {
      await wait(START_DELAY);
      if (!alive) return;

      // Type first variant
      setCursorPos(1);
      await type(setSlot1, variants[0].slot1);
      if (!alive) return;

      setYouVisible(true);
      setCursorPos(2);
      await type(setSlot2, variants[0].slot2);
      if (!alive) return;

      let idx = 0;

      while (alive) {
        setBlinking(true);
        await wait(HOLD_MS);
        if (!alive) break;
        setBlinking(false);

        const next = variants[(idx + 1) % variants.length];

        // Swap slot1
        setCursorPos(1);
        await erase(setSlot1);
        if (!alive) break;
        await type(setSlot1, next.slot1);
        if (!alive) break;

        // Swap slot2
        setCursorPos(2);
        await erase(setSlot2);
        if (!alive) break;
        await type(setSlot2, next.slot2);
        if (!alive) break;

        idx = (idx + 1) % variants.length;
      }
    })();

    return () => {
      alive = false;
      clear();
    };
  }, [variants]);

  return (
    <p className={className} style={style}>
      {`${staticWe} `}
      <span>{slot1}</span>
      {cursorPos === 1 && (
        <span className={`typewriter-cursor${blinking ? ' typewriter-cursor--blink' : ''}`} />
      )}
      {youVisible && `${staticYou} `}
      <span>{slot2}</span>
      {cursorPos === 2 && youVisible && (
        <span className={`typewriter-cursor${blinking ? ' typewriter-cursor--blink' : ''}`} />
      )}
    </p>
  );
}
