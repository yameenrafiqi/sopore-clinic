'use client';

import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hello Dr. Majid's Clinic! I'd like to book an appointment. Please let me know your availability.",
  );

  return (
    <motion.a
      href={`https://wa.me/917889489861?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 3.5 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <img src="/images/whatsapp.jpg" alt="WhatsApp" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
    </motion.a>
  );
}
