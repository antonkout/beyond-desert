'use client';
import { useTranslations } from 'next-intl';
import { PANELS } from '@/app/[locale]/history/panels';
import PanelBody from '@/app/components/PanelBody';
import Collapsible from '@/app/components/Collapsible';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';

// Long-form panel moved here from the history section.
const AFLAJ_PANEL = PANELS.find((p) => p.id === 'aflaj')!;

export default function ClimatePageClient() {
  const t = useTranslations('sections.climate');

  return (
    <article className="bg-desert-sand">
      <header className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
        <PhotoBackdrop src="/images/photos/camels-water.jpg" focal="center 55%" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            Climate & Aflaj
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('title')}</h1>
          <p className="text-lg opacity-90 leading-relaxed max-w-prose">{t('lead')}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-12 border-l-4 border-unibo-red ps-6">
          <h2 className="font-display font-extrabold text-2xl mb-3 text-deep-basalt">
            {t('aflaj.title')}
          </h2>
          <p className="text-deep-basalt/85 leading-relaxed mb-4 whitespace-pre-line">
            {t('aflaj.body')}
          </p>
          <a
            href={t('aflaj.unescoUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-unibo-red hover:underline"
          >
            {t('aflaj.unesco')} →
          </a>
        </section>

        <section className="border-l-4 border-petroleum-blue ps-6">
          <h2 className="font-display font-extrabold text-2xl mb-3 text-deep-basalt">
            {t('climate.title')}
          </h2>
          <p className="text-deep-basalt/85 leading-relaxed whitespace-pre-line">
            {t('climate.body')}
          </p>
        </section>

        <section
          id={AFLAJ_PANEL.id}
          className="mt-16 pt-12 border-t border-deep-basalt/15 scroll-mt-24 text-deep-basalt"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
            {AFLAJ_PANEL.kicker}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-deep-basalt">
            {AFLAJ_PANEL.title}
          </h2>
          <Collapsible surface="sand" id={`panel-${AFLAJ_PANEL.id}`}>
            <PanelBody panel={AFLAJ_PANEL} />
          </Collapsible>
        </section>
      </div>
    </article>
  );
}
