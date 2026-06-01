import { setRequestLocale } from 'next-intl/server';
import History from './History';

export default function HistoryPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <History />;
}
