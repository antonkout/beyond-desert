'use client';
import { useLocale } from 'next-intl';
import PanelBody from '@/app/components/PanelBody';
import Reveal from '@/app/components/Reveal';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';
import EditorialPanel from '@/app/components/EditorialPanel';
import { getPanels } from '@/app/[locale]/history/panels';

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

const INTRO_IT: string[] = [
  'La Penisola Araba è spesso associata, nell’immaginario comune, all’immensità del deserto. Oltre questa immagine, potente ma parziale, si apre però una storia molto più ricca, fatta di coste, montagne, oasi, rotte marittime, risorse minerarie, insediamenti, scambi e incontri tra comunità diverse. Oltre il deserto nasce per accompagnare il pubblico alla scoperta di questa complessità e per mostrare come l’archeologia possa restituire profondità storica a una regione centrale nei rapporti tra Asia, Africa e Mediterraneo fin dall’antichità.',
  'La mostra è organizzata dall’Università di Bologna in occasione del 59° Seminar for Arabian Studies, uno dei principali appuntamenti internazionali dedicati allo studio della Penisola Araba, in collaborazione con il Comune di Bologna – Biblioteca Salaborsa. Accogliere questo convegno significa portare a Bologna studiosi, istituzioni e ricerche provenienti da diversi Paesi dell’Arabia e del Golfo, ma anche offrire alla cittadinanza un’occasione per conoscere più da vicino un patrimonio storico e archeologico di straordinaria importanza.',
  'Da molti decenni l’Università di Bologna svolge attività di ricerca nella Penisola Araba, con un rapporto particolarmente significativo e duraturo con il Sultanato dell’Oman. Questa collaborazione ha costituito una porta d’accesso privilegiata per lo studio dei paesaggi, degli insediamenti, delle tecnologie e delle società antiche dell’Arabia sud-orientale. Al tempo stesso, essa si inserisce in una prospettiva più ampia, aperta all’intera Penisola Araba e alle sue connessioni regionali e internazionali.',
];

const GEOGRAPHY_IT: string[] = [
  'La Penisola Araba occupa la parte sud-occidentale dell’Asia ed è circondata da grandi spazi marittimi. A ovest si affaccia sul Mar Rosso, a sud-est sul Mare Arabico e sul Mare d’Oman, a nord-est sul Golfo. La sua posizione ne ha fatto, fin dall’antichità, un’area di passaggio tra il Mediterraneo, l’Africa orientale, la Mesopotamia, l’Iran, l’Asia meridionale e l’Oceano Indiano.',
  'Il deserto è una componente essenziale di questo paesaggio, ma non lo esaurisce. Accanto alle grandi distese sabbiose, come il Rub al-Khali, si trovano catene montuose, altopiani, pianure costiere, corsi d’acqua stagionali, oasi e zone monsoniche nel sud della Penisola. Questa varietà ambientale ha favorito forme diverse di vita e di insediamento, dalle comunità pastorali ai villaggi agricoli, dai centri costieri alle aree minerarie e ai nodi di scambio.',
  'Guardare alla Penisola Araba oltre il deserto significa superare gli stereotipi e riconoscere una regione dinamica, attraversata da vie terrestri e marittime, capace di collegare mondi diversi. Significa anche comprendere come ambienti apparentemente estremi abbiano offerto possibilità di adattamento, innovazione e scambio. È da questa prospettiva che la mostra presenta al pubblico il contributo dell’Università di Bologna allo studio archeologico dell’Arabia.',
];

const LABELS = {
  en: { kicker: 'The Exhibition', intro: 'Introduction', geography: 'Geographical Setting' },
  it: { kicker: 'La mostra', intro: 'Introduzione', geography: 'Inquadramento geografico' },
};

export default function Exhibition() {
  const locale = useLocale();
  const isIt = locale === 'it';
  const intro = isIt ? INTRO_IT : INTRO;
  const geography = isIt ? GEOGRAPHY_IT : GEOGRAPHY;
  const labels = isIt ? LABELS.it : LABELS.en;
  const CREDITS_PANEL = getPanels(locale).find((p) => p.id === 'credits')!;
  return (
    <article className="bg-petroleum-blue text-desert-sand">
      {/* Intro over a beach backdrop */}
      <Reveal variant="clip">
        <section className="relative overflow-hidden">
          <PhotoBackdrop src="/images/photos/beach-woman-child.jpg" focal="center 45%" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
            <EditorialPanel
              tone="dark"
              kicker={labels.kicker}
              title={labels.intro}
              paragraphs={intro}
            />
          </div>
        </section>
      </Reveal>

      {/* Geography over a coastal backdrop */}
      <Reveal variant="clip">
        <section className="relative overflow-hidden">
          <PhotoBackdrop src="/images/photos/beach-rider.jpg" focal="center 42%" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
            <EditorialPanel tone="dark" title={labels.geography} paragraphs={geography} />
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
