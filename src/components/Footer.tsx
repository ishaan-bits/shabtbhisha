"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4">
              <Image src="/logo.png" alt="Satabhisha" width={36} height={36} className="rounded-full brightness-0 invert" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Channeling universal energy for healing, balance, and spiritual
              awakening. Founded by Astitwa Ankur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/book", label: "Book a Session" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-accent" />
                hello@satabhisha.com
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-accent" />
                India
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: FaInstagram, href: "#" },
                { icon: FaFacebook, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/30 hover:text-accent transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Satabhisha. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent" /> by Astitwa Ankur
          </p>
        </div>
      </div>
    </footer>
  );
}
