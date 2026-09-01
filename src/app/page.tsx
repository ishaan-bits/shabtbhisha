"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Leaf,
  Sun,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useSiteData } from "@/hooks/useSiteData";

const serviceIcons = [Sparkles, Heart, Leaf, Sun];

const stats = [
  { number: "500+", label: "Healing Sessions" },
  { number: "200+", label: "Happy Clients" },
  { number: "8+", label: "Years Experience" },
  { number: "4.9", label: "Average Rating" },
];

export default function Home() {
  const { testimonials, services: liveServices } = useSiteData();
  const displayServices = liveServices.slice(0, 4);
  const displayTestimonials = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80"
            alt="Meditation and spiritual healing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary-dark/40 to-primary-dark/70" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm border border-white/10">
              <Sparkles className="w-4 h-4 text-accent" />
              Healing Through Universal Energy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight"
          >
            Restore Your{" "}
            <span className="italic font-normal text-accent-light">Inner Light</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience the gentle power of Reiki healing with Astitwa Ankur.
            Release energy blockages, find deep relaxation, and awaken your
            body&apos;s natural healing ability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="group px-8 py-4 bg-accent text-primary-dark font-medium rounded-full hover:bg-accent-light transition-all duration-300 flex items-center gap-2 shadow-lg shadow-accent/25"
            >
              Book a Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cream relative noise-overlay">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-semibold gradient-text"
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-primary/60 mt-2 text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                  <Image
                    src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                    alt="Reiki healing session"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[500px]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-lavender/20 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-widest">
                  About Satabhisha
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-primary-dark mt-4 mb-6 leading-tight">
                  A Journey Toward{" "}
                  <span className="italic font-normal">Wholeness</span>
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Satabhisha, founded by Astitwa Ankur, is a sanctuary for
                  those seeking healing beyond the physical realm. Reiki, an
                  ancient Japanese energy healing technique, works by channeling
                  universal life force energy to where it&apos;s needed most.
                </p>
                <p className="text-primary/70 leading-relaxed mb-8">
                  Whether you&apos;re dealing with stress, emotional turmoil,
                  physical discomfort, or simply seeking spiritual growth, each
                  session is tailored to your unique energy blueprint and
                  healing journey.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all duration-300"
                >
                  Discover Our Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Our Services
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-primary-dark mt-4">
                Healing{" "}
                <span className="italic font-normal">Modalities</span>
              </h2>
              <p className="text-primary/60 mt-4 max-w-2xl mx-auto">
                Each modality is channeled with intention and guided by universal
                energy to support your unique healing path.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayServices.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-accent/10 transition-shadow duration-300 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    {(() => { const Icon = serviceIcons[i % serviceIcons.length]; return <Icon className="w-6 h-6 text-accent" />; })()}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-3">
                    {service.name}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-full hover:bg-primary transition-colors duration-300"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How Reiki Works */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                The Process
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-primary-dark mt-4">
                How{" "}
                <span className="italic font-normal">Reiki</span> Works
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We begin with a conversation to understand your intentions, concerns, and energy state. This helps tailor the session to your needs.",
                icon: Users,
              },
              {
                step: "02",
                title: "Healing Session",
                desc: "Through gentle hand placements or distance healing, universal life force energy flows to restore balance and release blockages.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Integration",
                desc: "After the session, we discuss your experience and provide guidance for continued healing and energy maintenance at home.",
                icon: Shield,
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 relative">
                    <item.icon className="w-8 h-8 text-accent" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Testimonials
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-white mt-4">
                Stories of{" "}
                <span className="italic font-normal text-accent-light">Healing</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.map((t) => (
              <AnimatedSection key={t.id} delay={0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-medium">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.role}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 px-8 py-4 border border-accent/30 text-accent rounded-full hover:bg-accent/10 transition-colors duration-300"
              >
                Read More Stories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-warm-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1920&q=60"
            alt="Peaceful zen garden"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-warm-white/80" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6 animate-pulse-soft" />
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-primary-dark mb-6">
              Begin Your Healing{" "}
              <span className="italic font-normal">Journey</span>
            </h2>
            <p className="text-primary/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Every healing journey begins with a single step. Whether
              you&apos;re new to energy work or deepening an existing practice,
              Satabhisha is here to guide you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="group px-8 py-4 bg-accent text-primary-dark font-medium rounded-full hover:bg-accent-light transition-all duration-300 flex items-center gap-2 shadow-lg shadow-accent/25"
              >
                Schedule Your Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-primary/20 text-primary-dark rounded-full hover:bg-cream transition-all duration-300"
              >
                Explore Packages
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
