'use client';
import { useTranslations } from 'next-intl';

const LOGOS = [
  { src: 'unibo-seal.png', alt: 'Alma Mater Studiorum – Università di Bologna' },
  { src: 'ubosb.png', alt: 'Biblioteca Salaborsa' },
  { src: 'comune-bologna.png', alt: 'Comune di Bologna' },
  { src: 'mhc-oman.png', alt: 'Ministry of Heritage and Tourism, Sultanate of Oman' },
  { src: 'experience-oman.png', alt: 'Experience Oman' },
  { src: 'ch360.png', alt: 'CH360' },
  { src: 'bones-lab.png', alt: 'Bones Lab' },
];

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-desert-sand py-10">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-deep-basalt/55 mb-7">
          In collaboration with &amp; supported by
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {LOGOS.map((logo) => (
            <li key={logo.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/logos/${logo.src}`}
                alt={logo.alt}
                loading="lazy"
                className="h-9 md:h-10 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>

        <div className="mt-9 pt-6 border-t border-deep-basalt/15 text-center text-xs text-deep-basalt/65">
          <span className="font-display font-extrabold text-deep-basalt">
            Beyond the Desert
          </span>
          {' · '}
          {t('footer.rights')}
          {' · © 2026 · '}
          {t('meta.venue')}
        </div>
      </div>
    </footer>
  );
}
