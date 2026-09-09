"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white sm:border sm:border-zinc-200 sm:rounded-2xl sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex flex-col items-center mb-4">
            <span className="text-base font-black tracking-[0.28em] text-[#050505]">
              CHIP EMBER
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-zinc-500 uppercase -mt-0.5">
              APPAREL
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
            Create an Account
          </h1>
          <p className="text-xs text-zinc-500">
            Enjoy priority drop notifications, express checkout, and order tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marcus"
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white"
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
                placeholder="Vance"
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white"
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
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 accent-black text-black mt-0.5"
            />
            <span className="text-[11px] text-zinc-600 leading-tight">
              I agree to the Terms of Service, Privacy Policy, and wish to receive drops and updates.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#050505] hover:bg-zinc-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-black hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
