'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Collapsible from './Collapsible';
import { slug } from './PanelBody';
import type { Panel } from '@/app/[locale]/history/panels';

// Editorial treatment for a long-text panel: a sticky title rail with a falaj
// motif, a drop cap on the first paragraph, and a "falaj" channel line down the
// margin that fills as you read.
export default function EditorialPanel({
  panel,
  className = '',
  collapsedClass,
}: {
  panel: Panel;
  className?: string;
  collapsedClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const blocks = panel.blocks ?? [];
  let firstParagraph = true;

  return (
    <section id={panel.id} className={`scroll-mt-24 text-deep-basalt ${className}`}>
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
            <Collapsible surface="sand" collapsedClass={collapsedClass} id={`panel-${panel.id}`}>
              <div className="space-y-5 leading-[1.75] text-[1.02rem] text-deep-basalt/85">
                {blocks.map((b, i) => {
                  if (b.type === 'h') {
                    return (
                      <h3
                        key={i}
                        id={slug(b.text)}
                        className="font-display font-extrabold text-xl md:text-2xl pt-4 scroll-mt-24 text-unibo-red"
                      >
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
                          ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.78] first-letter:text-petroleum-blue'
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
