'use client';
import { useState } from 'react';
import PanelBody from './PanelBody';
import type { Panel } from '@/app/[locale]/history/panels';

// A research panel whose long body collapses behind a "Read more" toggle.
// Used in the Research section, which sits on the desert-sand background — the
// fade gradient is tuned to that surface.
export default function CollapsiblePanel({
  panel,
  collapsedClass = 'max-h-72',
}: {
  panel: Panel;
  collapsedClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const bodyId = `panel-body-${panel.id}`;

  return (
    <section id={panel.id} className="mb-16 scroll-mt-24 text-deep-basalt">
      <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
        {panel.kicker}
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-8 text-deep-basalt">
        {panel.title}
      </h2>

      <div
        id={bodyId}
        className={`relative ${open ? '' : `${collapsedClass} overflow-hidden`}`}
      >
        <PanelBody panel={panel} />
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-desert-sand to-transparent"
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="group mt-6 inline-flex items-center gap-2 rounded-full border border-unibo-red/45 px-5 py-2 text-sm font-semibold text-unibo-red transition-colors hover:bg-unibo-red hover:text-white focus-visible:bg-unibo-red focus-visible:text-white"
      >
        {open ? 'Read less' : 'Read more'}
        <span
          aria-hidden
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : 'group-hover:translate-y-0.5'
          }`}
        >
          ↓
        </span>
      </button>
    </section>
  );
}
