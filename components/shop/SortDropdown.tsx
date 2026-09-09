"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { FilterState } from "@/types";

interface SortDropdownProps {
  value: FilterState["sortBy"];
  onChange: (val: FilterState["sortBy"]) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <span className="hidden sm:inline font-medium">Sort by:</span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as FilterState["sortBy"])}
            className="appearance-none bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg py-2 pl-3 pr-8 text-xs font-bold text-zinc-900 cursor-pointer focus:outline-none focus:border-black transition-colors"
          >
            <option value="featured">Featured Collection</option>
            <option value="bestseller">Best Sellers</option>
            <option value="newest">New Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
