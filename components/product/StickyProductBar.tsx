"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";

interface StickyProductBarProps {
  product: Product;
}

export function StickyProductBar({ product }: StickyProductBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const handleScroll = () => {
      const mainBtn = document.getElementById("main-add-to-cart-btn");
      if (mainBtn) {
        const rect = mainBtn.getBoundingClientRect();
        // If the main CTA has scrolled past the top of the screen
        if (rect.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuickAdd = () => {
    addItem(
      {
        id: `${product.id}-${product.colors[0]?.name || "Default"}-${product.sizes[1] || product.sizes[0] || "M"}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: product.colors[0] || { name: "Default", hex: "#000" },
        size: product.sizes[1] || product.sizes[0] || "M",
      },
      1
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-2.5 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold uppercase tracking-tight text-black truncate">
              {product.name}
            </p>
            <p className="text-xs font-extrabold text-black">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={handleQuickAdd}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all shrink-0 flex items-center gap-1.5 ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#1FA51F] hover:bg-[#168316] text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  );
}
