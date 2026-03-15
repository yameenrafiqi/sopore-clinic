'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Announcement {
  title: string;
  content: string;
}

// Default announcements — will be overridden by API data in production
const defaultAnnouncements: Announcement[] = [
  {
    title: '🎉 New Equipment',
    content:
      'We recently upgraded our Shockwave Therapy equipment. Book now for advanced pain treatment.',
  },
  {
    title: '⏰ Extended Hours',
    content: 'We now offer Saturday appointments from 9 AM – 2 PM.',
  },
];

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api';

  useEffect(() => {
    // 1. Try backend first
    fetch(`${BACKEND_URL}/announcements`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.length > 0) { setAnnouncements(data); return; }
        throw new Error('empty');
      })
      .catch(() => {
        // 2. Fall back to localStorage (written by admin panel in demo mode)
        try {
          const local = JSON.parse(localStorage.getItem('clinic_announcements') || '[]');
          if (local.length > 0) setAnnouncements(local);
        } catch { /* keep defaults */ }
      });
  }, [BACKEND_URL]);

  // Re-check localStorage when the tab is focused (admin may have added one)
  useEffect(() => {
    const onFocus = () => {
      try {
        const local = JSON.parse(localStorage.getItem('clinic_announcements') || '[]');
        if (local.length > 0) setAnnouncements(local);
      } catch { /* ignore */ }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Rotate announcements every 5 s
  useEffect(() => {
    if (announcements.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(id);
  }, [announcements]);

  if (dismissed || announcements.length === 0) return null;

  const ann = announcements[current];

  return (
    <div className="announcement-banner relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <strong>{ann.title}</strong> — {ann.content}
        </motion.span>
      </AnimatePresence>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
