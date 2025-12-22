"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cpu, Network, Music, ChevronDown } from 'lucide-react';

const products = [
  {
    name: "Anubis",
    tagline: "The Monitoring Standard",
    desc: "Compact, powerful, and networked. The ultimate tool for immersive control rooms.",
    img: "https://www.merging.com/assets/img/anubis-sps.png"
  },
  {
    name: "Hapi MKII",
    tagline: "Pure Conversion",
    desc: "The interface that redefined transparency in 1U rack-mount format.",
    img: "https://www.merging.com/assets/img/hapi-mkii.png"
  }
];

export default function MergingCinematicPage() {
  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans selection:bg-[#fe6466]/30">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative h-[85vh] flex flex-col justify-end p-10 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
            alt="Recording Studio" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl pb-12">
          <div className="w-12 h-[2px] bg-[#fe6466] mb-8" />
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 leading-[0.9]">
            Merging <span className="text-[#fe6466]">Technologies.</span>
          </h1>
          <p className="text-xl text-white/50 font-light max-w-xl mb-10 leading-relaxed">
            Swiss-engineered audio fidelity for the world's most demanding recording, mastering, and post-production facilities.
          </p>
          <div className="flex gap-6">
            <Link href="#solutions" className="px-10 py-4 bg-[#fe6466] hover:bg-[#e55a5c] transition-all font-bold text-xs uppercase tracking-widest">
              View Solutions
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 animate-bounce opacity-20 hidden md:block">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. Technical Statistics Bar */}
      <section className="bg-[#1a1a1a] border-y border-white/5 py-12 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Protocol", val: "RAVENNA" },
            { label: "Format", val: "DSD / DXD" },
            { label: "Sync", val: "PTP v2" },
            { label: "Origin", val: "Switzerland" }
          ].map((stat) => (
            <div key={stat.label}>
              <span className="block text-[10px] uppercase tracking-widest text-[#fe6466] mb-2 font-bold">{stat.label}</span>
              <span className="text-lg font-mono font-medium tracking-tight text-white/90">{stat.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Showcase */}
      <section id="solutions" className="py-32 px-10 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Precision Hardware</h2>
                <div className="w-20 h-1 bg-[#fe6466]" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p) => (
                <div key={p.name} className="group relative bg-[#1a1a1a] p-12 border border-white/5 hover:border-[#fe6466]/40 transition-all duration-700 overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-1 italic tracking-tighter">{p.name}</h3>
                    <span className="text-[#fe6466] text-[10px] font-bold uppercase tracking-[0.2em]">{p.tagline}</span>
                    <p className="mt-8 text-sm text-white/40 leading-relaxed max-w-xs">{p.desc}</p>
                    <Link href="#" className="inline-flex items-center gap-3 mt-10 text-[10px] font-bold hover:text-[#fe6466] transition-colors tracking-widest">
                    TECHNICAL DATA <ArrowRight size={14} />
                    </Link>
                </div>
                {/* Product Ghost Image */}
                <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000">
                    <Image src={p.img} alt={p.name} fill className="object-contain" />
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* 4. Thematic Section with Image Background */}
      <section className="relative py-48 flex items-center justify-center text-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1559101303-34676644023a?q=80&w=2070&auto=format&fit=crop" 
            alt="Hardware Detail" 
            fill 
            className="object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]" />
        </div>
        
        <div className="relative z-10 px-10">
          <Network className="text-[#fe6466] mx-auto mb-10" size={56} strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">The Future of <br/>Audio Networking.</h2>
          <p className="text-white/40 max-w-xl mx-auto mb-12 text-sm leading-relaxed font-light">
            Merging pioneered the use of AoIP in high-resolution production. Today, our infrastructure powers everything from Dolby Atmos mixing to global broadcast events.
          </p>
          <button className="px-12 py-5 border border-[#fe6466] text-[#fe6466] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#fe6466] hover:text-white transition-all">
            Explore the Ecosystem
          </button>
        </div>
      </section>
    </div>
  );
}