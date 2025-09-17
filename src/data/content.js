// src/data/content.js

export const themes = [
  {
    id: "space",
    name: "Weltraum",
    description: "Fantastische Weltraum-Abenteuer",
    thumbnail: "/assets/themes/space-thumb.jpg",
    color: "from-purple-600 to-blue-600",
  },
  {
    id: "underwater",
    name: "Unterwasser",
    description: "Magische Unterwasserwelten",
    thumbnail: "/assets/themes/underwater-thumb.jpg",
    color: "from-blue-600 to-teal-600",
  },
  {
    id: "animals",
    name: "Tiere",
    description: "Wilde Abenteuer mit Tieren",
    thumbnail: "/assets/themes/animals-thumb.jpg",
    color: "from-green-600 to-yellow-600",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Märchenhafte Fantasiewelten",
    thumbnail: "/assets/themes/fantasy-thumb.jpg",
    color: "from-pink-600 to-purple-600",
  },
  {
    id: "surprise",
    name: "Überraschung",
    description: "Lass dich überraschen!",
    thumbnail: "/assets/themes/surprise-thumb.jpg",
    color: "from-orange-600 to-red-600",
  },
];

export const services = [
  {
    id: "retusche",
    name: "Professionelle Retusche",
    description: "Perfekte Hautretusche und Bildoptimierung",
    icon: "retusche-icon.svg",
    features: ["Hautretusche", "Farbkorrektur", "Beleuchtungsoptimierung"],
  },
  {
    id: "compositing",
    name: "Kreatives Compositing",
    description: "Nahtlose Integration in neue Welten",
    icon: "compositing-icon.svg",
    features: ["Hintergrundersetzung", "Objektintegration", "Lichtanpassung"],
  },
  {
    id: "ki-magie",
    name: "KI-Magie",
    description: "Modernste KI-Technologie für magische Effekte",
    icon: "ki-magie-icon.svg",
    features: [
      "Style Transfer",
      "Objektgenerierung",
      "Intelligente Erweiterungen",
    ],
  },
  {
    id: "upscaling",
    name: "Upscaling",
    description: "Verlustfreie Vergrößerung für beste Qualität",
    icon: "upscaling-icon.svg",
    features: ["KI-Upscaling", "Detailerhaltung", "Qualitätssteigerung"],
  },
];

// src/data/content.js

export const galleryImages = [
  {
    id: 1,
    src: "/assets/img/randombebe after.webp",
    alt: "Baby in einem futuristischen Anzug schwebt im Himmel, umgeben von Tieren auf Wolken",
    category: "space",
    title: "Himmelsstürmer",
    description:
      "Ein kleiner Abenteurer schwebt durch einen strahlend blauen Himmel, umgeben von flauschigen Wolken und tierischen Freunden.",
    transformation: "Himmels-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein fröhliches und fantasievolles Bild, das die Freude und Neugier ihres Babys in einer farbenfrohen Traumwelt darstellt.",
    ourProcess:
      "Basierend auf dem Foto des Babys haben wir eine lebendige Himmelslandschaft digital erschaffen. Ein speziell entworfener, retro-futuristischer Anzug wurde dem Baby angezogen.",
    className: "row-span-2", // Layout-Klasse
  },
  {
    id: 2,
    src: "/assets/img/TIGER after.webp",
    alt: "Ein Kind sitzt im Dschungel vor einem riesigen, beschützenden Tiger",
    category: "animals",
    title: "Beschützer des Dschungels",
    description:
      "Eine magische Begegnung, bei der ein kleiner Abenteurer den majestätischen König des Dschungels trifft.",
    transformation: "Tier-Compositing & Lichtstimmung",
    customerWish:
      "Die Eltern wünschten sich ein kraftvolles, fantasievolles Bild, das den mutigen und abenteuerlustigen Geist ihres Kindes widerspiegelt.",
    ourProcess:
      "Wir haben eine ruhige, sitzende Pose des Kindes gewählt, um eine Szene von friedlicher Stärke zu schaffen. Der Tiger wurde sorgfältig dahinter platziert, um als majestätischer Beschützer zu wirken.",
    className: "", // Standardgröße
  },
  {
    id: 3,
    src: "/assets/img/ele after.webp",
    alt: "Ein Kind mit Hut reitet auf dem Rücken eines großen Elefanten in der Savanne",
    category: "animals",
    title: "Safari Abenteuer",
    description:
      "Ein kleiner Entdecker erlebt das Abenteuer seines Lebens auf dem Rücken eines sanften Elefanten.",
    transformation: "Safari-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein Bild, das die Liebe ihres Kindes zu großen Tieren und seinen Entdeckergeist in einer realistischen Safari-Umgebung festhält.",
    ourProcess:
      "Wir haben das Kind nahtlos auf den Rücken des Elefanten montiert und dabei besonders auf realistische Schatten und Lichtverhältnisse geachtet, um eine glaubwürdige und herzerwärmende Szene zu schaffen.",
    className: "col-span-2", // Layout-Klasse
  },
  {
    id: 4,
    src: "/assets/img/bebe after.webp",
    alt: "Baby mit pinken Feenflügeln in einer zauberhaften Märchenlandschaft mit Schlössern",
    category: "fantasy",
    title: "Kleine Waldfee",
    description:
      "Ein bezauberndes Portrait, das ein Baby als kleine Fee in einem lebendigen Märchenland zeigt.",
    transformation: "Fantasy-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein süßes und magisches Bild, das ihr Baby in eine kleine Fee verwandelt, umgeben von einer farbenfrohen, traumhaften Welt.",
    ourProcess:
      "Wir haben eine lebendige Märchenszene mit saftig grünen Wiesen und fernen Schlössern erschaffen. Das Baby wurde sorgfältig integriert und mit individuell gefärbten Feenflügeln versehen.",
    className: "", // Standardgröße
  },
  {
    id: 5,
    src: "/assets/img/Halid after.webp",
    alt: "Baby im Astronautenanzug schwebt auf einer Wolke, umgeben von Tieren in einem bunten Himmel",
    category: "space",
    title: "Kleiner Astronaut",
    description:
      "Ein fantasievoller Traumflug, bei dem ein kleiner Astronaut durch einen Himmel voller freundlicher Tiere und Spielzeuge reist.",
    transformation: "Himmels-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein verspieltes und fantasievolles Bild, das die Faszination für den Weltraum mit einer weichen, traumhaften Welt voller süßer Tiere verbindet.",
    ourProcess:
      "Für dieses komplexe Composing haben wir einen lebendigen, mehrschichtigen Himmelshintergrund geschaffen. Das Kind wurde auf einer zentralen Wolke platziert und mit einem realistischen Astronautenanzug ausgestattet.",
    className: "", // Standardgröße
  },
  {
    id: 6,
    src: "/assets/img/after.webp",
    alt: "Neugeborenes Baby, eingewickelt in eine Decke, schläft auf einem Bett aus Blütenblättern",
    category: "fantasy",
    title: "Blütentraum",
    description:
      "Ein friedliches und zartes Portrait eines Neugeborenen, das sanft auf einem Teppich aus Kirschblüten gebettet ist.",
    transformation: "Florales Compositing",
    customerWish:
      "Die Eltern wünschten sich ein sehr sanftes und natürliches Kunstwerk für ihr Neugeborenes, das das neue Leben und die Schönheit des Frühlings symbolisiert.",
    ourProcess:
      "Wir haben eine weiche, verträumte Atmosphäre geschaffen, indem wir ein Bett aus tausenden einzelnen Blütenblättern komponiert haben. Das Baby wurde behutsam in der Mitte platziert.",
    className: "row-span-2", // Layout-Klasse
  },
  {
    id: 7,
    src: "/assets/img/after1.webp",
    alt: "Kind in einem Holzflugzeug mit Fliegermütze auf einem Flugfeld bei Nacht",
    category: "fantasy",
    title: "Der kleine Pilot",
    description:
      "Ein kleiner Pilot macht es sich in seinem Flugzeug gemütlich und träumt von großen Abenteuern am Nachthimmel.",
    transformation: "Fahrzeug-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein verträumtes, aber abenteuerliches Bild, das die Faszination ihres Kindes für Flugzeuge inklusive des Kindes einfängt.",
    ourProcess:
      "Uns wurde das Bild des Kindes in einem hölzernen Spielzeugflugzeug zur Verfügung gestellt. Welches wird digital auf ein nächtliches Flugfeld versetzt haben.",
    className: "", // Standardgröße
  },
  {
    id: 8,
    src: "/assets/img/after5.webp",
    alt: "Neugeborenes Baby in einem Nest, umgeben von großen rosa und weißen Blumen",
    category: "fantasy",
    title: "Geborgen im Blütennest",
    description:
      "Ein neugeborenes Baby schläft friedlich und geborgen in einem weichen Nest aus natürlichen Fasern, umgeben von prachtvollen Blüten.",
    transformation: "Florales Neugeborenen-Styling",
    customerWish:
      "Die Eltern wünschten sich ein warmes, natürliches und ästhetisches Portrait ihres Neugeborenen, das Geborgenheit und die Schönheit der Natur ausstrahlt.",
    ourProcess:
      "Auf Basis des Originalfotos haben wir digital ein weiches, natürliches Nest als Basis erschaffen. Das Baby wurde anschließend behutsam in diese Komposition integriert.",
    className: "col-span-2", // Layout-Klasse
  },
  {
    id: 9,
    src: "/assets/img/after2.webp",
    alt: "Baby in einem Bärenkostüm schläft in einem Bett, umgeben von Dutzenden von Teddybären",
    category: "animals",
    title: "Traumland der Teddys",
    description:
      "Ein unglaublich niedliches Portrait, bei dem ein Baby in einem flauschigen Bärenkostüm inmitten seiner kuscheligen Teddy-Freunde schlummert.",
    transformation: "Kuscheltier-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein besonders süßes und gemütliches Bild, das die Unschuld ihres Babys im Kreise von klassischen Teddybären zeigt.",
    ourProcess:
      "Basierend auf dem Originalfoto des Babys wurde eine liebevolle Szene erschaffen. Dutzende von verschiedenen Teddybären wurden einzeln arrangiert und komponiert.",
    className: "", // Standardgröße
  },
  {
    id: 10,
    src: "/assets/img/motorrad_after.webp", // Platzhalter für den neuen Dateinamen
    alt: "Kind in Lederjacke fährt auf einem Spielzeugmotorrad über eine Rennstrecke",
    category: "fantasy",
    title: "Der kleine Rennfahrer",
    description:
      "Ein kleiner Champion auf seinem Motorrad erobert die Rennstrecke, umgeben von Konfetti und jubelnden Zuschauern.",
    transformation: "Rennstrecken-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein cooles und actionreiches Bild, das die energiegeladene Persönlichkeit ihres Kindes als kleiner Rennfahrer zeigt.",
    ourProcess:
      "Wir haben das Kind in eine professionelle Rennstrecken-Szene versetzt. Dynamische Elemente wie Bewegungsunschärfe, Konfetti und Zuschauermengen wurden hinzugefügt, um die Atmosphäre eines echten Rennens zu erzeugen.",
    className: "", // Standardgröße
  },
  {
    id: 11,
    src: "/assets/img/superbebek_after.webp", // Platzhalter für den neuen Dateinamen
    alt: "Kind als Superheld mit Schild und Umhang schwebt über einer dramatischen Stadtlandschaft",
    category: "fantasy",
    title: "Kleiner Superheld",
    description:
      "Ein episches Portrait, das ein Kind als mächtigen Superhelden zeigt, der schützend über einer Metropole schwebt.",
    transformation: "Superhelden-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein actiongeladenes und kinoreifes Bild, das die Stärke und den Heldenmut ihres Kindes auf epische Weise darstellt.",
    ourProcess:
      "Für diese komplexe Komposition haben wir das Kind in einen Superhelden-Anzug gekleidet. Die dynamische Stadtlandschaft wurde aus mehreren Architekturelementen erschaffen und mit dramatischen Effekten wie Rauch, Funken und Lichtstrahlen versehen, um eine kinoreife Atmosphäre zu erzeugen.",
    className: "col-span-2 row-span-2", // Layout-Klasse beibehalten
  },
  {
    id: 12,
    src: "/assets/img/klem after.webp",
    alt: "Kind in Kapitänsuniform steht auf einem Schiffsdeck mit einem Papagei auf der Schulter",
    category: "fantasy",
    title: "Kleiner Kapitän",
    description:
      "Ein kleiner Kapitän sticht in See, begleitet von seinem treuen Papagei und verspielten Delfinen, bereit für ein großes Abenteuer.",
    transformation: "Nautisches Compositing",
    customerWish:
      "Die Eltern wünschten sich ein abenteuerliches Portrait, das die Faszination ihres Kindes für Schiffe und das Meer widerspiegelt.",
    ourProcess:
      "Auf Basis der Wünsche haben wir eine komplette Meeres-Szenerie erschaffen. Dem Kind wurde eine Kapitänsuniform hinzugefügt und es wurde auf dem Deck eines Schiffes platziert.",
    className: "col-span-2", // Layout-Klasse
  },
  {
    id: 13,
    src: "/assets/img/dragon_after.webp",
    alt: "Neugeborenes Baby schläft in einem Drachenei, das von einem großen Drachen in einer Höhle bewacht wird",
    category: "fantasy",
    title: "Der Drachenwächter",
    description:
      "Behütet von einem wachsamen Drachen schläft ein Neugeborenes sicher in seinem Ei. Eine mythische Szene, die Magie und Geborgenheit vereint.",
    transformation: "Mythisches Compositing",
    customerWish:
      "Die Eltern, große Fantasy-Liebhaber, wünschten sich ein einzigartiges und episches Portrait, das ihr Neugeborenes in einer mythischen Welt zeigt, beschützt von einer beeindruckenden Kreatur.",
    ourProcess:
      "Wir haben das Foto des schlafenden Babys als Ausgangspunkt genommen und es in ein aufgebrochenes Drachenei platziert. Die gesamte Umgebung, inklusive des detailreichen Drachen, des Nests und der moosbewachsenen Höhle, wurde digital erschaffen und durch eine dramatische Lichtführung zu einer epischen Gesamtkomposition verbunden.",
    className: "col-span-2 row-span-2",
  },
  {
    id: 14,
    src: "/assets/img/superbebe_after.webp",
    alt: "Kind in einem roten Superhelden-Anzug fliegt über einer Stadt bei Sonnenuntergang",
    category: "fantasy",
    title: "Ein Held erhebt sich",
    description:
      "Mit wehendem Umhang und entschlossenem Blick fliegt ein kleiner Held über die Dächer der Stadt, beschützt von der warmen Abendsonne.",
    transformation: "Superhelden-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein ikonisches Superhelden-Portrait für ihr Kind, das Kraft, Hoffnung und das Gefühl vermittelt, über allem zu schweben.",
    ourProcess:
      "Wir haben das Kind in einen maßgeschneiderten Superhelden-Anzug gekleidet und in eine dynamische Flugpose versetzt. Die beeindruckende Stadtlandschaft wurde im Hintergrund komponiert und mit einer realistischen Sonnenuntergangs-Lichtstimmung versehen, um die Szene kinoreif und inspirierend wirken zu lassen.",
    className: "", // Standardgröße
  },
  {
    id: 15,
    src: "/assets/img/safari_after.webp",
    alt: "Kind in Safari-Kleidung reitet auf einem Löwen, umgeben von Tieren in der afrikanischen Savanne",
    category: "animals",
    title: "König der Savanne",
    description:
      "Ein kleiner Entdecker führt majestätisch sein Rudel an und reitet auf dem Rücken eines Löwen durch die weite Savanne bei Sonnenuntergang.",
    transformation: "Safari-Compositing",
    customerWish:
      "Die Eltern wünschten sich ein episches und unvergessliches Bild, das die wilde und abenteuerlustige Seite ihres Kindes in einer atemberaubenden Safari-Kulisse zeigt.",
    ourProcess:
      "Wir haben das Kind in eine komplette Safari-Uniform gekleidet und nahtlos auf den Rücken des Löwen gesetzt. Die gesamte Savannenlandschaft, inklusive der Tiere am Wasserloch und des dramatischen Sonnenuntergangs, wurde digital erschaffen, um eine kinoreife und emotionale Komposition zu erzeugen.",
    className: "row-span-2",
  },
];

export const comparisons = [
  {
    id: 1,
    before: "/assets/img/Halid before.webp",
    after: "/assets/img/Halid after.webp",
    title: "Kleiner Astronaut",
    description:
      "Transformation einer Standardaufnahme in ein episches Landschaftsbild.", // Optional Beschreibung hinzufügen
  },
  {
    id: 2,
    before: "/assets/img/bebe before.webp",
    after: "/assets/img/bebe after.webp",
    title: "Kleine Waldfee",
    description: "Kreative Bearbeitung eines Kinderporträts.", // Optional Beschreibung hinzufügen
  },
  {
    id: 3,
    before: "/assets/img/randombebe before.webp",
    after: "/assets/img/randombebe after.webp",
    title: "Himmelsstürmer",
    description: "Details und Stimmung in der Architektur hervorheben.", // Optional Beschreibung hinzufügen
  },
  {
    id: 4,
    before: "/assets/img/TIGER before.webp",
    after: "/assets/img/TIGER after.webp",
    title: "Beschützer des Dschungels",
    description: "Farbkorrektur und Schärfung bei Tieraufnahmen.", // Optional Beschreibung hinzufügen
  },
  {
    id: 5,
    before: "/assets/img/before1.webp",
    after: "/assets/img/after1.webp",
    title: "Der kleine Pilot ",
    description: "Dynamik und Lichtstimmung verbessern.", // Optional Beschreibung hinzufügen
  },
  {
    id: 6,
    before: "/assets/img/superbebek_before.webp",
    after: "/assets/img/superbebek_after.webp",
    title: "Kleiner Superheld",
    description: "Von blassen Farben zu lebendigen Ergebnissen.", // Optional Beschreibung hinzufügen
  },
];

export const pricingPlans = [
  {
    id: "basic",
    name: "Giraffe",
    price: 29,
    originalPrice: 35,
    duration: "2-3 Tage",
    popular: false,
    description:
      "Perfekt für grundlegendes Compositing und kreative Optimierungen.",
    longDescription:
      "Das Giraffen-Paket ist der ideale Einstieg, um Ihren Fotos den letzten Schliff zu geben. Wir optimieren Farben, Licht und kleine Details und bieten einfaches Compositing, um das Beste aus Ihren Bildern herauszuholen, ohne ihren ursprünglichen Charakter zu verändern.",
    useCases: [
      "Grundlegendes Compositing",
      "Lichtkorrektur & Farbkorrektur",
      "Einfache Hintergrundoptimierung",
      "Basic Objekte werden hinzugefügt",
    ],
    exampleImages: {
      before: "/assets/img/before.webp",
      after: "/assets/img/after.webp",
    },
    features: [
      "Compositing & einfache Effekte",
      "Farbkorrektur & Belichtung",
      "Hintergrund-Optimierung",
      "Hochauflösende Datei (300 DPI)",
      "JPEG & PNG Format",
    ],
    limitations: [
      "Keine Hintergrundersetzung",
      "Keine komplexen Composings",
      "Keine Korrekturschleifen",
    ],
    icon: "palette",
    bgColor: "bg-blue-50",
  },
  {
    id: "creative",
    name: "Zebra",
    price: 59,
    originalPrice: 79,
    duration: "4-6 Tage",
    popular: true,
    description: "Unsere beliebteste Wahl für magische Transformationen.",
    longDescription:
      "Das Zebra-Paket ist unser Bestseller und verwandelt Ihr Foto in eine komplett neue Welt. Wir ersetzen den Hintergrund, fügen kreative Elemente hinzu und erschaffen eine Szene, die die Fantasie Ihres Kindes widerspiegelt – sei es im Weltraum, unter Wasser oder im Märchenland.",
    useCases: [
      "Vollständige Hintergrundersetzung",
      "Integration in Fantasiewelten",
      "Hinzufügen von Tieren oder Objekten",
      "Ideales Geschenk für Geburtstage",
    ],
    exampleImages: {
      before: "/assets/img/TIGER before.webp",
      after: "/assets/img/TIGER after.webp",
    },
    features: [
      "Alles aus Giraffe",
      "Kreative Hintergrundersetzung",
      "Themen-Compositing (Weltraum, Märchen, etc.)",
      "Objekt-Integration & Effekte",
      "Eine Korrekturschleife",
      "Mehrere Ausgabeformate",
      "Social Media Versionen",
      "Express-Option verfügbar",
    ],
    limitations: [],
    icon: "wand",
    bgColor: "bg-purple-50",
  },
  {
    id: "premium",
    name: "Löwe",
    price: 79,
    originalPrice: 129,
    duration: "5-8 Tage",
    popular: false,
    description: "Höchste Qualität für anspruchsvolle Kunstwerke.",
    longDescription:
      "Das Löwen-Paket ist für diejenigen, die ein wahres Meisterwerk wünschen. Wir nutzen fortschrittlichste Techniken, KI-gestützte Verbesserungen und komplexe Multi-Layer-Composings, um ein atemberaubendes Kunstwerk zu schaffen, das für großformatige Drucke geeignet ist.",
    useCases: [
      "Anspruchsvolle Kunstprojekte",
      "Großformatige Drucke (z.B. Leinwand)",
      "Kombination mehrerer Fotos",
      "Uneingeschränkte Korrekturschleifen",
    ],
    exampleImages: {
      before: "/assets/img/Halid before.webp",
      after: "/assets/img/Halid after.webp",
    },
    features: [
      "Alles aus Zebra",
      "KI-unterstützte Verbesserungen",
      "Komplexe Multi-Layer Composings",
      "Individuelle Effekt-Erstellung",
      "Zwei Korrekturschleifen",
      "Druckfertige Ausgabe (A3-A1)",
      "Kommerzielle Lizenz",
    ],
    limitations: [],
    icon: "crown",
    bgColor: "bg-amber-50",
  },
  {
    id: "family",
    name: "Elefant",
    price: 99,
    originalPrice: 229,
    duration: "7-10 Tage",
    popular: false,
    description: "Perfekt für Geschwister und Familienfotos.",
    longDescription:
      "Das Elefanten-Paket ist speziell für Familien konzipiert. Wir bearbeiten 3-5 Ihrer schönsten Bilder im Löwe-Stil und können dabei sogar verschiedene Themen kombinieren oder Geschwister in eine gemeinsame Fantasiewelt integrieren.",
    useCases: [
      "Geschwisterfotos in einem Bild",
      "Eine Serie von 3-5 Bildern",
      "Erstellung eines kleinen digitalen Albums",
      "Bestes Preis-Leistungs-Verhältnis",
    ],
    exampleImages: {
      before: "/assets/img/bebe before.webp",
      after: "/assets/img/bebe after.webp",
    },
    features: [
      "Alles aus Löwe",
      "3-5 Bilder im Löwe Stil",
      "Unterschiedliche Themen & Stile",
      "Familienrabatt (25% Ersparnis)",
      "Alle Einzelbild-Features",
      "Gruppen-Compositing möglich",
      "Family Album Layout",
      "Unlimited Korrekturen",
    ],
    limitations: [],
    icon: "users",
    bgColor: "bg-green-50",
  },
];

export const pricingAddOns = [
  {
    id: "express",
    name: "24h Express",
    price: 30,
    description: "Fertigstellung in 24-48 Stunden",
  },
  {
    id: "revisions",
    name: "Extra Korrekturen",
    price: 10,
    description: "Zusätzliche Korrekturschleifen",
  },
  {
    id: "prints",
    name: "Premium Prints",
    price: 25,
    description: "Professionelle Drucke auf Fotopapier",
  },
  {
    id: "video",
    name: "Bearbeitungs-Video",
    price: 20,
    description: "Zeitraffer-Video der Transformation",
  },
];

export const faqCategories = [
  {
    id: "privacy_uniqueness",
    title: "Datenschutz & Unikate",
    icon: "Shield", // Icon als Text gespeichert
    color: "from-teal-500 to-cyan-500",
    questions: [
      {
        question:
          "Werden meine Bilder veröffentlicht oder für Werbung genutzt?",
        answer:
          "Nein, niemals ohne Ihre ausdrückliche Erlaubnis. Standardmäßig bleiben alle Ihre Bilder zu 100% privat. Nur wenn Sie uns aktiv die Erlaubnis erteilen, verwenden wir das Bild ggf. anonymisiert für unser Portfolio.",
      },
      {
        question: "Warum sind die Gesichter auf den Beispielbildern verdeckt?",
        answer:
          "Dies ist Teil unserer Verpflichtung zur Anonymität. Selbst wenn uns Eltern die Erlaubnis zur Veröffentlichung geben, anonymisieren wir die Bilder, um die Identität der Kinder zu schützen. Die Privatsphäre unserer Kunden hat oberste Priorität.",
      },
      {
        question: "Bekomme ich ein Standarddesign oder ein echtes Unikat?",
        answer:
          "Jedes Bild ist ein 100%iges Unikat. Der Prozess beginnt mit einer persönlichen Beratung, in der wir Ihre Wünsche besprechen. Wir verwenden keine vorgefertigten Filter, sondern erstellen jede Transformation individuell von Hand.",
      },
    ],
  },
  {
    id: "process",
    title: "Ablauf & Bearbeitung",
    icon: "Clock", // Icon als Text gespeichert
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        question: "Wie lange dauert die Bearbeitung?",
        answer:
          "Die Bearbeitung dauert in der Regel 3-7 Werktage, abhängig von der Komplexität. Für eilige Aufträge bieten wir einen Express-Service (24-48h) gegen Aufpreis an.",
      },
      {
        question: "Kann ich Änderungswünsche äußern?",
        answer:
          "Ja, gerne! Je nach Paket sind 1 bis unlimitierte Korrekturschleifen inklusive, um sicherzustellen, dass das Ergebnis Ihren Vorstellungen entspricht.",
      },
      {
        question: "Wie läuft der Bestellprozess ab?",
        answer:
          "Ganz einfach: Bilder hochladen → Wünsche besprechen → Bearbeitung → Fertige Bilder erhalten. Sie werden über jeden Schritt per E-Mail informiert.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technische Fragen",
    icon: "Camera", // Icon als Text gespeichert
    color: "from-green-500 to-green-600",
    questions: [
      {
        question: "Welche Dateiformate werden unterstützt?",
        answer:
          "Wir akzeptieren JPEG, PNG, TIFF und RAW-Dateien. Die fertigen Bilder erhalten Sie in hoher Auflösung als JPEG oder PNG, je nach Verwendungszweck.",
      },
      {
        question: "Wie groß sollten die Originalbilder sein?",
        answer:
          "Für beste Ergebnisse sollten die Bilder mindestens 2 Megapixel haben. Je höher die Auflösung des Originalbildes, desto besser wird das Endergebnis. Maximale Dateigröße: 10MB pro Bild.",
      },
      {
        question: "Sind die Bilder für den Druck geeignet?",
        answer:
          "Absolut! Alle bearbeiteten Bilder werden in hoher Auflösung (300 DPI) geliefert und sind perfekt für den professionellen Druck bis zur Größe A3 geeignet.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Preise & Bezahlung",
    icon: "DollarSign", // Icon als Text gespeichert
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        question: "Was kostet eine Bildbearbeitung?",
        answer:
          "Die Preise variieren je nach Aufwand: Grundlegendes Compositing ab 29€, kreative Composings ab 59€, komplexe Transformationen ab 79€. Sie erhalten immer ein unverbindliches Angebot vor Beginn der Arbeit.",
      },
      {
        question: "Gibt es Rabatte für mehrere Bilder?",
        answer:
          "Ja! Ab 3 Bildern erhalten Sie 10% Rabatt, ab 5 Bildern 15% und ab 10 Bildern 20%. Familienpakete und Geschwisterrabatte sind ebenfalls verfügbar.",
      },
      {
        question: "Welche Zahlungsmethoden akzeptieren Sie?",
        answer:
          "Wir akzeptieren PayPal, Kreditkarten (Visa, Mastercard), Überweisung und auf Anfrage auch Rechnungskauf für Geschäftskunden.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Lieferung & Download",
    icon: "Download", // Icon als Text gespeichert
    color: "from-pink-500 to-pink-600",
    questions: [
      {
        question: "Wie erhalte ich meine fertigen Bilder?",
        answer:
          "Sie erhalten einen sicheren Download-Link per E-Mail. Die Bilder stehen Ihnen 12 Monate zum Download zur Verfügung.",
      },
      {
        question: "In welchen Formaten werden die Bilder geliefert?",
        answer:
          "Standardmäßig als hochauflösende JPEG-Dateien (300 DPI). Auf Wunsch auch als PNG, TIFF für professionelle Druckerei oder in verschiedenen Größen für Web und Social Media.",
      },
      {
        question: "Kann ich die Originaldateien auch behalten?",
        answer:
          "Natürlich! Sie erhalten sowohl die bearbeiteten Versionen als auch - auf Wunsch - die unbearbeiteten Originale zurück.",
      },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    text: "Die Transformation der Bilder unserer Tochter war einfach magisch. Sie sieht sich jetzt als echte Prinzessin!",
    author: "Sarah Martinez",
    role: "Mutter von Emma",
    rating: 5,
  },
  {
    id: 2,
    text: "Professionell, kreativ und herzlich. Noha hat unsere Erwartungen bei weitem übertroffen. Absolute Empfehlung!",
    author: "Michael Weber",
    role: "Vater von Leon",
    rating: 5,
  },
  {
    id: 3,
    text: "Die Qualität und Liebe zum Detail ist unglaublich. Unsere Kinder sind begeistert von ihren Superhelden-Fotos!",
    author: "Lisa Hoffmann",
    role: "Mutter von Tim & Anna",
    rating: 5,
  },
  {
    id: 4,
    text: "Noha hat ein unglaubliches Talent, die Fantasie unserer Kinder zum Leben zu erwecken. Wir sind begeistert!",
    author: "Ali Velid",
    role: "Vater von Halid",
    rating: 5,
  },
  {
    id: 5,
    text: "Ein unvergessliches Erlebnis! Die Fotos unserer kleinen Mia als Fee sind einfach zauberhaft.",
    author: "Julia Schmidt",
    role: "Mutter von Mia",
    rating: 5,
  },
  {
    id: 6,
    text: "Die Fotos von unserem Sohn als Ritter sind einfach episch. Noha hat eine unglaubliche Kreativität!",
    author: "Marina Klein",
    role: "Mutter von Lukas",
    rating: 5,
  },
  {
    id: 7,
    text: "Jedes Bild ist ein kleines Kunstwerk. Wir sind so glücklich mit den Ergebnissen und werden definitiv wiederkommen!",
    author: "Andreas Becker",
    role: "Vater von Max",
    rating: 5,
  },
  {
    id: 8,
    text: "Ein wunderbares Erlebnis für die ganze Familie. Die Bilder sind ein Schatz, den wir immer bewundern werden.",
    author: "Stefan Wagner",
    role: "Vater von Clara & Elias",
    rating: 5,
  },
  {
    id: 9,
    text: "Noha hat es geschafft, die Persönlichkeit unserer Tochter perfekt einzufangen. Die Fotos sind magisch!",
    author: "Anna Lehmann",
    role: "Mutter von Lilly",
    rating: 5,
  },
  {
    id: 10,
    text: "Dank Nohas Talent sehen unsere Kinder auf den bearbeiteten Bildern wie echte Filmstars aus. Wir sind begeistert!",
    author: "Robert Klein",
    role: "Vater von Emma",
    rating: 5,
  },
];
