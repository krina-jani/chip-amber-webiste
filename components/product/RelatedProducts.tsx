import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "YOU MAY ALSO LIKE",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 border-t border-zinc-200">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-black">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
