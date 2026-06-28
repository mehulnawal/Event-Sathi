"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { clearAdminToken } from "./adminAuth";
import { useAdminAuth } from "./useAdminAuth";

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

  // Controls mobile drawer state AND allows desktop collapse for wider screen real estate
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    clearAdminToken();
    router.replace("/admin/login");
  };

  // ── Loading State Structure ──────────────────────────────────────────
  // This keeps the layout shell identical so big screens don't jarringly "pop"
  if (!checked) {
    return (
      <div className="h-screen w-screen bg-[#F5F0E8] flex overflow-hidden">
        {/* Skeleton Sidebar Outline */}
        <aside className="hidden md:flex w-60 bg-[#7B1223] flex-col h-full shrink-0 border-r border-white/5" />
        {/* Main Content Loading Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#F5F0E8] flex overflow-hidden relative">
      {/* ── Mobile & Tablet Backdrop Dimmer ────────────────────────────────── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar Component ──────────────────────────────────────────────── */}
      <aside
        className={`
          w-60 bg-[#7B1223] flex flex-col h-full fixed md:sticky top-0 left-0 z-50 shrink-0
          border-r border-white/5 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
        `}
      >
        {/* Brand Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between h-20 shrink-0">
          <div>
            <h1
              className="text-xl font-bold text-[#F5F0E8]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              EventSathi
            </h1>
            <p className="text-xs text-[#C9973A] mt-0.5 tracking-wider font-medium">
              Admin Portal
            </p>
          </div>

          {/* Close Menu Button (Mobile view only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 text-[#F5F0E8]/70 hover:text-[#F5F0E8] rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links — Custom isolated scroll tracking */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  // Auto-collapses on small mobile views to show data panel immediately
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#C9973A] text-[#1C1C1C] font-bold shadow-md shadow-black/10"
                    : "text-[#F5F0E8]/80 hover:bg-white/10 hover:text-[#F5F0E8]"
                }`}
              >
                <span className="text-base leading-none">{link.icon}</span>
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Identity + Logout Panel */}
        <div className="p-4 border-t border-white/10 bg-[#690F1E] shrink-0">
          <p className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/50 font-semibold mb-1">
            Logged in as
          </p>
          <p
            className="text-sm font-bold text-[#C9973A] mb-3 truncate"
            title={username}
          >
            {username || "Administrator"}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-xs font-bold text-[#F5F0E8]/80 hover:text-[#F5F0E8] bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg py-2 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Panel View Wrap ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Global Structural Header Navbar (Sticky across all break viewports) */}
        <header className="w-full bg-[#7B1223] text-[#F5F0E8] px-4 md:px-6 h-20 flex items-center justify-between shadow-md shadow-black/5 shrink-0 z-30">
          <div className="flex items-center gap-4">
            {/* Toggle Switch Menu Button (Visible Everywhere) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Toggle Sidebar Display"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Context title when sidebar collapses on large desktops */}
            {!isSidebarOpen && (
              <h2
                className="hidden md:block text-lg font-bold tracking-wide transition-all"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                EventSathi{" "}
                <span className="text-xs text-[#C9973A] font-sans ml-2 px-1.5 py-0.5 bg-black/20 rounded">
                  Admin
                </span>
              </h2>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-medium text-[#F5F0E8]/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Session Active
            </span>
          </div>
        </header>

        {/* ── Main Viewport Panel Container ───────────────────────────────── */}
        {/* Isolated layout container ensures headers and sidebars stay stationary while contents scroll cleanly */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
