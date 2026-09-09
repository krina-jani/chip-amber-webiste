"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export function ProfileForm() {
  const [firstName, setFirstName] = useState("Marcus");
  const [lastName, setLastName] = useState("Vance");
  const [email, setEmail] = useState("marcus.vance@example.com");
  const [phone, setPhone] = useState("+1 (555) 234-8901");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-4 max-w-xl">
      <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-zinc-100">
        Personal Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Changes Saved</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>
    </form>
  );
}
