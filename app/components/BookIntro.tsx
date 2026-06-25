'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Opening: a book cover that swings open from its spine on first visit,
// revealing the hero beneath. Shown once per session. The animated cover is
// promoted to its own GPU layer (transform-only + will-change) so the swing
// stays at 60fps.
const EASE = [0.16, 1, 0.3, 1] as const; // easeOutExpo — confident, fluid open

export default function BookIntro() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce || sessionStorage.getItem('introSeen')) {
      setDone(true);
      return;
    }
    sessionStorage.setItem('introSeen', '1');
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setOpen(true), 1100);
    return () => clearTimeout(t1);
  }, [reduce]);

  if (done) return null;

  return (
    <AnimatePresence onExitComplete={() => setDone(true)}>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] overflow-hidden bg-deep-basalt"
          style={{ perspective: 2400 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {/* Static back page revealed as the cover opens. */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-petroleum-blue"
            style={{ transform: 'translateZ(0)' }}
          >
            <img
              src="/images/logo-mark.svg"
              alt=""
              aria-hidden
              className="w-40 h-40 opacity-10"
            />
          </div>

          {/* The cover that swings open from the left spine. */}
          <motion.div
            className="absolute inset-0 origin-left"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
            initial={{ rotateY: 0 }}
            animate={open ? { rotateY: -110 } : { rotateY: 0 }}
            transition={{ duration: 1.9, ease: EASE }}
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
                  {t('hero.tag')}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
