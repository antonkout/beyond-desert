'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Full-bleed photographic band with a gentle parallax drift and a petroleum
// gradient tint that ties the photo to the site palette and keeps any caption
// legible. Images are lazy-loaded.
export default function PhotoBand({
  src,
  alt,
  caption,
  heightClass = 'h-[58vh] min-h-[360px]',
  focal = 'center',
}: {
  src: string;
  alt: string;
  caption?: string;
  heightClass?: string;
  focal?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${heightClass}`}
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          objectPosition: focal,
          ...(reduce ? {} : { y }),
        }}
        className="absolute inset-x-0 -top-[9%] h-[118%] w-full object-cover will-change-transform"
      />
      {/* Palette tint + legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(22,48,57,0.35) 0%, rgba(22,48,57,0.05) 35%, rgba(31,63,77,0.55) 100%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-petroleum-blue/15 mix-blend-multiply" />

      {caption && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-6xl mx-auto px-6 pb-6">
            <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-desert-sand/90">
              {caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
