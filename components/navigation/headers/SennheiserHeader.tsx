"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { BrandsDropdown, SearchButton } from '../HeaderHelpers';

export default function SennheiserHeader() {
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
      const sections = document.querySelectorAll('[data-nav-color]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const links = [
    { name: "Ürünler", href: "/sennheiser/urunler" },
    { name: "Uygulamalar", href: "/sennheiser/uygulamalar" },
    { name: "Hikayeler", href: "/sennheiser/hikayeler" },
    { name: "Eğitim", href: "/sennheiser/egitim" },
    { name: "Destek", href: "/sennheiser/teknik-servis" },
    { name: "Blog", href: "/sennheiser/blog" },
    { name: "Hakkımızda", href: "/sennheiser/hakkimizda" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-5 px-5">
      <div className="max-w-full mx-auto flex items-center relative">
        
        {/* --- MOBILE ONLY CONTROLS (LEFT) --- */}
        <div className="flex lg:hidden items-center space-x-2 z-[70]">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center bg-[#f4f4f6] rounded-full text-[#5d5b5c] relative overflow-hidden"
          >
            {/* Animated Icon Toggle */}
            <div className={`transition-all duration-500 flex items-center justify-center ${isMobileMenuOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}`}>
              <Menu size={20} />
            </div>
            <div className={`absolute transition-all duration-500 flex items-center justify-center ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`}>
              <X size={20} />
            </div>
          </button>
          
          <button className={`w-10 h-10 flex items-center justify-center bg-[#f4f4f6] rounded-full text-[#5d5b5c] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Logo Container (Original) */}
        <div className="absolute left-0 top-0 h-[52px] hidden lg:flex items-center">
          <div className={`transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link href="/sennheiser" className="group">
              <svg viewBox="0 0 155 20" className={`h-5 w-auto fill-current transition-colors duration-500 ${navTheme === 'light' ? 'text-white' : 'text-black'} group-hover:text-brand-blue`}>
                <path d="M79.328 4.076h2.276v11.852h-2.9l-3.376-5.452a27.436 27.436 0 01-1.07-1.967h-.033v7.42H71.94V4.075h2.678l4 6.457c.267.425.496.873.686 1.339V4.075h.023zm13.091 4.852h-3.966V4.072H85.56v11.852h2.891v-5.057h3.967v5.057h2.906V4.072h-2.906v4.856zm-42.336 1.844h3.759V8.99h-3.759V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.18zm-10.44-4a.529.529 0 01.43-.872h4.312V4.076h-5.102a2.504 2.504 0 00-1.776.662 2.535 2.535 0 00-.813 1.72c0 .694.052 1.2 1.088 2.294l3.839 4.048a.659.659 0 01-.445 1.152h-4.733v1.976h5.415a2.772 2.772 0 002.025-.78 2.804 2.804 0 00.857-2.005c0-.786-.185-1.31-1.212-2.381l-3.886-3.99zm26.068 5.085a8.629 8.629 0 00-.686-1.338l-4-6.457h-2.678v11.866h2.276V8.525h.034s.473 1.028 1.069 1.967l3.379 5.451h2.902V4.076H65.73v7.786l-.02-.005zm63.941-1.085h3.758V8.99h-3.758V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.18zm17.848 5.156h-3.147l-2.263-4.866h-1.268v4.866h-2.897V4.076h5.282c2.546 0 3.73 1.596 3.73 3.438a3.423 3.423 0 01-.627 1.97 3.38 3.38 0 01-1.645 1.24l2.835 5.204zm-3.043-8.336c0-.549-.317-1.686-1.846-1.686h-1.793v3.37h1.759c1.591 0 1.88-1.18 1.88-1.684zm-25.284-.815a.53.53 0 01.431-.87h4.312V4.074h-5.121a2.502 2.502 0 00-1.775.662 2.538 2.538 0 00-.814 1.72c0 .695.052 1.2 1.089 2.295l3.838 4.047a.655.655 0 01-.431 1.176h-4.747v1.977h5.415a2.773 2.773 0 002.026-.781 2.813 2.813 0 00.856-2.005c0-.786-.185-1.31-1.211-2.381l-3.868-4.01v.002zm-16.995 4h3.758V8.992h-3.753V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.177h-.005v.002zm8.273 5.157h2.901V4.076h-2.901v11.858zM0 0v20h26.504V0H0zm14.587 1.843c-1.576.61-3.091 1.952-4.312 4.648-.355.78-1.023 2.29-1.325 2.966-2.457 5.424-3.716 6.59-7.422 6.59V1.5H14.52a.175.175 0 01.162.264.177.177 0 01-.095.079zM25 3.947V18.5H11.983a.175.175 0 01-.155-.265.177.177 0 01.095-.078c1.575-.61 3.09-1.952 4.31-4.648.356-.78 1.023-2.29 1.325-2.966 2.453-5.424 3.711-6.59 7.417-6.59L25 3.947z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop Nav Pill (Original) */}
        <nav className={`relative hidden lg:flex items-center h-[52px] rounded-full bg-[#f4f4f6] transition-all duration-700 ease-in-out px-8 ${isScrolled ? 'ml-0 pl-4 space-x-4' : 'ml-[175px]'}`}>
          <div className={`transition-all duration-500 flex items-center overflow-hidden ${isScrolled ? 'w-8 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
            <Link href="/sennheiser" className="group flex items-center shrink-0">
              <svg viewBox="0 0 27.82 19.14" className="h-5 w-[27.82px] fill-current text-black group-hover:text-brand-blue transition-colors duration-300">
                <path d="M14.61,0H0v14.64h1.81V1.81h11.11c.57-.85,1.14-1.43,1.68-1.81h0ZM13.21,19.14h14.61V4.51h-1.81v12.8h-11.11c-.54.86-1.11,1.45-1.68,1.84h0ZM14.33,16.5c-1.61,2.62-3.11,2.64-4.95,2.64H0v-3.71h2.93c1.94,0,3.5-.98,4.33-2.38L13.52,2.64C15.1.03,16.6,0,18.44,0h9.38v3.68h-2.93c-1.94,0-3.5.98-4.33,2.41l-6.24,10.41h0Z"/>
              </svg>
            </Link>
          </div>

          <ul className="flex space-x-6 text-[13px] font-medium whitespace-nowrap">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#5d5b5c] hover:text-brand-blue transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- MOBILE LOGO / DESKTOP ACTIONS --- */}
        <div className="ml-auto flex items-center">
          {/* Desktop Only Actions */}
          <div className="hidden lg:flex items-center space-x-2">
              <BrandsDropdown />
              <SearchButton hoverClass="hover:bg-brand-blue" />
          </div>

          {/* Mobile Only S-Logo (Far Right) */}
          <div className="lg:hidden flex items-center z-[70]">
            <Link href="/sennheiser" className="group">
              <svg viewBox="0 0 27.82 19.14" className={`h-6 w-auto fill-current transition-colors duration-500 ${isMobileMenuOpen ? 'text-black' : (navTheme === 'light' ? 'text-white' : 'text-black')} group-hover:text-brand-blue`}>
                <path d="M14.61,0H0v14.64h1.81V1.81h11.11c.57-.85,1.14-1.43,1.68-1.81h0ZM13.21,19.14h14.61V4.51h-1.81v12.8h-11.11c-.54.86-1.11,1.45-1.68,1.84h0ZM14.33,16.5c-1.61,2.62-3.11,2.64-4.95,2.64H0v-3.71h2.93c1.94,0,3.5-.98,4.33-2.38L13.52,2.64C15.1.03,16.6,0,18.44,0h9.38v3.68h-2.93c-1.94,0-3.5.98-4.33,2.41l-6.24,10.41h0Z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY (Sliding from Left) --- */}
      <div className={`fixed inset-0 bg-white transition-transform duration-500 ease-in-out lg:hidden z-[60] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-28 px-8">
          <nav className="flex flex-col space-y-6 mb-12">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold text-black hover:text-brand-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto mb-12 pt-8 border-t border-gray-100">
             <div className="scale-110 origin-left">
                <BrandsDropdown />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}