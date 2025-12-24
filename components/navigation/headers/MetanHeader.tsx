"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, Plus, Minus } from 'lucide-react';

export default function MetanHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
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
    if (!isMobileMenuOpen) setIsMobileBrandsOpen(false);
  }, [isMobileMenuOpen]);

  const links = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Künye", href: "/kunye" },
    { name: "Bayilerimiz", href: "/bayilerimiz" },
    { name: "Referanslarımız", href: "/referanslarimiz" },
    { name: "Finans", href: "/finans" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const brands = [
    { name: "METAN TEKNİK", href: "/", logo: "/images/metan-icon.png", hoverColor: "#df532b" },
    { name: "SENNHEISER", href: "/sennheiser", logo: "/images/SVG/sennheiser-icon.svg", hoverColor: "#057cc3" },
    { name: "NEUMANN", href: "/neumann", logo: "/images/SVG/neumann-inverse-icon.svg", hoverColor: "#ef7622" },
    { name: "MERGING", href: "/merging", logo: "/images/SVG/merging-icon.svg", hoverColor: "#e30613" },
  ];

  const utilityBaseClass = "transition-all duration-500 backdrop-blur-xl border flex items-center justify-center rounded-xl";
  
  const utilityThemeClass = (isScrolled || isMobileMenuOpen) 
    ? "border-black/[0.12] text-black hover:bg-black/[0.15]" 
    : (navTheme === 'light' 
        ? "bg-white/[0.15] border-white/[0.2] text-white hover:bg-white/[0.3]" 
        : "border-black/[0.12] text-black hover:bg-black/[0.15]");

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b h-[76px] flex items-center ${
      isScrolled 
        ? 'bg-white border-black/5 shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-[1800px] w-full mx-auto flex items-center pl-6 pr-8">
        
        {/* --- BRANDING --- */}
        <div className={`relative z-[70] flex-shrink-0 flex items-center h-10 px-6 transition-all duration-500 ${isScrolled ? 'lg:border-black/5' : 'lg:border-white/10'} lg:border-r`}>
          <Link href="/" className="px-2 py-1">
            <Image 
              src={isScrolled || isMobileMenuOpen || navTheme === 'dark' ? "/images/metan-logo.webp" : "/images/metan-logo-white.png"}
              alt="Metan Logo" width={120} height={32} priority 
              className="h-7 w-auto object-contain transition-all duration-500"
            />
          </Link>
        </div>

        {/* --- MAIN NAVIGATION (DESKTOP) --- */}
        <nav className="hidden lg:flex flex-grow pl-6">
          <ul className="flex items-center space-x-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`inline-block px-4 py-3 text-[12px] font-medium uppercase tracking-regular transition-all duration-300 relative group ${
                    isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')
                  }`}
                >
                  {link.name}
                  {/* Underline adjusted to sit exactly under text even with padding */}
                  <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-metan-orange transition-all duration-300 w-0 group-hover:w-[calc(100%-32px)]" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- UTILITIES --- */}
        <div className="flex items-center ml-auto">
          <div className={`hidden lg:flex items-center space-x-3 pl-10 border-l transition-all duration-500 ${isScrolled ? 'border-black/5' : 'border-white/10'}`}>
            <div className="relative group">
              <button className={`${utilityBaseClass} ${utilityThemeClass} px-4 h-9 text-[12px] font-medium uppercase cursor-pointer tracking-regular space-x-2`}>
                <span>Markalar</span>
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="w-max bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/5 p-2 overflow-hidden">
                  {brands.map((brand) => (
                    <Link 
                      key={brand.name} 
                      href={brand.href} 
                      className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-black/5 transition-all duration-300 group/item"
                      style={{ '--brand-color': brand.hoverColor } as React.CSSProperties}
                    >
                      <div 
                        className="w-5 h-5 bg-gray-400 group-hover/item:bg-[var(--brand-color)] transition-colors duration-300"
                        style={{
                          maskImage: `url(${brand.logo})`,
                          WebkitMaskImage: `url(${brand.logo})`,
                          maskRepeat: 'no-repeat',
                          maskSize: 'contain',
                        }}
                      />
                      <span className="text-[12.5px] font-medium text-gray-600 group-hover/item:text-black transition-colors whitespace-nowrap uppercase tracking-regular">
                        {brand.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <button className={`${utilityBaseClass} ${utilityThemeClass} w-9 h-9 cursor-pointer`}>
              <Search size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex lg:hidden items-center space-x-3">
             <button className={`relative z-[70] ${utilityBaseClass} ${utilityThemeClass} w-10 h-10`}>
                <Search size={20} strokeWidth={2} />
             </button>
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`z-[70] relative ${utilityBaseClass} ${utilityThemeClass} w-10 h-10`}
             >
               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div className={`fixed inset-0 bg-white z-[60] w-screen h-[dvh] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-[76px] px-10 relative">
          
          <div className="mt-8 border-b border-gray-100" />
          
          <nav className="flex flex-col space-y-2 mt-8 overflow-y-auto">
            {links.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-2xl font-light uppercase tracking-tighter text-black transition-all duration-700 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto mb-14 relative">
            <div className={`absolute bottom-full left-0 w-full mb-4 flex flex-col space-y-2 transition-all duration-500 ${
              isMobileBrandsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              {brands.map((brand) => (
                <Link 
                  key={brand.name} 
                  href={brand.href} 
                  className="flex items-center space-x-4 p-4 bg-white border border-black/5 rounded-xl shadow-sm active:bg-gray-50"
                >
                  <div 
                    className="w-5 h-5 bg-gray-500"
                    style={{
                      maskImage: `url(${brand.logo})`,
                      WebkitMaskImage: `url(${brand.logo})`,
                      maskRepeat: 'no-repeat',
                      maskSize: 'contain',
                    }}
                  />
                  <span className="text-xs font-bold tracking-regular uppercase text-gray-700">{brand.name}</span>
                </Link>
              ))}
            </div>

            <button 
              onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm active:bg-gray-50 transition-colors"
            >
              <span className="text-[11px] font-bold uppercase tracking-regular text-gray-900">Markalarımız</span>
              {isMobileBrandsOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            
            <div className="mt-8 border-t border-gray-100" />
          </div>
        </div>
      </div>
    </header>
  );
}