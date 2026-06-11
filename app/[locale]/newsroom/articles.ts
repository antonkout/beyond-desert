// Newsroom — press coverage collage.
//
// Each entry is one captured article screenshot that links out to the original
// piece. Screenshots live in `public/images/newsroom/`. The masonry collage
// preserves each image's natural aspect ratio, so there is no need to crop the
// screenshots — varied heights are what give the wall its editorial rhythm.
//
// URLs were resolved from the original headlines (the two Internazionale links
// come from the intern.az short URLs in the captures). If any article has moved,
// just update its `url` below.

export interface NewsArticle {
  /** Stable id, used as React key. */
  id: string;
  /** Public path to the captured screenshot, under /public. */
  src: string;
  /** The original article URL the tile links to. */
  url: string;
  /** Publication name, shown on hover. */
  source: string;
  /** Headline, shown on hover. */
  title: string;
  /** Year, shown next to the source on hover. */
  date?: string;
}

export const ARTICLES: NewsArticle[] = [
  {
    id: 'intern-arabia',
    src: '/images/newsroom/Internazionale.png',
    url: 'https://www.internazionale.it/notizie/catherine-cornet/2020/02/07/arabia-saudita-turismo',
    source: 'Internazionale',
    title: 'Alla scoperta di una sconosciuta antichissima Arabia',
    date: '2020',
  },
  {
    id: 'guardian-tourists',
    src: '/images/newsroom/guardian11.png',
    url: 'https://www.theguardian.com/world/2019/sep/27/saudi-arabia-offer-tourist-visas-for-first-time',
    source: 'The Guardian',
    title: 'Saudi Arabia to open itself up to foreign tourists for the first time',
    date: '2019',
  },
  {
    id: 'guardian-salvator-mundi',
    src: '/images/newsroom/guardian1.png',
    url: 'https://www.theguardian.com/artanddesign/article/2024/aug/24/salvator-mundi-saudi-arabia-and-the-saga-of-the-missing-masterpiece',
    source: 'The Guardian',
    title: 'Salvator Mundi, Saudi Arabia and the saga of the missing masterpiece',
    date: '2024',
  },
  {
    id: 'guardian-qatar-britain',
    src: '/images/newsroom/guardian2.png',
    url: 'https://www.theguardian.com/business/ng-interactive/2022/nov/05/how-qatar-bought-up-britain',
    source: 'The Guardian',
    title: 'How Qatar bought up Britain',
    date: '2022',
  },
  {
    id: 'guardian-sportswashing',
    src: '/images/newsroom/guardian12.png',
    url: 'https://www.theguardian.com/world/2021/mar/28/saudi-arabia-has-spent-at-least-15bn-on-sportswashing-report-reveals',
    source: 'The Guardian',
    title: "Saudi Arabia has spent at least $1.5bn on 'sportswashing', report reveals",
    date: '2021',
  },
  {
    id: 'guardian-worldcup-howmany',
    src: '/images/newsroom/guardian5.png',
    url: 'https://www.theguardian.com/football/2022/nov/27/qatar-deaths-how-many-migrant-workers-died-world-cup-number-toll',
    source: 'The Guardian',
    title: 'How many migrant workers have died in Qatar? The human cost of the 2022 World Cup',
    date: '2022',
  },
  {
    id: 'guardian-6500-deaths',
    src: '/images/newsroom/guardian6.png',
    url: 'https://www.theguardian.com/global-development/2021/feb/23/revealed-migrant-worker-deaths-qatar-fifa-world-cup-2022',
    source: 'The Guardian',
    title: 'Revealed: 6,500 migrant workers have died in Qatar since World Cup awarded',
    date: '2021',
  },
  {
    id: 'guardian-qatari-women',
    src: '/images/newsroom/guardian7.png',
    url: 'https://www.theguardian.com/global-development/2021/mar/29/were-treated-as-children-qatari-women-tell-rights-group',
    source: 'The Guardian',
    title: "'We're treated as children': Qatari women tell rights group",
    date: '2021',
  },
  {
    id: 'guardian-kenyan-mothers',
    src: '/images/newsroom/guardian8.png',
    url: 'https://www.theguardian.com/global-development/2024/dec/18/kenyan-single-mothers-trapped-in-saudi-arabia-as-exit-visas-denied-to-children-born-outside-marriage',
    source: 'The Guardian',
    title: "Kenyan single mothers 'trapped' in Saudi Arabia as exit visas denied to children born outside marriage",
    date: '2024',
  },
  {
    id: 'guardian-executions',
    src: '/images/newsroom/guardian9.png',
    url: 'https://www.theguardian.com/global-development/2025/jul/08/saudi-arabia-capital-punishment-executions-foreigners-drug-offences-crime-600-people-amnesty-international',
    source: 'The Guardian',
    title: "Saudi Arabia executing 'horrifying' number of foreigners for drug crimes",
    date: '2025',
  },
  {
    id: 'guardian-women-trial',
    src: '/images/newsroom/guardian10.png',
    url: 'https://www.theguardian.com/world/2019/mar/13/saudi-womens-rights-activists-go-on-trial-in-riyadh',
    source: 'The Guardian',
    title: "Saudi women's rights activists go on trial in Riyadh",
    date: '2019',
  },
  {
    id: 'guardian-rebranding',
    src: '/images/newsroom/guardian3.png',
    url: 'https://www.theguardian.com/commentisfree/2024/apr/16/saudi-arabia-moderate-country-travel-ban-crime-womens-rights',
    source: 'The Guardian',
    title: 'Saudi Arabia is rebranding itself as a moderate country — just ask our female activists',
    date: '2024',
  },
  {
    id: 'guardian-qatar-mediator',
    src: '/images/newsroom/guardian13.png',
    url: 'https://www.theguardian.com/world/2023/nov/21/why-is-qatar-often-a-mediator-and-what-is-its-role-in-israel-hamas-war',
    source: 'The Guardian',
    title: 'Why is Qatar often a mediator and what is its role in the Israel-Hamas war?',
    date: '2023',
  },
  {
    id: 'guardian-qatar-crossfire',
    src: '/images/newsroom/guardian14.png',
    url: 'https://www.theguardian.com/world/2025/jun/24/qatar-middle-east-peace-broker-iran-israel-us',
    source: 'The Guardian',
    title: 'Caught in the crossfire, Qatar again finds itself Middle East peace broker',
    date: '2025',
  },
  {
    id: 'guardian-iran-us-talks',
    src: '/images/newsroom/guardian15.png',
    url: 'https://www.theguardian.com/world/2025/may/11/iran-and-us-talks-upbeat-despite-disagreement-over-uranium-enrichment',
    source: 'The Guardian',
    title: 'Iran and US talks upbeat despite disagreement over uranium enrichment',
    date: '2025',
  },
  {
    id: 'guardian-iran-uae-uranium',
    src: '/images/newsroom/guardian16.png',
    url: 'https://www.theguardian.com/world/2025/may/13/iran-proposes-partnership-with-uae-and-saudi-arabia-to-enrich-uranium',
    source: 'The Guardian',
    title: 'Iran proposes partnership with UAE and Saudi Arabia to enrich uranium',
    date: '2025',
  },
  {
    id: 'guardian-climate-blocker',
    src: '/images/newsroom/guardian17.png',
    url: 'https://www.theguardian.com/world/2025/nov/15/170000-a-minute-why-saudi-arabia-is-the-biggest-blocker-of-climate-action',
    source: 'The Guardian',
    title: '$170,000 a minute: why Saudi Arabia is the biggest blocker of climate action',
    date: '2025',
  },
  {
    id: 'intern-yemen',
    src: '/images/newsroom/Internazionale3.png',
    url: 'https://www.internazionale.it/ultime-notizie/2026/01/07/arabia-saudita-bombarda-sud-yemen',
    source: 'Internazionale',
    title: 'Riyadh bombarda il sud dello Yemen, il capo dei separatisti accusato di tradimento',
    date: '2026',
  },
  {
    id: 'guardian-uae-yemen-flee',
    src: '/images/newsroom/guardian18.png',
    url: 'https://www.theguardian.com/world/2026/jan/08/saudi-arabia-accuses-uae-of-helping-yemeni-separatist-leader-flee',
    source: 'The Guardian',
    title: 'Saudi Arabia says UAE helped Yemeni separatist leader flee as crisis deepens',
    date: '2026',
  },
  {
    id: 'lemonde-rivalry',
    src: '/images/newsroom/lemonde.png',
    url: 'https://www.lemonde.fr/idees/article/2026/01/29/la-nouvelle-rivalite-entre-l-arabie-saoudite-et-les-emirats-arabes-unis-source-de-tension-de-la-mer-rouge-a-la-corne-de-l-afrique_6664576_3232.html',
    source: 'Le Monde',
    title: "La nouvelle rivalité entre l'Arabie saoudite et les Émirats arabes unis",
    date: '2026',
  },
  {
    id: 'lemonde-yemen-arms',
    src: '/images/newsroom/lemonde2.png',
    url: 'https://www.lemonde.fr/international/article/2025/12/30/l-arabie-saoudite-a-mene-des-frappes-au-yemen-pour-detruire-des-livraisons-d-armes-destinees-aux-separatistes_6659801_3210.html',
    source: 'Le Monde',
    title: 'Yémen : les Émirats arabes unis démentent avoir livré des armes aux séparatistes',
    date: '2025',
  },
  {
    id: 'guardian-rift-editorial',
    src: '/images/newsroom/guardian4.png',
    url: 'https://www.theguardian.com/commentisfree/2026/feb/05/the-guardian-view-on-saudi-arabia-and-the-uae-as-former-allies-clash-others-are-likely-to-pay',
    source: 'The Guardian',
    title: 'The Guardian view on Saudi Arabia and the UAE: as former allies clash, others are likely to pay',
    date: '2026',
  },
];
