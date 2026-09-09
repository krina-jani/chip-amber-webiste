import React from "react";
import Link from "next/link";
import { CheckCircle, Truck, Package, ArrowRight } from "lucide-react";
import { MOCK_ORDERS } from "@/data/orders";

export default function OrderConfirmationPage() {
  const order = MOCK_ORDERS[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in">
        <CheckCircle className="w-9 h-9" strokeWidth={2.2} />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
        Order Authorized & Confirmed
      </span>
      <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mt-1 mb-2">
        Thank you for your order!
      </h1>
      <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mb-8">
        We have sent an order confirmation and courier tracking link to{" "}
        <strong className="text-black font-semibold">
          {order.shippingAddress.email || "your email address"}
        </strong>
        .
      </p>

      {/* Order Details Card */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-left space-y-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-zinc-200 text-xs">
          <div>
            <span className="text-zinc-400 font-medium">Order Number</span>
            <p className="font-bold text-black text-sm">{order.orderNumber}</p>
          </div>
          <div>
            <span className="text-zinc-400 font-medium">Date</span>
            <p className="font-bold text-black">{order.date}</p>
          </div>
          <div>
            <span className="text-zinc-400 font-medium">Estimated Arrival</span>
            <p className="font-bold text-emerald-600 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {order.estimatedDelivery}
            </p>
          </div>
          <div>
            <span className="text-zinc-400 font-medium">Total Paid</span>
            <p className="font-extrabold text-black text-sm">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="text-xs text-zinc-600 space-y-1">
          <p className="font-bold text-black uppercase tracking-wider text-[11px] mb-1">
            Shipping Destination
          </p>
          <p>{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.address}, {order.shippingAddress.apartment}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}, {order.shippingAddress.country}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/account/orders/${order.id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <Package className="w-4 h-4" />
          <span>Track Order</span>
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-black px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
