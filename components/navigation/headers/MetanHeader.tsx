"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

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

  const brands = [
    { name: "METAN TEKNİK", href: "/", logo: "/images/metan-icon.png", hoverColor: "#df532b" },
    { name: "SENNHEISER", href: "/sennheiser", logo: "/images/SVG/sennheiser-icon.svg", hoverColor: "#057cc3" },
    { name: "NEUMANN", href: "/neumann", logo: "/images/SVG/neumann-inverse-icon.svg", hoverColor: "#ef7622" },
    { name: "MERGING", href: "/merging", logo: "/images/SVG/merging-icon.svg", hoverColor: "#e30613" },
  ];

  const utilityBaseClass = "transition-all duration-700 backdrop-blur-xl border flex items-center justify-center rounded-xl";
  
  // Refined theme class for seamless fading between states
  const utilityThemeClass = isScrolled 
    ? "bg-black/[0.05] border-black/[0.08] text-black hover:bg-black/[0.12]" 
    : (navTheme === 'light' 
        ? "bg-white/[0.12] border-white/[0.15] text-white hover:bg-white/[0.25]" 
        : "bg-black/[0.05] border-black/[0.08] text-black hover:bg-black/[0.12]");

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b h-[76px] flex items-center ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-black/5 shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-[1800px] w-full mx-auto flex items-center px-6 lg:px-12">
        
        {/* --- BRANDING --- */}
        <div className={`flex-shrink-0 pr-10 h-10 flex items-center transition-all duration-700 ${isScrolled ? 'lg:border-black/5' : 'lg:border-white/10'} lg:border-r`}>
          <Link href="/">
            <Image 
              src={isScrolled || navTheme === 'dark' ? "/images/metan-logo.webp" : "/images/metan-logo-white.png"} 
              alt="Metan Logo" width={120} height={32} priority 
              className="h-7 w-auto object-contain transition-all duration-700"
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
                  className={`text-[12px] font-medium uppercase tracking-widest transition-all duration-300 relative group ${
                    isScrolled ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-metan-orange transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- UTILITIES --- */}
        <div className="flex items-center ml-auto">
          <div className={`hidden lg:flex items-center space-x-3 pl-10 border-l transition-all duration-700 ${isScrolled ? 'border-black/5' : 'border-white/10'}`}>
            
            <div className="relative group">
              <button className={`${utilityBaseClass} ${utilityThemeClass} px-4 h-9 text-[12px] font-medium uppercase cursor-pointer tracking-widest space-x-2`}>
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
                          WebkitMaskRepeat: 'no-repeat',
                          maskSize: 'contain',
                        }}
                      />
                      <span className="text-[12.5px] font-medium text-gray-600 group-hover/item:text-black transition-colors whitespace-nowrap uppercase tracking-widest">
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

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-3">
             {!isMobileMenuOpen && (
               <button className={`${utilityBaseClass} ${utilityThemeClass} w-10 h-10`}>
                  <Search size={20} strokeWidth={2} />
               </button>
             )}
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="z-[70] relative w-10 h-10 flex items-center justify-center rounded-xl bg-black text-white"
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div className={`fixed inset-0 bg-white z-[60] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-28 pb-12 px-10">
          <div className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-10 border-b border-gray-100 pb-4">
            Keşfet
          </div>
          <nav className="flex flex-col space-y-8">
            {links.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-light uppercase tracking-tighter text-black transition-all duration-700 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={`mt-auto transition-all duration-1000 delay-500 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col space-y-10">
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                   <Link key={brand.name} href={brand.href} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <div 
                        className="w-4 h-4 bg-gray-400"
                        style={{
                          maskImage: `url(${brand.logo})`,
                          WebkitMaskImage: `url(${brand.logo})`,
                          maskRepeat: 'no-repeat',
                          maskSize: 'contain',
                        }}
                      />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{brand.name.split(' ')[0]}</span>
                   </Link>
                ))}
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                <div className="flex items-center space-x-6 text-xs font-medium tracking-widest text-black uppercase">
                  <button className="text-metan-orange font-bold">TR</button>
                  <button className="text-gray-300">EN</button>
                  <button className="text-gray-300">DE</button>
                </div>
                <div className="text-[10px] font-medium text-gray-400">© 2025 METAN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}