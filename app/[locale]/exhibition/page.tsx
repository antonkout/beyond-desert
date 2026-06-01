import { setRequestLocale } from 'next-intl/server';
import Exhibition from './Exhibition';

export default function ExhibitionPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <Exhibition />;
}
