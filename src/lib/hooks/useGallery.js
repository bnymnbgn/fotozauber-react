import { useState, useMemo } from 'react';

export function useGallery(images, initialFilter = 'all') {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return images;
    }
    return images.filter(image => image.category === activeFilter);
  }, [images, activeFilter]);

  // Get unique categories from images
  const categories = useMemo(() => {
    const allCategories = images.map(image => image.category);
    const uniqueCategories = [...new Set(allCategories)];
    return [
      { id: 'all', name: 'Alle', count: images.length },
      ...uniqueCategories.map(category => ({
        id: category,
        name: getCategoryName(category),
        count: images.filter(img => img.category === category).length
      }))
    ];
  }, [images]);

  const openLightbox = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < filteredImages.length - 1 ? prev + 1 : 0
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : filteredImages.length - 1
    );
  };

  return {
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
    currentImage: filteredImages[currentImageIndex]
  };
}

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