import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck, RefreshCw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const flagshipProduct =
    PRODUCTS.find((p) => p.slug === "shadow-oversized-hoodie") || PRODUCTS[0];
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.badge === "NEW").slice(0, 4);
  const trending = PRODUCTS.slice(4, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] bg-zinc-950 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1800&auto=format&fit=crop&q=85"
          alt="Chip Ember Autumn/Winter Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
            <span>Autumn / Winter &apos;26 Edition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
            REDEFINING MODERN DRAPE
          </h1>

          <p className="text-xs sm:text-base text-zinc-300 max-w-xl mx-auto font-normal leading-relaxed">
            Custom-milled 420 GSM loopback cotton fleece. Boxy cuts, dropped shoulders, and architectural silhouettes engineered for effortless everyday luxury.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-4">
            <Link
              href="/category/men"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-lg active:scale-98"
            >
              Shop Men
            </Link>
            <Link
              href="/category/women"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1FA51F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#168316] transition-all shadow-lg active:scale-98"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              Curated Wardrobe
            </span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-600 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 flex flex-col justify-end p-4"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                  {cat.name}
                </p>
                <p className="text-[10px] text-zinc-300 font-medium">
                  {cat.itemCount} Garments
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Reference Flagship Spotlight Section */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Preview */}
            <div className="lg:col-span-6 relative aspect-4/5 rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-md">
              <Image
                src={flagshipProduct.images[0]}
                alt={flagshipProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                FLAGSHIP PIECE
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {flagshipProduct.fitLabel}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                {flagshipProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {flagshipProduct.description}
              </p>

              {/* Specs pill row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 px-3 py-1.5 rounded-lg">
                  420 GSM Heavyweight French Terry
                </span>
                <span className="bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 px-3 py-1.5 rounded-lg">
                  Preshrunk Organic Cotton
                </span>
                <span className="bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 px-3 py-1.5 rounded-lg">
                  Double Layered Sturdy Hood
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-black text-black">
                  ${flagshipProduct.price.toFixed(2)}
                </span>
                <span className="text-base text-zinc-400 line-through">
                  ${flagshipProduct.originalPrice?.toFixed(2)}
                </span>
                <span className="bg-[#DDF4DD] text-[#168316] text-xs font-bold px-2 py-0.5 rounded-sm">
                  SAVE {flagshipProduct.discountPercentage}%
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href={`/product/${flagshipProduct.slug}`}
                  className="px-8 py-3.5 rounded-xl bg-[#1FA51F] hover:bg-[#168316] text-white font-bold text-xs uppercase tracking-wider transition-all text-center shadow-sm"
                >
                  View Product Details
                </Link>
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all text-center"
                >
                  Browse Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              Most Wanted
            </span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-600 transition-colors"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Fabric Banner */}
      <section className="relative w-full py-16 sm:py-24 bg-black text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
            Craftsmanship Standard
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            CUSTOM-MILLED 420 GSM ORGANIC COTTON
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Zero plastic polyesters. Pre-washed with natural pumice stones to guarantee zero shrinkage and long-lasting structured drape.
          </p>
          <div className="pt-2">
            <Link
              href="/category/hoodies"
              className="inline-block px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-colors"
            >
              Explore Heavyweight Knits
            </Link>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              Fresh Drops
            </span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-600 transition-colors"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Value Pillars Row */}
      <section className="border-t border-zinc-200 py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-3">
                <Truck className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                Free Express Delivery
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Free 1–3 day shipping on all orders over $75 with full courier tracking.
              </p>
            </div>

            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                30-Day Hassle-Free Returns
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Prepaid return shipping label included in every domestic parcel.
              </p>
            </div>

            <div className="p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                Shop Pay & SSL Encryption
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Split your purchase into 4 zero-interest installments or checkout securely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
