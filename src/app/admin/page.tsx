"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/admin/StatCard";
import BookingChart from "@/components/admin/BookingChart";
import CategoryChart from "@/components/admin/CategoryChart";
import {
  adminStats,
  recentActivity,
  categoryBreakdown,
} from "@/lib/mock-data";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import {
  Users,
  UserCheck,
  CalendarCheck,
  TrendingUp,
  Activity,
  AlertCircle,
} from "lucide-react";

const activityIcons: Record<string, typeof Activity> = {
  booking: CalendarCheck,
  vendor: UserCheck,
  emergency: AlertCircle,
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#030306]">
      <Navbar />

      <motion.div
        className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-8 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Platform Admin
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Demo analytics — mock data only, no backend connected.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            label="Total Vendors"
            value={adminStats.totalVendors}
            change={adminStats.growth}
            icon={Users}
            color="bg-amber-500/20 text-amber-400"
          />
          <StatCard
            label="Total Clients"
            value={adminStats.totalClients}
            change="+18%"
            icon={UserCheck}
            color="bg-violet-500/20 text-violet-400"
          />
          <StatCard
            label="Total Bookings"
            value={adminStats.totalBookings}
            change="+31%"
            icon={CalendarCheck}
            color="bg-cyan-500/20 text-cyan-400"
          />
          <StatCard
            label="Revenue (MTD)"
            value={adminStats.revenue}
            change={adminStats.growth}
            icon={TrendingUp}
            color="bg-emerald-500/20 text-emerald-400"
          />
        </motion.div>

        {/* Charts row */}
        <motion.div
          variants={staggerContainer}
          className="mt-6 grid gap-6 lg:grid-cols-2"
        >
          <BookingChart />
          <CategoryChart />
        </motion.div>

        {/* Bottom row */}
        <motion.div
          variants={staggerContainer}
          className="mt-6 grid gap-6 lg:grid-cols-3"
        >
          {/* Recent activity */}
          <motion.div
            variants={fadeInUp}
            className="glass lg:col-span-2 rounded-2xl p-6"
          >
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Activity className="h-5 w-5 text-amber-400" />
              Recent Activity
            </h3>
            <div className="mt-4 space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = activityIcons[item.type] || Activity;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5"
                    >
                      <Icon className="h-4 w-4 text-amber-400" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-zinc-300 truncate">{item.message}</p>
                      <p className="text-xs text-zinc-600">{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeInUp} className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Top Categories
            </h3>
            <div className="mt-4 space-y-3">
              {categoryBreakdown.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 p-3"
                >
                  <motion.div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-zinc-400">{cat.name}</span>
                  </motion.div>
                  <span className="text-sm font-semibold text-white">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-6 rounded-xl border border-dashed border-amber-500/20 bg-amber-500/5 p-4 text-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xs text-amber-400/80">
                Full platform features coming soon
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
