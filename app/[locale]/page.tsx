import { setRequestLocale } from 'next-intl/server';
import Hero from '@/app/components/Hero';
import SectionGrid from '@/app/components/SectionGrid';
import Timeline from '@/app/components/Timeline';
import PanelBody from '@/app/components/PanelBody';
import { PANELS } from './history/panels';

// Colophon shown at the foot of the home page (moved here from the history
// section).
const CREDITS_PANEL = PANELS.find((p) => p.id === 'credits')!;

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <SectionGrid />
      <Timeline />
      <section
        id={CREDITS_PANEL.id}
        className="bg-desert-sand text-deep-basalt py-16 md:py-20 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-2">
            {CREDITS_PANEL.kicker}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-8">
            {CREDITS_PANEL.title}
          </h2>
          <PanelBody panel={CREDITS_PANEL} />
        </div>
      </section>
    </>
  );
}
