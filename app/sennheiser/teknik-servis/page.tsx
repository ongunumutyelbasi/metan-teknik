"use client";

import React from 'react';
import SubNav from '@/components/SubNav';
import { 
  Wrench, 
  Headphones, 
  Mic2, 
  Truck, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function TeknikServis() {
  const teknikServisLinks = [
    { name: "Teknik Servis", href: "/teknik-servis" },
    { name: "Servis Ücretleri", href: "/teknik-servis/servis-ucretleri" },
    { name: "Kullanım Kılavuzları", href: "/teknik-servis/kullanim-kilavuzlari" },
    { name: "Müşteri Memnuniyeti", href: "/teknik-servis/musteri-memnuniyeti" },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="/images/sennheiser-repairs.avif" 
            alt="Teknik Servis" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Content */}
        <div className="max-w-full w-full relative z-20">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Teknik Servis
          </h1>
          <div className="relative py-6">
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Floating Acil Destek Box - Red Alert Theme */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 w-full max-w-[340px] hidden md:block">
          <div className="bg-gradient-to-br from-red-950/80 to-black/90 backdrop-blur-xl text-white rounded-2xl p-6 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] relative overflow-hidden group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700" />
            <Zap className="absolute right-[-10px] top-[-10px] w-24 h-24 text-red-500/10 -rotate-12 group-hover:text-red-500/20 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,1)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-200/60">Destek Hattı</span>
              </div>
              <h3 className="text-xl font-bold mb-1 tracking-tight text-white">Acil Teknik Destek</h3>
              <p className="text-red-100/70 text-[12px] mb-5 leading-tight">
                Mesai saatleri dışındaki acil durumlar için profesyonel destek hattı.
              </p>
              <a href="tel:05325987943" className="text-2xl font-mono font-bold text-white hover:text-red-400 transition-colors block underline decoration-red-500/50 underline-offset-8">
                0532 598 79 43
              </a>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[12px] text-white/70 uppercase font-medium">Hizmet Saatleri</span>
                <span className="text-[12px] font-bold text-white/70 tracking-wide bg-red-500/10 px-2 py-1 rounded">08:00 – 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubNav links={teknikServisLinks} />

      <section className="px-6 md:px-12 pt-6 pb-24 bg-white">
        <div className="max-w-full mx-auto">
          
          {/* 1. Provider Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="border border-brand-blue rounded-2xl p-8 flex flex-col bg-brand-blue/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center">
                  <Mic2 className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pro Audio Servisi</h2>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Metan Teknik</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Pro Serisi stüdyo mikrofonları, broadcast kulaklıkları, monitörler ve konferans sistemleri için yetkili servis.
              </p>
              
              {/* Contact Information with Bayilerimiz-style Animation */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <a 
                  href="https://maps.app.goo.gl/Qv7h7ynZSLB3h9Mq6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-sm hover:text-brand-blue transition-colors group/link w-fit"
                >
                  <MapPin className="w-4 h-4 mr-3 text-brand-blue flex-shrink-0" /> 
                  <span>Esentepe Mah. Yazarlar Sok. No:17 Şişli/İST</span>
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5 text-gray-500 transition-all duration-200 group-hover/link:text-brand-blue group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" strokeWidth={3} />
                </a>
                <a 
                  href="tel:02122933750" 
                  className="flex items-center text-sm hover:text-brand-blue transition-colors group/link w-fit"
                >
                  <Phone className="w-4 h-4 mr-3 text-brand-blue flex-shrink-0" /> 
                  <span>0 212 293 37 50</span>
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5 text-gray-500 transition-all duration-200 group-hover/link:text-brand-blue group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" strokeWidth={3} />
                </a>
                <a 
                  href="mailto:servis@metan.com" 
                  className="flex items-center text-sm hover:text-brand-blue transition-colors group/link w-fit"
                >
                  <Mail className="w-4 h-4 mr-3 text-brand-blue flex-shrink-0" /> 
                  <span>servis@metan.com</span>
                  <ArrowUpRight className="ml-1 w-3.5 h-3.5 text-gray-600 transition-all duration-200 group-hover/link:text-brand-blue group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" strokeWidth={3} />
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-8 flex flex-col bg-gray-50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <Headphones className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Son Kullanıcı Servisi</h2>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Bircom (SeCom)</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Cep telefonu, PC Kulaklıkları (CX, GSP, PXC, RS serileri) ve Bluetooth ürünler için yetkili servis.
              </p>
              <a 
                href="https://www.bircom.com" 
                target="_blank" 
                className="inline-flex items-center text-brand-blue font-bold hover:underline group/external"
              >
                bircom.com'a git <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover/external:-translate-y-0.5 group-hover/external:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* 2. Pricing Table */}
          <div className="space-y-12 mb-20">
            <h2 className="text-3xl font-bold text-center">Servis ve Bakım Ücretleri</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 font-bold border-b text-gray-900 text-sm">Seri / Cihaz</th>
                    <th className="p-4 font-bold border-b text-center text-gray-900 text-sm">Arıza Tespit (€)</th>
                    <th className="p-4 font-bold border-b text-center text-gray-900 text-sm">Onarım / Tamir (€)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <ServiceRow label="Kablolu Mikrofonlar" tespit="5,00" tamir="15,00" />
                  <ServiceRow label="ew G1-G4 Serisi (Set)" tespit="10,00" tamir="50,00" />
                  <ServiceRow label="SL ve AVX Serisi" tespit="5,00" tamir="25,00" />
                  <ServiceRow label="2000 Serisi" tespit="10,00" tamir="30,00" />
                  <ServiceRow label="3000 / 5000 Serisi" tespit="15,00" tamir="35,00" />
                  <ServiceRow label="Stüdyo Mikrofon ve Hoparlör" tespit="15,00" tamir="35,00" />
                  <ServiceRow label="HD Pro Serisi Kulaklık" tespit="5,00" tamir="20,00" />
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Conditions & Notice - Perfectly Aligned Height */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center">
              <Truck className="mr-3 w-6 h-6 text-brand-blue" /> Kargo Koşulları & Notlar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ConditionCard text="Garanti dahili onarımlardan kargo ücreti alınmaz." />
              <ConditionCard text="1150 TL (25€) üzeri onarımlarda (azami 1kg) kargo ücretsizdir." />
              
              {/* Important Notice Box - Spanning 2 rows to match cards */}
              <div className="md:row-span-2 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-2 text-amber-700">
                  <AlertTriangle className="w-6 h-6" />
                  <h3 className="font-bold text-lg uppercase tracking-wider">Önemli Not</h3>
                </div>
                <p className="text-sm text-amber-900/80 leading-snug">
                  Arızalı ürün gönderilerinizde <strong className="font-bold text-amber-950">e-mail, GSM numarası</strong> ve <strong className="font-bold text-amber-950">arıza tarifi</strong> eklemeyi unutmayınız. Fatura ibrazı zorunludur.
                </p>
              </div>

              <ConditionCard text="Yedek parça alımlarında 1150 TL üzeri (azami 1kg) kargo ücretsizdir." />
              <ConditionCard text="Anlaşmalı Kargo: MNG ve DHL Kargo." />
            </div>
          </div>

          {/* Mobile Only Destek Box */}
          <div className="mt-12 md:hidden">
            <div className="bg-red-600 text-white rounded-2xl p-6 shadow-xl shadow-red-200 border border-red-500">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-100">Acil Destek</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Acil Teknik Destek</h3>
                <a href="tel:05325987943" className="text-3xl font-mono font-bold block mb-2">
                  0532 598 79 43
                </a>
                <p className="text-red-100/70 text-xs italic">08:00 – 20:00 arası aktiftir.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

function ServiceRow({ label, tespit, tamir }: { label: string; tespit: string; tamir: string }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="p-4 font-medium text-gray-700">{label}</td>
      <td className="p-4 text-center text-gray-500">{tespit} €</td>
      <td className="p-4 text-center text-gray-900 font-bold">{tamir} €</td>
    </tr>
  );
}

function ConditionCard({ text }: { text: string }) {
  return (
    <div className="flex items-start p-5 bg-gray-50 rounded-xl border border-gray-100">
      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
      <span className="text-sm font-medium text-gray-700 leading-snug">{text}</span>
    </div>
  );
}