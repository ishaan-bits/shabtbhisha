"use client";

import Link from "next/link";
import Image from "next/image";
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
import { useSiteData } from "@/hooks/useSiteData";

const serviceIcons = [Sparkles, Heart, Leaf, Sun];

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
  const { allServices } = useSiteData();
  const individualServices = allServices.filter((s) => s.category === "individual" && s.active);
  const packageServices = allServices.filter((s) => s.category === "package" && s.active);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <AnimatedSection>
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Services & Packages</span>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6">
              Healing <span className="italic font-normal">Offerings</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
              Choose from individual healing sessions or comprehensive packages designed to support your transformational journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">Individual Sessions</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Healing <span className="italic font-normal">Modalities</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {individualServices.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <AnimatedSection key={service.id} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 h-full border border-primary/5">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark">{service.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-primary/50">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                          <span className="font-medium text-accent">{service.price}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-primary/60 text-sm leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-primary/70">
                          <Check className="w-4 h-4 text-sage shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">Packages</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Healing <span className="italic font-normal">Journeys</span>
              </h2>
              <p className="text-primary/60 mt-4 max-w-2xl mx-auto">
                Commit to your transformation with a curated package that provides sustained support and deeper healing.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {packageServices.map((pkg, i) => (
              <AnimatedSection key={pkg.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`rounded-2xl p-8 h-full relative ${
                    i === 1
                      ? "bg-primary-dark text-white ring-2 ring-accent shadow-2xl shadow-accent/20"
                      : "bg-white shadow-lg shadow-primary/5"
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-primary-dark text-xs font-semibold rounded-full">
                        <Star className="w-3 h-3 fill-primary-dark" /> Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`font-[family-name:var(--font-heading)] text-2xl font-semibold ${i === 1 ? "text-white" : "text-primary-dark"}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-sm mt-1 ${i === 1 ? "text-white/60" : "text-primary/50"}`}>
                      {pkg.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className={`font-[family-name:var(--font-heading)] text-4xl font-semibold ${i === 1 ? "text-accent" : "text-primary-dark"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm ml-2 ${i === 1 ? "text-white/50" : "text-primary/40"}`}>
                      / {pkg.duration}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2 text-sm ${i === 1 ? "text-white/80" : "text-primary/70"}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${i === 1 ? "text-accent" : "text-sage"}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className={`block w-full text-center py-3 rounded-full font-medium transition-all duration-300 ${
                      i === 1 ? "bg-accent text-primary-dark hover:bg-accent-light" : "bg-primary-dark text-white hover:bg-primary"
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
            {[
              { icon: Globe, title: "Distance Sessions Available", desc: "All services are available as distance healing sessions. Connect from anywhere in the world." },
              { icon: Zap, title: "Customized Sessions", desc: "Every session is intuitively guided and tailored to your unique energy needs." },
              { icon: Heart, title: "Satisfaction Guaranteed", desc: "If you do not feel a shift after your first session, we offer a complimentary follow-up." },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-2">{item.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Common <span className="italic font-normal">Questions</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <details className="bg-white rounded-xl p-6 shadow-sm group">
                  <summary className="font-[family-name:var(--font-heading)] text-lg font-medium text-primary-dark cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-accent group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-primary/60 text-sm leading-relaxed mt-4">{faq.a}</p>
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
              Not Sure Which <span className="italic font-normal text-accent-light">Service?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Book a free 15-minute consultation call and we will help you find the perfect healing modality for your needs.
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
