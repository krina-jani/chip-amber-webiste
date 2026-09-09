"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const { openMobileNav } = useUIStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setToastMessage("Logged out successfully");
    setTimeout(() => setToastMessage(null), 2500);
    router.push("/");
  };

  const navLinks = [
    { label: "SHOP", href: "/shop" },
    { label: "HOODIES", href: "/category/hoodies" },
    { label: "T-SHIRTS", href: "/category/t-shirts" },
    { label: "OUTERWEAR", href: "/category/jackets" },
    { label: "PANTS", href: "/category/pants" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/98 backdrop-blur-md border-b border-[#E5E5E5] transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14 sm:h-16">
          {/* Mobile Left: Hamburger Menu */}
          <div className="flex items-center lg:hidden z-10">
            <button
              onClick={openMobileNav}
              aria-label="Open mobile navigation"
              className="p-2 -ml-2 text-[#050505] hover:text-black hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Desktop Left: Exact Links (SHOP, HOODIES, T-SHIRTS, OUTERWEAR, PANTS) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-6 xl:space-x-7 z-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/shop" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors pb-0.5 ${
                    isActive
                      ? "text-black border-b-2 border-black"
                      : "text-[#707070] hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center: Brand Logo - Absolute dead center on all screens */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center text-center pointer-events-auto z-10">
            <Link href="/" className="inline-flex flex-col items-center group">
              <span className="text-base sm:text-lg md:text-xl font-black tracking-[0.3em] text-[#050505] uppercase">
                CHIP EMBER
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-bold tracking-[0.45em] text-[#707070] uppercase -mt-0.5">
                APPAREL
              </span>
            </Link>
          </div>

          {/* Right Actions: Search, Account, Wishlist, Cart, Login/Logout */}
          <div className="flex items-center space-x-1 sm:space-x-3 z-10 ml-auto">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search garments"
                className="p-2 text-[#050505] hover:bg-zinc-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>

              {/* Desktop Account Icon */}
              <Link
                href="/account"
                aria-label="Account dashboard"
                className="hidden lg:flex p-2 text-[#050505] hover:bg-zinc-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5" strokeWidth={2} />
              </Link>

              {/* Desktop Wishlist Icon */}
              <Link
                href="/account/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="hidden lg:flex p-2 text-[#050505] hover:bg-zinc-100 rounded-full transition-colors relative"
              >
                <Heart className="w-5 h-5" strokeWidth={2} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-1 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Counter Badge */}
              <Link
                href="/cart"
                aria-label={`Shopping cart with ${itemCount} items`}
                className="p-2 text-[#050505] hover:bg-zinc-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-1 ring-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Desktop Auth Button (LOGIN / LOGOUT) */}
              <div className="hidden lg:flex items-center pl-2 border-l border-zinc-200">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-medium hidden xl:inline">
                      Hi, <strong className="text-black">{user?.name || "Chipember"}</strong>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-red-600 flex items-center gap-1 py-1 px-2 rounded-md hover:bg-zinc-100 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>LOGOUT</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-xs font-bold uppercase tracking-wider text-black hover:text-zinc-600 py-1 px-2.5 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    LOGIN
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Expandable Search Input Row */}
          {isSearchOpen && (
            <div className="py-3 border-t border-zinc-100 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hoodies, tees, outerwear, trousers..."
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2.5 p-1 text-zinc-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Logout / Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
