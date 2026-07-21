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

const SITES = ['rasAlHadd', 'khutm', 'halban', 'romail'] as const;

// Bibliography. Citations are kept in their original language, as is standard
// for scholarly references, so they are not part of the i18n message files.
type Reference = { cite: string; url?: string };
type RefGroup = { id: string; label: { en: string; it: string; ar: string }; items: Reference[] };

const REFERENCE_GROUPS: RefGroup[] = [
  {
    id: "general",
    label: { en: "General, diachronic works & history of research", it: "Opere generali, diacroniche e storia della ricerca", ar: "أعمال عامة وتاريخية وتاريخ البحث" },
    items: [
      { cite: "Al-Ghabban, A. I., André-Salvini, B., Demange, F., Juvin, C., and Cotty, M. (2010). Roads of Arabia: Archaeology and History of the Kingdom of Saudi Arabia. Musée du Louvre and Somogy Art Publishers." },
      { cite: "Cleuziou, S., and Tosi, M. (2020). In the Shadow of the Ancestors: The Prehistoric Foundations of the Early Arabian Civilization in Oman. Second Expanded Edition. Archaeopress Publishing Ltd." },
      { cite: "De Maigret, A. (2002). Arabia Felix. Un viaggio nell’archeologia dello Yemen. Rusconi." },
      { cite: "Döpper, S. (2023). The Reuse of Tombs in Eastern Arabia. Arabia Orientalis: Studien zur Archäologie Ostarabiens 7. Archaeopress Publishing Ltd." },
      { cite: "Fossati, A. E. (2019). Messages from the Past: Rock Art of Al-Hajar Mountains. The Archaeological Heritage of Oman 4. Archaeopress Publishing Ltd." },
      { cite: "Frenez, D., and Cattani, M. (2019). Sognatori. 40 anni di ricerche archeologiche italiane in Oman / Dreamers. 40 Years of Italian Archaeological Research in Oman. BraDypUS." },
      { cite: "Gernez, G., and Giraud, J. (2019). Taming the Great Desert: Adam in the Prehistory of Oman. The Archaeological Heritage of Oman 3. Archaeopress Publishing Ltd." },
      { cite: "Hoyland, R. G. (2002). Arabia and the Arabs: From the Bronze Age to the Coming of Islam. Routledge." },
      { cite: "Loreto, R. (2018). Storia e archeologia della Penisola arabica. Collana Didattica 5. Istituto per l’Oriente C. A. Nallino." },
      { cite: "Magee, P. (2014). The Archaeology of Prehistoric Arabia: Adaptation and Social Formation from the Neolithic to the Iron Age. Cambridge World Archaeology. Cambridge University Press." },
      { cite: "Mouton, M. (2024). Deux campagnes de prospections au Yémen: 1992–1993. International Association for the Study of Arabia Monographs 21. Archaeopress Publishing Ltd." },
      { cite: "Newton, L. S., and Zarins, J. (2019). Dhofar Through the Ages: An Ecological, Archaeological and Historical Landscape. The Archaeological Heritage of Oman 1. Archaeopress Publishing Ltd." },
      { cite: "Williams, K. D., and Gregoricka, L. A. (2019). Mortuary and Bioarchaeological Perspectives on Bronze Age Arabia. Bioarchaeological Interpretations of the Human Past: Local, Regional, and Global Perspectives. University Press of Florida." },
    ],
  },
  {
    id: "paleo-neolithic",
    label: { en: "Paleolithic & Neolithic", it: "Paleolitico e Neolitico", ar: "العصر الحجري القديم والحديث" },
    items: [
      { cite: "Bretzke, K., Crassard, R., and Hilbert, Y. H. (2020). Stone Tools of Prehistoric Arabia: Papers from the Special Session of the Seminar for Arabian Studies Held on 21 July 2019. Supplement to the Proceedings of the Seminar for Arabian Studies 50. Archaeopress Publishing Ltd." },
      { cite: "Carter, R. A., and Crawford, H. E. W. (2010). Maritime Interactions in the Arabian Neolithic: Evidence from H3, As-Sabiyah, an Ubaid-Related Site in Kuwait. American School of Prehistoric Research Monograph Series 8. Brill." },
      { cite: "Drechsler, P. (2018). Dosariyah: An Arabian Neolithic Coastal Community in the Central Gulf. International Association for the Study of Arabia Monographs 19. Archaeopress Publishing Ltd." },
      { cite: "Marcucci, L. G., Badel, E., and Genchi, F. (2021). Prehistoric Fisherfolk of Oman: The Neolithic Village of Ras Al-Hamra RH-5. The Archaeological Heritage of Oman 6. Archaeopress Publishing Ltd." },
      { cite: "Masry, A. H. (1997). Prehistory in Northeastern Arabia: The Problem of Interregional Interaction. Kegan Paul International." },
      { cite: "McCorriston, J. (2023). Persistent Pastoralism: Monuments and Settlements in the Archaeology of Dhofar. The Archaeological Heritage of Oman 10. Archaeopress Publishing Ltd." },
      { cite: "Méry, S., and Lidour, K. (2025). Umm al-Quwain 2: A Neolithic Settlement and Graveyard in the United Arab Emirates. Archaeopress Archaeology. Archaeopress Publishing Ltd." },
      { cite: "Rose, J. I. (2022). An Introduction to Human Prehistory in Arabia: The Lost World of the Southern Crescent. Springer." },
      { cite: "Rose, J. I., Hilbert, Y. H., Marks, A. E., and Usik, V. I. (2019). The First Peoples of Oman: Palaeolithic Archaeology of the Nejd Plateau. The Archaeological Heritage of Oman 5. Archaeopress Publishing Ltd." },
      { cite: "Scott-Jackson, J. (2021). Qatar: Evidence of the Palaeolithic: Earliest People Revealed. Archaeopress Archaeology. Archaeopress Publishing Ltd." },
    ],
  },
  {
    id: "bronze-age",
    label: { en: "Bronze Age", it: "Età del Bronzo", ar: "العصر البرونزي" },
    items: [
      { cite: "Al-Tikriti, W. Y., and McSweeney, K. (2025). Two Late Umm an-Nar Tombs at Mowaihat-Ajman, United Arab Emirates: Excavations and Human Bone Remains. International Association for the Study of Arabia Monographs 23. Archaeopress Publishing Ltd." },
      { cite: "Crawford, H. E. W. (1998). Dilmun and Its Gulf Neighbours. Cambridge University Press." },
      { cite: "Döpper, S. (2024). Landmarks of Identity: Bronze Age Towers of the Oman Peninsula. The Archaeological Heritage of Oman 13. Archaeopress Publishing Ltd." },
      { cite: "Giardino, C. (2019). Magan: The Land of Copper: Prehistoric Metallurgy of Oman. The Archaeological Heritage of Oman 2. Archaeopress Publishing Ltd." },
      { cite: "Højlund, F. (2008). The Burial Mounds of Bahrain: Social Complexity in Early Dilmun. Jysk Arkæologisk Selskabs Skrifter 58. Aarhus University Press." },
      { cite: "Højlund, F. (2019). Qala’at al-Bahrain 3: The Western and Southern City Walls and Other Excavations. Jysk Arkæologisk Selskabs Skrifter 30:3. Aarhus University Press." },
      { cite: "Laursen, S. T., and Steinkeller, P. (2017). Babylonia, the Gulf Region, and the Indus: Archaeological and Textual Evidence for Contact in the Third and Early Second Millennia B.C. Mesopotamian Civilizations 21. Eisenbrauns." },
      { cite: "Potts, D. T. (1990). The Arabian Gulf in Antiquity. Volume I: From Prehistory to the Fall of the Achaemenid Empire. Oxford University Press." },
      { cite: "Williams, K. D. (2024). Landscapes of Death: Early Bronze Age Tombs and Mortuary Rituals on the Oman Peninsula. The Archaeological Heritage of Oman 12. Archaeopress Publishing Ltd." },
    ],
  },
  {
    id: "iron-age",
    label: { en: "Iron Age & Late Antiquity", it: "Età del Ferro e tarda antichità", ar: "العصر الحديدي والعصور القديمة المتأخرة" },
    items: [
      { cite: "Al-Jahwari, N. S., Yule, P. A., Douglas, K. A., Pracejus, B., Al-Belushi, M. A. K., and ElMahi, A. T. (2021). The Early Iron Age Metal Hoard from the Al Khawd Area (Sultan Qaboos University), Sultanate of Oman. The Archaeological Heritage of Oman 7. Archaeopress Publishing Ltd." },
      { cite: "Avanzini, A. (2016). By Land and by Sea: A History of South Arabia before Islam Recounted from Inscriptions. Arabia Antica. Philological Studies 10. L’Erma di Bretschneider." },
      { cite: "Avanzini, A., and Degli Esposti, M. (2018). Husn Salut and the Iron Age of South East Arabia: Excavations of the Italian Mission to Oman 2004–2014. Arabia Antica 15. L’Erma di Bretschneider." },
      { cite: "Döpper, S., Biezeveld, I., Maiorano, M. P., and Kluge, J. (2024). The 2018 Archaeological Survey at Tawi Said, Sultanate of Oman. Arabia Orientalis: Studien zur Archäologie Ostarabiens 8. Archaeopress Publishing Ltd." },
      { cite: "Fisher, G. (2015). Arabs and Empires before Islam. Oxford University Press." },
      { cite: "Garba, R. (2025). Hinterland Monuments of Ancient Nomads: Trilith Stone Structures of Southeastern Arabia. The Archaeological Heritage of Oman 15. Archaeopress Publishing Ltd." },
      { cite: "Grasso, V. A. (2023). Pre-Islamic Arabia: Societies, Politics, Cults and Identities during Late Antiquity. Cambridge University Press." },
      { cite: "Potts, D. T. (1990). The Arabian Gulf in Antiquity. Volume II: From Alexander the Great to the Coming of Islam. Oxford University Press." },
      { cite: "Yule, P. A. (2014). Cross-roads: Early and Late Iron Age South-eastern Arabia. Abhandlungen der Deutschen Orient-Gesellschaft 30. Harrassowitz Verlag." },
      { cite: "Yule, P. A., and Mauro, F. (2025). At the Dawn of History: The Late Pre-Islamic Age in South-Eastern Arabia. The Archaeological Heritage of Oman 14. Archaeopress Publishing Ltd." },
    ],
  },
  {
    id: "islamic",
    label: { en: "Islamic period", it: "Periodo islamico", ar: "الفترة الإسلامية" },
    items: [
      { cite: "Bosworth, C. E. (1996). The New Islamic Dynasties: A Chronological and Genealogical Manual. Columbia University Press." },
      { cite: "Clarizia, V. (2022). Ancient Weapons of Oman. Volume 1: Edged Weapons. The Archaeological Heritage of Oman 8. Archaeopress Publishing Ltd." },
      { cite: "Clarizia, V. (2022). Ancient Weapons of Oman. Volume 2: Firearms. The Archaeological Heritage of Oman 9. Archaeopress Publishing Ltd." },
      { cite: "Esposito, J. L. (1999). The Oxford History of Islam. Oxford University Press." },
      { cite: "Filoramo, G. (1999). Islam. Laterza." },
      { cite: "Hansman, J. (1985). Julfār, an Arabian Port: Its Settlement and Far Eastern Ceramic Trade from the 14th to the 18th Centuries. Prize Publication Fund 22. Royal Asiatic Society of Great Britain and Ireland." },
      { cite: "Insoll, T. (2005). The Land of Enki in the Islamic Era: Pearls, Palms and Religious Identity in Bahrain. Kegan Paul." },
      { cite: "Kennet, D. (2004). Sasanian and Islamic Pottery from Ras al-Khaimah: Classification, Chronology and Analysis of Trade in the Western Indian Ocean. Society for Arabian Studies Monographs 1; BAR International Series 1248. Archaeopress." },
      { cite: "Lo Jacono, C. (2004). Storia del mondo islamico (VII–XVI secolo). Vol. 1: Il Vicino Oriente. Einaudi." },
      { cite: "Milwright, M. (2010). An Introduction to Islamic Archaeology. Edinburgh University Press." },
      { cite: "Rougeulle, A. (2015). Sharma: Un entrepôt de commerce médiéval sur la côte du Ḥaḍramawt (Yémen, ca 980–1180). International Association for the Study of Arabia Monographs 17. Archaeopress Publishing Ltd." },
      { cite: "Rougeulle, A. (2023). Qalhat, a Medieval Port City of Oman: From a Field of Ruins to UNESCO. The Archaeological Heritage of Oman 11. Archaeopress Publishing Ltd." },
      { cite: "Walker, B. J., Insoll, T., and Fenwick, C. (2021). The Oxford Handbook of Islamic Archaeology. Oxford Handbooks. Oxford University Press." },
    ],
  },
];

// Online resources, grouped as in the source bibliography.
type WebGroup = { id: string; label: { en: string; it: string; ar: string }; items: { name: string; url: string }[] };

const WEB_GROUPS: WebGroup[] = [
  {
    id: "epigraphic",
    label: { en: "Epigraphic databases", it: "Banche dati epigrafiche", ar: "قواعد بيانات النقوش" },
    items: [
      { name: "DASI – Digital Archive for the Study of Pre-Islamic Arabian Inscriptions", url: "https://dasi.cnr.it/" },
      { name: "OCIANA – Online Corpus of the Inscriptions of Ancient North Arabia", url: "https://ociana.osu.edu/" },
      { name: "DiCoNab – Digital Corpus of the Nabataean and Developing Arabic Inscriptions", url: "https://diconab.huma-num.fr/inscriptions/" },
      { name: "Thesaurus d’Épigraphie Islamique", url: "https://maxvanberchem.org/en/thesaurus-d-epigraphie-islamique" },
      { name: "Sabaic Online Dictionary", url: "https://sabaweb.uni-jena.de/SabaWeb/" },
      { name: "Mnamon – Antiche scritture del Mediterraneo", url: "https://mnamon.sns.it/" },
    ],
  },
  {
    id: "ancient-arabia",
    label: { en: "Ancient Arabia & epigraphy", it: "Arabia antica ed epigrafia", ar: "الجزيرة العربية القديمة والنقوش" },
    items: [
      { name: "Ancient Arabia", url: "https://ancientarabia.huma-num.fr/" },
      { name: "Open Digital Epigraphy Hub – EpiHub", url: "https://open-epihub.cnr.it/" },
    ],
  },
  {
    id: "archaeological",
    label: { en: "Archaeological databases & archives", it: "Banche dati e archivi archeologici", ar: "قواعد البيانات والأرشيفات الأثرية" },
    items: [
      { name: "EAMENA – Endangered Archaeology in the Middle East and North Africa", url: "https://database.eamena.org/" },
      { name: "ArchaeOman", url: "https://www.archaeoman.de/en/" },
      { name: "Arabian Rock Art Heritage", url: "https://saudi-archaeology.com/" },
      { name: "Manar al-Athar", url: "https://www.manar-al-athar.ox.ac.uk/" },
      { name: "Qatar Digital Library", url: "https://www.qdl.qa/en" },
    ],
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
            {REFERENCE_GROUPS.map((group, gi) => (
              <div key={group.id} className={gi === 0 ? '' : 'mt-10'}>
                <h3 className="font-display font-extrabold text-lg text-deep-basalt mb-4">
                  {group.label[locale as 'en' | 'it' | 'ar'] ?? group.label.en}
                </h3>
                <ul className="space-y-4 text-sm leading-relaxed text-deep-basalt/85">
                  {group.items.map((ref) => (
                    <li key={ref.cite} className="ps-2 border-s-2 border-unibo-red/30">
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
                </ul>
              </div>
            ))}

            <h3 className="font-display font-extrabold text-xl text-deep-basalt mt-12 mb-1">
              {{ en: 'Web sources', it: 'Sitografia', ar: 'مصادر إلكترونية' }[locale] ??
                'Web sources'}
            </h3>
            {WEB_GROUPS.map((group) => (
              <div key={group.id} className="mt-6">
                <h4 className="font-display font-extrabold text-base text-deep-basalt mb-3">
                  {group.label[locale as 'en' | 'it' | 'ar'] ?? group.label.en}
                </h4>
                <ul className="space-y-3 text-sm leading-relaxed text-deep-basalt/85">
                  {group.items.map((item) => (
                    <li key={item.url} className="ps-2 border-s-2 border-unibo-red/30">
                      <span>{item.name}</span>{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-unibo-red hover:underline break-all"
                      >
                        {item.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Collapsible>
        </section>
      </div>
    </article>
  );
}
