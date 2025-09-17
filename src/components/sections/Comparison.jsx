import { useState, useEffect, memo } from "react";
import { Timer, Sparkles, Eye, X, ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import { comparisons } from "../../data/content";
import HoverComparisonSlider from "../ui/HoverComparisonSlider";
import CustomSwiper from "../ui/CustomSwiper";
import Button from "../ui/Button";

const statsData = [
  {
    id: 1,
    icon: Sparkles,
    gradient: "from-purple-600 to-pink-600",
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
    <div className="p-6 flex flex-col h-full items-center justify-center text-center">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg flex-shrink-0`}
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
    <section
      id="comparison"
      className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
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
            renderSlide={renderStatCardContent}
            effect="slide" // Der richtige Effekt
            slideClassName="h-full" // Stellt sicher, dass die Karten die volle Höhe haben
            swiperProps={{
              slidesPerView: 1,
              spaceBetween: 16,
              centeredSlides: true,
              loop: true,
              style: {
                paddingBottom: "50px", // Wichtig für die Pagination
              },
              breakpoints: {
                // Responsive Anpassung für größere Handy-Bildschirme
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
              },
            }}
          />
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
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
      {/* Call to Action - JETZT MIT VOLLER BREITE */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 mt-16">
        <div className="container text-center">
          <div className="p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Bereit für die Transformation?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam magische Momente erschaffen, die ein
                Leben lang in Erinnerung bleiben.
              </p>
              <button
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg touch-optimized touch-feedback prevent-zoom"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Jetzt Anfrage stellen
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
});

HoverComparisonSection.displayName = "HoverComparisonSection";

export default HoverComparisonSection;
