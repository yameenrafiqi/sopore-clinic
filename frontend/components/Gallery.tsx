'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    category: 'Clinic',
    alt: 'Clinic interior — reception area',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqjvEXsImBI4Ed3ouvTILsssWBEziwi4GZNOHAyB_yjpbfx38IHh8qv0pNeQkrYZC-9vG12QbXvO9BDlWSucOdhD5zi3fV8FSjrNbD84YY13rNHanGnF47RshPVIbwpPw0-epHd8YGs5UYC=s1360-w1360-h1020-rw',
    aspect: 'tall',
  },
  {
    id: 2,
    category: 'Clinic',
    alt: 'Patient waiting area',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqlEfdH-BQ7jLlQ27PJtC9dE0atJZVsrsMjjjI517x8y3UUJDnKRa2DKgCu8uVvmaBskfRVNnHLdOMBzaTnwQXXJRAhRDW1NyAT1bLSYZf7_A180qyHownyBMXDgscihDCNFTJjpVuHwRQ=s1360-w1360-h1020-rw',
    aspect: 'wide',
  },
  {
    id: 3,
    category: 'Equipment',
    alt: 'Advanced therapy equipment',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepno5WbFiUde_yLZshLWK50khsdI3Ti-uw913TjoN-eXlX-j0DbX1hAMusQ9RzJG_yjx-0SCoD2LvTQAtBSc20xQyMyD9fOqJk3CgYN935eOu8duWQPLigI6pFruMoCfKDWoF7VNg6p6Ss=s1360-w1360-h1020-rw',
    aspect: 'normal',
  },
  {
    id: 4,
    category: 'Clinic',
    alt: 'Treatment room',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwep_WKDzx0vPqptji-QYqJah_L4dDON6Dh6zzDDF4h2U7dlhQJnjDNTVCcu3uKVyY803vIrM5qi6Bbl2egnKlRjRxHcdfqY-mAJ7ljuISp4fkGwHDGqZ0bcm1lT1cOSWW7-vSAqFk2fbUs8l=s1360-w1360-h1020-rw',
    aspect: 'normal',
  },
  {
    id: 5,
    category: 'Equipment',
    alt: 'Electrotherapy unit',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepAmus9WaA3tMo-Y761yf0fxkp7Z90Y__is_QvWGgMuQ8CwmZtbQqv70LjWRjxNn4DsV8sTeeT0lGD_uA62ZZIvobjaBtpcTuP8Jy5H_gFFy2g1BoekGzV59aBKKn3krnQH5MqjhKI5Vv46=s1360-w1360-h1020-rw',
    aspect: 'tall',
  },
  {
    id: 6,
    category: 'Treatment',
    alt: 'Physiotherapy treatment session',
    src: 'https://lh3.googleusercontent.com/p/AF1QipMNYZtOb9flCU_FBt7VJLQ8m0sVDmDGnkLghgTk=s1360-w1360-h1020-rw',
    aspect: 'normal',
  },
  {
    id: 7,
    category: 'Treatment',
    alt: 'Manual therapy treatment',
    src: 'https://lh3.googleusercontent.com/p/AF1QipNiGLB98FB3K_JtnkIRsHYOnwE3N777vQ2EbJA8=s1360-w1360-h1020-rw',
    aspect: 'wide',
  },
  {
    id: 8,
    category: 'Equipment',
    alt: 'CPM therapy machine',
    src: 'https://lh3.googleusercontent.com/p/AF1QipNwCj5Lw3wEsT-E9K6xgAM5M0oxg4LyoZtoqtDu=s1360-w1360-h1020-rw',
    aspect: 'normal',
  },
  {
    id: 9,
    category: 'Recovery',
    alt: 'Patient recovery exercise',
    src: 'https://lh3.googleusercontent.com/p/AF1QipPBjD3G3a4g6eNQfbu-mq1JZw0OD74gCfIDlWTb=s1360-w1360-h1020-rw',
    aspect: 'tall',
  },
  {
    id: 10,
    category: 'Clinic',
    alt: 'Clinic exterior',
    src: 'https://lh3.googleusercontent.com/p/AF1QipMWXlXEofLGg0k57OHuJbMnpoN3c-Q4ayTaLgbL=s1360-w1360-h1020-rw',
    aspect: 'wide',
  },
];

const categoryColors: Record<string, string> = {
  'All': '#0A84FF',
  'Clinic': '#00d4ff',
  'Equipment': '#FFB800',
  'Treatment': '#34c759',
  'Recovery': '#ff375f',
};

const heightMap: Record<string, string> = {
  tall: '340px',
  wide: '200px',
  normal: '260px',
};

function LightboxModal({
  item,
  onClose,
}: {
  item: (typeof galleryItems)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[90vw] max-w-3xl rounded-3xl overflow-hidden relative" style={{ border: '1px solid var(--border)' }}>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full max-h-[80vh] object-contain"
            style={{ background: '#f7f9fc' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
          >
            <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>
              {item.alt}
            </p>
            <span
              className="text-xs mt-1 inline-block px-3 py-1 rounded-full"
              style={{ background: 'rgba(10,132,255,0.7)', color: 'white' }}
            >
              {item.category}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
        >
          <X size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const categories = ['All', 'Clinic', 'Equipment', 'Treatment', 'Recovery'];

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.2)' }}
            >
              <Filter size={14} style={{ color: '#0A84FF' }} />
              <span style={{ color: '#0A84FF', fontSize: '13px', fontWeight: 600 }}>
                Our Clinic Gallery
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              Inside Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Clinic
              </span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Browse our state-of-the-art facilities, equipment, and patient success stories.
            </p>
          </motion.div>
        </div>

        {/* Category filter */}
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? categoryColors[cat] : 'var(--glass-bg)',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat ? categoryColors[cat] : 'var(--border)'}`,
                fontFamily: 'var(--font-inter)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry gallery */}
        <div className="masonry-grid">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="masonry-item group relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightboxItem(item)}
                layout
              >
                {/* Gallery card */}
                <div
                  className="w-full rounded-2xl relative overflow-hidden"
                  style={{
                    height: heightMap[item.aspect],
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Real photo */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(10,132,255,0.8)' }}
                    >
                      <ZoomIn size={20} style={{ color: 'white' }} />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div
                    className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {item.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
