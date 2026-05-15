'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const SECTIONS = [
  { key: 'geography', href: 'geography', icon: '🗺' },
  { key: 'history', href: 'history', icon: '📜' },
  { key: 'research', href: 'research', icon: '⛏' },
  { key: 'archive3d', href: 'archive-3d', icon: '🧊' },
] as const;

export default function SectionGrid() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section
      id="sections"
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/desert-dune.jpg')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-desert-sand/30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-3">
          Explore the exhibition
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-12 text-deep-basalt">
          Four threads through the sand.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTIONS.map((section) => (
            <Link
              key={section.key}
              href={`/${locale}/${section.href}`}
              className="group bg-white border border-deep-basalt/15 rounded-lg p-6 hover:border-unibo-red transition-colors"
            >
              <div className="text-3xl mb-4" aria-hidden>
                {section.icon}
              </div>
              <h3 className="font-display font-extrabold text-lg mb-2 text-deep-basalt">
                {t(`sections.${section.key}.title`)}
              </h3>
              <p className="text-sm text-deep-basalt/75 leading-relaxed">
                {t(`sections.${section.key}.lead`)}
              </p>
              <span className="inline-block mt-4 text-sm text-unibo-red group-hover:translate-x-1 transition-transform">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}