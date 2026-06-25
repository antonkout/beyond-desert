'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Inertia (smooth) scrolling, Saisei-style. Mounted once at the app root.
// Disabled when the user prefers reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Keep in-page anchor links working with the smooth scroller.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = id && document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener('click', onClick);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
