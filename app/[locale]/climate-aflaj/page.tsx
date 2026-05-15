import { setRequestLocale } from 'next-intl/server';
import ClimatePageClient from './ClimatePageClient';

export default function ClimatePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ClimatePageClient />;
}
