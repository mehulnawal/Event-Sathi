"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getAdminToken, getAdminUser, clearAdminToken } from "./adminAuth";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/admin/bookings", label: "Bookings", icon: "📋" },
  { href: "/admin/tatkal", label: "Tatkal / Emergency", icon: "🚨" },
  { href: "/admin/vendors", label: "Vendors", icon: "🏪" },
  { href: "/admin/city-partners", label: "City Partners", icon: "📍" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setUsername(getAdminUser() || "Admin");
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex">
      {/* ── Sidebar (Left) ───────────────────────────────────── */}
      <aside className="w-60 shrink-0 bg-[#7B1223] flex flex-col min-h-screen sticky top-0">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1
            className="text-xl font-bold text-[#F5F0E8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            EventSathi
          </h1>
          <p className="text-xs text-[#C9973A] mt-0.5">Admin Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#C9973A] text-[#1C1C1C] font-bold"
                    : "text-[#F5F0E8]/80 hover:bg-white/10 hover:text-[#F5F0E8]"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-[#F5F0E8]/60 mb-2">Logged in as</p>
          <p className="text-sm font-bold text-[#C9973A] mb-3">{username}</p>
          <button
            onClick={handleLogout}
            className="w-full text-xs font-bold text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-white/20 hover:border-white/40 rounded-lg py-2 transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content (Right) ─────────────────────────────── */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
