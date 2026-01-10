"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Store, Mail, SquareArrowOutUpRight } from 'lucide-react';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';

// components
import ActionButton from '@/components/ui/ActionButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import NavArrow from '@/components/ui/NavArrow';
import PaginationCounter from '@/components/ui/PaginationCounter';

export default function SennheiserMK4Page() {
    
    const [isVariantOpen, setIsVariantOpen] = useState(false);
    const [openAccordionId, setOpenAccordionId] = useState<string | null>('teknik-ozellikler');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const targetPosition = elementRect - bodyRect - offset;

        // This matches your SubNavigationRow exactly
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    const [currentImg, setCurrentImg] = useState(0);
  
    const productNav = [
        { label: 'Özellikler', id: 'ozellikler' },
        { label: 'Öne Çıkan Özellikler', id: 'one-cikan-ozellikler' },
        { label: 'Teknik Özellikler', id: 'teknik-ozellikler' },
        { label: 'Kutu İçeriği', id: 'kutu-icerigi' },
        { label: 'İlgili Ürünler', id: 'ilgili-urunler' },
        { label: 'İndirmeler', id: 'indirmeler' },
        { label: 'Satın Alma Seçenekleri', id: 'satin-alma-secenekleri' },
    ];

    const productImages = [
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-1.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-2.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-3.webp',
    ];

    const productVariants = [
    { name: 'MD 421 KOMPAKT', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt' },
    { name: 'MD 421 KOMPAKT + DRUM CLAMP', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt-drum-clamp' },
    ];

    const kutuIcerigiData = [
        { item: 'MD 421 KOMPAKT Studio mikrofon', quant: '1' },
        { item: 'Taşıma kesesi', quant: '1' },
        { item: 'Hızlı kılavuz', quant: '1' },
        { item: 'Güvenlik kılavuzu', quant: '1' },
    ];

    const ilgiliUrunlerData = [
        { item: 'MZW 421-A', href: '/images/sennheiser/urunler/mzw-421-a/mzw-421-a.avif' },
        { item: 'MZH DRUMS', href: '/images/sennheiser/urunler/mzh-drums/mzh-drums.avif' },
    ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  const articleNo = '700587';
  const productName = 'MD 421 KOMPAKT';
  const productPrice = '229.00';

    const handleInteraction = (id: string, forceOpen: boolean = false) => {
        const isCurrentlyOpen = openAccordionId === id;

        if (forceOpen) {
            setOpenAccordionId(id);
            // Small delay to let the DOM "settle"
            setTimeout(() => scrollToSection(id), 50);
        } else if (isCurrentlyOpen) {
            setOpenAccordionId(null);
        } else {
            const needsToWait = openAccordionId !== null;
            setOpenAccordionId(id);

            // Increase the switch delay slightly (350ms) to ensure 
            // the closing accordion is 90% done before we measure the new one.
            const delay = needsToWait ? 350 : 50;
            
            setTimeout(() => {
                scrollToSection(id);
            }, delay);
        }
    };

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
                    <nav aria-label='Breadcrumb navigation' className='antialiased subpixel-antialiased flex items-center gap-1 mb-[1rem] text-[13px] text-dark-gray font-normal'>
                        <Link href='/sennheiser' className='antialiased subpixel-antialiased group flex items-center justify-center cursor-pointer h-fit'>
                            <svg width='16' height='16' fill='none' viewBox='0 0 24 24' className='text-breadcrumbs-grey transition-colors duration-300 group-hover:text-brand-hover-blue -translate-y-[2.4px]'>
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
                
                    <div className='mb-[10px] flex flex-col'>
                        {/* ÜRÜN FİYATI */}
                        {/*
                        <span className='antialiased subpixel-antialiased text-[32px] leading-tight font-medium tracking-regular'>
                        £{productPrice}
                        </span>
                        */}

                        {/* INCL. VAT */}
                        {/*
                        <div className='antialiased subpixel-antialiased text-[13px] text-dark-gray -mt-1 font-normal'>
                        *incl. VAT
                        </div>
                        */}

                        {/* TESLİMAT SÜRESİ */}
                        {/*
                        <div className='antialiased subpixel-antialiased text-[1rem] text-black font-normal mt-[0.8rem]'>
                        Teslimat süresi: 3-5 gün
                        </div>
                        */}

                    </div>

                    <div className='flex items-center gap-[6px]'>
                        <ActionButton 
                        text='Satın al' 
                        className='w-[140px] h-[54px] justify-center' 
                        onClick={() => scrollToSection('satin-alma-secenekleri')}
                        />
                        
                        {/* Wishlist Button */}
                        {/*}
                        <button className='w-[54px] h-[54px] cursor-pointer rounded-full bg-sennheiser-gray flex items-center justify-center hover:bg-brand-hover-blue transition-all group duration-300'>
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M14.6874 15.9125L13.0374 10.8313L17.0687 8.09377L16.8749 7.50002H11.8749L10.3124 2.80627H9.6874L8.1249 7.50002H3.1249L2.93115 8.09377L6.9624 10.8313L5.3124 15.9125L5.8124 16.2875L9.9999 13.2688L14.1874 16.2875L14.6874 15.9125Z" fill="currentColor" className="text-dark-gray group-hover:fill-white group-transition-transform duration-300"></path>
                            </svg>
                        </button>
                        */}

                        <div className='relative'>
                            {/* 1. Backdrop Overlay: Only exists when menu is open */}
                            {isVariantOpen && (
                                <div 
                                    className='fixed inset-0 z-40 cursor-default' 
                                    onClick={() => setIsVariantOpen(false)}
                                />
                            )}

                            {/* 2. Drop-up Menu */}
                            {isVariantOpen && (
                                <div className='absolute bottom-full mb-2 left-0 w-full min-w-[200px] bg-white border border-light-gray rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300'>
                                    <div className='flex flex-col py-0'>
                                        {productVariants.map((variant) => {
                                            // Check if the current variant in the loop matches the page product
                                            const isActive = variant.name.toUpperCase() === productName.toUpperCase();

                                            return (
                                                <Link 
                                                    key={variant.href}
                                                    href={variant.href}
                                                    // prevent navigation if already on this page
                                                    onClick={(e) => isActive && e.preventDefault()}
                                                    className={`px-4 py-3 text-[13px] font-medium transition-colors duration-200 leading-[1.2] flex items-center justify-between ${
                                                        isActive 
                                                            ? `${false && 'bg-light-gray'} text-brand-hover-blue cursor-default pointer-events-none`
                                                            : 'text-black hover:bg-sennheiser-gray cursor-pointer'
                                                    }`}
                                                >
                                                    <span>{variant.name}</span>
                                                    {/* subtle dot indicator for the active variant */}
                                                    {isActive && (
                                                        <div className='w-1.5 h-1.5 rounded-full bg-brand-hover-blue' />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* 3. The Button */}
                            <SecondaryButton 
                                text='Varyant değiştir' 
                                Icon={ChevronDown}
                                className={`w-[140px] h-[54px] justify-center transition-all duration-300 z-50 relative
                                    ${isVariantOpen 
                                        ? '!bg-brand-hover-blue !text-white [&_svg]:rotate-180' 
                                        : 'hover:bg-brand-hover-blue hover:text-white'
                                    } 
                                    [&_svg]:group-hover:translate-x-0 [&_svg]:group-hover:translate-y-0`} 
                                onClick={() => setIsVariantOpen(!isVariantOpen)}
                            />
                        </div>

                    </div>
                </div>

                <div className='px-[16px] pt-[50px] py-[16px] font-normal'>
                    <div className='max-w-full'>
                        <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                        Aklınıza gelebilecek her türlü proje için mikrofonunuz bu.
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

        <section className='w-full pt-20 bg-white'>
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

        <section className='w-full pt-20 pb-20 bg-white'>
            <div className='max-w-full mx-auto px-0 md:px-0'>
                <div id="one-cikan-ozellikler" className="min-h-none">
                    <div className='px-[20px] flex items-center pb-3 gap-6 justify-between'>
                        <h2 className='antialiased subpixel-antialiased text-[2.5rem] md:text-[2.5rem] font-medium leading-[1.5] tracking-tight'>
                            Öne Çıkan Özellikler
                        </h2>
                        <SecondaryButton text='Devamını Oku' onClick={() => handleInteraction('teknik-ozellikler', true)} />
                    </div>

                    <ul className='w-full list-none p-0 m-0'>
                        <li className='w-full h-[65px] px-[20px] grid grid-cols-2 items-center border-t border-light-gray transition-colors duration-200 hover:bg-brand-hover-blue group cursor-default'>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-dark-gray group-hover:text-white transition-colors duration-200'>
                            Transformatör tipi
                            </span>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-black group-hover:text-white transition-colors duration-200'>
                            Dinamik
                            </span>
                        </li>

                        <li className='w-full h-[65px] px-[20px] grid grid-cols-2 items-center border-t border-light-gray transition-colors duration-200 hover:bg-brand-hover-blue group cursor-default'>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-dark-gray group-hover:text-white transition-colors duration-200'>
                            Mikrofon hassasiyeti (mV/Pa)
                            </span>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-black group-hover:text-white transition-colors duration-200'>
                            2mV +-2.5dB
                            </span>
                        </li>

                        <li className='w-full h-[65px] px-[20px] grid grid-cols-2 items-center border-t border-light-gray transition-colors duration-200 hover:bg-brand-hover-blue group cursor-default'>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-dark-gray group-hover:text-white transition-colors duration-200'>
                            Bağlantı
                            </span>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-black group-hover:text-white transition-colors duration-200'>
                            Kablolu
                            </span>
                        </li>

                        <li className='w-full h-[65px] px-[20px] grid grid-cols-2 items-center border-t border-light-gray transition-colors duration-200 hover:bg-brand-hover-blue group cursor-default'>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-dark-gray group-hover:text-white transition-colors duration-200'>
                            Konektör
                            </span>
                            <span className='antialiased subpixel-antialiased leading-none text-[1rem] font-medium text-black group-hover:text-white transition-colors duration-200'>
                            3-pin XLR
                            </span>
                        </li>
                    </ul>

                </div>
            </div> 
        </section>

        <div id="teknik-ozellikler" className="w-full scroll-mt-[50px]"> 
            <section className='w-full'>
                <div className='max-w-full mx-auto'>
                    
                    {/* 1. Accordion Header Control */}
                    <div 
                        onClick={() => handleInteraction('teknik-ozellikler')}
                        className='flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group'
                    >
                        <h2 className='antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black'>
                            Teknik Özellikler
                        </h2>
                        <div className={`flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full transition-all duration-100 ${
                            openAccordionId === 'teknik-ozellikler' ? 'bg-sennheiser-gray text-black' : 'bg-sennheiser-gray text-black'
                        }`}>
                            <svg viewBox='0 0 32 32' className={`w-[12px] h-[12px] fill-current transition-transform duration-500 ${
                                openAccordionId === 'teknik-ozellikler' ? 'rotate-180' : ''
                            }`} xmlns='http://www.w3.org/2000/svg'>
                                <path d="M0 11.419l1.958-1.958 14.058 14.058 14.058-14.058 1.958 1.958-16.014 16.017-16.017-16.017z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* 2. Expandable Content Area */}
                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                        openAccordionId === 'teknik-ozellikler' ? 'max-h-[5000px] pb-[40px] border-b border-light-gray' : 'max-h-0'
                    }`}>
                        <div className="flex flex-col mb-[20px] px-[20px]">
                    
                            {/* Lojistik */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Lojistik
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Garanti</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">2 yıl</span>
                                </li>
                            </ul>

                            {/* Ürün Özellikleri */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Ürün Özellikleri
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Multipack</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">Multipack değil</span>
                                </li>
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Açma/kapama düğmesi</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">Yok</span>
                                </li>
                            </ul>

                            {/* Ürün */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Ürün
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Transformatör tipi</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">Dinamik</span>
                                </li>
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Garanti AMER (yıl)</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">2</span>
                                </li>
                            </ul>

                            {/* Frekans Özellikleri */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Frekans Özellikleri
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Mikrofon hassasiyeti (mV/Pa)</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">2mV +-2.5dB</span>
                                </li>
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Frekans tepkisi</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">30 Hz - 17 kHz</span>
                                </li>
                            </ul>

                            {/* Bağlantı */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Bağlantı
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Bağlantı tipi</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">Kablolu</span>
                                </li>
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Konektör</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">3-pin XLR</span>
                                </li>
                            </ul>

                            {/* Ortam Koşulları */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Ortam Koşulları
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Bağıl nem (≤ %)</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">%5 - 95</span>
                                </li>
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Çalışma sıcaklığı (°C)</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">-15°C - +55°C (5°F - 131°F)</span>
                                </li>
                            </ul>

                            {/* Batarya ve Güç */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Batarya ve Güç
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Batarya</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">Pakete dahil değil</span>
                                </li>
                            </ul>

                            {/* Elektriksel Özellikler */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Elektriksel Özellikler
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">Empedans</span>
                                    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">250 Ohm</span>
                                </li>
                            </ul>

                            {/* Ölçüler */}
                            <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
                                Ölçüler
                            </div>
                            <ul className="list-none p-0 m-0">
                                {/* Repeated pattern for dimensions */}
                                {[
                                    ["Ürün ağırlığı (g)", "159"],
                                    ["Ürün yüksekliği (mm)", "84"],
                                    ["Ürün uzunluğu (mm)", "122"],
                                    ["Ürün genişliği (mm)", "49"],
                                    ["Paket yüksekliği (mm)", "260"],
                                    ["Paket uzunluğu (mm)", "80"],
                                    ["Paket genişliği (mm)", "120"]
                                ].map(([label, value], idx) => (
                                    <li key={idx} className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
                                        <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">{label}</span>
                                        <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">{value}</span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                </div>
            </section>
        </div>

        <div id="kutu-icerigi" className="min-h-none"> 
            <section className='w-full'>
                <div className='max-w-full mx-auto'>
                    
                    {/* 1. Accordion Header Control */}
                    <div 
                        onClick={() => handleInteraction('kutu-icerigi')}
                        className='flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group'
                    >
                        <h2 className='antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black'>
                            Kutu İçeriği
                            <span className="antialiased subpixel-antialiased text-[20px] ml-2 align-top leading-none text-black font-medium">
                                {kutuIcerigiData.length.toString().padStart(2, '0')}
                            </span>
                        </h2>
                        <div className={`flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full transition-all duration-100 ${
                            openAccordionId === 'kutu-icerigi' ? 'bg-sennheiser-gray text-black' : 'bg-sennheiser-gray text-black'
                        }`}>
                            <svg viewBox='0 0 32 32' className={`w-[12px] h-[12px] fill-current transition-transform duration-500 ${openAccordionId === 'kutu-icerigi' ? 'rotate-180' : ''}`} xmlns='http://www.w3.org/2000/svg'>
                                <path d="M0 11.419l1.958-1.958 14.058 14.058 14.058-14.058 1.958 1.958-16.014 16.017-16.017-16.017z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* 2. Expandable Content Area */}
                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                        openAccordionId === 'kutu-icerigi' ? 'max-h-[5000px] pb-[20px] border-b border-light-gray' : 'max-h-0'
                    }`}>
                        <div className="flex flex-col mb-[0px] px-[20px]">
                            <ul className="list-none pb-[40px] m-0">
                                {kutuIcerigiData.map((entry, index) => (
                                    <li key={index} className="h-[56px] flex items-center border-b border-light-gray">
                                        <div className="flex items-center gap-2">
                                            {/* Quantity Indicator */}
                                            <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">
                                                ({entry.quant})
                                            </span>
                                            <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">
                                                {entry.item}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </div>

        <div id="ilgili-urunler" className="min-h-none"> 
            <section className='w-full'>
                <div className='max-w-full mx-auto'>
                    
                    {/* 1. Accordion Header Control */}
                    <div 
                        onClick={() => handleInteraction('ilgili-urunler')}
                        className='flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group'
                    >
                        <h2 className='antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black'>
                            Aksesuarlar ve İlgili Ürünler
                            <span className="antialiased subpixel-antialiased text-[20px] ml-2 align-top leading-none text-black font-medium">
                                {ilgiliUrunlerData.length.toString().padStart(2, '0')}
                            </span>
                        </h2>
                        <div className='flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full transition-all duration-100 bg-sennheiser-gray text-black'>
                            <svg viewBox='0 0 32 32' className={`w-[12px] h-[12px] fill-current transition-transform duration-500 ${
                                openAccordionId === 'ilgili-urunler' ? 'rotate-180' : ''
                            }`} xmlns='http://www.w3.org/2000/svg'>
                                <path d="M0 11.419l1.958-1.958 14.058 14.058 14.058-14.058 1.958 1.958-16.014 16.017-16.017-16.017z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* 2. Expandable Content Area */}
                    <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                        openAccordionId === 'ilgili-urunler' ? 'max-h-[5000px] opacity-100 pb-[40px] border-b border-light-gray' : 'max-h-0 opacity-0'
                    }`}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-[20px] px-[20px] pt-[20px]">
                            {ilgiliUrunlerData.map((product, idx) => (
                                <Link 
                                    key={idx} 
                                    href={product.href} 
                                    className="group flex flex-col gap-3 cursor-pointer"
                                >
                                    {/* Square Section: Image Only */}
                                    <div className="aspect-square w-full border-b border-light-gray bg-light-gray p-[0px] flex items-center justify-center transition-all duration-300 group-hover:border-brand-hover-blue relative overflow-hidden">
                                        <div className="relative w-full h-full transform transition-transform duration-300">
                                            <Image 
                                                src={product.href} 
                                                alt={product.item} 
                                                fill 
                                                className="object-contain mix-blend-multiply" 
                                            />
                                        </div>
                                    </div>

                                    {/* Title Section: Below the square on white background */}
                                    <div className="antialiased subpixel-antialiased text-[0.65rem] md:text-[0.65rem] font-regular leading-[1.2] tracking-tight text-black transition-all duration-300 group-hover:text-brand-hover-blue">
                                        {product.item}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>

        <div id="indirmeler" className="min-h-none"> 
            <section className='w-full'>
                <div className='max-w-full mx-auto'>
                    
                    {/* 1. External Link Header */}
                    <a 
                        href="https://www.sennheiser.com/en-gb/support/downloads-and-instructions?filtersSearch=md+421+kompakt&filtersPage=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group no-underline transition-colors duration-300'
                    >
                        <div className="flex items-center">
                            <h2 className='antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black flex items-top gap-3'>
                                İndirmeler
                                {/* External Link Icon */}
                                <SquareArrowOutUpRight 
                                    className="w-3 h-3 text-black transition-all duration-300" 
                                    strokeWidth={2.5}
                                />
                            </h2>
                        </div>
                        
                        <div className='flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full transition-all duration-300 bg-sennheiser-gray text-black'>
                            <svg viewBox='0 0 32 32' className='w-[12px] h-[12px] fill-current' xmlns='http://www.w3.org/2000/svg'>
                                <path d="M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z"></path>
                            </svg>
                        </div>
                    </a>

                </div>
            </section>
        </div>

        <section className='w-full bg-white'>
            <div className='max-w-full mx-auto px-0 pt-[80px] md:px-0'>
                <div id="satin-alma-secenekleri" className="min-h-none border-light-gray">
                    <div className='px-[20px] flex items-center pb-[10px] gap-6 justify-between'>
                        <h2 className='antialiased subpixel-antialiased text-[2.5rem] md:text-[2.5rem] font-medium leading-[1.5] tracking-tight'>
                            Satın Alma Seçenekleri
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] px-[20px] pb-[20px]">
                        {[
                            { 
                                icon: (
                                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <path d="M11.73,16,6.91,20.84a.49.49,0,0,1-.85-.4V11.59a.49.49,0,0,1,.85-.4Zm12.15,6.16a.48.48,0,0,1-.34.84H8.6a.49.49,0,0,1-.36-.84l4.83-4.82,3,3,3-3ZM23.56,9a.48.48,0,0,1,.32.85l-7.81,7.83L8.24,9.86A.48.48,0,0,1,8.56,9Zm4.5-2h-24V25h24Zm-2.84,4.18a.49.49,0,0,1,.85.38v8.89a.49.49,0,0,1-.85.38L20.39,16Z" fill="currentColor" />
                                    </svg>
                                ),
                                text: "İletişime Geçin",
                                href: "/sennheiser/hakkimizda/iletisim-bilgileri" 
                            },
                            { 
                                icon: (
                                    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <path d="M47.25 8.75H8.75V12.25H47.25V8.75Z" fill="currentColor"></path>
                                        <path d="M8.75 49H29.75V35H43.75V49H47.25V35H50.75V31.5L46.865 15.75H9.135L5.25 31.08V35H8.75V49ZM26.25 45.5H12.25V35H26.25V45.5Z" fill="currentColor"></path>
                                    </svg>
                                ), 
                                text: "En Yakın Bayimizden Satın Alın",
                                href: "/sennheiser/hakkimizda/bayilerimiz"
                            },
                        ].map((item, idx) => (
                            <Link 
                                key={idx} 
                                href={item.href}
                                className="aspect-square w-full border border-light-gray bg-white p-[20px] flex flex-col justify-between group cursor-pointer hover:bg-brand-hover-blue hover:border-brand-hover-blue transition-all duration-300"
                            >
                                {/* Top Left Icon Container */}
                                <div className="w-[48px] h-[48px] flex items-center justify-center text-black group-hover:text-brand-hover-blue transition-colors duration-300">
                                    {item.icon}
                                </div>

                                {/* Bottom Left Text with Upward Motion */}
                                <div className="antialiased subpixel-antialiased text-[20px] font-medium leading-[1.2] tracking-tight text-black group-hover:text-white transform transition-all duration-300 group-hover:-translate-y-3 max-w-full">
                                    {item.text}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div> 
        </section>

    </div>
  );
}