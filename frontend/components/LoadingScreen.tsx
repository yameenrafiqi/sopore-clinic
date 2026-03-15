'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { target: 30,  delay: 100 },
      { target: 65,  delay: 500 },
      { target: 88,  delay: 900 },
      { target: 100, delay: 1300 },
    ];
    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );
    const doneTimer = setTimeout(() => setIsVisible(false), 2000);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#f7f9fc' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Medical cross logo mark */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--primary)', boxShadow: '0 8px 32px rgba(26,107,204,0.25)' }}
            >
              <div className="relative w-7 h-7">
                <div style={{ position:'absolute', width:'22px', height:'5px', background:'white', borderRadius:'3px', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
                <div style={{ position:'absolute', width:'5px', height:'22px', background:'white', borderRadius:'3px', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
              </div>
            </div>
          </motion.div>

          {/* Clinic name */}
          <motion.div
            className="text-center mb-10"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h1
              className="text-xl font-black mb-1"
              style={{ fontFamily: 'var(--font-poppins)', color: 'var(--primary)', letterSpacing: '-0.02em' }}
            >
              Dr. Majid&apos;s Clinic
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Physiotherapy &amp; Rehabilitation Center
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ background: '#e5e9f0' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--primary)' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div
              className="text-center text-xs mt-2"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              {progress < 100 ? 'Loading…' : 'Welcome'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
