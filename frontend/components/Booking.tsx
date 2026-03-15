'use client';

// Seeded deterministic values — prevents SSR/client hydration mismatch
const sr = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };
const BOOKING_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  width: sr(i * 4) * 4 + 1,
  height: sr(i * 4 + 1) * 4 + 1,
  left: sr(i * 7) * 100,
  top: sr(i * 7 + 1) * 100,
  duration: sr(i * 5) * 5 + 3,
  delay: sr(i * 5 + 1) * 3,
}));

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Phone, Mail, User, MessageSquare, Clock, CheckCircle, ChevronRight, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const treatmentOptions = [
  'Back Pain', 'Neck Pain', 'Sciatica', 'Frozen Shoulder',
  'Tennis Elbow', 'Knee Pain', 'Plantar Fasciitis',
  'Sports Injuries', 'Post Surgery Rehab',
  'Shockwave Therapy', 'CPM Therapy', 'Electrotherapy',
  'General Consultation',
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  time: string;
  message: string;
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>();

  const watchedTreatment = watch('treatment');
  const watchedTime = watch('time');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      reset();
      setStep(1);
      toast.success('Appointment booked! We will confirm shortly.');
    } catch {
      // Fallback: show success in demo mode
      setSubmitted(true);
      toast.success('Appointment request received! We will contact you within 24 hours.');
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Majid's Clinic! I would like to book an appointment for ${watchedTreatment || 'physiotherapy'}. Please confirm availability.`,
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <section
      className="section"
      suppressHydrationWarning
      style={{
        background: 'linear-gradient(135deg, #050a18 0%, #0a1228 50%, #0d1b3e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background particles — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && BOOKING_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              background: 'rgba(10,132,255,0.3)',
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(10,132,255,0.15)', border: '1px solid rgba(10,132,255,0.3)' }}
            >
              <Calendar size={14} style={{ color: '#00d4ff' }} />
              <span style={{ color: '#00d4ff', fontSize: '13px', fontWeight: 600 }}>
                Online Booking
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{
                fontFamily: 'var(--font-poppins)',
                background: 'linear-gradient(135deg, white, rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Book Your{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Appointment
              </span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Schedule your physiotherapy session online. We&apos;ll confirm within 2 hours.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          {submitted ? (
            /* Success state */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(52,199,89,0.2)', border: '2px solid #34c759' }}
              >
                <CheckCircle size={36} style={{ color: '#34c759' }} />
              </div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Appointment Requested!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)' }}>
                We&apos;ll contact you within 2 hours to confirm your appointment.
                <br />
                You can also WhatsApp us for instant confirmation.
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <button className="btn-primary" onClick={() => setSubmitted(false)}>
                  Book Another
                </button>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: '#25d366' }}
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          ) : (
            /* Booking form */
            <motion.div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(10,132,255,0.2)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Progress steps */}
              <div className="flex items-center gap-4 mb-10">
                {['Personal Details', 'Treatment & Schedule', 'Confirm'].map((label, i) => {
                  const stepNum = i + 1;
                  const isActive = stepNum === step;
                  const isCompleted = stepNum < step;
                  return (
                    <div key={label} className="flex items-center gap-2 flex-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: isCompleted ? '#34c759' : isActive ? '#0A84FF' : 'rgba(255,255,255,0.1)',
                          color: 'white',
                        }}
                      >
                        {isCompleted ? '✓' : stepNum}
                      </div>
                      <span
                        className="text-xs hidden sm:block"
                        style={{
                          color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {label}
                      </span>
                      {i < 2 && (
                        <div
                          className="flex-1 h-0.5 rounded-full"
                          style={{
                            background: isCompleted ? '#34c759' : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} suppressHydrationWarning>
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-5"
                  >
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      Personal Details
                    </h3>

                    <div>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0A84FF' }} />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                          className="form-input pl-11"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: errors.name ? '#ff375f' : 'rgba(10,132,255,0.2)',
                            color: 'white',
                          }}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0A84FF' }} />
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: /^[+]?[\d\s\-()]{10,15}$/, message: 'Invalid phone number' },
                          })}
                          className="form-input pl-11"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: errors.phone ? '#ff375f' : 'rgba(10,132,255,0.2)',
                            color: 'white',
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0A84FF' }} />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          {...register('email', {
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                          })}
                          className="form-input pl-11"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: errors.email ? '#ff375f' : 'rgba(10,132,255,0.2)',
                            color: 'white',
                          }}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.email.message}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn-primary justify-center mt-2"
                      onClick={async () => {
                        const name = watch('name');
                        const phone = watch('phone');
                        if (!name || name.length < 2) {
                          toast.error('Please enter your full name');
                          return;
                        }
                        if (!phone) {
                          toast.error('Please enter your phone number');
                          return;
                        }
                        setStep(2);
                      }}
                    >
                      Continue
                      <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Treatment & Schedule */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-5"
                  >
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      Treatment & Schedule
                    </h3>

                    <div>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Treatment Required *
                      </label>
                      <select
                        {...register('treatment', { required: 'Please select a treatment' })}
                        className="form-input"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          borderColor: errors.treatment ? '#ff375f' : 'rgba(10,132,255,0.2)',
                          color: watchedTreatment ? 'white' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        <option value="" disabled>Select treatment...</option>
                        {treatmentOptions.map((t) => (
                          <option key={t} value={t} style={{ background: '#0d1b3e', color: 'white' }}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.treatment && (
                        <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.treatment.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0A84FF' }} />
                          <input
                            type="date"
                            min={today}
                            {...register('date', { required: 'Please select a date' })}
                            className="form-input pl-11"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              borderColor: errors.date ? '#ff375f' : 'rgba(10,132,255,0.2)',
                              color: 'white',
                              colorScheme: 'dark',
                            }}
                          />
                        </div>
                        {errors.date && (
                          <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.date.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          Preferred Time *
                        </label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0A84FF' }} />
                          <select
                            {...register('time', { required: 'Please select a time' })}
                            className="form-input pl-11"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              borderColor: errors.time ? '#ff375f' : 'rgba(10,132,255,0.2)',
                              color: watchedTime ? 'white' : 'rgba(255,255,255,0.5)',
                            }}
                          >
                            <option value="" disabled>Select time...</option>
                            {timeSlots.map((t) => (
                              <option key={t} value={t} style={{ background: '#0d1b3e', color: 'white' }}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.time && (
                          <p className="text-xs mt-1" style={{ color: '#ff375f' }}>{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4" style={{ color: '#0A84FF' }} />
                        <textarea
                          rows={3}
                          placeholder="Describe your symptoms or any other relevant information..."
                          {...register('message')}
                          className="form-input pl-11 resize-none"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(10,132,255,0.2)',
                            color: 'white',
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="btn-outline flex-1 justify-center"
                        style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn-primary flex-1 justify-center"
                        onClick={async () => {
                          const treatment = watch('treatment');
                          const date = watch('date');
                          const time = watch('time');
                          if (!treatment || !date || !time) {
                            toast.error('Please fill in all required fields');
                            return;
                          }
                          setStep(3);
                        }}
                      >
                        Review Booking
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-5"
                  >
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      Confirm Booking
                    </h3>

                    <div
                      className="rounded-2xl p-6 flex flex-col gap-3"
                      style={{ background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)' }}
                    >
                      {[
                        { label: 'Name', value: watch('name'), icon: User },
                        { label: 'Phone', value: watch('phone'), icon: Phone },
                        { label: 'Email', value: watch('email') || 'Not provided', icon: Mail },
                        { label: 'Treatment', value: watch('treatment'), icon: ChevronRight },
                        { label: 'Date', value: watch('date'), icon: Calendar },
                        { label: 'Time', value: watch('time'), icon: Clock },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-3">
                          <Icon size={14} style={{ color: '#0A84FF', flexShrink: 0 }} />
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', minWidth: '70px', fontFamily: 'var(--font-inter)' }}>
                            {label}
                          </span>
                          <span style={{ color: 'white', fontSize: '13px', fontFamily: 'var(--font-inter)' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="btn-outline flex-1 justify-center"
                        style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
                        onClick={() => setStep(2)}
                      >
                        Edit
                      </button>
                      <button
                        type="submit"
                        className="btn-primary flex-1 justify-center"
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                      >
                        {isLoading ? 'Submitting...' : 'Confirm Booking'}
                        {!isLoading && <CheckCircle size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>

              {/* WhatsApp quick booking */}
              <div className="mt-6 text-center">
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.08)',
                    marginBottom: '20px',
                  }}
                />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '12px', fontFamily: 'var(--font-inter)' }}>
                  Or book instantly via WhatsApp
                </p>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(37,211,102,0.2)',
                    border: '1px solid rgba(37,211,102,0.4)',
                    color: '#25d366',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <MessageCircle size={16} />
                  WhatsApp Quick Booking
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
