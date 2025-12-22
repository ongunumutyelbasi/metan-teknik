"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BrandsDropdown, SearchButton } from '../HeaderHelpers';

export default function MetanHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-nav-color') as 'dark' | 'light';
          if (theme) setNavTheme(theme);
        }
      });
    }, { rootMargin: '-10% 0px -85% 0px' });

    setTimeout(() => {
      document.querySelectorAll('[data-nav-color]').forEach(s => observer.observe(s));
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, [pathname]);

  const links = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Şirketler", href: "/sirketler" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim", href: "/hakkimizda/iletisim-bilgileri" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-5 px-5">
      <div className="max-w-full mx-auto flex items-center relative">
        <div className="absolute left-0 top-0 h-[52px] flex items-center">
          <div className={`transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <Image 
                src={navTheme === 'light' ? "/images/metan-logo-white.png" : "/images/metan-logo.png"} 
                alt="Metan Logo" width={140} height={40} priority className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        <nav className={`relative flex items-center h-[52px] rounded-full bg-[#f4f4f6] transition-all duration-700 ease-in-out ${isScrolled ? 'ml-0 pl-4 pr-8' : 'ml-[115px] pl-[20px] pr-8'}`}>
          <div className={`transition-all duration-500 flex items-center overflow-hidden ${isScrolled ? 'w-[32px] opacity-100 mr-2' : 'w-0 opacity-0'}`}>
            <Link href="/" className="group flex items-center shrink-0">
              <Image src="/images/metan-icon.png" alt="Icon" width={24} height={24} className="w-6 h-6 object-contain hover:opacity-80" />
            </Link>
          </div>
          <ul className="flex space-x-6 text-[13px] font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#5d5b5c] hover:text-metan-orange transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
            <BrandsDropdown />
            <SearchButton hoverClass="hover:bg-metan-orange" />
        </div>
      </div>
    </header>
  );
}