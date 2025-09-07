// Comparison.jsx (updated)
import { useState, useRef, useCallback } from "react";
import { Timer, Sparkles, Eye, Maximize, X } from "lucide-react"; // X hinzugefügt
import Modal from "../ui/Modal";
import { comparisons } from "../../data/content";
import HoverComparisonSlider from "../ui/HoverComparisonSlider";

// --- Hauptsektion-Komponente ---
const HoverComparisonSection = () => {
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
        {/* Header (unverändert) */}
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

        {/* Comparison Grid */}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600 font-medium">Transformierte Bilder</p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Timer className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24h</h3>
            <p className="text-gray-600 font-medium">
              Express-Service verfügbar
            </p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600 font-medium">Kundenzufriedenheit</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
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

      {/* Modal-Implementierung */}
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
};

export default HoverComparisonSection;
