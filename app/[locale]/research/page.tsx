import { setRequestLocale } from 'next-intl/server';
import Research from './Research';

export default function ResearchPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <Research />;
}
