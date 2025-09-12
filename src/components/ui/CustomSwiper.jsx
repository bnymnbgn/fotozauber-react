// src/components/ui/CustomSwiper.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  EffectCards,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const swiperStyles = cva(
  [
    // Allgemeine Container-Stile
    "relative",

    // ✅ NEU: Standard-Stile für Navigationspfeile
    "[&_.swiper-button-next]:text-primary-600 [&_.swiper-button-prev]:text-primary-600",
    "[&_.swiper-button-next:hover]:text-primary-700 [&_.swiper-button-prev:hover]:text-primary-700",
    "[&_.swiper-button-next]:transition-colors [&_.swiper-button-prev]:transition-colors",

    // Pagination Container Styles...
    "[&_.swiper-pagination]:!absolute [&_.swiper-pagination]:!left-1/2 [&_.swiper-pagination]:!-translate-x-1/2",
    "[&_.swiper-pagination]:!w-auto [&_.swiper-pagination]:z-10",
    "[&_.swiper-pagination]:flex [&_.swiper-pagination]:items-center [&_.swiper-pagination]:justify-center",
    "[&_.swiper-pagination]:px-4 [&_.swiper-pagination]:py-2 [&_.swiper-pagination]:rounded-full",
    "[&_.swiper-pagination]:bg-white/90 [&_.swiper-pagination]:backdrop-blur-sm [&_.swiper-pagination]:shadow-lg",

    // Bullet Styles...
    "[&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-2 md:[&_.swiper-pagination-bullet]:!w-3 md:[&_.swiper-pagination-bullet]:!h-3",
    "[&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!bg-gray-300",
    "[&_.swiper-pagination-bullet]:!opacity-60 [&_.swiper-pagination-bullet]:!mx-1.5",
    "[&_.swiper-pagination-bullet]:!cursor-pointer [&_.swiper-pagination-bullet]:!transition-all",
    "[&_.swiper-pagination-bullet]:!duration-300",
    "[&_.swiper-pagination-bullet:hover]:!opacity-80 [&_.swiper-pagination-bullet:hover]:!scale-110",
    "[&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!scale-125 md:[&_.swiper-pagination-bullet-active]:!scale-[1.3]",
    "[&_.swiper-pagination-bullet-active]:!shadow-lg [&_.swiper-pagination-bullet-active]:!shadow-purple-500/50",
    "[&_.swiper-pagination-bullet-active]:!bg-gradient-to-r from-purple-500 to-pink-500",
  ],
  {
    variants: {
      variant: {
        testimonials: [
          "px-10",
          "[&_.swiper-slide]:w-[320px] [&_.swiper-slide]:h-[360px]",
          // ✅ ÜBERSCHREIBT den Standard-Stil für diese Variante
          "[&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white",
          "[&_.swiper-pagination]:!bottom-[30px]",
        ],
        cards: ["[&_.swiper-pagination]:!bottom-[20px]"],
        addons: ["[&_.swiper-pagination]:!bottom-[20px]"],
      },
    },
    defaultVariants: {
      variant: "cards",
    },
  }
);

const CustomSwiper = ({
  items,
  renderSlide,
  effect = "slide",
  className = "",
  slideClassName = "",
  swiperProps = {},
  variant,
}) => {
  const paginationConfig = { clickable: true };

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
      modules: [Pagination, Navigation],
      pagination: paginationConfig,
      navigation: true,
    },
  };

  const currentConfig = config[effect] || {};

  const finalSwiperProps = {
    ...swiperProps,
    style: { ...swiperProps.style, "--swiper-navigation-size": "30px" },
  };

  return (
    <div className={cn(swiperStyles({ variant }), className)}>
      <Swiper {...currentConfig} {...finalSwiperProps}>
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index} className={slideClassName}>
            {renderSlide(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
