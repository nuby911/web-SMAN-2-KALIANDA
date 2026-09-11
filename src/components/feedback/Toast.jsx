import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/formatters';

export function Toast({
  message,
  type = 'success',
  isOpen,
  onClose,
  title,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  };

  const IconComponent = icons[type] || Info;

  const styles = {
    success: 'bg-navy-900 text-white border-emerald-500/60 shadow-lg',
    error: 'bg-rose-950 text-white border-rose-600 shadow-lg',
    info: 'bg-navy-900 text-white border-royal-500/60 shadow-lg',
  };

  const iconColors = {
    success: 'text-emerald-400',
    error: 'text-rose-400',
    info: 'text-royal-400',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fade-in-up">
      <div
        className={cn(
          'flex items-start gap-3 p-4 rounded-xl border',
          styles[type]
        )}
      >
        <IconComponent className={cn('w-5 h-5 shrink-0 mt-0.5', iconColors[type])} />
        <div className="flex-1 text-xs">
          {title && <h4 className="font-bold text-white mb-0.5 text-xs">{title}</h4>}
          <p className="text-slate-200 leading-relaxed text-[11px]">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
