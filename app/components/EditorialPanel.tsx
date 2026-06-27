'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Collapsible from './Collapsible';
import { slug } from './PanelBody';
import type { Block, Panel } from '@/app/[locale]/history/panels';

// Editorial treatment for a long-text panel: a sticky title rail with a falaj
// motif, a drop cap on the first paragraph, and a "falaj" channel line down the
// margin that fills as you read. `tone="dark"` makes it legible over a photo.
export default function EditorialPanel({
  panel,
  kicker,
  title,
  blocks,
  paragraphs,
  tone = 'sand',
  className = '',
  collapsedClass,
}: {
  panel?: Panel;
  kicker?: string;
  title?: string;
  blocks?: Block[];
  paragraphs?: string[];
  tone?: 'sand' | 'dark';
  className?: string;
  collapsedClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end end'] });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const dark = tone === 'dark';
  const kick = kicker ?? panel?.kicker;
  const head = title ?? panel?.title;
  const id = panel?.id;
  const items: Block[] =
    blocks ?? panel?.blocks ?? (paragraphs ?? []).map((text) => ({ type: 'p', text }));
  let firstParagraph = true;

  return (
    <section id={id} className={`scroll-mt-24 ${dark ? 'text-desert-sand' : 'text-deep-basalt'} ${className}`}>
      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <div className="mb-6 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          {kick && (
            <p className={`text-xs tracking-[0.25em] uppercase mb-2 ${dark ? 'text-desert-sand/70' : 'text-unibo-red'}`}>
              {kick}
            </p>
          )}
          <h2 className={`font-display text-3xl md:text-4xl ${dark ? 'text-desert-sand' : 'text-deep-basalt'}`}>
            {head}
          </h2>
          <svg viewBox="0 0 60 24" className={`mt-5 w-16 ${dark ? 'text-desert-sand/50' : 'text-petroleum-blue/50'}`} fill="none" aria-hidden>
            <path d="M0 6 H22 L30 18 L38 6 H60" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div ref={ref} className="relative">
          <span aria-hidden className={`absolute left-0 top-1 bottom-1 hidden w-px md:block ${dark ? 'bg-desert-sand/20' : 'bg-petroleum-blue/15'}`} />
          <motion.span
            aria-hidden
            style={{ height: fill }}
            className={`absolute left-[-0.5px] top-1 hidden w-[2px] md:block ${dark ? 'bg-desert-sand/70' : 'bg-petroleum-blue/60'}`}
          />
          <div className="md:pl-7">
            <Collapsible surface={dark ? 'petroleum' : 'sand'} collapsedClass={collapsedClass} id={id ? `panel-${id}` : undefined}>
              <div className={`space-y-5 leading-[1.75] text-[1.02rem] ${dark ? 'text-desert-sand/90' : 'text-deep-basalt/85'}`}>
                {items.map((b, i) => {
                  if (b.type === 'h') {
                    return (
                      <h3 key={i} id={slug(b.text)} className="font-display font-extrabold text-xl md:text-2xl pt-4 scroll-mt-24 text-unibo-red">
                        {b.text}
                      </h3>
                    );
                  }
                  const drop = firstParagraph;
                  firstParagraph = false;
                  return (
                    <p
                      key={i}
                      className={
                        drop
                          ? `first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.78] ${dark ? 'first-letter:text-desert-sand' : 'first-letter:text-petroleum-blue'}`
                          : ''
                      }
                    >
                      {b.text}
                    </p>
                  );
                })}
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
}
