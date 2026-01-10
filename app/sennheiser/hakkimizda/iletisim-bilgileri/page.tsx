"use client";

import React from 'react';
import SubNav from '@/components/SubNav';
import { MapPin, Phone, Printer, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function IletisimBilgileri() {
  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/sennheiser/hakkimizda" },
    { name: "Bayilerimiz", href: "/sennheiser/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/sennheiser/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/sennheiser/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/sennheiser/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/sennheiser/hakkimizda/kunye" },
  ];

  const mapAddress = encodeURIComponent("Metan Teknik Müm. ve Tic. AŞ. Esentepe Mah. Yazarlar Sok. No:17 Şişli İstanbul");

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section - Unchanged as requested */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/julian-hochgesang-Dkn8-zPIbwo-unsplash.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-full w-full relative z-10">
          <h1 className="text-ful md:text-6xl font-semibold tracking-tight text-white">
            İletişim Bilgileri
          </h1>
          <div className="relative py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <SubNav links={hakkimizdaLinks} />

      <section className="px-6 md:px-12 pt-4 pb-8 bg-white">
        <div className="max-w-full mx-auto">
          {/* Grid with items-stretch for height matching */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* 1. LEFT COLUMN: Address & Technical Service Notice */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/30 flex-grow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Metan Teknik Müm. ve Tic. AŞ.</h2>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  Esentepe Mah. Yazarlar Sok. No:17 (Gayrettepe) <br />
                  34394 Şişli / İSTANBUL
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div className="space-y-0.5">
                    <span className="text-[13px] font-extrabold text-gray-400 uppercase tracking-tight flex items-center">
                      <Phone className="w-3 h-3 mr-1.5 text-brand-blue" /> Telefon
                    </span>
                    <p className="text-[16px] font-semibold text-gray-900">+90 212 293 37 50</p>
                    <p className="text-[16px] font-semibold text-gray-900">+90 212 293 37 51</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[13px] font-extrabold text-gray-400 uppercase tracking-tight flex items-center">
                      <Printer className="w-3 h-3 mr-1.5 text-brand-blue" /> Faks
                    </span>
                    <p className="text-[16px] font-semibold text-gray-900">+90 212 252 39 66</p>
                  </div>
                </div>
              </div>

              {/* Technical Service Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-0.5">Teknik Servis Gönderileri</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    Teknik Servisimiz merkez ofisimiz ile aynı adrestedir. Gönderilerinizin daha hızlı ilişkilendirilmesi için alıcı kısmına <span className="font-bold text-emerald-700">"MeTan Teknik Servis"</span> yazmanızı önemle rica ederiz.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. RIGHT COLUMN: E-mail Directory (Matched Height) */}
            <div className="lg:col-span-5 border border-gray-200 rounded-xl p-6 flex flex-col h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">E-posta Bilgileri</h2>
              </div>

              <div className="space-y-2 flex-grow">
                <EmailRow label="Satış ve Pazarlama" email="satis@metan.com" />
                <EmailRow label="Teknik Destek" email="servis@metan.com" />
                <EmailRow label="Muhasebe" email="muhasebe@metan.com" />
              </div>

              {/* Working Hours fixed to the bottom */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2 mb-1.5 text-gray-900">
                  <Clock className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="font-bold text-[13px] uppercase tracking-wider">Çalışma Saatleri</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-tight">
                  Pazartesi — Cuma: 09:00 - 18:00 <br />
                  Hafta sonu: Kapalı
                </p>
              </div>
            </div>

          </div>

          {/* Google Maps Embed Section */}
          <div className="mt-4 w-full h-[380px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
            <iframe 
              src={`https://www.google.com/maps?q=${mapAddress}&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-115 transition-all duration-700"
            />
          </div>

        </div>
      </section>
      
    </main>
  );
}

function EmailRow({ label, email }: { label: string; email: string }) {
  return (
    <a 
      href={`mailto:${email}`}
      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-brand-blue transition-all group"
    >
      <div>
        <span className="text-[13px] font-extrabold text-gray-400 uppercase tracking-tighter block mb-0.5">{label}</span>
        <p className="text-[16px] font-medium text-gray-900">{email}</p>
      </div>
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white border border-gray-200 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all">
        <Send className="w-3 h-3 text-gray-400 group-hover:text-white" />
      </div>
    </a>
  );
}