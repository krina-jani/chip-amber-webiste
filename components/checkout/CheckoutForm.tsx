"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CheckoutForm() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getShipping, getTotal, clearCart } =
    useCartStore();

  const [email, setEmail] = useState("marcus.vance@example.com");
  const [firstName, setFirstName] = useState("Marcus");
  const [lastName, setLastName] = useState("Vance");
  const [phone, setPhone] = useState("+1 (555) 234-8901");
  const [address, setAddress] = useState("742 Evergreen Terrace");
  const [apartment, setApartment] = useState("Apt 4B");
  const [city, setCity] = useState("Portland");
  const [state, setState] = useState("OR");
  const [zip, setZip] = useState("97201");
  const [country, setCountry] = useState("United States");

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "shoppay" | "upi" | "cod"
  >("card");

  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const baseShipping = getShipping();
  const deliveryExtra = deliveryMethod === "express" ? 12.0 : 0.0;
  const shippingTotal = baseShipping + deliveryExtra;
  const grandTotal = Math.max(0, subtotal - discount + shippingTotal);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmitOrder} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                1. Contact Information
              </h2>
              <Link href="/login" className="text-xs text-zinc-500 hover:text-black underline">
                Already have an account? Sign in
              </Link>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Mobile Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="space-y-4 pt-6 border-t border-zinc-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              2. Shipping Address
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Apartment, Suite, Unit (Optional)
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>France</option>
                <option>Japan</option>
              </select>
            </div>
          </div>

          {/* Section 3: Delivery Options */}
          <div className="space-y-4 pt-6 border-t border-zinc-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              3. Delivery Speed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryMethod("standard")}
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryMethod === "standard"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "standard"}
                  onChange={() => setDeliveryMethod("standard")}
                  className="mt-1 accent-black"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-zinc-700" />
                    <p className="text-xs font-bold text-black">Standard Ground (3–5 Days)</p>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {baseShipping === 0 ? "FREE on orders over $75" : "$8.00 flat rate"}
                  </p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryMethod("express")}
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryMethod === "express"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "express"}
                  onChange={() => setDeliveryMethod("express")}
                  className="mt-1 accent-black"
                />
                <div>
                  <p className="text-xs font-bold text-black">Priority Express (1–2 Days)</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Guaranteed overnight air: +$12.00
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Payment */}
          <div className="space-y-4 pt-6 border-t border-zinc-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              4. Payment Method
            </h2>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "card", label: "Credit Card", icon: CreditCard },
                { id: "shoppay", label: "Shop Pay", badge: "Installments" },
                { id: "upi", label: "UPI / QR" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center ${
                    paymentMethod === m.id
                      ? "border-2 border-black bg-white text-black shadow-xs"
                      : "border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Card Inputs */}
            {paymentMethod === "card" && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full pl-3 pr-10 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-mono"
                    />
                    <Lock className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "shoppay" && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 animate-fade-in">
                <p className="font-bold mb-1">Shop Pay One-Click Checkout</p>
                <p className="text-purple-700">
                  Pay in 4 interest-free installments of ${(grandTotal / 4).toFixed(2)}. No hidden fees.
                </p>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 animate-fade-in">
                <p className="font-bold text-black mb-1">Instant UPI Transfer</p>
                <p>A dynamic QR code and VPA link will be displayed to authorize your payment.</p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 animate-fade-in">
                <p className="font-bold text-black mb-1">Cash on Delivery</p>
                <p>Pay cash upon physical delivery. Exact change requested by courier.</p>
              </div>
            )}
          </div>

          {/* Place Order CTA on Mobile */}
          <div className="lg:hidden pt-4">
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-[#1FA51F] hover:bg-[#168316] text-white py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all disabled:bg-zinc-300 shadow-md"
            >
              {isSubmitting ? "Authorizing Order..." : `Pay $${grandTotal.toFixed(2)}`}
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Review */}
        <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-zinc-200">
            Order Review ({items.length} garments)
          </h2>

          {/* Items Preview */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center text-xs">
                <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-white border border-zinc-200 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-bl flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-black uppercase tracking-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-zinc-500 text-[11px]">
                    {item.color.name} • {item.size}
                  </p>
                </div>
                <span className="font-bold text-black shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Lines */}
          <div className="space-y-2 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promotional Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-black">
                {shippingTotal === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${shippingTotal.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-black pt-3 border-t border-zinc-200">
              <span>Total Amount</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA on Desktop */}
          <div className="hidden lg:block pt-3">
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-[#1FA51F] hover:bg-[#168316] text-white py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all disabled:bg-zinc-300 shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Pay ${grandTotal.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-zinc-700" />
            <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
          </div>
        </div>
      </div>
    </form>
  );
}
