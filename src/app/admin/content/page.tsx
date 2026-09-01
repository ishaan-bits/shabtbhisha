"use client";

import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { motion } from "framer-motion";
import { Save, Check, FileText } from "lucide-react";

export default function ContentPage() {
  const { data, updateContent } = useAdmin();
  const { content } = data;

  const [form, setForm] = useState({ ...content });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Content Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit the text content displayed across your website
          </p>
        </div>
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-accent text-primary-dark hover:bg-accent-light"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Hero Section</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hero Title</label>
            <input type="text" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hero Subtitle</label>
            <textarea value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none bg-white" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">About Section</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">About Text</label>
            <textarea value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Founder Name</label>
            <input type="text" value={form.founderName} onChange={(e) => setForm({ ...form, founderName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Founder Bio</label>
            <textarea value={form.founderBio} onChange={(e) => setForm({ ...form, founderBio: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none bg-white" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Call to Action</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Title</label>
            <input type="text" value={form.ctaTitle} onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Text</label>
            <textarea value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none bg-white" />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Contact Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input type="text" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white" />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-gray-800">Preview</h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Hero Title</p>
            <p className="font-[family-name:var(--font-heading)] text-2xl font-light text-primary-dark">
              {form.heroTitle || "Enter a title..."}
            </p>
            <p className="text-sm text-gray-500">
              {form.heroSubtitle || "Enter a subtitle..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
