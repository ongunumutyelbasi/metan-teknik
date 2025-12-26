// components/ui/ActionButton.js
import React from 'react';

/**
 * @param {Object} props
 * @param {string} [props.text]
 * @param {any} [props.Icon] - Marked as optional for TypeScript/TSX
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
export default function ActionButton({ 
  text = '', 
  Icon, 
  onClick = () => {}, 
  className = '' 
}) {
  const IconComponent = Icon;

  return (
    <button 
      onClick={onClick}
      className={`cursor-pointer bg-black text-white px-6 py-3 rounded-full text-[0.65rem] font-semibold flex items-center space-x-2 hover:bg-brand-hover-blue transition-all w-fit group tracking-tight ${className}`}
    >
      {text && <span>{text}</span>}
      {IconComponent && (
        <IconComponent className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
      )}
    </button>
  );
}