// components/Sennheiser/ProductDownloads.tsx
import { SquareArrowOutUpRight } from 'lucide-react';

export const ProductDownloads = ({ href }: { href: string }) => (
    <div id="indirmeler" className="min-h-none">
        <section className='w-full'>
            <div className='max-w-full mx-auto'>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group no-underline transition-colors duration-300'
                >
                    <div className="flex items-center">
                        <h2 className='antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black flex items-top gap-3'>
                            İndirmeler
                            <SquareArrowOutUpRight className="w-3 h-3 text-black transition-all duration-300" strokeWidth={2.5} />
                        </h2>
                    </div>
                    <div className='flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full transition-all duration-300 bg-sennheiser-gray text-black'>
                        <svg viewBox='0 0 32 32' className='w-[12px] h-[12px] fill-current' xmlns='http://www.w3.org/2000/svg'>
                            <path d="M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </section>
    </div>
);