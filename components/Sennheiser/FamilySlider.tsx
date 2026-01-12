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

    const next = () => {
        setCurrentIndex((prev) => prev + itemsPerPage);
    };

    const prev = () => {
        setCurrentIndex((prev) => prev - itemsPerPage);
    };

    // 4. Teleportation logic for the endless loop
    const handleTransitionEnd = () => {
        if (currentIndex >= data.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - data.length);
        } else if (currentIndex < data.length) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + data.length);
        }
    };

    useEffect(() => {
        if (!isTransitioning) {
            const timeout = setTimeout(() => setIsTransitioning(true), 20);
            return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    return (
        <section className="antialiased subpixel-antialiased w-full pb-12 md:pb-16 px-[20px] bg-white overflow-hidden">
            <div className="flex justify-between items-center mb-[20px]">
                <h2 className="antialiased subpixel-antialiased leading-none text-[50px] font-medium">
                    {title}
                </h2>
                <div className='flex gap-[4px] [&_button]:!w-[50px] [&_button]:!h-[50px]'>
                    <NavArrow direction='prev' onClick={prev} />
                    <NavArrow direction='next' onClick={next} />
                </div>
            </div>

            <div className="relative">
                <div 
                    className={`flex -mx-[10px] ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                    onTransitionEnd={handleTransitionEnd}
                    style={{ 
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` 
                    }}
                >
                    {extendedData.map((item, i) => (
                        <div key={i} className="min-w-full md:min-w-[33.333%] px-[10px]">
                            <Link href={item.href} className="group block h-full">
                                {/* The main rectangle container */}
                                <div className="antialiased subpixel-antialiased border border-light-gray bg-white aspect-[4/3] flex flex-col p-[20px] overflow-hidden">
                                    
                                    {/* 1. Image container - grows to fill space above text */}
                                    <div className="relative flex-grow w-full mb-4">
                                        <Image 
                                            src={item.image} 
                                            alt={item.title} 
                                            fill 
                                            className="object-contain group-hover:scale-110 transition-transform duration-300" 
                                        />
                                    </div>

                                    {/* 2. Text Content - naturally stays at the bottom */}
                                    <div className="flex flex-col gap-[8px] text-left">
                                        <h3 className="text-black text-[20px] font-medium leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-dark-gray font-regular text-[20px] leading-snug line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};