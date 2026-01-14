import Link from 'next/link';

interface BreadcrumbProps {
    category: string;
    categoryHref?: string; // New prop for custom category link
    productName?: string;
    productHref?: string;  // New prop for custom product link
    className?: string;
}

export const Breadcrumbs = ({ 
    category, 
    categoryHref = '/sennheiser/urunler/mikrofonlar', // Defaulting to your previous hardcoded link
    productName, 
    productHref = '#',
    className = "mb-[1rem]" 
}: BreadcrumbProps) => (
    <nav aria-label='Breadcrumb navigation' className={`antialiased subpixel-antialiased flex items-center gap-1 text-[13px] text-dark-gray font-normal ${className}`}>
        
        {/* Home Icon - Constant */}
        <Link href='/sennheiser' className='antialiased subpixel-antialiased group flex items-center justify-center cursor-pointer h-fit'>
            <svg width='16' height='16' fill='none' viewBox='0 0 24 24' className='text-breadcrumbs-grey transition-colors duration-300 group-hover:text-brand-hover-blue -translate-y-[2.4px]'>
                <path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path>
            </svg>
        </Link>
        
        <span className='flex items-center'>/</span>
        
        {/* Ürünler Link - Constant */}
        <Link href='/sennheiser/urunler' className='antialiased subpixel-antialiased text-[14px] text-breadcrumbs-grey hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>
            Ürünler
        </Link>
        
        <span className='flex items-center'>/</span>
        
        {/* Category Link - Dynamic */}
        <Link 
            href={categoryHref} 
            className={`antialiased subpixel-antialiased text-[14px] transition-colors duration-200 hover:text-brand-hover-blue cursor-pointer ${
                productName ? 'text-breadcrumbs-grey' : 'text-black'
            }`}
        >
            {category}
        </Link>

        {/* Optional Product Link - Dynamic */}
        {productName && (
            <>
                <span className='flex items-center'>/</span>
                <Link 
                    href={productHref} 
                    className='antialiased subpixel-antialiased text-[14px] text-black hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'
                >
                    {productName}
                </Link>
            </>
        )}
    </nav>
);