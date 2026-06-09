'use client';
import { PANELS } from './panels';
import PanelBody from '@/app/components/PanelBody';
import Timeline from './Timeline';

// The history page now carries only the introduction and the long
// chronological journey. The other panels live on their own pages:
// "aflaj" -> Climate & Aflaj, "history-of-studies" and "current-excavations"
// -> Research, and "credits" -> the home page.
const HISTORY_PANELS = PANELS.filter(
  (p) => p.id === 'introduction' || p.id === 'history'
);

export default function History() {
  return (
    <article>
      {/* Page header */}
      <header className="bg-petroleum-blue text-desert-sand py-20">
        <div className="max-w-6xl mx-auto px-6">
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

              {/* Chronological bar sits on the historical-journey panel only */}
              {panel.id === 'history' && <Timeline />}

              <PanelBody panel={panel} />
            </div>
          </section>
        );
      })}
    </article>
  );
}
