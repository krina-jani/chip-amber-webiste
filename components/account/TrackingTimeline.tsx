import React from "react";
import { Check, Clock, Package, Truck, CheckCircle2 } from "lucide-react";
import { OrderStatus } from "@/types";

interface TrackingTimelineProps {
  currentStatus: OrderStatus;
  orderDate: string;
}

const STAGES: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: "Order Placed", label: "Order Placed", icon: Clock },
  { status: "Confirmed", label: "Confirmed", icon: CheckCircle2 },
  { status: "Packed", label: "Packed", icon: Package },
  { status: "Shipped", label: "Shipped", icon: Truck },
  { status: "Out for Delivery", label: "Out for Delivery", icon: Truck },
  { status: "Delivered", label: "Delivered", icon: Check },
];

export function TrackingTimeline({
  currentStatus,
  orderDate,
}: TrackingTimelineProps) {
  const currentStageIndex = STAGES.findIndex((s) => s.status === currentStatus);
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 3;

  return (
    <div className="w-full py-6">
      {/* Desktop Horizontal View */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute left-6 right-6 top-5 h-0.5 bg-zinc-200 -z-0" />
        {/* Active Connecting Line */}
        <div
          className="absolute left-6 top-5 h-0.5 bg-black transition-all duration-700 -z-0"
          style={{
            width: `${(activeIndex / (STAGES.length - 1)) * 90}%`,
          }}
        />

        {STAGES.map((stage, idx) => {
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.status} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isPassed
                    ? "bg-black text-white shadow-xs"
                    : "bg-white border-2 border-zinc-300 text-zinc-400"
                } ${isCurrent ? "ring-4 ring-black/10 scale-110" : ""}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-bold mt-2 text-center max-w-[80px] leading-tight ${
                  isPassed ? "text-black" : "text-zinc-400 font-medium"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical View */}
      <div className="sm:hidden space-y-6 relative pl-6 border-l-2 border-zinc-200 ml-4">
        {STAGES.map((stage, idx) => {
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.status} className="relative flex items-center gap-3">
              {/* Dot / Icon */}
              <div
                className={`absolute -left-[35px] w-8 h-8 rounded-full flex items-center justify-center ${
                  isPassed
                    ? "bg-black text-white"
                    : "bg-white border-2 border-zinc-300 text-zinc-400"
                } ${isCurrent ? "ring-4 ring-black/10" : ""}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div>
                <p
                  className={`text-xs font-bold ${
                    isPassed ? "text-black" : "text-zinc-400"
                  }`}
                >
                  {stage.label}
                </p>
                {isCurrent && (
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Currently In Progress • {orderDate}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
