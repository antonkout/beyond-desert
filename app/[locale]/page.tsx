import { setRequestLocale } from 'next-intl/server';
import Hero from '@/app/components/Hero';
import SectionGrid from '@/app/components/SectionGrid';
import Timeline from '@/app/components/Timeline';
import BookIntro from '@/app/components/BookIntro';
import PhotoBand from '@/app/components/PhotoBand';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <BookIntro />
      <Hero />
      <SectionGrid />
      <PhotoBand
        src="/images/photos/fishermen-gulls.jpg"
        alt="Fishermen hauling nets as gulls wheel over the Omani shore"
        caption="The living coast — Arabia between desert and sea"
        focal="center 40%"
      />
      <Timeline />
    </>
  );
}
