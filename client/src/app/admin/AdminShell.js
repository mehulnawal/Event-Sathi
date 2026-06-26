"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clearAdminToken } from "./adminAuth";
import { useAdminAuth } from "./useAdminAuth";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/admin/bookings", label: "Bookings", icon: "📋" },
  { href: "/admin/tatkal", label: "Tatkal / Emergency", icon: "🚨" },
  { href: "/admin/vendors", label: "Vendors", icon: "🏪" },
  { href: "/admin/city-partners", label: "City Partners", icon: "📍" },
];

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { username, checked } = useAdminAuth();

  // Jab tak auth check nahi hua — blank screen (sidebar nahi dikhega)
  if (!checked) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-[#7B1223]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  const handleLogout = () => {
    clearAdminToken();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex">
      {/* ── Sidebar (Left) ───────────────────────────────────── */}
      <aside className="w-60 shrink-0 bg-[#7B1223] flex flex-col h-screen fixed top-0 left-0 overflow-y-auto">
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
      <main className="flex-1 overflow-auto ml-60">{children}</main>
    </div>
  );
}
