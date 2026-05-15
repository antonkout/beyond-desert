import { setRequestLocale } from 'next-intl/server';
import GeographyMap from './GeographyMap';

export default function GeographyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <GeographyMap />;
}