import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-400">
        Error 404
      </span>
      <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-black mt-2 mb-2">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mb-3">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed mb-8">
        The piece or page you are looking for has been moved, archived, or does not exist.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back Home</span>
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-black px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <span>Shop Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
