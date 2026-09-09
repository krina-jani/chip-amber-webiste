"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Wait for hydration
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setHasChecked(true);
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated && !hasChecked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Verifying Client Session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
