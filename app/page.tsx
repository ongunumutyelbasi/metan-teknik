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
    logoClass: "h-5 md:h-7"
  },
  {
    id: 2,
    name: "Neumann",
    logo: "/images/SVG/neumann-light.svg",
    bgImage: "/images/Neumann_U47_Tube.jpg",
    description: "Efsanevi Stüdyo Mikrofonları ve Monitörleri",
    link: "/neumann", 
    logoClass: "h-10 md:h-16"
  },
  {
    id: 3,
    name: "Merging Technologies",
    logo: "/images/SVG/Merging_Technologies_Logo.svg",
    bgImage: "/images/PMX_15-A.jpg",
    description: "Yüksek Performanslı Ses Kartları ve Arabirimler",
    link: "/merging", 
    logoClass: "h-10 md:h-16"
  }
];

export default function MetanPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* FIX: Using svh (Small Viewport Height) to prevent jumping when the address bar hides.
          Added flex-shrink-0 to the children and forced equal basis to lock the heights.
      */}
      <main 
        data-nav-color={isMobile ? "dark" : "light"} 
        className="relative flex flex-col lg:flex-row w-full overflow-hidden bg-white lg:bg-black pt-[76px] lg:pt-0"
        style={{ height: isMobile ? 'calc(100svh - 76px)' : '100vh' }}
      >
        {companies.map((company, index) => (
          <Link
            href={company.link}
            key={company.id}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            className="relative w-full lg:h-full flex flex-col items-center justify-center overflow-hidden transition-[flex] duration-700 ease-in-out"
            style={{ 
              flex: isMobile ? '1 1 33.33%' : (hoveredIndex === null ? 1 : (hoveredIndex === index ? 1.4 : 0.8)),
              minHeight: 0 // Prevents content from pushing the height out
            }}
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src={company.bgImage}
                alt={company.name}
                fill
                className={`object-cover transition-transform duration-[2000ms] ${
                  !isMobile && hoveredIndex === index ? "scale-110" : "scale-100"
                }`}
                priority
              />
              <div className={`absolute inset-0 transition-opacity duration-700 bg-black ${
                !isMobile && hoveredIndex === index ? "opacity-50" : "opacity-65"
              }`} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-6 w-full h-full">
               <Image 
                  src={company.logo} 
                  alt={`${company.name} Logo`} 
                  width={300} 
                  height={150} 
                  className={`${company.logoClass} w-auto object-contain brightness-0 invert transition-transform duration-700 ${
                    !isMobile && hoveredIndex === index ? "scale-105" : "scale-100"
                  }`}
                />

                <div className={`transition-all duration-700 flex flex-col items-center text-center lg:absolute lg:top-[60%] lg:left-0 lg:w-full ${
                  isMobile || hoveredIndex === index ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:translate-y-10"
                }`}>
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-md lg:bg-white space-x-2 text-white lg:text-black border border-white/20 px-5 py-2 rounded-full transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Keşfet</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
            </div>
          </Link>
        ))}
      </main>

      <section data-nav-color="dark" className="flex flex-col lg:flex-row min-h-[80vh] w-full overflow-hidden bg-white">
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-auto relative bg-[#f4f4f6]">
          <Image 
            src="/images/hero-slide/md421-kompakt-drum.avif" 
            alt="Feature Lifestyle" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 py-16 lg:px-20 lg:py-0">
          <h4 className="text-metan-orange font-bold uppercase tracking-widest text-xs mb-4">Öne Çıkan Ürün</h4>
          <h3 className="text-3xl lg:text-5xl font-semibold mb-6 leading-tight tracking-tight text-[#1a1a1a]">MD 421 Kompakt</h3>
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