'use client';
import { PANELS, type Block } from './panels';
import PanelBody, { slug } from '@/app/components/PanelBody';
import Collapsible from '@/app/components/Collapsible';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';
import Timeline from './Timeline';

// Renders the "historical journey" panel as a list of subsections, where each
// period heading (Palaeolithic, Neolithic, …) stays visible and its long body
// collapses behind a "Read more" toggle. Heading ids match the Timeline anchors.
function JourneySubsections({ blocks }: { blocks: Block[] }) {
  const groups: { heading?: Block; paras: Block[] }[] = [];
  for (const b of blocks) {
    if (b.type === 'h') groups.push({ heading: b, paras: [] });
    else {
      if (groups.length === 0) groups.push({ paras: [] });
      groups[groups.length - 1].paras.push(b);
    }
  }

  return (
    <div className="space-y-10">
      {groups.map((g, i) => {
        const body = (
          <div className="space-y-5 leading-relaxed">
            {g.paras.map((p, j) => (
              <p key={j} className="max-w-prose">
                {p.text}
              </p>
            ))}
          </div>
        );
        return (
          <div key={i}>
            {g.heading && (
              <h3
                id={slug(g.heading.text)}
                className="font-display font-extrabold text-xl md:text-2xl pt-4 mb-4 scroll-mt-24 text-unibo-red"
              >
                {g.heading.text}
              </h3>
            )}
            {g.heading ? (
              <Collapsible surface="petroleum" id={`journey-${slug(g.heading.text)}`}>
                {body}
              </Collapsible>
            ) : (
              body
            )}
          </div>
        );
      })}
    </div>
  );
}

// The history page now carries only the introduction and the long
// chronological journey. The other panels live on their own pages:
// "aflaj" -> Climate & Aflaj, "history-of-studies" and "current-excavations"
// -> Research, and "credits" -> the Exhibition section.
const HISTORY_PANELS = PANELS.filter(
  (p) => p.id === 'introduction' || p.id === 'history'
);

export default function History() {
  return (
    <article>
      {/* Page header over a camels-by-water backdrop */}
      <header className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
        <PhotoBackdrop src="/images/photos/history-bg.jpg" focal="center 50%" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            History
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            A history written in the sand
          </h1>
          <p className="max-w-prose text-lg opacity-85 leading-relaxed mb-10">
            From the first stone tools to the Islamic era, the Arabian Peninsula
            tells a far richer story than its deserts suggest. Follow the threads
            below — geography, the long chronological journey, oases and water,
            and four decades of University of Bologna fieldwork in Oman.
          </p>

          <nav aria-label="Section index" className="flex flex-wrap gap-3">
            {HISTORY_PANELS.map((panel) => (
              <a
                key={panel.id}
                href={`#${panel.id}`}
                className="inline-flex items-center gap-2 border border-desert-sand/30 rounded-full px-4 py-2 text-sm hover:border-desert-sand hover:bg-desert-sand/10 transition-colors"
              >
                {panel.kicker}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Panels, alternating background for visual rhythm */}
      {HISTORY_PANELS.map((panel, idx) => {
        const dark = idx % 2 === 1;
        return (
          <section
            key={panel.id}
            id={panel.id}
            className={`scroll-mt-20 py-16 md:py-20 ${
              dark
                ? 'bg-petroleum-blue text-desert-sand'
                : 'bg-desert-sand text-deep-basalt'
            }`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <p
                className={`text-xs tracking-[0.25em] uppercase mb-2 ${
                  dark ? 'text-desert-sand/60' : 'text-unibo-red'
                }`}
              >
                {panel.kicker}
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {panel.title}
              </h2>

              {panel.id === 'history' ? (
                <>
                  {/* Chronological bar sits on the historical-journey panel only */}
                  <Timeline />
                  <JourneySubsections blocks={panel.blocks ?? []} />
                </>
              ) : (
                <Collapsible surface="sand" id={`panel-${panel.id}`}>
                  <PanelBody panel={panel} />
                </Collapsible>
              )}
            </div>
          </section>
        );
      })}
    </article>
  );
}
