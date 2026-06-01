'use client';
import { PANELS, type Panel } from './panels';
import Timeline from './Timeline';

// Heading slug -> anchor id. Kept deliberately simple; must match the ids used
// by Timeline.tsx (palaeolithic, neolithic, bronze-age, iron-age, islam).
function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function PanelBody({ panel }: { panel: Panel }) {
  return (
    <div className="space-y-5 leading-relaxed">
      {panel.blocks?.map((block, i) =>
        block.type === 'h' ? (
          <h3
            key={i}
            id={slug(block.text)}
            className="font-display font-extrabold text-xl md:text-2xl pt-4 scroll-mt-24 text-unibo-red"
          >
            {block.text}
          </h3>
        ) : (
          <p key={i} className="max-w-prose">
            {block.text}
          </p>
        )
      )}

      {panel.credits && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-2xl">
          {panel.credits.map((c) => (
            <div key={c.role}>
              <dt className="text-xs uppercase tracking-wider opacity-60 mb-1">
                {c.role}
              </dt>
              <dd className="font-medium">{c.names.join(', ')}</dd>
            </div>
          ))}
        </dl>
      )}

      {panel.acknowledgements && (
        <p className="max-w-prose pt-4 opacity-80 italic">
          {panel.acknowledgements}
        </p>
      )}
    </div>
  );
}

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
            {PANELS.map((panel) => (
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
      {PANELS.map((panel, idx) => {
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
