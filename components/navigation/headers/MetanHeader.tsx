"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { BrandsDropdown, SearchButton } from '../HeaderHelpers';

export default function MetanHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const observerOptions = { rootMargin: '-10% 0px -85% 0px', threshold: 0 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-nav-color') as 'dark' | 'light';
          if (theme) setNavTheme(theme);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      document.querySelectorAll('[data-nav-color]').forEach((section) => observer.observe(section));
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const links = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Şirketler", href: "/sirketler" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim", href: "/hakkimizda/iletisim-bilgileri" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-6 px-6 lg:px-10">
      <div className="max-w-full mx-auto flex items-center justify-between relative h-[60px]">
        
        {/* --- LEFT: LOGO (Adaptive) --- */}
        <div className="flex-shrink-0 z-[70]">
          <Link href="/" className="group flex items-center">
            <div className="relative">
              <Image 
                src={isMobileMenuOpen || navTheme === 'dark' || isScrolled ? "/images/metan-logo.png" : "/images/metan-logo-white.png"} 
                alt="Metan Logo" width={130} height={36} priority 
                className="h-7 w-auto transition-all duration-500 group-hover:brightness-110"
              />
            </div>
          </Link>
        </div>

        {/* --- CENTER: SEGMENTED NAVIGATION (DESKTOP) --- */}
        <nav className={`hidden lg:flex items-center px-2 py-1.5 rounded-2xl transition-all duration-700 backdrop-blur-xl border border-white/10 shadow-2xl ${
          isScrolled ? 'bg-white/70 translate-y-2' : 'bg-white/10'
        }`}>
          <ul className="flex items-center space-x-1 px-1">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link 
                  href={link.href} 
                  className={`px-5 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 ${
                    isScrolled ? 'text-black hover:bg-black/5' : (navTheme === 'light' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5')
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="w-1 h-1 rounded-full bg-metan-orange opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- RIGHT: UTILITY BLOCK --- */}
        <div className="flex items-center space-x-3 z-[70]">
          {/* Desktop Utilities */}
          <div className={`hidden lg:flex items-center p-1.5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-700 ${
            isScrolled ? 'bg-white/70 translate-y-2 shadow-xl' : 'bg-white/10'
          }`}>
            <BrandsDropdown />
            <div className="w-[1px] h-4 bg-gray-400/30 mx-2" />
            <SearchButton hoverClass="hover:bg-metan-orange" />
          </div>

          {/* Mobile Optimized Morphing Toggle */}
          <div className="flex lg:hidden items-center bg-[#f4f4f6] rounded-full p-1 shadow-lg">
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 ${
                  isMobileMenuOpen ? 'bg-black text-white rotate-90' : 'bg-white text-black'
                }`}
             >
               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN CONTEXT MENU --- */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[60] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex flex-col h-full pt-32 pb-16 px-10">
          <nav className="flex flex-col space-y-12">
            {links.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group relative text-5xl font-bold tracking-tighter transition-all duration-700 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="text-white group-hover:text-metan-orange transition-colors">{link.name}</span>
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-metan-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          <div className={`mt-auto pt-10 border-t border-white/10 transition-all duration-700 delay-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex flex-col space-y-8">
              <div className="scale-110 origin-left invert brightness-0">
                <BrandsDropdown />
              </div>
              <div className="flex items-center space-x-6 text-[12px] font-black tracking-widest text-gray-500">
                <button className="text-metan-orange">TR</button>
                <button className="hover:text-white transition-colors">EN</button>
                <button className="hover:text-white transition-colors">DE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}