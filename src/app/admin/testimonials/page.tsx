"use client";

import { useState } from "react";
import { useAdmin, Testimonial } from "@/components/admin/AdminProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  X,
  Search,
  Award,
} from "lucide-react";

export default function TestimonialsPage() {
  const {
    data,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialFeatured,
    toggleTestimonialVisible,
  } = useAdmin();
  const { testimonials } = data;

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    text: "",
    rating: 5,
    service: "",
    featured: false,
    visible: true,
  });

  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.service.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () =>
    setForm({
      name: "",
      role: "",
      location: "",
      text: "",
      rating: 5,
      service: "",
      featured: false,
      visible: true,
    });

  const handleAdd = () => {
    addTestimonial(form);
    resetForm();
    setShowAdd(false);
  };

  const handleUpdate = () => {
    if (editing) {
      updateTestimonial(editing.id, form);
      setEditing(null);
      resetForm();
    }
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name,
      role: t.role,
      location: t.location,
      text: t.text,
      rating: t.rating,
      service: t.service,
      featured: t.featured,
      visible: t.visible,
    });
  };

  const renderFormFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="e.g. Yoga Instructor"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <input
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="e.g. Chakra Balancing"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
        <textarea
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none"
          placeholder="What they said..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((r) => (
            <button key={r} onClick={() => setForm({ ...form, rating: r })} className="transition-colors">
              <Star className={`w-6 h-6 ${r <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-sm text-gray-500 mt-1">
            {testimonials.length} total &middot; {testimonials.filter((t) => t.featured).length} featured
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAdd(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-primary-dark rounded-xl text-sm font-medium hover:bg-accent-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search testimonials..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <motion.div
            key={t.id}
            layout
            className={`bg-white rounded-2xl p-6 border shadow-sm transition-all ${t.featured ? "border-amber-200 bg-amber-50/30" : "border-gray-100"} ${!t.visible ? "opacity-50" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-semibold text-sm">{t.name.split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} &middot; {t.location}</p>
                </div>
              </div>
              {t.featured && <Award className="w-4 h-4 text-amber-500" />}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">&ldquo;{t.text}&rdquo;</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{t.service}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleTestimonialFeatured(t.id)} className={`p-1.5 rounded-lg transition-colors ${t.featured ? "text-amber-500 hover:bg-amber-50" : "text-gray-400 hover:bg-gray-100"}`} title="Toggle featured">
                  <Award className="w-4 h-4" />
                </button>
                <button onClick={() => toggleTestimonialVisible(t.id)} className={`p-1.5 rounded-lg transition-colors ${t.visible ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`} title="Toggle visibility">
                  {t.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(t)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteConfirm(t.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Add Testimonial</h3>
                <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                {renderFormFields()}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleAdd} disabled={!form.name || !form.text} className="flex-1 py-2.5 rounded-xl bg-accent text-primary-dark text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50">Add</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Edit Testimonial</h3>
                <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                {renderFormFields()}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleUpdate} className="flex-1 py-2.5 rounded-xl bg-accent text-primary-dark text-sm font-medium hover:bg-accent-light transition-colors">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 text-center mb-2">Delete Testimonial?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={() => { deleteTestimonial(deleteConfirm); setDeleteConfirm(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
