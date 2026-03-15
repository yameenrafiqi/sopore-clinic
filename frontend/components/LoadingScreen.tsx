'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Deterministic pseudo-random from a seed — avoids SSR/client mismatch
const seededRand = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  width: seededRand(i * 3) * 6 + 2,
  height: seededRand(i * 3 + 1) * 6 + 2,
  opacity: seededRand(i * 3 + 2) * 0.5 + 0.2,
  left: seededRand(i * 7) * 100,
  top: seededRand(i * 7 + 1) * 100,
  duration: seededRand(i * 5) * 3 + 2,
  delay: seededRand(i * 5 + 1) * 2,
}));

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'fixed', zIndex: 9999 }}
        >
          {/* Background particles — client-only to avoid hydration mismatch */}
          <div className="absolute inset-0 overflow-hidden">
            {mounted && PARTICLES.map((p, i) => (
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
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Medical cross / logo icon */}
            <motion.div
              className="w-20 h-20 mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #0A84FF, #00d4ff, #0A84FF)',
                  padding: '2px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: '#0a0e1a' }}
                >
                  {/* Medical cross */}
                  <div className="relative">
                    <div
                      style={{
                        width: '28px',
                        height: '8px',
                        background: 'linear-gradient(90deg, #0A84FF, #00d4ff)',
                        borderRadius: '4px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                    <div
                      style={{
                        width: '8px',
                        height: '28px',
                        background: 'linear-gradient(180deg, #0A84FF, #00d4ff)',
                        borderRadius: '4px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <h1
              className="text-3xl font-black tracking-tight"
              style={{
                fontFamily: 'var(--font-poppins)',
                background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dr. Majid&apos;s
            </h1>
            <p
              className="text-base mt-1"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '11px',
              }}
            >
              Advanced Physiotherapy Clinic
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              style={{
                width: '220px',
                height: '3px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #0A84FF, #00d4ff)',
                  borderRadius: '10px',
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {Math.round(Math.min(progress, 100))}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
