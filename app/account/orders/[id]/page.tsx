import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Truck, ShieldCheck, MapPin } from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { TrackingTimeline } from "@/components/account/TrackingTimeline";
import { MOCK_ORDERS } from "@/data/orders";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_ORDERS.map((order) => ({
    id: order.id,
  }));
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-6">
          {/* Back Navigation */}
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>

          {/* Header Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                  Tracking Detail
                </span>
                <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black mt-0.5">
                  Order {order.orderNumber}
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Placed on {order.date} • Carrier: {order.carrier}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    order.status === "Delivered"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Visual Tracking Timeline */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                Delivery Progression
              </p>
              <TrackingTimeline
                currentStatus={order.status}
                orderDate={order.date}
              />
            </div>

            {/* Items in this Order */}
            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-black">
                Garments in this Shipment
              </p>
              <div className="divide-y divide-zinc-100">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 first:pt-0 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-bold text-black uppercase hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-zinc-500 text-[11px] mt-0.5">
                          {item.color} • Size {item.size} • Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Pricing Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 text-xs">
              {/* Shipping & Payment */}
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-black uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Destination Address</span>
                  </p>
                  <p className="text-zinc-600">{order.shippingAddress.name}</p>
                  <p className="text-zinc-600">
                    {order.shippingAddress.address}, {order.shippingAddress.apartment}
                  </p>
                  <p className="text-zinc-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}, {order.shippingAddress.country}
                  </p>
                  <p className="text-zinc-400 mt-1">{order.shippingAddress.phone}</p>
                </div>

                <div>
                  <p className="font-bold text-black uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Payment Method</span>
                  </p>
                  <p className="text-zinc-600">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-zinc-50 p-4 rounded-xl space-y-2">
                <p className="font-bold text-black uppercase tracking-wider text-[11px] pb-1 border-b border-zinc-200">
                  Payment Summary
                </p>
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-black">
                    {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Tax</span>
                  <span className="font-semibold text-black">
                    ${order.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-zinc-200">
                  <span>Total Paid</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
