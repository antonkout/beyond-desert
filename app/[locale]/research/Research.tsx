'use client';
import { useTranslations, useLocale } from 'next-intl';
import { getPanels } from '@/app/[locale]/history/panels';
import EditorialPanel from '@/app/components/EditorialPanel';
import Collapsible from '@/app/components/Collapsible';
import SitesMap from '@/app/components/SitesMap';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';

// Even petroleum scrim: the photo stays visible across the whole section while
// light text remains legible over it (matches the Exhibition backdrops).
const RESEARCH_OVERLAY =
  'linear-gradient(180deg, rgba(22,48,57,0.70) 0%, rgba(22,48,57,0.64) 45%, rgba(22,48,57,0.80) 100%)';

const SITES = ['rasAlHadd', 'halban', 'romail'] as const;

// Bibliography. Citations are kept in their original language, as is standard
// for scholarly references, so they are not part of the i18n message files.
type Reference = { cite: string; url?: string };

const REFERENCES: Reference[] = [
  {
    cite: 'Al-Ghabban, A. I., André-Salvini, B., Demange, F., Juvin, C. & Cotty, M. (2010). Roads of Arabia: Archaeology and History of the Kingdom of Saudi Arabia. Somogy Art Publishers.',
  },
  {
    cite: 'Baumer, C. (2022). "Rock Art in Saudi Arabia." Adoranten (Rock Art Scandinavia).',
  },
  {
    cite: 'Bortolini, E. & Muñoz, O. (2015). "Life and death in prehistoric Oman: Insights from Late Neolithic and Early Bronze Age funerary practices (4th–3rd mill. BC)." In The Archaeological Heritage of Oman, Proceedings of the symposium held at UNESCO, 7 September 2012. Ministry of Heritage and Culture, Sultanate of Oman; UNESCO.',
  },
  {
    cite: 'Bortolini, E., Seghi, F., Facciani, S., Bianchi, V., Brener, E., Bernardini, S., … & Benazzi, S. "La necropoli dell\'antica età del Bronzo di Halban (Governatorato di Al Batinah Sud), Sultanato dell\'Oman."',
  },
  {
    cite: 'Cattani, M. & Frenez, D. (2019). Sognatori. 40 anni di ricerche archeologiche italiane in Oman / Dreamers. 40 Years of Italian Archaeological Research in Oman.',
  },
  {
    cite: 'Charbonnier, J. (2015). "Groundwater management in Southeast Arabia from the Bronze Age to the Iron Age: a critical reassessment." Water History 7: 39–71.',
    url: 'https://doi.org/10.1007/s12685-014-0110-x',
  },
  {
    cite: 'Charloux, G., AlMalki, T. & AlQaeed, A. (2021). "The “walled oases” phenomenon: A study of the ramparts in Dūmat al-Jandal and other pre-Islamic sites in north-western Arabia." Arabian Archaeology and Epigraphy 32: 256–290.',
    url: 'https://doi.org/10.1111/aae.12177',
  },
  {
    cite: 'Charpentier, V. (2008). "Hunter-gatherers of the “empty quarter of the early Holocene” to the last Neolithic societies: chronology of the late prehistory of south-eastern Arabia (8000–3100 BC)." Proceedings of the Seminar for Arabian Studies 38: 59–82.',
  },
  {
    cite: 'Charpentier, V. et al. (2023). "Twelve years of the “Arabian Seashores” project: How the extensive investigation of coastal Oman changed the paradigm of the Arabian Neolithic." Arabian Archaeology and Epigraphy 34(S1).',
    url: 'https://doi.org/10.1111/aae.12236',
  },
  {
    cite: 'Cleuziou, S. & Tosi, M. (2021). In the Shadow of the Ancestors: The Prehistoric Foundations of the Early Arabian Civilization in Oman (2nd expanded ed.). Archaeopress.',
  },
  {
    cite: 'Crassard, R. et al. (2025). "Desert Kites and Related Constructions: Data from the Globalkites Project." Journal of Open Archaeology Data.',
    url: 'https://doi.org/10.5334/joad.150',
  },
  {
    cite: 'Dabrowski, V., Bouchaud, C., Desormeau, X. et al. (2026). "A tale of new crops in the arid Arabian Peninsula oasis from antiquity to the early Islamic period." Vegetation History and Archaeobotany 35: 181–194.',
    url: 'https://doi.org/10.1007/s00334-023-00976-4',
  },
  {
    cite: 'Guagnin, M. et al. (2022). "Life-sized Neolithic camel sculptures in Arabia: A scientific assessment of the craftsmanship and age of the Camel Site reliefs." Journal of Archaeological Science: Reports 42: 103165.',
  },
  {
    cite: 'Hoyland, R. G. (2002). Arabia and the Arabs: From the Bronze Age to the Coming of Islam. Routledge.',
  },
  {
    cite: 'Laursen, S. & Steinkeller, P. (2017). Babylonia, the Gulf Region, and the Indus: Archaeological and Textual Evidence for Contact in the Third and Early Second Millennia B.C. Eisenbrauns.',
  },
  {
    cite: 'Loreto, R. (2012). "Da Marib a Gaza. Profumi d\'Arabia e rotte carovaniere: fonti epigrafiche ed evidenze archeologiche dal paese dell\'incenso." In I profumi nelle società antiche. Pandemos, 137–154.',
  },
  {
    cite: 'Loreto, R. (2018). Storia e archeologia della Penisola arabica. Ipocan – Libreria Editrice Aseq.',
  },
  {
    cite: 'Lucarini, G. et al. (2023). "Plant, pigment, and bone processing in the Neolithic of northern Arabia — New evidence from use-wear analysis of grinding tools at Jebel Oraf." PLOS ONE 18(10): e0291085.',
    url: 'https://doi.org/10.1371/journal.pone.0291085',
  },
  {
    cite: 'Magee, P. (2014). The Archaeology of Prehistoric Arabia: Adaptation and Social Formation from the Neolithic to the Iron Age. Cambridge University Press.',
  },
  {
    cite: 'Petraglia, M. D., Breeze, P. S. & Groucutt, H. S. (2019). "Blue Arabia, Green Arabia: Examining Human Colonisation and Dispersal Models." In Geological Setting, Palaeoenvironment and Archaeology of the Red Sea. Springer, 675–683.',
  },
  {
    cite: 'Petraglia, M. D., Groucutt, H. S., Guagnin, M., Breeze, P. S. & Boivin, N. (2020). "Human responses to climate and ecosystem change in ancient Arabia." Proceedings of the National Academy of Sciences 117(15): 8263–8270.',
    url: 'https://doi.org/10.1073/pnas.1920211117',
  },
  {
    cite: 'Ramazzotti, M. (2022). "Fumi e profumi d\'Oriente. Legami essenziali e aromatici tra l\'Asia occidentale e l\'Africa orientale." ISIMU 25: 185–196.',
  },
  {
    cite: 'Rose, J. I. (2022). An Introduction to Human Prehistory in Arabia: The Lost World of the Southern Crescent. Springer.',
  },
  {
    cite: 'Velde, C. (2003). "Wadi Suq and Late Bronze Age in the Oman Peninsula." In Archaeology of the United Arab Emirates. Trident Press, 102–113.',
  },
  {
    cite: 'Williams, K. D. (2024). "Landscapes of death: Early Bronze Age tombs and mortuary rituals on the Oman Peninsula," 1–270.',
  },
];

export default function Research() {
  const t = useTranslations('sections.research');
  const locale = useLocale();
  const RESEARCH_PANELS = getPanels(locale).filter(
    (p) => p.id === 'history-of-studies' || p.id === 'current-excavations'
  );

  return (
    <article className="bg-desert-sand">
      <header className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
        <PhotoBackdrop src="/images/photos/excavation-trench.jpg" focal="center 35%" imgOpacity={0.62} overlay={RESEARCH_OVERLAY} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            {{ en: 'Research', it: 'Ricerca', ar: 'البحث' }[locale] ?? 'Research'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t('title')}</h1>
          <p className="max-w-prose opacity-90">{t('lead')}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SITES.map((site) => (
            <div
              key={site}
              className="bg-white border border-deep-basalt/15 rounded-lg p-6"
            >
              <p className="text-xs uppercase tracking-wider text-unibo-red mb-1">
                {t(`${site}.period`)}
              </p>
              <h2 className="font-display font-extrabold text-xl text-deep-basalt mb-2">
                {t(`${site}.title`)}
              </h2>
              <p className="text-sm text-deep-basalt/80 leading-relaxed">
                {t(`${site}.lead`)}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-prose mb-16">
          <h2 className="font-display font-extrabold text-2xl text-deep-basalt mb-2">
            {t('history.title')}
          </h2>
          <p className="text-deep-basalt/85 leading-relaxed">{t('history.lead')}</p>
        </div>

        {RESEARCH_PANELS.filter((p) => p.id === 'history-of-studies').map((panel) => (
          <EditorialPanel
            key={panel.id}
            panel={panel}
            className="mb-16 border-t border-deep-basalt/15 pt-12"
          />
        ))}

        {RESEARCH_PANELS.filter((p) => p.id === 'current-excavations').map((panel) => (
          <EditorialPanel
            key={panel.id}
            panel={panel}
            className="mb-16 border-t border-deep-basalt/15 pt-12"
          />
        ))}

        <section aria-labelledby="excavation-map-heading" className="mb-16">
          <h3
            id="excavation-map-heading"
            className="font-display font-extrabold text-xl md:text-2xl text-deep-basalt mb-5"
          >
            {{ en: 'Excavation map', it: 'Mappa degli scavi', ar: 'خريطة التنقيبات' }[locale] ??
              'Excavation map'}
          </h3>
          <SitesMap />
        </section>

        <section
          aria-labelledby="references-heading"
          className="border-t border-deep-basalt/15 pt-12"
        >
          <h2
            id="references-heading"
            className="font-display text-2xl md:text-3xl text-deep-basalt mb-2"
          >
            {t('references.title')}
          </h2>
          <p className="max-w-prose mb-8 text-deep-basalt/75">
            {t('references.lead')}
          </p>

          <Collapsible surface="sand" collapsedClass="max-h-64" id="references">
            <ol className="space-y-4 text-sm leading-relaxed text-deep-basalt/85">
              {REFERENCES.map((ref) => (
                <li
                  key={ref.cite}
                  className="ps-2 border-s-2 border-unibo-red/30"
                >
                  <span>{ref.cite}</span>
                  {ref.url && (
                    <>
                      {' '}
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-unibo-red hover:underline break-all"
                      >
                        {ref.url}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </Collapsible>
        </section>
      </div>
    </article>
  );
}
