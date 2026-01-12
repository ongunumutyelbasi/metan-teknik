"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Store, Mail, SquareArrowOutUpRight } from 'lucide-react';

// UI and Navigation Components
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import ActionButton from '@/components/ui/ActionButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import NavArrow from '@/components/ui/NavArrow';
import PaginationCounter from '@/components/ui/PaginationCounter';
import { useProductUI } from '@/app/hooks/useProductUI';

// Sennheiser Product Page Components
import { 
    SpecRow, 
    SpecSection, 
    RelatedProducts, 
    FeatureList, 
    HighlightsList, 
    AccordionSection, 
    BoxContentList, 
    PurchaseOptions, 
    Breadcrumbs, 
    ProductGallery, 
    ProductDownloads, 
    ProductVariantPicker
} from '@/components/Sennheiser';
import { ProductHeader } from '@/components/Sennheiser/ProductHeader';

export default function SennheiserMK4Page() {
    
    const { openAccordionId, handleInteraction, scrollToSection } = useProductUI();

    const [currentImg, setCurrentImg] = useState(0);
  
    const productNav = [
        { label: 'Özellikler', id: 'ozellikler' },
        { label: 'Öne Çıkan Özellikler', id: 'one-cikan-ozellikler' },
        { label: 'Teknik Özellikler', id: 'teknik-ozellikler' },
        { label: 'Kutu İçeriği', id: 'kutu-icerigi' },
        { label: 'Aksesuarlar ve İlgili Ürünler', id: 'ilgili-urunler' },
        { label: 'İndirmeler', id: 'indirmeler' },
        { label: 'Satın Alma Seçenekleri', id: 'satin-alma-secenekleri' },
    ];

    const productImages = [
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-1.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-2.webp',
        '/images/sennheiser/urunler/md-421-kompakt/md-421-kompakt-3.webp',
    ];

    const productVariants: { name: string; href: string }[] = [
        { name: 'MD 421 KOMPAKT', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt' },
        { name: 'MD 421 KOMPAKT + DRUM CLAMP', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt-drum-clamp' },
    ];

    const ozelliklerData = [
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
        'Koruyucu iç şasi gövdesi, toz ve neme maruz kalmayı azaltarak performansı ve uzun ömrü korur',
    ];

    const highlightsData = [
        { label: "Transformatör tipi", value: "Dinamik" },
        { label: "Mikrofon hassasiyeti (mV/Pa)", value: "2mV +-2.5dB" },
        { label: "Bağlantı", value: "Kablolu" },
        { label: "Konektör", value: "3-pin XLR" }
    ];

    const technicalSpecs = [
        {
            title: "Lojistik",
            specs: [{ label: "Garanti", value: "2 yıl" }]
        },
        {
            title: "Ürün Özellikleri",
            specs: [
            { label: "Multipack", value: "Multipack değil" },
            { label: "Açma/kapama düğmesi", value: "Yok" }
            ]
        },
        {
            title: "Ürün",
            specs: [
            { label: "Transformatör tipi", value: "Dinamik" },
            { label: "Garanti AMER (yıl)", value: "2" }
            ]
        },
        {
            title: "Frekans Özellikleri",
            specs: [
            { label: "Mikrofon hassasiyeti (mV/Pa)", value: "2mV +-2.5dB" },
            { label: "Frekans tepkisi", value: "30 Hz - 17 kHz" }
            ]
        },
        {
            title: "Bağlantı",
            specs: [
            { label: "Bağlantı tipi", value: "Kablolu" },
            { label: "Konektör", value: "3-pin XLR" }
            ]
        },
        {
            title: "Ortam Koşulları",
            specs: [
            { label: "Bağıl nem (≤ %)", value: "%5 - 95" },
            { label: "Çalışma sıcaklığı (°C)", value: "-15°C - +55°C (5°F - 131°F)" }
            ]
        },
        {
            title: "Batarya ve Güç",
            specs: [{ label: "Batarya", value: "Pakete dahil değil" }]
        },
        {
            title: "Elektriksel Özellikler",
            specs: [{ label: "Empedans", value: "250 Ohm" }]
        },
        {
            title: "Ölçüler",
            specs: [
            { label: "Ürün ağırlığı (g)", value: "159" },
            { label: "Ürün yüksekliği (mm)", value: "84" },
            { label: "Ürün uzunluğu (mm)", value: "122" },
            { label: "Ürün genişliği (mm)", value: "49" },
            { label: "Paket yüksekliği (mm)", value: "260" },
            { label: "Paket uzunluğu (mm)", value: "80" },
            { label: "Paket genişliği (mm)", value: "120" }
            ]
        }
    ];

    const kutuIcerigiData = [
        { item: 'MD 421 KOMPAKT Studio mikrofon', quant: '1' },
        { item: 'Taşıma kesesi', quant: '1' },
        { item: 'Hızlı kılavuz', quant: '1' },
        { item: 'Güvenlik kılavuzu', quant: '1' },
    ];

    interface RelatedProduct {
        item: string;
        href: string; // This is the image path
        link: string; // This is the product page URL
    }

    const ilgiliUrunlerData: RelatedProduct[] = [
        { item: 'MZW 421-A', href: '/images/sennheiser/urunler/mzw-421-a/mzw-421-a.avif', link: '/sennheiser/urunler/aksesuarlar/mzw-421-a' },
        { item: 'MZH DRUMS', href: '/images/sennheiser/urunler/mzh-drums/mzh-drums.avif', link: '/sennheiser/urunler/aksesuarlar/mzh-drums' },
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
                <ProductGallery 
                    images={productImages} 
                    currentImg={currentImg} 
                    onNext={nextImg} 
                    onPrev={prevImg} 
                />

                {/* right panel: scrollable content */}
                <ProductHeader 
                    productName={productName}
                    category="Mikrofonlar"
                    articleNo={articleNo}
                    variants={productVariants}
                    onPurchaseClick={() => scrollToSection('satin-alma-secenekleri')}
                >
                    <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                        Aklınıza gelebilecek her türlü proje için mikrofonunuz bu.
                    </p>
                    <div className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-normal text-dark-gray'>
                        <p>
                            Eğer müzik dinliyorsanız, MD 421'in, yani Sennheiser'in son 50 yıldır sayısız ödüllü performans ve prodüksiyonda kullanılan efsanevi mikrofonunun sesini duymuşsunuzdur. Bu efsanenin devamı olan MD 421 Kompakt, orijinal MD 421 ve MD 421-II'yle aynı performansı sağlamakla kalmıyor, baştan tasarlanan mikrofon mandalının da yardımıyla kullanım alanlarını da genişletiyor. Aynen orijinalleri gibi, MD 421 Kompakt da kardioid kutupsal deseni ve olağanüstü dinamik aralığıyla, canlı performans veya stüdyo kayıtlarınızda karşınıza çıkabilecek her türlü senaryonun üstesinden gelerek dupduru bir ses sağlıyor. (Eski ürün numarası 700589)
                        </p>
                    </div>
                </ProductHeader>
                
            </main>

            <div className='sticky top-[76px] bottom-0 z-40 border-light-gray'>
                <SubNavigationRow items={productNav} />
            </div>

            <section className='w-full pt-20 bg-white'>
                <div className='max-w-full mx-auto px-0 md:px-0'>
                    <div id='ozellikler' className='mb-[20px] border-b border-light-gray'>
                        <h2 className='px-[20px] antialiased subpixel-antialiased text-[2.5rem] md:text-[2.5rem] font-medium leading-[1.5] tracking-tight'>
                            Özellikler
                        </h2>
                    </div>
                    <FeatureList items={ozelliklerData} />
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
                        <HighlightsList items={highlightsData} />
                    </div>
                </div> 
            </section>

            <AccordionSection
                id="teknik-ozellikler"
                title="Teknik Özellikler"
                isOpen={openAccordionId === 'teknik-ozellikler'}
                onToggle={handleInteraction}
            >
                <div className="flex flex-col mb-[20px]">
                    {technicalSpecs.map((section) => (
                        <SpecSection key={section.title} title={section.title}>
                            {section.specs.map((spec) => (
                                <SpecRow key={spec.label} label={spec.label} value={spec.value} />
                            ))}
                        </SpecSection>
                    ))}
                </div>
            </AccordionSection>

            <AccordionSection
                id="kutu-icerigi"
                title="Kutu İçeriği"
                badgeCount={kutuIcerigiData.length.toString().padStart(2, '0')}
                isOpen={openAccordionId === 'kutu-icerigi'}
                onToggle={handleInteraction}
            >
                <BoxContentList data={kutuIcerigiData} />
            </AccordionSection>

            <AccordionSection 
                id="ilgili-urunler" 
                title="Aksesuarlar ve İlgili Ürünler" 
                badgeCount={ilgiliUrunlerData.length.toString().padStart(2, '0')} 
                isOpen={openAccordionId === 'ilgili-urunler'} 
                onToggle={handleInteraction}
            >
                <RelatedProducts products={ilgiliUrunlerData} />
            </AccordionSection>

            <ProductDownloads href="https://www.sennheiser.com/en-gb/support/downloads-and-instructions?filtersSearch=md+421+kompakt&filtersPage=1" />

            <section className='w-full bg-white'>
                <div className='max-w-full mx-auto px-0 pt-[80px] pb-[40px] md:px-0'>
                    <div id="satin-alma-secenekleri" className="min-h-none border-light-gray">
                        <div className='px-[20px] flex items-center pb-[10px] gap-6 justify-between'>
                            <h2 className='antialiased subpixel-antialiased text-[2.5rem] md:text-[2.5rem] font-medium leading-[1.5] tracking-tight'>
                                Satın Alma Seçenekleri
                            </h2>
                        </div>
                        <PurchaseOptions />
                    </div>
                </div> 
            </section>
        </div>
    );
}