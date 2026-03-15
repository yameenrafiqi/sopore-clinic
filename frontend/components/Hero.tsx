'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Calendar, ChevronDown, Play } from 'lucide-react';

// No particles or 3D needed on light theme

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
        background: 'linear-gradient(150deg, #ffffff 0%, #f0f6ff 50%, #eaf1fb 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(26,107,204,0.06) 0%, transparent 70%)', }} />
        <div style={{ position:'absolute', bottom:'10%', left:'-8%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)', }} />
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
                background: 'rgba(26,107,204,0.08)',
                border: '1px solid rgba(26,107,204,0.2)',
                opacity: 0,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--primary)', boxShadow: 'none' }}
              />
              <span
                style={{
                  color: 'var(--primary)',
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
                  color: 'var(--text-secondary)',
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
                color: 'var(--text-primary)',
              }}
            >
              {heroWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-title-word inline-block mr-4"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    color: (i === 0 || i === 4) ? 'var(--primary)' : 'var(--text-primary)',
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
                color: 'var(--text-secondary)',
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
                style={{ opacity: 0 }}
                onClick={() => scrollTo('treatments')}
                whileHover={{
                  scale: 1.04,
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
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
                { value: '25+', label: 'Years Experience' },
                { value: '98%', label: 'Recovery Rate' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2" suppressHydrationWarning>
                  <span
                    className="font-bold text-lg"
                    style={{
                    color: 'var(--primary)',
                      fontFamily: 'var(--font-poppins)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      color: 'var(--text-muted)',
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
              color: 'var(--text-muted)',
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
