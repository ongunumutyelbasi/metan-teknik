"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_DURATION = 7000;

const slides = [
  {
    id: 1,
    title: "Neumann vis yayında: sürükleyici miksaj yeniden tanımlandı",
    subtitle: "Apple Vision Pro ile uzamsal ses miksajında yeni bir çağ",
    productImg: "/images/neumann/neumann-vis.webp", 
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/52562-en-homepage_slider_vis_1600x620_missionselection_screen-kopie.png",
    alt: "neumann vis",
    link: "/en-us/products/software/vis"
  },
  {
    id: 2,
    title: "rime 1.5 güncellemesi",
    subtitle: "Gerçek derinlik, şimdi daha keskin - tec ödülleri finalistlerimizi keşfedin.",
    productImg: "/images/hero-slide/rime-box.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/50259-en-homepage_slider_rime_v3_schatten_1600x620.jpg",
    alt: "rime 1.5",
    link: "/en-us/products/software/rime"
  },
  {
    id: 3,
    title: "yüksek hassasiyet, derin etki.",
    subtitle: "Stereo ve sürükleyici kurulumlar için yeni nesil subwoofer'larla tanışın.",
    productImg: "/images/hero-slide/subwoofer-unit.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/51796-en-homepage_slider_kh_1600x620_v1.png",
    alt: "neumann subwoofers",
    link: "/en-us/dsp-subwoofer"
  },
  {
    id: 4,
    title: "mt 48 evrim geçiriyor!",
    subtitle: "Referans sınıfı arayüzümüz için en son güncellemeyi edinin.",
    productImg: "/images/hero-slide/mt48-top.png",
    lifestyleImg: "https://www.neumann.com/globalassets/digizuite/52482-en-homepage_slider_mt48_1600x620_missionselection_screen.png",
    alt: "mt 48 update",
    link: "/en-us/serviceundsupport/file-finder"
  }
];

export default function NeumannPage() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
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
    setProgress(0);
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      
      setProgress(currentProgress);

      if (currentProgress >= 100) {
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

  // adjusted math for a 50px visual footprint (matches button + border)
  const radius = 24; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className='min-h-screen bg-white text-[#1a1a1a] font-neumann overflow-x-hidden antialiased subpixel-antialiased'>
      
      <section className='relative h-[60vh] lg:h-[80vh] w-full bg-[#0a0a0a] overflow-hidden'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className='absolute inset-0'>
              <Image
                src={slide.lifestyleImg}
                alt={slide.alt}
                fill
                className='object-cover opacity-20 grayscale-[0.2]'
                unoptimized
              />
              <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent' />
            </div>

            <div className='relative z-20 h-full w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center'>
                
                <div className={`transition-all duration-1000 transform ${
                  index === current ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <span className='text-[#ef7622] text-[11px] font-semibold tracking-tight mb-4 block'>
                    NEUMANN   //   0{index + 1}
                  </span>
                  <h2 className='text-3xl md:text-5xl font-medium mb-4 uppercase tracking-tighter text-white leading-tight'>
                    {slide.title}
                  </h2>
                  <p className='text-lg font-light mb-8 text-white/50 max-w-md leading-snug'>
                    {slide.subtitle}
                  </p>
                  <Link 
                    href={slide.link}
                    className='group inline-flex items-center gap-4 text-white text-[13px] font-bold tracking-tight border-b border-white/10 pb-2 hover:border-[#ef7622] transition-all'
                  >
                    DETAYLI BİLGİ <ArrowUpRight size={14} className='group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                  </Link>
                </div>

                <div className={`hidden lg:flex justify-end transition-all duration-1000 delay-300 transform ${
                  index === current ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-12 opacity-0 scale-95'
                }`}>
                  <div className='relative w-full max-w-[450px] aspect-square animate-soft-float flex items-center justify-center'>
                    <Image 
                      src={slide.productImg}
                      alt={slide.title}
                      fill
                      className='object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                      sizes='450px'
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='absolute bottom-10 left-0 w-full z-40'>
          <div className='max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between'>
            
            <div className='flex gap-6'>
              {slides.map((_, i) => (
                <button key={i} onClick={() => jumpToSlide(i)} className='relative group'>
                  <span className={`text-[12px] cursor-pointer font-semibold transition-colors ${
                    i === current ? 'text-white' : 'text-white/20 group-hover:text-white/50'
                  }`}>
                    0{i + 1}
                  </span>
                  {i === current && (
                    <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#ef7622] rounded-full' />
                  )}
                </button>
              ))}
            </div>

            <div className='flex items-center gap-4'>
              {/* timer circle - 50px container with 2px stroke width */}
              <div className='relative w-[50px] h-[50px] flex items-center justify-center'>
                <svg 
                  width='50' 
                  height='50' 
                  viewBox='0 0 50 50' 
                  className='transform -rotate-90'
                >
                  <circle
                    cx='25'
                    cy='25'
                    r='23' // radius of 23 + (2px stroke / 2) = 24px, fits within 25px center-to-edge
                    stroke='rgba(255,255,255,0.05)'
                    strokeWidth='2'
                    fill='transparent'
                  />
                  <circle
                    cx='25'
                    cy='25'
                    r='23'
                    stroke='#ef7622'
                    strokeWidth='2'
                    fill='transparent'
                    strokeDasharray={2 * Math.PI * 23}
                    style={{ 
                        strokeDashoffset: (2 * Math.PI * 23) - (progress / 100) * (2 * Math.PI * 23),
                        transition: 'none' 
                    }}
                  />
                </svg>
              </div>

              {/* nav buttons - w-[50px] h-[50px] for perfect alignment */}
              <div className='flex gap-2'>
                <button onClick={prevSlide} className='cursor-pointer w-[50px] h-[50px] flex items-center justify-center border border-white/10 rounded-full text-white/20 hover:text-white hover:border-white/40 transition-all duration-200'>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextSlide} className='cursor-pointer w-[50px] h-[50px] flex items-center justify-center border border-white/10 rounded-full text-white/20 hover:text-white hover:border-white/40 transition-all duration-200'>
                  <ChevronRight size={18} />
                </button>
              </div>
              </div>

          </div>
        </div>
      </section>

      {/* category section and styles remain unchanged */}
      <section className='py-24 px-8 max-w-[1400px] mx-auto bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
          <div className='group relative aspect-square bg-[#f8f8f8] p-12 flex flex-col justify-between border border-gray-100 transition-all duration-200'>
            <div className='flex justify-between items-start'>
              <span className='text-[11px] font-bold text-gray-400 tracking-tight italic'>berlin 1928</span>
              <ArrowUpRight size={18} className='text-gray-300 group-hover:text-[#ef7622] transition-colors duration-200' />
            </div>
            <div>
              <h3 className='text-2xl font-medium tracking-tighter mb-4'>microphones</h3>
              <p className='text-sm text-gray-400 max-w-[220px] leading-relaxed font-light'>the global studio standard for over 90 years.</p>
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