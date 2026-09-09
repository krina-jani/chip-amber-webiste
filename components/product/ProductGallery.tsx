"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  hasVideo?: boolean;
  badge?: string;
}

export function ProductGallery({
  images,
  productName,
  hasVideo = true,
  badge = "BEST SELLER",
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="flex flex-col w-full">
      {/* Gallery Main Container: Vertical Thumbnails on Left + Large Image on Right matching reference */}
      <div className="flex gap-2.5 sm:gap-4 items-start w-full">
        {/* Left Thumbnail Column */}
        <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 w-12 sm:w-16 md:w-20">
          {displayImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            const isVideoThumb = hasVideo && idx === displayImages.length - 1;

            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative aspect-4/5 w-full rounded-md sm:rounded-lg overflow-hidden bg-zinc-100 transition-all ${
                  isActive
                    ? "ring-2 ring-black ring-offset-1 border-transparent opacity-100"
                    : "opacity-75 hover:opacity-100 border border-zinc-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} angle ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
                {/* Play button overlay on last thumbnail */}
                {isVideoThumb && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/90 flex items-center justify-center text-black">
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black ml-0.5" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Large Product Image */}
        <div className="relative flex-1 aspect-4/5 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#f4f4f2]">
          <Image
            src={displayImages[activeIndex]}
            alt={`${productName} view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 80vw, 50vw"
            className="object-cover object-center transition-all duration-300"
          />

          {/* Top Left: Zoom Icon Button */}
          <button
            onClick={() => setIsZoomOpen(true)}
            aria-label="Zoom image"
            className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-zinc-700 hover:text-black hover:bg-white shadow-xs transition-colors z-10"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </button>

          {/* Top Right: BEST SELLER Black Pill Badge */}
          {badge && (
            <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10">
              <span className="bg-[#050505] text-white text-[9px] sm:text-[10px] font-black tracking-wider uppercase px-2.5 py-1 sm:px-3 sm:py-1 rounded-full shadow-xs">
                {badge}
              </span>
            </div>
          )}

          {/* Left/Right overlay arrows on touch */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? displayImages.length - 1 : prev - 1
                  )
                }
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/75 backdrop-blur-xs flex items-center justify-center text-black sm:hidden"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === displayImages.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/75 backdrop-blur-xs flex items-center justify-center text-black sm:hidden"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Carousel Dots Indicators matching reference */}
      <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4">
        {displayImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all ${
              idx === activeIndex
                ? "w-4 h-1.5 bg-black rounded-full"
                : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400 rounded-full"
            }`}
          />
        ))}
      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            aria-label="Close zoom"
            className="absolute top-5 right-5 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[85vh]">
            <Image
              src={displayImages[activeIndex]}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
