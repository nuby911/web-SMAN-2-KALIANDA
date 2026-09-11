import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { StatsWidget } from '../../components/home/StatsWidget';
import { PrincipalWelcome } from '../../components/home/PrincipalWelcome';
import { ProgramsSection } from '../../components/home/ProgramsSection';
import { NewsSection } from '../../components/home/NewsSection';
import { GalleryPreview } from '../../components/home/GalleryPreview';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { siteConfig } from '../../config/siteConfig';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section — always visible, no scroll reveal */}
      <HeroSection />

      {/* 2. Key Performance Metric Cards */}
      <ScrollReveal>
        <StatsWidget />
      </ScrollReveal>

      {/* 3. Sambutan Kepala Sekolah */}
      <ScrollReveal delay={100}>
        <PrincipalWelcome />
      </ScrollReveal>

      {/* 4. Program Unggulan */}
      <ScrollReveal>
        <ProgramsSection />
      </ScrollReveal>

      {/* 5. Berita & Kegiatan Sekolah */}
      <ScrollReveal>
        <NewsSection />
      </ScrollReveal>

      {/* 6. Galeri Dokumentasi */}
      <ScrollReveal>
        <GalleryPreview />
      </ScrollReveal>

      {/* 7. CTA Banner PPDB Online 2026/2027 */}
      <ScrollReveal>
        <section className="py-16 bg-navy-900 text-white relative border-t border-navy-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-navy-800 text-royal-300 border border-navy-700 text-xs font-semibold">
              Penerimaan Siswa Baru Tahun Ajaran 2026/2027
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Wujudkan Masa Depan Gemilang Bersama {siteConfig.name}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Bergabunglah dengan Sekolah Unggul Provinsi Lampung yang asri, berprestasi, dan berkarakter religius berlandaskan semangat Sakai Sambaiyan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/ppdb">
                <Button
                  variant="royal"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="font-bold shadow-lg shadow-royal-600/30"
                >
                  Daftar PPDB Sekarang
                </Button>
              </Link>
              <Link to="/kontak">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/40 text-white hover:bg-white/15 font-bold"
                >
                  Hubungi Panitia PPDB
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

