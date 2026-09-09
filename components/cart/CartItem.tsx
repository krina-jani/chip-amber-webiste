"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { PRODUCTS } from "@/data/products";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { toggleWishlist } = useWishlistStore();

  const handleMoveToWishlist = () => {
    const fullProduct = PRODUCTS.find((p) => p.id === item.productId);
    if (fullProduct) {
      toggleWishlist(fullProduct);
    }
    removeItem(item.id);
  };

  return (
    <div className="flex gap-3 sm:gap-4 py-4 sm:py-5 border-b border-zinc-200">
      {/* Thumbnail */}
      <Link
        href={`/product/${item.slug}`}
        className="relative w-20 sm:w-24 aspect-4/5 rounded-lg overflow-hidden bg-zinc-100 shrink-0"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="100px"
          className="object-cover object-center"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${item.slug}`}
              className="text-xs sm:text-sm font-bold uppercase tracking-tight text-black hover:text-zinc-600 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <span className="text-xs sm:text-sm font-extrabold text-black shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>

          {/* Color and Size Specifications */}
          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10"
                style={{ backgroundColor: item.color.hex }}
              />
              <span>{item.color.name}</span>
            </div>
            <span>•</span>
            <span>Size {item.size}</span>
          </div>

          <div className="text-[11px] text-zinc-400 mt-0.5">
            ${item.price.toFixed(2)} each
          </div>
        </div>

        {/* Quantity Controls and Actions */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-zinc-200 rounded-lg bg-white">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-l-lg transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-black min-w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-r-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Secondary Actions: Wishlist and Remove */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveToWishlist}
              title="Save to wishlist"
              aria-label="Save to wishlist"
              className="text-zinc-400 hover:text-black p-1 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => removeItem(item.id)}
              title="Remove item"
              aria-label="Remove item"
              className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
