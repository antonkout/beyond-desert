'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Reveal from './Reveal';
import PhotoBackdrop from './PhotoBackdrop';

const PERIODS = ['bronze', 'iron', 'preIslamic'] as const;
type Period = (typeof PERIODS)[number];

export default function Timeline() {
  const t = useTranslations('sections.history');
  const locale = useLocale();
  const L = {
    readMore: { en: 'Read more', it: 'Leggi tutto', ar: 'اقرأ المزيد' }[locale] ?? 'Read more',
    readLess: { en: 'Read less', it: 'Leggi meno', ar: 'اقرأ أقل' }[locale] ?? 'Read less',
    listen: { en: 'Listen', it: 'Ascolta', ar: 'استمع' }[locale] ?? 'Listen',
  };
  const [expanded, setExpanded] = useState<Record<Period, boolean>>({
    bronze: false,
    iron: false,
    preIslamic: false,
  });

  const toggle = (period: Period) =>
    setExpanded((prev) => ({ ...prev, [period]: !prev[period] }));

  return (
    <section className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
      <PhotoBackdrop src="/images/photos/fishermen-gulls.jpg" focal="center 40%" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
          {{ en: 'Timeline', it: 'Cronologia', ar: 'الخط الزمني' }[locale] ?? 'Timeline'}
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-4 text-desert-sand">
          {t('title')}
        </h2>
        <p className="max-w-prose mb-12 opacity-85 leading-relaxed">{t('lead')}</p>

        <ol className="relative border-l-2 border-unibo-red/40 ms-4 space-y-12">
          {PERIODS.map((period, i) => {
            const isOpen = expanded[period];
            const paragraphs = t(`${period}.body`).split('\n\n');

            return (
              <li key={period} className="ps-8 relative">
                <span
                  aria-hidden
                  className="absolute -start-[11px] top-1 w-5 h-5 bg-unibo-red rounded-full ring-4 ring-petroleum-blue"
                />
                <Reveal delay={i * 0.06}>
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
                    {isOpen ? L.readLess : L.readMore}
                    <span aria-hidden className={isOpen ? 'rotate-180' : ''}>
                      ↓
                    </span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm text-desert-sand/80 hover:text-desert-sand transition-colors"
                    aria-label={t(`${period}.title`) + ' — listen to audio'}
                  >
                    🔊 {L.listen}
                  </button>
                </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
