"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, ShieldCheck, RefreshCw, Truck } from "lucide-react";

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const footerLinks = {
    shop: [
      { label: "Hoodies & Sweats", href: "/category/hoodies" },
      { label: "T-Shirts & Tops", href: "/category/t-shirts" },
      { label: "Jackets & Outerwear", href: "/category/jackets" },
      { label: "Pants & Trousers", href: "/category/pants" },
      { label: "Men's Collection", href: "/category/men" },
      { label: "Women's Collection", href: "/category/women" },
    ],
    help: [
      { label: "Shipping & Delivery", href: "/account/orders" },
      { label: "Returns & Exchanges", href: "/account/orders" },
      { label: "Size Guide", href: "/product/shadow-oversized-hoodie" },
      { label: "Order Tracking", href: "/account/orders" },
      { label: "Contact Us", href: "#" },
    ],
    account: [
      { label: "Account Dashboard", href: "/account" },
      { label: "My Orders", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Saved Addresses", href: "/account/addresses" },
      { label: "Sign In / Register", href: "/login" },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-12 pb-24 lg:pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-zinc-800">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Complimentary Delivery</p>
              <p className="text-xs text-zinc-400">On all orders over $75 within 1–3 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">30-Day Free Returns</p>
              <p className="text-xs text-zinc-400">Prepaid shipping labels included</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Encrypted Checkout</p>
              <p className="text-xs text-zinc-400">Shop Pay, Card, and Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex flex-col">
              <span className="text-lg font-black tracking-[0.3em] text-white">
                CHIP EMBER
              </span>
              <span className="text-[9px] font-bold tracking-[0.45em] text-zinc-400 uppercase -mt-0.5">
                APPAREL
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Architectural proportions, heavyweight custom-milled organic cotton, and minimalist Scandinavian utility designed for everyday wear.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-2">
                Join the Private Circle
              </p>
              {newsletterSubscribed ? (
                <p className="text-xs text-emerald-400 font-medium">
                  ✓ Thank you. You are on the priority list.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-xs text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-white text-black px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Columns (Desktop grid, Mobile accordion) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* Shop Links */}
            <div>
              <button
                onClick={() => toggleSection("shop")}
                className="w-full sm:pointer-events-none flex items-center justify-between py-2 sm:py-0 text-xs font-bold uppercase tracking-wider text-white mb-3"
              >
                <span>Shop</span>
                <ChevronDown className="w-4 h-4 sm:hidden text-zinc-400" />
              </button>
              <ul
                className={`space-y-2 text-xs text-zinc-400 ${
                  openSections["shop"] ? "block" : "hidden sm:block"
                }`}
              >
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <button
                onClick={() => toggleSection("help")}
                className="w-full sm:pointer-events-none flex items-center justify-between py-2 sm:py-0 text-xs font-bold uppercase tracking-wider text-white mb-3"
              >
                <span>Client Care</span>
                <ChevronDown className="w-4 h-4 sm:hidden text-zinc-400" />
              </button>
              <ul
                className={`space-y-2 text-xs text-zinc-400 ${
                  openSections["help"] ? "block" : "hidden sm:block"
                }`}
              >
                {footerLinks.help.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <button
                onClick={() => toggleSection("account")}
                className="w-full sm:pointer-events-none flex items-center justify-between py-2 sm:py-0 text-xs font-bold uppercase tracking-wider text-white mb-3"
              >
                <span>Account</span>
                <ChevronDown className="w-4 h-4 sm:hidden text-zinc-400" />
              </button>
              <ul
                className={`space-y-2 text-xs text-zinc-400 ${
                  openSections["account"] ? "block" : "hidden sm:block"
                }`}
              >
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} CHIP EMBER APPAREL. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
