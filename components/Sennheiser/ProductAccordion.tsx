import React from 'react';

interface AccordionSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  badgeCount?: string; // Optional for the "Kutu İçeriği" count
}

export const AccordionSection = ({ 
  id, 
  title, 
  isOpen, 
  onToggle, 
  children, 
  badgeCount 
}: AccordionSectionProps) => {
  return (
    <div id={id} className="w-full scroll-mt-[50px]">
      <section className="w-full">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div
            onClick={() => onToggle(id)}
            className="flex items-center w-full border-light-gray border-b justify-between pt-[30px] pb-[20px] cursor-pointer group"
          >
            <h2 className="antialiased subpixel-antialiased px-[20px] text-[2.5rem] md:text-[2.5rem] font-medium leading-none tracking-tight text-black">
              {title}
              {badgeCount && (
                <span className="antialiased subpixel-antialiased text-[20px] ml-2 align-top leading-none text-black font-medium">
                  {badgeCount}
                </span>
              )}
            </h2>
            <div className="flex items-center mx-[20px] justify-center w-[50px] h-[50px] rounded-full bg-sennheiser-gray text-black">
              <svg
                viewBox="0 0 32 32"
                className={`w-[12px] h-[12px] fill-current transition-transform duration-500 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 11.419l1.958-1.958 14.058 14.058 14.058-14.058 1.958 1.958-16.014 16.017-16.017-16.017z"></path>
              </svg>
            </div>
          </div>

          {/* Content Area */}
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-[5000px] pb-[40px] border-b border-light-gray' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col px-[20px]">
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};