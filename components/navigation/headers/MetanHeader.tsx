"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Globe } from 'lucide-react';
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md py-3 border-black/10' 
        : 'bg-transparent py-6 border-transparent'
    }`}>
      <div className="max-w-[1800px] mx-auto flex items-center px-6 lg:px-12">
        
        {/* --- BRANDING --- */}
        <div className="flex-shrink-0 pr-10 lg:border-r lg:border-black/5 h-10 flex items-center">
          <Link href="/">
            <Image 
              src={isScrolled || navTheme === 'dark' ? "/images/metan-logo.png" : "/images/metan-logo-white.png"} 
              alt="Metan Logo" width={120} height={32} priority 
              className="h-7 w-auto object-contain transition-all duration-500"
            />
          </Link>
        </div>

        {/* --- MAIN NAVIGATION (DESKTOP) --- */}
        <nav className="hidden lg:flex flex-grow pl-10">
          <ul className="flex items-center space-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                    isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-metan-orange transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- UTILITIES & MOBILE --- */}
        <div className="flex items-center ml-auto space-x-6">
          {/* Desktop Utilities */}
          <div className="hidden lg:flex items-center space-x-6 pl-10 border-l border-black/5">
            <div className={`transition-colors duration-500 ${isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')}`}>
              <BrandsDropdown />
            </div>
            <div className={`transition-colors duration-500 ${isScrolled ? 'text-black hover:text-metan-orange' : (navTheme === 'light' ? 'text-white hover:text-metan-orange' : 'text-black hover:text-metan-orange')}`}>
              <SearchButton />
            </div>
            <button className={`flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest ${isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')}`}>
              <Globe size={14} />
              <span>TR</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-4">
             <button className={`${isMobileMenuOpen ? 'text-black' : (isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black'))}`}>
                <Search size={22} />
             </button>
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="z-[70]"
             >
               {isMobileMenuOpen ? (
                 <X size={28} className="text-black" />
               ) : (
                 <Menu size={28} className={isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')} />
               )}
             </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN MENU (The "Slate") --- */}
      <div className={`fixed inset-0 bg-[#f8f8f8] z-[60] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-32 pb-16 px-10">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Menü</div>
          <nav className="flex flex-col space-y-6">
            {links.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-black uppercase tracking-tighter text-black transition-all duration-700 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={`mt-auto pt-10 transition-all duration-1000 delay-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex flex-col space-y-12">
              <div className="scale-125 origin-left">
                <BrandsDropdown />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Dil Seçimi</div>
                <div className="flex items-center space-x-8 text-sm font-black text-black">
                  <button className="border-b-2 border-metan-orange">TR</button>
                  <button className="text-gray-300">EN</button>
                  <button className="text-gray-300">DE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}