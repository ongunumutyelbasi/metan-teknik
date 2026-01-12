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

export default function ProductPage() {
    
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
        '/images/sennheiser/urunler/spectera-sek-uhf/spectera-sek-uhf-1.webp',
        '/images/sennheiser/urunler/spectera-sek-uhf/spectera-sek-uhf-2.webp',
        '/images/sennheiser/urunler/spectera-sek-uhf/spectera-sek-uhf-3.webp',
        '/images/sennheiser/urunler/spectera-sek-uhf/spectera-sek-uhf-4.avif',
    ];

    const highlightsData = [
        { label: 'Renk', value: 'Antrasit' },
        { label: 'Frekans Aralığı', value: '470.000 - 608.000; 630.000 - 698.000' },
        { label: 'Gecikme (ms)', value: "ALM'den sonuç bekleniyor" },
        { label: 'Bağlantı', value: 'Kablosuz' },
        { label: 'Konektör', value: '3.5mm TRS, Se3PIN, SeCoax50' },
    ];

    const productVariants: { name: string; href: string }[] = [
        { name: 'Spectera SEK (UHF)', href: '/sennheiser/urunler/cift-yonlu-iletisim/spectera-sek-uhf' },
        { name: 'Spectera SEK (1G4)', href: '/sennheiser/urunler/cift-yonlu-iletisim/spectera-sek-1g4' },
    ];
    
    const kutuIcerigiData = [
        { item: 'SPECTERA SEK Bodypack verici', quant: '1' },
        { item: 'SPECTERA SEK ANTENNA', quant: '1' },
        { item: 'Kemer klipsi', quant: '1' },
        { item: 'Hızlı kılavuz', quant: '1' },
        { item: 'Güvenlik kılavuzu', quant: '1' },
        { item: 'İmalatçı beyanı', quant: '1' },
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
            { label: "Açma/kapama düğmesi", value: "Var" }
            ]
        },
        {
            title: "Ürün",
            specs: [
            { label: "Renk", value: "Antrasit" },
            { label: "Gain", value: "-6 - 42 dB, 1dB steps" },
            { label: "Gecikme (latency)", value: "ALM'den sonuç bekleniyor" },
            { label: "Minimum kanal aralığı (kHz)", value: "Kullanılan bant genişliği moduyla eşleşir" },
            { label: "RF hassasiyeti", value: "ALM'den sonuç bekleniyor" }
            ]
        },
        {
            title: "Frekans Özellikleri",
            specs: [
            { label: "Frekans aralığı", value: "470.000 - 608.000; 630.000 - 698.000" },
            { label: "Ses frekans tepkisi", value: "20 Hz - 20 kHz (±1 dB)" },
            { label: "Kulaklık çıkışı - frekans tepkisi", value: "20 Hz - 20 kHz (±1 dB)" }
            ]
        },
        {
            title: "Akustik Özellikler",
            specs: [
            { label: "Dinamik aralık", value: ">112dB(A)" },
            { label: "Örnekleme oranı", value: "48 kHz" },
            { label: "Ses çıkış seviyesi", value: "2 x 400mW RMS (16Ω, -40dB THD, 1kHz)" },
            { label: "Low-cut filtresi", value: "20, 30, 60, 80, 100, 120 Hz" },
            { label: "Line / Mic level", value: "20, 30, 60, 80, 100, 120 Hz" }
            ]
        },
        {
            title: "Bağlantı",
            specs: [
            { label: "Bağlantı tipi", value: "Kablosuz" },
            { label: "Konektör", value: "3.5mm TRS, Se3PIN, SeCoax50" }
            ]
        },
        {
            title: "Giriş Çıkışlar",
            specs: [
            { label: "Mikrofon girişi - konektör", value: "3-pin ses soketi" },
            { label: "Mikrofon girişi - empedans", value: "22 kΩ" },
            { label: "Kulaklık girişi - güç", value: "2 x 100 mW @ 16 @ -40 dB THD (%1)" },
            { label: "Anten çıkışı", value: "Sennheiser Coax, 50 Ω" }
            ]
        },
        {
            title: "Ortam Koşulları",
            specs: [
            { label: "Depolama için sıcaklık aralığı", value: "-25°C - +70°C (-13°F - 158°F) (bataryasız)" },
            { label: "Depolama için bağıl nem aralığı", value: "%25 - 95 (yoğuşmasız)" },
            { label: "Kullanılabilecek bağıl nem aralığı", value: "%25 - 95 (yoğuşmasız)" },
            { label: "Çalışma sıcaklığı (°C)", value: "-10°C - +50°C (14°F - 122°F)" }
            ]
        },
        {
            title: "Batarya ve Güç",
            specs: [{ label: "Batarya", value: "Pakete dahil değil" }]
        },
        {
            title: "Elektriksel Özellikler",
            specs: [{ label: "İletim gücü", value: "50 mW'a kadar (ülkeye göre sınırlı)" }]
        },
        {
            title: "Teknoloji",
            specs: [
            { label: "Şifreleme", value: "AES 256 CTR Mode exp. >10,000 yıl" },
            { label: "Codecs", value: "OPUS" },
            { label: "İletim metodu", value: "Çok taşıyıcılı (multicarrier), TDMA, TDD" }
            ]
        },
        {
            title: "Ölçüler",
            specs: [
            { label: "Ürün yüksekliği (mm)", value: "41" },
            { label: "Ürün uzunluğu (mm)", value: "243" },
            { label: "Ürün genişliği (mm)", value: "124" },
            { label: "Paket yüksekliği (mm)", value: "246" },
            { label: "Paket uzunluğu (mm)", value: "43" },
            { label: "Paket genişliği (mm)", value: "123" }
            ]
        }
    ];

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

    interface RelatedProduct {
        item: string;
        href: string; // This is the image path
        link: string; // This is the product page URL
    }

    const ilgiliUrunlerData: RelatedProduct[] = [
        { item: 'BA 70', href: '/images/sennheiser/urunler/ba-70/ba-70-1.webp', link: '/sennheiser/urunler/aksesuarlar/mzh-20-1' },
        { item: 'LM 6070', href: '/images/sennheiser/urunler/lm-6070/lm-6070-1.avif', link: '/sennheiser/urunler/aksesuarlar/mzs-20-1' },
        { item: 'L 6000', href: '/images/sennheiser/urunler/l-6000/Sennheiser-L-6000-Battery-Charger-BA60.jpg.webp', link: '/sennheiser/urunler/aksesuarlar/mzs-40' },
        { item: 'L 70 USB', href: '/images/sennheiser/urunler/l70-usb/l70-usb.avif', link: '/sennheiser/urunler/aksesuarlar/mzw-20-1' },
        { item: 'CHG 70N-C', href: '/images/sennheiser/urunler/chg-70n-c/chg-70n-c-1.avif', link: '/sennheiser/urunler/aksesuarlar/mzr-8000' },
        { item: 'EW-D CHARGING SET', href: '/images/sennheiser/urunler/ew-d-charging-set/ew-d-charging-set-1.jpg', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
        { item: 'Spectera SEK Battery Cover', href: '/images/sennheiser/urunler/spectera-sek-battery-cover/spectera-sek-battery-cover-1.jpeg', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
        { item: 'Spectera SEK Belt Clip', href: '/images/sennheiser/urunler/spectera-sek-belt-clip/Spectera_SEK_Belt_Clip_Product_Shot_Cutout_Front_View.jpg', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
        { item: '3pin Protective Cap MIC/LINE', href: '/images/sennheiser/urunler/spectera-3pin-protective-cap-mic-line/3pin-Protective-Cap-MIC:LINE.png', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
        { item: 'Spectera SEK Antenna (UHF)', href: '/images/sennheiser/urunler/spectera-sek-antenna-uhf/Spectera_SEK_Antenna_UHF_Product_Shot_Cutout_Front_.jpg', link: '/sennheiser/urunler/aksesuarlar/mzw-8018' },
    ];

  const nextImg = () => setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));

  const articleNo = '509164';
  const productName = 'Spectera SEK (UHF)';
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
                category="Çift Yönlü İletişim"
                articleNo={articleNo}
                variants={productVariants}
                onPurchaseClick={() => scrollToSection('satin-alma-secenekleri')}
            >
                <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                    Her iki yönlü Spectera SEK body pack, hem bir IEM/IFB hem de bir mikrofon/hat (mic/line) akışını eş zamanlı olarak yönetir.
                </p>
                <div className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-normal text-dark-gray'>
                    <p>
                        Ek olarak, LinkDesk yazılımı aracılığıyla aynı RF bağlantısı üzerinden IEM ses seviyesi, ses düzeyi ve ayarları, RF sağlığı, pil durumu ve daha fazlasının uzaktan tam kontrolüne ve takibine olanak tanır. Varyantlar arasında UHF (470–608 MHz ve 630–698 MHz) veya 1G4 (1350–1400 MHz ve 1435–1525 MHz) seçenekleri bulunur. Spectera SEK body pack üniteleri, empedans eşleştirmeli yüksek güçlü bir kulaklık amplifikatörüne sahiptir ve BA 70 şarj edilebilir lityum iyon pil kullanılarak (seçilen Audio Link moduna ve ayarlarına bağlı olarak) yedi saate kadar çalışma süresi sunar.
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