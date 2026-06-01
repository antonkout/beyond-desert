'use client';
import { PANELS, type Panel } from './panels';

function PanelBody({ panel }: { panel: Panel }) {
  return (
    <div className="space-y-5 leading-relaxed">
      {panel.blocks?.map((block, i) =>
        block.type === 'h' ? (
          <h3
            key={i}
            className="font-display font-extrabold text-xl md:text-2xl pt-4 text-unibo-red"
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

export default function Exhibition() {
  return (
    <article>
      {/* Page header */}
      <header className="bg-petroleum-blue text-desert-sand py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            The Exhibition
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            Beyond the Desert, panel by panel
          </h1>
          <p className="max-w-prose text-lg opacity-85 leading-relaxed mb-10">
            The exhibition unfolds across six panels, from the geography of the
            Arabian Peninsula to forty years of University of Bologna fieldwork in
            Oman. Follow them in order, or jump to a panel below.
          </p>

          <nav aria-label="Panel index" className="flex flex-wrap gap-3">
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

              <PanelBody panel={panel} />
            </div>
          </section>
        );
      })}
    </article>
  );
}
