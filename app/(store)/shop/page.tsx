"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { FilterState } from "@/types";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { MobileFilters } from "@/components/shop/MobileFilters";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { ProductGrid } from "@/components/product/ProductGrid";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    priceRange: [0, 250],
    sizes: [],
    colors: [],
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: "featured",
  });

  // Sync category param if query string changes
  React.useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setFilters((prev) => ({ ...prev, category: cat }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 250],
      sizes: [],
      colors: [],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: "featured",
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== "all") {
        if (
          product.category !== filters.category &&
          product.subCategory !== filters.category
        ) {
          return false;
        }
      }

      // Price filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((s) => product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some((filterCol) =>
          product.colors.some((c) =>
            c.name.toLowerCase().includes(filterCol.toLowerCase())
          )
        );
        if (!hasColor) return false;
      }

      // Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Sale filter
      if (filters.onSaleOnly && !product.discountPercentage) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "bestseller") {
        return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      }
      if (filters.sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (filters.sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (filters.sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0; // "featured"
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800 font-semibold">Catalog</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
            All Garments
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Engineered silhouettes in heavyweight organic cotton and technical wool.
          </p>
        </div>

        {/* Action Controls: Mobile filter trigger + Sort dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-zinc-200 bg-white py-2 px-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-50 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {filteredProducts.length}
            </span>
          </button>

          <SortDropdown
            value={filters.sortBy}
            onChange={(val) => setFilters({ ...filters, sortBy: val })}
          />
        </div>
      </div>

      {/* Layout Grid: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">
              Showing {filteredProducts.length} results
            </span>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalCount={filteredProducts.length}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-xs text-zinc-400">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
