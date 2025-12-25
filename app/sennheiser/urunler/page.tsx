"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function SennheiserMK4Page() {
  const [currentImg, setCurrentImg] = useState(0);
  
  const productImages = [
    '/images/sennheiser/urunler/mk4/mk4-1.webp',
    '/images/sennheiser/urunler/mk4/mk4-2.avif'
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  return (
    <div className='min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-black selection:text-white'>
      <main className='flex w-full'>
        
        {/* LEFT PANEL: Fixed/Sticky Media */}
        <div className='w-1/2 bg-[#ececf0] relative'>
          <div className='sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden'> 
            <div 
              className='relative w-full h-full max-w-[500px] aspect-square flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
              {productImages.map((src, index) => (
                <div key={index} className='relative min-w-full h-full'>
                  <Image 
                    src={src}
                    alt={`MK 4 - View ${index + 1}`}
                    fill
                    className='object-contain mix-blend-multiply px-12'
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* NAVIGATION CONTROLS */}
            <div className='absolute bottom-10 right-10 flex items-center gap-4 z-30'>
              <div className='text-[14px] font-medium text-black tabular-nums'>
                {currentImg + 1} / {productImages.length}
              </div>
              <div className='flex gap-1'>
                <button 
                  onClick={prevImg} 
                  disabled={currentImg === 0} 
                  className='w-[44px] h-[44px] rounded-full bg-white/80 flex items-center justify-center transition-all hover:bg-white disabled:opacity-30 group'
                >
                  <svg width='16' height='16' viewBox='0 0 32 32' className='fill-black'><path d='M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z'></path></svg>
                </button>
                <button 
                  onClick={nextImg} 
                  disabled={currentImg === productImages.length - 1} 
                  className='w-[44px] h-[44px] rounded-full bg-white/80 flex items-center justify-center transition-all hover:bg-white disabled:opacity-30 group'
                >
                  <svg width='16' height='16' viewBox='0 0 32 32' className='fill-black'><path d='M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z'></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Scrollable Content */}
        <div className='w-1/2'>
          {/* First Viewport: Header and Pricing */}
          <div className='h-screen flex flex-col px-16 pt-20 justify-center'>
            <nav className='flex items-center gap-2 mb-8 text-[13px] text-[#666]'>
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'><path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path></svg>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span>Microphones</span>
              <span>/</span>
              <span className='font-bold text-black uppercase'>MK 4</span>
            </nav>

            <h1 className='text-[72px] font-bold leading-none tracking-tighter mb-4'>MK 4</h1>
            <p className='text-[15px] text-[#666] mb-8'>Article No. 504298</p>
            
            <div className='mb-10'>
              <div className='text-[36px] font-bold'>£339.00*</div>
              <div className='text-[12px] text-[#666]'>*incl. VAT</div>
              <div className='text-[14px] font-medium mt-4'>Delivery time: 3-5 days</div>
            </div>

            <div className='flex items-center gap-2'>
              <button className='bg-black text-white px-10 h-[50px] rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-[#037cc2] transition-colors'>
                Add to cart
              </button>
              <button className='w-[50px] h-[50px] rounded-full bg-[#f4f4f6] flex items-center justify-center hover:bg-gray-200 transition-colors'>
                <svg width='18' height='18' viewBox='0 0 20 20' fill='none'><path d='M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z' fill='#1a1a1a'></path></svg>
              </button>
            </div>
          </div>

          {/* Scrolled Content: Description */}
          <div className='px-16 pb-32'>
            <h2 className='text-[22px] font-bold leading-snug mb-8'>
              Professional quality cardioid condenser microphone for home, project, and professional studios. 
              A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
              Ideal for vocals and acoustic instruments.
            </h2>
            <div className='text-[17px] leading-relaxed text-[#555] space-y-6'>
              <p>
                The MK 4 is a large-diaphragm true condenser microphone for professional studio recordings. 
                Featuring fine resolution and outstanding sound quality, the MK 4 is easy to handle and 
                excellent value for money, making it an ideal choice for professional project studios and 
                home recordists.
              </p>
              <p>
                It features a 1 inch true condenser capsule based on the acoustics of the e 965 high-end vocal mic, 
                optimised for recording. Its transducer being manufactured in the same clean room as all high-end 
                Sennheiser condenser capsules.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}