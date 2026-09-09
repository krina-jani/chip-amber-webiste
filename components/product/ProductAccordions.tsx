"use client";

import React, { useState } from "react";
import { ChevronDown, Star, CheckCircle } from "lucide-react";
import { Product } from "@/types";

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    materials: false,
    fit: false,
    shipping: false,
    reviews: true,
  });

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200 mt-8">
      {/* Description */}
      <div>
        <button
          onClick={() => toggle("description")}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-black"
        >
          <span>Description & Details</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
              openSections.description ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.description && (
          <div className="pb-5 text-xs text-zinc-600 leading-relaxed space-y-2">
            <p>{product.description}</p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-600 pt-1">
              <li>Double-layered architectural hood construction</li>
              <li>Seamless kangaroo pocket with reinforced bar-tacks</li>
              <li>Pre-shrunk cotton ensures shape retention after wash</li>
              <li>Custom dye process for depth of tone</li>
            </ul>
          </div>
        )}
      </div>

      {/* Materials & Care */}
      <div>
        <button
          onClick={() => toggle("materials")}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-black"
        >
          <span>Materials & Care</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
              openSections.materials ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.materials && (
          <div className="pb-5 text-xs text-zinc-600 leading-relaxed space-y-2">
            <p className="font-semibold text-zinc-800">{product.materials}</p>
            <p>
              Care instructions: Machine wash cold inside out with like colors. Do not bleach. Tumble dry low or hang dry to preserve garment drape. Cool iron if necessary.
            </p>
          </div>
        )}
      </div>

      {/* Fit & Sizing */}
      <div>
        <button
          onClick={() => toggle("fit")}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-black"
        >
          <span>Fit & Sizing</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
              openSections.fit ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.fit && (
          <div className="pb-5 text-xs text-zinc-600 leading-relaxed space-y-2">
            <p>{product.fitInfo}</p>
            <p className="text-zinc-500 italic">
              Designed with a contemporary relaxed streetwear aesthetic. Take your normal size for the intended drape, or size down for a conventional regular fit.
            </p>
          </div>
        )}
      </div>

      {/* Shipping & Returns */}
      <div>
        <button
          onClick={() => toggle("shipping")}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-black"
        >
          <span>Shipping & Returns</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
              openSections.shipping ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.shipping && (
          <div className="pb-5 text-xs text-zinc-600 leading-relaxed space-y-2">
            <p>{product.shippingInfo}</p>
            <p>{product.returnsInfo}</p>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div>
        <button
          onClick={() => toggle("reviews")}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-black"
        >
          <div className="flex items-center gap-2">
            <span>Customer Reviews</span>
            <span className="text-zinc-400 font-normal">
              ({product.reviewCount || 0})
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
              openSections.reviews ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.reviews && (
          <div className="pb-6 space-y-4">
            {/* Reviews Summary */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-black">
                  {product.rating}
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Based on {product.reviewCount} verified reviews
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4 divide-y divide-zinc-100">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-black">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400 mt-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 stroke-amber-400"
                        />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-zinc-900 mt-1.5">
                      {rev.title}
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No reviews yet for this colorway.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
