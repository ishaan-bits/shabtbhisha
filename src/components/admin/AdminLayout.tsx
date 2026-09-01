"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Star,
  Settings,
  FileText,
  MessageSquare,
  LogOut,
  ChevronLeft,
  Package,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminProvider";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout, data, isLoggedIn, authLoading } = useAdmin();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin";
  const shouldRedirect = !authLoading && !isLoggedIn && !isLoginPage;

  // Redirect away if not logged in (and not on the login page)
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/admin");
    }
  }, [shouldRedirect, router]);

  // Auth loading or redirecting
  if (authLoading || shouldRedirect) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in on login page — render children (the login form)
  if (!isLoggedIn && isLoginPage) {
    return <>{children}</>;
  }

  const unreadCount = data.contacts.filter((c) => c.status === "unread").length;
  const pendingBookings = data.bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const getBadge = (href: string) => {
    if (href === "/admin/contacts" && unreadCount > 0) return unreadCount;
    if (href === "/admin/bookings" && pendingBookings > 0)
      return pendingBookings;
    return null;
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-primary-dark text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Satabhisha" width={32} height={32} className="rounded-full brightness-0 invert" />
              <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                Satabhisha
              </span>
            </Link>
          )}
          {collapsed && (
            <Image src="/logo.png" alt="Satabhisha" width={32} height={32} className="rounded-full brightness-0 invert mx-auto" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const badge = getBadge(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {badge && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 min-w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                    {badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft className="w-5 h-5 rotate-180" />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        >
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-64 h-full bg-primary-dark text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
              <Image src="/logo.png" alt="Satabhisha" width={32} height={32} className="rounded-full brightness-0 invert" />
                <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  Satabhisha
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const badge = getBadge(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                      isActive
                        ? "bg-accent/20 text-accent"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                    {badge && (
                      <span className="absolute right-2 min-w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-white/10 p-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-gray-800 capitalize">
                {pathname.split("/").pop()?.replace(/-/g, " ")}
              </h1>
              <p className="text-xs text-gray-400">
                Welcome back, Astitwa
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Astitwa Ankur</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-semibold text-sm">AA</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
