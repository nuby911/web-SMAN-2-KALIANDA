import React from 'react';
import { cn } from '../../utils/formatters';

export function Badge({
  children,
  variant = 'slate',
  size = 'md',
  className = '',
  icon: Icon
}) {
  const variants = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    navy: 'bg-navy-100 text-navy-800 border-navy-200',
    royal: 'bg-royal-50 text-royal-600 border-royal-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
