"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'ÜRÜNLER', href: '#' },
  { name: 'ÇÖZÜMLER', href: '/en-us/solutions' },
  { name: 'SERVİS VE İNDİRMELER', href: '#' },
  { name: 'BİLGİ MERKEZİ', href: '#' },
  { name: 'HAKKIMIZDA', href: '#' },
];

function BrandsDropdown() {
  const brands = [
    { 
      name: "METAN TEKNİK", 
      href: "/", 
      logo: "/images/metan-icon.png", 
      hoverColor: "#df532b" 
    },
    { 
      name: "SENNHEISER", 
      href: "/sennheiser", 
      logo: "/images/SVG/sennheiser-icon.svg", 
      hoverColor: "#057cc3" 
    },
    { 
      name: "NEUMANN", 
      href: "/neumann", 
      logo: "/images/SVG/neumann-inverse-icon.svg", 
      hoverColor: "#ef7622" 
    },
    { 
      name: "MERGING", 
      href: "/merging", 
      logo: "/images/SVG/merging-icon.svg", 
      hoverColor: "#e30613" 
    },
  ];

  return (
    <div className="relative group">
      {/* State persistence: group-hover ensures orange color stays while dropdown is open */}
      <button className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-full text-[12px] tracking-[0.1em] font-medium text-white transition-all duration-300 uppercase group-hover:border-[#ef7622] group-hover:text-[#ef7622]">
        <span>MARKALAR</span>
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
        <div className="w-max bg-[#111] border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden">
          {brands.map((brand) => (
            <Link 
              key={brand.name} 
              href={brand.href} 
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/brand"
              style={{ '--brand-hover': brand.hoverColor } as React.CSSProperties}
            >
              <div 
                className="w-5 h-5 transition-colors duration-300 bg-[#B3B8BE] group-hover/brand:bg-[var(--brand-hover)]"
                style={{
                  maskImage: `url(${brand.logo})`,
                  WebkitMaskImage: `url(${brand.logo})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <span className="text-[12px] font-medium tracking-[0.05em] text-[#B3B8BE] whitespace-nowrap group-hover/brand:text-white transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NeumannHeader() {
  return (
    <header className="h-[88px] w-full font-neumann bg-black flex items-center px-4 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-none w-full flex items-center justify-between">
        
        {/* 1. Restored Logo Section */}
        <Link href="/neumann" className="flex-shrink-0">
          <Image 
            src="/images/SVG/neumann-light.svg" 
            alt="Neumann Logo" 
            width={256} 
            height={56} 
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* 2. Navigation Section */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[16px] text-white font-light tracking-[0.05em] hover:text-[#ef7622] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Action Section */}
        <div className="flex items-center space-x-6 text-white">
          <button className="hover:text-[#ef7622] cursor-pointer transition-colors p-2" aria-label="Search">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <BrandsDropdown />
        </div>
      </div>
    </header>
  );
}