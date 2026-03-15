'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Amir Hassan',
    rating: 5,
    date: 'January 2026',
    treatment: 'Back Pain',
    review:
      'Dr. Majid is exceptional. After 2 years of chronic lower back pain, I finally found relief after just 8 sessions. His approach is scientific yet very personalised. Highly recommend to anyone suffering from back or spine issues.',
    avatar: '👨',
    verified: true,
  },
  {
    id: 2,
    name: 'Firdous Begum',
    rating: 5,
    date: 'December 2025',
    treatment: 'Frozen Shoulder',
    review:
      'I had severe frozen shoulder for 6 months and couldn\'t lift my arm. After the treatment programme at Dr. Majid\'s clinic, I have full range of motion restored. The team is so professional and caring.',
    avatar: '👩',
    verified: true,
  },
  {
    id: 3,
    name: 'Bilal Ahmad',
    rating: 5,
    date: 'November 2025',
    treatment: 'Sports Injury',
    review:
      'As a football player, I had an ACL injury and was worried about my career. Dr. Majid\'s sports rehabilitation programme got me back on the field in 4 months. The facility is world-class for Sopore.',
    avatar: '⚽',
    verified: true,
  },
  {
    id: 4,
    name: 'Nasreen Khan',
    rating: 5,
    date: 'October 2025',
    treatment: 'Knee Pain',
    review:
      'Suffered from severe knee pain for years. The shockwave therapy combined with exercises provided dramatic improvement within weeks. The clinic environment is modern and very clean. Staff is very helpful.',
    avatar: '👩‍💼',
    verified: true,
  },
  {
    id: 5,
    name: 'Mohammad Yousuf',
    rating: 5,
    date: 'September 2025',
    treatment: 'Post-Surgery Rehab',
    review:
      'After my knee replacement surgery, Dr. Majid\'s post-surgery rehab programme was exactly what I needed. Structured, professional and effective. I\'m walking normally again thanks to this clinic.',
    avatar: '👨‍🦳',
    verified: true,
  },
  {
    id: 6,
    name: 'Saima Rashid',
    rating: 5,
    date: 'August 2025',
    treatment: 'Sciatica',
    review:
      'The sciatica pain was unbearable — shooting down my entire leg. Within 3 weeks of treatment, the pain reduced by 80%. Dr. Majid explains everything clearly and genuinely cares about recovery.',
    avatar: '👩‍⚕️',
    verified: true,
  },
];

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
          className="glass-card p-8 mb-12 max-w-md mx-auto text-center"
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
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: 'rgba(255,184,0,0.15)',
                    border: '2px solid rgba(255,184,0,0.3)',
                  }}
                >
                  {review.avatar}
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
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(10,132,255,0.1)',
                        color: '#0A84FF',
                        fontWeight: 500,
                      }}
                    >
                      {review.treatment}
                    </span>
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
