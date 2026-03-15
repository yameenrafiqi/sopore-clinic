'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(hover: none)').matches) return;

    let animationId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const animateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      animationId = requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Attach hover detection to interactive elements
    const updateHoverTargets = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    document.addEventListener('mousemove', handleMove);
    animationId = requestAnimationFrame(animateRing);
    updateHoverTargets();

    // Re-attach on DOM changes
    const observer = new MutationObserver(updateHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        className="pointer-events-none fixed z-[10000] rounded-full"
        style={{
          width: isHovering ? 12 : 6,
          height: isHovering ? 12 : 6,
          background: 'white',
          left: pos.x - (isHovering ? 6 : 3),
          top: pos.y - (isHovering ? 6 : 3),
          transition: 'width 0.2s, height 0.2s',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          border: `2px solid ${isHovering ? 'rgba(10,132,255,0.8)' : 'rgba(10,132,255,0.5)'}`,
          left: ringPos.x - (isHovering ? 28 : 18),
          top: ringPos.y - (isHovering ? 28 : 18),
          transition: 'width 0.3s, height 0.3s, border-color 0.2s',
          boxShadow: isHovering ? '0 0 20px rgba(10,132,255,0.3)' : 'none',
        }}
      />
    </>
  );
}
