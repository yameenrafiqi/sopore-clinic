'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Heart, ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';

const treatmentLinks = [
  'Back Pain', 'Neck Pain', 'Sciatica', 'Frozen Shoulder',
  'Knee Pain', 'Sports Injuries', 'Post-Surgery Rehab',
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Dr. Majid', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Book Appointment', href: '#booking' },
  { label: 'Admin Panel', href: '/admin' },
  { label: 'Patient Dashboard', href: '/dashboard' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(145deg, #050a18 0%, #0a0e1a 100%)',
        borderTop: '1px solid rgba(10,132,255,0.15)',
      }}
    >
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)' }}
              >
                <div className="relative w-5 h-5">
                  <div style={{ position: 'absolute', width: '14px', height: '4px', background: 'white', borderRadius: '2px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                  <div style={{ position: 'absolute', width: '4px', height: '14px', background: 'white', borderRadius: '2px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                </div>
              </div>
              <div>
                <div
                  className="font-black text-sm"
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Dr. Majid&apos;s
                </div>
                <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Advanced Physiotherapy Clinic
                </div>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
            >
              World-class physiotherapy and rehabilitation in the heart of Sopore, Jammu &amp;
              Kashmir. Your path to pain-free living starts here.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', color: '#1877F2' },
                { icon: Instagram, href: '#', color: '#E1306C' },
                { icon: Twitter, href: '#', color: '#1DA1F2' },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href + color}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${color}20`;
                    (e.currentTarget as HTMLElement).style.color = color;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold mb-5"
              style={{ color: 'white', fontFamily: 'var(--font-poppins)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="flex items-center gap-2 text-sm transition-all duration-200 group"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
                    >
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: '#0A84FF' }}
                      />
                      <span className="group-hover:text-white transition-colors">{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm transition-all duration-200 group"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}
                    >
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: '#0A84FF' }}
                      />
                      <span className="group-hover:text-white transition-colors">{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4
              className="font-semibold mb-5"
              style={{ color: 'white', fontFamily: 'var(--font-poppins)' }}
            >
              Treatments
            </h4>
            <ul className="flex flex-col gap-2">
              {treatmentLinks.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => scrollTo('#treatments')}
                    className="flex items-center gap-2 text-sm transition-all duration-200 group"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
                  >
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                      style={{ color: '#0A84FF' }}
                    />
                    <span className="group-hover:text-white transition-colors">{t}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold mb-5"
              style={{ color: 'white', fontFamily: 'var(--font-poppins)' }}
            >
              Contact &amp; Hours
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#0A84FF' }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
                >
                  Sopore, Baramulla District,<br />
                  Jammu &amp; Kashmir, India — 193201
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#0A84FF' }} />
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}
                >
                  +91 XXX XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#0A84FF' }} />
                <a
                  href="mailto:info@drmajidclinic.com"
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}
                >
                  info@drmajidclinic.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#0A84FF' }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
                >
                  Mon–Fri: 9:00 AM – 6:00 PM<br />
                  Saturday: 9:00 AM – 2:00 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 0',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}
          >
            © {new Date().getFullYear()} Dr. Majid&apos;s Advanced Physiotherapy Clinic. All rights reserved.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}
          >
            Made with <Heart size={10} style={{ color: '#ff375f' }} fill="#ff375f" /> in J&amp;K, India
          </p>
        </div>
      </div>
    </footer>
  );
}
