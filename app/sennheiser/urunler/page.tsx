"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function SennheiserMK4Page() {
  const [currentImg, setCurrentImg] = useState(0);
  
  const productImages = [
    'https://www.sennheiser.com/cdn-cgi/image/width=1080,format=avif,quality=75/globalassets/digizuite/38564-en-mk_4_product_shot_cutout_solo.png.png',
    'https://www.sennheiser.com/cdn-cgi/image/width=1080,format=avif,quality=75/globalassets/digizuite/48198-en-spectera_base_station_product_shot_cutout_front.png'
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  return (
    <div className='min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-black selection:text-white'>
      
      <main className='flex w-full'>
        
        {/* LEFT PANEL: Sticky Media */}
        <div className='w-1/2 bg-[#f0f0f2] border-r border-gray-100 relative'>
          <div className='sticky top-0 h-screen flex flex-col pt-[69px]'>
            <div className='flex-1 flex items-center justify-center relative p-12 lg:p-24'> 
              <div className='relative w-full h-full max-w-[500px] aspect-square'>
                <Image 
                  src={productImages[currentImg]}
                  alt='MK 4'
                  fill
                  className='object-contain mix-blend-multiply'
                  priority
                />
              </div>

              {/* NAVIGATION */}
              <div className='absolute bottom-8 right-8 flex items-center gap-6 z-30'>
                <div className='text-[13px] font-bold text-black tabular-nums'>
                  {currentImg + 1} / {productImages.length}
                </div>
                
                <div className='flex gap-2'>
                    <button
                        onClick={prevImg}
                        disabled={currentImg === 0}
                        className='w-[54px] h-[54px] rounded-full bg-[var(--sennheiser-very-light-gray)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-brand-blue)] group cursor-pointer disabled:cursor-default disabled:pointer-events-none'
                    >
                        <svg
                        width='12'
                        height='12'
                        viewBox='0 0 32 32'
                        className='transition-colors duration-300 fill-[var(--sennheiser-dark-gray)] group-disabled:fill-[var(--sennheiser-disabled-gray)] group-hover:fill-white'
                        >
                        <path d='M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z'></path>
                        </svg>
                    </button>

                    <button
                        onClick={nextImg}
                        disabled={currentImg === productImages.length - 1}
                        className='w-[54px] h-[54px] rounded-full bg-[var(--sennheiser-very-light-gray)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-brand-blue)] group cursor-pointer disabled:cursor-default disabled:pointer-events-none'
                    >
                        <svg
                        width='12'
                        height='12'
                        viewBox='0 0 32 32'
                        className='transition-colors duration-300 fill-[var(--sennheiser-dark-gray)] group-disabled:fill-[var(--sennheiser-disabled-gray)] group-hover:fill-white'
                        >
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
          
          <div className='min-h-[calc(100vh-69px)] flex flex-col pt-[69px] px-[20px] pb-[20px]'>
            
            <nav aria-label='Breadcrumb navigation' className='flex items-center py-4 flex-wrap'>
              <button className='flex items-center group cursor-pointer'>
                <div className='text-[#1a1a1a] transition-colors group-hover:text-[#037cc2]'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'><path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path></svg>
                </div>
                <span className='mx-2.5 text-[#666666] text-[13px]'>/</span>
              </button>
              
              {['Products', 'Microphones'].map((item) => (
                <button key={item} className='flex items-center group cursor-pointer'>
                  <div className='text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666] transition-colors group-hover:text-black'>{item}</div>
                  <span className='mx-2.5 text-[#666666] text-[13px]'>/</span>
                </button>
              ))}
              
              <button className='flex items-center cursor-pointer'>
                <div className='text-[10px] font-bold uppercase tracking-[0.1em] text-black'>MK 4</div>
              </button>
            </nav>

            <div className='mt-auto'>
              <h1 className='text-[80px] leading-[0.85] font-bold mb-6 tracking-tighter'>MK 4</h1>
              <div className='text-[13px] text-[#666666] mb-12 font-medium uppercase tracking-wide'>Article No. 504298</div>
              
              <div className='mb-10'>
                <span className='text-[42px] font-bold tracking-tight'>£339.00*</span>
                <div className='text-[12px] text-[#666666] mt-1 font-medium'>*incl. VAT</div>
                <div className='text-[12px] text-[#666666] font-medium'>Delivery time: 3-5 days</div>
              </div>

              {/* Flex container with fixed gap of 6px per rules */}
              <div className='flex items-center gap-[6px]'>
                <button 
                  className='flex items-center justify-center rounded-[50rem] border border-transparent transition-[color,background-color,border] duration-200 ease-in-out bg-[#000000] text-[#ffffff] hover:bg-[#037cc2] active:bg-[#000000] active:border-[#35a0d8] disabled:bg-[#f4f4f6] disabled:text-[#adadad] uppercase'
                  style={{
                    width: '106px',
                    height: '54px',
                    paddingTop: '1rem',    // 1rem
                    paddingBottom: '0.9rem', // 0.9rem
                    paddingLeft: '0.9rem',   // 0.9rem
                    paddingRight: '0.9rem',  // 0.9rem
                    fontSize: '0.65rem',      // 0.65rem
                    fontWeight: '500',
                    lineHeight: '1.0769230769',
                  }}
                >
                  Add to cart
                </button>
                <button 
                  className='rounded-full bg-[#f6f6f6] border border-transparent flex items-center justify-center hover:bg-[#eeeeee] transition-all group'
                  style={{
                    width: '54px',
                    height: '54px'
                  }}
                >
                  <Star className='w-5 h-5 text-black transition-all' />
                </button>
              </div>
            </div>
          </div>

          <div className='px-[1rem] pb-[1rem] pt-12 border-t border-gray-50'>
            <div className='max-w-full'>
              <p className='text-[1rem] leading-[1.2] font-semibold text-black mb-10'>
                Professional quality cardioid condenser microphone for home, project, and professional studios. 
                A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
                Ideal for vocals and acoustic instruments.
              </p>
              <p className='text-[1rem] leading-[1.2] font-normal text-[#666666]'>
                The MK 4 is a large-diaphragm true condenser microphone for professional studio recordings. 
                Featuring fine resolution and outstanding sound quality, the MK 4 is easy to handle and 
                excellent value for money, making it an ideal choice for professional project studios and 
                home recordists.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}