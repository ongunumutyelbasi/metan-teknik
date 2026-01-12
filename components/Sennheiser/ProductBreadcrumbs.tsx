import Link from 'next/link';

interface BreadcrumbProps {
    category: string;
    productName?: string;
    className?: string;
}

export const Breadcrumbs = ({ category, productName, className = "mb-[1rem]" }: BreadcrumbProps) => (
    <nav aria-label='Breadcrumb navigation' className={`antialiased subpixel-antialiased flex items-center gap-1 text-[13px] text-dark-gray font-normal ${className}`}>
        
        {/* Home Icon */}
        <Link href='/sennheiser' className='antialiased subpixel-antialiased group flex items-center justify-center cursor-pointer h-fit'>
            <svg width='16' height='16' fill='none' viewBox='0 0 24 24' className='text-breadcrumbs-grey transition-colors duration-300 group-hover:text-brand-hover-blue -translate-y-[2.4px]'>
                <path fill='currentColor' d='M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z'></path>
            </svg>
        </Link>
        
        <span className='flex items-center'>/</span>
        
        {/* Ürünler Link */}
        <Link href='/sennheiser/urunler' className='antialiased subpixel-antialiased text-[14px] text-breadcrumbs-grey hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'>
            Ürünler
        </Link>
        
        <span className='flex items-center'>/</span>
        
        {/* Category Link (Mikrofonlar) */}
        <Link 
            href='/sennheiser/urunler/mikrofonlar' 
            className={`antialiased subpixel-antialiased text-[14px] transition-colors duration-200 hover:text-brand-hover-blue cursor-pointer ${
                productName ? 'text-breadcrumbs-grey' : 'text-black'
            }`}
        >
            {category}
        </Link>

        {/* Optional Product Link */}
        {productName && (
            <>
                <span className='flex items-center'>/</span>
                <Link 
                    href='#' // Replace with actual dynamic product link if available
                    className='antialiased subpixel-antialiased text-[14px] text-black hover:text-brand-hover-blue cursor-pointer transition-colors duration-200'
                >
                    {productName}
                </Link>
            </>
        )}
    </nav>
);