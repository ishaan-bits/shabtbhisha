"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Leaf,
  ArrowRight,
  Award,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const journey = [
  {
    year: "2016",
    title: "Discovery of Reiki",
    desc: "Astitwa Ankur discovered Reiki during a personal healing crisis, finding profound transformation through energy work.",
  },
  {
    year: "2017",
    title: "Reiki Level I & II",
    desc: "Completed traditional Reiki training under a master practitioner, deepening the understanding of energy channels and healing techniques.",
  },
  {
    year: "2019",
    title: "Reiki Master Level",
    desc: "Attained Reiki Master/Teacher certification, enabling the ability to attune others and teach the art of energy healing.",
  },
  {
    year: "2021",
    title: "Satabhisha Founded",
    desc: "Established Satabhisha as a platform to make energy healing accessible to a wider community across India and beyond.",
  },
  {
    year: "Present",
    title: "Global Healing Practice",
    desc: "Offering distance and in-person sessions to clients worldwide, with a focus on holistic well-being and spiritual growth.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "Every session is held in a space of deep empathy and unconditional acceptance.",
  },
  {
    icon: Sparkles,
    title: "Integrity",
    desc: "We honor the sacred trust between healer and client with complete honesty and respect.",
  },
  {
    icon: Leaf,
    title: "Holistic Approach",
    desc: "We address the whole person — body, mind, emotions, and spirit — for lasting transformation.",
  },
  {
    icon: Users,
    title: "Accessibility",
    desc: "Energy healing is for everyone. We strive to make our services available regardless of background.",
  },
];

const qualifications = [
  { icon: Award, text: "Certified Reiki Master/Teacher" },
  { icon: BookOpen, text: "Advanced Crystal Healing Practitioner" },
  { icon: Clock, text: "8+ Years of Practice" },
  { icon: Users, text: "500+ Sessions Completed" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <AnimatedSection>
            <span className="text-accent font-medium text-sm uppercase tracking-widest">
              Our Story
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6">
              About{" "}
              <span className="italic font-normal">Satabhisha</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
              Born from a deep calling to serve and heal, Satabhisha is the
              manifestation of years of study, practice, and unwavering
              dedication to the art of energy healing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                  <Image
                    src="/astitwa.png"
                    alt="Astitwa Ankur - Reiki Master"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[500px]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-semibold gradient-text">
                    8+
                  </p>
                  <p className="text-primary/60 text-sm">Years of Practice</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-widest">
                  The Founder
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4 mb-6">
                  Astitwa <span className="italic font-normal">Ankur</span>
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Astitwa Ankur is a certified Reiki Master and energy healer
                  with over eight years of dedicated practice. His journey into
                  the world of energy healing began during a deeply personal
                  transformative experience that opened his eyes to the
                  profound power of universal life force energy.
                </p>
                <p className="text-primary/70 leading-relaxed mb-6">
                  After rigorous training in traditional Reiki at all three
                  levels and extensive study of crystal healing, aura reading,
                  and chakra therapy, Astitwa founded Satabhisha to make
                  energy healing accessible to all who seek it. His gentle,
                  intuitive approach has helped hundreds find relief from
                  stress, anxiety, physical ailments, and emotional blockages.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {qualifications.map((q, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <q.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-primary/70">{q.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What is Reiki */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-widest">
                  Understanding Reiki
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4 mb-6">
                  What is{" "}
                  <span className="italic font-normal">Reiki?</span>
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Reiki is a Japanese energy healing technique developed by
                  Mikao Usui in the early 1920s. The word Reiki comes from two
                  Japanese words: &ldquo;Rei&rdquo; (universal) and
                  &ldquo;Ki&rdquo; (life energy). It works by channeling
                  universal life force energy through the practitioner&apos;s
                  hands to the recipient.
                </p>
                <p className="text-primary/70 leading-relaxed mb-4">
                  During a Reiki session, the practitioner acts as a conduit
                  for this energy, directing it to where it is most needed.
                  The recipient may feel warmth, tingling, or a deep sense of
                  peace and relaxation. Reiki works on the physical, emotional,
                  mental, and spiritual levels simultaneously.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Scientific studies have shown that Reiki can reduce stress,
                  lower blood pressure, decrease pain, and accelerate healing.
                  It is now offered in many hospitals and wellness centers
                  worldwide as a complementary therapy.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: "Reduces Stress",
                    desc: "Activates the parasympathetic nervous system for deep relaxation",
                  },
                  {
                    title: "Relieves Pain",
                    desc: "Helps manage chronic pain conditions and accelerates recovery",
                  },
                  {
                    title: "Improves Sleep",
                    desc: "Calms the mind and promotes restful, restorative sleep",
                  },
                  {
                    title: "Emotional Balance",
                    desc: "Releases stored emotions and promotes mental clarity",
                  },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-6 shadow-lg shadow-primary/5"
                  >
                    <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary-dark mb-2">
                      {b.title}
                    </h4>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Our Values
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                Guided by{" "}
                <span className="italic font-normal">Principle</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="text-center bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <v.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary-dark mb-3">
                    {v.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-cream relative noise-overlay">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Our Journey
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-primary-dark mt-4">
                A Path of{" "}
                <span className="italic font-normal">Growth</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20 -translate-x-1/2" />
            {journey.map((j, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-cream z-10" />
                  <div className="w-1/2 bg-white rounded-xl p-6 shadow-lg shadow-primary/5">
                    <span className="text-accent font-semibold text-sm">
                      {j.year}
                    </span>
                    <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary-dark mt-1 mb-2">
                      {j.title}
                    </h4>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {j.desc}
                    </p>
                  </div>
                </div>
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
              Ready to Experience{" "}
              <span className="italic font-normal text-accent-light">Healing?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Take the first step toward balance and inner peace. Your healing
              journey awaits.
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-medium rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
            >
              Book Your Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
