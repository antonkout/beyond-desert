import { useTranslations } from 'next-intl';
import Hero from '@/app/components/Hero';
import SectionGrid from '@/app/components/SectionGrid';
import Timeline from '@/app/components/Timeline';

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Hero />
      <SectionGrid />
      <Timeline />
    </>
  );
}
