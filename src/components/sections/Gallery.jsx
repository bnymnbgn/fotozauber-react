// src/components/sections/Gallery.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useGallery } from "../../hooks/useGallery";
import { galleryImages } from "../../data/content";
import { cn } from "../../utils/cn";

// ====================================================================================
// Erweiterte Kartenansicht mit optimierten Animationen
// ====================================================================================
function ExpandedCard({ image, close }) {
  const handleScroll = (e) => e.stopPropagation();

  // NEU: Definierte Transition für ein flüssigeres Gefühl
  const transition = { type: "spring", stiffness: 250, damping: 30 };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={close}>
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 overflow-y-auto" onScroll={handleScroll}>
        <div
          className="container mx-auto max-w-4xl my-12"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            layoutId={`card-container-${image.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl"
            transition={transition} // NEU: Flüssige Spring-Animation
          >
            <div className="relative">
              <motion.img
                layoutId={`card-image-${image.id}`}
                src={image.src}
                alt={image.alt}
                className="w-full h-auto max-h-[70vh] object-cover cursor-pointer"
                onClick={close}
                transition={transition} // NEU: Flüssige Spring-Animation
              />
              <motion.button
                onClick={close}
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <X className="w-6 h-6 text-gray-800" />
              </motion.button>
            </div>
            <motion.div
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <motion.h2
                layoutId={`card-title-${image.id}`}
                transition={transition}
                className="text-3xl font-bold text-gray-900"
              >
                {image.title}
              </motion.h2>
              <motion.p
                layoutId={`card-category-${image.id}`}
                transition={transition}
                className="text-purple-600 font-medium mt-1"
              >
                {image.transformation}
              </motion.p>
              <div className="w-16 h-1 bg-purple-200 my-6"></div>
              <p className="text-gray-700 leading-relaxed">
                {image.description} Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ====================================================================================
// Vorschau-Karte
// ====================================================================================
function Card({ image, onSelect, className }) {
  return (
    <motion.div
      layoutId={`card-container-${image.id}`}
      onClick={() => onSelect(image.id)}
      className={cn(
        "group relative cursor-pointer bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      <motion.img
        layoutId={`card-image-${image.id}`}
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <motion.h3
          layoutId={`card-title-${image.id}`}
          className="text-white font-semibold text-lg"
        >
          {image.title}
        </motion.h3>
        <motion.p
          layoutId={`card-category-${image.id}`}
          className="text-white/80 text-sm"
        >
          {image.transformation}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ====================================================================================
// Haupt-Galerie-Komponente
// ====================================================================================
const Gallery = () => {
  const { activeFilter, setActiveFilter, filteredImages, categories } =
    useGallery(galleryImages);

  const [selectedId, setSelectedId] = useState(null);
  const selectedImage = selectedId
    ? galleryImages.find((img) => img.id === selectedId)
    : null;

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container">
        {/* Header und Filter */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Unsere Kunstwerke</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Galerie magischer{" "}
            <span className="text-gradient">Transformationen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie eine Auswahl unserer schönsten Bildbearbeitungen.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeFilter === category.id
                  ? "bg-gradient-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Asymmetrisches Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]"
        >
          {filteredImages.map((image, index) => {
            let className = "";
            if ((index + 1) % 5 === 0) {
              className = "col-span-2 row-span-2";
            } else if ((index + 1) % 7 === 0) {
              className = "col-span-2";
            }
            return (
              <Card
                key={image.id}
                image={image}
                onSelect={setSelectedId}
                className={className}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Erweiterte Kartenansicht */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <ExpandedCard
            image={selectedImage}
            close={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
