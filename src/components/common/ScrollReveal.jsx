import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../utils/formatters';

/**
 * Wrapper component that animates children on scroll into view.
 * Supports multiple animation directions and configurable delay.
 */
export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  as: Component = 'div',
  ...props
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const baseStyles = {
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    opacity: isVisible ? 1 : 0,
  };

  const transforms = {
    up: isVisible ? 'translateY(0)' : 'translateY(32px)',
    down: isVisible ? 'translateY(0)' : 'translateY(-32px)',
    left: isVisible ? 'translateX(0)' : 'translateX(32px)',
    right: isVisible ? 'translateX(0)' : 'translateX(-32px)',
    none: 'none',
  };

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        ...baseStyles,
        transform: transforms[direction] || transforms.up,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
