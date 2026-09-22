"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  getDay,
} from "date-fns";

const services = [
  { id: "distance", name: "Distance Reiki Healing", duration: "60 min", price: "₹2,500" },
  { id: "chakra", name: "Chakra Balancing", duration: "75 min", price: "₹3,000" },
  { id: "aura", name: "Aura Cleansing", duration: "60 min", price: "₹2,500" },
  { id: "crystal", name: "Crystal Healing", duration: "90 min", price: "₹3,500" },
  { id: "consultation", name: "Free Consultation", duration: "15 min", price: "Free" },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

const unavailableSlots: Record<string, string[]> = {
  "2026-09-05": ["10:00 AM", "2:00 PM", "3:00 PM"],
  "2026-09-08": ["9:00 AM", "11:00 AM"],
  "2026-09-12": ["4:00 PM", "5:00 PM", "6:00 PM"],
  "2026-09-15": ["10:00 AM", "11:00 AM", "12:00 PM"],
  "2026-09-20": ["2:00 PM", "3:00 PM"],
};

export default function BookPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);

  const startPadding = getDay(startOfMonth(currentMonth));

  const getDateKey = (date: Date) => format(date, "yyyy-MM-dd");

  const isSlotUnavailable = (date: Date, time: string) => {
    const key = getDateKey(date);
    return unavailableSlots[key]?.includes(time) ?? false;
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  const canSubmit = selectedService && selectedDate && selectedTime && formData.name && formData.email && formData.phone && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await addDoc(collection(getFirebaseDb(), "bookings"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service: selectedServiceData?.name ?? "",
        date: format(selectedDate!, "yyyy-MM-dd"),
        time: selectedTime,
        duration: selectedServiceData?.duration ?? "",
        price: selectedServiceData?.price ?? "",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save booking:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <section className="relative pt-32 pb-16 overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/70" />
          <div className="relative max-w-7xl mx-auto px-6 z-10">
            <AnimatedSection>
              <span className="text-accent font-medium text-sm uppercase tracking-widest">Book a Session</span>
              <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6">
                Schedule Your <span className="italic font-normal">Healing</span>
              </h1>
            </AnimatedSection>
          </div>
        </section>
        <section className="py-16 bg-warm-white min-h-[60vh]">
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection>
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-12 h-12 text-sage" />
                </motion.div>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mb-4">
                  Booking <span className="italic font-normal">Confirmed!</span>
                </h2>
                <p className="text-primary/60 max-w-lg mx-auto mb-4">
                  Thank you, {formData.name}! Your session has been booked.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto mb-8">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary/50">Service</span>
                      <span className="font-medium text-primary-dark">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary/50">Date</span>
                      <span className="font-medium text-primary-dark">{selectedDate && format(selectedDate, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary/50">Time</span>
                      <span className="font-medium text-primary-dark">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary/50">Duration</span>
                      <span className="font-medium text-primary-dark">{selectedServiceData?.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-primary/50 text-sm mb-8">
                  A confirmation email has been sent to {formData.email}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-full hover:bg-primary transition-colors"
                >
                  Return Home <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-primary-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <AnimatedSection>
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Book a Session</span>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6">
              Schedule Your <span className="italic font-normal">Healing</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
              Choose your healing modality, pick a date and time, and take the first step toward balance and renewal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Single-page booking form */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6 space-y-12">

          {/* 1. Service Selection */}
          <AnimatedSection>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary-dark mb-1">
                1. Choose Your Service
              </h2>
              <p className="text-primary/50 text-sm mb-6">Select a healing modality</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                      selectedService === service.id
                        ? "border-accent bg-accent/5 shadow-md shadow-accent/10"
                        : "border-primary/10 bg-white hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-primary-dark">
                        {service.name}
                      </h3>
                      {selectedService === service.id && (
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary-dark" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-primary/50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {service.duration}
                      </span>
                      <span className="font-medium text-accent">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 2. Date & Time */}
          <AnimatedSection delay={0.1}>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary-dark mb-1">
                2. Pick a Date & Time
              </h2>
              <p className="text-primary/50 text-sm mb-6">Select your preferred date and available time slot</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-primary/60" />
                    </button>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary-dark">
                      {format(currentMonth, "MMMM yyyy")}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-primary/60" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-center text-[10px] font-medium text-primary/40 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startPadding }).map((_, i) => (
                      <div key={`pad-${i}`} />
                    ))}
                    {days.map((day) => {
                      const isPast = isBefore(day, today);
                      const isSunday = getDay(day) === 0;
                      const isDisabled = isPast || isSunday;
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isCurrentDay = isToday(day);

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => { if (!isDisabled) setSelectedDate(day); }}
                          disabled={isDisabled}
                          className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-150 ${
                            isDisabled
                              ? "text-primary/20 cursor-not-allowed"
                              : isSelected
                              ? "bg-accent text-primary-dark font-semibold shadow-sm"
                              : isCurrentDay
                              ? "bg-primary-dark/5 text-primary-dark font-medium"
                              : "hover:bg-cream text-primary-dark"
                          }`}
                        >
                          {format(day, "d")}
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-xs text-accent font-medium mt-3"
                    >
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </motion.p>
                  )}
                  <p className="text-[10px] text-primary/40 text-center mt-2">Sundays are unavailable</p>
                </div>

                {/* Time Slots */}
                <div>
                  {selectedDate ? (
                    <>
                      <p className="text-sm text-primary/50 mb-4">
                        Available times for {format(selectedDate, "MMM d")}:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((time) => {
                          const unavailable = isSlotUnavailable(selectedDate, time);
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => { if (!unavailable) setSelectedTime(time); }}
                              disabled={unavailable}
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                                unavailable
                                  ? "bg-primary/5 text-primary/20 cursor-not-allowed line-through"
                                  : isSelected
                                  ? "bg-accent text-primary-dark shadow-sm"
                                  : "bg-white border border-primary/10 text-primary-dark hover:border-accent/30"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-[10px] text-primary/40">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-white border border-primary/10" /> Available
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-accent" /> Selected
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-primary/5" /> Unavailable
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-primary/30 text-sm">
                      <div className="text-center">
                        <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <p>Select a date to see available times</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 3. Your Details */}
          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary-dark mb-1">
                3. Your Details
              </h2>
              <p className="text-primary/50 text-sm mb-6">Tell us how to reach you</p>

              <div className="max-w-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 bg-white text-primary-dark placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 bg-white text-primary-dark placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1.5">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 bg-white text-primary-dark placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-1.5">Message (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-primary/30" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific concerns or questions..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/10 bg-white text-primary-dark placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 4. Booking Summary + Submit */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-lg">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-4">
                Booking Summary
              </h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-primary/50">Service</span>
                  <span className="font-medium text-primary-dark">{selectedServiceData?.name ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/50">Date</span>
                  <span className="font-medium text-primary-dark">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/50">Time</span>
                  <span className="font-medium text-primary-dark">{selectedTime || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/50">Duration</span>
                  <span className="font-medium text-primary-dark">{selectedServiceData?.duration ?? "—"}</span>
                </div>
                <div className="border-t border-primary/10 pt-3 flex justify-between">
                  <span className="text-primary/50">Price</span>
                  <span className="font-semibold text-accent text-lg">{selectedServiceData?.price ?? "—"}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  canSubmit
                    ? "bg-accent text-primary-dark hover:bg-accent-light shadow-lg shadow-accent/20"
                    : "bg-primary/10 text-primary/30 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  "Booking..."
                ) : (
                  <>
                    Confirm Booking <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-cream relative noise-overlay">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-light text-primary-dark">
                Need Help <span className="italic font-normal">Choosing?</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Calendar, title: "Flexible Scheduling", desc: "Choose from morning, afternoon, or evening slots that fit your schedule." },
                { icon: Sparkles, title: "Free Consultation", desc: "Unsure which service is right for you? Book a free 15-minute call." },
                { icon: Clock, title: "Easy Rescheduling", desc: "Need to change your appointment? Reschedule up to 24 hours before." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <item.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary-dark mb-2">
                    {item.title}
                  </h4>
                  <p className="text-primary/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
