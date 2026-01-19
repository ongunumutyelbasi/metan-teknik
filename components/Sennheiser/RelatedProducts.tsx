import Link from 'next/link';
import Image from 'next/image';

interface Product {
  item: string;
  href: string; // This is being used as the Image src
  link: string; // This is being used as the Link href
}

interface RelatedProductsProps {
  products: Product[];
  // isOpen: boolean;
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-[20px] pt-[20px]">
      {products
        .filter((product) => product && product.link && product.href)
        .map((product, idx) => (
          <Link
            key={idx}
            href={product.link}
            className="group flex flex-col gap-3 cursor-pointer"
          >
            <div className="aspect-square w-full border-b border-light-gray bg-light-gray flex items-center justify-center transition-all duration-200 group-hover:border-brand-hover-blue relative overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={product.href}
                  alt={product.item}
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>
            <div className="antialiased subpixel-antialiased text-[0.65rem] font-regular leading-[1.2] text-black transition-all duration-200 group-hover:text-brand-hover-blue">
              {product.item}
            </div>
          </Link>
        ))}
    </div>
  );
};