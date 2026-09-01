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

const defaultBookings: Booking[] = [
  {
    id: "BK001",
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98765 11111",
    service: "Chakra Balancing",
    date: "2026-09-05",
    time: "10:00 AM",
    duration: "75 min",
    price: "₹3,000",
    message: "Experiencing stress and blocked energy.",
    status: "confirmed",
    createdAt: "2026-08-28",
  },
  {
    id: "BK002",
    name: "Rahul Mehta",
    email: "rahul@email.com",
    phone: "+91 98765 22222",
    service: "Distance Reiki",
    date: "2026-09-06",
    time: "2:00 PM",
    duration: "60 min",
    price: "₹2,500",
    message: "Severe anxiety and insomnia.",
    status: "pending",
    createdAt: "2026-08-29",
  },
  {
    id: "BK003",
    name: "Ananya Das",
    email: "ananya@email.com",
    phone: "+91 98765 33333",
    service: "Crystal Healing",
    date: "2026-09-08",
    time: "11:00 AM",
    duration: "90 min",
    price: "₹3,500",
    message: "Want to explore crystal healing for creativity.",
    status: "pending",
    createdAt: "2026-08-30",
  },
  {
    id: "BK004",
    name: "Vikram Patel",
    email: "vikram@email.com",
    phone: "+91 98765 44444",
    service: "Aura Cleansing",
    date: "2026-09-03",
    time: "4:00 PM",
    duration: "60 min",
    price: "₹2,500",
    message: "Feeling heavy negative energy around me.",
    status: "completed",
    createdAt: "2026-08-25",
  },
  {
    id: "BK005",
    name: "Meera Krishnan",
    email: "meera@email.com",
    phone: "+91 98765 55555",
    service: "Transformation Package",
    date: "2026-09-10",
    time: "3:00 PM",
    duration: "75 min",
    price: "₹10,000",
    message: "Looking for deep healing for family.",
    status: "confirmed",
    createdAt: "2026-08-27",
  },
  {
    id: "BK006",
    name: "Arjun Nair",
    email: "arjun@email.com",
    phone: "+91 98765 66666",
    service: "Free Consultation",
    date: "2026-09-04",
    time: "5:00 PM",
    duration: "15 min",
    price: "Free",
    message: "New to Reiki, want to learn more.",
    status: "completed",
    createdAt: "2026-08-26",
  },
  {
    id: "BK007",
    name: "Deepa Gupta",
    email: "deepa@email.com",
    phone: "+91 98765 77777",
    service: "Distance Reiki",
    date: "2026-09-12",
    time: "6:00 PM",
    duration: "60 min",
    price: "₹2,500",
    message: "Grief and emotional healing needed.",
    status: "pending",
    createdAt: "2026-09-01",
  },
  {
    id: "BK008",
    name: "Sanjay Rao",
    email: "sanjay@email.com",
    phone: "+91 98765 88888",
    service: "Chakra Balancing",
    date: "2026-09-02",
    time: "9:00 AM",
    duration: "75 min",
    price: "₹3,000",
    message: "Blood pressure management.",
    status: "completed",
    createdAt: "2026-08-24",
  },
  {
    id: "BK009",
    name: "Neha Kapoor",
    email: "neha@email.com",
    phone: "+91 98765 99999",
    service: "Aura Cleansing",
    date: "2026-09-15",
    time: "11:00 AM",
    duration: "60 min",
    price: "₹2,500",
    message: "Need protection from negative influences.",
    status: "pending",
    createdAt: "2026-09-01",
  },
  {
    id: "BK010",
    name: "Amit Joshi",
    email: "amit@email.com",
    phone: "+91 98765 00000",
    service: "Crystal Healing",
    date: "2026-09-01",
    time: "3:00 PM",
    duration: "90 min",
    price: "₹3,500",
    message: "Chronic pain management.",
    status: "cancelled",
    createdAt: "2026-08-23",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "TM001",
    name: "Priya Sharma",
    role: "Yoga Instructor",
    location: "Mumbai",
    text: "After just three sessions with Astitwa, I felt a profound shift in my energy. My meditation practice deepened and chronic shoulder pain vanished.",
    rating: 5,
    service: "Chakra Balancing",
    featured: true,
    visible: true,
  },
  {
    id: "TM002",
    name: "Rahul Mehta",
    role: "Software Engineer",
    location: "Bangalore",
    text: "I was skeptical at first, but the distance Reiki session helped me overcome severe anxiety. I sleep better and feel more focused than ever.",
    rating: 5,
    service: "Distance Reiki",
    featured: true,
    visible: true,
  },
  {
    id: "TM003",
    name: "Ananya Das",
    role: "Artist & Creative",
    location: "Delhi",
    text: "The chakra balancing session was transformative. Astitwa intuitively identified blockages I had been carrying for years.",
    rating: 5,
    service: "Chakra Balancing",
    featured: false,
    visible: true,
  },
  {
    id: "TM004",
    name: "Vikram Patel",
    role: "Business Owner",
    location: "Pune",
    text: "The aura cleansing session was exactly what I needed during a difficult business transition. I felt lighter and clearer.",
    rating: 5,
    service: "Aura Cleansing",
    featured: false,
    visible: true,
  },
  {
    id: "TM005",
    name: "Meera Krishnan",
    role: "Homemaker",
    location: "Chennai",
    text: "I booked a transformation package for my whole family. The results have been incredible.",
    rating: 5,
    service: "Transformation Package",
    featured: true,
    visible: true,
  },
  {
    id: "TM006",
    name: "Arjun Nair",
    role: "Teacher",
    location: "Kerala",
    text: "The crystal healing session opened my eyes to a whole new dimension of wellness.",
    rating: 5,
    service: "Crystal Healing",
    featured: false,
    visible: true,
  },
];

const defaultServices: Service[] = [
  {
    id: "SV001",
    name: "Distance Reiki Healing",
    description:
      "Receive the full benefits of Reiki from anywhere in the world.",
    duration: "60 min",
    price: "₹2,500",
    category: "individual",
    active: true,
    features: [
      "Full-body energy healing",
      "Works across any distance",
      "Ideal for busy schedules",
      "Follow-up guidance included",
    ],
  },
  {
    id: "SV002",
    name: "Chakra Balancing & Alignment",
    description:
      "Identify and clear blockages in your seven major chakras.",
    duration: "75 min",
    price: "₹3,000",
    category: "individual",
    active: true,
    features: [
      "Complete chakra assessment",
      "Targeted energy clearing",
      "Guided visualization",
      "Post-session care plan",
    ],
  },
  {
    id: "SV003",
    name: "Aura Cleansing & Protection",
    description:
      "Clear accumulated negative energy from your auric field.",
    duration: "60 min",
    price: "₹2,500",
    category: "individual",
    active: true,
    features: [
      "Full aura scan & assessment",
      "Negative energy removal",
      "Protective shield establishment",
      "Visualization techniques",
    ],
  },
  {
    id: "SV004",
    name: "Crystal Healing Therapy",
    description:
      "Harness the ancient power of crystals combined with Reiki energy.",
    duration: "90 min",
    price: "₹3,500",
    category: "individual",
    active: true,
    features: [
      "Intuitive crystal selection",
      "Chakra-specific placement",
      "Amplified energy healing",
      "Take-home crystal guidance",
    ],
  },
  {
    id: "SV005",
    name: "Harmony Package",
    description: "Perfect for beginners.",
    duration: "3 Sessions",
    price: "₹6,500",
    category: "package",
    active: true,
    features: [
      "Initial consultation",
      "3 Reiki healing sessions",
      "Email support",
      "Personalized healing plan",
    ],
  },
  {
    id: "SV006",
    name: "Transformation Package",
    description: "Our most popular choice.",
    duration: "5 Sessions",
    price: "₹10,000",
    category: "package",
    active: true,
    features: [
      "In-depth energy assessment",
      "5 Reiki healing sessions",
      "Mix of modalities",
      "Crystal kit for home use",
    ],
  },
  {
    id: "SV007",
    name: "Ascension Package",
    description: "Deep spiritual healing.",
    duration: "8 Sessions",
    price: "₹16,000",
    category: "package",
    active: true,
    features: [
      "Complete energy blueprint",
      "8 Reiki healing sessions",
      "All modalities included",
      "Premium crystal collection",
    ],
  },
];

const defaultContacts: Contact[] = [
  {
    id: "CT001",
    name: "Riya Verma",
    email: "riya@email.com",
    phone: "+91 91111 22222",
    subject: "Query about distance healing",
    message: "Hi, I wanted to know if distance healing works for chronic migraines. I live in a remote area and cannot travel.",
    status: "unread",
    createdAt: "2026-09-01",
  },
  {
    id: "CT002",
    name: "Karan Bajaj",
    email: "karan@email.com",
    phone: "+91 93333 44444",
    subject: "Corporate wellness inquiry",
    message: "We are interested in organizing a group Reiki session for our team of 20. Can you accommodate?",
    status: "read",
    createdAt: "2026-08-30",
  },
  {
    id: "CT003",
    name: "Shreya Pillai",
    email: "shreya@email.com",
    phone: "+91 95555 66666",
    subject: "Post-session follow-up",
    message: "Thank you for the wonderful session yesterday. I wanted to ask about the meditation techniques you recommended.",
    status: "replied",
    createdAt: "2026-08-28",
  },
  {
    id: "CT004",
    name: "Dev Malhotra",
    email: "dev@email.com",
    phone: "+91 97777 88888",
    subject: "Gift certificate request",
    message: "I want to book a healing session as a birthday gift for my mother. Is a gift certificate available?",
    status: "unread",
    createdAt: "2026-09-01",
  },
];

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
      const saved = localStorage.getItem("satabhisha_admin");
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
      localStorage.setItem("satabhisha_admin", JSON.stringify(data));
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
