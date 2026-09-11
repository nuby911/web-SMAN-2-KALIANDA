import React from 'react';
import { cn } from '../../utils/formatters';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-navy-800 hover:bg-navy-900 text-white shadow-md hover:shadow-lg focus:ring-navy-700',
    royal: 'bg-royal-600 hover:bg-royal-700 text-white shadow-md hover:shadow-lg focus:ring-royal-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400',
    outline: 'border-2 border-slate-200 hover:border-navy-800 text-slate-700 hover:text-navy-800 bg-white hover:bg-slate-50 focus:ring-navy-700',
    ghost: 'text-slate-600 hover:text-navy-900 hover:bg-slate-100 focus:ring-slate-300',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md focus:ring-emerald-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      
      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
