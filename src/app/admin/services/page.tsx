"use client";

import { useState } from "react";
import { useAdmin, Service } from "@/components/admin/AdminProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, X, Search, Power, Clock } from "lucide-react";

export default function ServicesPage() {
  const { data, addService, updateService, deleteService, toggleServiceActive } = useAdmin();
  const { services } = data;

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<"all" | "individual" | "package">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "individual" as "individual" | "package",
    active: true,
    features: [""],
  });

  const filtered = services
    .filter((s) => catFilter === "all" || s.category === catFilter)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  const resetForm = () => setForm({ name: "", description: "", duration: "", price: "", category: "individual", active: true, features: [""] });

  const handleAdd = () => {
    addService({ ...form, features: form.features.filter((f) => f.trim()) });
    resetForm();
    setShowAdd(false);
  };

  const handleUpdate = () => {
    if (editing) {
      updateService(editing.id, { ...form, features: form.features.filter((f) => f.trim()) });
      setEditing(null);
      resetForm();
    }
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      name: s.name, description: s.description, duration: s.duration, price: s.price,
      category: s.category, active: s.active, features: s.features.length > 0 ? s.features : [""],
    });
  };

  const renderFormFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" placeholder="Service name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" placeholder="e.g. ₹2,500" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" placeholder="e.g. 60 min" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as "individual" | "package" })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white">
            <option value="individual">Individual</option>
            <option value="package">Package</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none" placeholder="Brief description" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={f} onChange={(e) => { const features = [...form.features]; features[i] = e.target.value; setForm({ ...form, features }); }} className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" placeholder={`Feature ${i + 1}`} />
            {form.features.length > 1 && (
              <button onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="text-gray-400 hover:text-red-500 p-2"><X className="w-4 h-4" /></button>
            )}
          </div>
        ))}
        <button onClick={() => setForm({ ...form, features: [...form.features, ""] })} className="text-sm text-accent hover:text-accent-light transition-colors">+ Add feature</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Services & Packages</h2>
          <p className="text-sm text-gray-500 mt-1">{services.length} total &middot; {services.filter((s) => s.active).length} active</p>
        </div>
        <button onClick={() => { resetForm(); setShowAdd(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-primary-dark rounded-xl text-sm font-medium hover:bg-accent-light transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
        </div>
        <div className="flex gap-2">
          {(["all", "individual", "package"] as const).map((c) => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${catFilter === c ? "bg-primary-dark text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <motion.div key={s.id} layout className={`bg-white rounded-2xl p-6 border shadow-sm transition-all ${!s.active ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.category === "individual" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{s.category}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleServiceActive(s.id)} className={`p-1.5 rounded-lg transition-colors ${s.active ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`} title={s.active ? "Deactivate" : "Activate"}><Power className="w-4 h-4" /></button>
                <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirm(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{s.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-500"><Clock className="w-3.5 h-3.5" />{s.duration}</div>
              <p className="text-lg font-bold text-accent">{s.price}</p>
            </div>
            {s.features.length > 0 && (
              <div className="border-t border-gray-100 pt-3">
                <ul className="space-y-1">
                  {s.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />{f}
                    </li>
                  ))}
                  {s.features.length > 3 && <li className="text-xs text-gray-400">+{s.features.length - 3} more</li>}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {(showAdd || editing) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowAdd(false); setEditing(null); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">{editing ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                {renderFormFields()}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => { setShowAdd(false); setEditing(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={editing ? handleUpdate : handleAdd} disabled={!form.name || !form.price} className="flex-1 py-2.5 rounded-xl bg-accent text-primary-dark text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50">{editing ? "Save Changes" : "Add Service"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 text-center mb-2">Delete Service?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={() => { deleteService(deleteConfirm); setDeleteConfirm(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
