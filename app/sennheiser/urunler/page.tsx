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
    /* text-[#000000] matches --pure-black */
    <div className='min-h-screen bg-white text-[#000000] font-sennheiser selection:bg-black selection:text-white'>
      <main className='flex w-full'>
        
        {/* LEFT PANEL: Sticky Media Area */}
        {/* bg-[#ececf0] matches --light-grey */}
        <div className='w-1/2 bg-[#ececf0] relative border-r border-gray-100'>
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

            {/* GALLERY NAVIGATION: Synced with Sennheiser Root Variables */}
            <div className='absolute bottom-6 right-6 flex items-center gap-6 z-30'>
              <div 
                className='text-[13px] font-medium text-black tabular-nums'
                aria-live='polite'
                role='status'
              >
                <div>{currentImg + 1} / {productImages.length}</div>
              </div>

              <div className='flex gap-2'>
                <button
                  type='button'
                  aria-label='Previous slide'
                  onClick={prevImg}
                  disabled={currentImg === 0}
                  /* bg-[#f4f4f6] matches --very-light-grey | hover:bg-[#0096d6] matches --sennheiser-blue */
                  className='w-[54px] h-[54px] rounded-full bg-[#f4f4f6] flex items-center justify-center transition-all duration-300 hover:enabled:bg-[#0096d6] group cursor-pointer disabled:cursor-default'
                >
                  <svg width='12' height='12' viewBox='0 0 32 32' className='transition-colors duration-300 fill-[#545252] group-disabled:fill-[#adadad] group-hover:enabled:fill-white'>
                    <path d='M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z'></path>
                  </svg>
                </button>

                <button
                  type='button'
                  aria-label='Next slide'
                  onClick={nextImg}
                  disabled={currentImg === productImages.length - 1}
                  className='w-[54px] h-[54px] rounded-full bg-[#f4f4f6] flex items-center justify-center transition-all duration-300 hover:enabled:bg-[#0096d6] group cursor-pointer disabled:cursor-default'
                >
                  <svg width='12' height='12' viewBox='0 0 32 32' className='transition-colors duration-300 fill-[#545252] group-disabled:fill-[#adadad] group-hover:enabled:fill-white'>
                    <path d='M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Scrollable Content */}
        <div className='w-1/2'>
          {/* Hero Section: Updated with px-6 and pb-6 */}
          <div className='h-screen flex flex-col px-6 pb-6 pt-20 justify-end'>
            <nav aria-label='Breadcrumb navigation' className='flex items-center gap-2 mb-8 text-[13px] text-[#545252] font-normal'>
              <button className='group flex items-center cursor-pointer'>
                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24' className='transition-colors duration-200 group-hover:text-[#0096d6]'>
                   <path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path>
                </svg>
              </button>
              <span>/</span>
              <span className='hover:text-[#0096d6] cursor-pointer transition-colors duration-200'>Products</span>
              <span>/</span>
              <span className='hover:text-[#0096d6] cursor-pointer transition-colors duration-200'>Microphones</span>
              <span>/</span>
              <span className='font-medium text-black'>MK 4</span>
            </nav>

            <h1 className='text-[80px] leading-[0.85] font-medium mb-6 tracking-tighter'>MK 4</h1>
            <div className='text-[14px] text-[#545252] mb-12 font-medium tracking-wide'>Article No. 504298</div>
            
            <div className='mb-10'>
              <span className='text-[42px] font-medium tracking-tight'>£339.00*</span>
              <div className='text-[12px] text-[#545252] mt-1 font-medium'>*incl. VAT</div>
              <div className='text-[14px] text-black font-medium mt-4'>Delivery time: 3-5 days</div>
            </div>

            <div className='flex items-center gap-[6px]'>
              <button className='flex items-center justify-center rounded-full bg-black text-white hover:bg-[#0096d6] transition-colors text-[0.65rem] font-medium tracking-wider w-[140px] h-[54px]'>
                Add to cart
              </button>
              <button className='w-[54px] h-[54px] rounded-full bg-[#f4f4f6] flex items-center justify-center hover:bg-[#ececf0] transition-all group'>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z" fill="#545252"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Detailed Description Section: Updated with px-6 and py-6 and line-height 1.75 */}
          <div className='px-6 py-6 font-medium'>
            <div className='max-w-full'>
              <p className='text-[1rem] leading-[1.2] text-black mb-[1rem]'>
                Professional quality cardioid condenser microphone for home, project, and professional studios. 
                A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
                Ideal for vocals and acoustic instruments.
              </p>
              <div className='text-[17px] leading-[1.2] text-normal text-[#545252] mb-[1rem]'>
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
        </div>
      </main>
    </div>
  );
}