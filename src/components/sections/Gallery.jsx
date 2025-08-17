import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Heart, Sparkles } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import { galleryImages } from '../../data/content';
import Lightbox from '../features/Lightbox';
import { cn } from '../../utils/cn';

const Gallery = () => {
  const {
    activeFilter,
    setActiveFilter,
    filteredImages,
    categories,
    isLightboxOpen,
    currentImageIndex,
    openLightbox,
    closeLightbox,
    goToNextImage,
    goToPrevImage,
    currentImage
  } = useGallery(galleryImages);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      space: 'from-purple-500 to-blue-500',
      underwater: 'from-blue-500 to-teal-500',
      animals: 'from-green-500 to-yellow-500',
      fantasy: 'from-pink-500 to-purple-500',
      surprise: 'from-orange-500 to-red-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Unsere Kunstwerke</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Galerie magischer{' '}
            <span className="text-gradient">Transformationen</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie eine Auswahl unserer schönsten Bildbearbeitungen. 
            Jedes Foto erzählt eine einzigartige Geschichte voller Magie und Fantasie.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden',
                activeFilter === category.id
                  ? 'bg-gradient-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary-300'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {category.name}
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  activeFilter === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}>
                  {category.count}
                </span>
              </span>
              
              {activeFilter === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-primary"
                  layoutId="activeFilter"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="text-center mb-8"
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600">
            <span className="font-semibold text-primary-600">{filteredImages.length}</span> 
            {activeFilter === 'all' ? ' magische Transformationen' : ` Bilder in "${categories.find(c => c.id === activeFilter)?.name}"`}
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl bg-white shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        'px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r',
                        getCategoryColor(image.category)
                      )}>
                        {categories.find(c => c.id === image.category)?.name}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="absolute top-3 right-3">
                      <motion.div
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-white font-semibold text-lg mb-1 truncate">
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-2 line-clamp-2">
                          {image.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-xs">
                            {image.transformation}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-white/60" />
                            <Search className="w-4 h-4 text-white/60" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400 rounded-xl transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Keine Bilder gefunden
            </h3>
            <p className="text-gray-500">
              Versuchen Sie einen anderen Filter oder schauen Sie sich alle Bilder an.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        image={currentImage}
        onNext={goToNextImage}
        onPrev={goToPrevImage}
        currentIndex={currentImageIndex}
        totalImages={filteredImages.length}
      />
    </section>
  );
};

export default Gallery;