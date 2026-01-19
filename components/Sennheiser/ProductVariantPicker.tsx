"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SecondaryButton from '@/components/ui/SecondaryButton';

interface Variant {
    name: string;
    href: string;
}

interface ProductVariantPickerProps {
    variants: Variant[];
    currentProduct: string;
}

export const ProductVariantPicker = ({ variants, currentProduct }: ProductVariantPickerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!variants || variants.length === 0) return null;

    return (
        <div className='relative'>
            {/* Backdrop Overlay */}
            {isOpen && (
                <div 
                    className='fixed inset-0 z-40 cursor-default' 
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drop-up Menu */}
            {isOpen && (
                <div className='absolute bottom-full mb-2 left-0 w-full min-w-[200px] bg-white border border-light-gray rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300'>
                    <div className='flex flex-col py-0'>
                        {variants.map((variant) => {
                            const isActive = variant.name.toUpperCase() === currentProduct.toUpperCase();

                            return (
                                <Link 
                                    key={variant.href}
                                    href={variant.href}
                                    onClick={(e) => isActive && e.preventDefault()}
                                    className={`px-4 py-3 text-[13px] font-medium uppercase transition-colors duration-200 leading-[1.2] flex items-center justify-between ${
                                        isActive 
                                            ? 'text-brand-hover-blue cursor-default pointer-events-none'
                                            : 'text-black hover:bg-sennheiser-gray cursor-pointer'
                                    }`}
                                >
                                    <span>{variant.name}</span>
                                    {isActive && (
                                        <div className='w-1.5 h-1.5 rounded-full bg-brand-hover-blue shrink-0 ml-4' />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Trigger Button */}
            <SecondaryButton 
                text='Varyant değiştir' 
                Icon={ChevronDown}
                className={`w-[140px] h-[54px] justify-center transition-all duration-300 z-50 relative
                    ${isOpen 
                        ? '!bg-brand-hover-blue !text-white [&_svg]:rotate-180' 
                        : 'hover:bg-brand-hover-blue hover:text-white'
                    } 
                    [&_svg]:group-hover:translate-x-0 [&_svg]:group-hover:translate-y-0`} 
                onClick={() => setIsOpen(!isOpen)}
            />
        </div>
    );
};