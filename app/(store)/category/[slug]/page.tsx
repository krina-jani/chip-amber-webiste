import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter products belonging to this category or subcategory
  const products = PRODUCTS.filter(
    (p) => p.category === slug || p.subCategory === slug
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-black transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800 font-semibold">{category.name}</span>
      </nav>

      {/* Category Banner */}
      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 bg-zinc-900 flex items-center p-6 sm:p-10 text-white shadow-sm">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">
            Collection Spotlight
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
        <span className="text-xs font-semibold text-zinc-500">
          Showing {products.length} garments
        </span>
        <Link
          href={`/shop?category=${category.slug}`}
          className="text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4 hover:text-zinc-600"
        >
          Detailed Filter View
        </Link>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={products}
        emptyMessage={`No products currently available in ${category.name}. Check back soon for the next drop.`}
      />
    </div>
  );
}
