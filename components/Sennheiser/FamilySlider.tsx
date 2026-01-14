import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavArrow from '@/components/ui/NavArrow';

export interface FamilyCard {
    title: string;
    description: string;
    image: string;
    href: string;
}

interface FamilySliderProps {
    title: string;
    data: FamilyCard[];
}

export const FamilySlider = ({ title, data }: FamilySliderProps) => {
    // 1. Triple the data to create the infinite buffer
    const extendedData = [...data, ...data, ...data];
    
    // 2. State management
    const [currentIndex, setCurrentIndex] = useState(data.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // 3. Handle responsive items per page safely
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const canScroll = data.length > itemsPerPage;

    const next = () => {
        if (!canScroll) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + itemsPerPage);
    };

    const prev = () => {
        if (!canScroll) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - itemsPerPage);
    };

    // 4. Teleportation logic for the endless loop
    const handleTransitionEnd = () => {
        if (!canScroll) return;

        // If we reach the boundaries, snap back to the middle set instantly
        if (currentIndex >= data.length * 2 || currentIndex <= 0) {
            setIsTransitioning(false);
            if (currentIndex >= data.length * 2) {
                setCurrentIndex(currentIndex - data.length);
            } else if (currentIndex <= 0) {
                setCurrentIndex(currentIndex + data.length);
            }
        }
    };

    return (
        <section className="antialiased subpixel-antialiased w-full pb-12 md:pb-16 px-[20px] bg-white">
            <div className="flex justify-between items-center mb-[20px]">
                <h2 lang="tr" className="antialiased subpixel-antialiased leading-none text-[50px] font-medium normal-case">
                    {title}
                </h2>
                
                <div className="flex gap-[4px] [&_button]:!w-[50px] [&_button]:!h-[50px]">
                    <NavArrow 
                        direction='prev' 
                        onClick={prev} 
                        disabled={!canScroll} 
                    />
                    <NavArrow 
                        direction='next' 
                        onClick={next} 
                        disabled={!canScroll} 
                    />
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div 
                    className={`flex -mx-[10px] ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                    onTransitionEnd={handleTransitionEnd}
                    style={{ 
                        transform: `translateX(-${canScroll ? currentIndex * (100 / itemsPerPage) : 0}%)`,
                        /* hardware acceleration to prevent content-swap glitch */
                        willChange: 'transform'
                    }}
                >
                    {/* Logic for maintaining card size on desktop vs mobile */}
                    {(canScroll ? extendedData : (itemsPerPage === 1 ? data : [0, 1, 2])).map((item, i) => {
                        const cardData = canScroll ? (item as FamilyCard) : data[i];

                        return (
                            <div key={i} className="min-w-full md:min-w-[33.333%] px-[10px]">
                                {cardData ? (
                                    <Link href={cardData.href} className="group block h-full">
                                        <div className="antialiased subpixel-antialiased border border-light-gray bg-white aspect-[4/3] flex flex-col p-[20px] overflow-hidden">
                                            
                                            <div className="relative flex-grow w-full mb-4">
                                                <Image 
                                                    src={cardData.image} 
                                                    alt={cardData.title} 
                                                    fill 
                                                    className="object-contain group-hover:scale-110 transition-transform duration-300" 
                                                />
                                            </div>

                                            <div className="flex flex-col gap-[8px] text-left">
                                                <h3 className="text-black text-[20px] font-medium leading-tight group-hover:text-brand-hover-blue transition-colors">
                                                    {cardData.title}
                                                </h3>
                                                <p className="text-dark-gray font-regular text-[20px] leading-snug line-clamp-2">
                                                    {cardData.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    /* Placeholder to keep card size consistent on desktop */
                                    <div className="hidden md:block h-full w-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};