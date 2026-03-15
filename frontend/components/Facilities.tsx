'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Zap, RotateCcw, Activity, Dumbbell, Heart, Brain, Waves, Sun, Thermometer, Radio, PersonStanding, CircleDot, HandMetal, Bike, TrendingUp } from 'lucide-react';

const facilities = [
  // ── ELECTROTHERAPY & MODALITIES ──
  {
    id: 1,
    icon: Waves,
    emoji: '🔊',
    title: 'Therapeutic Ultrasound',
    shortDesc: 'Ultrasound therapy unit for deep tissue healing and pain relief.',
    color: '#0A84FF',
    bgColor: 'rgba(10,132,255,0.1)',
    borderColor: 'rgba(10,132,255,0.2)',
    fullDesc: 'Therapeutic ultrasound uses sound waves to penetrate deep into tissues, promoting cell repair, reducing inflammation, and accelerating healing of soft tissue injuries.',
    benefits: ['Deep tissue penetration', 'Reduces inflammation', 'Accelerates healing', 'Relieves muscle pain', 'Non-invasive'],
    conditions: ['Soft Tissue Injuries', 'Tendinitis', 'Bursitis', 'Muscle Tears'],
    sessions: '6–12 sessions typically required',
  },
  {
    id: 2,
    icon: Activity,
    emoji: '⚡',
    title: 'Interferential Therapy (IFT)',
    shortDesc: 'Interferential therapy machine for pain relief and muscle stimulation.',
    color: '#00d4ff',
    bgColor: 'rgba(0,212,255,0.1)',
    borderColor: 'rgba(0,212,255,0.2)',
    fullDesc: 'Interferential Therapy uses two medium-frequency electrical currents that intersect to create a low-frequency effect deep within tissues — highly effective for pain relief and reducing oedema.',
    benefits: ['Deep pain relief', 'Reduces swelling', 'Muscle re-education', 'Improves circulation', 'Drug-free'],
    conditions: ['Chronic Pain', 'Joint Swelling', 'Nerve Pain', 'Post-operative Recovery'],
    sessions: '8–15 sessions typically required',
  },
  {
    id: 3,
    icon: Zap,
    emoji: '🌐',
    title: 'TENS Therapy',
    shortDesc: 'Transcutaneous Electrical Nerve Stimulation unit for nerve pain relief.',
    color: '#FFB800',
    bgColor: 'rgba(255,184,0,0.1)',
    borderColor: 'rgba(255,184,0,0.2)',
    fullDesc: 'TENS (Transcutaneous Electrical Nerve Stimulation) sends small electrical impulses through the skin to interrupt pain signals and stimulate endorphin release — a safe, drug-free approach to pain management.',
    benefits: ['Blocks pain signals', 'Stimulates endorphins', 'Drug-free relief', 'Portable option available', 'Suitable for chronic pain'],
    conditions: ['Back Pain', 'Arthritis', 'Sciatica', 'Neuropathic Pain'],
    sessions: 'Ongoing as needed',
  },
  {
    id: 4,
    icon: Sun,
    emoji: '🔴',
    title: 'Low Level Laser Therapy',
    shortDesc: 'Low level laser therapy unit for tissue repair and pain reduction.',
    color: '#ff375f',
    bgColor: 'rgba(255,55,95,0.1)',
    borderColor: 'rgba(255,55,95,0.2)',
    fullDesc: 'Low Level Laser Therapy (LLLT) uses specific wavelengths of light to stimulate cellular repair, reduce inflammation, and relieve pain — particularly effective for joint conditions and wound healing.',
    benefits: ['Stimulates cell repair', 'Reduces inflammation', 'Pain-free treatment', 'Speeds recovery', 'No side effects'],
    conditions: ['Wound Healing', 'Joint Pain', 'Tendinopathy', 'Nerve Injuries'],
    sessions: '6–10 sessions typically required',
  },
  {
    id: 5,
    icon: Zap,
    emoji: '💥',
    title: 'Shockwave Therapy (ESWT)',
    shortDesc: 'Extracorporeal Shockwave Treatment for chronic pain and tissue healing.',
    color: '#FF6B00',
    bgColor: 'rgba(255,107,0,0.1)',
    borderColor: 'rgba(255,107,0,0.2)',
    fullDesc: 'Extracorporeal Shockwave Therapy (ESWT) uses high-energy acoustic waves to stimulate healing in damaged tissue. Highly effective for tendinopathies, heel spurs, and chronic pain conditions.',
    benefits: ['Non-invasive', 'Stimulates natural healing', 'Breaks down calcifications', 'Quick sessions (15–20 min)', 'Long-lasting results'],
    conditions: ['Plantar Fasciitis', 'Calcific Tendinitis', 'Tennis Elbow', 'Achilles Tendinopathy'],
    sessions: '3–6 sessions typically required',
  },
  {
    id: 6,
    icon: Sun,
    emoji: '☀️',
    title: 'Infrared Radiation Therapy',
    shortDesc: 'Infrared radiation therapy unit for deep heat and pain relief.',
    color: '#FF9500',
    bgColor: 'rgba(255,149,0,0.1)',
    borderColor: 'rgba(255,149,0,0.2)',
    fullDesc: 'Infrared radiation therapy uses heat-generating infrared light to penetrate deep into muscles and joints, improving circulation, relieving stiffness, and reducing chronic pain.',
    benefits: ['Deep heat therapy', 'Improves circulation', 'Relieves muscle stiffness', 'Joint pain relief', 'Relaxes muscles'],
    conditions: ['Muscle Stiffness', 'Joint Pain', 'Chronic Back Pain', 'Arthritis'],
    sessions: 'Protocol-based (10–15 sessions)',
  },
  {
    id: 7,
    icon: Thermometer,
    emoji: '🌡️',
    title: 'Hydrocollator Moist Heat',
    shortDesc: 'Hydrocollator moist heat therapy unit for muscle relaxation and pain relief.',
    color: '#34c759',
    bgColor: 'rgba(52,199,89,0.1)',
    borderColor: 'rgba(52,199,89,0.2)',
    fullDesc: 'The Hydrocollator delivers moist heat therapy through heated silica gel packs — deeply penetrating muscle tissue to relax spasms, increase blood flow, and prepare patients for manual therapy.',
    benefits: ['Deep moist heat', 'Relaxes muscle spasm', 'Increases blood flow', 'Pre-therapy preparation', 'Reduces stiffness'],
    conditions: ['Muscle Spasm', 'Stiff Joints', 'Chronic Back Pain', 'Pre-exercise Warm-up'],
    sessions: 'Used as part of treatment sessions',
  },
  {
    id: 8,
    icon: Radio,
    emoji: '📡',
    title: 'Shortwave Diathermy (SWD)',
    shortDesc: 'Shortwave diathermy therapy unit for deep heat treatment.',
    color: '#bf5af2',
    bgColor: 'rgba(191,90,242,0.1)',
    borderColor: 'rgba(191,90,242,0.2)',
    fullDesc: 'Shortwave Diathermy uses high-frequency electromagnetic energy to produce deep heat in tissues. Particularly effective for joint conditions, pelvic conditions, and deep muscle problems.',
    benefits: ['Deep tissue heating', 'Reduces joint stiffness', 'Anti-inflammatory effect', 'Improves extensibility', 'Effective for deep structures'],
    conditions: ['Osteoarthritis', 'Pelvic Pain', 'Deep Muscle Pain', 'Joint Contractures'],
    sessions: '8–12 sessions typically required',
  },
  // ── CONTINUOUS PASSIVE MOTION ──
  {
    id: 9,
    icon: RotateCcw,
    emoji: '🦵',
    title: 'Knee CPM Machine',
    shortDesc: 'Knee Continuous Passive Motion machine for post-surgery joint rehabilitation.',
    color: '#00d4ff',
    bgColor: 'rgba(0,212,255,0.1)',
    borderColor: 'rgba(0,212,255,0.2)',
    fullDesc: 'The Knee CPM machine gently moves the knee joint through its range of motion post-operatively — preventing stiffness, reducing swelling, and accelerating cartilage recovery after surgery.',
    benefits: ['Prevents joint stiffness', 'Reduces post-op swelling', 'Accelerates cartilage healing', 'Maintains range of motion', 'Reduces pain levels'],
    conditions: ['Knee Replacement', 'ACL Surgery', 'Meniscal Repair', 'Ligament Reconstruction'],
    sessions: 'Daily sessions post-surgery',
  },
  {
    id: 10,
    icon: RotateCcw,
    emoji: '💪',
    title: 'Elbow CPM Machine',
    shortDesc: 'Elbow Continuous Passive Motion machine for elbow joint rehabilitation.',
    color: '#5856d6',
    bgColor: 'rgba(88,86,214,0.1)',
    borderColor: 'rgba(88,86,214,0.2)',
    fullDesc: 'The Elbow CPM machine provides continuous, controlled motion to the elbow joint following surgery or injury, promoting joint nutrition, reducing adhesions, and restoring range of motion.',
    benefits: ['Reduces joint stiffness', 'Promotes joint nutrition', 'Reduces scar adhesions', 'Restores range of motion', 'Passive — no patient effort needed'],
    conditions: ['Elbow Surgery Rehab', 'Fracture Recovery', 'Elbow Contracture', 'Post-trauma Rehab'],
    sessions: 'Daily sessions post-surgery',
  },
  // ── EXERCISE & REHABILITATION ──
  {
    id: 11,
    icon: Dumbbell,
    emoji: '🫁',
    title: 'Shoulder Pulley System',
    shortDesc: 'Shoulder pulley exercise system for shoulder range-of-motion rehabilitation.',
    color: '#34c759',
    bgColor: 'rgba(52,199,89,0.1)',
    borderColor: 'rgba(52,199,89,0.2)',
    fullDesc: 'The shoulder pulley system uses an over-door pulley to assist patients in regaining shoulder range-of-motion. Ideal for post-surgery rehabilitation and frozen shoulder recovery.',
    benefits: ['Restores shoulder mobility', 'Self-assisted exercise', 'Reduces pain during movement', 'Easy home use', 'Progressive stretching'],
    conditions: ['Frozen Shoulder', 'Post-shoulder Surgery', 'Rotator Cuff Repair', 'Shoulder Stiffness'],
    sessions: 'Daily home exercise programme',
  },
  {
    id: 12,
    icon: RotateCcw,
    emoji: '🔵',
    title: 'Shoulder Wheel Exerciser',
    shortDesc: 'Shoulder wheel exerciser for improving shoulder joint mobility.',
    color: '#0A84FF',
    bgColor: 'rgba(10,132,255,0.1)',
    borderColor: 'rgba(10,132,255,0.2)',
    fullDesc: 'The shoulder wheel exerciser is a wall-mounted device that enables circular shoulder motion exercises — improving range of movement and strengthening the shoulder girdle.',
    benefits: ['Circular motion training', 'Improves joint mobility', 'Strengthens shoulder muscles', 'Easy to progress', 'Low impact'],
    conditions: ['Shoulder Stiffness', 'Post-surgery Rehab', 'Frozen Shoulder', 'Weakness'],
    sessions: 'Used within supervised therapy sessions',
  },
  {
    id: 13,
    icon: PersonStanding,
    emoji: '🦴',
    title: 'Quadriceps Exercise Table',
    shortDesc: 'Quadriceps exercise table for knee strengthening and rehabilitation.',
    color: '#FF6B00',
    bgColor: 'rgba(255,107,0,0.1)',
    borderColor: 'rgba(255,107,0,0.2)',
    fullDesc: 'The quadriceps exercise table provides targeted resistance training for the quadriceps muscles — essential for knee stability, post-surgery recovery, and management of knee conditions.',
    benefits: ['Targeted quad strengthening', 'Adjustable resistance', 'Supports knee stability', 'Reduces pain', 'Essential for knee rehab'],
    conditions: ['Knee Pain', 'Post-knee Surgery', 'Quadriceps Weakness', 'Patellofemoral Syndrome'],
    sessions: 'Integrated into rehab programme',
  },
  {
    id: 14,
    icon: CircleDot,
    emoji: '🦶',
    title: 'Ankle Exerciser',
    shortDesc: 'Ankle exerciser for ankle rehabilitation and balance training.',
    color: '#FFB800',
    bgColor: 'rgba(255,184,0,0.1)',
    borderColor: 'rgba(255,184,0,0.2)',
    fullDesc: 'The ankle exerciser facilitates range-of-motion and strengthening exercises for the ankle joint, supporting recovery from fractures, sprains, and post-operative rehabilitation.',
    benefits: ['Restores ankle mobility', 'Strengthens ankle muscles', 'Improves balance', 'Low impact', 'Progressive resistance'],
    conditions: ['Ankle Sprain', 'Ankle Fracture Rehab', 'Achilles Tendon Repair', 'Balance Disorders'],
    sessions: 'Daily as part of rehab plan',
  },
  {
    id: 15,
    icon: HandMetal,
    emoji: '✋',
    title: 'Finger Ladder',
    shortDesc: 'Wall-mounted hand rehabilitation device for finger and hand mobility.',
    color: '#bf5af2',
    bgColor: 'rgba(191,90,242,0.1)',
    borderColor: 'rgba(191,90,242,0.2)',
    fullDesc: 'The finger ladder is a wall-mounted device that uses finger-walking movements to progressively improve shoulder and hand range-of-motion, helping patients regain function after injury or surgery.',
    benefits: ['Progressive range-of-motion', 'Finger & hand coordination', 'Self-paced exercise', 'Shoulder mobility improvement', 'Post-surgery use'],
    conditions: ['Shoulder Rehab', 'Hand Surgery Recovery', 'Stroke Rehab', 'Finger Injuries'],
    sessions: 'Daily exercise sessions',
  },
  {
    id: 16,
    icon: Dumbbell,
    emoji: '🎽',
    title: 'Therabands',
    shortDesc: 'Resistance bands for strengthening and rehabilitation exercises.',
    color: '#34c759',
    bgColor: 'rgba(52,199,89,0.1)',
    borderColor: 'rgba(52,199,89,0.2)',
    fullDesc: 'Therabands (resistance bands) are versatile rehabilitation tools used for progressive strengthening exercises across all muscle groups and joints — suitable for all fitness levels.',
    benefits: ['Progressive resistance levels', 'Full body application', 'Low impact strengthening', 'Portable', 'Suitable for all ages'],
    conditions: ['General Weakness', 'Post-surgery Strengthening', 'Sports Rehab', 'Elderly Rehabilitation'],
    sessions: 'Integrated into all rehab programmes',
  },
  // ── TRACTION & MECHANICAL THERAPY ──
  {
    id: 17,
    icon: TrendingUp,
    emoji: '🦴',
    title: 'Cervical & Lumbar Traction',
    shortDesc: 'Cervical and lumbar traction unit for spine decompression and pain relief.',
    color: '#ff375f',
    bgColor: 'rgba(255,55,95,0.1)',
    borderColor: 'rgba(255,55,95,0.2)',
    fullDesc: 'Spinal traction gently stretches the spine to decompress intervertebral discs and relieve pressure on spinal nerves. Effective for both cervical (neck) and lumbar (lower back) conditions.',
    benefits: ['Disc decompression', 'Nerve pressure relief', 'Reduces radiating pain', 'Improves spinal mobility', 'Non-invasive'],
    conditions: ['Disc Herniation', 'Sciatica', 'Cervical Spondylosis', 'Lumbar Radiculopathy'],
    sessions: '8–15 sessions typically required',
  },
  // ── CARDIOVASCULAR & CONDITIONING ──
  {
    id: 18,
    icon: Heart,
    emoji: '🏃',
    title: 'Treadmill',
    shortDesc: 'Treadmill for cardiovascular conditioning and gait rehabilitation.',
    color: '#FF6B00',
    bgColor: 'rgba(255,107,0,0.1)',
    borderColor: 'rgba(255,107,0,0.2)',
    fullDesc: 'The clinic treadmill is used for cardiovascular conditioning, gait retraining, and functional rehabilitation — allowing controlled walking or jogging as part of a structured recovery programme.',
    benefits: ['Gait retraining', 'Cardiovascular fitness', 'Controlled environment', 'Speed progression', 'Post-injury return to walking'],
    conditions: ['Neurological Rehab', 'Post-injury Conditioning', 'Cardiac Rehab', 'Obesity & Weight Management'],
    sessions: 'Integrated into conditioning programme',
  },
  {
    id: 19,
    icon: Bike,
    emoji: '🚴',
    title: 'Stationary Exercise Bicycle',
    shortDesc: 'Stationary exercise bicycle for low-impact cardiovascular rehabilitation.',
    color: '#5856d6',
    bgColor: 'rgba(88,86,214,0.1)',
    borderColor: 'rgba(88,86,214,0.2)',
    fullDesc: 'The stationary bike provides low-impact cardiovascular conditioning and lower limb rehabilitation — ideal for post-surgery patients, those with joint pain, and cardiovascular fitness programmes.',
    benefits: ['Low-impact exercise', 'Joint-friendly', 'Builds endurance', 'Lower limb strengthening', 'Cardiovascular health'],
    conditions: ['Knee Rehab', 'Hip Rehab', 'Cardiac Conditions', 'Weight Management'],
    sessions: 'Integrated into conditioning programme',
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
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const visible = showAll ? facilities : facilities.slice(0, 6);
  const remaining = facilities.length - 6;

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
          <AnimatePresence initial={false}>
          {visible.map((facility, i) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.id}
                className="facility-card cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i >= 6 ? (i - 6) * 0.07 : i * 0.08, ease: 'easeOut' }}
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
          </AnimatePresence>
        </div>

        {/* View More / Show Less button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
            style={{
              background: showAll ? 'var(--glass-bg)' : 'var(--primary)',
              color: showAll ? 'var(--text-primary)' : 'white',
              border: showAll ? '1.5px solid var(--border)' : '1.5px solid var(--primary)',
              fontFamily: 'var(--font-poppins)',
              fontSize: '15px',
              boxShadow: showAll ? 'none' : '0 8px 30px rgba(10,132,255,0.25)',
            }}
          >
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex' }}
            >
              <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
            </motion.span>
            {showAll ? 'Show Less' : `View All ${remaining} More Facilities`}
          </button>
        </motion.div>
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
