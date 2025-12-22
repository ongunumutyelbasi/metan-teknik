"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Globe } from 'lucide-react';

export default function MetanTeknikFooter() {
  const currentYear = new Date().getFullYear();

  const techLinks = [
    { name: "Teknik Servis", href: "#" },
    { name: "Yazılım Güncellemeleri", href: "#" },
    { name: "Yedek Parça Kataloğu", href: "#" },
    { name: "Garanti Sorgulama", href: "#" },
  ];

  const resourceLinks = [
    { name: "Kullanım Kılavuzları", href: "#" },
    { name: "CAD Çizimleri", href: "#" },
    { name: "API Dokümantasyonu", href: "#" },
    { name: "Eğitim Videoları", href: "#" },
  ];

  return (
    <div className="w-full block overflow-hidden relative">
      {/* Futuristic Gradient Background - Vivid Orange Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: `radial-gradient(circle at 90% 100%, rgba(239, 118, 34, 0.15) 0%, rgba(239, 118, 34, 0.05) 30%, rgba(10, 10, 11, 1) 70%) #0a0a0b`
        }}
      />
      
      <footer className="text-[#a1a1aa] pt-12 pb-8 px-8 font-sans block w-full relative z-10">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-6">
            
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <Link href="/">
                  <Image 
                    src="/images/metan-logo-white.png" 
                    alt="Metan Logo" 
                    width={140} 
                    height={40} 
                    className="h-15 w-auto object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* HİZMETLER */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-regular mb-3 flex items-center">
                Hizmetler
              </h4>
              <ul className="space-y-3 text-sm">
                {techLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-metan-orange transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* KAYNAKLAR */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-regular mb-3 flex items-center">
                Kaynaklar
              </h4>
              <ul className="space-y-3 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-metan-orange transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certification Section */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-6 rounded-2xl">
              <h4 className="text-white text-xs font-bold uppercase tracking-regular mb-4 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-metan-orange" /> Kalite Standartları
              </h4>
              <p className="text-[12px] leading-relaxed mb-4">
                Tüm servis süreçlerimiz uluslararası standartlara uygun ve sertifikalıdır.
              </p>
              <div className="flex space-x-4 grayscale opacity-30">
                 <div className="h-8 w-8 bg-white/20 rounded"></div>
                 <div className="h-8 w-8 bg-white/20 rounded"></div>
                 <div className="h-8 w-8 bg-white/20 rounded"></div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[11px] uppercase tracking-regular">
              © 1992-{currentYear} Metan Teknik Müm. ve Tic. AŞ. | Türkiye
            </div>
            <div className="flex items-center space-x-8 text-[11px] uppercase tracking-regular">
              <Link href="#" className="hover:text-metan-orange transition-colors">Gizlilik Politikası</Link>
              <Link href="#" className="hover:text-metan-orange transition-colors">KVKK</Link>
              <div className="flex items-center text-white/40">
                <Globe className="w-3 h-3 mr-1" />
                <span>TR / EN</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}