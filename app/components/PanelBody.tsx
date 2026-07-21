import type { Panel } from '@/app/[locale]/history/panels';
import { italiciseTerms } from './italicise';

// Heading slug -> anchor id. Kept deliberately simple; must match the ids used
// by the history Timeline.tsx (palaeolithic, neolithic, bronze-age, iron-age,
// islam).
export function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Renders the body of a panel (heading/paragraph blocks, credits grid and
// acknowledgements). Stateless and free of hooks so it can be used from both
// server and client components, wherever a PANELS entry needs to be displayed.
export default function PanelBody({ panel }: { panel: Panel }) {
  return (
    <div className="space-y-5 leading-relaxed">
      {panel.blocks?.map((block, i) =>
        block.type === 'h' ? (
          <h3
            key={i}
            id={slug(block.text)}
            className="font-display font-extrabold text-xl md:text-2xl pt-4 scroll-mt-24 text-unibo-red"
          >
            {italiciseTerms(block.text)}
          </h3>
        ) : (
          <p key={i} className="max-w-prose">
            {italiciseTerms(block.text)}
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
