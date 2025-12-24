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

  // Lock scroll when mobile menu is active
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-3 backdrop-blur-xl bg-white/80 border-b border-black/5' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 flex items-center justify-between relative">
        
        {/* --- LOGO --- */}
        <div className="flex-shrink-0 z-[70]">
          <Link href="/" className="flex items-center group">
            <Image 
              src={isScrolled || isMobileMenuOpen || navTheme === 'dark' ? "/images/metan-logo.png" : "/images/metan-logo-white.png"} 
              alt="Metan Logo" width={140} height={40} priority 
              className="h-7 lg:h-8 w-auto object-contain transition-all duration-500"
            />
          </Link>
        </div>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center space-x-10">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link 
                  href={link.href} 
                  className={`text-[13px] uppercase tracking-[0.15em] font-semibold transition-colors duration-300 ${
                    isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')
                  } group-hover:text-metan-orange`}
                >
                  {link.name}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-metan-orange transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>
        </nav>

        {/* --- RIGHT UTILITIES & MOBILE TOGGLE --- */}
        <div className="flex items-center space-x-2 lg:space-x-6 z-[70]">
          {/* Desktop Only Tools */}
          <div className="hidden lg:flex items-center space-x-2">
            <BrandsDropdown />
            <SearchButton hoverClass="hover:bg-metan-orange" />
          </div>

          {/* Mobile Optimized Controls */}
          <div className="flex lg:hidden items-center space-x-1">
             <button 
                className={`w-11 h-11 flex items-center justify-center transition-colors duration-300 ${
                  isMobileMenuOpen ? 'text-black' : (isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black'))
                }`}
                aria-label="Search"
             >
                <Search size={22} strokeWidth={2.5} />
             </button>
             
             <button 
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 ${
                 isMobileMenuOpen ? 'bg-black text-white rotate-90' : 'bg-[#f4f4f6] text-black'
               }`}
               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
             >
               {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
             </button>
          </div>
        </div>
      </div>

      {/* --- OPTIMISED MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-2xl z-[60] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex flex-col h-full pt-32 pb-12 px-8 overflow-y-auto">
          {/* Main Navigation Links */}
          <nav className="flex flex-col space-y-6">
            {links.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-light tracking-tight text-black transition-all duration-700 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Bottom Utility Section */}
          <div className={`mt-auto pt-10 border-t border-black/5 transition-all duration-700 delay-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="flex flex-col space-y-8">
              <div className="scale-110 origin-left">
                <BrandsDropdown />
              </div>
              <div className="flex items-center space-x-6 text-[11px] font-bold tracking-widest text-gray-400">
                <button className="text-black border-b-2 border-metan-orange pb-1">TR</button>
                <button className="hover:text-black transition-colors pb-1">EN</button>
                <button className="hover:text-black transition-colors pb-1">DE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}