import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Beyond the Desert: Stories of Civilizations',
  description: 'Temporary exhibition, Biblioteca Sala Borsa, Bologna — July 2026.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  // Enable static rendering — must come before any next-intl calls
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Nav locale={locale} />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}