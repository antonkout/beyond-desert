import { setRequestLocale } from 'next-intl/server';
import Archive3D from './Archive3D';

export default function Archive3DPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <Archive3D />;
}