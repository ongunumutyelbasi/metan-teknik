"use client";

import React from 'react';
import SubNav from '@/components/SubNav';
import { ArrowUpRight } from 'lucide-react';

export default function KunyePage() {
  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Bayilerimiz", href: "/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/hakkimizda/kunye" },
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/4184113C-Spectera_Behind_Spectera_Photo_12-1-1-.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-full w-full relative z-10">
          <h1 className="text-full md:text-6xl font-semibold tracking-tight text-white">
            Künye
          </h1>
          <div className="relative py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <SubNav links={hakkimizdaLinks} />

      {/* Main wrapper ID restored as per BİK technical specs */}
      <div id="bik-kunye-main" data-nav-color="dark" className="max-w-5xl mx-auto px-6 md:px-12 pt-6 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          
          {/* Management & Design List with restored IDs */}
          <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b pb-2">Yönetim ve Tasarım</h3>
            
            {/* Sinan is designated as the Sorumlu Müdür in the legal data */}
            <KunyeItem 
              id="bik-kunye-sorumlu-yim" 
              label="Site Yönetimi" 
              value="Sinan Buğdaycı" 
              email="sinan@metan.com" 
              showArrow
            />
            
            <KunyeItem 
              label="İçerik Yönetimi" 
              value="Figen Yücel" 
              email="figen@metan.com" 
              showArrow
            />
            
            {/* Developer is designated as the Yer Sağlayıcı in the legal data */}
            <KunyeItem 
              id="bik-kunye-yer-saglayici-unvan" 
              label="Site Tasarımı ve Kodlama" 
              value="Metin Budak" 
              email="info@yankimetin.com" 
              showArrow 
            />
          </div>

          {/* Optional: Company Metadata section without the BİK 'Yasal Bilgiler' header */}
          <div className="space-y-8">
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b pb-2">Kurumsal</h3>
             <div className="space-y-6">
                <div className="flex flex-col border-b border-gray-50 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Ticaret Unvanı</span>
                  <div id="bik-kunye-ticaret-unvani" className="text-md font-medium text-gray-900">METAN TEK. MÜM. ve TİC.AŞ.</div>
                </div>

                <div className="flex flex-col border-b border-gray-50 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Yönetim Yeri</span>
                  <div id="bik-kunye-yonetim-yeri" className="text-md font-medium text-gray-900">İstanbul, Türkiye</div>
                </div>

                <div className="flex flex-col border-b border-gray-50 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">E-Posta</span>
                  <div id="bik-kunye-eposta" className="text-md font-medium text-gray-900">info@metan.com</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}

/* Helper Component with ID support */
function KunyeItem({ id, label, value, email, showArrow }: { id?: string, label: string, value: string, email: string, showArrow?: boolean }) {
  return (
    <div className="group">
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">{label}</span>
      <p id={id} className="text-xl font-medium text-black">{value}</p>
      <a href={`mailto:${email}`} className="text-sm text-gray-500 hover:text-brand-blue transition-colors inline-flex items-center">
        {email} {showArrow && <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </a>
    </div>
  );
}