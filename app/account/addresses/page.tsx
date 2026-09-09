"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AddressCard } from "@/components/account/AddressCard";
import { Address } from "@/types";

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    name: "Marcus Vance",
    phone: "+1 (555) 234-8901",
    address: "742 Evergreen Terrace",
    apartment: "Apt 4B",
    city: "Portland",
    state: "OR",
    zip: "97201",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Marcus Vance (Studio)",
    phone: "+1 (555) 890-1234",
    address: "1080 Industrial Blvd",
    apartment: "Suite 300",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "United States",
    isDefault: false,
  },
];

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New address form state
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newApartment, setNewApartment] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Address = {
      id: `addr-${Date.now()}`,
      name: newName,
      phone: newPhone,
      address: newStreet,
      apartment: newApartment,
      city: newCity,
      state: newState,
      zip: newZip,
      country: "United States",
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newEntry]);
    setIsModalOpen(false);
    setNewName("");
    setNewPhone("");
    setNewStreet("");
    setNewApartment("");
    setNewCity("");
    setNewState("");
    setNewZip("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                Saved Addresses
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Manage your primary shipping and studio destinations.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative animate-fade-in shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold uppercase tracking-wide text-black mb-4">
              Add New Address
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Full Name / Label
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Home or Marcus Vance"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="Street and house number"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Apartment, Suite (Optional)
                </label>
                <input
                  type="text"
                  value={newApartment}
                  onChange={(e) => setNewApartment(e.target.value)}
                  placeholder="Apt 2B"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    ZIP
                  </label>
                  <input
                    type="text"
                    required
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-200 rounded-lg font-bold text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-lg font-bold hover:bg-zinc-800"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
