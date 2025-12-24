"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Star, Home } from 'lucide-react';

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
    "https://www.sennheiser.com/cdn-cgi/image/width=1080,format=avif,quality=75/globalassets/digizuite/38564-en-mk_4_product_shot_cutout_solo.png.png",
    "https://www.sennheiser.com/cdn-cgi/image/width=1080,format=avif,quality=75/globalassets/digizuite/48198-en-spectera_base_station_product_shot_cutout_front.png"
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  return (
    <div 
      className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-black selection:text-white"
      style={{ 
        '--sticky-top-height': '69px',
        overflow: 'auto' 
      } as React.CSSProperties}
    >
      
      {/* --- HERO SECTION --- */}
      <main className="flex h-screen w-full overflow-hidden border-b border-gray-100">
        
        {/* LEFT PANEL: Gallery Section */}
        <div className="w-1/2 flex flex-col h-full bg-[#f0f0f2] relative pt-[var(--sticky-top-height)]">
          <div className="flex-1 flex items-center justify-center w-full relative p-12 lg:p-24"> 
            <div className="relative w-full h-full max-w-[500px] aspect-square">
              <Image 
                src={productImages[currentImg]}
                alt="MK 4"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>

            {/* NAVIGATION */}
            <div className="absolute bottom-8 right-8 flex items-center gap-6 z-30">
              <span className="text-[13px] font-bold text-black tabular-nums">
                {currentImg + 1} / {productImages.length}
              </span>
              
              <div className="flex gap-2">
                {/* PREVIOUS BUTTON */}
                <button 
                  onClick={prevImg}
                  disabled={currentImg === 0}
                  className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-brand-blue group disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 32 32" 
                    className="transition-colors duration-300 fill-black group-disabled:fill-black/20 group-hover:fill-white group-disabled:group-hover:fill-black/20"
                  >
                    <path d="M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z"></path>
                  </svg>
                </button>

                {/* NEXT BUTTON */}
                <button 
                  onClick={nextImg}
                  disabled={currentImg === productImages.length - 1}
                  className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-brand-blue group disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 32 32" 
                    className="transition-colors duration-300 fill-black group-disabled:fill-black/20 group-hover:fill-white group-disabled:group-hover:fill-black/20"
                  >
                    <path d="M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Details Section */}
        <div className="w-1/2 flex flex-col h-full bg-white relative px-12 lg:px-24 pt-[var(--sticky-top-height)] justify-center">
          <nav className="flex items-center space-x-2 text-[12px] text-gray-400 mb-10 font-medium">
            <Home className="w-3.5 h-3.5" />
            <span>/</span>
            <span className="hover:text-black cursor-pointer uppercase tracking-widest text-[10px]">Products</span>
            <span>/</span>
            <span className="hover:text-black cursor-pointer uppercase tracking-widest text-[10px]">Microphones</span>
            <span>/</span>
            <span className="text-black font-bold uppercase tracking-widest text-[10px]">MK 4</span>
          </nav>

          <div className="max-w-md">
            <h1 className="text-[80px] leading-[0.9] font-bold mb-6 tracking-tighter">MK 4</h1>
            <p className="text-[13px] text-gray-500 mb-12 tracking-wide font-medium uppercase">Article No. 504298</p>
            
            <div className="mb-10">
              <span className="text-[42px] font-bold tracking-tight">£339.00*</span>
              <p className="text-[12px] text-gray-400 mt-2 font-medium">*incl. VAT</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 bg-black text-white py-5 rounded-full text-[14px] font-bold hover:bg-[#333] transition-all tracking-wide uppercase">
                Add to cart
              </button>
              <button className="w-[60px] h-[60px] rounded-full bg-[#f6f6f6] flex items-center justify-center hover:bg-[#eeeeee] transition-all group active:scale-95">
                <Star className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- TECHNICAL SPECS SECTION --- */}
      <section className="py-24 bg-[#f6f6f7] px-8 lg:px-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] font-bold mb-16 tracking-tight">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 border-t border-gray-200">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-6 border-b border-gray-200">
                <span className="font-bold text-[#a0a0a0] uppercase tracking-widest text-[11px] self-center">{spec.label}</span>
                <span className="text-right font-bold text-black text-[15px]">{spec.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <button className="flex items-center space-x-3 text-[12px] font-bold border-b-2 border-black pb-1 hover:text-gray-500 transition-all uppercase tracking-widest">
              <Download className="w-4 h-4" />
              <span>Spec Sheet (PDF)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}