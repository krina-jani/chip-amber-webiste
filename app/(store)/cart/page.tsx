"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800 font-semibold">Shopping Bag</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            Your Bag ({items.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Complimentary shipping on domestic orders over $75.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-zinc-400 hover:text-red-600 font-medium transition-colors"
          >
            Clear Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-200 max-w-md mx-auto p-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold uppercase tracking-tight text-black">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Discover our latest heavyweight French terry drops and minimalist architectural staples.
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
        /* 2-Column Desktop / 1-Column Mobile Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 divide-y divide-zinc-200">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
