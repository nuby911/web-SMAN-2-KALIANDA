import React from 'react';
import { cn } from '../../utils/formatters';

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-hidden border border-slate-200/90 rounded-2xl shadow-soft bg-white">
      <div className="overflow-x-auto">
        <table className={cn('w-full text-left border-collapse text-sm', className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return (
    <thead className={cn('bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }) {
  return (
    <tbody className={cn('divide-y divide-slate-100 text-slate-800', className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', hover = true }) {
  return (
    <tr className={cn(hover && 'hover:bg-slate-50/70 transition-colors', className)}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return (
    <th scope="col" className={cn('px-3.5 sm:px-6 py-3 sm:py-4 font-semibold text-slate-700 text-xs sm:text-sm', className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = '' }) {
  return (
    <td className={cn('px-3.5 sm:px-6 py-3 sm:py-4 text-slate-700 font-normal text-xs sm:text-sm', className)}>
      {children}
    </td>
  );
}
