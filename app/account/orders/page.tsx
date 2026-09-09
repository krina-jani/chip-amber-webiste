import React from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderCard } from "@/components/account/OrderCard";
import { MOCK_ORDERS } from "@/data/orders";

export default function AccountOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-6">
          <div className="pb-4 border-b border-zinc-200">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              My Orders ({MOCK_ORDERS.length})
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Check delivery statuses, courier tracking, and order receipts.
            </p>
          </div>

          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
