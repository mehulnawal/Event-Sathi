"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../adminAuth";

const StatCard = ({ label, count, color, href, icon }) => (
  <Link href={href}>
    <div
      className={`bg-white rounded-xl border p-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer ${color}`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#1C1C1C]">{count}</p>
        <p className="text-sm text-[#8C7B6B] font-medium">{label}</p>
      </div>
    </div>
  </Link>
);

const RecentTable = ({ title, rows, columns }) => (
  <div className="bg-white rounded-xl border border-[#C9973A]/20 overflow-hidden">
    <div className="px-5 py-4 border-b border-[#C9973A]/10">
      <h3 className="text-sm font-bold text-[#1C1C1C]">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F5F0E8]">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-2.5 text-xs font-bold text-[#8C7B6B] uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-sm text-[#8C7B6B]"
              >
                No entries yet
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-[#F5F0E8] hover:bg-[#FDFAF5]">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-[#1C1C1C]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminFetch("/api/admin/stats");
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-[#7B1223] mx-auto mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-[#8C7B6B]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const counts = stats?.counts || { bookings: 0, tatkal: 0, vendors: 0, cityPartners: 0 };
  const recent = stats?.recent || {};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-2xl font-bold text-[#7B1223]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Dashboard Overview
        </h2>
        <p className="text-sm text-[#8C7B6B] mt-0.5">
          All submissions at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          count={counts.bookings}
          color="border-[#7B1223]/20 hover:border-[#7B1223]/40"
          href="/admin/bookings"
          icon="📋"
        />
        <StatCard
          label="Tatkal / Emergency"
          count={counts.tatkal}
          color="border-[#D94F3D]/20 hover:border-[#D94F3D]/40"
          href="/admin/tatkal"
          icon="🚨"
        />
        <StatCard
          label="Vendors"
          count={counts.vendors}
          color="border-[#C9973A]/20 hover:border-[#C9973A]/40"
          href="/admin/vendors"
          icon="🏪"
        />
        <StatCard
          label="City Partners"
          count={counts.cityPartners}
          color="border-[#8C7B6B]/20 hover:border-[#8C7B6B]/40"
          href="/admin/city-partners"
          icon="📍"
        />
      </div>

      {/* Total combined */}
      <div className="bg-[#7B1223] rounded-xl p-5 text-[#F5F0E8] flex items-center justify-between">
        <div>
          <p className="text-xs text-[#C9973A] font-bold uppercase tracking-wider">
            Total Submissions
          </p>
          <p className="text-4xl font-bold mt-1">
            {counts.bookings + counts.tatkal + counts.vendors + counts.cityPartners}
          </p>
        </div>
        <div className="text-5xl opacity-20">✦</div>
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTable
          title="Recent Bookings"
          columns={["Name", "City", "Event", "Date"]}
          rows={(recent.recentBookings || []).map((r) => [
            r.fullName,
            r.city,
            r.eventType,
            formatDate(r.createdAt),
          ])}
        />
        <RecentTable
          title="Recent Tatkal"
          columns={["Name", "City", "Event", "Date"]}
          rows={(recent.recentTatkal || []).map((r) => [
            r.fullName,
            r.city,
            r.eventType,
            formatDate(r.createdAt),
          ])}
        />
        <RecentTable
          title="Recent Vendors"
          columns={["Business", "City", "Category", "Date"]}
          rows={(recent.recentVendors || []).map((r) => [
            r.businessName,
            r.city,
            Array.isArray(r.category) ? r.category[0] : r.category,
            formatDate(r.createdAt),
          ])}
        />
        <RecentTable
          title="Recent City Partners"
          columns={["Name", "Target City", "Date"]}
          rows={(recent.recentCityPartners || []).map((r) => [
            r.fullName,
            r.targetCity,
            formatDate(r.createdAt),
          ])}
        />
      </div>
    </div>
  );
}
