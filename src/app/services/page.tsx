"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Leaf,
  Sun,
  ArrowRight,
  Check,
  Star,
  Zap,
  Clock,
  Globe,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  {
    icon: Sparkles,
    title: "Distance Reiki Healing",
    description:
      "Receive the full benefits of Reiki from anywhere in the world. Using traditional distance healing symbols, Astitwa channels healing energy directly to you regardless of physical location.",
    benefits: [
      "Full-body energy healing",
      "Works across any distance",
      "Ideal for busy schedules",
      "Follow-up guidance included",
    ],
    duration: "60 minutes",
    price: "₹2,500",
  },
  {
    icon: Heart,
    title: "Chakra Balancing & Alignment",
    description:
      "A comprehensive session focused on identifying and clearing blockages in your seven major chakras. Restore the natural flow of energy through your body for improved vitality and emotional balance.",
    benefits: [
      "Complete chakra assessment",
      "Targeted energy clearing",
      "Guided visualization",
      "Post-session care plan",
    ],
    duration: "75 minutes",
    price: "₹3,000",
  },
  {
    icon: Leaf,
    title: "Aura Cleansing & Protection",
    description:
      "Clear accumulated negative energy from your auric field and establish lasting energetic protection. This session is especially beneficial after exposure to toxic environments or emotional upheaval.",
    benefits: [
      "Full aura扫描 & assessment",
      "Negative energy removal",
      "Protective shield establishment",
      "Visualization techniques",
    ],
    duration: "60 minutes",
    price: "₹2,500",
  },
  {
    icon: Sun,
    title: "Crystal Healing Therapy",
    description:
      "Harness the ancient power of crystals combined with Reiki energy for amplified healing. Specific crystals are intuitively selected and placed on or around the body to target particular concerns.",
    benefits: [
      "Intuitive crystal selection",
      "Chakra-specific placement",
      "Amplified energy healing",
      "Take-home crystal guidance",
    ],
    duration: "90 minutes",
    price: "₹3,500",
  },
];

const packages = [
  {
    name: "Harmony",
    subtitle: "Perfect for beginners",
    sessions: "3 Sessions",
    features: [
      "Initial consultation",
      "3 Reiki healing sessions",
      "Email support between sessions",
      "Personalized healing plan",
      "Recording of guided meditation",
    ],
    price: "₹6,500",
    popular: false,
  },
  {
    name: "Transformation",
    subtitle: "Our most popular choice",
    sessions: "5 Sessions",
    features: [
      "In-depth energy assessment",
      "5 Reiki healing sessions",
      "Mix of modalities as needed",
      "WhatsApp support",
      "Crystal kit for home use",
      "Guided meditation recordings",
      "Progress tracking journal",
    ],
    price: "₹10,000",
    popular: true,
  },
  {
    name: "Ascension",
    subtitle: "Deep spiritual healing",
    sessions: "8 Sessions",
    features: [
      "Complete energy blueprint reading",
      "8 Reiki healing sessions",
      "All modalities included",
      "Priority scheduling",
      "Premium crystal collection",
      "Monthly energy check-ins",
      "Private online community access",
      "Exclusive workshop invitations",
    ],
    price: "₹16,000",
    popular: false,
  },
];

const faqs = [
  {
    q: "What should I wear to a session?",
    a: "Wear comfortable, loose-fitting clothing. You will remain fully clothed throughout the session. Many clients prefer to remove shoes and jewelry for comfort.",
  },
  {
    q: "Is Reiki safe alongside medical treatment?",
    a: "Yes, Reiki is completely safe and complementary to any medical treatment. It works alongside conventional medicine to support your overall well-being. Always inform your healthcare provider about any complementary therapies you are receiving.",
  },
  {
    q: "How does distance Reiki work?",
    a: "Energy is not limited by distance. Using sacred Reiki symbols and focused intention, healing energy is channeled to the recipient regardless of their location. Many clients report feeling warmth, tingling, or deep relaxation during distance sessions.",
  },
  {
    q: "How many sessions will I need?",
    a: "This varies depending on your individual needs and goals. Some people experience significant benefits from a single session, while others prefer ongoing sessions for sustained healing. We will work together to determine what is right for you.",
  },
  {
    q: "What if I fall asleep during the session?",
    a: "That is perfectly normal and actually quite common! Your body may need the deep rest. Reiki works on your energy field regardless of whether you are awake or asleep.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-accent font-medium text-sm uppercase tracking-widest">
              Services & Packages
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-primary-dark mt-4 mb-6">
              Healing{" "}
              <span className="italic font-normal">Offerings</span>
            </h1>
            <p className="text-primary/60 max-w-2xl text-lg leading-relaxed">
              Choose from individual healing sessions or comprehensive packages
              designed to support your transformational journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Individual Sessions
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Healing{" "}
                <span className="italic font-normal">Modalities</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 h-full border border-primary/5"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-primary/50">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                        <span className="font-medium text-accent">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-primary/60 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.benefits.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-primary/70"
                      >
                        <Check className="w-4 h-4 text-sage shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Packages
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Healing{" "}
                <span className="italic font-normal">Journeys</span>
              </h2>
              <p className="text-primary/60 mt-4 max-w-2xl mx-auto">
                Commit to your transformation with a curated package that
                provides sustained support and deeper healing.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`rounded-2xl p-8 h-full relative ${
                    pkg.popular
                      ? "bg-primary-dark text-white ring-2 ring-accent shadow-2xl shadow-accent/20"
                      : "bg-white shadow-lg shadow-primary/5"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-primary-dark text-xs font-semibold rounded-full">
                        <Star className="w-3 h-3 fill-primary-dark" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3
                      className={`font-[family-name:var(--font-heading)] text-2xl font-semibold ${
                        pkg.popular ? "text-white" : "text-primary-dark"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        pkg.popular ? "text-white/60" : "text-primary/50"
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span
                      className={`font-[family-name:var(--font-heading)] text-4xl font-semibold ${
                        pkg.popular ? "text-accent" : "text-primary-dark"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-sm ml-2 ${
                        pkg.popular ? "text-white/50" : "text-primary/40"
                      }`}
                    >
                      / {pkg.sessions}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2 text-sm ${
                          pkg.popular ? "text-white/80" : "text-primary/70"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.popular ? "text-accent" : "text-sage"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/book"
                    className={`block w-full text-center py-3 rounded-full font-medium transition-all duration-300 ${
                      pkg.popular
                        ? "bg-accent text-primary-dark hover:bg-accent-light"
                        : "bg-primary-dark text-white hover:bg-primary"
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <AnimatedSection>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-2">
                  Distance Sessions Available
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">
                  All services are available as distance healing sessions.
                  Connect from anywhere in the world via video call or
                  asynchronous healing.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-2">
                  Customized Sessions
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">
                  Every session is intuitively guided and tailored to your
                  unique energy needs. No two sessions are ever the same.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-2">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">
                  If you do not feel a shift after your first session, we offer
                  a complimentary follow-up session to ensure your healing
                  goals are met.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                FAQ
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Common{" "}
                <span className="italic font-normal">Questions</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <details className="bg-white rounded-xl p-6 shadow-sm group">
                  <summary className="font-[family-name:var(--font-heading)] text-lg font-medium text-primary-dark cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-accent group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-primary/60 text-sm leading-relaxed mt-4">
                    {faq.a}
                  </p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-white mb-6">
              Not Sure Which{" "}
              <span className="italic font-normal text-accent-light">Service?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Book a free 15-minute consultation call and we will help you find
              the perfect healing modality for your needs.
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-medium rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
            >
              Schedule Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
