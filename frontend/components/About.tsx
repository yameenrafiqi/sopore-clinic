'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Award, GraduationCap, Stethoscope, MapPin, Phone } from 'lucide-react';

const timeline = [
  {
    year: '2014',
    title: 'Clinic Established',
    desc: 'Dr. Majid founded the clinic in Sopore, J&K with a mission to bring world-class physiotherapy to the region.',
    icon: '🏥',
  },
  {
    year: '2016',
    title: 'Electrotherapy Unit',
    desc: 'Introduced advanced electrotherapy equipment, including TENS, IFT, and ultrasound therapy.',
    icon: '⚡',
  },
  {
    year: '2018',
    title: 'Sports Rehab Division',
    desc: 'Launched dedicated Sports Injury Rehabilitation program catering to athletes across J&K.',
    icon: '🏃',
  },
  {
    year: '2020',
    title: 'Shockwave Therapy',
    desc: 'Became one of the first clinics in the region to offer Extracorporeal Shockwave Therapy (ESWT).',
    icon: '💫',
  },
  {
    year: '2022',
    title: 'CPM Therapy',
    desc: 'Added Continuous Passive Motion (CPM) machines for post-surgery joint rehabilitation.',
    icon: '🦾',
  },
  {
    year: '2024',
    title: '5000+ Patients Milestone',
    desc: 'Celebrated treating over 5,000 patients with a 98% satisfaction and recovery success rate.',
    icon: '🏆',
  },
];

const credentials = [
  'Bachelor of Physiotherapy (BPT)',
  'Masters in Sports Rehabilitation',
  'Certified Shockwave Therapy Practitioner',
  'Member – Indian Association of Physiotherapists',
  'Advanced Manual Therapy Certification',
  'Pain Management Specialist',
];

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section
      className="section"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'rgba(10, 132, 255, 0.1)',
                border: '1px solid rgba(10, 132, 255, 0.2)',
              }}
            >
              <Stethoscope size={14} style={{ color: '#0A84FF' }} />
              <span style={{ color: '#0A84FF', fontSize: '13px', fontWeight: 600 }}>
                Meet The Doctor
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              About{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dr. Majid
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Bio Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Doctor card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: '4/5', maxWidth: '420px', margin: '0 auto' }}
            >
              {/* Real clinic photo */}
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqjvEXsImBI4Ed3ouvTILsssWBEziwi4GZNOHAyB_yjpbfx38IHh8qv0pNeQkrYZC-9vG12QbXvO9BDlWSucOdhD5zi3fV8FSjrNbD84YY13rNHanGnF47RshPVIbwpPw0-epHd8YGs5UYC=s1360-w1360-h1020-rw"
                alt="Dr. Majid's Advanced Physiotherapy Clinic"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Dark overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,12,28,0.92) 0%, rgba(8,12,28,0.3) 55%, transparent 100%)' }}
              />

              {/* Name card at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-12">
                <h3
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Dr. Majid
                </h3>
                <p style={{ color: '#0A84FF', fontSize: '14px', fontWeight: 600 }}>
                  Advanced Physiotherapist
                </p>
                <p
                  className="mt-1.5 flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}
                >
                  <MapPin size={12} />
                  Sopore, Jammu &amp; Kashmir
                </p>
              </div>

              {/* Decorative badge */}
              <motion.div
                className="absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(10,132,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(26,107,204,0.25)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Award size={24} style={{ color: 'white' }} />
              </motion.div>

            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6"
          >
            <h3
              className="text-3xl md:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              10+ Years of Healing &amp;{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Transforming Lives
              </span>
            </h3>

            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Dr. Majid is a highly qualified physiotherapist with over a decade of clinical
              experience in advanced rehabilitation and pain management. Having built one of
              Sopore&apos;s most trusted medical practices, he combines modern technology with
              personalised care to deliver outstanding outcomes.
            </p>

            <p
              className="leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Passionate about bringing world-class physiotherapy to Jammu &amp; Kashmir, Dr. Majid
              continuously invests in the latest equipment and ongoing education to ensure
              patients receive the most effective, evidence-based treatments available.
            </p>

            {/* Credentials */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
              >
                Qualifications &amp; Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {credentials.map((cred) => (
                  <div key={cred} className="flex items-start gap-2">
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#0A84FF' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-inter)' }}>
                      {cred}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: 'rgba(10,132,255,0.1)',
                  border: '1px solid rgba(10,132,255,0.2)',
                  color: '#0A84FF',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <Phone size={15} />
                Call Dr. Majid
              </a>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div>
          <motion.h3
            className="text-center text-3xl font-bold mb-16"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Journey
            </span>
          </motion.h3>

          {/* Responsive timeline */}
          <div className="relative">
            {/* Center line (desktop) */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5"
              style={{ background: 'linear-gradient(180deg, #0A84FF, #00d4ff, transparent)' }}
            />

            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative grid md:grid-cols-2 gap-6 md:gap-12 items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Left content (even) or right content (odd) */}
                  <div className={`${i % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                    <div
                      className="glass-card p-6 inline-block w-full"
                      style={{
                        borderLeft: i % 2 === 0 ? 'none' : `4px solid #0A84FF`,
                        borderRight: i % 2 === 0 ? `4px solid #0A84FF` : 'none',
                      }}
                    >
                      <div
                        className="text-3xl mb-2"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {item.icon}
                      </div>
                      <div
                        className="font-bold text-lg mb-1"
                        style={{
                          background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontFamily: 'var(--font-poppins)',
                        }}
                      >
                        {item.year}
                      </div>
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                        boxShadow: '0 0 20px rgba(10,132,255,0.5)',
                        border: '3px solid var(--bg-primary)',
                      }}
                    />
                  </div>

                  {/* Empty grid cell */}
                  {i % 2 === 0 && <div className="hidden md:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
