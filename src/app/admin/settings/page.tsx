"use client";

import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { motion } from "framer-motion";
import {
  Shield,
  User,
  Database,
  Download,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const { data } = useAdmin();
  const [exported, setExported] = useState(false);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `satabhisha-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const totalBookings = data.bookings.length;
  const totalRevenue = data.bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => {
      const num = parseInt(b.price.replace(/[₹,]/g, ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and data
        </p>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <User className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Account</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-lg">AA</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Astitwa Ankur</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalBookings}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <Database className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Data Management</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Export All Data</p>
              <p className="text-sm text-gray-500">
                Download a JSON backup of all bookings, testimonials, and
                settings
              </p>
            </div>
            <motion.button
              onClick={exportData}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shrink-0 ${
                exported ? "text-green-600 border-green-200" : "text-gray-600"
              }`}
            >
              {exported ? (
                <>
                  <Check className="w-4 h-4" /> Exported!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Export
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <Shield className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Security Info</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Data Storage</span>
              <span className="font-medium">Firebase Cloud Firestore</span>
            </div>
            <div className="flex justify-between">
              <span>Authentication</span>
              <span className="font-medium">Firebase Auth (Email/Password)</span>
            </div>
            <div className="flex justify-between">
              <span>Session</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Last Login</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
