"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useSiteData } from "@/hooks/useSiteData";

const defaultImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
];

export default function TestimonialsPage() {
  const { allTestimonials } = useSiteData();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const filtered =
    filter === "all"
      ? allTestimonials
      : allTestimonials.filter((t) => t.service === filter);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const uniqueServices = [...new Set(allTestimonials.map((t) => t.service))];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Testimonials</span>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-primary-dark mt-4 mb-6">
              Stories of <span className="italic font-normal">Healing</span>
            </h1>
            <p className="text-primary/60 max-w-2xl text-lg leading-relaxed">
              Read firsthand accounts from individuals who have experienced the transformative power of Reiki healing at Satabhisha.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Highlight Quote */}
      <section className="py-16 bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-lavender/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Quote className="w-12 h-12 text-accent/40 mx-auto mb-6" />
            <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-white/80 italic leading-relaxed">
              &ldquo;Healing is not about fixing what is broken. It is about remembering the wholeness that has always been within you.&rdquo;
            </p>
            <p className="text-accent mt-6 font-medium">Astitwa Ankur</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Testimonials Grid */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-12 flex-wrap">
              <button
                onClick={() => { setFilter("all"); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === "all" ? "bg-primary-dark text-white" : "bg-cream text-primary/60 hover:bg-primary/10"
                }`}
              >
                All
              </button>
              {uniqueServices.map((svc) => (
                <button
                  key={svc}
                  onClick={() => { setFilter(svc); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === svc ? "bg-primary-dark text-white" : "bg-cream text-primary/60 hover:bg-primary/10"
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {paginated.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 h-full border border-primary/5">
                    <div className="flex items-start gap-4 mb-6">
                      <Image
                        src={defaultImages[parseInt(t.id.replace(/\D/g, ""), 10) % defaultImages.length]}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover w-14 h-14"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary-dark">{t.name}</h3>
                            <p className="text-primary/50 text-sm">{t.role} &middot; {t.location}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: t.rating }).map((_, j) => (
                              <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-primary/60 leading-relaxed text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                    <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full">{t.service}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {paginated.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No testimonials found.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/50 hover:bg-cream disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-primary/50">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/50 hover:bg-cream disabled:opacity-30 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "4.9", label: "Average Rating" },
              { number: "500+", label: "Sessions" },
              { number: "98%", label: "Return Clients" },
              { number: "200+", label: "Happy Clients" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-semibold text-accent">{stat.number}</p>
                  <p className="text-white/50 mt-2 text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mb-6">
              Ready to Write Your <span className="italic font-normal">Healing Story?</span>
            </h2>
            <p className="text-primary/60 mb-8 max-w-xl mx-auto">
              Join hundreds of individuals who have transformed their lives through the power of Reiki.
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-medium rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
            >
              Begin Your Healing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
