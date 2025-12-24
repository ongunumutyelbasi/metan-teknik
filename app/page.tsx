"use client";

import React, { useState } from 'react';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* --- MAIN COMPANY SHOWCASE --- */}
      <main 
        data-nav-color="light" 
        className="relative flex h-screen w-full overflow-hidden bg-[var(--color-sennheiser-footer)]"
      >
        {companies.map((company, index) => (
          <Link
            href={company.link}
            key={company.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative h-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center overflow-hidden ${"" /* border-r border-white/10 last:border-0 */}`}
            style={{ 
              flex: hoveredIndex === null ? 1 : (hoveredIndex === index ? 1.5 : 0.75),
              willChange: 'flex'
            }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 scale-[1.05]">
              <Image
                src={company.bgImage}
                alt={company.name}
                fill
                className={`object-cover transition-transform duration-[2000ms] ${
                  hoveredIndex === index ? "scale-110" : "scale-100"
                }`}
                priority
              />
              <div className={`absolute inset-0 transition-opacity duration-700 bg-black ${
                hoveredIndex === index ? "opacity-50" : "opacity-60"
              }`} />
            </div>

            {/* Logo Container */}
            <div className="relative z-10 transition-all duration-700 transform">
               <Image 
                  src={company.logo} 
                  alt={`${company.name} Logo`} 
                  width={300} 
                  height={150} 
                  className={`${company.logoClass} w-auto object-contain brightness-0 invert transition-transform duration-700 ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
            </div>

            {/* Detail Section */}
            <div className={`absolute top-[58%] left-0 w-full px-10 transition-all duration-700 flex flex-col items-center text-center ${
              hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <div className="inline-flex items-center bg-white space-x-3 text-[var(--color-sennheiser-footer)] border border-white/50 px-8 py-3 rounded-full transition-all duration-300 group">
                <span className="text-xs font-bold uppercase tracking-regular">Markayı Keşfedin</span>
                <ArrowUpRight className="w-4 h-4 transition-transform" />
              </div>
            </div>
          </Link>
        ))}

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <span className="text-white/70 text-[14px] uppercase tracking-regular mb-2 animate-pulse font-regular">
            Daha fazlası için kaydırın
          </span>
          <ChevronDown className="text-white/40 w-8 h-8 animate-bounce" />
        </div>
      </main>

      {/* --- SECONDARY FEATURE --- */}
      <section data-nav-color="dark" className="flex h-[80vh] w-full overflow-hidden bg-white">
        <div className="w-1/2 relative bg-[#f4f4f6]">
          <Image 
            src="/images/hero-slide/md421-kompakt-drum.avif" 
            alt="Feature Lifestyle" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center bg-white px-20">
          <h4 className="text-metan-orange font-bold uppercase tracking-widest text-xs mb-4">Öne Çıkan Ürün</h4>
          <h3 className="text-5xl font-semibold mb-6 leading-tight tracking-tight text-[#1a1a1a]">MD 421 Kompakt</h3>
          <p className="text-xl text-[#5d5b5c] mb-10 max-w-md leading-relaxed">
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