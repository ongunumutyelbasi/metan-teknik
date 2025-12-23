"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'ÜRÜNLER', href: '#' },
  { name: 'ÇÖZÜMLER', href: '/en-us/solutions' },
  { name: 'SERVİS VE İNDİRMELER', href: '#' },
  { name: 'BİLGİ MERKEZİ', href: '#' },
  { name: 'HAKKIMIZDA', href: '#' },
];

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

function BrandsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 lg:px-4 py-2 border rounded-full text-[10px] lg:text-[12px] tracking-[0.1em] font-medium transition-all duration-300 uppercase 
          ${isOpen ? 'border-[#ef7622] text-[#ef7622]' : 'border-white/20 text-white'} 
          lg:hover:border-[#ef7622] lg:hover:text-[#ef7622]`}
      >
        <span>MARKALAR</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 top-full pt-3 transition-all duration-300 z-[70] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="w-max bg-[#111] border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden">
          {brands.map((brand) => (
            <Link 
              key={brand.name} 
              href={brand.href} 
              onClick={() => setIsOpen(false)}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-[72px] lg:h-[88px] w-full font-neumann bg-black flex items-center px-4 lg:px-8 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-none w-full flex items-center justify-between relative z-50">
        
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Desktop Logo */}
          <Link href="/neumann" className="hidden lg:block">
            <Image 
              src="/images/SVG/neumann-light.svg" 
              alt="Neumann Logo" 
              width={256} 
              height={56} 
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>
          {/* Mobile Logo (Black SVG turned White) */}
          <Link href="/neumann" className="lg:hidden">
            <Image 
              src="/images/SVG/neumann-inverse-icon.svg" 
              alt="Neumann Icon" 
              width={40} 
              height={40} 
              className="h-10 w-auto object-contain brightness-0 invert" 
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[14px] xl:text-[16px] text-white font-light tracking-[0.05em] hover:text-[#ef7622] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Section */}
        <div className="flex items-center space-x-3 lg:space-x-6 text-white">
          <button className="hover:text-[#ef7622] cursor-pointer transition-colors p-2" aria-label="Search">
            <Search strokeWidth={1.5} className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" />
          </button>
          
          <BrandsDropdown />

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 hover:text-[#ef7622] transition-colors relative z-[60]"
            onClick={() => {
                setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-0 pt-[72px] bg-black z-40 lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-8 space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[18px] text-white font-light tracking-[0.1em] border-b border-white/5 pb-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}