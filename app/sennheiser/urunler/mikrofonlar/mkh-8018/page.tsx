"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Store, Mail, SquareArrowOutUpRight } from 'lucide-react';

// UI and Navigation Components
import ActionButton from '@/components/ui/ActionButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import NavArrow from '@/components/ui/NavArrow';
import PaginationCounter from '@/components/ui/PaginationCounter';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
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

export default function SennheiserMKH8018Page() {
    
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
        '/images/sennheiser/urunler/mkh-8018/mkh-8018-1.webp',
        '/images/sennheiser/urunler/mkh-8018/mkh-8018-2.webp',
        '/images/sennheiser/urunler/mkh-8018/mkh-8018-3.webp',
        '/images/sennheiser/urunler/mkh-8018/mkh-8018-4.webp',
    ];

    const productVariants: { name: string; href: string }[] = [];

    const ozelliklerData = [
        'Stereo shotgun kapsül konfigürasyonu, sesi sürükleyici bir yönellik algısı ve mekansal gerçekçilikle yakalar',
        'Film ve video prodüksiyonlarında yönlülük hissi oluşturmak; senaryolu sahnelerde ve spor etkinliklerinde stereo ses alanları ve mekansal olarak doğru çevresel ses, vahşi yaşam ve daha fazlasını kaydetmek için ideal mikrofon seçimidir',
        'Üç adet seçilebilir stereo modu: MS, dar XY (XY-narrow) ve geniş XY (XY-wide)',
        "Seçilebilir düşük frekans kesici (low-cut) filtre (70 Hz'de -3 dB), rüzgar ve kullanım gürültüsünü azaltır.",
        'Yüksek kaliteli -10 dB pad, aşırı yüklenmeye (overdrive) karşı koruma sağlar',
        'Kompakt tasarımı sayesinde kamera üzerine montaj için idealdir',
        'Diğer 8000 serisi mikrofonlarla aynı tınıya sahiptir, bu da optimum işitsel uyumluluk sağlar',
        'Tam yüzer dengeli çıkış (fully floating balanced output), en az bozulmayla kritik olmayan bağlantı teknolojilerine olanak tanır',
        'Düşük gerilimli diyafram ve simetrik, akustik olarak açık "push-pull" dönüştürücü tasarımı, ses akışını mümkün olduğunca kısıtlamasız ve bozulmasız tutar',
        'Genişletilmiş bas tepkisi, sesin tüm frekans kapsamıyla yakalanmasını sağlar ve mikrofon konumlandırma için daha fazla özgürlük sunar',
        'Tam bir kondenser mikrofon serisinin parçasıdır; MKH 8000 serisi, ses kayıt profesyonellerinin çeşitli uygulamalar için ihtiyaç duyduğu tüm standart kutup desenlerini (polar patterns) içerir',
        'Alman mühendisliğiyle tasarlanmış dayanıklı metal gövde ve sağlam yapı, üstün güvenilirlik anlamına gelir',
        'Neme dayanıklı tasarımıyla, diğer mikrofonların başarısız olduğu nemli, sıcak ve soğuk ortamlarda kullanım için idealdir',
        'Optimal kutup deseni, eksen dışı renklenmeleri (off-axis colorations) önler; özellikle büyük ses kaynakları için tutarlı bir ses görüntüsü sağlar',
        'Düşük öz-gürültü (low self-noise) sayesinde seste daha fazla detay sunar; sessiz seslerin yumuşaklığını korur ve dinamikleri artırır',
        'Düşük doğrusal olmayan bozulma (low nonlinear distortion), yeni frekans spektrumları eklenmesini önleyerek ses netliğini korur',
        'Kompakt boyutu sayesinde kolay taşınır; canlı gösterilerde veya TV çekimlerinde görsel olarak dikkat çekmez',
        "Nextel® yansıma önleyici boya, sahne ışıklarının yansımasını engelleyerek mikrofonun canlı şovlarda veya TV'de görsel olarak fark edilmemesini sağlar.",
        "Modüler olmayan tasarım; sabit XLR 5M çıkışlı.",
    ];

    const technicalSpecs = [
        {
            title: "Lojistik",
            specs: [{ label: "Garanti", value: "2 yıl" }]
        },
        {
            title: "Ürün Özellikleri",
            specs: [
            { label: "Renk HEX", value: "#393D47" },
            { label: "Multipack", value: "Multipack değil" },
            { label: "Açma/kapama düğmesi", value: "Yok" }
            ]
        },
        {
            title: "Ürün",
            specs: [
            { label: "Transformatör tipi", value: "Gerçek kondenser" },
            { label: "Renk", value: "NEXTEL" },
            { label: "Garanti AMER (yıl)", value: "2" }
            ]
        },
        {
            title: "Frekans Özellikleri",
            specs: [{ label: "Frekans tepkisi", value: "40 Hz - 20 kHz" }]
        },
        {
            title: "Akustik Özellikler",
            specs: [
            { label: "Dinamik aralık", value: ">126dB" },
            { label: "Kutup deseni", value: "Stereo" }
            ]
        },
        {
            title: "Bağlantı",
            specs: [
            { label: "Bağlantı tipi", value: "Kablolu" },
            { label: "Konektör", value: "5-pin XLR" }
            ]
        },
        {
            title: "Batarya ve Güç",
            specs: [{ label: "Batarya", value: "Pakete dahil değil" }]
        },
        {
            title: "Ölçüler",
            specs: [
            { label: "Ürün ağırlığı (g)", value: "403" },
            { label: "Ürün yüksekliği (mm)", value: "73" },
            { label: "Ürün uzunluğu (mm)", value: "320" },
            { label: "Ürün genişliği (mm)", value: "170" },
            { label: "Paket yüksekliği (mm)", value: "320" },
            { label: "Paket uzunluğu (mm)", value: "73" },
            { label: "Paket genişliği (mm)", value: "120" }
            ]
        }
    ];

    const kutuIcerigiData = [
        { item: 'MKH 8018 shotgun mikrofon', quant: '1' },
        { item: 'MZQ 100 Mikrofon klipsi', quant: '1' },
        { item: 'MZW 8018 Mikrofon süngeri', quant: '1' },
        { item: 'Dişli taşıma tübü', quant: '1' },
        { item: 'MZR 8000 Kamera adaptörü', quant: '1' },
        { item: 'Hızlı kılavuz', quant: '1' },
        { item: 'Güvenlik kılavuzu', quant: '1' },
    ];

    const highlightsData = [
        { label: "Renk", value: "NEXTEL" },
        { label: "Kutup Deseni", value: "Stereo" },
        { label: "Dönüştürücü Tipi", value: "Gerçek kondenser" },
        { label: "Bağlantı", value: "Kablolu" },
        { label: "Konektör", value: "5-pin XLR" }
    ];

    interface RelatedProduct {
        item: string;
        href: string; // This is the image path
        link: string; // This is the product page URL
    }

    const ilgiliUrunlerData: RelatedProduct[] = [
        { item: 'MZH 20-1', href: '/images/sennheiser/urunler/mzh-20-1/mzh-20-1-1.webp', link: '/sennheiser/urunler/aksesuarlar/mzh-20-1' },
        { item: 'MZS 20-1', href: '/images/sennheiser/urunler/mzs-20-1/mzs-20-1-1.jpg', link: '/sennheiser/urunler/aksesuarlar/mzs-20-1' },
        { item: 'MZS 40', href: '/images/sennheiser/urunler/mzs-40/mzs-40-1.avif', link: '/sennheiser/urunler/aksesuarlar/mzs-40' },
        { item: 'MZW 20-1', href: '/images/sennheiser/urunler/mzw-20-1/mzw-20-1-1.jpg', link: '/sennheiser/urunler/aksesuarlar/mzw-20-1' },
        { item: 'MZR 8000', href: '/images/sennheiser/urunler/mzr-8000/mzr-8000-1.jpg', link: '/sennheiser/urunler/aksesuarlar/mzr-8000' },
        { item: 'MZW 8018', href: '/images/sennheiser/urunler/mzw-8018/mzw-8018-1.avif', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
    ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  const articleNo = '700252';
  const productName = 'MKH 8018';
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
            <div className='w-1/2'>
                <div className='h-[calc(100vh-63px)] flex flex-col px-[20px] pb-[20px] pt-20 justify-end'>
                    <Breadcrumbs category="Mikrofonlar" productName={productName} />

                    <div className='antialiased subpixel-antialiased text-[2.5rem] leading-[0.85] font-medium mb-[1rem] tracking-regular flex gap-1'>
                        <span>{productName}</span>
                    </div>
                    <div className='antialiased subpixel-antialiased text-[1rem] text-dark-gray mb-[0.75rem] font-normal flex gap-1'>
                        <span>Ürün Kodu:</span>
                        <span className=''>{articleNo}</span>
                    </div>
                
                    <div className='mb-[10px] flex flex-col'>
                        {/* Pricing/Delivery placeholders preserved */}
                    </div>

                    <div className='flex items-center gap-[6px]'>
                        <ActionButton 
                            text='Satın al' 
                            className='w-[140px] h-[54px] justify-center' 
                            onClick={() => scrollToSection('satin-alma-secenekleri')}
                        />
                        
                        <ProductVariantPicker 
                            variants={productVariants} 
                            currentProduct={productName} 
                        />
                    </div>
                </div>

                <div className='px-[16px] pt-[50px] py-[16px] font-normal'>
                    <div className='max-w-full'>
                        <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                            MKH 8018, zengin bir yönlülük hissi ve mekansal gerçekçilik sunan, stereo shotgun tipi bir RF kondenser mikrofondur.
                        </p>
                        <div className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-normal text-dark-gray'>
                            <p className='mb-0'>
                                MS, dar XY (XY-narrow) ve geniş XY (XY-wide) olmak üzere üç adet seçilebilir stereo modunun yanı sıra, dikkat çekici bir "push-pull" (itme-çekme) dönüştürücü tasarımına sahiptir. Düşük gerilimli diyaframla birleşen bu dönüştürücü tasarımı; sesi mümkün olduğunca aslına sadık bir şekilde yakalayabilmeniz için olağanüstü bir hassasiyet ve geniş bir frekans tepkisi sunar.
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

        <ProductDownloads href="https://www.sennheiser.com/en-us/support/downloads-and-instructions?filtersSearch=mkh+8018&filtersPage=1" />

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