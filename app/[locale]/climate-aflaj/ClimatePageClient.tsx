'use client';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getPanels, type Panel } from '@/app/[locale]/history/panels';
import Collapsible from '@/app/components/Collapsible';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';

// Editorial treatment for the long aflaj text: a sticky title rail, a drop cap,
// and a "falaj" channel line down the margin that fills with water as you read.
function AflajSection({ panel }: { panel: Panel }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const blocks = panel.blocks ?? [];

  return (
    <section
      id={panel.id}
      className="mt-16 pt-12 border-t border-deep-basalt/15 scroll-mt-24 text-deep-basalt"
    >
      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <div className="mb-6 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
            {panel.kicker}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-deep-basalt">
            {panel.title}
          </h2>
          <svg viewBox="0 0 60 24" className="mt-5 w-16 text-petroleum-blue/50" fill="none" aria-hidden>
            <path d="M0 6 H22 L30 18 L38 6 H60" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div ref={ref} className="relative">
          <span aria-hidden className="absolute left-0 top-1 bottom-1 hidden w-px bg-petroleum-blue/15 md:block" />
          <motion.span
            aria-hidden
            style={{ height: fill }}
            className="absolute left-[-0.5px] top-1 hidden w-[2px] bg-petroleum-blue/60 md:block"
          />
          <div className="md:pl-7">
            <Collapsible surface="sand" id={`panel-${panel.id}`}>
              <div className="space-y-5 leading-[1.75] text-[1.02rem] text-deep-basalt/85">
                {blocks.map((b, i) =>
                  b.type === 'h' ? (
                    <h3
                      key={i}
                      className="font-display font-extrabold text-xl md:text-2xl text-deep-basalt pt-3"
                    >
                      {b.text}
                    </h3>
                  ) : (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.78] first-letter:text-petroleum-blue'
                          : ''
                      }
                    >
                      {b.text}
                    </p>
                  )
                )}
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ClimatePageClient() {
  const t = useTranslations('sections.climate');
  const locale = useLocale();
  const aflajPanel = getPanels(locale).find((p) => p.id === 'aflaj')!;

  return (
    <article className="bg-desert-sand">
      <header className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
        <PhotoBackdrop src="/images/photos/camels-water.jpg" focal="center 55%" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            {{ en: 'Climate & Aflaj', it: 'Clima e Aflaj', ar: 'المناخ والأفلاج' }[locale] ??
              'Climate & Aflaj'}
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

          <figure className="my-6">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-deep-basalt/15 shadow-lg shadow-deep-basalt/10">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/Cl2P7f7BD9k"
                title="How an aflaj works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="mt-2 text-xs text-deep-basalt/60">
              {{
                en: 'How an aflaj channels water by gravity from source to settlement.',
                it: 'Come un aflaj conduce l’acqua per gravità dalla sorgente all’abitato.',
                ar: 'كيف يوصل الفلج الماء بفعل الجاذبية من المصدر إلى المستوطنة.',
              }[locale] ?? ''}
            </figcaption>
          </figure>

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

        <AflajSection panel={aflajPanel} />
      </div>
    </article>
  );
}
