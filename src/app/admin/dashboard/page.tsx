"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Star,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  IndianRupee,
  Eye,
} from "lucide-react";

export default function DashboardPage() {
  const { data } = useAdmin();
  const { bookings, testimonials, contacts, services } = data;

  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => {
      const num = parseInt(b.price.replace(/[₹,]/g, ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarCheck,
      color: "bg-blue-500/10 text-blue-600",
      change: "+12%",
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-green-500/10 text-green-600",
      change: "+8%",
    },
    {
      label: "Testimonials",
      value: testimonials.length,
      icon: Star,
      color: "bg-amber-500/10 text-amber-600",
      change: "+3",
    },
    {
      label: "Messages",
      value: contacts.length,
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-600",
      change: "+5",
    },
  ];

  const bookingStatusCounts = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const serviceBreakdown = services.reduce(
    (acc, s) => {
      const count = bookings.filter((b) => b.service === s.name).length;
      if (count > 0) acc.push({ name: s.name, count });
      return acc;
    },
    [] as { name: string; count: number }[]
  );

  const maxServiceCount = Math.max(
    ...serviceBreakdown.map((s) => s.count),
    1
  );

  // Recent activity (last 5 bookings sorted by date)
  const recentBookings = [...bookings]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  // Unread contacts
  const unreadContacts = contacts.filter((c) => c.status === "unread");

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },
    confirmed: {
      icon: AlertCircle,
      color: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },
    completed: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    cancelled: {
      icon: XCircle,
      color: "bg-red-100 text-red-700",
      dot: "bg-red-500",
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-600 font-medium">{stat.change}</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-800 mb-6">
            Booking Status
          </h3>
          <div className="space-y-4">
            {(
              Object.entries(bookingStatusCounts) as [
                string,
                number
              ][]
            ).map(([status, count]) => {
              const cfg = statusConfig[status as keyof typeof statusConfig];
              const pct =
                bookings.length > 0
                  ? (count / bookings.length) * 100
                  : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="text-sm text-gray-600 capitalize">
                        {status}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {count}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`h-full rounded-full ${cfg.dot}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-800 mb-6">
            Popular Services
          </h3>
          <div className="space-y-3">
            {serviceBreakdown.length === 0 && (
              <p className="text-sm text-gray-400">No data yet</p>
            )}
            {serviceBreakdown.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 truncate">
                      {s.name}
                    </span>
                    <span className="text-sm font-medium text-gray-800 ml-2">
                      {s.count}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(s.count / maxServiceCount) * 100}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              {
                href: "/admin/bookings",
                label: "Manage Bookings",
                desc: `${bookingStatusCounts.pending} pending`,
                icon: CalendarCheck,
                color: "bg-blue-50 text-blue-600",
              },
              {
                href: "/admin/contacts",
                label: "Check Messages",
                desc: `${unreadContacts.length} unread`,
                icon: MessageSquare,
                color: "bg-purple-50 text-purple-600",
              },
              {
                href: "/admin/testimonials",
                label: "Review Testimonials",
                desc: `${testimonials.length} total`,
                icon: Star,
                color: "bg-amber-50 text-amber-600",
              },
              {
                href: "/admin/content",
                label: "Update Content",
                desc: "Edit site text",
                icon: Eye,
                color: "bg-green-50 text-green-600",
              },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-400">{action.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Bookings</h3>
          <Link
            href="/admin/bookings"
            className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => {
                const cfg = statusConfig[b.status];
                return (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {b.name}
                        </p>
                        <p className="text-xs text-gray-400">{b.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {b.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {b.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {b.time}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}
                      >
                        <cfg.icon className="w-3 h-3" />
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Unread Messages */}
      {unreadContacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">
              Unread Messages
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                {unreadContacts.length}
              </span>
            </h3>
            <Link
              href="/admin/contacts"
              className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {unreadContacts.map((c) => (
              <div key={c.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {c.subject}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{c.createdAt}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
