// components/ui/ActionButton.js
import React from 'react';

/**
 * @param {Object} props
 * @param {string} [props.text]
 * @param {any} [props.Icon]
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 * @param {string} [props.type] - Added for form support
 * @param {boolean} [props.disabled] - Added for loading states
 */
export default function ActionButton({ 
  text = '', 
  Icon, 
  onClick = () => {}, 
  className = '',
  type = 'button', // Default to button to prevent accidental form submits
  disabled = false,
  ...props // Capture any other standard button attributes
}) {
  const IconComponent = Icon;

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props} // Spread attributes like 'disabled' or 'type' here
      className={`antialiased subpixel-antialiased cursor-pointer bg-black text-white px-6 py-3 rounded-full text-[0.65rem] font-medium flex items-center space-x-2 hover:bg-brand-hover-blue transition-all duration-300 w-fit group disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {text && <span>{text}</span>}
      {IconComponent && (
        <IconComponent className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 antialiased subpixel-antialiased' />
      )}
    </button>
  );
}