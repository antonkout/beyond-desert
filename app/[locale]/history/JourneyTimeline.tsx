'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Collapsible from '@/app/components/Collapsible';
import { slug } from '@/app/components/PanelBody';
import type { Block } from './panels';

const DATES: Record<string, string> = {
  Prehistory: 'until c. 3100 BCE',
  'Bronze Age': '3100–1250 BCE',
  'Iron Age': '1st mill. BCE – 7th c. CE',
  'Islamic Period': 'from the 7th c. CE',
  Preistoria: 'fino a c. 3100 a.C.',
  'Età del Bronzo': '3100–1250 a.C.',
  'Età del Ferro': 'I mill. a.C. – VII sec. d.C.',
  'Periodo Islamico': 'dal VII sec. d.C.',
};

type Period = { heading: string; paras: string[] };

// Scroll-spy chronological timeline: a sticky period rail highlights the era you
// are reading, with a progress line filling along the dots. Each period's body
// collapses behind a Read more.
export default function JourneyTimeline({ blocks }: { blocks: Block[] }) {
  const preamble: string[] = [];
  const periods: Period[] = [];
  for (const b of blocks) {
    if (b.type === 'h') periods.push({ heading: b.text, paras: [] });
    else if (periods.length) periods[periods.length - 1].paras.push(b.text);
    else preamble.push(b.text);
  }

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end end'] });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [active, setActive] = useState(periods[0] ? slug(periods[0].heading) : '');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    periods.forEach((p) => {
      const el = document.getElementById(slug(p.heading));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {preamble.length > 0 && (
        <div className="max-w-prose space-y-4 leading-[1.75] text-desert-sand/85 mb-12">
          {preamble.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      )}

      <div ref={ref} className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
        {/* Sticky period rail */}
        <nav aria-label="Period timeline" className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          <ol className="relative">
            <span aria-hidden className="absolute left-[5px] top-3 bottom-3 w-px bg-desert-sand/20" />
            <motion.span aria-hidden style={{ height: fill }} className="absolute left-[4px] top-3 w-[3px] rounded bg-unibo-red" />
            {periods.map((p) => {
              const id = slug(p.heading);
              const on = active === id;
              return (
                <li key={id} className="relative ps-7 py-2.5">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[15px] h-[11px] w-[11px] rounded-full border-2 transition-colors ${
                      on ? 'border-unibo-red bg-unibo-red' : 'border-desert-sand/40 bg-petroleum-blue'
                    }`}
                  />
                  <a href={`#${id}`} aria-current={on ? 'true' : undefined} className="block">
                    <span className={`block font-display font-extrabold text-sm transition-colors ${on ? 'text-desert-sand' : 'text-desert-sand/55'}`}>
                      {p.heading}
                    </span>
                    <span className="block text-xs text-desert-sand/40">{DATES[p.heading] ?? ''}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Period sections */}
        <div className="space-y-12">
          {periods.map((p) => {
            const id = slug(p.heading);
            return (
              <div key={id} id={id} className="scroll-mt-24">
                <p className="text-xs tracking-[0.2em] uppercase text-desert-sand/40 mb-1">
                  {DATES[p.heading] ?? ''}
                </p>
                <h3 className="font-display font-extrabold text-2xl md:text-3xl mb-4 text-desert-sand">
                  {p.heading}
                </h3>
                <Collapsible surface="petroleum" id={`journey-${id}`}>
                  <div className="space-y-4 leading-[1.75] text-[1.02rem] text-desert-sand/85 max-w-prose">
                    {p.paras.map((t, i) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
