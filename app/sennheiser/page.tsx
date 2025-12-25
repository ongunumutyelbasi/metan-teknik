"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Spectera',
    subtitle: 'Dünyanın ilk geniş bant ve çift yönlü kablosuz ekosistemi!',
    productImg: '/images/hero-slide/spectera-unit.avif',
    lifestyleImg: '/images/hero-slide/Spectera_Product_Shot_In_Use_39_.webp',
    alt: 'spectera system',
    link: '#'
  },
  {
    id: 2,
    title: 'TeamConnect Bars',
    subtitle: 'Sınıfının en fazla özelliğe sahip çok işlevli işitsel ve görsel konferans cihazları',
    productImg: '/images/hero-slide/teamconnect-bar.avif',
    lifestyleImg: '/images/hero-slide/teamconnect-meeting.webp',
    alt: 'teamconnect bars',
    link: '#'
  },
  {
    id: 3,
    title: 'e904',
    subtitle: 'Bu ayın mikrofonu',
    productImg: '/images/hero-slide/e904.webp',
    lifestyleImg: '/images/hero-slide/e904-drum.webp',
    alt: 'e904',
    link: '#'
  },
  {
    id: 4,
    title: 'Yeni',
    subtitle: 'Intermodülasyonsuz (girişimsiz) rahat bir frekans dağılımından daha fazlası',
    productImg: '/images/hero-slide/holidaysavings.avif',
    lifestyleImg: '/images/hero-slide/banner-holidaysavings.webp',
    alt: 'hd 660s2',
    link: '#'
  }
];

const categories = [
  { id: 1, name: 'kablosuz sistemler', img: '/images/homePage-categories/wireless-systems.avif' },
  { id: 2, name: 'aksesuarlar', img: '/images/homePage-categories/accessories.avif' },
  { id: 3, name: 'mikrofonlar', img: '/images/homePage-categories/microphones.avif' },
  { id: 4, name: 'toplantı ve konferans sistemleri', img: '/images/homePage-categories/meeting-systems.avif' },
  { id: 5, name: 'kulaklıklar', img: '/images/homePage-categories/headphones.avif' },
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

      {/* --- hero split section --- */}
      <main data-nav-color='dark' className='flex h-[90vh] w-full overflow-hidden'>
        
        {/* left panel */}
        <div className='w-1/2 flex flex-col h-full bg-white relative px-6 pb-6'>
          <div className='h-[76px] w-full flex-shrink-0' />

          {/* image section */}
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

          {/* text & button section */}
          <div className='w-full flex-shrink-0 pt-0 relative z-20'>
            <h3 className='text-[1.5rem] font-medium text-dark-gray mb-0 tracking-tight'>
              {slides[current].title}
            </h3>
            <h3 className='text-[1.5rem] font-medium mb-6 leading-tight'>
              {slides[current].subtitle}
            </h3>
            <button className='cursor-pointer bg-black text-white px-6 py-3 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue transition-all w-fit group tracking-tight'>
              <span>daha fazla bilgi</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>

          {/* navigation & timer area - perfectly aligned bottom and right margins */}
          <div className='absolute bottom-[30px] right-[30px] flex items-center space-x-4 z-30'>
            {/* circular timer & pagination */}
            <div className='relative flex items-center justify-center w-[54px] h-[54px]'>
              <svg className='w-full h-full transform -rotate-90' viewBox='0 0 54 54'>
                <circle cx='27' cy='27' r='25' stroke='currentColor' strokeWidth='2' fill='transparent' className='text-light-gray' />
                <circle
                  cx='27' cy='27' r='25' stroke='currentColor' strokeWidth='2' fill='transparent'
                  strokeDasharray='157.08' key={current}
                  style={{ strokeDashoffset: 157.08, animation: `countdown ${duration}ms linear forwards` }}
                  className='text-brand-hover-blue'
                />
              </svg>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-[0.65rem] font-medium text-black whitespace-nowrap tabular-nums leading-none'>
                  {current + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* arrow buttons */}
            <div className='flex space-x-2 items-center'>
              <button onClick={prevSlide} className='cursor-pointer group w-[54px] h-[54px] rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all duration-300'>
                <ChevronLeft className='w-5 h-5 text-dark-gray group-hover:text-white transition-colors' />
              </button>
              <button onClick={nextSlide} className='cursor-pointer group w-[54px] h-[54px] rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all duration-300'>
                <ChevronRight className='w-5 h-5 text-dark-gray group-hover:text-white transition-colors' />
              </button>
            </div>
          </div>
        </div>

        {/* right panel */}
        <div className='w-1/2 relative bg-sennheiser-gray'>
          {slides.map((slide, index) => (
            <Image 
              key={`lifestyle-${slide.id}`}
              src={slide.lifestyleImg}
              alt='lifestyle'
              fill
              className={`object-cover transition-opacity duration-1000 absolute inset-0 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </main>

      {/* --- featured product section --- */}
      <section className='flex h-[70vh] w-full overflow-hidden bg-white border-t border-light-gray'>
        <div className='w-1/2 relative bg-sennheiser-gray'>
          <Image src='/images/hero-slide/md421-kompakt-drum.avif' alt='feature lifestyle' fill className='object-cover' />
        </div>
        <div className='w-1/2 flex flex-col h-full bg-white relative px-6 pb-6'>
          <div className='h-[76px] w-full flex-shrink-0' />
          <div className='flex-1 flex items-center justify-center w-full min-h-0'> 
            <div className='relative w-full max-w-xl aspect-square'>
              <Image src='/images/hero-slide/md-421-kompakt-productImage.webp' alt='feature product' fill className='object-contain mix-blend-multiply' />
            </div>
          </div>
          <div className='w-full flex-shrink-0 pt-0 relative z-20'>
            <h3 className='text-[1.5rem] font-medium text-dark-gray mb-0 tracking-tight'>md 421 kompakt</h3>
            <h3 className='text-[1.5rem] font-medium mb-6 leading-tight'>canlı ve kayıt uygulamaları için çok amaçlı dinamik kardioid mikrofon</h3>
            <button className='cursor-pointer bg-black text-white px-6 py-3 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue transition-all w-fit group tracking-tight'>
              <span>incele</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>
        </div>
      </section>

      {/* --- audio categories section --- */}
      <section className='w-full bg-white py-6 px-6 border-light-gray'>
        <div className='max-w-full mx-auto flex flex-col md:flex-row gap-5'>
          
          {/* left side: hoverable headlines */}
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

            <button className='cursor-pointer group mt-6 bg-black text-white px-6 py-3 rounded-full text-[0.65rem] font-medium w-fit flex items-center space-x-2 hover:bg-brand-hover-blue transition-colors tracking-tight'>
              <span>tüm ürünleri görüntüle</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>

          {/* right side: dynamic image display */}
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
          from { stroke-dashoffset: 157.08; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}