import Link from 'next/link';
import React from 'react';

export const BrandsDropdown = () => {
  const brands = [
    { 
      name: "METAN TEKNİK", 
      href: "/", 
      logo: "/images/metan-icon.png", 
      hoverColor: "#df532b" 
    },
    { 
      name: "SENNHEISER", 
      href: "/sennheiser", 
      logo: "/images/SVG/sennheiser-icon.svg", 
      hoverColor: "#057cc3" 
    },
    { 
      name: "NEUMANN", 
      href: "/neumann", 
      logo: "/images/SVG/neumann-inverse-icon.svg", 
      hoverColor: "#ef7622" 
    },
    { 
      name: "MERGING", 
      href: "/merging", 
      logo: "/images/SVG/merging-icon.svg", 
      hoverColor: "#e30613" 
    },
];

  return (
    <div className="relative group">
      <button className="h-[52px] px-6 cursor-pointer flex items-center rounded-full bg-[#f4f4f6] text-[#5d5b5c] text-[13px] font-medium transition-all duration-300 hover:text-black">
        Markalar
        <svg className="ml-2 w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Container: w-max ensures it only fits the longest name */}
      <div className="absolute right-0 top-full mt-2 w-max bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border border-gray-100 p-2">
        {brands.map((brand) => (
          <Link 
            key={brand.name} 
            href={brand.href} 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 group/brand"
            // Set the variable on the Link so the child div can use it
            style={{ '--brand-hover': brand.hoverColor } as React.CSSProperties}
          >
            {/* SVG Logo - w-5 h-5 */}
            <div 
              className="w-5 h-5 transition-colors duration-300 bg-[#b3b8be] group-hover/brand:bg-[var(--brand-hover)]"
              style={{
                maskImage: `url(${brand.logo})`,
                WebkitMaskImage: `url(${brand.logo})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
            <span className="text-[13px] font-medium text-[#5d5b5c] whitespace-nowrap group-hover/brand:text-black transition-colors">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SearchButton = ({ hoverClass }: { hoverClass: string }) => (
  <button className={`w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[#f4f4f6] text-[#545252] transition-all duration-300 ${hoverClass} hover:text-white`}>
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
      <path d="M1.44141 2.125C2.37891 1.1875 3.56641 0.75 4.75391 0.75C5.94141 0.75 7.12891 1.1875 8.06641 2.125C9.75391 3.8125 9.87891 6.4375 8.50391 8.25L13.6289 13.375L12.7539 14.25L7.62891 9.125C6.81641 9.75 5.81641 10.0625 4.81641 10.0625C3.62891 10.0625 2.44141 9.625 1.50391 8.6875C-0.371095 6.9375 -0.371094 3.9375 1.44141 2.125ZM2.31641 7.875C2.94141 8.5 3.81641 8.875 4.75391 8.875C5.69141 8.875 6.56641 8.5 7.19141 7.875C7.81641 7.25 8.19141 6.375 8.19141 5.4375C8.19141 4.5 7.81641 3.625 7.19141 3C6.56641 2.375 5.69141 2 4.75391 2C3.81641 2 2.94141 2.375 2.31641 3C1.00391 4.375 1.00391 6.5625 2.31641 7.875Z" fill="currentColor"/>
    </svg>
  </button>
);