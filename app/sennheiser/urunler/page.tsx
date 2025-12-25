"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
        
        {/* LEFT PANEL: Sticky Media */}
        <div className='w-1/2 bg-[var(--sennheiser-light-gray)] border-r border-gray-100 relative'>
          <div className='sticky top-0 h-screen flex flex-col pt-[69px]'>
            <div className='flex-1 flex items-center justify-center relative p-12 lg:p-24 overflow-hidden'> 
              <div 
                className='relative w-full h-full max-w-[700px] aspect-square flex transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                {productImages.map((src, index) => (
                  <div key={index} className='relative min-w-full h-full'>
                    <Image 
                      src={src}
                      alt={`MK 4 - View ${index + 1}`}
                      fill
                      className='object-contain mix-blend-multiply'
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              <div className='absolute bottom-8 right-8 flex items-center gap-6 z-30'>
                <div className='text-[13px] font-bold text-black tabular-nums'>
                  {currentImg + 1} / {productImages.length}
                </div>
                <div className='flex gap-2'>
                    <button onClick={prevImg} disabled={currentImg === 0} className='w-[54px] h-[54px] rounded-full bg-[var(--sennheiser-very-light-gray)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-brand-blue)] group disabled:opacity-50'>
                        <svg width='12' height='12' viewBox='0 0 32 32' className='transition-colors duration-300 fill-[var(--sennheiser-dark-gray)] group-disabled:fill-[var(--sennheiser-disabled-gray)] group-hover:fill-white'>
                        <path d='M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z'></path>
                        </svg>
                    </button>
                    <button onClick={nextImg} disabled={currentImg === productImages.length - 1} className='w-[54px] h-[54px] rounded-full bg-[var(--sennheiser-very-light-gray)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-brand-blue)] group disabled:opacity-50'>
                        <svg width='12' height='12' viewBox='0 0 32 32' className='transition-colors duration-300 fill-[var(--sennheiser-dark-gray)] group-disabled:fill-[var(--sennheiser-disabled-gray)] group-hover:fill-white'>
                        <path d='M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z'></path>
                        </svg>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Content Area */}
        <div className='w-1/2 flex flex-col'>
          <div className='flex flex-col pt-[69px] px-[40px]'>
            
            {/* TOP HEADER SECTION */}
            <div className='min-h-[calc(100vh-250px)] flex flex-col justify-between pb-12'>
              <nav aria-label='Breadcrumb navigation' className='flex items-center py-4 flex-wrap'>
                <button className='flex items-center group cursor-pointer'>
                  <div className='text-[#1a1a1a] transition-colors group-hover:text-[#037cc2]'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'><path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path></svg>
                  </div>
                  <span className='mx-2.5 text-[#666666] text-[13px]'>/</span>
                </button>
                {['Products', 'Microphones'].map((item) => (
                  <button key={item} className='flex items-center group cursor-pointer'>
                    <div className='text-[13px] text-[#666666] transition-colors group-hover:text-black'>{item}</div>
                    <span className='mx-2.5 text-[#666666] text-[13px]'>/</span>
                  </button>
                ))}
                <div className='text-[13px] font-bold text-black'>MK 4</div>
              </nav>

              <div>
                <h1 className='text-[80px] leading-[0.85] font-bold mb-4 tracking-tighter'>MK 4</h1>
                <div className='text-[14px] text-[#666666] mb-10'><span className='font-normal'>Article No.</span> 504298</div>
                
                <div className='mb-10'>
                  <span className='text-[42px] font-bold tracking-tight'>£339.00*</span>
                  <div className='text-[12px] text-[#666666] mt-1'>*incl. VAT</div>
                  <div className='text-[12px] text-[#666666]'>Delivery time: 3-5 days</div>
                </div>

                <div className='flex items-center gap-[6px]'>
                  <button className='flex items-center justify-center rounded-full bg-black text-white hover:bg-[#037cc2] transition-colors uppercase text-[11px] font-bold tracking-wider w-[140px] h-[54px]'>
                    Add to cart
                  </button>
                  <button className='w-[54px] h-[54px] rounded-full bg-[var(--sennheiser-very-light-gray)] flex items-center justify-center hover:bg-gray-200 transition-all'>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z" fill="#545252"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER SECTION (Description) */}
            <div className='pb-20 border-t border-gray-100 pt-10'>
              <p className='text-[20px] leading-[1.3] font-bold text-black mb-8'>
                Professional quality cardioid condenser microphone for home, project, and professional studios. 
                A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
                Ideal for vocals and acoustic instruments.
              </p>
              <div className='text-[16px] leading-[1.6] text-[#666666] font-normal'>
                The MK 4 is a large-diaphragm true condenser microphone for professional studio recordings. 
                Featuring fine resolution and outstanding sound quality, the MK 4 is easy to handle and 
                excellent value for money, making it an ideal choice for professional project studios and 
                home recordists. It features a 1 inch true condenser capsule based on the acoustics of the 
                e 965 high-end vocal mic, optimised for recording. Its transducer being manufactured in the 
                same clean room as all high-end Sennheiser condenser capsules.
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}