'use client';
import { motion, useReducedMotion } from 'framer-motion';

// App-Router templates re-mount on every navigation, so this is where the
// page-transition lives. On each route change a petroleum panel covers the
// viewport then sweeps upward, revealing the new page as its content fades up.
const EASE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      {/* Overlay wipe — starts covering, sweeps up off-screen. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-petroleum-blue"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.img
          src="/images/logo-mark.svg"
          alt=""
          width={88}
          height={88}
          className="h-20 w-20 opacity-90"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.9, 0], scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* New page content fades + lifts in as the wipe clears. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
