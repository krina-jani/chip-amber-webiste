"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { FilterState } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<FilterState["sortBy"]>("featured");

  // Sync when query param changes
  React.useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setActiveQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query.trim());
  };

  const results = useMemo(() => {
    if (!activeQuery) {
      return PRODUCTS.slice(0, 8);
    }
    const clean = activeQuery.toLowerCase();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        p.fitLabel?.toLowerCase().includes(clean) ||
        p.colors.some((c) => c.name.toLowerCase().includes(clean))
      );
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "bestseller") return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return 0;
    });
  }, [activeQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800 font-semibold">Search</span>
      </nav>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto my-6">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, tees, outerwear..."
            className="w-full pl-10 pr-24 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 mb-6 sm:mb-8">
        <div>
          <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
            {activeQuery ? (
              <>
                Search results for &ldquo;{activeQuery}&rdquo;
              </>
            ) : (
              "Explore All Pieces"
            )}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {results.length} garments found
          </p>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Results or Empty State */}
      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="text-center py-16 px-4 bg-zinc-50 rounded-2xl border border-zinc-200 max-w-lg mx-auto">
          <p className="text-base font-bold text-black mb-1">No products found</p>
          <p className="text-xs text-zinc-500 mb-6">
            We couldn&apos;t find any garments matching &ldquo;{activeQuery}&rdquo;. Try another term or explore popular categories below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="text-xs font-semibold bg-white border border-zinc-200 px-3 py-1.5 rounded-lg hover:border-black text-zinc-800"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/shop"
              className="text-xs font-bold bg-black text-white px-4 py-1.5 rounded-lg hover:bg-zinc-800"
            >
              View Best Sellers
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-xs text-zinc-400">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
