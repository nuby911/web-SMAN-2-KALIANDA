import React from 'react';

export function PageHero({
  badge,
  title,
  subtitle,
  bgImage,
  chips = [],
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white py-10 sm:py-16 lg:py-20 border-b border-navy-800">
      {/* Background Image with Cinematic Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="SMAN 2 Kalianda"
            className="w-full h-full object-cover object-center filter brightness-90"
            onError={(e) => {
              // Fallback to primary campus building if error
              e.target.src =
                'https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e64196bc720250513_085627.jpg';
            }}
          />
          {/* Gradient overlay to ensure 100% text readability while keeping the building/scene recognizable */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-900/70" />
          <div className="absolute inset-0 bg-navy-950/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3.5 sm:space-y-4">
          {/* School & Page Identifier Badge */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-royal-600 text-white shadow-xs">
              SMAN 2 KALIANDA
            </span>
            {badge && (
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-semibold tracking-wide bg-white/10 text-slate-200 border border-white/15 backdrop-blur-xs">
                {badge}
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight">
            {title}
          </h1>

          {/* Subtitle / Description */}
          {subtitle && (
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>
          )}

          {/* Quick Info Chips */}
          {chips && chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2 text-[10px] sm:text-[11px] text-slate-300">
              {chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-navy-900/80 border border-navy-700/80 text-slate-300 font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Optional Children (CTA buttons, search bars, etc.) */}
          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}
