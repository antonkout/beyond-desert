'use client';
import { useTranslations } from 'next-intl';
import { ARTICLES } from './articles';

export default function Newsroom() {
  const t = useTranslations('newsroom');

  return (
    <article className="bg-petroleum-blue text-desert-sand min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <header className="max-w-prose mb-12 md:mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            {t('kicker')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg opacity-85 leading-relaxed">{t('lead')}</p>
        </header>

        {/* Masonry mosaic — CSS columns keep each capture at its natural
            aspect ratio so headlines stay legible and the wall reads like a
            press clipping board. */}
        <div className="[column-fill:_balance] columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {ARTICLES.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-3 md:mb-4 block break-inside-avoid overflow-hidden rounded-lg ring-1 ring-desert-sand/10 transition-shadow duration-300 hover:ring-desert-sand/40 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.src}
                alt={`${a.source} — ${a.title}`}
                loading="lazy"
                className="w-full select-none transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.6]"
              />

              {/* Caption overlay — hidden until hover/focus, slides up. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-deep-basalt/95 via-deep-basalt/60 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-unibo-red/90 font-semibold">
                  {a.source}
                  {a.date ? ` · ${a.date}` : ''}
                </p>
                <p className="mt-1 font-display text-sm font-semibold leading-snug text-white">
                  {a.title}
                </p>
              </div>

              {/* Persistent corner cue that this opens an external link. */}
              <span
                aria-hidden
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-deep-basalt/40 text-desert-sand opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
