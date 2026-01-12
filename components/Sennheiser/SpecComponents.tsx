import React from 'react';

// The Individual Row
export const SpecRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <li className="h-[56px] grid grid-cols-[30%_70%] items-center border-b border-light-gray transition-colors duration-300 group cursor-default">
    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-dark-gray leading-[1.2]">
      {label}
    </span>
    <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">
      {value}
    </span>
  </li>
);

// The Category Section
export const SpecSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <>
    <div className="text-[.65rem] border-b border-black font-medium text-black py-[20px]">
      {title}
    </div>
    <ul className="list-none p-0 m-0">
      {children}
    </ul>
  </>
);