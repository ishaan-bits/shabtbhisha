"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";

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
    description: "Receive the full benefits of Reiki from anywhere in the world.",
    duration: "60 min",
    price: "₹2,500",
    category: "individual",
    active: true,
    features: ["Full-body energy healing", "Works across any distance", "Ideal for busy schedules", "Follow-up guidance included"],
  },
  {
    id: "SV002",
    name: "Chakra Balancing & Alignment",
    description: "Identify and clear blockages in your seven major chakras.",
    duration: "75 min",
    price: "₹3,000",
    category: "individual",
    active: true,
    features: ["Complete chakra assessment", "Targeted energy clearing", "Guided visualization", "Post-session care plan"],
  },
  {
    id: "SV003",
    name: "Aura Cleansing & Protection",
    description: "Clear accumulated negative energy from your auric field.",
    duration: "60 min",
    price: "₹2,500",
    category: "individual",
    active: true,
    features: ["Full aura scan & assessment", "Negative energy removal", "Protective shield establishment", "Visualization techniques"],
  },
  {
    id: "SV004",
    name: "Crystal Healing Therapy",
    description: "Harness the ancient power of crystals combined with Reiki energy.",
    duration: "90 min",
    price: "₹3,500",
    category: "individual",
    active: true,
    features: ["Intuitive crystal selection", "Chakra-specific placement", "Amplified energy healing", "Take-home crystal guidance"],
  },
  {
    id: "SV005",
    name: "Harmony Package",
    description: "Perfect for beginners.",
    duration: "3 Sessions",
    price: "₹6,500",
    category: "package",
    active: true,
    features: ["Initial consultation", "3 Reiki healing sessions", "Email support", "Personalized healing plan"],
  },
  {
    id: "SV006",
    name: "Transformation Package",
    description: "Our most popular choice.",
    duration: "5 Sessions",
    price: "₹10,000",
    category: "package",
    active: true,
    features: ["In-depth energy assessment", "5 Reiki healing sessions", "Mix of modalities", "Crystal kit for home use"],
  },
  {
    id: "SV007",
    name: "Ascension Package",
    description: "Deep spiritual healing.",
    duration: "8 Sessions",
    price: "₹16,000",
    category: "package",
    active: true,
    features: ["Complete energy blueprint", "8 Reiki healing sessions", "All modalities included", "Premium crystal collection"],
  },
];

interface AdminContextType {
  data: AdminData;
  user: User | null;
  isLoggedIn: boolean;
  authLoading: boolean;
  logout: () => Promise<void>;
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

async function seedCollection<T extends { id: string }>(
  collectionName: string,
  defaults: T[]
) {
  const db = getFirebaseDb();
  for (const item of defaults) {
    const { id, ...data } = item;
    await setDoc(doc(db, collectionName, id), data);
  }
}

async function ensureContentSeeded() {
  const db = getFirebaseDb();
  const { getDocs } = await import("firebase/firestore");
  const snap = await getDocs(collection(db, "siteContent"));
  if (snap.empty) {
    await setDoc(doc(db, "siteContent", "main"), defaultContent);
  }
}

async function ensureTestimonialsSeeded() {
  const db = getFirebaseDb();
  const { getDocs } = await import("firebase/firestore");
  const snap = await getDocs(collection(db, "testimonials"));
  if (snap.empty) {
    await seedCollection("testimonials", defaultTestimonials);
  }
}

async function ensureServicesSeeded() {
  const db = getFirebaseDb();
  const { getDocs } = await import("firebase/firestore");
  const snap = await getDocs(collection(db, "services"));
  if (snap.empty) {
    await seedCollection("services", defaultServices);
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [data, setData] = useState<AdminData>({
    bookings: [],
    testimonials: [],
    services: [],
    contacts: [],
    content: defaultContent,
  });

  const [seedingDone, setSeedingDone] = useState(false);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Seed data on first load if collections are empty
  useEffect(() => {
    if (!user) return;
    if (seedingDone) return;

    const runSeed = async () => {
      try {
        await Promise.all([
          ensureTestimonialsSeeded(),
          ensureServicesSeeded(),
          ensureContentSeeded(),
        ]);
        setSeedingDone(true);
      } catch (err) {
        console.error("Seeding error:", err);
      }
    };
    runSeed();
  }, [user, seedingDone]);

  // Firestore listeners when logged in
  useEffect(() => {
    if (!user) return;

    const unsubBookings = onSnapshot(collection(getFirebaseDb(), "bookings"), (snap) => {
      const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Booking[];
      setData((prev) => ({ ...prev, bookings }));
    });

    const unsubTestimonials = onSnapshot(collection(getFirebaseDb(), "testimonials"), (snap) => {
      const testimonials = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Testimonial[];
      setData((prev) => ({ ...prev, testimonials }));
    });

    const unsubServices = onSnapshot(collection(getFirebaseDb(), "services"), (snap) => {
      const services = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Service[];
      setData((prev) => ({ ...prev, services }));
    });

    const unsubContacts = onSnapshot(collection(getFirebaseDb(), "contacts"), (snap) => {
      const contacts = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Contact[];
      setData((prev) => ({ ...prev, contacts }));
    });

    const unsubContent = onSnapshot(
      doc(getFirebaseDb(), "siteContent", "main"),
      (d) => {
        if (d.exists()) {
          setData((prev) => ({ ...prev, content: d.data() as SiteContent }));
        }
      }
    );

    return () => {
      unsubBookings();
      unsubTestimonials();
      unsubServices();
      unsubContacts();
      unsubContent();
    };
  }, [user]);

  const logout = async () => {
    const { signOut } = await import("firebase/auth");
    await signOut(getFirebaseAuth());
    setData({
      bookings: [],
      testimonials: [],
      contacts: [],
      services: [],
      content: defaultContent,
    });
    setSeedingDone(false);
  };

  const updateBookingStatus = async (id: string, status: Booking["status"]) => {
    await updateDoc(doc(getFirebaseDb(), "bookings", id), { status });
  };

  const deleteBooking = async (id: string) => {
    await deleteDoc(doc(getFirebaseDb(), "bookings", id));
  };

  const addTestimonial = async (t: Omit<Testimonial, "id">) => {
    const id = `TM${Date.now()}`;
    await setDoc(doc(getFirebaseDb(), "testimonials", id), t);
  };

  const updateTestimonial = async (id: string, t: Partial<Testimonial>) => {
    await updateDoc(doc(getFirebaseDb(), "testimonials", id), t);
  };

  const deleteTestimonial = async (id: string) => {
    await deleteDoc(doc(getFirebaseDb(), "testimonials", id));
  };

  const toggleTestimonialFeatured = async (id: string) => {
    const current = data.testimonials.find((t) => t.id === id);
    if (current) {
      await updateDoc(doc(getFirebaseDb(), "testimonials", id), { featured: !current.featured });
    }
  };

  const toggleTestimonialVisible = async (id: string) => {
    const current = data.testimonials.find((t) => t.id === id);
    if (current) {
      await updateDoc(doc(getFirebaseDb(), "testimonials", id), { visible: !current.visible });
    }
  };

  const addService = async (s: Omit<Service, "id">) => {
    const id = `SV${Date.now()}`;
    await setDoc(doc(getFirebaseDb(), "services", id), s);
  };

  const updateService = async (id: string, s: Partial<Service>) => {
    await updateDoc(doc(getFirebaseDb(), "services", id), s);
  };

  const deleteService = async (id: string) => {
    await deleteDoc(doc(getFirebaseDb(), "services", id));
  };

  const toggleServiceActive = async (id: string) => {
    const current = data.services.find((s) => s.id === id);
    if (current) {
      await updateDoc(doc(getFirebaseDb(), "services", id), { active: !current.active });
    }
  };

  const updateContent = async (c: Partial<SiteContent>) => {
    await updateDoc(doc(getFirebaseDb(), "siteContent", "main"), c);
  };

  const markContactRead = async (id: string) => {
    await updateDoc(doc(getFirebaseDb(), "contacts", id), { status: "read" });
  };

  const markContactReplied = async (id: string) => {
    await updateDoc(doc(getFirebaseDb(), "contacts", id), { status: "replied" });
  };

  const deleteContact = async (id: string) => {
    await deleteDoc(doc(getFirebaseDb(), "contacts", id));
  };

  return (
    <AdminContext.Provider
      value={{
        data,
        user,
        isLoggedIn: !!user,
        authLoading,
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
