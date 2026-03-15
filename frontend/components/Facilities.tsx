'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Zap, RotateCcw, Activity, Dumbbell, Heart, Brain } from 'lucide-react';

const facilities = [
  {
    id: 1,
    icon: Zap,
    emoji: '⚡',
    title: 'Shockwave Therapy',
    shortDesc: 'Extracorporeal Shockwave Treatment for chronic pain and tissue healing.',
    color: '#FFB800',
    bgColor: 'rgba(255,184,0,0.1)',
    borderColor: 'rgba(255,184,0,0.2)',
    fullDesc:
      'Extracorporeal Shockwave Therapy (ESWT) uses high-energy acoustic waves to stimulate healing in damaged tissue. Highly effective for tendinopathies, heel spurs, and chronic pain conditions that haven\'t responded to other treatments.',
    benefits: [
      'Non-invasive treatment',
      'Stimulates natural healing',
      'Effective for chronic tendon pain',
      'Breaks down calcifications',
      'Quick sessions (15–20 minutes)',
    ],
    conditions: ['Plantar Fasciitis', 'Calcific Tendinitis', 'Tennis Elbow', 'Achilles Tendinopathy'],
    sessions: '3–6 sessions typically required',
  },
  {
    id: 2,
    icon: RotateCcw,
    emoji: '🔄',
    title: 'CPM Therapy',
    shortDesc: 'Continuous Passive Motion for post-surgery joint rehabilitation.',
    color: '#00d4ff',
    bgColor: 'rgba(0,212,255,0.1)',
    borderColor: 'rgba(0,212,255,0.2)',
    fullDesc:
      'Continuous Passive Motion (CPM) therapy uses a motorised device to gently move joints through their range of motion without patient effort. Essential for post-surgical rehabilitation of knee, hip, and shoulder joints.',
    benefits: [
      'Prevents joint stiffness',
      'Reduces post-op swelling',
      'Accelerates cartilage healing',
      'Maintains range of motion',
      'Reduces pain levels',
    ],
    conditions: ['Knee Replacement Recovery', 'Hip Surgery Rehab', 'Shoulder Surgery', 'Ligament Repair'],
    sessions: 'Daily sessions post-surgery',
  },
  {
    id: 3,
    icon: Activity,
    emoji: '🌊',
    title: 'Electrotherapy',
    shortDesc: 'TENS, IFT, Ultrasound and other advanced electrotherapy modalities.',
    color: '#0A84FF',
    bgColor: 'rgba(10,132,255,0.1)',
    borderColor: 'rgba(10,132,255,0.2)',
    fullDesc:
      'Our advanced electrotherapy suite includes TENS (Transcutaneous Electrical Nerve Stimulation), Interferential Therapy (IFT), Therapeutic Ultrasound, and Laser Therapy. These modalities target pain relief, muscle stimulation, and tissue repair.',
    benefits: [
      'Drug-free pain relief',
      'Reduces muscle spasm',
      'Promotes tissue healing',
      'Improves blood circulation',
      'Reduces acute inflammation',
    ],
    conditions: ['Chronic Back Pain', 'Joint Pain', 'Muscle Spasm', 'Neuralgia', 'Post-injury Healing'],
    sessions: 'Protocol-based (typically 10–15 sessions)',
  },
  {
    id: 4,
    icon: Dumbbell,
    emoji: '🏃',
    title: 'Sports Injury Rehab',
    shortDesc: 'Specialised rehabilitation programs for athletes and sports injuries.',
    color: '#34c759',
    bgColor: 'rgba(52,199,89,0.1)',
    borderColor: 'rgba(52,199,89,0.2)',
    fullDesc:
      'Our Sports Injury Rehabilitation programme is tailored for athletes of all levels — from professionals to weekend warriors. We combine biomechanical analysis, manual therapy, and sport-specific exercise programmes to get you back to peak performance.',
    benefits: [
      'Sport-specific rehabilitation',
      'Biomechanical assessment',
      'Injury prevention strategies',
      'Return-to-sport protocols',
      'Performance optimisation',
    ],
    conditions: ['ACL/MCL Injuries', 'Hamstring Strains', 'Rotator Cuff', 'Shin Splints', 'Stress Fractures'],
    sessions: 'Custom programme (4–16 weeks)',
  },
  {
    id: 5,
    icon: Heart,
    emoji: '🦴',
    title: 'Post-Surgery Rehab',
    shortDesc: 'Comprehensive recovery programmes following orthopaedic surgeries.',
    color: '#ff375f',
    bgColor: 'rgba(255,55,95,0.1)',
    borderColor: 'rgba(255,55,95,0.2)',
    fullDesc:
      'Post-surgical rehabilitation is critical for full recovery and long-term joint health. Our structured protocols cover knee, hip, shoulder, and spine surgeries, with phase-based progression from early mobility to functional strength and return to daily activities.',
    benefits: [
      'Phase-based recovery plan',
      'Early mobilisation',
      'Scar tissue management',
      'Strength restoration',
      'Functional independence',
    ],
    conditions: ['Knee Replacement', 'Hip Replacement', 'Spinal Surgery', 'Shoulder Replacement', 'Disc Surgery'],
    sessions: '12–24 weeks programme',
  },
  {
    id: 6,
    icon: Brain,
    emoji: '🧠',
    title: 'Pain Management',
    shortDesc: 'Holistic multi-modal approach to chronic pain relief and management.',
    color: '#bf5af2',
    bgColor: 'rgba(191,90,242,0.1)',
    borderColor: 'rgba(191,90,242,0.2)',
    fullDesc:
      'Chronic pain management requires a multidisciplinary approach. We combine manual therapy, therapeutic exercise, electrotherapy, and patient education to help you understand and manage pain, improve quality of life, and reduce dependence on medication.',
    benefits: [
      'Holistic pain assessment',
      'Evidence-based treatment',
      'Patient education',
      'Long-term pain strategies',
      'Improved quality of life',
    ],
    conditions: ['Chronic Back Pain', 'Fibromyalgia', 'Arthritis', 'Nerve Pain', 'Headaches & Migraines'],
    sessions: 'Ongoing, goal-based programme',
  },
];

function FacilityModal({
  facility,
  onClose,
}: {
  facility: (typeof facilities)[0];
  onClose: () => void;
}) {
  const Icon = facility.icon;
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-start justify-between p-8 pb-6"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: facility.bgColor, border: `1px solid ${facility.borderColor}` }}
            >
              {facility.emoji}
            </div>
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
              >
                {facility.title}
              </h3>
              <p style={{ color: facility.color, fontSize: '13px', fontWeight: 500 }}>
                {facility.sessions}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-8 flex flex-col gap-6">
          <p
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', fontSize: '15px' }}
          >
            {facility.fullDesc}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Benefits */}
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
              >
                Key Benefits
              </h4>
              <ul className="flex flex-col gap-2">
                {facility.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <ChevronRight size={14} style={{ color: facility.color }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-inter)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions */}
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
              >
                Conditions Treated
              </h4>
              <div className="flex flex-wrap gap-2">
                {facility.conditions.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: facility.bgColor,
                      color: facility.color,
                      border: `1px solid ${facility.borderColor}`,
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn-primary justify-center mt-2"
            onClick={() => {
              onClose();
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book This Treatment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState<(typeof facilities)[0] | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'var(--primary-subtle)', border: '1px solid var(--border-blue)' }}
            >
              <Activity size={14} style={{ color: 'var(--primary)' }} />
              <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                World-class Equipment
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              Our{' '}
              <span
                style={{
                  color: 'var(--primary)',
                }}
              >
                Facilities
              </span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ color: 'var(--text-secondary)' }}>
              State-of-the-art treatment modalities for every physiotherapy need. Click any card
              to learn more.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, i) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.id}
                className="facility-card cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setSelectedFacility(facility)}
                whileHover={{
                  y: -8,
                  rotateX: 3,
                  rotateY: 3,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                  style={{ background: facility.bgColor, border: `1px solid ${facility.borderColor}` }}
                >
                  {facility.emoji}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                >
                  {facility.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                >
                  {facility.shortDesc}
                </p>

                {/* Arrow link */}
                <div
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: facility.color }}
                >
                  Learn more
                  <ChevronRight size={14} />
                </div>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${facility.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <FacilityModal
            facility={selectedFacility}
            onClose={() => setSelectedFacility(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
