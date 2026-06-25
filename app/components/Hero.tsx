'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Parallax: the camel mark drifts up and fades as the hero scrolls away.
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const markOpacity = useTransform(scrollYProgress, [0, 1], [0.07, 0.02]);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative bg-petroleum-blue text-desert-sand overflow-hidden">
      {/* Photographic backdrop (Rub al-Khali dunes) under a petroleum wash. */}
      <motion.img
        src="/images/photos/dunes-figures.jpg"
        alt=""
        aria-hidden
        style={reduce ? undefined : { y: photoY }}
        className="absolute inset-0 h-full w-full object-cover opacity-50 pointer-events-none select-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(31,63,77,0.62) 0%, rgba(31,63,77,0.5) 55%, rgba(22,48,57,0.82) 100%)',
        }}
      />

      {/* Decorative camel brand mark, faded into the background */}
      <motion.img
        src="/images/logo-mark.svg"
        alt=""
        aria-hidden
        style={reduce ? undefined : { y: markY, opacity: markOpacity }}
        className="absolute -right-16 -bottom-16 w-[560px] h-[560px] opacity-[0.07] pointer-events-none select-none"
      />

      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs tracking-[0.25em] uppercase opacity-75 mb-6"
        >
          {t('hero.tag')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl leading-[1.05] mb-6 text-desert-sand"
        >
          {t('meta.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-prose text-lg opacity-90 leading-relaxed mb-4"
        >
          {t('hero.lead')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display font-extrabold text-xl mb-10"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href="#sections"
            className="inline-flex items-center gap-2 bg-desert-sand text-petroleum-blue px-6 py-3 rounded font-semibold hover:bg-desert-sand-dark transition-colors"
          >
            {t('hero.cta')} →
          </a>

          <div className="flex flex-wrap gap-6 text-sm opacity-80">
            <span aria-label="Exhibition dates">📅 {t('meta.dates')}</span>
            <span aria-label="Venue">📍 {t('meta.venue')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
