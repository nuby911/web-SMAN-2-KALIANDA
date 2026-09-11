import React from 'react';
import { cn } from '../../utils/formatters';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200/80 shadow-soft transition-all duration-300',
        hover && 'hover:shadow-card hover:-translate-y-1 hover:border-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
