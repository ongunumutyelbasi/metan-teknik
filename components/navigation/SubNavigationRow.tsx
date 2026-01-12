"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NavItem {
  label: string;
  id: string;
}

interface SubNavigationRowProps {
  items: NavItem[];
  onStickyChange?: (isStuck: boolean) => void;
}

export default function SubNavigationRow({ items, onStickyChange }: SubNavigationRowProps) {
  const [isStuck, setIsStuck] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = observerRef.current;
    
    const observer = new IntersectionObserver(
        ([entry]) => {
        const currentlyStuck = entry.intersectionRatio < 1;
        setIsStuck(currentlyStuck);

        // broadcast the state to the rest of the app
        window.dispatchEvent(new CustomEvent('subnav-sticky', { detail: currentlyStuck }));
        
        },
        {
            threshold: [1],
            rootMargin: '-77px 0px 0px 0px',
        }
    );

    if (cachedRef) {
      observer.observe(cachedRef);
    }

    return () => {
      if (cachedRef) {
        observer.unobserve(cachedRef);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={observerRef}
      // logic: always has border-t, but color becomes transparent (or white) when stuck
      className={`w-full h-[68px] sticky top-[76px] z-40 flex items-center transition-all duration-500 ease-in-out border-t ${
        isStuck 
          ? 'bg-white/90 border-white/90 backdrop-blur-md' 
          : 'bg-white/100 border-light-gray backdrop-blur-md'
      }`}
    >
      <div className='max-w-full w-full mx-auto px-3 flex items-center h-full relative overflow-hidden'>
        <span className='text-[0.55rem] text-grey-on-light font-medium mr-1 whitespace-nowrap hidden sm:block'>
          Hızlı erişim:
        </span>

        <div className='flex items-center gap-[4px] overflow-x-auto no-scrollbar py-2 h-full'>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='h-[28px] flex items-center justify-center px-3 rounded-full 
                        bg-sennheiser-gray/60 antialiased subpixel-antialiased backdrop-blur-md 
                        text-[12px] font-medium text-black leading-tight
                        transition-all duration-300 whitespace-nowrap hover:text-white hover:bg-brand-hover-blue
                        active:scale-100 cursor-pointer'
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}