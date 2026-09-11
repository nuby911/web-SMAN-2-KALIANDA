import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered fade-in animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
