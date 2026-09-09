"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";

export function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const { openSearchModal } = useUIStore();

  const navItems = [
    { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
    { href: "/shop", label: "Shop", icon: Compass, match: (p: string) => p.startsWith("/shop") || p.startsWith("/category") },
    {
      href: "/search",
      label: "Search",
      icon: Search,
      match: (p: string) => p.startsWith("/search"),
      onClick: (e: React.MouseEvent) => {
        // can trigger modal directly or navigate
      },
    },
    {
      href: "/account/wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistCount,
      match: (p: string) => p === "/account/wishlist",
    },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingBag,
      badge: itemCount,
      match: (p: string) => p === "/cart",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center relative py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? "text-black font-semibold" : "text-zinc-500 hover:text-black"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110 stroke-[2.4]" : "stroke-[1.7]"}`} />
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? "font-bold text-black" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
