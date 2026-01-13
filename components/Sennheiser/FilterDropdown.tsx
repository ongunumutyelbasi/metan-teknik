"use client";

import React, { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
    title: string;
    items: string[];
    selectedItems: string[];
    onSelectionChange: (selected: string[]) => void;
}

export function FilterDropdown({ title, items, selectedItems, onSelectionChange }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [leftOffset, setLeftOffset] = useState<string>("0px");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleItem = (item: string) => {
        const newSelection = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];
        
        onSelectionChange(newSelection);
    };

    useEffect(() => {
        if (isOpen && dropdownRef.current && menuRef.current) {
            const buttonRect = dropdownRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            
            const viewportWidth = window.innerWidth;
            const padding = 20; // Padding from screen edge
            
            // Calculate where the right edge would be if left aligned
            const expectedRightEdge = buttonRect.left + menuRect.width;

            if (expectedRightEdge > viewportWidth - padding) {
                // Calculate how much it's overflowing
                const overflow = expectedRightEdge - (viewportWidth - padding);
                setLeftOffset(`-${overflow}px`);
            } else {
                setLeftOffset("0px");
            }
        }
    }, [isOpen, items]); // Re-run if items change

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    h-[36px] px-[20px] flex items-center gap-2 rounded-full border border-sennheiser-gray cursor-pointer
                    transition-all duration-200 text-[.65rem] font-medium leading-none antialiased subpixel-antialiased
                    ${isOpen || selectedItems.length > 0
                        ? 'bg-sennheiser-gray hover:bg-brand-hover-blue hover:text-white border-transparent' 
                        : 'bg-sennheiser-gray hover:text-white hover:bg-brand-hover-blue border-transparent'
                    }
                `}
            >
                {selectedItems.length > 0 ? `${title} (${selectedItems.length})` : title}
                <svg width="6" height="6" viewBox="0 0 32 32" fill="none" className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <path d="M1.1,1.1l15,29.9L30.9,1.1H1.1z" fill="currentColor" />
                </svg>
            </button>

            {isOpen && (
                <div 
                    ref={menuRef}
                    style={{ left: leftOffset }}
                    className="absolute top-[41px] z-50 w-max max-w-[320px] md:max-w-[500px] lg:max-w-[600px]"
                >
                    <div className="flex flex-wrap gap-1">
                        {items.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => toggleItem(item)}
                                className={`
                                    py-1.5 px-2 flex items-center justify-center rounded-full border cursor-pointer leading-none
                                    transition-all duration-200 text-[.65rem] font-medium whitespace-nowrap antialiased subpixel-antialiased
                                    
                                    /* Base Transition & Hover (Priority) */
                                    hover:bg-brand-hover-blue hover:text-white hover:border-transparent
                                    
                                    /* Dynamic Selection Logic */
                                    ${selectedItems.includes(item) 
                                        ? 'bg-white border-brand-hover-blue text-brand-hover-blue' 
                                        : 'bg-white border-sennheiser-gray text-black'
                                    }
                                `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}