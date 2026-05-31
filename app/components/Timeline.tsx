'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PERIODS = ['bronze', 'iron', 'preIslamic'] as const;
type Period = (typeof PERIODS)[number];

export default function Timeline() {
  const t = useTranslations('sections.history');
  const [expanded, setExpanded] = useState<Record<Period, boolean>>({
    bronze: false,
    iron: false,
    preIslamic: false,
  });

  const toggle = (period: Period) =>
    setExpanded((prev) => ({ ...prev, [period]: !prev[period] }));

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
          {PERIODS.map((period) => {
            const isOpen = expanded[period];
            const paragraphs = t(`${period}.body`).split('\n\n');

            return (
              <li key={period} className="ps-8 relative">
                <span
                  aria-hidden
                  className="absolute -start-[11px] top-1 w-5 h-5 bg-unibo-red rounded-full ring-4 ring-petroleum-blue"
                />
                <p className="text-sm opacity-70 mb-1">{t(`${period}.period`)}</p>
                <h3 className="font-display font-extrabold text-2xl mb-3 text-desert-sand">
                  {t(`${period}.title`)}
                </h3>

                <div
                  id={`period-body-${period}`}
                  className={`relative max-w-prose ${
                    isOpen ? '' : 'max-h-40 overflow-hidden'
                  }`}
                >
                  <div className="space-y-4 leading-relaxed opacity-90">
                    {paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  {!isOpen && (
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-petroleum-blue to-transparent"
                    />
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => toggle(period)}
                    aria-expanded={isOpen}
                    aria-controls={`period-body-${period}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-desert-sand underline-offset-4 hover:underline transition-colors"
                  >
                    {isOpen ? 'Read less' : 'Read more'}
                    <span aria-hidden className={isOpen ? 'rotate-180' : ''}>
                      ↓
                    </span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm text-desert-sand/80 hover:text-desert-sand transition-colors"
                    aria-label={t(`${period}.title`) + ' — listen to audio'}
                  >
                    🔊 Listen
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
