"use client";
import React from "react";
import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#050505] text-white text-[11px] sm:text-xs font-medium py-2 px-4 tracking-wider transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 text-zinc-300 shrink-0" strokeWidth={2.2} />
        <span className="uppercase text-[11px] font-semibold tracking-widest text-zinc-100">
          FREE SHIPPING ON ORDERS OVER $75
        </span>
      </div>
    </aside>
  );
}
