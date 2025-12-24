"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const companies = [
  {
    id: 1,
    name: "Sennheiser",
    logo: "/images/SVG/sennheiser-full-logo.svg",
    bgImage: "/images/Spectera_Product_Shot_In_Use_39_.jpg",
    description: "Profesyonel Ses Çözümleri ve Kablosuz Sistemler",
    link: "/sennheiser",
    logoClass: "h-6 md:h-7"
  },
  {
    id: 2,
    name: "Neumann",
    logo: "/images/SVG/neumann-light.svg",
    bgImage: "/images/Neumann_U47_Tube.jpg",
    description: "Efsanevi Stüdyo Mikrofonları ve Monitörleri",
    link: "/neumann", 
    logoClass: "h-12 md:h-16"
  },
  {
    id: 3,
    name: "Merging Technologies",
    logo: "/images/SVG/Merging_Technologies_Logo.svg",
    bgImage: "/images/PMX_15-A.jpg",
    description: "Yüksek Performanslı Ses Kartları ve Arabirimler",
    link: "/merging", 
    logoClass: "h-12 md:h-16"
  }
];

export default function MetanPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle on mobile only to keep the hero dynamic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % companies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* --- MAIN COMPANY SHOWCASE --- */}
      <main 
        data-nav-color="light" 
        className="relative flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-black"
      >
        {companies.map((company, index) => (
          <div
            key={company.id}
            onClick={() => setActiveIndex(index)}
            className={`relative transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center overflow-hidden cursor-pointer
              ${activeIndex === index ? "flex-[10] lg:flex-[1.5]" : "flex-1 lg:flex-[0.75]"}
            `}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={company.bgImage}
                alt={company.name}
                fill
                className={`object-cover transition-transform duration-[3000ms] ${
                  activeIndex === index ? "scale-110 blur-0" : "scale-100 blur-[2px] lg:blur-0"
                }`}
                priority
              />
              <div className={`absolute inset-0 transition-opacity duration-700 bg-black ${
                activeIndex === index ? "opacity-40" : "opacity-70"
              }`} />
            </div>

            {/* Logo Container - Pushed down on mobile to clear the header */}
            <div className={`relative z-10 transition-all duration-700 transform flex flex-col items-center pt-20 lg:pt-0`}>
               <Image 
                  src={company.logo} 
                  alt={`${company.name} Logo`} 
                  width={300} 
                  height={150} 
                  className={`w-auto object-contain brightness-0 invert transition-all duration-700 ${
                    activeIndex === index 
                      ? "h-8 lg:h-10 scale-110 opacity-100" 
                      : "h-5 lg:h-7 scale-90 opacity-50 lg:opacity-100"
                  }`}
                />
            </div>

            {/* Detail Section - Link is only active for the expanded item */}
            <div className={`absolute bottom-[15%] lg:top-[58%] left-0 w-full px-10 transition-all duration-700 flex flex-col items-center text-center ${
              activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}>
              <Link 
                href={company.link}
                className="inline-flex items-center bg-white space-x-3 text-black border border-white/50 px-8 py-3 rounded-full transition-all duration-300 active:scale-95"
              >
                <span className="text-xs font-bold uppercase tracking-regular">Markayı Keşfedin</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Custom Mobile Indicators */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center space-x-2 lg:hidden z-20">
          {companies.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>

        {/* Scroll Indicator (Desktop Only) */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
          <span className="text-white/70 text-[14px] uppercase tracking-regular mb-2 animate-pulse font-regular">
            Daha fazlası için kaydırın
          </span>
          <ChevronDown className="text-white/40 w-8 h-8 animate-bounce" />
        </div>
      </main>

      {/* --- SECONDARY FEATURE --- */}
      <section data-nav-color="dark" className="flex flex-col lg:flex-row min-h-[70vh] lg:h-[80vh] w-full overflow-hidden bg-white">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative bg-[#f4f4f6]">
          <Image 
            src="/images/hero-slide/md421-kompakt-drum.avif" 
            alt="Feature Lifestyle" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 py-16 lg:px-20 lg:py-0">
          <h4 className="text-metan-orange font-bold uppercase tracking-widest text-xs mb-4">Öne Çıkan Ürün</h4>
          <h3 className="text-4xl lg:text-5xl font-semibold mb-6 leading-tight tracking-tight text-[#1a1a1a]">MD 421 Kompakt</h3>
          <p className="text-lg lg:text-xl text-[#5d5b5c] mb-10 max-w-md leading-relaxed">
            Canlı performanslar ve stüdyo kayıtları için tasarlanmış, efsanevi MD 421 sesini sunan kompakt yapı.
          </p>
          <button className="cursor-pointer bg-black text-white px-10 py-5 rounded-full text-sm font-bold flex items-center space-x-3 hover:bg-metan-orange transition-all w-fit group shadow-lg hover:shadow-metan-orange/20">
            <span>Ürünü İncele</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}