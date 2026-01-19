"use client";

import React from 'react';
import { Breadcrumbs } from './ProductBreadcrumbs';
import { ProductVariantPicker } from './ProductVariantPicker';
import ActionButton from '@/components/ui/ActionButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProductHeaderProps {
    productName: string;
    category: string;
    articleNo: string;
    variants?: { name: string; href: string }[];
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

                <div className='antialiased subpixel-antialiased text-[2.5rem] leading-[1.1] font-medium mb-[1rem] tracking-regular flex gap-1'>
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
                    
                    {variants && variants.length > 0 && (
                        <ProductVariantPicker 
                            variants={variants} 
                            currentProduct={productName} 
                        />
                    )}
                </div>
            </div>

            <div className='antialiased subpixel-antialiased px-[16px] pt-[50px] py-[16px] font-normal'>
                <div className='antialiased subpixel-antialiased max-w-full leading-[1.2]'>
                    {React.Children.map(children, (child) => {
                        // If the child is a raw string (your longDescription), parse it
                        if (typeof child === 'string') {
                            return (
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({node, ...props}) => (
                                            <p className="mb-4 last:mb-0 text-dark-gray" {...props} />
                                        ),
                                        strong: ({node, ...props}) => (
                                            <strong className="font-medium text-dark-gray" {...props} />
                                        ),
                                    }}
                                >
                                    {child}
                                </ReactMarkdown>
                            );
                        }
                        // If it's JSX (your shortDescription <p> tag), render as is
                        return child;
                    })}
                </div>
            </div>
        </div>
    );
};