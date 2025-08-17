export const themes = [
  {
    id: 'space',
    name: 'Weltraum',
    description: 'Fantastische Weltraum-Abenteuer',
    thumbnail: '/assets/themes/space-thumb.jpg',
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 'underwater',
    name: 'Unterwasser',
    description: 'Magische Unterwasserwelten',
    thumbnail: '/assets/themes/underwater-thumb.jpg',
    color: 'from-blue-600 to-teal-600'
  },
  {
    id: 'animals',
    name: 'Tiere',
    description: 'Wilde Abenteuer mit Tieren',
    thumbnail: '/assets/themes/animals-thumb.jpg',
    color: 'from-green-600 to-yellow-600'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Märchenhafte Fantasiewelten',
    thumbnail: '/assets/themes/fantasy-thumb.jpg',
    color: 'from-pink-600 to-purple-600'
  },
  {
    id: 'surprise',
    name: 'Überraschung',
    description: 'Lass dich überraschen!',
    thumbnail: '/assets/themes/surprise-thumb.jpg',
    color: 'from-orange-600 to-red-600'
  }
];

export const services = [
  {
    id: 'retusche',
    name: 'Professionelle Retusche',
    description: 'Perfekte Hautretusche und Bildoptimierung',
    icon: 'retusche-icon.svg',
    features: ['Hautretusche', 'Farbkorrektur', 'Beleuchtungsoptimierung']
  },
  {
    id: 'compositing',
    name: 'Kreatives Compositing',
    description: 'Nahtlose Integration in neue Welten',
    icon: 'compositing-icon.svg',
    features: ['Hintergrundersetzung', 'Objektintegration', 'Lichtanpassung']
  },
  {
    id: 'ki-magie',
    name: 'KI-Magie',
    description: 'Modernste KI-Technologie für magische Effekte',
    icon: 'ki-magie-icon.svg',
    features: ['Style Transfer', 'Objektgenerierung', 'Intelligente Erweiterungen']
  },
  {
    id: 'upscaling',
    name: 'Upscaling',
    description: 'Verlustfreie Vergrößerung für beste Qualität',
    icon: 'upscaling-icon.svg',
    features: ['KI-Upscaling', 'Detailerhaltung', 'Qualitätssteigerung']
  }
];

export const galleryImages = [
  {
    id: 1,
    src: '/assets/img/pic1.jpg',
    alt: 'Weltraum Abenteuer',
    category: 'space',
    title: 'Kleine Astronautin',
    description: 'Eine magische Reise zu fernen Galaxien und Planeten',
    transformation: 'Weltraum Compositing'
  },
  {
    id: 2,
    src: '/assets/img/before.jpg',
    alt: 'Dschungel Expedition - Vorher',
    category: 'animals',
    title: 'Dschungel Abenteuer',
    description: 'Auf Safari mit wilden Tieren im Dschungel',
    transformation: 'Natur Integration'
  },
  {
    id: 3,
    src: '/assets/img/after.jpg',
    alt: 'Dschungel Expedition - Nachher',
    category: 'animals',
    title: 'Wilde Freundschaften',
    description: 'Magische Begegnungen mit Dschungeltieren',
    transformation: 'Tier Compositing'
  },
  {
    id: 4,
    src: '/assets/transforms/1.png',
    alt: 'Unterwasser Märchen',
    category: 'underwater',
    title: 'Kleine Meerjungfrau',
    description: 'Tauchen Sie ein in eine verzauberte Unterwasserwelt',
    transformation: 'Aqua Fantasy'
  },
  {
    id: 5,
    src: '/assets/transforms/2.png',
    alt: 'Fantasy Prinzessin',
    category: 'fantasy',
    title: 'Märchen Prinzessin',
    description: 'In einem Schloss voller Magie und Wunder',
    transformation: 'Märchen Styling'
  },
  {
    id: 6,
    src: '/assets/transforms/3.png',
    alt: 'Weltraum Entdecker',
    category: 'space',
    title: 'Galaktischer Entdecker',
    description: 'Auf Entdeckungsreise durch das Universum',
    transformation: 'Sci-Fi Compositing'
  },
  {
    id: 7,
    src: '/assets/transforms/4.png',
    alt: 'Magischer Garten',
    category: 'fantasy',
    title: 'Verzauberter Garten',
    description: 'Wo Blumen sprechen und Schmetterlinge tanzen',
    transformation: 'Natur Magie'
  },
  {
    id: 8,
    src: '/assets/transforms/5.png',
    alt: 'Überraschungs Transformation',
    category: 'surprise',
    title: 'Magische Überraschung',
    description: 'Lassen Sie sich von unserer Kreativität überraschen',
    transformation: 'Creative Mix'
  },
  {
    id: 9,
    src: '/assets/transforms/6.png',
    alt: 'Unterwasser Abenteuer',
    category: 'underwater',
    title: 'Ozean Abenteuer',
    description: 'Schwimmen mit Delfinen und tropischen Fischen',
    transformation: 'Marine Life'
  },
  {
    id: 10,
    src: '/assets/transforms/7.png',
    alt: 'Tier Freundschaft',
    category: 'animals',
    title: 'Beste Freunde',
    description: 'Herzliche Freundschaften mit liebevollen Tieren',
    transformation: 'Animal Bond'
  },
  {
    id: 11,
    src: '/assets/img/randombebe.jpg',
    alt: 'Süße Überraschung',
    category: 'surprise',
    title: 'Kleine Entdeckerin',
    description: 'Jede Transformation ist einzigartig und besonders',
    transformation: 'Portrait Enhancement'
  },
  {
    id: 12,
    src: '/assets/img/klem 1.jpg',
    alt: 'Fantasie Portrait',
    category: 'fantasy',
    title: 'Märchen Portrait',
    description: 'Klassische Portraitkunst mit magischen Elementen',
    transformation: 'Portrait Art'
  }
];

export const comparisons = [
  {
    id: 1,
    before: '/assets/transforms/original.jpg',
    after: '/assets/transforms/enhanced.jpg',
    title: 'Magische Transformation',
    description: 'Von normalem Foto zu fantastischem Kunstwerk'
  },
  {
    id: 2,
    before: '/assets/img/before.jpg',
    after: '/assets/img/after.jpg',
    title: 'Weltraum-Abenteuer',
    description: 'Entdecke ferne Galaxien und Planeten'
  }
];

export const faqData = [
  {
    id: 1,
    question: 'Wie lange dauert die Bearbeitung?',
    answer: 'Die Bearbeitung dauert in der Regel 3-7 Werktage, abhängig von der Komplexität des gewünschten Effekts.'
  },
  {
    id: 2,
    question: 'Welche Dateiformate werden unterstützt?',
    answer: 'Wir akzeptieren JPEG, PNG, TIFF und RAW-Dateien. Die fertigen Bilder erhalten Sie in hoher Auflösung als JPEG oder PNG.'
  },
  {
    id: 3,
    question: 'Kann ich Änderungswünsche äußern?',
    answer: 'Ja, gerne! Wir bieten bis zu 3 kostenlose Korrekturschleifen, um sicherzustellen, dass das Ergebnis Ihren Vorstellungen entspricht.'
  },
  {
    id: 4,
    question: 'Sind die Bilder für den Druck geeignet?',
    answer: 'Absolut! Alle bearbeiteten Bilder werden in hoher Auflösung (300 DPI) geliefert und sind perfekt für den professionellen Druck geeignet.'
  }
];