import { setRequestLocale } from 'next-intl/server';
import Newsroom from './Newsroom';

export default function NewsroomPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <Newsroom />;
}
