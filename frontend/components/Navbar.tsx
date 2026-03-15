'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#booking' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // rAF-throttled scroll handler — fires at most once per animation frame
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 50);

        const sections = ['home', 'stats', 'about', 'facilities', 'treatments', 'gallery', 'reviews', 'booking'];
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && y >= el.offsetTop - 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Smooth scroll using native scrollIntoView — runs on compositor
  const scrollTo = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Memoize style objects — avoids creating new object references each render
  const navbarStyle: React.CSSProperties = useMemo(() => isScrolled
    ? {
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e9f0',
        boxShadow: '0 1px 16px rgba(0,0,0,0.06)',
      }
    : {
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229,233,240,0.6)',
      },
  [isScrolled]);

  return (
    <>
      <motion.nav
        className="w-full z-50 transition-all duration-500"
        style={navbarStyle}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 2.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#home"
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-3 no-underline"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'var(--primary)',
                  boxShadow: '0 4px 15px rgba(26,107,204,0.3)',
                }}
              >
                {/* Mini cross */}
                <div className="relative w-5 h-5">
                  <div
                    style={{
                      position: 'absolute',
                      width: '14px',
                      height: '4px',
                      background: 'white',
                      borderRadius: '2px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      width: '4px',
                      height: '14px',
                      background: 'white',
                      borderRadius: '2px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  className="font-black text-sm leading-tight"
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    color: 'var(--primary)',
                  }}
                >
                  Dr. Majid&apos;s
                </div>
                <div
                  className="text-xs leading-tight"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}
                >
                  Physiotherapy Clinic
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--primary-subtle)' : 'transparent',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'var(--primary)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Phone */}
              <a
                href="tel:+91XXXXXXXXXX"
                className="hidden md:flex items-center gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Phone size={15} />
                <span className="hidden xl:block" style={{ fontFamily: 'var(--font-inter)' }}>
                  +91 XXX XXX XXXX
                </span>
              </a>

              {/* Book Appointment CTA */}
              <motion.button
                className="hidden md:flex btn-primary text-sm px-5 py-2.5"
                onClick={() => scrollTo('#booking')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar size={15} />
                Book Appointment
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Slide panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-80 flex flex-col"
              style={{
                background: '#ffffff',
                borderLeft: '1px solid var(--border)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Mobile menu header */}
              <div
                className="flex items-center justify-between p-6"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span
                  className="font-bold text-base"
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    color: 'var(--primary)',
                  }}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile nav links */}
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left font-medium"
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{
                      background: 'var(--primary-subtle)',
                      color: 'var(--primary)',
                      x: 4,
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="p-6" style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  className="btn-primary w-full justify-center"
                  onClick={() => scrollTo('#booking')}
                >
                  <Calendar size={16} />
                  Book Appointment
                </button>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center justify-center gap-2 mt-3 text-sm"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  <Phone size={14} />
                  +91 XXX XXX XXXX
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
