"use client";

import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { motion } from "framer-motion";
import {
  Shield,
  User,
  Key,
  Database,
  Download,
  AlertTriangle,
  Check,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  const { data } = useAdmin();
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handlePasswordChange = () => {
    if (
      passwordForm.current === "satabhisha2026" &&
      passwordForm.new === passwordForm.confirm
    ) {
      setPasswordSaved(true);
      setPasswordForm({ current: "", new: "", confirm: "" });
      setTimeout(() => setPasswordSaved(false), 2000);
    }
  };

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
  };

  const resetAllData = () => {
    localStorage.removeItem("satabhisha_admin");
    window.location.reload();
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
          Manage your admin account and data
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

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <Key className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Change Password</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.new}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, new: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white"
              />
            </div>
          </div>
          <motion.button
            onClick={handlePasswordChange}
            whileTap={{ scale: 0.95 }}
            disabled={
              !passwordForm.current ||
              !passwordForm.new ||
              passwordForm.new !== passwordForm.confirm
            }
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              passwordSaved
                ? "bg-green-500 text-white"
                : "bg-primary-dark text-white hover:bg-primary disabled:opacity-50"
            }`}
          >
            {passwordSaved ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Updated!
              </span>
            ) : (
              "Update Password"
            )}
          </motion.button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <Database className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Data Management</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Export All Data</p>
              <p className="text-sm text-gray-500">
                Download a JSON backup of all bookings, testimonials, and
                settings
              </p>
            </div>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
            <div>
              <p className="font-medium text-red-700">Reset All Data</p>
              <p className="text-sm text-red-500">
                Restore to default sample data. This cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shrink-0"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
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
              <span className="font-medium">Local Browser (localStorage)</span>
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

      {/* Reset Confirmation */}
      {resetConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setResetConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 text-center mb-2">
              Reset All Data?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This will restore all data to defaults and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={resetAllData}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600"
              >
                Reset Everything
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
