"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Testimonial, Service, SiteContent } from "@/components/admin/AdminProvider";

const fallbackContent: SiteContent = {
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

const fallbackTestimonials: Testimonial[] = [
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

const fallbackServices: Service[] = [
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

export function useSiteData() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [content, setContent] = useState<SiteContent>(fallbackContent);

  useEffect(() => {
    // If Firestore rules deny access, onSnapshot fires the error callback
    // and we keep the fallback data — site works perfectly without Firestore.
    const unsubTestimonials = onSnapshot(
      collection(db, "testimonials"),
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Testimonial[];
        if (items.length > 0) {
          setTestimonials(items);
        }
        // If empty, keep current state (fallback)
      },
      () => {
        // Permission denied or error — keep fallback data
      }
    );

    const unsubServices = onSnapshot(
      collection(db, "services"),
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Service[];
        if (items.length > 0) {
          setServices(items);
        }
      },
      () => {
        // Permission denied or error — keep fallback data
      }
    );

    const unsubContent = onSnapshot(
      collection(db, "siteContent"),
      (snap) => {
        const doc = snap.docs.find((d) => d.id === "main");
        if (doc) {
          setContent(doc.data() as SiteContent);
        }
      },
      () => {
        // Permission denied or error — keep fallback data
      }
    );

    return () => {
      unsubTestimonials();
      unsubServices();
      unsubContent();
    };
  }, []);

  return {
    testimonials: testimonials.filter((t) => t.visible),
    services: services.filter((s) => s.active),
    allServices: services,
    allTestimonials: testimonials,
    content,
  };
}
