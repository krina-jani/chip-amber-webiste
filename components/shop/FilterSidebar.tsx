"use client";

import React from "react";
import { FilterState } from "@/types";
import { CATEGORIES } from "@/data/categories";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "ONE SIZE"];
const AVAILABLE_COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Charcoal", hex: "#2B2D2F" },
  { name: "Heather Gray", hex: "#A8A7A3" },
  { name: "White / Chalk", hex: "#F3F3F1" },
  { name: "Beige / Oatmeal", hex: "#E5DFD5" },
  { name: "Olive / Moss", hex: "#4A4D3B" },
  { name: "Navy", hex: "#16202C" },
  { name: "Brown / Tan", hex: "#6D5344" },
];

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <h3 className="font-bold text-black uppercase tracking-wider text-xs">Filters</h3>
        <button
          onClick={onReset}
          className="text-zinc-500 hover:text-black font-medium underline underline-offset-2"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <p className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">Category</p>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ ...filters, category: "all" })}
            className={`block w-full text-left py-1 px-1.5 rounded transition-colors ${
              filters.category === "all"
                ? "font-bold text-black bg-zinc-100"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            All Garments
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onFilterChange({ ...filters, category: cat.slug })}
              className={`block w-full text-left py-1 px-1.5 rounded transition-colors ${
                filters.category === cat.slug
                  ? "font-bold text-black bg-zinc-100"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2 pt-4 border-t border-zinc-100">
        <div className="flex items-center justify-between">
          <p className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">Max Price</p>
          <span className="font-bold text-black">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="20"
          max="250"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)],
            })
          }
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>$20</span>
          <span>$250</span>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2 pt-4 border-t border-zinc-100">
        <p className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">Size</p>
        <div className="grid grid-cols-4 gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1.5 px-1 rounded text-center font-bold text-[11px] transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "border border-zinc-200 text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2 pt-4 border-t border-zinc-100">
        <p className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">Color Palette</p>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((c) => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className={`w-6 h-6 rounded-full relative transition-transform ${
                  isSelected ? "ring-2 ring-black ring-offset-2 scale-110" : "opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                <span className="absolute inset-0 rounded-full border border-black/10" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, onSaleOnly: e.target.checked })
            }
            className="w-4 h-4 rounded border-zinc-300 accent-black text-black"
          />
          <span className="text-zinc-700 font-medium">On Sale Only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded border-zinc-300 accent-black text-black"
          />
          <span className="text-zinc-700 font-medium">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
