"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: any) => {
    addItem(
      {
        id: `${product.id}-${product.colors[0]?.name || "Default"}-${product.sizes[0] || "M"}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: product.colors[0] || { name: "Default", hex: "#000" },
        size: product.sizes[0] || "M",
      },
      1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-6">
          <div className="pb-4 border-b border-zinc-200">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              Wishlist ({items.length})
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Your saved garments and upcoming drop favorites.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-black">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Save your favorite minimalist pieces and check back when your size drops.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-4/5 w-full bg-zinc-100 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-600 hover:text-red-600 shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 space-y-2">
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-xs font-bold uppercase tracking-tight text-black line-clamp-1 hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs font-extrabold text-black mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#1FA51F] hover:bg-[#168316] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
