'use client';
import { useTranslations } from 'next-intl';

const LOGOS = [
  { src: 'unibo-seal.png', alt: 'Alma Mater Studiorum – Università di Bologna' },
  { src: 'project-logo.png', alt: 'ISMEO' },
  { src: 'ubosb.png', alt: 'Biblioteca Salaborsa' },
  { src: 'comune-bologna.png', alt: 'Comune di Bologna' },
  { src: 'iasa.png', alt: 'International Association for the Study of Arabia' },
  { src: 'maeci.png', alt: 'Ministero degli Affari Esteri e della Cooperazione Internazionale' },
  { src: 'mhc-oman.png', alt: 'Ministry of Heritage and Tourism, Sultanate of Oman' },
  { src: 'experience-oman.png', alt: 'Experience Oman' },
  { src: 'ch360.png', alt: 'CH360' },
  { src: 'bones-lab.png', alt: 'Bones Lab' },
];

export default function Footer() {
  const t = useTranslations();

  return (
    <footer>
      {/* Partner / supporter logos */}
      <div className="bg-desert-sand py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs tracking-[0.25em] uppercase text-deep-basalt/55 mb-8">
            In collaboration with &amp; supported by
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
            {LOGOS.map((logo) => (
              <li key={logo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/logos/${logo.src}`}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-12 md:h-14 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colophon bar */}
      <div className="bg-deep-basalt text-desert-sand/80 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-display font-extrabold text-desert-sand mb-1">
              Beyond the Desert
            </p>
            <p>{t('footer.rights')}</p>
          </div>
          <div className="md:text-end">
            <p>{t('footer.partner')}</p>
            <p className="mt-2 opacity-60 text-xs">© 2026 · {t('meta.venue')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
