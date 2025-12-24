"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, Star, Home } from 'lucide-react';

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
    "/images/products/sennheiser-mk4-side.png"
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* --- HERO SPLIT SECTION --- */}
      <main className="flex h-screen w-full overflow-hidden">
        
        {/* LEFT PANEL: Gallery with Grey Background */}
        <div className="w-1/2 flex flex-col h-full bg-[#edeef0] relative">
          <div className="flex-1 flex items-center justify-center w-full relative p-20"> 
            <div className="relative w-full h-full max-w-md aspect-square">
              <Image 
                src={productImages[currentImg]}
                alt="Sennheiser MK 4"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* NAVIGATION CLUSTER: Using Sennheiser's exact SVG paths */}
            <div className="absolute bottom-10 right-10 flex items-center space-x-6 z-30">
              <span className="text-[13px] font-bold text-black tracking-tight">
                {currentImg + 1} / {productImages.length}
              </span>
              
              <div className="flex space-x-2">
                {/* PREVIOUS BUTTON */}
                <button 
                  onClick={prevImg}
                  disabled={currentImg === 0}
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <svg width="12" height="12" viewBox="0 0 32 32" className="fill-current">
                    <title>chevron-left</title>
                    <path d="M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z"></path>
                  </svg>
                </button>

                {/* NEXT BUTTON */}
                <button 
                  onClick={nextImg}
                  disabled={currentImg === productImages.length - 1}
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <svg width="12" height="12" viewBox="0 0 32 32" className="fill-current">
                    <title>chevron-right</title>
                    <path d="M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Product Details */}
        <div className="w-1/2 flex flex-col h-full bg-white relative px-12 lg:px-24 justify-center">
          
          <nav className="flex items-center space-x-2 text-[12px] text-gray-400 mb-8 font-medium">
            <Home className="w-3.5 h-3.5" />
            <span>/</span>
            <span className="hover:text-black cursor-pointer transition-colors">Products</span>
            <span>/</span>
            <span className="hover:text-black cursor-pointer transition-colors">Microphones</span>
            <span>/</span>
            <span className="text-black font-bold">MK 4</span>
          </nav>

          <div className="max-w-lg">
            <h1 className="text-7xl font-bold mb-4 tracking-tighter">MK 4</h1>
            <p className="text-[13px] text-gray-500 mb-10 tracking-wide font-medium">Article No. 504298</p>
            
            <div className="mb-8">
              <span className="text-4xl font-bold tracking-tight">£339.00*</span>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">*incl. VAT</p>
            </div>

            <p className="text-[14px] font-bold mb-10 tracking-tight">Delivery time: 3-5 days</p>

            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-12 py-4.5 rounded-full text-[13px] font-bold hover:bg-[#333] transition-all tracking-wide">
                Add to cart
              </button>
              <button className="w-14 h-14 rounded-full bg-[#f6f6f6] flex items-center justify-center hover:bg-[#eeeeee] transition-all group">
                <Star className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- TECHNICAL SPECS --- */}
      <section className="py-32 bg-[#f6f6f7] px-8 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 tracking-tight">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2 border-t border-gray-200 pt-10">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-5 border-b border-gray-200 text-[14px]">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">{spec.label}</span>
                <span className="text-right font-bold text-black">{spec.value}</span>
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