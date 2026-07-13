'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale } from 'next-intl';

// Generic "Read more / Read less" wrapper. Clips its children behind a fade and
// a pill toggle. The fade + button colours adapt to the surface the block sits
// on. If the content already fits within the collapsed height, the toggle and
// fade are dropped entirely.
const SURFACE = {
  sand: {
    fade: 'from-desert-sand',
    btn: 'border-unibo-red/45 text-unibo-red hover:bg-unibo-red hover:text-white focus-visible:bg-unibo-red focus-visible:text-white',
  },
  petroleum: {
    fade: 'from-petroleum-blue',
    btn: 'border-desert-sand/45 text-desert-sand hover:bg-desert-sand hover:text-petroleum-blue focus-visible:bg-desert-sand focus-visible:text-petroleum-blue',
  },
} as const;

export default function Collapsible({
  children,
  surface = 'sand',
  collapsedClass = 'max-h-72',
  id,
}: {
  children: ReactNode;
  surface?: keyof typeof SURFACE;
  collapsedClass?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(true);
  const isIt = useLocale() === 'it';
  const ref = useRef<HTMLDivElement>(null);
  const s = SURFACE[surface];
  const bodyId = id ? `${id}-body` : undefined;

  // After first paint, if the (collapsed) content isn't actually overflowing,
  // there's nothing to reveal — show it in full and hide the controls.
  useEffect(() => {
    const el = ref.current;
    if (el) setNeedsToggle(el.scrollHeight - el.clientHeight > 4);
  }, []);

  const clipped = needsToggle && !open;

  return (
    <div>
      <div
        ref={ref}
        id={bodyId}
        className={`relative ${clipped ? `${collapsedClass} overflow-hidden` : ''}`}
      >
        {children}
        {clipped && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${s.fade} to-transparent`}
          />
        )}
      </div>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={bodyId}
          className={`group mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${s.btn}`}
        >
          {open ? (isIt ? 'Leggi meno' : 'Read less') : isIt ? 'Leggi tutto' : 'Read more'}
          <span
            aria-hidden
            className={`transition-transform duration-200 ${
              open ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
          >
            ↓
          </span>
        </button>
      )}
    </div>
  );
}
