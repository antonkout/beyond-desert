'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// A photographic backdrop for a section: absolutely fills its (relative) parent
// with a parallax image under a petroleum wash, so foreground text stays legible.
// Drop it as the first child of a `relative overflow-hidden` section, then give
// the section's content wrapper `relative z-10`.
export default function PhotoBackdrop({
  src,
  focal = 'center',
  imgOpacity = 0.55,
  overlay = 'linear-gradient(180deg, rgba(31,63,77,0.62) 0%, rgba(31,63,77,0.5) 50%, rgba(22,48,57,0.8) 100%)',
}: {
  src: string;
  focal?: string;
  imgOpacity?: number;
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        style={{ objectPosition: focal, opacity: imgOpacity, ...(reduce ? {} : { y }) }}
        className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
