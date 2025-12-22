"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();

  const isSennheiserPath = pathname.startsWith('/sennheiser');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      rootMargin: '-10% 0px -85% 0px',
      threshold: 0
    };

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

  const sennheiserLinks = [
    { name: "Ürünler", href: "/sennheiser/urunler" },
    { name: "Uygulamalar", href: "/sennheiser/uygulamalar" },
    { name: "Hikayeler", href: "/sennheiser/hikayeler" },
    { name: "Eğitim", href: "/sennheiser/egitim" },
    { name: "Destek", href: "/sennheiser/teknik-servis" },
    { name: "Blog", href: "/sennheiser/blog" },
    { name: "Hakkımızda", href: "/sennheiser/hakkimizda" },
  ];

  const metanLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Şirketler", href: "/sirketler" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim", href: "/hakkimizda/iletisim-bilgileri" },
  ];

  const brands = [
    { name: "Sennheiser", href: "/sennheiser", hoverColor: "group-hover/item:text-brand-blue" },
    { name: "Neumann", href: "/neumann", hoverColor: "group-hover/item:text-[#ef7622]" },
    { name: "Merging", href: "/merging", hoverColor: "group-hover/item:text-[#fe6466]" },
  ];

  const currentLinks = isSennheiserPath ? sennheiserLinks : metanLinks;
  
  const navLinkClass = isSennheiserPath 
    ? "text-[#5d5b5c] hover:text-brand-blue" 
    : "text-[#5d5b5c] hover:text-metan-orange";
  
  const brandIconHoverClass = isSennheiserPath 
    ? "group-hover:text-brand-blue" 
    : "group-hover:text-metan-orange";

  const brandSearchHoverClass = isSennheiserPath 
    ? "hover:bg-brand-blue" 
    : "hover:bg-metan-orange";
    
  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-5 px-5">
      <div className="max-w-full mx-auto flex items-center relative">
        
        {/* Logo Container */}
        <div className="absolute left-0 top-0 h-[52px] flex items-center">
          <div className={`transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {isSennheiserPath ? (
              <Link href="/sennheiser" aria-label="Sennheiser" className="group">
                <svg viewBox="0 0 155 20" className={`h-5 w-auto fill-current transition-colors duration-500 ${navTheme === 'light' ? 'text-white' : 'text-black'} group-hover:text-brand-blue`}>
                  <path d="M79.328 4.076h2.276v11.852h-2.9l-3.376-5.452a27.436 27.436 0 01-1.07-1.967h-.033v7.42H71.94V4.075h2.678l4 6.457c.267.425.496.873.686 1.339V4.075h.023zm13.091 4.852h-3.966V4.072H85.56v11.852h2.891v-5.057h3.967v5.057h2.906V4.072h-2.906v4.856zm-42.336 1.844h3.759V8.99h-3.759V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.18zm-10.44-4a.529.529 0 01.43-.872h4.312V4.076h-5.102a2.504 2.504 0 00-1.776.662 2.535 2.535 0 00-.813 1.72c0 .694.052 1.2 1.088 2.294l3.839 4.048a.659.659 0 01-.445 1.152h-4.733v1.976h5.415a2.772 2.772 0 002.025-.78 2.804 2.804 0 00.857-2.005c0-.786-.185-1.31-1.212-2.381l-3.886-3.99zm26.068 5.085a8.629 8.629 0 00-.686-1.338l-4-6.457h-2.678v11.866h2.276V8.525h.034s.473 1.028 1.069 1.967l3.379 5.451h2.902V4.076H65.73v7.786l-.02-.005zm63.941-1.085h3.758V8.99h-3.758V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.18zm17.848 5.156h-3.147l-2.263-4.866h-1.268v4.866h-2.897V4.076h5.282c2.546 0 3.73 1.596 3.73 3.438a3.423 3.423 0 01-.627 1.97 3.38 3.38 0 01-1.645 1.24l2.835 5.204zm-3.043-8.336c0-.549-.317-1.686-1.846-1.686h-1.793v3.37h1.759c1.591 0 1.88-1.18 1.88-1.684zm-25.284-.815a.53.53 0 01.431-.87h4.312V4.074h-5.121a2.502 2.502 0 00-1.775.662 2.538 2.538 0 00-.814 1.72c0 .695.052 1.2 1.089 2.295l3.838 4.047a.655.655 0 01-.431 1.176h-4.747v1.977h5.415a2.773 2.773 0 002.026-.781 2.813 2.813 0 00.856-2.005c0-.786-.185-1.31-1.211-2.381l-3.868-4.01v.002zm-16.995 4h3.758V8.992h-3.753V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.177h-.005v.002zm8.273 5.157h2.901V4.076h-2.901v11.858zM0 0v20h26.504V0H0zm14.587 1.843c-1.576.61-3.091 1.952-4.312 4.648-.355.78-1.023 2.29-1.325 2.966-2.457 5.424-3.716 6.59-7.422 6.59V1.5H14.52a.175.175 0 01.162.264.177.177 0 01-.095.079zM25 3.947V18.5H11.983a.175.175 0 01-.155-.265.177.177 0 01.095-.078c1.575-.61 3.09-1.952 4.31-4.648.356-.78 1.023-2.29 1.325-2.966 2.453-5.424 3.711-6.59 7.417-6.59L25 3.947z" />
                </svg>
              </Link>
            ) : (
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                <Image 
                  src={navTheme === 'light' ? "/images/metan-logo-white.png" : "/images/metan-logo.png"} 
                  alt="Metan Logo" 
                  width={140} 
                  height={40} 
                  priority
                  className="h-8 w-auto object-contain transition-opacity duration-500"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Pill */}
        <nav 
          className={`relative flex items-center h-[52px] rounded-full bg-[#f4f4f6] transition-all duration-700 ease-in-out ${
            isScrolled ? 'ml-0 pl-4 pr-8' : isSennheiserPath ? 'ml-[175px] pl-[20px] pr-8' : 'ml-[115px] pl-[20px] pr-8'
          }`}
        >
          <div className={`transition-all duration-500 flex items-center overflow-hidden ${isScrolled ? 'w-[32px] opacity-100 mr-2' : 'w-0 opacity-0'}`}>
            <Link href={isSennheiserPath ? "/sennheiser" : "/"} className="group flex items-center shrink-0">
              {isSennheiserPath ? (
                <svg viewBox="0 0 27.82 19.14" className={`h-5 w-[27px] fill-current text-black ${brandIconHoverClass} transition-colors duration-300`}>
                  <path d="M14.61,0H0v14.64h1.81V1.81h11.11c.57-.85,1.14-1.43,1.68-1.81h0ZM13.21,19.14h14.61V4.51h-1.81v12.8h-11.11c-.54.86-1.11,1.45-1.68,1.84h0ZM14.33,16.5c-1.61,2.62-3.11,2.64-4.95,2.64H0v-3.71h2.93c1.94,0,3.5-.98,4.33-2.38L13.52,2.64C15.1.03,16.6,0,18.44,0h9.38v3.68h-2.93c-1.94,0-3.5.98-4.33,2.41l-6.24,10.41h0Z"/>
                </svg>
              ) : (
                <Image 
                  src="/images/metan-icon.png" 
                  alt="Metan Icon" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain shrink-0 transition-opacity duration-300 hover:opacity-80"
                />
              )}
            </Link>
          </div>

          <ul className="flex space-x-6 text-[13px] font-medium">
            {currentLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`cursor-pointer transition-colors duration-300 ${navLinkClass}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons Section */}
        <div className="ml-auto flex items-center space-x-2 flex-shrink-0">
            <div className="relative group">
              <button className="h-[52px] px-6 flex items-center rounded-full bg-[#f4f4f6] text-[#5d5b5c] text-[13px] font-medium transition-all duration-300 hover:text-black">
                Markalar
                <svg className="ml-2 w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-40 bg-[#f4f4f6] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border border-gray-100">
                {brands.map((brand) => (
                  <Link 
                    key={brand.name}
                    href={brand.href}
                    className={`flex items-center space-x-3 px-5 py-4 hover:bg-gray-200 transition-colors duration-200 group/item text-black ${brand.hoverColor}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      {brand.name === "Sennheiser" && (
                        <svg viewBox="0 0 27.82 19.14" className={`h-4 w-auto transition-colors duration-300 fill-current ${brand.hoverColor}`}>
                          <path fill="currentColor" d="M14.61,0H0v14.64h1.81V1.81h11.11c.57-.85,1.14-1.43,1.68-1.81h0ZM13.21,19.14h14.61V4.51h-1.81v12.8h-11.11c-.54.86-1.11,1.45-1.68,1.84h0ZM14.33,16.5c-1.61,2.62-3.11,2.64-4.95,2.64H0v-3.71h2.93c1.94,0,3.5-.98,4.33-2.38L13.52,2.64C15.1.03,16.6,0,18.44,0h9.38v3.68h-2.93c-1.94,0-3.5.98-4.33,2.41l-6.24,10.41h0Z"/>
                        </svg>
                      )}
                      {brand.name === "Neumann" && (
                        <svg viewBox="0 0 144.32 144.32" className={`h-5 w-auto transition-colors duration-300 fill-current ${brand.hoverColor}`}>
                           <path fill="currentColor" d="M11.81,72.31l60.4,60.3,60.3-60.3L72.21,12.01,11.81,72.31ZM42.01,72.31c0-6.5,2.1-12.6,5.6-17.5,3.6-5,8.6-8.8,14.4-10.9v1.9c-10.7,4.1-18.4,14.5-18.4,26.5,0,11,6.3,20.7,15.6,25.3v-1.8c-8.3-4.6-14-13.5-14-23.6,0-11.3,7-21,16.8-24.9v1.9c-8.8,3.9-15.1,12.7-15.1,23,0,9.1,4.8,17.3,12.3,21.7v-1.9c-6.4-4.2-10.6-11.6-10.6-19.7,0-9.3,5.6-17.6,13.4-21.4v2c-7,3.8-11.8,10.9-11.8,19.3,0,7.2,3.4,13.8,9,17.7v-32.8s1-.7,1-.7l5.4,6.2v4.57s.2.23.2.23h-.2s0-.23,0-.23l-3.5-3.97v37.5c-11.6-4.2-20.1-15.4-20.1-28.4ZM74.91,27.71h1.8s0,11.4,0,11.4h-1.8s-5.4-8.2-5.4-8.2v8.2s-1.8,0-1.8,0v-11.4s1.8,0,1.8,0l5.4,8.3v-8.3ZM76.71,40.71v1.8s-7.2,0-7.2,0v3.1s7.2,0,7.2,0v1.8s-7.2,0-7.2,0v2.9h7.2s0,1.8,0,1.8h-9s0-11.4,0-11.4h9ZM69.51,53.61v7c0,1.9,1.5,2.7,2.7,2.7,1.3,0,2.7-.7,2.7-2.7v-7s1.8,0,1.8,0v7.2c0,2.5-1.9,4.4-4.5,4.4-2.6,0-4.5-1.8-4.5-4.4v-7.2s1.8,0,1.8,0ZM75.51,66.51h1.2s0,11.3,0,11.3h-1.8s0-7.9,0-7.9l-2.6,3.2-2.8-3.2v7.9s-1.8,0-1.8,0v.1s0-11.4,0-11.4h1.2s3.3,3.9,3.3,3.9l3.3-3.9ZM69.51,116.71h-1.8s0-11.4,0-11.4h1.8s5.4,8.3,5.4,8.3v-8.3s1.8,0,1.8,0v11.4s-1.8,0-1.8,0l-5.4-8.2v8.2ZM74.91,103.81l-5.4-8.2v8.2s-1.8,0-1.8,0v-11.4s1.8,0,1.8,0l5.4,8.3v-8.3s1.8,0,1.8,0v11.4s-1.8,0-1.8,0ZM74.81,90.81l-.5-1.8h-4.2s-.6,1.8-.6,1.8h-1.8s3.6-11.4,3.6-11.4h1.9s3.5,11.4,3.5,11.4h-1.9ZM64.21,120.21v-51.8s1.6,1.7,1.6,1.7v48.4s12.8,0,12.8,0v-33.7s1.5,1.8,1.5,1.8v33.6s-15.9,0-15.9,0ZM102.31,72.21c0,6.5-2.1,12.6-5.6,17.5-3.6,5-8.6,8.8-14.4,10.9v-1.9c10.7-4.1,18.3-14.5,18.3-26.5,0-11.1-6.3-20.7-15.6-25.4v1.8c8.3,4.6,14.1,13.5,14.1,23.6,0,11.2-7,21-16.8,24.9v-1.9c8.8-3.9,15.1-12.7,15.1-22.9,0-9.2-4.8-17.3-12.3-21.7v1.9c6.4,4.2,10.6,11.6,10.6,19.8,0,9.3-5.5,17.6-13.4,21.3v-2c7-3.8,11.8-10.9,11.8-19.3,0-7.3-3.4-13.9-9-17.8v32.9s-1,.7-1,.7l-5.3-6.2v-4.57s-.2-.23-.2-.23h.2s0,.23,0,.23l3.4,3.87v-37.4c11.7,4.2,20.1,15.4,20.1,28.4ZM80.11,24.41v51.9s-1.5-1.9-1.5-1.9v-23.2s0-25.3,0-25.3h-12.8s0,34,0,34l-1.6-1.9V24.41s15.9,0,15.9,0Z"/>
                           <polygon fill="currentColor" points="73.71 87.31 72.21 82.41 70.61 87.31 73.71 87.31"/>
                           <path fill="currentColor" d="M72.16,0L0,72.16l72.16,72.16,72.16-72.16L72.16,0ZM6.01,72.31L72.11,6.11l66.1,66.1-66,66.2L6.01,72.31Z"/>
                        </svg>
                      )}
                      {brand.name === "Merging" && (
                        <svg viewBox="0 0 132.23 109.16" className={`h-4 w-auto transition-colors duration-300 fill-current ${brand.hoverColor}`}>
                           <path fill="currentColor" d="M105.71,62.79L68.88,1.9c-1.53-2.54-5.37-2.54-6.91,0L.54,103.44c-1.54,2.54.39,5.72,3.46,5.72h72.89c2.17,0,5.53-2.01,6.51-3.59l21.19-35.03c1.42-2,2.56-4.61,1.13-7.75"/>
                           <path fill="currentColor" d="M106.86,75.33l-16.47,27.23c-2.35,3.86-.05,6.6,3.99,6.6h32.95c4.45,0,6.08-3.21,4-6.6l-16.47-27.23c-2.06-3.39-5.82-3.58-7.99,0"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-[#5d5b5c] group-hover/item:text-inherit transition-colors">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <button className={`cursor-pointer group w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[#f4f4f6] text-[#545252] transition-all duration-300 ${brandSearchHoverClass} hover:text-white`}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M1.44141 2.125C2.37891 1.1875 3.56641 0.75 4.75391 0.75C5.94141 0.75 7.12891 1.1875 8.06641 2.125C9.75391 3.8125 9.87891 6.4375 8.50391 8.25L13.6289 13.375L12.7539 14.25L7.62891 9.125C6.81641 9.75 5.81641 10.0625 4.81641 10.0625C3.62891 10.0625 2.44141 9.625 1.50391 8.6875C-0.371095 6.9375 -0.371094 3.9375 1.44141 2.125ZM2.31641 7.875C2.94141 8.5 3.81641 8.875 4.75391 8.875C5.69141 8.875 6.56641 8.5 7.19141 7.875C7.81641 7.25 8.19141 6.375 8.19141 5.4375C8.19141 4.5 7.81641 3.625 7.19141 3C6.56641 2.375 5.69141 2 4.75391 2C3.81641 2 2.94141 2.375 2.31641 3C1.00391 4.375 1.00391 6.5625 2.31641 7.875Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
      </div>
    </header>
  );
}