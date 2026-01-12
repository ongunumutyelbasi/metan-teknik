"use client";

import React from 'react';
import { Breadcrumbs } from './ProductBreadcrumbs';
import { ProductVariantPicker } from './ProductVariantPicker';
import ActionButton from '@/components/ui/ActionButton';

interface ProductHeaderProps {
    productName: string;
    category: string;
    articleNo: string;
    variants: { name: string; href: string }[];
    onPurchaseClick: () => void;
    children: React.ReactNode; // This will hold your description text
}

export const ProductHeader = ({
    productName,
    category,
    articleNo,
    variants,
    onPurchaseClick,
    children
}: ProductHeaderProps) => {
    return (
        <div className='w-1/2'>
            <div className='h-[calc(100vh-68px)] flex flex-col px-[20px] pb-[20px] pt-20 justify-end'>
                <Breadcrumbs category={category} productName={productName} />

                <div className='antialiased subpixel-antialiased text-[2.5rem] leading-[0.85] font-medium mb-[1rem] tracking-regular flex gap-1'>
                    <span>{productName}</span>
                </div>
                
                <div className='antialiased subpixel-antialiased text-[1rem] text-dark-gray mb-[0.75rem] font-normal flex gap-1'>
                    <span>Ürün Kodu:</span>
                    <span>{articleNo}</span>
                </div>

                <div className='flex items-center gap-[6px]'>
                    <ActionButton 
                        text='Satın al' 
                        className='w-[140px] h-[54px] justify-center' 
                        onClick={onPurchaseClick}
                    />
                    
                    <ProductVariantPicker 
                        variants={variants} 
                        currentProduct={productName} 
                    />
                </div>
            </div>

            <div className='antialiased subpixel-antialiased px-[16px] pt-[50px] py-[16px] font-normal'>
                <div className='antialiased subpixel-antialiased max-w-full'>
                    {children}
                </div>
            </div>
        </div>
    );
};