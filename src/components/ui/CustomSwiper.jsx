import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCards,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CustomSwiper = ({
  items,
  renderSlide,
  effect = "slide",
  className = "",
  slideClassName = "", // NEUE Eigenschaft für die Slide-Klassen
  swiperProps = {},
}) => {
  const paginationConfig = {
    clickable: true,
  };

  const config = {
    cards: {
      effect: "cards",
      grabCursor: true,
      modules: [EffectCards, Pagination],
      pagination: paginationConfig,
    },
    coverflow: {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: true,
      },
      pagination: paginationConfig,
      navigation: true,
      modules: [EffectCoverflow, Pagination, Navigation],
    },
    slide: {
      // Hinzugefügter Standard-Slide-Effekt für Flexibilität
      modules: [Pagination, Navigation],
      pagination: paginationConfig,
      navigation: true,
    },
  };

  const currentConfig = config[effect] || {};

  return (
    <div className="relative">
      <Swiper className={className} {...currentConfig} {...swiperProps}>
        {items.map((item, index) => (
          // Die Klassen werden jetzt hier direkt auf die Slide angewendet
          <SwiperSlide key={item.id || index} className={slideClassName}>
            {renderSlide(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
