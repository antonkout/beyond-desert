'use client';
import PanelBody from './PanelBody';
import Collapsible from './Collapsible';
import type { Panel } from '@/app/[locale]/history/panels';

// A research panel (kicker + title) whose long body collapses behind a
// "Read more" toggle. `tone="dark"` makes it legible over a photo backdrop
// (light text + petroleum fade); the default light tone sits on desert-sand.
export default function CollapsiblePanel({
  panel,
  collapsedClass = 'max-h-72',
  tone = 'light',
}: {
  panel: Panel;
  collapsedClass?: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <section
      id={panel.id}
      className={`mb-16 scroll-mt-24 ${dark ? 'text-desert-sand' : 'text-deep-basalt'}`}
    >
      <p
        className={`text-xs tracking-[0.25em] uppercase mb-2 ${
          dark ? 'text-desert-sand/70' : 'text-unibo-red'
        }`}
      >
        {panel.kicker}
      </p>
      <h2
        className={`font-display text-3xl md:text-4xl mb-8 ${
          dark ? 'text-desert-sand' : 'text-deep-basalt'
        }`}
      >
        {panel.title}
      </h2>
      <Collapsible
        surface={dark ? 'petroleum' : 'sand'}
        collapsedClass={collapsedClass}
        id={`panel-${panel.id}`}
      >
        <PanelBody panel={panel} />
      </Collapsible>
    </section>
  );
}
