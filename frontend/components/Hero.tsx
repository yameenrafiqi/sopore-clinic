'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Calendar, ChevronDown, Play } from 'lucide-react';

// Seeded deterministic values — prevents SSR/client hydration mismatch
const sr = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };
const HERO_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  width: sr(i * 4) * 4 + 1,
  height: sr(i * 4 + 1) * 4 + 1,
  opacity: sr(i * 4 + 2) * 0.4 + 0.1,
  left: sr(i * 7) * 100,
  top: sr(i * 7 + 1) * 100,
  yAnim: -(sr(i * 6) * 40 + 20),
  duration: sr(i * 5) * 5 + 4,
  delay: sr(i * 5 + 1) * 4,
}));

const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // GSAP staggered text reveal
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      tl.fromTo(
        badgeRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      ).fromTo(
        '.hero-title-word',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
        '-=0.2',
      ).fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4',
      ).fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.3',
      ).fromTo(
        '.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2',
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroWords = ['Advanced', 'Rehabilitation', '&', 'Pain', 'Recovery'];

  return (
    <section
      className="hero-section"
      style={{
        background: 'linear-gradient(145deg, #050a18 0%, #0a1228 40%, #0d1b3e 70%, #061230 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Background Scene */}
      <div
        className="absolute inset-0 z-0"
        style={{ opacity: 0.85 }}
      >
        <ThreeScene />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(10,132,255,0.08) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient particles — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {mounted && HERO_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              background: `rgba(10, 132, 255, ${p.opacity})`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, p.yAnim, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center min-h-screen"
        style={{ paddingTop: '80px' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(10, 132, 255, 0.15)',
                border: '1px solid rgba(10, 132, 255, 0.3)',
                opacity: 0,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }}
              />
              <span
                style={{
                  color: '#00d4ff',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '0.08em',
                }}
              >
                Sopore, Jammu &amp; Kashmir, India
              </span>
            </div>

            {/* Clinic Name */}
            <div className="mb-4 overflow-hidden">
              <h2
                className="text-xl md:text-2xl font-semibold mb-2"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '0.05em',
                }}
              >
                Dr. Majid&apos;s Advanced Physiotherapy Clinic
              </h2>
            </div>

            {/* Main headline */}
            <h1
              ref={titleRef}
              className="mb-6"
              style={{
                fontSize: 'clamp(42px, 7vw, 88px)',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'white',
              }}
            >
              {heroWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-title-word inline-block mr-4"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    background:
                      i === 0 || i === 4
                        ? 'linear-gradient(135deg, #0A84FF, #00d4ff)'
                        : 'white',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mb-10 max-w-2xl"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontFamily: 'var(--font-inter)',
                lineHeight: 1.7,
                opacity: 0,
              }}
            >
              World-class physiotherapy treatments using cutting-edge technology.
              Shockwave therapy, CPM, Electrotherapy and more — right here in Sopore, J&amp;K.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center mb-16">
              <motion.button
                className="hero-cta btn-primary text-base px-8 py-4"
                style={{ opacity: 0 }}
                onClick={() => scrollTo('booking')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Calendar size={18} />
                Book Appointment
              </motion.button>

              <motion.button
                className="hero-cta btn-outline text-base px-8 py-4"
                style={{ opacity: 0, borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                onClick={() => scrollTo('treatments')}
                whileHover={{
                  scale: 1.04,
                  borderColor: '#0A84FF',
                  color: '#0A84FF',
                }}
                whileTap={{ scale: 0.96 }}
              >
                <Play size={16} />
                Explore Treatments
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="hero-cta flex flex-wrap gap-6 items-center" style={{ opacity: 0 }} suppressHydrationWarning>
              {[
                { value: '5000+', label: 'Patients Treated' },
                { value: '4.9★', label: 'Google Rating' },
                { value: '10+', label: 'Years Experience' },
                { value: '98%', label: 'Recovery Rate' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2" suppressHydrationWarning>
                  <span
                    className="font-bold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'var(--font-poppins)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <motion.button
            onClick={() => scrollTo('stats')}
            className="scroll-indicator"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Scroll down"
          >
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
          </motion.button>
          <span
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-inter)',
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
        }}
      />
    </section>
  );
}
