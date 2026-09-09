import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Distraction-free Checkout Header */}
      <div className="border-b border-zinc-200 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-[0.28em] text-[#050505]">
              CHIP EMBER
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-zinc-500 uppercase -mt-0.5">
              SECURE CHECKOUT
            </span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}
