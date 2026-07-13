'use client';
import PanelBody from '@/app/components/PanelBody';
import Reveal from '@/app/components/Reveal';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';
import EditorialPanel from '@/app/components/EditorialPanel';
import { PANELS } from '@/app/[locale]/history/panels';

const CREDITS_PANEL = PANELS.find((p) => p.id === 'credits')!;

const INTRO: string[] = [
  'The Arabian Peninsula is often associated, in the popular consciousness, with the immensity of the desert. Beyond this image, powerful yet partial, lies a much richer history made of coasts, mountains, oases, maritime routes, mineral resources, settlements, exchanges, and encounters between different communities. Beyond the Desert was created to guide the public in discovering this complexity and to show how archaeology can restore historical depth to a region that has been central to relations between Asia, Africa, and the Mediterranean since antiquity.',
  'The exhibition is organized by the University of Bologna on the occasion of the 59th Seminar for Arabian Studies, one of the main international events dedicated to the study of the Arabian Peninsula. Hosting this conference means bringing scholars, institutions, and research from various countries of Arabia and the Gulf to Bologna, but also offering citizens an opportunity to get to know a historical and archaeological heritage of extraordinary importance more closely.',
  'For decades, the University of Bologna has been conducting research activities in the Arabian Peninsula, with a particularly significant and lasting relationship with the Sultanate of Oman. This collaboration has provided a privileged gateway for the study of landscapes, settlements, technologies, and ancient societies of southeastern Arabia. At the same time, it fits into a broader perspective, open to the entire Arabian Peninsula and its regional and international connections.',
];

const GEOGRAPHY: string[] = [
  'The Arabian Peninsula occupies the southwestern part of Asia and is surrounded by vast maritime spaces. To the west, it faces the Red Sea; to the southeast, the Arabian Sea and the Sea of Oman; to the northeast, the Gulf. Since antiquity, its position has made it an area of passage between the Mediterranean, East Africa, Mesopotamia, Iran, South Asia, and the Indian Ocean.',
  'The desert is an essential component of this landscape, but it does not encompass it all. Alongside the large sandy spaces, such as the Rub al-Khali, there are mountain ranges, plateaus, coastal plains, seasonal watercourses, oases, and monsoon zones in the south of the Peninsula. This environmental variety has favored different forms of life and settlement, from pastoral communities to agricultural villages, from coastal centers to mining areas and exchange hubs.',
  'Looking at the Arabian Peninsula beyond the desert means overcoming stereotypes and recognizing a dynamic region, crossed by land and sea routes, capable of connecting different worlds. It also means understanding how seemingly extreme environments have offered opportunities for adaptation, innovation, and exchange. It is from this perspective that the exhibition presents to the public the contribution of the University of Bologna to the archaeological study of Arabia.',
];

export default function Exhibition() {
  return (
    <article className="bg-petroleum-blue text-desert-sand">
      {/* Intro over a beach backdrop */}
      <Reveal variant="clip">
        <section className="relative overflow-hidden">
          <PhotoBackdrop src="/images/photos/beach-woman-child.jpg" focal="center 45%" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
            <EditorialPanel
              tone="dark"
              kicker="The Exhibition"
              title="Introduction"
              paragraphs={INTRO}
            />
          </div>
        </section>
      </Reveal>

      {/* Geography over a coastal backdrop */}
      <Reveal variant="clip">
        <section className="relative overflow-hidden">
          <PhotoBackdrop src="/images/photos/beach-rider.jpg" focal="center 42%" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
            <EditorialPanel tone="dark" title="Geographical Setting" paragraphs={GEOGRAPHY} />
          </div>
        </section>
      </Reveal>

      <div className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <section
          id="credits"
          className="mt-4 pt-12 border-t border-desert-sand/20 scroll-mt-24"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-2">
            {CREDITS_PANEL.kicker}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-desert-sand">
            {CREDITS_PANEL.title}
          </h2>
          <PanelBody panel={CREDITS_PANEL} />
        </section>
      </div>
    </article>
  );
}
