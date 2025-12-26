"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// components
import ActionButton from '@/components/ui/ActionButton';
import NavArrow from '@/components/ui/NavArrow';
import PaginationCounter from '@/components/ui/PaginationCounter';

export default function SennheiserMK4Page() {
  const [currentImg, setCurrentImg] = useState(0);
  
  const productImages = [
    '/images/sennheiser/urunler/mk4/mk4-1.webp',
    '/images/sennheiser/urunler/mk4/mk4-2.avif'
  ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  const articleNo = '504298';

  return (
    <div className='min-h-screen bg-white text-black font-sennheiser selection:bg-black selection:text-white'>
      <main className='flex w-full'>
        
        {/* left panel: sticky media area */}
        <div className='w-1/2 bg-light-gray relative border-r border-gray-100'>
          <div className='sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden'> 
            <div 
              className='relative w-full h-full max-w-[500px] aspect-square flex transition-transform duration-300 ease-in-out'
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

            {/* gallery navigation using reusable components */}
            <div className='absolute bottom-4 right-4 flex items-center gap-[4px] z-30'>
              <PaginationCounter current={currentImg + 1} total={productImages.length} />

              <div className='flex gap-[4px]'>
                <NavArrow 
                  direction='prev' 
                  onClick={prevImg} 
                  disabled={currentImg === 0} 
                />
                <NavArrow 
                  direction='next' 
                  onClick={nextImg} 
                  disabled={currentImg === productImages.length - 1} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* right panel: scrollable content */}
        <div className='w-1/2'>
          <div className='h-screen flex flex-col px-[20px] pb-[20px] pt-20 justify-end'>
            <nav aria-label='Breadcrumb navigation' className='flex items-center gap-1 mb-[1rem] text-[13px] text-dark-gray font-normal'>
                <Link href='/sennheiser' className='group flex items-center justify-center cursor-pointer h-fit'>
                  <svg 
                      width='14' 
                      height='14' 
                      fill='none' 
                      viewBox='0 0 24 24' 
                      className='text-gray-on-light transition-colors duration-200 group-hover:text-brand-hover-blue -translate-y-[2.4px]'
                  >
                      <path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path>
                  </svg>
                </Link>
                <span className='flex items-center'>/</span>
                <span className='antialiased subpixel-antialiased text-[14px] text-grey-on-light hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>Ürünler</span>
                <span className='flex items-center'>/</span>
                <span className='antialiased subpixel-antialiased text-[14px] text-grey-on-light hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>Mikrofonlar</span>
                <span className='flex items-center'>/</span>
                <span className='antialiased subpixel-antialiased text-[14px] text-dark-grey hover:text-brand-hover-blue cursor-pointer text-black'>MK 4</span>
            </nav>

            <h1 className='antialiased subpixel-antialiased text-[2.5rem] leading-[0.85] font-medium mb-[1rem] tracking-tighter'>MK 4</h1>
            <div className='antialiased subpixel-antialiased text-[1rem] text-dark-gray mb-[1rem] font-normal flex gap-1'>
                <span>Article No.</span>
                <span className='tabular-nums'>{articleNo}</span>
            </div>
            
            <div className='mb-[20px] flex flex-col'>
                {/* price section */}
                <span className='antialiased subpixel-antialiased text-[32px] leading-tight font-medium tracking-tight'>
                £339.00
                </span>

                {/* vat text */}
                <div className='antialiased subpixel-antialiased text-[13px] text-dark-gray -mt-1 font-normal'>
                *incl. VAT
                </div>

                {/* delivery info */}
                <div className='antialiased subpixel-antialiased text-[1rem] text-black font-normal mt-[0.8rem]'>
                Delivery time: 3-5 days
                </div>
            </div>

            <div className='flex items-center gap-[6px]'>
              <ActionButton 
                text='Sepete ekle' 
                className='w-[140px] h-[54px] justify-center' 
                onClick={() => console.log('added to cart')}
              />
              
              <button className='w-[54px] h-[54px] rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-light-gray transition-all group'>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z" fill="currentColor" className="text-dark-gray"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className='px-6 py-6 font-medium'>
            <div className='max-w-full'>
              <p className='text-[1rem] leading-[1.2] text-black mb-[1rem]'>
                Professional quality cardioid condenser microphone for home, project, and professional studios. 
                A 1 inch true condenser capsule produces powerful warm sound. High sensitivity. 
                Ideal for vocals and acoustic instruments.
              </p>
              <div className='text-[1rem] leading-[1.2] font-normal text-dark-gray mb-[1rem]'>
                <p className='mb-4'>
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