'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Star, Award, TrendingUp, Heart, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Patients Treated',
    description: 'Lives transformed through advanced physiotherapy',
    color: '#0A84FF',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '★',
    decimals: 1,
    label: 'Google Rating',
    description: 'Based on verified patient reviews',
    color: '#FFB800',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'Decade of clinical excellence in Sopore, J&K',
    color: '#00d4ff',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Recovery Success Rate',
    description: 'Patients report significant pain relief',
    color: '#34c759',
  },
  {
    icon: Heart,
    value: 15,
    suffix: '+',
    label: 'Treatment Types',
    description: 'Comprehensive physiotherapy services',
    color: '#ff375f',
  },
  {
    icon: Clock,
    value: 99,
    suffix: '%',
    label: 'Appointment Adherence',
    description: 'Reliable same-day booking confirmation',
    color: '#bf5af2',
  },
];

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="glass-card p-8 flex flex-col gap-4 relative overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: 'transform' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${stat.color}15, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
        style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
      >
        <Icon size={22} style={{ color: stat.color }} />
      </div>

      {/* Counter */}
      <div className="relative z-10">
        <div
          className="font-black leading-none mb-1"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: 'clamp(40px, 5vw, 56px)',
            color: stat.color,
          }}
        >
          {inView ? (
            <CountUp
              start={0}
              end={stat.value}
              duration={2.0}
              decimals={stat.decimals ?? 0}
              separator=","
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ) : (
            `0${stat.suffix}`
          )}
        </div>
        <div
          className="font-bold text-lg"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
        >
          {stat.label}
        </div>
      </div>

      <p
        className="text-sm leading-relaxed relative z-10"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
      >
        {stat.description}
      </p>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Statistics() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section
      className="section"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'var(--primary-subtle)',
                border: '1px solid var(--border-blue)',
              }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                Our Numbers Speak
              </span>
            </div>

            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              Trusted by{' '}
              <span
                style={{
                  color: 'var(--primary)',
                }}
              >
                Thousands
              </span>
            </h2>

            <p
              className="section-subtitle mx-auto"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Our results reflect our commitment to excellence in physiotherapy and
              patient-centred care.
            </p>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
