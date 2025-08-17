import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Heart, Share2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const Lightbox = ({ 
  isOpen, 
  onClose, 
  image, 
  onNext, 
  onPrev, 
  currentIndex, 
  totalImages 
}) => {
  if (!image) return null;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNext();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onNext, onPrev]);

  const handleDownload = () => {
    // Create download link
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `fotozauber-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || 'FotoZauber Transformation',
          text: image.description || 'Schauen Sie sich diese magische Transformation an!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="w-full h-full flex items-center justify-center"
      closeOnOverlayClick={true}
    >
      <div className="relative max-w-6xl max-h-[90vh] mx-auto">
        {/* Main Image */}
        <motion.div
          className="relative"
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Navigation Arrows */}
          {totalImages > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {totalImages > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {totalImages}
            </div>
          )}
        </motion.div>

        {/* Image Info & Actions */}
        <motion.div 
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Image Details */}
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-1">
              {image.title || 'Magische Transformation'}
            </h3>
            <p className="text-white/70 text-sm">
              {image.description || 'Eine weitere wunderschöne Transformation von FotoZauber'}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
              <span>Kategorie: {getCategoryName(image.category)}</span>
              {image.transformation && (
                <span>Stil: {image.transformation}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Teilen
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </motion.div>

        {/* Keyboard Navigation Hint */}
        <motion.div 
          className="mt-4 text-center text-white/50 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Verwenden Sie ← → Pfeiltasten oder ESC zum Schließen
        </motion.div>
      </div>
    </Modal>
  );
};

// Helper function to get category display names
function getCategoryName(category) {
  const categoryNames = {
    space: 'Weltraum',
    underwater: 'Unterwasser', 
    animals: 'Tiere',
    fantasy: 'Fantasy',
    surprise: 'Überraschung'
  };
  return categoryNames[category] || category;
}

export default Lightbox;