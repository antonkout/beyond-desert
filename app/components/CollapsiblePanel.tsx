'use client';
import PanelBody from './PanelBody';
import Collapsible from './Collapsible';
import type { Panel } from '@/app/[locale]/history/panels';

// A research panel (kicker + title) whose long body collapses behind a
// "Read more" toggle. Sits on the desert-sand surface.
export default function CollapsiblePanel({
  panel,
  collapsedClass = 'max-h-72',
}: {
  panel: Panel;
  collapsedClass?: string;
}) {
  return (
    <section id={panel.id} className="mb-16 scroll-mt-24 text-deep-basalt">
      <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
        {panel.kicker}
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-8 text-deep-basalt">
        {panel.title}
      </h2>
      <Collapsible surface="sand" collapsedClass={collapsedClass} id={`panel-${panel.id}`}>
        <PanelBody panel={panel} />
      </Collapsible>
    </section>
  );
}
