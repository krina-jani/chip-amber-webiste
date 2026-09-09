"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isQuickAdded, setIsQuickAdded] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: `${product.id}-${selectedColor.name}-${product.sizes[0]}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: product.sizes[0] || "M",
      },
      1
    );

    setIsQuickAdded(true);
    setTimeout(() => setIsQuickAdded(false), 1600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const displayImage =
    isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#f4f4f2] rounded-xl sm:rounded-2xl overflow-hidden mb-3 transition-transform">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
            priority={false}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                product.badge === "BEST SELLER"
                  ? "bg-black text-white"
                  : product.badge === "NEW"
                  ? "bg-white/90 backdrop-blur-xs text-black border border-zinc-200"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-700 hover:text-black hover:scale-110 shadow-xs transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500 stroke-red-500"
                : "stroke-[1.8]"
            }`}
          />
        </button>

        {/* Quick Add Button (Desktop hover & mobile accessible) */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick Add to Cart"
          className={`absolute bottom-2.5 left-2.5 right-2.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md ${
            isQuickAdded
              ? "bg-emerald-600 text-white opacity-100 translate-y-0"
              : "bg-black/90 text-white hover:bg-black backdrop-blur-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 lg:flex hidden"
          }`}
        >
          {isQuickAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add • ${product.price.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 px-1">
        {/* Fit / Eyebrow */}
        {product.fitLabel && (
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
            {product.fitLabel}
          </span>
        )}

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-bold text-zinc-950 uppercase tracking-tight line-clamp-1 hover:text-zinc-600 transition-colors"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-800">
            {product.rating}
          </span>
          <span className="text-[11px] text-zinc-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-center flex-wrap gap-2 mt-1.5">
          <span className="text-sm font-extrabold text-black">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.discountPercentage && (
            <span className="text-[10px] font-bold bg-[#DDF4DD] text-[#168316] px-1.5 py-0.5 rounded-sm">
              SAVE {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 5).map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  title={color.name}
                  aria-label={color.name}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    isSelected
                      ? "ring-1.5 ring-black ring-offset-1 scale-110"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-zinc-400 font-medium">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
