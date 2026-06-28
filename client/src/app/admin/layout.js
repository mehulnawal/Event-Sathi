"use client";
import { usePathname } from "next/navigation";
import AdminShell from "./AdminShell";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page  no sidebar, no auth wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
