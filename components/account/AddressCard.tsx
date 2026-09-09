"use client";

import React from "react";
import { MapPin, Check, Trash2, Edit2 } from "lucide-react";
import { Address } from "@/types";

interface AddressCardProps {
  address: Address;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export function AddressCard({
  address,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 relative hover:border-zinc-300 transition-colors flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              {address.name}
            </h4>
          </div>
          {address.isDefault && (
            <span className="bg-zinc-100 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" />
              Default Address
            </span>
          )}
        </div>

        <div className="text-xs text-zinc-600 space-y-1 pl-6">
          <p>{address.address}</p>
          {address.apartment && <p>{address.apartment}</p>}
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
          <p>{address.country}</p>
          <p className="text-zinc-400 pt-1">{address.phone}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 pl-6 text-xs">
        {!address.isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-zinc-600 hover:text-black font-semibold underline"
          >
            Set as Default
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <button
            title="Edit"
            className="text-zinc-400 hover:text-black p-1 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(address.id)}
              title="Delete"
              className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
