import { useState, useEffect, memo } from "react";
import { Timer, Sparkles, Eye, X } from "lucide-react";
import Modal from "../ui/Modal";
import { comparisons } from "../../data/content";
import HoverComparisonSlider from "../ui/HoverComparisonSlider";
import CustomSwiper from "../ui/CustomSwiper";

const statsData = [
  {
    id: 1,
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    value: "500+",
    title: "Transformierte Bilder",
    description: "Professionelle Bearbeitung für beeindruckende Ergebnisse.",
  },
  {
    id: 2,
    icon: Timer,
    gradient: "from-blue-500 to-purple-500",
    value: "24h",
    title: "Express-Service verfügbar",
    description: "Schnelle Ergebnisse, wann immer Sie sie brauchen.",
  },
  {
    id: 3,
    icon: Eye,
    gradient: "from-green-500 to-blue-500",
    value: "100%",
    title: "Kundenzufriedenheit",
    description: "Unsere Kunden lieben die Qualität unserer Arbeit.",
  },
];

// Die StatCard für den Desktop-Grid (bleibt unverändert)
const StatCard = ({ stat }) => {
  const IconComponent = stat.icon;
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
      <p className="text-gray-600 font-medium">{stat.title}</p>
      <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
    </div>
  );
};

// NEU: Eine Funktion, die nur den *Inhalt* für die mobile Slider-Karte rendert
const renderStatCardContent = (stat) => {
  const IconComponent = stat.icon;
  return (
    <div className="text-center p-6">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
      <p className="text-gray-600 font-medium">{stat.title}</p>
      <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
    </div>
  );
};

const HoverComparisonSection = memo(() => {
  // ... (Hooks und Funktionen bleiben unverändert)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState(null);

  const handleOpenModal = (comparisonData) => {
    setSelectedComparison(comparisonData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedComparison(null), 300);
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* ... (Header und Comparison Grid bleiben unverändert) ... */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full px-5 py-2 text-sm font-medium mb-6">
            <Timer className="w-4 h-4" />
            <span>VORHER & NACHHER VERGLEICHE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Magische <span className="text-gradient">Transformationen</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bewegen Sie Ihre Maus über die Bilder, um die dramatischen
            Verbesserungen zu erleben. Klicken Sie, um die Details zu erkunden.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {comparisons.map((comparison) => (
            <HoverComparisonSlider
              key={comparison.id}
              beforeImage={comparison.before}
              afterImage={comparison.after}
              title={comparison.title}
              onImageClick={() => handleOpenModal(comparison)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="md:hidden">
          <CustomSwiper
            items={statsData}
            // Wir übergeben die Container-Styles an die Slide
            slideClassName="flex items-center justify-center rounded-2xl bg-white shadow-xl"
            // und rendern nur noch den Inhalt
            renderSlide={renderStatCardContent}
            effect="cards"
            className="w-full h-[380px]"
            swiperProps={{
              style: {
                paddingBottom: "50px",
              },
            }}
          />
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* ... (CTA und Modal bleiben unverändert) ... */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Starten Sie Ihre Transformation
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Laden Sie Ihr Bild hoch und erleben Sie die Magie unserer
            Bearbeitung
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span>Jetzt kostenlos testen</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        className="relative max-w-[90vw] p-0 bg-transparent shadow-none"
        showCloseButton={false}
      >
        {selectedComparison && (
          <div className="w-full max-h-[90vh] mx-auto p-4 relative overflow-hidden">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <HoverComparisonSlider
              beforeImage={selectedComparison.before}
              afterImage={selectedComparison.after}
              title={selectedComparison.title}
              enforceAspectRatio={false}
            />
            <p className="mt-4 text-center text-white text-lg">
              {selectedComparison.title}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
});

HoverComparisonSection.displayName = "HoverComparisonSection";

export default HoverComparisonSection;
