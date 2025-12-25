"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Spectera",
    subtitle: "Dünyanın ilk geniş bant ve çift yönlü kablosuz ekosistemi!",
    productImg: "/images/hero-slide/spectera-unit.avif",
    lifestyleImg: "/images/hero-slide/Spectera_Product_Shot_In_Use_39_.webp",
    alt: "Spectera System",
    link: "#"
  },
  {
    id: 2,
    title: "TeamConnect Bars",
    subtitle: "Sınıfının en fazla özelliğe sahip çok işlevli işitsel ve görsel konferans cihazları",
    productImg: "/images/hero-slide/teamconnect-bar.avif",
    lifestyleImg: "/images/hero-slide/teamconnect-meeting.webp",
    alt: "TeamConnect Bars",
    link: "#"
  },
  {
    id: 3,
    title: "e904",
    subtitle: "Bu ayın mikrofonu",
    productImg: "/images/hero-slide/e904.webp",
    lifestyleImg: "/images/hero-slide/e904-drum.webp",
    alt: "e904",
    link: "#"
  },
  {
    id: 4,
    title: "YENİ",
    subtitle: "Intermodülasyonsuz (girişimsiz) rahat bir frekans dağılımından daha fazlası",
    productImg: "/images/hero-slide/holidaysavings.avif",
    lifestyleImg: "/images/hero-slide/banner-holidaysavings.webp",
    alt: "HD 660S2",
    link: "#"
  }
];

const categories = [
  { id: 1, name: "Kablosuz Sistemler", img: "/images/homePage-categories/wireless-systems.avif" },
  { id: 2, name: "Aksesuarlar", img: "/images/homePage-categories/accessories.avif" },
  { id: 3, name: "Mikrofonlar", img: "/images/homePage-categories/microphones.avif" },
  { id: 4, name: "Toplantı ve Konferans Sistemleri", img: "/images/homePage-categories/meeting-systems.avif" },
  { id: 5, name: "Kulaklıklar", img: "/images/homePage-categories/headphones.avif" },
];

export default function SennheiserPage() {
  const [current, setCurrent] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const duration = 8000;

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, duration);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className='min-h-screen bg-white text-black font-sennheiser overflow-x-hidden selection:bg-black selection:text-white'>

      {/* --- HERO SPLIT SECTION --- */}
      <main data-nav-color='dark' className='flex h-[90vh] w-full overflow-hidden'>
        
        {/* LEFT PANEL */}
        <div className='w-1/2 flex flex-col h-full bg-white relative px-6 pb-6'>
          <div className='h-[76px] w-full flex-shrink-0' />

          {/* IMAGE SECTION */}
          <div className='flex-1 flex items-center justify-center w-full min-h-0 relative'> 
            {slides.map((slide, index) => (
              <div 
                key={`product-${slide.id}`}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                  index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className='relative w-full max-w-xl aspect-square'>
                  <Image 
                    src={slide.productImg}
                    alt={slide.alt}
                    fill
                    className='object-contain mix-blend-multiply'
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TEXT & BUTTON SECTION */}
          <div className='w-full flex-shrink-0 pt-0 relative z-20'>
            <h3 className='text-[1.5rem] font-medium text-dark-gray mb-0 tracking-tight'>
              {slides[current].title}
            </h3>
            <h3 className='text-[1.5rem] font-medium mb-6 leading-tight'>
              {slides[current].subtitle}
            </h3>
            <button className='cursor-pointer bg-black text-white px-8 py-4 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue transition-all w-fit group uppercase tracking-widest'>
              <span>Daha fazla bilgi</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>

          {/* PAGINATION & CIRCULAR TIMER */}
          <div className='absolute bottom-6 right-6 flex items-center space-x-6 z-30'>
            <div className='relative flex items-center justify-center w-12 h-12'>
              <svg className='w-full h-full transform -rotate-90'>
                <circle cx='24' cy='24' r='22' stroke='currentColor' strokeWidth='2' fill='transparent' className='text-light-gray' />
                <circle
                  cx='24' cy='24' r='22' stroke='currentColor' strokeWidth='2' fill='transparent'
                  strokeDasharray='138.23' key={current}
                  style={{ strokeDashoffset: 138.23, animation: `countdown ${duration}ms linear forwards` }}
                  className='text-brand-hover-blue'
                />
              </svg>
              <span className='absolute text-[10px] font-medium text-black whitespace-nowrap tabular-nums'>
                {current + 1} / {slides.length}
              </span>
            </div>

            <div className='flex space-x-2'>
              <button onClick={prevSlide} className='cursor-pointer group w-[54px] h-[54px] rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all duration-300'>
                <ChevronLeft className='w-5 h-5 text-dark-gray group-hover:text-white transition-colors' />
              </button>
              <button onClick={nextSlide} className='cursor-pointer group w-[54px] h-[54px] rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all duration-300'>
                <ChevronRight className='w-5 h-5 text-dark-gray group-hover:text-white transition-colors' />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className='w-1/2 relative bg-sennheiser-gray'>
          {slides.map((slide, index) => (
            <Image 
              key={`lifestyle-${slide.id}`}
              src={slide.lifestyleImg}
              alt='Lifestyle'
              fill
              className={`object-cover transition-opacity duration-1000 absolute inset-0 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </main>

      {/* --- FEATURED PRODUCT SECTION --- */}
      <section className='flex h-[70vh] w-full overflow-hidden bg-white border-t border-light-gray'>
        <div className='w-1/2 relative bg-sennheiser-gray'>
          <Image src='/images/hero-slide/md421-kompakt-drum.avif' alt='Feature Lifestyle' fill className='object-cover' />
        </div>
        <div className='w-1/2 flex flex-col h-full bg-white relative px-6 pb-6'>
          <div className='h-[76px] w-full flex-shrink-0' />
          <div className='flex-1 flex items-center justify-center w-full min-h-0'> 
            <div className='relative w-full max-w-xl aspect-square'>
              <Image src='/images/hero-slide/md-421-kompakt-productImage.webp' alt='Feature Product' fill className='object-contain mix-blend-multiply' />
            </div>
          </div>
          <div className='w-full flex-shrink-0 pt-0 relative z-20'>
            <h3 className='text-[1.5rem] font-medium text-dark-gray mb-0 tracking-tight'>MD 421 Kompakt</h3>
            <h3 className='text-[1.5rem] font-medium mb-6 leading-tight'>Canlı ve kayıt uygulamaları için çok amaçlı dinamik kardioid mikrofon</h3>
            <button className='cursor-pointer bg-black text-white px-8 py-4 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue transition-all w-fit group uppercase tracking-widest'>
              <span>İncele</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>
        </div>
      </section>

      {/* --- AUDIO CATEGORIES SECTION --- */}
      <section className='w-full bg-white py-6 px-6 border-light-gray'>
        <div className='max-w-full mx-auto flex flex-col md:flex-row gap-5'>
          
          {/* LEFT SIDE: Hoverable Headlines */}
          <div className='w-full md:w-1/2 flex flex-col'>
            <div className='space-y-0 border-t border-light-gray'>
              {categories.map((cat, index) => (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(index)}
                  className={`group cursor-pointer border-x border-b border-light-gray py-5 transition-all duration-300 flex items-center justify-between px-4 ${
                    activeCategory === index ? 'bg-brand-hover-blue text-white' : 'bg-transparent text-black'
                  }`}
                >
                  <h3 className='text-[1.5rem] font-medium tracking-tight'>{cat.name}</h3>
                  <ArrowRight className={`w-6 h-6 text-white transition-all duration-300 ${
                    activeCategory === index ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`} />
                </div>
              ))}
            </div>

            <button className='cursor-pointer group mt-6 bg-black text-white px-8 py-4 rounded-full text-[0.65rem] font-medium w-fit flex items-center space-x-2 hover:bg-brand-hover-blue transition-colors uppercase tracking-widest'>
              <span>Tüm ürünleri görüntüle</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>

          {/* RIGHT SIDE: Dynamic Image Display */}
          <div className='w-full md:w-1/2 relative h-[600px] overflow-hidden bg-sennheiser-gray'>
            {categories.map((cat, index) => (
              <div
                key={`cat-img-${cat.id}`}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  activeCategory === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image src={cat.img} alt={cat.name} fill className='object-cover' />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes countdown {
          from { stroke-dashoffset: 138.23; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}