'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Book page-turn between sections. A petroleum "page" hinged at the left spine
// swings open (rotateY) on navigation, revealing the new page beneath.
// Transform-only + will-change for 60fps. Skipped on the first load so the
// book-opening intro on the home page plays alone.
const EASE = [0.65, 0, 0.2, 1] as const;

// Persists across route changes within the session.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [isFirst] = useState(() => {
    const first = !hasMounted;
    hasMounted = true;
    return first;
  });

  if (reduce || isFirst) return <>{children}</>;

  return (
    <div style={{ perspective: 2200 }}>
      {/* The turning page */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-left bg-petroleum-blue"
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -105 }}
        transition={{ duration: 1.25, ease: EASE }}
      >
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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
