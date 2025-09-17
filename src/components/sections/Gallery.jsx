// src/components/sections/Gallery.jsx

import { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Shield } from "lucide-react";
import { useGallery } from "@/lib/hooks/useGallery";
import { galleryImages } from "../../data/content";
import { cn } from "../../utils/cn";

// ====================================================================================
// Erweiterte Kartenansicht mit optimierten Animationen
// ====================================================================================
const ExpandedCard = memo(({ image, close }) => {
  const handleScroll = (e) => e.stopPropagation();
  const transition = { type: "spring", stiffness: 250, damping: 30 };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={close}>
      {/* ... Backdrop ... */}
      <div className="absolute inset-0 overflow-y-auto" onScroll={handleScroll}>
        <div
          className="container mx-auto max-w-4xl my-12"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            layoutId={`card-container-${image.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl"
            transition={transition}
          >
            {/* ... Bild und Schließen-Button ... */}
            <div className="relative">
              <motion.img
                layoutId={`card-image-${image.id}`}
                src={image.src}
                alt={image.alt}
                className="w-full h-auto max-h-[70vh] object-cover cursor-pointer"
                onClick={close}
                transition={transition}
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

            {/* --- Inhaltsbereich --- */}
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

              {/* Basisbeschreibung */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {image.description}
              </p>

              {/* --- START: Neue Sektion für Kundendetails --- */}
              <div className="space-y-6">
                {/* Bedingte Anzeige für Kundenwunsch */}
                {image.customerWish && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Der Kundenwunsch
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {image.customerWish}
                    </p>
                  </div>
                )}

                {/* Bedingte Anzeige für Prozess */}
                {image.ourProcess && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Unser kreativer Prozess
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {image.ourProcess}
                    </p>
                  </div>
                )}
              </div>
              {/* --- ENDE: Neue Sektion für Kundendetails --- */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

ExpandedCard.displayName = "ExpandedCard";

// ====================================================================================
// Vorschau-Karte mit einfacher Bildskalierung
// ====================================================================================
const Card = memo(({ image, onSelect, className }) => {
  const [isLargeSquare, setIsLargeSquare] = useState(false);
  const [isWideContainer, setIsWideContainer] = useState(false);

  useEffect(() => {
    setIsLargeSquare(className?.includes("row-span-2"));
    setIsWideContainer(
      className?.includes("col-span-2") && !className?.includes("row-span-2")
    );
  }, [className]);

  return (
    <motion.div
      layoutId={`card-container-${image.id}`}
      onClick={() => onSelect(image.id)}
      className={cn(
        "group relative cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <motion.img
          layoutId={`card-image-${image.id}`}
          src={image.src}
          alt={image.alt}
          className="w-full h-full"
          style={{
            objectFit: "cover",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
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
});

Card.displayName = "Card";

// ====================================================================================
// Haupt-Galerie-Komponente
// ====================================================================================
const Gallery = memo(() => {
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
          {/* === Datenschutzhinweis === */}
          <div className="max-w-3xl mx-auto mt-8 bg-white border border-purple-100 rounded-xl shadow-sm p-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-800">
                  Unser Versprechen: Ihre Privatsphäre
                </h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Um die Privatsphäre unserer Kunden zu schützen, werden alle
                  hier gezeigten Portfolio-Bilder nur mit ausdrücklicher
                  Zustimmung der Eltern und stets in anonymisierter Form (durch
                  Verdeckung der Gesichter) dargestellt. Ihre Erinnerungen sind
                  bei uns sicher.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter-Buttons  */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeFilter === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Lückenfreies Grid Layout für 12 Bilder */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px] w-full"
        >
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              image={image}
              onSelect={setSelectedId}
              className={image.className || ""}
            />
          ))}
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
});

Gallery.displayName = "Gallery";

export default Gallery;
