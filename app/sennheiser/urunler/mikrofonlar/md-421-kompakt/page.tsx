"use client";

import React, { useState } from 'react';
import { useProductUI } from '@/app/hooks/useProductUI';
import { sennheiserProducts } from '@/src/data/sennheiser-products';

// UI and Sennheiser Components
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { 
    SpecRow, 
    SpecSection, 
    RelatedProducts, 
    FeatureList, 
    HighlightsList, 
    AccordionSection, 
    BoxContentList, 
    PurchaseOptions, 
    ProductGallery, 
    ProductDownloads 
} from '@/components/Sennheiser';
import { ProductHeader } from '@/components/Sennheiser/ProductHeader';

export default function SennheiserMK4Page() {
    // 1. Get Data
    const product = sennheiserProducts.find(p => p.articleNo === "700587");
    if (!product) return <div>Ürün Bulunamadı</div>;
    
    // 2. State & UI Hooks
    const { openAccordionId, handleInteraction, scrollToSection } = useProductUI();
    const [currentImg, setCurrentImg] = useState(0);

    // 3. Derived Data
    const relatedProductsData = sennheiserProducts
        .filter(p => product.relatedProducts?.includes(p.articleNo || ""))
        .sort((a, b) => 
            (a.articleNo || "").localeCompare(b.articleNo || "", undefined, { numeric: true })
        );

    const productNav = [
        { label: 'Özellikler', id: 'ozellikler' },
        { label: 'Öne Çıkan Özellikler', id: 'one-cikan-ozellikler' },
        { label: 'Teknik Özellikler', id: 'teknik-ozellikler' },
        { label: 'Kutu İçeriği', id: 'kutu-icerigi' },
        { label: 'Aksesuarlar ve İlgili Ürünler', id: 'ilgili-urunler' },
        { label: 'İndirmeler', id: 'indirmeler' },
        { label: 'Satın Alma Seçenekleri', id: 'satin-alma-secenekleri' },
    ];

    // Local variant logic (these are usually specific to the page)
    const productVariants = [
        { name: 'MD 421 KOMPAKT', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt' },
        { name: 'MD 421 KOMPAKT + DRUM CLAMP', href: '/sennheiser/urunler/mikrofonlar/md-421-kompakt-drum-clamp' },
    ];

    const nextImg = () => setCurrentImg((prev) => (prev === (product.image?.length || 1) - 1 ? 0 : prev + 1));
    const prevImg = () => setCurrentImg((prev) => (prev === 0 ? (product.image?.length || 1) - 1 : prev - 1));

    return (
        <div className='min-h-screen bg-white text-black font-sennheiser selection:bg-black selection:text-white'>
            <main className='flex w-full'>
                <ProductGallery 
                    images={product.image ?? []} 
                    currentImg={currentImg} 
                    onNext={nextImg} 
                    onPrev={prevImg} 
                />

                <ProductHeader 
                    productName={product.name}
                    category={product.category}
                    articleNo={product.articleNo ?? ""}
                    variants={productVariants}
                    onPurchaseClick={() => scrollToSection('satin-alma-secenekleri')}
                >
                    <p className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-medium mb-[1rem]'>
                        {product.shortDescription}
                    </p>
                    <div className='antialiased subpixel-antialiased text-[1rem] leading-[1.2] font-normal text-dark-gray'>
                        <p>{product.longDescription}</p>
                    </div>
                </ProductHeader>
            </main>

            <div className='sticky top-[76px] bottom-0 z-40 border-light-gray'>
                <SubNavigationRow items={productNav} />
            </div>

            {/* Features */}
            <section id='ozellikler' className='w-full pt-20 bg-white'>
                <div className='max-w-full mx-auto'>
                    <div className='mb-[20px] border-b border-light-gray'>
                        <h2 className='px-[20px] text-[2.5rem] font-medium leading-[1.5] tracking-tight'>Özellikler</h2>
                    </div>
                    <FeatureList items={product.features ?? []} />
                </div>
            </section>

            {/* Highlights */}
            <section id="one-cikan-ozellikler" className='w-full pt-20 pb-20 bg-white'>
                <div className='max-w-full mx-auto'>
                    <div className='px-[20px] flex items-center pb-3 gap-6 justify-between'>
                        <h2 className='text-[2.5rem] font-medium leading-[1.5] tracking-tight'>Öne Çıkan Özellikler</h2>
                        <SecondaryButton text='Devamını Oku' onClick={() => handleInteraction('teknik-ozellikler', true)} />
                    </div>
                    <HighlightsList items={product.highlightedFeatures ?? []} />
                </div> 
            </section>

            {/* Technical Specs Accordion */}
            <AccordionSection
                id="teknik-ozellikler"
                title="Teknik Özellikler"
                isOpen={openAccordionId === 'teknik-ozellikler'}
                onToggle={handleInteraction}
            >
                <div className="flex flex-col mb-[20px]">
                    {product.technicalSpecs?.map((section) => (
                        <SpecSection key={section.mainTitle} title={section.mainTitle}>
                            {section.specs.map((spec) => (
                                <SpecRow key={spec.label} label={spec.label} value={spec.value} />
                            ))}
                        </SpecSection>
                    ))}
                </div>
            </AccordionSection>

            {/* Box Contents Accordion */}
            <AccordionSection
                id="kutu-icerigi"
                title="Kutu İçeriği"
                badgeCount={(product.boxContents?.length ?? 0).toString().padStart(2, '0')}
                isOpen={openAccordionId === 'kutu-icerigi'}
                onToggle={handleInteraction}
            >
                <BoxContentList 
                    data={product.boxContents?.map(item => ({
                        item: item.item,
                        quant: item.quantity.toString() 
                    })) ?? []} 
                />
            </AccordionSection>

            {/* Related Products Accordion - Only renders if matches exist */}
            {relatedProductsData.length > 0 && (
                <AccordionSection 
                    id="ilgili-urunler" 
                    title="Aksesuarlar ve İlgili Ürünler" 
                    badgeCount={relatedProductsData.length.toString().padStart(2, '0')} 
                    isOpen={openAccordionId === 'ilgili-urunler'} 
                    onToggle={handleInteraction}
                >
                    <RelatedProducts 
                        products={relatedProductsData.map(p => ({
                            item: p.name,
                            href: p.image?.[0] || '', 
                            link: p.link
                        }))} 
                    />
                </AccordionSection>
            )}

            <ProductDownloads href="https://www.sennheiser.com/en-gb/support/downloads-and-instructions?filtersSearch=md+421+kompakt&filtersPage=1" />

            {/* Purchase Options */}
            <section id="satin-alma-secenekleri" className='w-full bg-white pt-[80px] pb-[40px]'>
                <div className='px-[20px] flex items-center pb-[10px] gap-6 justify-between'>
                    <h2 className='text-[2.5rem] font-medium leading-[1.5] tracking-tight'>Satın Alma Seçenekleri</h2>
                </div>
                <PurchaseOptions />
            </section>
        </div>
    );
}