'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Book page-turn on navigation between sections. A petroleum "page" hinged at
// the left spine swings open (rotateY), revealing the new page beneath. The
// home book-opening intro (z-90) covers this on first load, so it never clashes.
const EASE = [0.62, 0, 0.2, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <div style={{ perspective: 2200 }}>
      {/* The turning page */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-left bg-petroleum-blue"
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -108 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-24"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0))' }}
        />
        <div aria-hidden className="absolute inset-y-0 right-0 w-1.5 bg-desert-sand/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.svg" alt="" className="w-20 h-20 opacity-80" />
        </div>
      </motion.div>

      {/* New page content settles in as the page turns */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
