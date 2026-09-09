"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { FilterState } from "@/types";
import { FilterSidebar } from "./FilterSidebar";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

export function MobileFilters({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalCount,
}: MobileFiltersProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-up Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col animate-slide-up z-10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <h3 className="font-bold text-sm uppercase tracking-wider text-black">
            Filter Garments ({totalCount})
          </h3>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-zinc-400 hover:text-black rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
          />
        </div>

        <div className="p-4 border-t border-zinc-100 bg-white flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 border border-zinc-300 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-2 bg-black text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Show Results ({totalCount})
          </button>
        </div>
      </div>
    </div>
  );
}
