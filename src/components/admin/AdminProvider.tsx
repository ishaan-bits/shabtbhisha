"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  service: string;
  featured: boolean;
  visible: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: "individual" | "package";
  active: boolean;
  features: string[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaTitle: string;
  ctaText: string;
  founderName: string;
  founderBio: string;
  phone: string;
  email: string;
  address: string;
}

interface AdminData {
  bookings: Booking[];
  testimonials: Testimonial[];
  services: Service[];
  contacts: Contact[];
  content: SiteContent;
}

const defaultContent: SiteContent = {
  heroTitle: "Restore Your Inner Light",
  heroSubtitle:
    "Experience the gentle power of Reiki healing with Astitwa Ankur. Release energy blockages, find deep relaxation, and awaken your body's natural healing ability.",
  aboutText:
    "Satabhisha, founded by Astitwa Ankur, is a sanctuary for those seeking healing beyond the physical realm.",
  ctaTitle: "Begin Your Healing Journey",
  ctaText: "Every healing journey begins with a single step.",
  founderName: "Astitwa Ankur",
  founderBio:
    "Certified Reiki Master and energy healer with over eight years of dedicated practice.",
  phone: "+91 98765 43210",
  email: "hello@satabhisha.com",
  address: "India",
};

const defaultBookings: Booking[] = [];

const defaultTestimonials: Testimonial[] = [];

const defaultServices: Service[] = [];

const defaultContacts: Contact[] = [];

interface AdminContextType {
  data: AdminData;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  deleteBooking: (id: string) => void;
  addTestimonial: (t: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  toggleTestimonialFeatured: (id: string) => void;
  toggleTestimonialVisible: (id: string) => void;
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;
  updateContent: (c: Partial<SiteContent>) => void;
  markContactRead: (id: string) => void;
  markContactReplied: (id: string) => void;
  deleteContact: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satabhisha_admin_v2");
      if (saved) return JSON.parse(saved);
    }
    return {
      bookings: defaultBookings,
      testimonials: defaultTestimonials,
      services: defaultServices,
      contacts: defaultContacts,
      content: defaultContent,
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("satabhisha_loggedin") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("satabhisha_admin_v2", JSON.stringify(data));
    }
  }, [data]);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "satabhisha2026") {
      setIsLoggedIn(true);
      localStorage.setItem("satabhisha_loggedin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("satabhisha_loggedin");
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    }));
  };

  const deleteBooking = (id: string) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    }));
  };

  const addTestimonial = (t: Omit<Testimonial, "id">) => {
    const id = `TM${String(data.testimonials.length + 1).padStart(3, "0")}`;
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...t, id }],
    }));
  };

  const updateTestimonial = (id: string, t: Partial<Testimonial>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((tm) =>
        tm.id === id ? { ...tm, ...t } : tm
      ),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const toggleTestimonialFeatured = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, featured: !t.featured } : t
      ),
    }));
  };

  const toggleTestimonialVisible = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, visible: !t.visible } : t
      ),
    }));
  };

  const addService = (s: Omit<Service, "id">) => {
    const id = `SV${String(data.services.length + 1).padStart(3, "0")}`;
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { ...s, id }],
    }));
  };

  const updateService = (id: string, s: Partial<Service>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((sv) =>
        sv.id === id ? { ...sv, ...s } : sv
      ),
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const toggleServiceActive = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      ),
    }));
  };

  const updateContent = (c: Partial<SiteContent>) => {
    setData((prev) => ({
      ...prev,
      content: { ...prev.content, ...c },
    }));
  };

  const markContactRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) =>
        c.id === id ? { ...c, status: "read" as const } : c
      ),
    }));
  };

  const markContactReplied = (id: string) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) =>
        c.id === id ? { ...c, status: "replied" as const } : c
      ),
    }));
  };

  const deleteContact = (id: string) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id),
    }));
  };

  return (
    <AdminContext.Provider
      value={{
        data,
        isLoggedIn,
        login,
        logout,
        updateBookingStatus,
        deleteBooking,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        toggleTestimonialFeatured,
        toggleTestimonialVisible,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        updateContent,
        markContactRead,
        markContactReplied,
        deleteContact,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
