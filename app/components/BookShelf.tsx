'use client';
import { useLocale } from 'next-intl';
import { BOOKS, SHELVES, type Book, type BookTheme } from '@/app/[locale]/research/books';
import { COVERS } from '@/app/[locale]/research/covers';

const SHELF_LABELS: Record<string, Record<string, string>> = {
  it: {
    'Fiction & Tales': 'Narrativa e racconti',
    'History & Politics': 'Storia e politica',
    'Literature & Language': 'Letteratura e lingua',
    Film: 'Film',
  },
  ar: {
    'Fiction & Tales': 'روايات وحكايات',
    'History & Politics': 'تاريخ وسياسة',
    'Literature & Language': 'أدب ولغة',
    Film: 'أفلام',
  },
};

// Designed-cover palette per shelf. Used as the fallback cover and as the tint
// behind real covers while they load.
const THEME_STYLE: Record<BookTheme, { bg: string; ink: string; frame: string }> = {
  fiction: { bg: '#A32D2D', ink: '#F4E7D2', frame: 'rgba(244,231,210,0.55)' },
  history: { bg: '#1F3F4D', ink: '#E7D6B9', frame: 'rgba(231,214,185,0.5)' },
  literature: { bg: '#8A6D3B', ink: '#F6ECD8', frame: 'rgba(246,236,216,0.55)' },
  film: { bg: '#163039', ink: '#E7D6B9', frame: 'rgba(231,214,185,0.45)' },
};

// Deterministic pseudo-random book height so the shelf looks like real books of
// slightly different sizes, while every book still rests on the same ledge.
function bookHeight(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 200 + (h % 30); // 200–229px
}

function DesignedCover({ book }: { book: Book }) {
  const s = THEME_STYLE[book.theme];
  const len = book.title.length;
  const titleSize = len > 46 ? 13 : len > 30 ? 15 : len > 18 ? 17 : 19;
  return (
    <div
      className="absolute inset-0 flex flex-col p-2.5"
      style={{ background: s.bg, color: s.ink }}
    >
      <div
        className="flex flex-1 flex-col justify-between rounded-[2px] p-2.5"
        style={{ border: `1px solid ${s.frame}` }}
      >
        <span className="text-[8px] uppercase tracking-[0.18em] opacity-75">
          {book.genre || book.type}
        </span>
        <span
          className="font-display font-extrabold leading-[1.08]"
          style={{ fontSize: titleSize }}
        >
          {book.title}
        </span>
        <span className="text-[9px] leading-tight opacity-85">
          {[book.author, book.year].filter(Boolean).join(' · ')}
        </span>
      </div>
    </div>
  );
}

function BookSpine({ book }: { book: Book }) {
  // A real cover is shown only when listed in the generated manifest, so we
  // never probe for missing files. Otherwise the designed cover stands in.
  const hasCover = COVERS.has(book.slug);
  const height = bookHeight(book.slug);
  const cover = `/images/books/${book.slug}.jpg`;

  const inner = (
    <span
      className="group relative block overflow-hidden rounded-[3px] shadow-[0_6px_14px_-6px_rgba(22,48,57,0.55)] ring-1 ring-deep-basalt/10 transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1.5 hover:shadow-[0_14px_26px_-10px_rgba(22,48,57,0.7)]"
      style={{ height, aspectRatio: '2 / 3' }}
    >
      {/* Designed cover is always the base layer. */}
      <DesignedCover book={book} />

      {/* Real cover, if a screenshot exists, sits over the designed one. */}
      {hasCover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Subtle gutter shadow down the spine edge for depth. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.28), transparent)' }}
      />
    </span>
  );

  const label = `${book.title}${book.author ? ` — ${book.author}` : ''}${
    book.permalink ? ' (opens library catalogue)' : ''
  }`;

  return book.permalink ? (
    <a
      href={book.permalink}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className="flex items-end"
      style={{ height: 232 }}
    >
      {inner}
    </a>
  ) : (
    <span title={label} aria-label={label} className="flex items-end" style={{ height: 232 }}>
      {inner}
    </span>
  );
}

const SHELF_BG =
  'repeating-linear-gradient(180deg,' +
  'transparent 0, transparent 232px,' +
  '#b59c6c 232px, #9c8147 238px, #7a6334 241px,' +
  'rgba(0,0,0,0.28) 241px, rgba(0,0,0,0.06) 247px,' +
  'transparent 247px, transparent 268px)';

export default function BookShelf() {
  const locale = useLocale();
  const shelfLabels = SHELF_LABELS[locale];
  return (
    <section aria-labelledby="reading-room-heading" className="text-deep-basalt">
      <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
        {{
          en: 'At Biblioteca Salaborsa',
          it: 'Presso la Biblioteca Salaborsa',
          ar: 'في مكتبة سالابورسا',
        }[locale] ?? 'At Biblioteca Salaborsa'}
      </p>
      <h2
        id="reading-room-heading"
        className="font-display text-3xl md:text-4xl mb-3 text-deep-basalt"
      >
        {{ en: 'The Reading Room', it: 'La Sala Lettura', ar: 'قاعة المطالعة' }[locale] ??
          'The Reading Room'}
      </h2>
      <p className="max-w-prose mb-12 text-deep-basalt/80 leading-relaxed">
        {{
          en: 'A shelf of books, e-books and film selected for the exhibition — from the Thousand and One Nights to the politics of the modern Gulf. Every spine links to its record in the Salaborsa catalogue.',
          it: 'Uno scaffale di libri, e-book e un film selezionati per la mostra — dalle Mille e una notte alla politica del Golfo contemporaneo. Ogni dorso rimanda alla sua scheda nel catalogo Salaborsa.',
          ar: 'رفٌّ من الكتب والكتب الإلكترونية وفيلم، اختيرت للمعرض — من ألف ليلة وليلة إلى سياسة الخليج المعاصر. يرتبط كل كتاب بسجله في فهرس مكتبة سالابورسا.',
        }[locale] ?? ''}
      </p>

      <div className="space-y-12">
        {SHELVES.map((shelf) => {
          const books = BOOKS.filter((b) => b.theme === shelf.theme);
          if (books.length === 0) return null;
          return (
            <div key={shelf.theme}>
              <h3 className="font-display font-extrabold text-lg text-deep-basalt/90 mb-5">
                {shelfLabels?.[shelf.label] ?? shelf.label}
                <span className="ml-2 text-sm font-body font-normal text-deep-basalt/45">
                  {books.length}
                </span>
              </h3>
              <div
                className="flex flex-wrap items-end gap-x-4"
                style={{ background: SHELF_BG, rowGap: 36 }}
              >
                {books.map((book) => (
                  <BookSpine key={book.slug} book={book} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
