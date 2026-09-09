"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, ChevronRight, User, Heart, ShoppingBag, LogOut, LogIn } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuthStore } from "@/store/auth-store";

export function MobileNavDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobileNavOpen, closeMobileNav } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const { isAuthenticated, user, logout } = useAuthStore();

  // Close drawer on route change
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  const handleLogout = () => {
    logout();
    closeMobileNav();
    router.push("/");
  };

  if (!isMobileNavOpen) return null;

  const mainNavItems = [
    { href: "/shop", label: "SHOP" },
    { href: "/category/hoodies", label: "HOODIES" },
    { href: "/category/t-shirts", label: "T-SHIRTS" },
    { href: "/category/jackets", label: "OUTERWEAR" },
    { href: "/category/pants", label: "PANTS" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeMobileNav}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-[85%] w-80 bg-white shadow-2xl flex flex-col z-10 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <Link href="/" onClick={closeMobileNav} className="flex flex-col">
            <span className="text-base font-black tracking-[0.28em] text-[#050505]">
              CHIP EMBER
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-zinc-500 uppercase -mt-0.5">
              APPAREL
            </span>
          </Link>
          <button
            onClick={closeMobileNav}
            aria-label="Close navigation"
            className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status if Logged In */}
        {isAuthenticated && (
          <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 text-xs text-zinc-600">
            Signed in as <strong className="text-black font-semibold">{user?.name || "Chipember"}</strong>
          </div>
        )}

        {/* Navigation Sections matching prompt */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Main Category Links: SHOP, HOODIES, T-SHIRTS, OUTERWEAR, PANTS */}
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className="flex items-center justify-between py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200" />

          {/* LOGIN / LOGOUT Section */}
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4" />
                  <span>LOGOUT</span>
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileNav}
                className="flex items-center justify-between py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="w-4 h-4 text-zinc-600" />
                  <span>LOGIN</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200" />

          {/* WISHLIST & ACCOUNT Section */}
          <div className="space-y-1">
            <Link
              href="/account/wishlist"
              onClick={closeMobileNav}
              className="flex items-center justify-between py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-zinc-500" />
                <span>WISHLIST</span>
              </div>
              {wishlistCount > 0 && (
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              onClick={closeMobileNav}
              className="flex items-center justify-between py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-zinc-500" />
                <span>ACCOUNT</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50">
          <Link
            href="/cart"
            onClick={closeMobileNav}
            className="w-full bg-[#050505] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>VIEW CART ({itemCount})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
