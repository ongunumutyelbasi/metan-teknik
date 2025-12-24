"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, Check, Download } from 'lucide-react';

const specs = [
  { label: "Transducer principle", value: "externally polarized condenser microphone" },
  { label: "Pick-up pattern", value: "cardioid" },
  { label: "Frequency response", value: "20 Hz to 20 kHz" },
  { label: "Sensitivity", value: "25 mV/Pa" },
  { label: "Max. SPL", value: "140 dB" },
  { label: "Equivalent noise level", value: "10 dB(A)" },
];

export default function SennheiserMK4Page() {
  const [currentImg, setCurrentImg] = useState(0);
  
  const productImages = [
    "/images/products/sennheiser-mk4-front.png",
    "/images/products/sennheiser-mk4-side.png",
    "/images/products/sennheiser-mk4-angle.png",
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* --- HERO SPLIT SECTION (100vh) --- */}
      <main data-nav-color="dark" className="flex h-screen w-full overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className="w-1/2 flex flex-col h-full bg-white relative px-8 pb-12">
          {/* Header Spacer */}
          <div className="h-[76px] w-full flex-shrink-0" />

          {/* IMAGE SECTION - The container for the product image and pinned arrows */}
          <div className="flex-1 flex items-center justify-center w-full min-h-0 relative"> 
            <div className="relative w-full max-w-xl aspect-square">
              <Image 
                src={productImages[currentImg]}
                alt="Sennheiser MK 4"
                fill
                className="object-contain transition-opacity duration-500"
                priority
              />
            </div>

            {/* NAVIGATION ARROWS: Pinned to bottom-right of THIS section with px-8 padding */}
            <div className="absolute bottom-0 right-8 flex space-x-2 z-30">
              <button onClick={prevImg} className="cursor-pointer group w-12 h-12 rounded-full bg-[#f4f4f6] flex items-center justify-center hover:bg-black transition-all duration-300">
                <ChevronLeft className="w-5 h-5 text-[#545252] group-hover:text-white transition-colors" />
              </button>
              <button onClick={nextImg} className="cursor-pointer group w-12 h-12 rounded-full bg-[#f4f4f6] flex items-center justify-center hover:bg-black transition-all duration-300">
                <ChevronRight className="w-5 h-5 text-[#545252] group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* PRODUCT INFO SECTION */}
          <div className="w-full flex-shrink-0 pt-8 relative z-20">
            <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Studio Microphones</h4>
            <h3 className="text-5xl font-semibold mb-6 tracking-tight">MK 4</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-light">
              Ev, proje ve profesyonel stüdyolar için profesyonel kalitede geniş diyaframlı gerçek kondansatör mikrofon.
            </p>
            <button className="cursor-pointer bg-black text-white px-10 py-4 rounded-full text-sm font-bold flex items-center space-x-3 hover:bg-metan-orange transition-all w-fit group shadow-lg">
              <span>Satın Alma Kanalları</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 relative bg-[#f4f4f6]">
          <Image 
            src="/images/products/mk4-lifestyle.webp"
            alt="MK 4 in Studio"
            fill
            className="object-cover"
          />
        </div>
      </main>

      {/* --- TECHNICAL SPECS SECTION --- */}
      <section className="py-24 bg-[#f6f6f6] px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12">Teknik Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 border-t border-gray-200 pt-8">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-gray-200 text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                <span className="text-right font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex space-x-8">
            <button className="flex items-center space-x-2 text-xs font-bold border-b-2 border-black pb-1 hover:opacity-50 transition-all">
              <Download className="w-4 h-4" />
              <span>TEKNİK BİLGİ (PDF)</span>
            </button>
            <button className="flex items-center space-x-2 text-xs font-bold border-b-2 border-black pb-1 hover:opacity-50 transition-all">
              <Download className="w-4 h-4" />
              <span>KULLANIM KILAVUZU (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- BOX CONTENTS --- */}
      <section className="py-24 px-8 lg:px-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-light mb-8">Kutu İçeriği</h2>
            <ul className="space-y-4">
              {[
                "MK 4 Mikrofon",
                "MZQ 4 Mikrofon Kelepçesi",
                "Koruyucu Kese",
                "Hızlı Başlangıç Kılavuzu",
                "Güvenlik Kılavuzu"
              ].map((item, i) => (
                <li key={i} className="text-lg text-gray-600 flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2 aspect-video relative bg-[#f4f4f6] rounded-2xl overflow-hidden shadow-inner">
            <Image 
              src="/images/products/mk4-box.webp"
              alt="MK 4 Box Content" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}