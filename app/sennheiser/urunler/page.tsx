"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, Download, Star, Home } from 'lucide-react';

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
        <div className="w-1/2 flex flex-col h-full bg-[#f0f0f2] relative">
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

            {/* NAVIGATION ARROWS: Pinned to bottom-right of the grey section */}
            <div className="absolute bottom-10 right-10 flex items-center space-x-4 z-30">
              <span className="text-sm font-medium text-gray-500">
                {currentImg + 1} / {productImages.length}
              </span>
              <div className="flex space-x-2">
                <button onClick={prevImg} className="cursor-pointer w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm">
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button onClick={nextImg} className="cursor-pointer w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm">
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Product Details with White Background */}
        <div className="w-1/2 flex flex-col h-full bg-white relative px-12 lg:px-20 justify-center">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[13px] text-gray-500 mb-8">
            <Home className="w-3.5 h-3.5" />
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span>Microphones</span>
            <span>/</span>
            <span className="font-bold text-black">MK 4</span>
          </nav>

          <div className="max-w-md">
            <h1 className="text-6xl font-bold mb-4 tracking-tight">MK 4</h1>
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">Article No. 504298</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">£339.00*</span>
              <p className="text-[11px] text-gray-400 mt-1">*incl. VAT</p>
            </div>

            <p className="text-sm font-bold mb-10">Delivery time: 3-5 days</p>

            <div className="flex items-center space-x-3">
              <button className="bg-black text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                Add to cart
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
                <Star className="w-5 h-5 fill-current text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- TECHNICAL SPECS SECTION --- */}
      <section className="py-24 bg-[#f6f6f6] px-8 lg:px-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Technical Specifications</h2>
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
              <span>SPEC SHEET (PDF)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}