"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';

// components
import ActionButton from '@/components/ui/ActionButton';
import NavArrow from '@/components/ui/NavArrow';
import PaginationCounter from '@/components/ui/PaginationCounter';

export default function SennheiserMK4Page() {
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const targetPosition = elementRect - bodyRect - offset;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;

        // adjust this number (in milliseconds) to control speed
        const duration = 1200; 
        let start: number | null = null;

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        // 'quadratic' easing function for a smooth start and stop
        const ease = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const [currentImg, setCurrentImg] = useState(0);
  
    const productNav = [
        { label: 'Özellikler', id: 'ozellikler' },
        { label: 'Öne Çıkan Özellikler', id: 'one-cikan-ozellikler' },
        { label: 'Teknik Özellikler', id: 'teknik-ozellikler' },
        { label: 'Kutu İçeriği', id: 'kutu-icerigi' },
        { label: 'Satın Alma Seçenekleri', id: 'satin-alma-secenekleri' },
        { label: 'İlgili Ürünler', id: 'ilgili-urunler' },
    ];

    const productImages = [
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-1.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-2.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-3.webp',
    ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  const articleNo = '700587';
  const productName = 'MD 421 KOMPAKT';
  const productPrice = '229.00';

  return (
    <div className='min-h-screen bg-white text-black font-sennheiser selection:bg-black selection:text-white'>
        <main className='flex w-full'>
        
        {/* left panel: sticky media area */}
        <div className='w-1/2 bg-light-gray relative'>
            <div className='sticky top-0 h-[calc(100vh-63px)] flex flex-col items-center justify-center overflow-hidden'> 
            <div 
                className='relative w-full h-full max-w-[675px] aspect-square flex transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
                {productImages.map((src, index) => (
                <div key={index} className='relative min-w-full h-full'>
                    <Image 
                    src={src}
                    alt={`MK 4 - View ${index + 1}`}
                    fill
                    className='object-contain mix-blend-multiply pt-12 px-12'
                    priority={index === 0}
                    />
                </div>
                ))}
            </div>

            {/* gallery navigation using reusable components */}
            <div className='absolute bottom-4 right-4 font-sennheiser flex items-center gap-[4px] z-30'>
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
                <div className='h-[calc(100vh-63px)] flex flex-col px-[20px] pb-[20px] pt-20 justify-end'>
                    <nav aria-label='Breadcrumb navigation' className='flex items-center gap-1 mb-[1rem] text-[13px] text-dark-gray font-normal'>
                        <Link href='/sennheiser' className='group flex items-center justify-center cursor-pointer h-fit'>
                            <svg 
                                width='16' 
                                height='16' 
                                fill='none' 
                                viewBox='0 0 24 24' 
                                className='text-breadcrumbs-grey transition-colors duration-300 group-hover:text-brand-hover-blue -translate-y-[2.4px]'
                            >
                                <path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path>
                            </svg>
                        </Link>
                        <span className='flex items-center'>/</span>
                        <span className='antialiased subpixel-antialiased text-[14px] text-breadcrumbs-grey hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>Ürünler</span>
                        <span className='flex items-center'>/</span>
                        <span className='antialiased subpixel-antialiased text-[14px] text-breadcrumbs-grey hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>Mikrofonlar</span>
                        <span className='flex items-center'>/</span>
                        <span className='antialiased subpixel-antialiased text-[14px] text-dark-grey hover:text-brand-hover-blue cursor-pointer text-black'>{productName}</span>
                    </nav>

                    {/* <h1 className='antialiased subpixel-antialiased text-[2.5rem] leading-[0.85] font-medium mb-[1rem] tracking-tighter'>MK 4</h1> */}
                    <div className='antialiased subpixel-antialiased text-[2.5rem] leading-[0.85] font-medium mb-[1rem] tracking-regular flex gap-1'>
                        <span>{productName}</span>
                    </div>
                    <div className='antialiased subpixel-antialiased text-[1rem] text-dark-gray mb-[0.75rem] font-normal flex gap-1'>
                        <span>Ürün Kodu:</span>
                        <span className='tabular-nums'>{articleNo}</span>
                    </div>
                
                    <div className='mb-[20px] flex flex-col'>
                        {/* price section */}
                        <span className='antialiased subpixel-antialiased text-[32px] leading-tight font-medium tracking-regular'>
                        £{productPrice}
                        </span>

                        {/* vat text */}
                        <div className='antialiased subpixel-antialiased text-[13px] text-dark-gray -mt-1 font-normal'>
                        *incl. VAT
                        </div>

                        {/* delivery info */}
                        <div className='antialiased subpixel-antialiased text-[1rem] text-black font-normal mt-[0.8rem]'>
                        Teslimat süresi: 3-5 gün
                        </div>
                    </div>

                    <div className='flex items-center gap-[6px]'>
                        <ActionButton 
                        text='Satın al' 
                        className='w-[140px] h-[54px] justify-center' 
                        onClick={() => scrollToSection('satin-alma-secenekleri')}
                        />
                        
                        <button className='w-[54px] h-[54px] cursor-pointer rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all group duration-300'>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z" fill="currentColor" className="text-dark-gray group-hover:fill-white group-transition-transform duration-300"></path>
                        </svg>
                        </button>
                    </div>
                </div>

                <div className='px-[16px] pt-[50px] py-[16px] font-normal'>
                    <div className='max-w-full'>
                        <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                        Aklınıza gelebilecek her türlü proje. Mikrofonunuz bu.
                        </p>
                        <div className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-normal text-dark-gray'>
                            <p className='mb-0'>
                                Eğer müzik dinliyorsanız, MD 421'in, yani Sennheiser'in son 50 yıldır sayısız ödüllü performans ve prodüksiyonda kullanılan efsanevi mikrofonunun sesini duymuşsunuzdur. Bu efsanenin devamı olan MD 421 Kompakt, orijinal MD 421 ve MD 421-II'yle aynı performansı sağlamakla kalmıyor, baştan tasarlanan mikrofon mandalının da yardımıyla kullanım alanlarını da genişletiyor. Aynen orijinalleri gibi, MD 421 Kompakt da kardioid kutupsal deseni ve olağanüstü dinamik aralığıyla, canlı performans veya stüdyo kayıtlarınızda karşınıza çıkabilecek her türlü senaryonun üstesinden gelerek dupduru bir ses sağlıyor. (Eski ürün numarası 700589)
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        </main>

        <div className='sticky top-[76px] bottom-0 z-40 border-light-gray'>
            <SubNavigationRow items={productNav} />
        </div>

        <section className='w-full py-20 bg-white'>
            <div className='max-w-full mx-auto px-0 md:px-0'>
                {/* section headline */}
                <div id='ozellikler' className='mb-[20px] border-b border-light-gray'>
                    <h2 className='px-[20px] antialiased subpixel-antialiased text-[2.5rem] md:text-[2.5rem] font-medium leading-[1.5] tracking-tight antialiased'>
                        Özellikler
                    </h2>
                </div>

                {/* features list */}
                <ul className='px-[20px] grid grid-cols-1 md:grid-cols-1 gap-y-3'>
                    {[
                    'Efsanevi MD 421 performansı, zorlu ortamlarda olağanüstü yüksek ses basıncı seviyelerini kolayca karşılar',
                    'İnanılmaz derecede net ses üretimi sunarak, tertemiz sesi olağanüstü doğruluk ve ayrıntıyla yakalar',
                    'Kompakt ve çok amaçlı boyutu, her türlü kayıt ve canlı ses ortamı için gelişmiş çok yönlülük sunar',
                    'Yeniden tasarlanan montaj klipsi, her türlü uygulamada kolay ve sorunsuz kurulum için mikrofona güvenli bir şekilde sabitlenmiştir',
                    'Turne şartlarının ve yoğun stüdyo kullanımının zorluklarına dayanacak ve tutarlı performans sağlayacak şekilde sağlam Alman mühendisliği ile üretilmiştir',
                    'Etkili geri besleme (feedback) reddi, kristal netliğinde ses üretimi için odak noktasının kaynak seste kalmasına yardımcı olur',
                    'Dayanıklılık ve uzun ömür için paslanmaz çelik sepetli sağlam bir gövdeye ve altın kaplama XLR konektörlere sahiptir',
                    'İsteğe bağlı MZH Davul Kelepçesi, davul mikrofonlaması için hatasız bir mekanizma oluşturmak üzere MD 421 Kompakt montaj klipsine güvenli bir şekilde vidalanır',
                    'Yenilikçi dahili bas tüpü, netlikten ödün vermeden zengin ve dolgun sesi güçlendirerek doğru ve genişletilmiş alt frekans tepkisi sağlar',
                    '30 Hz–17 kHz aralığındaki geniş frekans tepki aralığı, hem pes hem de tiz seslerin aslına sadık kalarak yeniden üretilmesine olanak tanır',
                    'Koruyucu iç şasi gövdesi, toz ve neme maruz kalmayı azaltarak performansı ve uzun ömrü korur'
                    ].map((feature, index) => (
                        <li key={index} className='flex items-start gap-3 text-[1rem] font-normal leading-[1.1] text-black antialiased subpixel-antialiased'>
                            {/* fixed-width container for the svg to ensure alignment */}
                            <span className='flex-shrink-0 mt-[6px]'>
                                <svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <circle cx='3' cy='3' r='3' fill='currentColor' />
                                </svg>
                            </span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        <div id="one-cikan-ozellikler" className="min-h-screen"> {/* Content for Top Specs */} </div>
        <div id="teknik-ozellikler" className="min-h-screen"> {/* Content for Features */} </div>
        <div id="kutu-icerigi" className="min-h-screen"> {/* Content for Top Specs */} </div>
        <div id="satin-alma-secenekleri" className="min-h-screen"> {/* Content for Features */} </div>
        <div id="ilgili-urunler" className="min-h-screen"> {/* Content for Top Specs */} </div>

    </div>
  );
}