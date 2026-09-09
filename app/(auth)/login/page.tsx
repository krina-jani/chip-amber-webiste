"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/account";

  const { login, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("chipember");
  const [password, setPassword] = useState("chipember");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = login(username, password);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push(redirectPath);
      }, 500);
    } else {
      setErrorMessage(result.message || "Invalid username or password.");
    }
  };

  return (
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
          Welcome Back
        </h1>
        <p className="text-xs text-zinc-500">
          Sign in with your private client credentials.
        </p>
      </div>

      {/* Demo Credentials Box */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-600">
        <p className="font-bold text-black uppercase tracking-wider text-[10px] mb-1">
          Demo Access Credentials
        </p>
        <div className="flex items-center justify-between text-[11px]">
          <span>Username: <strong className="text-black font-semibold">chipember</strong></span>
          <span>Password: <strong className="text-black font-semibold">chipember</strong></span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Alert */}
      {isSuccess && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Authenticated successfully. Accessing client portal...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Username
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="chipember"
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-zinc-700">
              Password
            </label>
            <a href="#" className="text-[11px] text-zinc-500 hover:text-black underline">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#050505] hover:bg-zinc-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <span>LOGIN</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
        <span>Don&apos;t have an account? </span>
        <Link href="/sign-up" className="font-bold text-black hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-xs text-zinc-400">Loading client sign-in...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
