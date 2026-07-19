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
    cite: "Al-Ghabban, A. I., André-Salvini, B., Demange, F., Juvin, C., and Cotty, M. (2010). Roads of Arabia: Archaeological Treasures of Saudi Arabia. Louvre Abu Dhabi / Art Book Magazine Éditions.",
  },
  {
    cite: "Al-Jallad, A. (2025). The Decipherment of the Dhofari Script: Three halḥam abecedaries and the first glimpses into the corpus. Jaarbericht Ex Oriente Lux, 49, 119–147.",
    url: "https://doi.org/10.5281/zenodo.15853465",
  },
  {
    cite: "Baumer, C. (2022). Rock Art in Saudi Arabia – a General Introduction and New Findings. Adoranten, 53, 5–29.",
    url: "https://doi.org/10.65611/ador.vi.63784",
  },
  {
    cite: "Beech, M. J., Al Hameli, N. H., Thorburn Cuttler, R., Lidour, K., Roberts, H., Crassard, R., Yalman, N., and Davies, T. (2022). Neolithic settlement patterns and subsistence strategies on Marawah Island, Abu Dhabi Emirate, United Arab Emirates. Proceedings of the Seminar for Arabian Studies, 51, 7–24.",
  },
  {
    cite: "Bernardini, M. (2004). Storia del mondo islamico (VII-XVI secolo). Vol. 2: Il mondo iranico e turco. Torino: Einaudi.",
  },
  {
    cite: "Besseiche, M., Chambraud, E., Dabrowski, V., Brandstatt, E., Sabot, F., Bouchaud, C., and Gros-Balthazard, M. (2025). DateBack, an evolving open-access repository of Phoenix archaeobotanical data supporting new perspectives on the history of date palm cultivation. Peer Community Journal, 5, e55.",
    url: "https://doi.org/10.24072/pcjournal.561",
  },
  {
    cite: "Bortolini, E., and Munoz, O. (2015). Life and death in prehistoric Oman: Insights from Late Neolithic and Early Bronze Age funerary practices (4th–3rd mill. BC). In The Archaeological Heritage of Oman, Proceedings of the symposium held at UNESCO, September, 7th 2012 (pp. 61–80). Paris/Muscat: UNESCO and Ministry of Heritage and Culture, Sultanate of Oman.",
  },
  {
    cite: "Bortolini, E., Seghi, F., Facciani, S., Bianchi, V., Brener, E., Bernardini, S., Silvestrini, S., Frenez, D., Urcia, A., Vazzana, A., and Benazzi, S. (2025). La necropoli dell’Antica Età del Bronzo di Halban (Governatorato di Al-Batinah Sud), Sultanato dell’Oman. OCNUS, 33, 323–329.",
  },
  {
    cite: "Bosworth, C. E. (1996). The New Islamic Dynasties: A Chronological and Genealogical Manual. New York: Columbia University Press.",
  },
  {
    cite: "Charbonnier, J. (2015). Groundwater management in Southeast Arabia from the Bronze Age to the Iron Age: a critical reassessment. Water History, 7, 39–71.",
    url: "https://doi.org/10.1007/s12685-014-0110-x",
  },
  {
    cite: "Charloux, G., AlMalki, T., and AlQaeed, A. (2021). The “walled oases” phenomenon. A study of the ramparts in Dūmat al-Jandal and other pre-Islamic sites in north-western Arabia. Arabian Archaeology and Epigraphy, 32, 256–290.",
    url: "https://doi.org/10.1111/aae.12177",
  },
  {
    cite: "Charloux, G., Guagnin, M., Petraglia, M., and AlSharekh, A. (2022). A rock art tradition of life-sized, naturalistic engravings of camels in Northern Arabia: new insights on the mobility of Neolithic populations in the Nafud Desert. Antiquity, 96(389), 1301–1309.",
    url: "https://doi.org/10.15184/aqy.2022.95",
  },
  {
    cite: "Charpentier, V. (2008). Hunter-gatherers of the “empty quarter of the early Holocene” to the last Neolithic societies: chronology of the late prehistory of south-eastern Arabia (8000-3100 BC). Proceedings of the Seminar for Arabian Studies, 38, 93–116.",
  },
  {
    cite: "Charpentier, V., Marchand, G., Béarez, P., Borgi, F., Crassard, R., Lefèvre, C., Maiorano, M. P., Al-Mashani, A., and Vosges, J. (2023). The latest Neolithic conquest of “new territories” in the Arabian Sea: The Al-Hallaniyat Archipelago (Kuria Muria, Sultanate of Oman). The Journal of Island and Coastal Archaeology, 18(4), 662–681.",
    url: "https://doi.org/10.1080/15564894.2021.2015017",
  },
  {
    cite: "Cleuziou, S., and Tosi, M. (2021). In the Shadow of the Ancestors: The Prehistoric Foundations of the Early Arabian Civilization in Oman: Second Expanded Edition. Oxford: Archaeopress.",
  },
  {
    cite: "Condoluci, C. (2009). L’Arabia Sud orientale nell’Età del Ferro. Analisi archeologica dei siti ed organizzazione degli spazi. Tesi di dottorato, Università degli Studi di Pisa.",
    url: "https://hdl.handle.net/20.500.14242/135101",
  },
  {
    cite: "Crassard, R., Hilbert, Y. H., Dinies, M., Monchot, H., Depreux, B., Sahlah, S., Al-Badaiwi, W., and Charloux, G. (2025). Early Arabian Neolithic agropastoral communities from Asifir, Northwestern Saudi Arabia. Archaeological and Anthropological Sciences, 17, 130.",
    url: "https://doi.org/10.1007/s12520-025-02234-2",
  },
  {
    cite: "Curci, A., Carletti, M., and Tosi, M. (2014). The camel remains from site HD-6 (Ra’s al-Hadd, Sultanate of Oman): An opportunity for a critical review of dromedary findings in eastern Arabia. Anthropozoologica, 49(2), 207–224.",
    url: "https://doi.org/10.5252/az2014n2a04",
  },
  {
    cite: "Dabrowski, V., Bouchaud, C., Desormeau, X., Herveux, L., Chambraud, E., Ryan, S. E., and Tengberg, M. (2026). A tale of new crops in the arid Arabian Peninsula oasis from antiquity to the early Islamic period. Vegetation History and Archaeobotany, 35, 181–194.",
    url: "https://doi.org/10.1007/s00334-023-00976-4",
  },
  {
    cite: "de Maigret, A. (2002). Arabia Felix. Un viaggio nell’archeologia dello Yemen. Milano: Rusconi.",
  },
  {
    cite: "Esposito, J. L. (Ed.) (1999). The Oxford History of Islam. Oxford: Oxford University Press.",
  },
  {
    cite: "Filoramo, G. (Ed.) (1999). Islam. Roma: Laterza.",
  },
  {
    cite: "Frenez, D., and Cattani, M. (2019). Sognatori. 40 anni di ricerche archeologiche italiane in Oman / Dreamers. 40 years of Italian archaeological research in Oman. Roma: BraDypUS Editore.",
  },
  {
    cite: "Gros-Balthazard, M., and Flowers, J. M. (2021). A Brief History of the Origin of Domesticated Date Palms. In Al-Khayri, J. M., Jain, S. M., and Johnson, D. V. (Eds.), The Date Palm Genome, Vol. 1, Compendium of Plant Genomes (pp. 55–74). Cham: Springer.",
    url: "https://doi.org/10.1007/978-3-030-73746-7_3",
  },
  {
    cite: "Guagnin, M., Charloux, G., AlSharekh, A. M., Crassard, R., Hilbert, Y. H., Andreae, M. O., AlAmri, A., Preusser, F., Dubois, F., Burgos, F., Flohr, P., Mora, P., AlQaeed, A., and AlAli, Y. (2022). Life-sized Neolithic camel sculptures in Arabia: A scientific assessment of the craftsmanship and age of the Camel Site reliefs. Journal of Archaeological Science: Reports, 42, 103165.",
    url: "https://doi.org/10.1016/j.jasrep.2021.103165",
  },
  {
    cite: "Hoyland, R. G. (2002). Arabia and the Arabs: From the Bronze Age to the coming of Islam. London: Routledge.",
  },
  {
    cite: "Kennedy, M., Strolin, L., McMahon, J., Franklin, D., Flavel, A., Noble, J., Swift, L., Nassr, A., Fallon, S., and Thomas, H. (2023). Cult, herding, and ‘pilgrimage’ in the Late Neolithic of north-west Arabia: Excavations at a mustatil east of AlUla. PLoS ONE, 18(3), e0281904.",
    url: "https://doi.org/10.1371/journal.pone.0281904",
  },
  {
    cite: "Kennedy, M., Strolin, L., Swift, L., Bagdadi, F., McMahon, J., and Thomas, H. (2024). The Nexus of Cult and Pastoralism in Neolithic Northwest Arabia: Contextualising the Mustatil Phenomenon. Open Quaternary, 10(6), 1–31.",
    url: "https://doi.org/10.5334/oq.139",
  },
  {
    cite: "Khan, M. (2013). Rock Art of Saudi Arabia. Arts, 2, 447–475.",
    url: "https://doi.org/10.3390/arts2040447",
  },
  {
    cite: "Laursen, S. T., and Steinkeller, P. (2017). Babylonia, the Gulf Region, and the Indus: Archaeological and Textual Evidence for Contact in the Third and Early Second millennia B.C. Winona Lake, Indiana: Eisenbrauns.",
  },
  {
    cite: "Lidour, K., Cuenca Solana, D., Setién Marquínez, J., Cimentada Hernández, A., Charpentier, V., and Mery, S. (2024). Shell tool technology and new insights into techno-cultural strategies during the Neolithic in Eastern Arabia. An initial case study from Umm al-Quwain (United Arab Emirates). Archaeological Research in Asia, 38, 100520.",
    url: "https://doi.org/10.1016/j.ara.2024.100520",
  },
  {
    cite: "Lidour, K., Al Hameli, N., Crassard, R., D’Silva, F., and Al Haj, A. (2025). Exploring the Early Neolithic in the Arabian Gulf: A newly discovered 8,400-year-old stone-built architecture on Ghagha Island, United Arab Emirates. PLoS One, 20(6), e0326259.",
    url: "https://doi.org/10.1371/journal.pone.0326259",
  },
  {
    cite: "Lo Jacono, C. (2004). Storia del mondo islamico (VII-XVI secolo). Vol. 1: Il Vicino Oriente. Torino: Einaudi.",
  },
  {
    cite: "Loreto, R. (2012). Da Marib a Gaza. Profumi d’Arabia e rotte carovaniere: fonti epigrafiche ed evidenze archeologiche dal paese dell’incenso. In Carannante, A., and D’Acunto, M. (Eds.), Profumi Nelle Società Antiche: Produzione, Commercio, Usi, Valori Simbolici (pp. 137–154). Paestum (Salerno): Pandemos.",
  },
  {
    cite: "Loreto, R. (2018). Storia e archeologia della Penisola arabica. Roma: Ipocan – Libreria Editrice Aseq.",
  },
  {
    cite: "Lucarini, G., Guagnin, M., Shipton, C., Radini, A., Alsharekh, A. M., and Petraglia, M. (2023). Plant, pigment, and bone processing in the Neolithic of northern Arabia – New evidence from Use-wear analysis of grinding tools at Jebel Oraf. PLoS ONE, 18(10), e0291085.",
    url: "https://doi.org/10.1371/journal.pone.0291085",
  },
  {
    cite: "Magee, P. (2014). The Archaeology of Prehistoric Arabia: Adaptation and Social Formation from the Neolithic to the Iron Age. Cambridge: Cambridge University Press.",
  },
  {
    cite: "Maiorano, M. P., Al Kindi, M., Charpentier, V., Vosges, J., Gommery, D., Marchand, G., Qatan, A., Borgi, F., and Pickford, M. (2020). Living and moving in Maitan. Proceedings of the Seminar for Arabian Studies, 50, 83–100.",
  },
  {
    cite: "Maiorano, M. P., Al Kindi, M., Charpentier, V., Vosges, J., Marchand, G., Borgi, F., Pickford, M., Beuzen-Waller, T., Gommery, D., al-Huraizi, S., and Al-Mahri, A. (2024). Alle porte del deserto: gli insediamenti di Maitan nel quadro del Neolitico dell’Oman meridionale (Rub’ al-Khali, Sultanato dell’Oman). In Ramazzotti, M. (Ed.), Costeggiando l’Eurasia / Coasting Eurasia: Archeologia del paesaggio e geografia storica tra l’Oceano Indiano e il Mar Mediterraneo (pp. 99–117). Roma: Sapienza Università Editrice.",
    url: "https://doi.org/10.13133/9788893773430",
  },
  {
    cite: "McMahon, J., Stileman, F., Shipton, C., Strolin, L., Nassr, A., Porr, M., AlBalawi, Y., Kennedy, M., and Thomas, H. (2024). New evidence for Neolithic occupation in north-west Arabia: Standing Stone Circles on the Harrat ‘Uwayrid. Levant, 56(2), 185–203.",
    url: "https://doi.org/10.1080/00758914.2024.2350826",
  },
  {
    cite: "Petraglia, M. D., Breeze, P. S., and Groucutt, H. S. (2019). Blue Arabia, Green Arabia: examining human colonisation and dispersal models. In Rasul, N. M. A., and Stewart, I. C. F. (Eds.), Geological Setting, Palaeoenvironment and Archaeology of the Red Sea (pp. 675–683). Cham: Springer.",
    url: "https://doi.org/10.1007/978-3-319-99408-6_30",
  },
  {
    cite: "Petraglia, M. D., Groucutt, H. S., Guagnin, M., Breeze, P. S., and Boivin, N. (2020). Human responses to climate and ecosystem change in ancient Arabia. PNAS, 117(15), 8263–8270.",
    url: "https://doi.org/10.1073/pnas.1920211117",
  },
  {
    cite: "Ramazzotti, M. (2022). Fumi e profumi d’Oriente. Legami essenziali e aromatici tra l’Asia occidentale e l’Africa orientale. ISIMU, 25, 185–196.",
  },
  {
    cite: "Rose, J. I. (2022). An Introduction to Human Prehistory in Arabia: The Lost World of the Southern Crescent. Cham: Springer.",
  },
  {
    cite: "Stein, P. (2010). Die altsüdarabischen Minuskelinschriften auf Holzstäbchen aus der Bayerischen Staatsbibliothek in München (Epigraphische Forschungen auf der Arabischen Halbinsel 5). Tübingen: Wasmuth.",
  },
  {
    cite: "Velde, C. (2003). Wadi Suq and Late Bronze Age in the Oman Peninsula. In Potts, D. T., Al-Naboodah, H., and Hellyer, P. (Eds.), Archaeology of the United Arab Emirates: Proceedings of the first international conference on the archaeology of the UAE (pp. 102–113). London: Trident Press.",
  },
  {
    cite: "Williams, K. D. (2024). Landscapes of death: Early Bronze Age tombs and mortuary rituals on the Oman Peninsula. Oxford: Archaeopress.",
  },
  {
    cite: "Zekri, S., Zeynali, M. J., Channouf, N., Al-Maktoumi, A., Al-Ruheili, A., and Al Busaidi, H. (2023). Dynamic conservation of traditional irrigation systems: a Falaj case study. Arabian Journal of Geosciences, 16(3), 199.",
    url: "https://doi.org/10.1007/s12517-023-11251-1",
  },
];

// Online resources cited alongside the bibliography.
const WEB_SOURCES: string[] = [
  "https://mnamon.sns.it/index.php?page=Scrittura&id=27#presentazione",
  "https://mnamon.sns.it/index.php?page=Scrittura&id=66",
  "https://whc.unesco.org/en/list/1207/",
  "https://www.nm.gov.om/en/home",
  "https://www.britannica.com/place/history-of-Arabia-31558",
  "https://commons.wikimedia.org/wiki/Kaaba?uselang=it#/media/File:Kaaba2.JPG",
  "https://commons.wikimedia.org/wiki/File:Umm_Al_Nar_Cup.jpg#filehistory",
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

            <h3 className="font-display font-extrabold text-lg text-deep-basalt mt-10 mb-4">
              {{ en: 'Web sources', it: 'Sitografia', ar: 'مصادر إلكترونية' }[locale] ??
                'Web sources'}
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              {WEB_SOURCES.map((url) => (
                <li key={url} className="ps-2 border-s-2 border-unibo-red/30">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-unibo-red hover:underline break-all"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </Collapsible>
        </section>
      </div>
    </article>
  );
}
