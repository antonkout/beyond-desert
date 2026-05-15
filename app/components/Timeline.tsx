'use client';
import { useTranslations } from 'next-intl';

const PERIODS = ['bronze', 'iron', 'preIslamic'] as const;

export default function Timeline() {
  const t = useTranslations('sections.history');

  return (
    <section className="bg-petroleum-blue text-desert-sand py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
          Timeline
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-4 text-desert-sand">
          {t('title')}
        </h2>
        <p className="max-w-prose mb-12 opacity-85 leading-relaxed">{t('lead')}</p>

        <ol className="relative border-l-2 border-unibo-red/40 ms-4 space-y-12">
          {PERIODS.map((period) => (
            <li key={period} className="ps-8 relative">
              <span
                aria-hidden
                className="absolute -start-[11px] top-1 w-5 h-5 bg-unibo-red rounded-full ring-4 ring-petroleum-blue"
              />
              <p className="text-sm opacity-70 mb-1">{t(`${period}.period`)}</p>
              <h3 className="font-display font-extrabold text-2xl mb-3 text-desert-sand">
                {t(`${period}.title`)}
              </h3>
              <p className="max-w-prose leading-relaxed opacity-90">
                {t(`${period}.body`)}
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-sm text-desert-sand/80 hover:text-desert-sand transition-colors"
                aria-label={t(`${period}.title`) + ' — listen to audio'}
              >
                🔊 Listen
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
