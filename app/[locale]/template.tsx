'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Book page-turn between sections. On each navigation a petroleum "page" hinged
// at the left spine swings open (rotateY), revealing the new page beneath as its
// content settles in. Transform-only + will-change so it stays at 60fps.
const EASE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <div style={{ perspective: 2000 }}>
      {/* The turning page */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-left bg-petroleum-blue"
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -105 }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        {/* spine shadow + page-edge sheen */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-20"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0))' }}
        />
        <div aria-hidden className="absolute inset-y-0 right-0 w-1.5 bg-desert-sand/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.svg" alt="" className="w-20 h-20 opacity-80" />
        </div>
      </motion.div>

      {/* New page content settles in as the page turns */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
