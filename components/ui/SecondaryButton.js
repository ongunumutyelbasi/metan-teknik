// components/ui/SecondaryButton.js
import React from 'react';

/**
 * @param {Object} props
 * @param {string} [props.text]
 * @param {any} [props.Icon] - Marked as optional for TypeScript/TSX
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
export default function SecondaryButton({ 
  text = '', 
  Icon, 
  onClick = () => {}, 
  className = '' 
}) {
  const IconComponent = Icon;

  return (
    <button 
      onClick={onClick}
      className={`antialiased subpixel-antialiased cursor-pointer bg-sennheiser-gray text-black px-4 py-3 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue hover:text-white transition-all duration-300 w-fit group tracking-tight ${className}`}
    >
      {text && <span>{text}</span>}
      {IconComponent && (
        <IconComponent className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
      )}
    </button>
  );
}