'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Mazez Animation',
    rating: 5,
    date: 'June 2026',
    review:
      'Had back pain and disc problem. I took physiotherapy session here. Treatment helped me to recover a lot. Within a month I could feel the difference.',
    verified: true,
  },
  {
    id: 2,
    name: 'AAFIYA Kirmani',
    rating: 5,
    date: 'June 2026',
    review:
      "The service is top-notch, but what stands out most is how Dr. Majid treats his patients. He treats you like a person first, patient second. The facilities are excellent, staff is courteous, and appointments run on time.",
    verified: true,
  },
  {
    id: 3,
    name: 'Haseeb Shah',
    rating: 5,
    date: 'June 2026',
    review:
      "I had a great experience at Dr. Majid's Physiotherapy clinic before, and I'm sure it's only grown even better since. Surely one of the best in Kashmir.",
    verified: true,
  },
  {
    id: 4,
    name: 'Hamees Shah',
    rating: 5,
    date: 'June 2026',
    review:
      "Top-notch care at Dr. Majid's Advanced Physiotherapy Clinic. Professional, effective, and a trusted name in town. Highly recommended.",
    verified: true,
  },
  {
    id: 5,
    name: 'Azra Anjum',
    rating: 5,
    date: 'June 2026',
    review:
      'Very impressive service. Kind, professional, and supportive staff. Excellent care and a positive experience.',
    verified: true,
  },
  {
    id: 6,
    name: 'Nahida Rasool',
    rating: 5,
    date: 'June 2026',
    review:
      'This physiotherapy clinic provides the best quality of service. I am fully satisfied with your service.',
    verified: true,
  },
  {
    id: 7,
    name: 'Asrat Amin',
    rating: 5,
    date: 'May 2026',
    review:
      'This is literally one of the greatest physiotherapy clinics. People who are suffering from any kind of pain, disc issues and other neurological conditions — this clinic is what you need. The staff is highly knowledgeable.',
    verified: true,
  },
  {
    id: 8,
    name: 'Aasif Nazir',
    rating: 5,
    date: 'October 2025',
    review:
      'I truly appreciate the support and guidance you provided throughout my physiotherapy sessions. You consistently demonstrated professionalism, patience, and a positive attitude.',
    verified: true,
  },
  {
    id: 9,
    name: 'Zahoor Ahmad Bhat',
    rating: 5,
    date: 'September 2025',
    review:
      'Absolutely result-oriented physiotherapy consultant and intervention. Highly thankful.',
    verified: true,
  },
  {
    id: 10,
    name: 'Rukaya Jaan',
    rating: 5,
    date: 'September 2025',
    review:
      'The physiotherapist explains the exercises very well, and because of those exercises my condition has improved a lot. The physiotherapy she gave me was very good and outstanding.',
    verified: true,
  },
  {
    id: 11,
    name: 'Salma Qadir',
    rating: 5,
    date: 'September 2025',
    review:
      'The physiotherapy sessions have been really effective. The professionalism and the personal attention you give is worth it.',
    verified: true,
  },
  {
    id: 12,
    name: 'Munir Ahmad',
    rating: 5,
    date: 'September 2025',
    review:
      'From reception to treatment, the entire experience was seamless and professional. The team is passionate about what they do, and it shows.',
    verified: true,
  },
  {
    id: 13,
    name: 'Hamaad Hameem',
    rating: 5,
    date: 'September 2025',
    review:
      'Experience was amazing! Doctor was really caring and respectful. Just what you want when you are in pain. Really would recommend a visit.',
    verified: true,
  },
  {
    id: 14,
    name: 'shahid sufi',
    rating: 5,
    date: 'September 2025',
    review:
      "Dr Majid and Dr Shazia are outstanding physiotherapists. Their professional approach, deep knowledge, and genuine care make the recovery journey smooth and effective. They take the time to understand each patient's needs, provide personalised treatment, and create a comfortable, friendly environment.",
    verified: true,
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? '#FFB800' : 'none'}
          style={{ color: i < rating ? '#FFB800' : '#d1d5db' }}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
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
              style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}
            >
              <Star size={14} style={{ color: '#FFB800' }} fill="#FFB800" />
              <span style={{ color: '#FFB800', fontSize: '13px', fontWeight: 600 }}>
                Patient Reviews
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              What Our Patients{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFB800, #ff9500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Say
              </span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Real stories from real patients. Read how we&apos;ve helped transform lives.
            </p>
          </motion.div>
        </div>

        {/* Overall rating card */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-12 max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="font-black mb-2"
            style={{
              fontFamily: 'var(--font-poppins)',
              fontSize: '72px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FFB800, #ff9500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {avgRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={24}
                fill={i < Math.floor(avgRating) ? '#FFB800' : 'none'}
                style={{ color: '#FFB800' }}
              />
            ))}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', fontSize: '14px' }}>
            Based on {reviews.length}+ verified patient reviews
          </p>
          <div
            className="flex items-center justify-center gap-2 mt-4 text-sm font-medium"
            style={{ color: '#0A84FF' }}
          >
            <Star size={14} fill="#FFB800" style={{ color: '#FFB800' }} />
            Verified on Google Reviews
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-5 opacity-10">
                <Quote size={40} style={{ color: '#FFB800' }} />
              </div>

              {/* Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(255,184,0,0.15)',
                    border: '2px solid rgba(255,184,0,0.3)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '15px',
                    fontWeight: 700,
                  }}
                >
                  {getInitials(review.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                    >
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(52,199,89,0.15)',
                          color: '#34c759',
                          fontWeight: 500,
                        }}
                      >
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <StarRating rating={review.rating} />
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p
                className="leading-relaxed text-sm"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
              >
                &ldquo;{review.review}&rdquo;
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
                style={{ background: 'linear-gradient(90deg, #FFB800, transparent)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA to leave review */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Star size={16} />
            Leave a Review on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
