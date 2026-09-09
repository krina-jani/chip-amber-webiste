"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Tag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CartSummary() {
  const {
    items,
    coupon,
    getSubtotal,
    getDiscount,
    getShipping,
    getTotal,
    getRemainingForFreeShipping,
    getFreeShippingProgress,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();
  const remainingFree = getRemainingForFreeShipping();
  const progressPercent = getFreeShippingProgress();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyCoupon(promoInput);
    if (result.success) {
      setPromoMessage({ text: result.message, isError: false });
      setPromoInput("");
    } else {
      setPromoMessage({ text: result.message, isError: true });
    }
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-5">
      <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-zinc-200">
        Order Summary
      </h3>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-white p-3.5 rounded-xl border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-zinc-700" />
            <span className="font-semibold text-zinc-900">
              {remainingFree <= 0
                ? "You unlocked FREE Shipping!"
                : `Add $${remainingFree.toFixed(2)} for Free Shipping`}
            </span>
          </div>
          <span className="font-bold text-zinc-500">{progressPercent}%</span>
        </div>
        {/* Bar */}
        <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#1FA51F] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Coupon / Promo Box */}
      <div>
        {coupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>Coupon Applied: {coupon}</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (try SAVE10)"
              className="flex-1 bg-white border border-zinc-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-black uppercase"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-zinc-800 transition-colors shrink-0"
            >
              Apply
            </button>
          </form>
        )}
        {promoMessage && (
          <p
            className={`text-[11px] mt-1.5 font-medium ${
              promoMessage.isError ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {promoMessage.text}
          </p>
        )}
      </div>

      {/* Pricing Lines */}
      <div className="space-y-2 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-black">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Taxes</span>
          <span className="text-zinc-500">Calculated at checkout</span>
        </div>

        <div className="flex justify-between text-sm font-extrabold text-black pt-3 border-t border-zinc-200">
          <span>Estimated Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Primary Checkout CTA */}
      <div className="space-y-2.5 pt-2">
        <Link
          href="/checkout"
          className={`w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            items.length === 0
              ? "bg-zinc-200 text-zinc-400 pointer-events-none"
              : "bg-[#1FA51F] hover:bg-[#168316] text-white shadow-xs"
          }`}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/shop"
          className="w-full block text-center py-2.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="pt-3 border-t border-zinc-200 flex items-center justify-center gap-4 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
          <span>Encrypted Checkout</span>
        </div>
        <span>•</span>
        <span>30-Day Guarantee</span>
      </div>
    </div>
  );
}
