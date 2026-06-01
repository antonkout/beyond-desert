'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

// The narrative content that used to live here has moved to the History
// section. This page is intentionally a placeholder until the physical
// exhibition material (panels, photos, room plan) is ready.
export default function Exhibition() {
  const locale = useLocale();
  return (
    <article className="bg-petroleum-blue text-desert-sand">
      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
          The Exhibition
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
          Coming soon
        </h1>
        <p className="max-w-prose text-lg opacity-85 leading-relaxed mb-8">
          This section will present the physical exhibition at Biblioteca
          Salaborsa — its panels, photography and room plan. In the meantime, the
          full historical narrative now lives in the History section.
        </p>
        <Link
          href={`/${locale}/history`}
          className="inline-flex items-center gap-2 border border-desert-sand/40 rounded-full px-5 py-2.5 text-sm hover:border-desert-sand hover:bg-desert-sand/10 transition-colors"
        >
          Go to History →
        </Link>
      </div>
    </article>
  );
}
