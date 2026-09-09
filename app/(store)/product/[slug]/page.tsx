import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyProductBar } from "@/components/product/StickyProductBar";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or others
  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.category === product.category || p.featured)
  ).slice(0, 4);

  const categoryLabel =
    product.category === "jackets"
      ? "Outerwear"
      : product.category === "t-shirts"
      ? "T-Shirts"
      : product.category === "hoodies"
      ? "Hoodies"
      : product.category === "pants"
      ? "Pants"
      : product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-black transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-black transition-colors"
        >
          {categoryLabel}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800 font-semibold truncate max-w-[160px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase: 2 Columns on Desktop, Clean Reference Stack on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            hasVideo={product.hasVideo}
            badge={product.badge}
          />
        </div>

        {/* Right Column: Product Information & Purchase Options */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Accordions: Description, Materials, Fit, Shipping, Reviews */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
        <ProductAccordions product={product} />
      </div>

      {/* Related Products: YOU MAY ALSO LIKE */}
      <div className="mt-8">
        <RelatedProducts products={related} title="YOU MAY ALSO LIKE" />
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <StickyProductBar product={product} />
    </div>
  );
}
