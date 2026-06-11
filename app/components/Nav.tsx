'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const LOCALES = ['en', 'it', 'ar'] as const;

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|it|ar)/, '') || '/';

  const items = [
    { href: 'exhibition', label: t('exhibition') },
    { href: 'geography', label: t('geography') },
    { href: 'history', label: t('history') },
    { href: 'research', label: t('research') },
    { href: 'archive-3d', label: t('archive3d') },
    { href: 'climate-aflaj', label: t('climate') },
    { href: 'newsroom', label: t('newsroom') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-petroleum-blue text-desert-sand border-b border-petroleum-blue-light/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-badge.svg"
            alt=""
            aria-hidden
            width={36}
            height={36}
            className="w-9 h-9"
          />
          <span className="font-display font-extrabold text-sm tracking-wide">
            Beyond the Desert
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              className="hover:text-white transition-colors opacity-85"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          role="group"
          aria-label="Change language"
          className="flex gap-1 text-xs"
        >
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              className={`px-2 py-1 rounded transition-colors ${
                l === locale
                  ? 'bg-desert-sand text-petroleum-blue font-semibold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {l === 'ar' ? 'عربي' : l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
