import React from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ProfileForm } from "@/components/account/ProfileForm";

export default function AccountProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar />

        <div className="flex-1 w-full space-y-6">
          <div className="pb-4 border-b border-zinc-200">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              Profile Settings
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Update your personal information and contact preferences.
            </p>
          </div>

          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
