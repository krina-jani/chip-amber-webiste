"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  LogOut,
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuthStore } from "@/store/auth-store";

export function AccountSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
    {
      href: "/account/wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistCount,
    },
    { href: "/account/profile", label: "Profile Settings", icon: User },
    { href: "/account/addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-6">
        {/* User Card */}
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
          <div className="w-10 h-10 rounded-full bg-black text-white font-bold text-xs uppercase flex items-center justify-center">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "CE"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-black truncate">
              {user?.name || "Chipember"}
            </p>
            <p className="text-[11px] text-zinc-500 truncate">
              {user?.email || "chipember@example.com"}
            </p>
          </div>
        </div>

        {/* Links */}
        <nav aria-label="Account Navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white text-black" : "bg-zinc-200 text-zinc-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors pt-2 text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
