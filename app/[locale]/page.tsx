import { setRequestLocale } from 'next-intl/server';
import Hero from '@/app/components/Hero';
import SectionGrid from '@/app/components/SectionGrid';
import Timeline from '@/app/components/Timeline';
import BookIntro from '@/app/components/BookIntro';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <BookIntro />
      <Hero />
      <SectionGrid />
      <Timeline />
    </>
  );
}
