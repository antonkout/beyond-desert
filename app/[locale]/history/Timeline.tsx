'use client';

// Chronological bar for the "A historical journey" panel. Each marker links to
// the matching subsection heading (see slug() in History.tsx, which must stay in
// sync with the `id` values below).
const PERIODS = [
  { id: 'palaeolithic', label: 'Palaeolithic', dates: 'until c. 10,000 yrs ago' },
  { id: 'neolithic', label: 'Neolithic', dates: 'c. 8000–3100 BCE' },
  { id: 'bronze-age', label: 'Bronze Age', dates: '3100–1250 BCE' },
  { id: 'iron-age', label: 'Iron Age', dates: '1st mill. BCE – 7th c. CE' },
  { id: 'islam', label: 'Islam', dates: 'from 7th c. CE' },
] as const;

export default function Timeline() {
  return (
    <nav
      aria-label="Period timeline"
      className="mb-12 border border-deep-basalt/15 rounded-lg bg-white/60 p-5"
    >
      <ol className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
        {/* connecting line, horizontal layout only */}
        <span
          aria-hidden
          className="hidden sm:block absolute left-0 right-0 top-[7px] h-px bg-deep-basalt/25"
        />
        {PERIODS.map((p) => (
          <li
            key={p.id}
            className="relative flex-1 sm:pr-4 last:pr-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0"
          >
            <span
              aria-hidden
              className="block w-3.5 h-3.5 rounded-full bg-unibo-red ring-4 ring-white shrink-0 sm:mb-3"
            />
            <a
              href={`#${p.id}`}
              className="group block sm:mt-0"
            >
              <span className="block font-display font-extrabold text-sm text-deep-basalt group-hover:text-unibo-red transition-colors">
                {p.label}
              </span>
              <span className="block text-xs text-deep-basalt/60">{p.dates}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
