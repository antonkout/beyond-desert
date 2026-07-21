// Biographies of the three Omani photographers whose work appears in the
// exhibition. English and Italian are the versions supplied by the authors;
// the Arabic is a translation of the English.

export type Photographer = {
  id: string;
  name: string;
  instagram?: string;
  bio: string[];
};

export const PHOTOGRAPHERS_EN: Photographer[] = [
  {
    id: 'fahad-al-kindi',
    name: 'Fahad Al Kindi',
    instagram: 'f_kindi',
    bio: [
      'Fahad Al Kindi is an Omani photographer whose work explores the relationship between people, place, and the passage of time. Working primarily through long-term observational projects, he is drawn to the quiet details of everyday life — moments that often pass unnoticed but reveal deeper stories about belonging, memory, and social change. His photographs examine a society in continual dialogue with its past and present, documenting the spaces where tradition and modernity meet.',
      'Influenced by art, cinema, documentary photography and personal observation, Fahad’s images invite viewers to look beyond familiar representations of Oman and engage with the lives lived within its landscapes. His practice is guided by a belief that photography can preserve not only appearances, but also fleeting moments of human experience that might otherwise be forgotten.',
      'Al Kindi’s works have been exhibited as part of group exhibitions at the Royal Opera House in Muscat, the Photographic Society of Oman and the Bait al Zubair Museum, as well as in a private exhibition in London. Fahad Al Kindi is also the first Arab photographer whose work has been featured in Kwartalnik Fotografia magazine (Poland).',
      'Fahad lives and works in Muscat, Oman.',
    ],
  },
  {
    id: 'mo-bader',
    name: 'Mohammed Badr',
    instagram: 'Mo_Bader',
    bio: [
      'An Omani photographer from the coastal city of Sur, where growing up around the sea naturally shaped the way he sees and documents the world. His work explores people, place, and the quiet moments that often go unnoticed. Living abroad gave him a deeper appreciation for his culture and surroundings, inspiring him to document the beauty of everyday life in Oman and share it with audiences beyond its borders.',
      'The Waves of Us is an ongoing series that explores the relationship between people and the sea. Inspired by the coastline of Oman and the places he grew up around, the project documents the many ways people connect with the water — whether through life, reflection, play, or simply spending time by the shore. The sea becomes more than a backdrop; it becomes a space where memories are made and personal stories unfold. Through these photographs, the series reflects on connection, belonging, and the lasting presence of the sea in everyday life.',
    ],
  },
  {
    id: 'adam-al-ghafry',
    name: 'Adam Al Ghafry',
    instagram: 'adamalghafry',
    bio: [
      'Adam Al Ghafry is an Omani photographer based in Salalah, Dhofar. Influenced by his studies in philosophy, religion and psychology, his work captures the relationship between people’s inner experiences and the worlds in which they inhabit. This is driven by the idea that our beliefs and cultures shape the world around us, as much as our environments and material realities shape our inner world. He believes that documentary photography is a medium that can shed light on these facets of the human condition.',
      'Adam’s interests naturally drew him to Dhofar, where people’s ways of life are intertwined with a deep connection to the land, as they continue to adapt in the face of rapid change. His upcoming projects seek to explore the ways in which emerging technologies and industries influence the region, and how the people influence these developments in turn.',
    ],
  },
];

export const PHOTOGRAPHERS_IT: Photographer[] = [
  {
    id: 'fahad-al-kindi',
    name: 'Fahad Al Kindi',
    instagram: 'f_kindi',
    bio: [
      'Fahad Al Kindi è un fotografo omanita il cui lavoro esplora la relazione tra persone, luoghi e il trascorrere del tempo. Lavorando soprattutto attraverso progetti di lunga durata, è particolarmente attratto dai tranquilli dettagli della vita quotidiana – momenti che spesso passano inosservati ma che rivelano storie più profonde su appartenenze, memoria e cambiamenti sociali. Le sue fotografie esaminano una società in dialogo continuo col proprio passato e presente, documentando gli spazi dove la tradizione e la modernità si incontrano.',
      'Influenzato da arte, cinema, fotografia documentaristica e personale osservazione, le immagini di Fahad invitano lo spettatore a guardare oltre le rappresentazioni familiari dell’Oman e a cimentarsi con le vite vissute entro i suoi paesaggi. La sua pratica è guidata dalla convinzione che la fotografia possa preservare non solo le apparenze, ma anche i fugaci momenti di esperienza umana che altrimenti verrebbero dimenticati.',
      'Il lavoro di Al Kindi è stato esposto come parte di una mostra collettiva alla Royal Opera House a Muscat, alla Photographic Society of Oman e al Museo Bait al Zubair, oltre che essere parte di una mostra privata a Londra. Fahad Al Kindi è anche il primo fotografo arabo le cui opere sono state pubblicate sulla rivista Kwartalnik Fotografia (Polonia).',
      'Fahad vive e lavora a Muscat, in Oman.',
    ],
  },
  {
    id: 'mo-bader',
    name: 'Mohammed Badr',
    instagram: 'Mo_Bader',
    bio: [
      'Mohammed Badr è un fotografo omanita originario della città costiera di Sur, dove crescere a contatto con il mare ha plasmato in modo naturale il suo modo di vedere e documentare il mondo. Il suo lavoro esplora le persone, i luoghi e i momenti di quiete che spesso passano inosservati. Vivere all’estero gli ha permesso di apprezzare ancor più profondamente la sua cultura, ispirandolo a documentare la bellezza della vita quotidiana in Oman e a condividerla con pubblici oltre confine.',
      '“The Waves of Us” è una serie in continua evoluzione che esplora il rapporto tra le persone e il mare. Ispirato alla costa dell’Oman e ai luoghi in cui è cresciuto, il progetto documenta i molteplici modi in cui le persone si connettono con l’acqua, sia attraverso la vita quotidiana, la riflessione, il gioco o semplicemente trascorrendo del tempo in riva al mare. Il mare diventa più di un semplice sfondo; diventa uno spazio in cui nascono ricordi e si svelano storie personali. Attraverso queste fotografie, la serie riflette sulla connessione, sull’appartenenza e sulla presenza costante del mare nella vita di tutti i giorni.',
    ],
  },
  {
    id: 'adam-al-ghafry',
    name: 'Adam Al Ghafry',
    instagram: 'adamalghafry',
    bio: [
      'Adam Al Ghafry è un fotografo omanita residente a Salalah, nel Dhofar. Influenzato dai suoi studi di filosofia, religione e psicologia, il suo lavoro cattura la relazione tra le esperienze interiori delle persone e il mondo in cui vivono. È animato dalla convinzione che le nostre credenze e culture plasmino il mondo che ci circonda, tanto quanto l’ambiente e la realtà materiale plasmano il nostro mondo interiore. Crede che la fotografia documentaristica sia un mezzo in grado di far luce su queste sfaccettature della condizione umana.',
      'Gli interessi di Adam lo hanno naturalmente condotto nel Dhofar, dove gli stili di vita delle persone sono intrecciati con un profondo legame con la terra, mentre continuano ad adattarsi di fronte ai rapidi cambiamenti. I suoi prossimi progetti mirano a esplorare i modi in cui le tecnologie e le industrie emergenti influenzano la regione e come, a loro volta, le persone influenzano questi sviluppi.',
    ],
  },
];

export const PHOTOGRAPHERS_AR: Photographer[] = [
  {
    id: 'fahad-al-kindi',
    name: 'فهد الكندي',
    instagram: 'f_kindi',
    bio: [
      'فهد الكندي مصوّر عُماني يستكشف عمله العلاقة بين الناس والمكان ومرور الزمن. يعمل أساسًا من خلال مشاريع رصدية طويلة الأمد، وتستهويه التفاصيل الهادئة في الحياة اليومية — تلك اللحظات التي كثيرًا ما تمرّ دون أن يلاحظها أحد، لكنها تكشف حكايات أعمق عن الانتماء والذاكرة والتحوّل الاجتماعي. تتفحّص صوره مجتمعًا في حوار متواصل مع ماضيه وحاضره، موثّقًا المساحات التي يلتقي فيها الموروث بالحداثة.',
      'وبتأثير من الفن والسينما والتصوير الوثائقي والملاحظة الشخصية، تدعو صور فهد المشاهدين إلى النظر إلى ما وراء الصور المألوفة عن عُمان، والتفاعل مع الحيوات التي تُعاش داخل مشاهدها الطبيعية. وتقوم ممارسته على قناعة بأن التصوير قادر على أن يحفظ لا المظاهر وحدها، بل أيضًا لحظات التجربة الإنسانية العابرة التي قد تُنسى لولا ذلك.',
      'عُرضت أعمال الكندي ضمن معارض جماعية في دار الأوبرا السلطانية بمسقط، والجمعية العُمانية للتصوير الضوئي، ومتحف بيت الزبير، إضافة إلى معرض خاص في لندن. كما يُعدّ فهد الكندي أول مصوّر عربي تُنشر أعماله في مجلة Kwartalnik Fotografia (بولندا).',
      'يعيش فهد ويعمل في مسقط، سلطنة عُمان.',
    ],
  },
  {
    id: 'mo-bader',
    name: 'محمد بدر',
    instagram: 'Mo_Bader',
    bio: [
      'مصوّر عُماني من مدينة صور الساحلية، حيث شكّل النشوء قرب البحر، على نحو تلقائي، طريقته في رؤية العالم وتوثيقه. يستكشف عمله الناس والمكان واللحظات الهادئة التي كثيرًا ما تمرّ دون انتباه. وقد منحه العيش في الخارج تقديرًا أعمق لثقافته ومحيطه، وألهمه توثيق جمال الحياة اليومية في عُمان ومشاركتها مع جمهور خارج حدودها.',
      '«The Waves of Us» سلسلة مستمرة تستكشف العلاقة بين الناس والبحر. مستوحى من ساحل عُمان ومن الأماكن التي نشأ حولها، يوثّق المشروع الطرق العديدة التي يتّصل بها الناس بالماء — سواء عبر الحياة أو التأمل أو اللعب أو مجرّد قضاء الوقت على الشاطئ. ويغدو البحر أكثر من مجرّد خلفية؛ إذ يصير فضاءً تُصنع فيه الذكريات وتتكشّف فيه الحكايات الشخصية. ومن خلال هذه الصور، تتأمّل السلسلة في الاتصال والانتماء وحضور البحر الدائم في الحياة اليومية.',
    ],
  },
  {
    id: 'adam-al-ghafry',
    name: 'آدم الغافري',
    instagram: 'adamalghafry',
    bio: [
      'آدم الغافري مصوّر عُماني مقيم في صلالة بمحافظة ظفار. وبتأثير من دراسته للفلسفة والدين وعلم النفس، يلتقط عمله العلاقة بين التجارب الداخلية للناس والعوالم التي يعيشون فيها. ويدفعه إلى ذلك اعتقاد بأن معتقداتنا وثقافاتنا تشكّل العالم من حولنا، بقدر ما تشكّل بيئاتنا ووقائعنا المادية عالمنا الداخلي. وهو يرى في التصوير الوثائقي وسيطًا قادرًا على إلقاء الضوء على هذه الأوجه من الحالة الإنسانية.',
      'قادت اهتمامات آدم إلى ظفار بشكل طبيعي، حيث تتشابك أنماط حياة الناس مع صلة عميقة بالأرض، فيما يواصلون التكيّف في مواجهة تغيّر متسارع. وتسعى مشاريعه القادمة إلى استكشاف الطرق التي تؤثّر بها التقنيات والصناعات الناشئة في المنطقة، وكيف يؤثّر الناس بدورهم في هذه التحوّلات.',
    ],
  },
];

export function getPhotographers(locale: string): Photographer[] {
  if (locale === 'it') return PHOTOGRAPHERS_IT;
  if (locale === 'ar') return PHOTOGRAPHERS_AR;
  return PHOTOGRAPHERS_EN;
}
