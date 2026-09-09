import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Truck } from "lucide-react";
import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-6 space-y-4 hover:border-zinc-300 transition-colors">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div>
          <span className="text-xs text-zinc-400 font-medium">Order Number</span>
          <p className="text-sm font-black text-black tracking-wide">{order.orderNumber}</p>
        </div>
        <div>
          <span className="text-xs text-zinc-400 font-medium">Date Placed</span>
          <p className="text-xs font-bold text-zinc-800">{order.date}</p>
        </div>
        <div>
          <span className="text-xs text-zinc-400 font-medium">Total</span>
          <p className="text-sm font-black text-black">${order.total.toFixed(2)}</p>
        </div>
        <div>
          <span
            className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              order.status === "Delivered"
                ? "bg-emerald-100 text-emerald-800"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="flex flex-wrap items-center gap-3">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 rounded-xl p-2 pr-4"
          >
            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-black uppercase line-clamp-1">
                {item.name}
              </p>
              <p className="text-[11px] text-zinc-500">
                {item.color} • Size {item.size} • Qty {item.quantity}
              </p>
              <p className="text-[11px] font-extrabold text-black">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <Truck className="w-4 h-4 text-zinc-500" />
          <span>
            {order.carrier}: <strong className="text-black font-semibold">{order.trackingNumber}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <span>Track Order</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
