"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Star } from 'lucide-react';

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
      style={{ '--sticky-top-height': '69px' } as React.CSSProperties}
    >
      
      {/* --- MAIN PRODUCT SECTION --- */}
      <main className="flex w-full border-b border-gray-100">
        
        {/* LEFT PANEL: Sticky Gallery */}
        <div className="w-1/2 bg-[#f0f0f2] relative border-r border-gray-100">
          <div className="sticky top-0 h-screen flex flex-col pt-[var(--sticky-top-height)]">
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
                  <button 
                    onClick={prevImg}
                    disabled={currentImg === 0}
                    className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-brand-blue group cursor-pointer disabled:cursor-default disabled:pointer-events-none"
                  >
                    <svg width="12" height="12" viewBox="0 0 32 32" className="transition-colors duration-300 fill-[#666666] group-disabled:fill-[#666666]/20 group-hover:fill-white">
                      <path d="M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z"></path>
                    </svg>
                  </button>

                  <button 
                    onClick={nextImg}
                    disabled={currentImg === productImages.length - 1}
                    className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-brand-blue group cursor-pointer disabled:cursor-default disabled:pointer-events-none"
                  >
                    <svg width="12" height="12" viewBox="0 0 32 32" className="transition-colors duration-300 fill-[#666666] group-disabled:fill-[#666666]/20 group-hover:fill-white">
                      <path d="M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Details & Description */}
        <div className="w-1/2 bg-white relative">
          {/* Main Hero View: Bottom Aligned Content */}
          <div className="h-[calc(100vh-var(--sticky-top-height))] sticky top-[var(--sticky-top-height)] flex flex-col px-[20px] pb-[20px] pt-[20px]">
            
            {/* Breadcrumbs - Styled to match HTML snippet */}
            <nav aria-label="Breadcrumb navigation" className="flex items-center flex-wrap gap-0 mb-auto">
              <button className="flex items-center group transition-colors hover:text-brand-blue">
                <div className="w-4 h-4 text-[#1a1a1a] group-hover:text-brand-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z"></path></svg>
                </div>
                <span className="mx-2 text-[#666666] text-[14px]">/</span>
              </button>
              {["Products", "Microphones"].map((item, idx) => (
                <button key={idx} className="flex items-center group">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#666666] group-hover:text-black transition-colors">{item}</span>
                  <span className="mx-2 text-[#666666] text-[14px]">/</span>
                </button>
              ))}
              <span className="text-[12px] font-bold uppercase tracking-wider text-black">MK 4</span>
            </nav>

            {/* Bottom-aligned Purchase Block */}
            <div className="w-full">
              <h1 className="text-[clamp(40px,8vw,80px)] leading-[0.9] font-bold mb-4 tracking-tighter">MK 4</h1>
              <p className="text-[13px] text-[#666666] mb-8 font-medium">Article No. 504298</p>
              
              <div className="mb-8">
                <span className="text-[42px] font-bold tracking-tight">£339.00*</span>
                <p className="text-[12px] text-[#666666] mt-1 font-medium">*incl. VAT</p>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 bg-black text-white py-5 rounded-full text-[14px] font-bold hover:bg-[#333] transition-all tracking-widest uppercase">
                  Add to cart
                </button>
                <button className="w-[60px] h-[60px] rounded-full bg-[#f6f6f6] flex items-center justify-center hover:bg-[#eeeeee] transition-all group">
                  <Star className="w-6 h-6 text-black group-hover:fill-black transition-all" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrolled Content: Description Text */}
          <div className="px-[20px] pb-24 mt-12">
            <div className="max-w-xl">
              <p className="text-[20px] leading-relaxed font-semibold text-black mb-8">
                Professional quality cardioid condenser microphone for home, project, and professional studios. 
                A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
                Ideal for vocals and acoustic instruments.
              </p>
              <p className="text-[18px] leading-relaxed font-normal text-[#666666]">
                The MK 4 is a large-diaphragm true condenser microphone for professional studio recordings. 
                Featuring fine resolution and outstanding sound quality, the MK 4 is easy to handle and 
                excellent value for money, making it an ideal choice for professional project studios and 
                home recordists. It features a 1 inch true condenser capsule based on the acoustics of the 
                e 965 high-end vocal mic, optimised for recording. Its transducer being manufactured in the 
                same clean room as all high-end Sennheiser condenser capsules.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* --- TECHNICAL SPECS SECTION --- */}
      <section className="py-24 bg-[#f6f6f7] px-[20px] lg:px-24 border-t border-gray-100">
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
        </div>
      </section>
    </div>
  );
}