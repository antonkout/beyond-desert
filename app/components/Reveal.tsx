'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// Scroll-triggered reveal. `variant="rise"` fades up (default). `variant="clip"`
// wipes the block in from the bottom (a curtain), for smooth part-to-part
// section transitions.
export default function Reveal({
  children,
  delay = 0,
  className,
  variant = 'rise',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: 'rise' | 'clip';
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  if (variant === 'clip') {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -120px 0px' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
