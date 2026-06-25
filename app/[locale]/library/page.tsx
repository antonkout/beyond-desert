import { setRequestLocale } from 'next-intl/server';
import BookShelf from '@/app/components/BookShelf';

export default function LibraryPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <article className="bg-desert-sand py-16">
      <div className="max-w-6xl mx-auto px-6">
        <BookShelf />
      </div>
    </article>
  );
}
