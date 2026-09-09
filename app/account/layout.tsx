import React from "react";
import { AuthGuard } from "@/components/account/AuthGuard";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
