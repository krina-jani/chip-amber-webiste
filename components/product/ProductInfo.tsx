"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  Ruler,
  Package,
  Heart,
  ShieldCheck,
  RotateCcw,
  Truck,
  Check,
  X,
} from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { PRODUCTS } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: "Charcoal", hex: "#2B2D2F" }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[1] || product.sizes[0] || "M"
  );
  const [isAdded, setIsAdded] = useState(false);
  const [isBundleAdded, setIsBundleAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Bundle product lookup
  const bundleProduct = product.bundleProductSlug
    ? PRODUCTS.find((p) => p.slug === product.bundleProductSlug)
    : null;

  const installmentAmount = (product.price / 4).toFixed(2);

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedColor.name}-${selectedSize}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
      },
      1
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyItNow = () => {
    addItem(
      {
        id: `${product.id}-${selectedColor.name}-${selectedSize}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
      },
      1
    );
    router.push("/checkout");
  };

  const handleAddBundle = () => {
    // Add main product
    addItem(
      {
        id: `${product.id}-${selectedColor.name}-${selectedSize}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
      },
      1
    );

    // Add bundled companion product with 15% discount
    if (bundleProduct) {
      const bundlePrice = parseFloat(
        (bundleProduct.price * 0.85).toFixed(2)
      );
      addItem(
        {
          id: `${bundleProduct.id}-${bundleProduct.colors[0]?.name || "Default"}-${selectedSize}`,
          productId: bundleProduct.id,
          slug: bundleProduct.slug,
          name: `${bundleProduct.name} (Bundle Deal)`,
          price: bundlePrice,
          originalPrice: bundleProduct.price,
          image: bundleProduct.images[0],
          color: bundleProduct.colors[0] || { name: "Default", hex: "#000" },
          size: selectedSize,
        },
        1
      );
    }

    setIsBundleAdded(true);
    setTimeout(() => setIsBundleAdded(false), 2000);
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-5">
      {/* Eyebrow / Fit Label */}
      {product.fitLabel && (
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">
          {product.fitLabel}
        </p>
      )}

      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#050505] -mt-1">
        {product.name}
      </h1>

      {/* Rating Row */}
      <div className="flex items-center gap-1.5 -mt-1">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm font-bold text-zinc-900">
          {product.rating}
        </span>
        <span className="text-xs text-zinc-500 font-medium">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Pricing Row matching reference */}
      <div className="flex items-baseline gap-2.5 pt-0.5">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#050505]">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-base sm:text-lg text-zinc-400 line-through font-medium">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
        {product.discountPercentage && (
          <span className="bg-[#DDF4DD] text-[#168316] text-xs font-bold px-2 py-0.5 rounded-sm tracking-wide">
            SAVE {product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Payment installment info */}
      <div className="text-xs text-zinc-600 flex items-center flex-wrap gap-1">
        <span>or 4 interest-free payments of</span>
        <strong className="font-bold text-black">${installmentAmount}</strong>
        <span>with</span>
        <span className="bg-[#5A31F4] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-tight">
          shop Pay
        </span>
      </div>

      {/* Color Selector */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-zinc-900">
            Color:{" "}
            <span className="font-normal text-zinc-600">
              {selectedColor.name}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                title={color.name}
                aria-label={color.name}
                className={`relative w-7 h-7 rounded-full transition-all flex items-center justify-center ${
                  isSelected
                    ? "ring-2 ring-black ring-offset-2 scale-105"
                    : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {/* Subtle border if white/light color */}
                <span className="absolute inset-0 rounded-full border border-black/10" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selector */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-zinc-900">
            Size: <span className="font-normal text-zinc-600">{selectedSize}</span>
          </p>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-xs text-zinc-500 hover:text-black flex items-center gap-1 font-medium underline underline-offset-2"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide</span>
          </button>
        </div>

        {/* Size buttons row matching reference */}
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "border-2 border-black bg-white text-black shadow-xs"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Benefits Sand Banner matching reference */}
      <div className="bg-[#FBF8F2] border border-[#EDE6DA] rounded-xl p-3 sm:p-3.5">
        <div className="grid grid-cols-3 divide-x divide-[#EDE6DA] text-center">
          <div className="px-1.5 flex flex-col items-center">
            <Package className="w-4 h-4 text-zinc-700 mb-1" strokeWidth={1.8} />
            <p className="text-[10px] font-bold text-zinc-900 leading-tight">
              Premium Heavyweight
            </p>
            <p className="text-[9px] text-zinc-500 mt-0.5">
              {product.gsm ? `${product.gsm} GSM` : "Custom Milled"}
            </p>
          </div>
          <div className="px-1.5 flex flex-col items-center">
            <Heart className="w-4 h-4 text-zinc-700 mb-1" strokeWidth={1.8} />
            <p className="text-[10px] font-bold text-zinc-900 leading-tight">
              Soft & Durable
            </p>
            <p className="text-[9px] text-zinc-500 mt-0.5">Cotton Blend</p>
          </div>
          <div className="px-1.5 flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-zinc-700 mb-1" strokeWidth={1.8} />
            <p className="text-[10px] font-bold text-zinc-900 leading-tight">
              Designed for
            </p>
            <p className="text-[9px] text-zinc-500 mt-0.5">Everyday Wear</p>
          </div>
        </div>
      </div>

      {/* Bundle & Save 15% Banner matching reference */}
      {bundleProduct && (
        <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-11 h-13 rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-zinc-400">+</span>
            <div className="relative w-11 h-13 rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
              <Image
                src={bundleProduct.images[0]}
                alt={bundleProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-1">
              <p className="text-xs font-black tracking-wide uppercase text-zinc-900">
                BUNDLE & SAVE 15%
              </p>
              <p className="text-[10px] text-zinc-500">
                Add any tee to your order
              </p>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              isBundleAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#050505] text-white hover:bg-zinc-800"
            }`}
          >
            {isBundleAdded ? "ADDED ✓" : "ADD BUNDLE"}
          </button>
        </div>
      )}

      {/* Primary CTA: Green Button matching reference */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={handleAddToCart}
          id="main-add-to-cart-btn"
          className="w-full bg-[#1FA51F] hover:bg-[#168316] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" strokeWidth={2.5} />
              <span>ADDED TO CART!</span>
            </>
          ) : (
            <span>ADD TO CART • ${product.price.toFixed(2)}</span>
          )}
        </button>

        {/* Secondary CTA: Black Buy It Now Button */}
        <button
          onClick={handleBuyItNow}
          className="w-full bg-[#050505] hover:bg-zinc-800 text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99]"
        >
          Buy it now
        </button>
      </div>

      {/* Trust Information 3-Column row matching reference */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-center text-zinc-600">
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-zinc-700 mb-1" />
          <p className="text-[10px] font-bold text-zinc-900">Secure Checkout</p>
          <p className="text-[9px] text-zinc-400">SSL Encrypted</p>
        </div>
        <div className="flex flex-col items-center">
          <RotateCcw className="w-4 h-4 text-zinc-700 mb-1" />
          <p className="text-[10px] font-bold text-zinc-900">Easy Returns</p>
          <p className="text-[9px] text-zinc-400">30-Day Returns</p>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-4 h-4 text-zinc-700 mb-1" />
          <p className="text-[10px] font-bold text-zinc-900">1–3 Day Shipping</p>
          <p className="text-[9px] text-zinc-400">Fast & Reliable</p>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative animate-fade-in shadow-2xl">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold uppercase tracking-wide text-black mb-1">
              Size Guide — {product.name}
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              All measurements are in inches (in) with garment laid flat.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-zinc-200 text-zinc-500 uppercase">
                  <tr>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Chest</th>
                    <th className="py-2 px-3">Length</th>
                    <th className="py-2 px-3">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold">S</td>
                    <td className="py-2.5 px-3">24.5&quot;</td>
                    <td className="py-2.5 px-3">27.0&quot;</td>
                    <td className="py-2.5 px-3">33.5&quot;</td>
                  </tr>
                  <tr className="bg-zinc-50">
                    <td className="py-2.5 px-3 font-bold">M</td>
                    <td className="py-2.5 px-3">25.5&quot;</td>
                    <td className="py-2.5 px-3">28.0&quot;</td>
                    <td className="py-2.5 px-3">34.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">L</td>
                    <td className="py-2.5 px-3">26.5&quot;</td>
                    <td className="py-2.5 px-3">29.0&quot;</td>
                    <td className="py-2.5 px-3">35.5&quot;</td>
                  </tr>
                  <tr className="bg-zinc-50">
                    <td className="py-2.5 px-3 font-bold">XL</td>
                    <td className="py-2.5 px-3">27.5&quot;</td>
                    <td className="py-2.5 px-3">30.0&quot;</td>
                    <td className="py-2.5 px-3">36.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">XXL</td>
                    <td className="py-2.5 px-3">28.5&quot;</td>
                    <td className="py-2.5 px-3">31.0&quot;</td>
                    <td className="py-2.5 px-3">37.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="bg-black text-white px-5 py-2 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
