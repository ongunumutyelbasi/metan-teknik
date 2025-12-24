"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, Download } from 'lucide-react';

const specs = [
  { label: "Transducer principle", value: "externally polarized condenser microphone" },
  { label: "Pick-up pattern", value: "cardioid" },
  { label: "Frequency response", value: "20 Hz to 20 kHz" },
  { label: "Sensitivity", value: "25 mV/Pa" },
  { label: "Max. SPL", value: "140 dB" },
  { label: "Equivalent noise level", value: "10 dB(A)" },
  { label: "Dynamic range", value: "130 dB" },
  { label: "Nominal impedance", value: "ca. 50 Ω" },
  { label: "Phantom powering", value: "48 V ± 4 V (P48)" },
  { label: "Weight", value: "485 g" },
];

export default function SennheiserMK4Page() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-[76px]">
      {/* --- PRODUCT HERO --- */}
      <section className="flex flex-col lg:flex-row w-full border-b border-gray-100">
        <div className="w-full lg:w-1/2 bg-[#f6f6f6] flex items-center justify-center p-12 min-h-[50vh] lg:min-h-[80vh]">
          <div className="relative w-full h-full max-w-md aspect-square">
            <Image 
              src="/images/products/sennheiser-mk4.png" // Replace with actual path
              alt="Sennheiser MK 4" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-20">
          <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Studio Microphones</span>
          <h1 className="text-5xl lg:text-7xl font-light mb-6 tracking-tight">MK 4</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            Professional quality cardioid condenser microphone for home, project, and professional studios.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            {["Large Diaphragm", "Made in Germany", "True Condenser"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <button className="bg-black text-white px-12 py-5 rounded-full font-bold flex items-center space-x-3 hover:bg-[#333] transition-all w-fit group">
            <span>Find a Retailer</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* --- KEY FEATURES --- */}
      <section className="py-24 px-8 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-16 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              "1-inch large-diaphragm capsule",
              "True condenser design",
              "24-carat gold-plated diaphragm",
              "Full metal housing",
              "Internal capsule shock-mount",
              "Low inherent self-noise"
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="mt-1 bg-black rounded-full p-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-lg text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH SPECS GRID --- */}
      <section className="py-24 bg-[#f6f6f6] px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 border-t border-gray-200 pt-8">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-gray-200 text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                <span className="text-right font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex space-x-8">
            <button className="flex items-center space-x-2 text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 transition-colors">
              <Download className="w-4 h-4" />
              <span>SPEC SHEET (PDF)</span>
            </button>
            <button className="flex items-center space-x-2 text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 transition-colors">
              <Download className="w-4 h-4" />
              <span>INSTRUCTION MANUAL (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- WHAT'S IN THE BOX --- */}
      <section className="py-24 px-8 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-light mb-8">What's in the box</h2>
            <ul className="space-y-4">
              {[
                "MK 4 Large-diaphragm microphone",
                "MZQ 4 Microphone clamp",
                "Protective pouch",
                "Quick guide",
                "Safety guide"
              ].map((item, i) => (
                <li key={i} className="text-lg text-gray-600 flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2 aspect-video relative bg-[#f6f6f6] rounded-xl overflow-hidden">
            <Image 
              src="/images/products/mk4-box-content.jpg" // Replace with actual path
              alt="MK 4 Box Contents" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}