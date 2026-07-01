'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Opening: a book cover that swings open from its left spine on first visit,
// holding long enough to read, then revealing the hero directly beneath (no
// fade — the cover self-hides past 90° via backfaceVisibility). The animated
// cover is promoted to its own GPU layer (transform-only) to stay at 60fps.
// Matches the section page-turn in app/[locale]/template.tsx so the cover
// opens at the same speed and feel as turning between sections.
const EASE = [0.62, 0, 0.2, 1] as const;

export default function BookIntro() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setOpen(true), 2400);
    return () => clearTimeout(t1);
  }, [reduce]);

  if (done) return null;

  return (
    <AnimatePresence onExitComplete={() => setDone(true)}>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] overflow-hidden"
          style={{ perspective: 2200 }}
          initial={{ opacity: 1 }}
        >
          {/* The cover swings open over the real hero beneath. */}
          <motion.div
            className="absolute inset-0 origin-left"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
            initial={{ rotateY: 0 }}
            animate={open ? { rotateY: -108 } : { rotateY: 0 }}
            transition={{ duration: 1.7, ease: EASE }}
            onAnimationComplete={() => {
              if (open) {
                document.body.style.overflow = '';
                setDone(true);
              }
            }}
          >
            {/* Cover face */}
            <div className="absolute inset-0 bg-petroleum-blue" style={{ transform: 'translateZ(0)' }}>
              {/* Spine shading on the left edge */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-16"
                style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0))' }}
              />
              {/* Page-edge sheen on the right */}
              <div aria-hidden className="absolute inset-y-0 right-0 w-2 bg-desert-sand/30" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                <motion.img
                  src="/images/logo-mark.svg"
                  alt=""
                  aria-hidden
                  className="w-24 h-24 mb-8 opacity-90"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
                <div aria-hidden className="w-16 h-px bg-desert-sand/40 mb-6" />
                <motion.h1
                  className="font-display font-extrabold text-desert-sand text-3xl md:text-5xl leading-tight max-w-xl"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Beyond the Desert
                </motion.h1>
                <motion.p
                  className="mt-4 text-xs md:text-sm tracking-[0.25em] uppercase text-desert-sand/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                >
                  {t('hero.coverTag')}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
