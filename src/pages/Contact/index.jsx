import React, { useState } from 'react';
import { siteConfig } from '@/config';
import { Card, Badge, Button, Toast, PageHero } from '@/components';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    kategori: 'Informasi Umum',
    subjek: '',
    pesan: '',
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.pesan) {
      alert('Nama dan isi pesan wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage({
        title: 'Pesan Terkirim!',
        message: 'Terima kasih, pesan Anda telah diteruskan ke layanan Tata Usaha dan akan dibalas dalam 1x24 jam kerja.',
        type: 'success',
      });
      setFormData({
        nama: '',
        email: '',
        telepon: '',
        kategori: 'Informasi Umum',
        subjek: '',
        pesan: '',
      });
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        badge="Layanan Komunikasi & Informasi"
        title="Hubungi SMAN 2 Kalianda"
        subtitle={`Pusat informasi publik, layanan terpadu satu pintu, pengaduan masyarakat, serta panduan lokasi kampus ${siteConfig.name} di Kalianda, Lampung Selatan.`}
        bgImage="https://s3.schoolmedia.id/01-cms-website/smanegeri2kalianda.sch.id/editor/6969e64196bc720250513_085627.jpg"
        chips={['Jl. Trans Sumatera, Kedaton, Kalianda', 'Senin - Jumat: 07.15 - 16.00 WIB', 'Layanan Terpadu Satu Pintu']}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Alamat Kampus</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {siteConfig.kontak.alamat}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Telepon & WhatsApp</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Telepon Tata Usaha: <span className="font-semibold text-slate-800">{siteConfig.kontak.telepon}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    WhatsApp PPDB: <span className="font-semibold text-slate-800">{siteConfig.kontak.whatsapp}</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Email Resmi</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Informasi: <span className="font-semibold text-slate-800">{siteConfig.kontak.email}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Layanan PPDB: <span className="font-semibold text-slate-800">{siteConfig.kontak.emailPpdb}</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Jam Operasional Kantor</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {siteConfig.kontak.jamKerja}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sabtu, Minggu & Hari Libur Nasional: Tutup
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-900">
                  Kirim Pesan / Permohonan Informasi
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Silakan lengkapi formulir di bawah ini. Tim kami akan menghubungi Anda kembali.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="nama"
                      required
                      placeholder="Nama Anda"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@anda.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      placeholder="08xxxxxxxxxx"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Kategori Pesan
                    </label>
                    <select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 bg-white"
                    >
                      <option>Informasi Umum</option>
                      <option>Pendaftaran PPDB</option>
                      <option>Layanan Akademik</option>
                      <option>Kemitraan & Kerjasama</option>
                      <option>Pengaduan Masyarakat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subjek Pesan
                  </label>
                  <input
                    type="text"
                    name="subjek"
                    placeholder="Judul pokok pesan"
                    value={formData.subjek}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Isi Pesan *
                  </label>
                  <textarea
                    name="pesan"
                    required
                    rows={4}
                    placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda sampaikan secara jelas..."
                    value={formData.pesan}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="royal"
                    size="md"
                    icon={Send}
                    loading={isSubmitting}
                    className="w-full sm:w-auto font-bold px-8 shadow-card"
                  >
                    Kirimkan Pesan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-royal-600" />
                <span>Peta Lokasi Kampus {siteConfig.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Jl. Trans Sumatera, Kedaton, Kec. Kalianda, Kab. Lampung Selatan — Akses jalan nasional utama yang strategis dan mudah dijangkau.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=SMAN+2+Kalianda"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-royal-600 hover:text-navy-900 underline"
            >
              Buka di Google Maps ↗
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center">
            {/* Interactive Embedded Map for SMAN 2 Kalianda */}
            <iframe
              title="Peta Lokasi SMAN 2 Kalianda"
              src="https://maps.google.com/maps?q=SMAN+2+Kalianda&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>

      {toastMessage && (
        <Toast
          isOpen={!!toastMessage}
          onClose={() => setToastMessage(null)}
          title={toastMessage.title}
          message={toastMessage.message}
          type={toastMessage.type}
        />
      )}
    </div>
  );
}
