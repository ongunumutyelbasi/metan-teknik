"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_DURATION = 7000;

const slides = [
  {
    id: 1,
    title: "Neumann VIS Yayında: Sürükleyici Miksaj Yeniden Tanımlandı",
    subtitle: "Apple Vision Pro ile Uzamsal Ses Miksajında Yeni Bir Çağ",
    productImg: "/images/neumann/neumann-vis.webp", 
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/52562-en-homepage_slider_vis_1600x620_missionselection_screen-kopie.png",
    alt: "Neumann VIS",
    link: "/en-us/products/software/vis"
  },
  {
    id: 2,
    title: "RIME 1.5 Güncellemesi",
    subtitle: "Gerçek Derinlik, Şimdi Daha Keskin - TEC Ödülleri finalistlerimizi keşfedin.",
    productImg: "/images/hero-slide/rime-box.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/50259-en-homepage_slider_rime_v3_schatten_1600x620.jpg",
    alt: "RIME 1.5",
    link: "/en-us/products/software/rime"
  },
  {
    id: 3,
    title: "Yüksek Hassasiyet, Derin Etki.",
    subtitle: "Stereo ve sürükleyici kurulumlar için yeni nesil subwoofer'larla tanışın.",
    productImg: "/images/hero-slide/subwoofer-unit.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/51796-en-homepage_slider_kh_1600x620_v1.png",
    alt: "Neumann Subwoofers",
    link: "/en-us/dsp-subwoofer"
  },
  {
    id: 4,
    title: "MT 48 Evrim Geçiriyor!",
    subtitle: "Referans sınıfı arayüzümüz için en son güncellemeyi edinin.",
    productImg: "/images/hero-slide/mt48-top.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/52482-en-homepage_slider_mt48_1600x620_missionselection_screen.png",
    alt: "MT 48 Update",
    link: "/en-us/serviceundsupport/file-finder"
  }
];

export default function NeumannPage() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(100);
  const requestRef = useRef<number | null>(null);

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const jumpToSlide = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    const img = new window.Image();
    img.src = slides[nextIndex].lifestyleImg;
    const prodImg = new window.Image();
    prodImg.src = slides[nextIndex].productImg;
  }, [current]);

  useEffect(() => {
    setProgress(100);
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const remaining = Math.max(100 - (elapsed / SLIDE_DURATION) * 100, 0);
      
      setProgress(remaining);

      if (remaining <= 0) {
        nextSlide();
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [current]);

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-neumann overflow-x-hidden">
      
      <section className="relative h-[85vh] w-full bg-[#0a0a0a] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.lifestyleImg}
                alt={slide.alt}
                fill
                className="object-cover opacity-20 grayscale-[0.2]"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            <div className="relative z-20 h-full w-full max-w-[1400px] mx-auto px-12 md:px-20 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">
                
                {/* Text Content */}
                <div className={`transition-all duration-1000 transform ${
                  index === current ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}>
                  <span className="text-[#ef7622] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block italic">
                    Neumann // 0{index + 1}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tighter text-white uppercase leading-none">
                    {slide.title}
                  </h2>
                  <p className="text-base text-[24px] font-light mb-10 text-white/50 max-w-md leading-tight">
                    {slide.subtitle}
                  </p>
                  <Link 
                    href={slide.link}
                    className="group inline-flex items-center gap-4 text-white text-[13px] font-bold uppercase tracking-[0.1em] border-b border-white/10 pb-2 hover:border-[#ef7622] transition-all"
                  >
                    DETAYLI BİLGİ <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>

                {/* Floating Product Image */}
                <div className={`hidden lg:flex justify-end transition-all duration-1000 delay-300 transform ${
                  index === current ? "translate-x-0 opacity-100 scale-100" : "translate-x-12 opacity-0 scale-95"
                }`}>
                  <div className="relative w-full max-w-[500px] aspect-square animate-soft-float flex items-center justify-center">
                    <Image 
                      src={slide.productImg}
                      alt={slide.title}
                      fill
                      className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                      sizes="500px"
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* --- CONTROLS SECTION - Aligned with Slides --- */}
        <div className="absolute bottom-12 left-0 w-full z-40">
          <div className="max-w-[1400px] mx-auto px-12 md:px-20 flex items-center justify-between">
            
            <div className="flex gap-10">
              {slides.map((_, i) => (
                <button key={i} onClick={() => jumpToSlide(i)} className="relative group">
                  <span className={`text-[11px] font-bold transition-colors ${
                    i === current ? "text-white" : "text-white/20 group-hover:text-white/50"
                  }`}>
                    0{i + 1}
                  </span>
                  {i === current && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ef7622] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1.5"
                    fill="transparent"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#ef7622"
                    strokeWidth="1.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{ 
                        strokeDashoffset,
                        transition: 'none' 
                    }}
                  />
                </svg>
              </div>

              <div className="flex gap-3">
                <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full text-white/20 hover:text-white hover:border-white/40 transition-all">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full text-white/20 hover:text-white hover:border-white/40 transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          <div className="group relative aspect-square bg-[#f8f8f8] p-12 flex flex-col justify-between border border-gray-100">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Berlin 1928</span>
              <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#ef7622] transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tight mb-4 uppercase">Microphones</h3>
              <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed font-light">The global studio standard for over 90 years.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes soft-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
        }
        .animate-soft-float {
          animation: soft-float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}