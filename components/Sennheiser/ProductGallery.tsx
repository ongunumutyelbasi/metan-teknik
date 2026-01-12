// components/Sennheiser/ProductGallery.tsx
import Image from 'next/image';
import PaginationCounter from '@/components/ui/PaginationCounter';
import NavArrow from '@/components/ui/NavArrow';

interface GalleryProps {
    images: string[];
    currentImg: number;
    onNext: () => void;
    onPrev: () => void;
}

export const ProductGallery = ({ images, currentImg, onNext, onPrev }: GalleryProps) => (
    <div className='w-1/2 bg-light-gray relative'>
        <div className='sticky top-0 h-[calc(100vh-68px)] flex flex-col items-center justify-center overflow-hidden'>
            <div
                className='relative w-full h-full max-w-[675px] aspect-square flex transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={index} className='relative min-w-full h-full'>
                        <Image
                            src={src}
                            alt={`Product view ${index + 1}`}
                            fill
                            className='object-contain mix-blend-multiply pt-12 px-12'
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className='absolute bottom-[20px] right-[20px] font-sennheiser flex items-center gap-[4px] z-30'>
                <PaginationCounter current={currentImg + 1} total={images.length} />
                <div className='flex gap-[4px]'>
                    <NavArrow direction='prev' onClick={onPrev} disabled={currentImg === 0} />
                    <NavArrow direction='next' onClick={onNext} disabled={currentImg === images.length - 1} />
                </div>
            </div>
        </div>
    </div>
);