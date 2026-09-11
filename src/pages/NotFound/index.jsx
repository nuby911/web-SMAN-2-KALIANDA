import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="space-y-2">
          <span className="text-6xl font-black text-navy-900 tracking-tight block">404</span>
          <h1 className="text-xl font-bold text-navy-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Halaman yang Anda tuju tidak tersedia atau telah dipindahkan ke tautan baru.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" icon={Home} className="bg-navy-800 hover:bg-navy-900 font-bold">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
