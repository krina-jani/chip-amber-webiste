"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Heart, MapPin, User, ShieldCheck } from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderCard } from "@/components/account/OrderCard";
import { MOCK_ORDERS } from "@/data/orders";
import { useAuthStore } from "@/store/auth-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function AccountDashboardPage() {
  const latestOrder = MOCK_ORDERS[0];
  const { user } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.getItemCount());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-8">
          {/* Welcome Card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                VIP Private Access
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mt-0.5">
                Welcome back, {user?.name || "Chipember"}
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                You have active early drop access, concierge care, and complimentary express shipping.
              </p>
            </div>
            <Link
              href="/shop"
              className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shrink-0"
            >
              Shop Collection
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/account/orders"
              className="bg-white border border-zinc-200 hover:border-black rounded-2xl p-4 transition-colors flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium">Orders Placed</span>
                <p className="text-lg font-black text-black">{MOCK_ORDERS.length}</p>
              </div>
            </Link>

            <Link
              href="/account/wishlist"
              className="bg-white border border-zinc-200 hover:border-black rounded-2xl p-4 transition-colors flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium">Saved Garments</span>
                <p className="text-lg font-black text-black">{wishlistCount} Active</p>
              </div>
            </Link>

            <Link
              href="/account/addresses"
              className="bg-white border border-zinc-200 hover:border-black rounded-2xl p-4 transition-colors flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium">Primary Address</span>
                <p className="text-xs font-bold text-black truncate max-w-[140px]">
                  Portland, OR
                </p>
              </div>
            </Link>
          </div>

          {/* Recent Order Spotlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                Recent Orders
              </h2>
              <Link
                href="/account/orders"
                className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-600"
              >
                <span>All Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {latestOrder && <OrderCard order={latestOrder} />}
          </div>

          {/* Account Information Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-600" />
                <span>Account Information</span>
              </h2>
              <Link
                href="/account/profile"
                className="text-xs text-zinc-500 hover:text-black font-semibold underline"
              >
                Edit
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-400 font-medium">Client Name</span>
                <p className="font-bold text-black text-sm mt-0.5">
                  {user?.name || "Chipember"}
                </p>
              </div>
              <div>
                <span className="text-zinc-400 font-medium">Email Address</span>
                <p className="font-bold text-black text-sm mt-0.5">
                  {user?.email || "chipember@example.com"}
                </p>
              </div>
              <div>
                <span className="text-zinc-400 font-medium">Membership Level</span>
                <p className="font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VIP Private Tier
                </p>
              </div>
              <div>
                <span className="text-zinc-400 font-medium">Security</span>
                <p className="font-medium text-zinc-700 mt-0.5">
                  Password protected (Session active)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
