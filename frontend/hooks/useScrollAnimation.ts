import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade-up reveal animation on scroll using GSAP ScrollTrigger.
 * Returns a ref to attach to the container.
 */
export function useFadeUpOnScroll<T extends HTMLElement>(
  selector: string = '.fade-up-child',
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    once?: boolean;
  } = {},
) {
  const containerRef = useRef<T>(null);

  const { stagger = 0.1, duration = 0.7, y = 40, once = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reset',
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [selector, stagger, duration, y, once]);

  return containerRef;
}

/**
 * Parallax effect on a target element as user scrolls.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Counter animation using GSAP.
 */
export function useCounterAnimation(
  endValue: number,
  duration: number = 2,
  startOnView: boolean = true,
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };

    const animate = () => {
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (el) {
            el.textContent = Math.round(obj.value).toLocaleString();
          }
        },
      });
    };

    if (startOnView) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: animate,
        });
      });
      return () => ctx.revert();
    } else {
      animate();
    }
  }, [endValue, duration, startOnView]);

  return ref;
}
