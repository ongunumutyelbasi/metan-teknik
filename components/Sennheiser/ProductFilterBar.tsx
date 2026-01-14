import React from 'react';
import { FilterDropdown } from './FilterDropdown';

interface ProductFilterBarProps {
    // Search Props
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (val: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    searchRef: React.RefObject<HTMLDivElement | null>;
    isFocused: boolean;
    setIsFocused: (val: boolean) => void;
    // Filter Props
    hasActiveFilters: boolean;
    resetFilters: () => void;
    // The "Slot" for your dropdowns
    children: React.ReactNode; 
}

export function ProductFilterBar({
    searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
    inputRef, searchRef, isFocused, setIsFocused,
    hasActiveFilters, resetFilters, children
}: ProductFilterBarProps) {
    return (
        <div className="sticky top-[76px] z-30 backdrop-blur-md border-sennheiser-gray px-[20px] py-4">
            <div className="max-w-full mx-auto flex items-center gap-[4px] h-[36px]">
                <span className="antialiased text-grey-on-light mr-1 text-[0.65rem] font-normal">
                    Filtreler:
                </span>

                {/* Search Container Logic (Keep your existing JSX here) */}
                <div 
                    ref={searchRef}
                    className={`relative flex items-center h-[36px] transition-all duration-500 ease-in-out leading-none antialiased subpixel-antialiased rounded-full overflow-hidden shrink-0 ${
                        isSearchOpen 
                            ? 'max-w-[300px] bg-sennheiser-gray' 
                            : 'max-w-[36px] bg-sennheiser-gray'
                    }`}
                >
                    {/* 1. Magnifying Glass (Fixed Width) */}  
                    <div className="w-[36px] min-w-[36px] h-[36px] flex items-center justify-center shrink-0">
                        <button
                            type="button"
                            onClick={() => {
                                const nextState = !isSearchOpen;
                                setIsSearchOpen(nextState);
                                // Backup focus trigger
                                if (nextState) {
                                    setTimeout(() => inputRef.current?.focus(), 150);
                                }
                            }}
                            className="group flex cursor-pointer items-center justify-center w-full h-full"
                        >
                            <svg width="12" height="12" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M1.44141 2.125C2.37891 1.1875 3.56641 0.75 4.75391 0.75C5.94141 0.75 7.12891 1.1875 8.06641 2.125C9.75391 3.8125 9.87891 6.4375 8.50391 8.25L13.6289 13.375L12.7539 14.25L7.62891 9.125C6.81641 9.75 5.81641 10.0625 4.81641 10.0625C3.62891 10.0625 2.44141 9.625 1.50391 8.6875C-0.371095 6.9375 -0.371094 3.9375 1.44141 2.125ZM2.31641 7.875C2.94141 8.5 3.81641 8.875 4.75391 8.875C5.69141 8.875 6.56641 8.5 7.19141 7.875C7.81641 7.25 8.19141 6.375 8.19141 5.4375C8.19141 4.5 7.81641 3.625 7.19141 3C6.56641 2.375 5.69141 2 4.75391 2C3.81641 2 2.94141 2.375 2.31641 3C1.00391 4.375 1.00391 6.5625 2.31641 7.875Z" 
                                    className="fill-[#545252] group-hover:fill-brand-hover-blue transition-colors duration-300" 
                                />
                            </svg>
                        </button>
                    </div>

                    {/* 2. Input Field 
                        - Fixed width when open ensures the container has a target size to grow into.
                    */}
                    <div 
                        className={`flex items-center h-[22px] transition-all duration-500 ease-in-out border-b-[0.5px] overflow-hidden ${
                            isSearchOpen ? 'w-[180px] opacity-100' : 'w-0 opacity-0 border-transparent'
                        }`}
                        style={{ 
                            marginBottom: '6px',
                            borderBottomColor: isFocused ? 'var(--color-brand-hover-blue)' : 'black'
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Ara"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-transparent text-[12px] focus:outline-none pt-[8px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* 3. X Button Group */}
                    <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden shrink-0 ${
                        isSearchOpen && searchQuery.length > 0 ? 'w-[28px]' : 'w-0'
                    }`}>
                        <div className="w-2 shrink-0" />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery("");
                                setIsSearchOpen(false);
                            }}
                            // Using text color classes so the SVG can inherit "currentColor"
                            className="w-[20px] h-[36px] cursor-pointer flex items-center justify-center shrink-0 text-black hover:text-black transition-colors"
                        >
                            {/* Changed width/height to 12 to make it easier to see, and updated viewBox to 32 32 */}
                            <svg 
                                width="12" 
                                height="12" 
                                viewBox="0 0 32 32" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M13.84 16.36l-13.552 13.551 1.887 1.887 13.552-13.551 14.128 14.128 1.887-1.887-14.128-14.128 14.128-14.128-1.887-1.887-14.128 14.128-13.552-13.551-1.887 1.887 13.552 13.551z" 
                                    fill="currentColor" 
                                />
                            </svg>
                        </button>
                    </div>

                    {/* 4. Right-side Padding */}
                    <div className={`transition-all duration-500 ease-in-out shrink-0 ${
                            isSearchOpen ? 'w-3' : 'w-0'
                        }`} />
                </div>

                {children}

                {hasActiveFilters && (
                    <button 
                        type="button" 
                        onClick={resetFilters} 
                        className="w-[36px] h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer rounded-full border border-sennheiser-gray bg-sennheiser-gray hover:bg-brand-hover-blue group transition-all shrink-0"
                    >
                        <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 32 32" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M13.84 16.36L0.288 29.911L2.175 31.798L15.727 18.247L29.855 32.375L31.742 30.488L17.614 16.36L31.742 2.232L29.855 0.345L15.727 14.473L2.175 0.922L0.288 2.809L13.84 16.36Z" 
                                className="fill-[#545252] group-hover:fill-white transition-colors"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}