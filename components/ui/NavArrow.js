// components/ui/NavArrow.js
import React from 'react';

export default function NavArrow({ 
  direction = 'next', 
  onClick, 
  disabled = false 
}) {
  const paths = {
    prev: 'M20.957 0.344l1.958 1.958-14.058 14.058 14.058 14.058-1.958 1.958-16.017-16.014 16.017-16.017z',
    next: 'M11.075 0.344l-1.958 1.958 14.058 14.058-14.058 14.058 1.958 1.958 16.017-16.014-16.017-16.017z'
  };

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction} slide`}
      className={`
        cursor-pointer group rounded-full flex items-center justify-center 
        transition-all duration-[200ms] ease-in-out
        w-[50px] aspect-square
        /* Inactive/Base State */
        bg-[#f4f4f6] 
        /* Hover State */
        hover:enabled:bg-brand-hover-blue 
        /* Active/Pressed State */
        active:enabled:bg-brand-hover-blue/90
        /* Disabled State */
        disabled:bg-[#f4f4f6] disabled:cursor-default
      `}
    >
      <svg 
        width='12' 
        height='12' 
        viewBox='0 0 32 32' 
        /* This class handles the icon color swap */
        className='transition-colors duration-[200ms] fill-[#5d5e63] group-disabled:fill-[#adadad] group-hover:fill-white group-hover-disabled:fill-disabled-gray shrink-0'
      >
        <path d={paths[direction]}></path>
      </svg>
    </button>
  );
}