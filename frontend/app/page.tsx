'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LoadingScreen from '@/components/LoadingScreen';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import AnnouncementBanner from '@/components/AnnouncementBanner';

// Lazy-load all below-fold sections — they won't block the hero from painting
const Statistics   = dynamic(() => import('@/components/Statistics'));
const About        = dynamic(() => import('@/components/About'));
const Facilities   = dynamic(() => import('@/components/Facilities'));
const Treatments   = dynamic(() => import('@/components/Treatments'));
const GallerySection = dynamic(() => import('@/components/Gallery'), { ssr: false });
const Reviews      = dynamic(() => import('@/components/Reviews'));
const Booking      = dynamic(() => import('@/components/Booking'));
const Footer       = dynamic(() => import('@/components/Footer'));
const AIChat       = dynamic(() => import('@/components/AIChat'), { ssr: false });

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and then reveal the page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

      {/* Fixed floating elements */}
      <WhatsAppButton />
      <ScrollToTop />
      <AIChat />

      {/* Announcement banner + Navbar stacked in a single fixed container so the
          banner never overlaps the nav — they flow vertically together */}
      <div className="fixed top-0 left-0 right-0 z-[1100] flex flex-col">
        <AnnouncementBanner />
        <Navbar />
      </div>

      {/* Main content */}
      <main
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* 1. Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* 2. Statistics */}
        <section id="stats">
          <Statistics />
        </section>

        {/* 3. About */}
        <section id="about">
          <About />
        </section>

        {/* 4. Facilities */}
        <section id="facilities">
          <Facilities />
        </section>

        {/* 5. Treatments */}
        <section id="treatments">
          <Treatments />
        </section>

        {/* 6. Gallery */}
        <section id="gallery">
          <GallerySection />
        </section>

        {/* 7. Reviews */}
        <section id="reviews">
          <Reviews />
        </section>

        {/* 8. Online Booking */}
        <section id="booking">
          <Booking />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
