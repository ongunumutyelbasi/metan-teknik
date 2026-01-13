"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
import Image from 'next/image';
import { sennheiserProducts } from '@/src/data/sennheiser-products';
import { Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
import { APPLICATION_TYPES, MICROPHONE_FORMS, PICKUP_PATTERN, TRANSDUCER_TYPE, CONNECTION, CONNECTOR, PRODUCT_SERIES } from '@/src/types/product-schema';

export default function MicrophonesPage() {
    
    const normalizeString = (str: string) => {
        // 1. Convert to lowercase
        // 2. Remove all spaces, hyphens, and special characters
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const [filters, setFilters] = useState({
        applicationTypes: [] as string[],
        microphoneForm: [] as string[],
        pickupPattern: [] as string[],
        transducerType: [] as string[],
        connection: [] as string[],
        connectors: [] as string[],
        productSeries: [] as string[],
    });

    // A simple function to clear everything
    const resetFilters = () => {
        // 1. Clear all the dropdown arrays
        setFilters({
            applicationTypes: [],
            microphoneForm: [],
            pickupPattern: [],
            transducerType: [],
            connection: [],
            connectors: [],
            productSeries: [],
        });

        setSearchQuery(""); // 2. Clear the search text
        setIsSearchOpen(false);  // 3. Close the expanded search bar UI

        // 4. Remove focus from the input (optional but cleaner)
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const { scrollToSection } = useProductUI();

    // State for Search and Filtering
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // This checks if any part of the filter state is "active"
    const hasActiveFilters = useMemo(() => {
        // Check if any dropdown array has at least one item
        const dropdownsActive = Object.values(filters).some(arr => arr.length > 0);
        // Check if search has text
        const searchActive = searchQuery.trim().length > 0;
        
        return dropdownsActive || searchActive;
    }, [filters, searchQuery]);

    const applicationTypes = [...APPLICATION_TYPES];
    const microphoneForm = [...MICROPHONE_FORMS];
    const pickupPattern = [...PICKUP_PATTERN];
    const transducerType = [...TRANSDUCER_TYPE];
    const connection = [...CONNECTION];
    const connectors = [...CONNECTOR];
    const productSeries = [...PRODUCT_SERIES];
    
    // Ref for detecting clicks outside the search bar
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    // Close search when clicking anywhere else
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                // Now this will correctly see the current text
                if (searchQuery.trim().length === 0) {
                    setIsSearchOpen(false);
                    inputRef.current?.blur();
                }
            }
        };

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
        
    }, [isSearchOpen, searchRef, inputRef, searchQuery]);

    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
        
    }, [isDropdownOpen, dropdownRef]);

    // Get unique categories from the product data
    const categories = useMemo(() => {
        const cats = sennheiserProducts.map(p => p.category);
        return ["All", ...Array.from(new Set(cats))];
    }, []);

    const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        // 1. If there's no search and no filters, return everything
        if (!searchQuery && !hasActiveFilters) return sennheiserProducts;

        let results = [...sennheiserProducts];

        // 2. Apply Fuzzy Search first if there's a query
        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(results, {
                keys: ['name', 'articleNo', 'productSeries'],
                threshold: 0.3, 
                distance: 100,
            });
            results = fuse.search(searchQuery).map(result => result.item);
        }

        // 3. Apply all 7 Pill Filters
        return results.filter(product => {
            // Safety Fallbacks (matches the Array types in your interface)
            const pApps = product.applicationTypes ?? [];
            const pForm = product.microphoneForm ?? []; 
            const pPattern = product.pickupPattern ?? [];
            const pTransducer = product.transducerType ?? "";
            const pConnection = product.connection ?? "";
            const pConnectors = product.connectors ?? [];
            const pSeries = product.productSeries ?? [];

            // Application Types (Multiple Selection - Match any)
            const matchesApplication = filters.applicationTypes.length === 0 || 
                filters.applicationTypes.some(type => pApps.includes(type));
            
            // Microphone Form (Match any selected form against product forms array)
            const matchesForm = filters.microphoneForm.length === 0 || 
                filters.microphoneForm.some(selectedForm => pForm.includes(selectedForm));

            // Pickup Pattern (Multiple Selection - Match any)
            const matchesPattern = filters.pickupPattern.length === 0 ||
                filters.pickupPattern.some(pattern => pPattern.includes(pattern));

            // Transducer Type (Checks if the product's type is in the selected filters array)
            const matchesTransducer = filters.transducerType.length === 0 ||
                filters.transducerType.some(pattern => pTransducer.includes(pattern));

            // Connection (Checks if the product's connection is in the selected filters array)
            const matchesConnection = filters.connection.length === 0 ||
                filters.connection.includes(pConnection);

            // Connectors (Multiple Selection - Match any)
            const matchesConnectors = filters.connectors.length === 0 ||
                filters.connectors.some(conn => pConnectors.includes(conn));

            // Product Series (Multiple Selection - Match any)
            const matchesSeries = filters.productSeries.length === 0 ||
                filters.productSeries.some(series => pSeries.includes(series));

            // Product must pass ALL active filter categories
            return (
                matchesApplication && 
                matchesForm && 
                matchesPattern && 
                matchesTransducer && 
                matchesConnection && 
                matchesConnectors && 
                matchesSeries
            );
        });
    }, [searchQuery, filters, hasActiveFilters, sennheiserProducts]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(24);

    // Reset to page 1 whenever filters or search change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const relatedSeries: FamilyCard[] = [
        { title: "evolution", description: "Bu serideki tüm mikrofonların ortak noktası; etkileyici ses performansı, yapılan işe tam uyum ve üstün dayanıklılıktır. Alman mühendisliğinin en iyi geleneklerine sadık kalınarak tasarlanan bu ürünler; mühendislerimizin özverisinin, sayısız testin ve en titiz üretim süreçlerinin bir sonucudur.", image: "/images/sennheiser/mikrofonlar-sayfasi/evolution.avif", href: "/ev" },
        { title: "MK Series", description: "Yetenekleri şaşırtan performans. Kayıtlarınız için en doğru mikrofon.", image: "/images/sennheiser/mikrofonlar-sayfasi/mk.avif", href: "/mk" },
        { title: "MKH", description: "Sahici sesin peşinde", image: "/images/sennheiser/mikrofonlar-sayfasi/mkh.avif", href: "/d6k" },
        { title: "Profile", description: "İçerik üreticileri için en az eforla en yüksek ses kalitesi", image: "/images/sennheiser/mikrofonlar-sayfasi/profile.avif", href: "/ev" },
        { title: "TeamConnect Ceiling Solutions", description: "Sesiniz dünyadaki her odadan duyulsun!", image: "/images/sennheiser/mikrofonlar-sayfasi/teamconnect-ceiling-solutions.avif", href: "/mk" },
    ];

    return (
        <div className="min-h-screen bg-white font-sennheiser selection:bg-black selection:text-white">
            {/* 1. Hero Section */}
            <section data-nav-color="light" className="relative w-full h-[500px] overflow-hidden">
                <Image 
                    src="/images/sennheiser/hero-sections/microphones_pageHero.webp"
                    alt="Sennheiser Hero"
                    fill
                    priority 
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-[90px] px-[20px] text-white antialiased subpixel-antialiased">
                    <div className="max-w-full text-left pb-[0px] md:pb-0">
                        <h1 className="text-[50px] leading-[1.1] pb-[20px] font-medium [hyphens:auto]">
                            Mikrofonlar
                        </h1>
                        <p className="text-[32px] leading-[1.1] opacity-75 font-medium [hyphens:auto]">
                            Sahne, stüdyo, konferans salonu, oditoryum ve daha fazı için efsanevi istikrar...
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Mikrofonlar" className="mb-0" />
                </div>
            </main>

            {/* 3. Series Slider */}
            <section className="max-w-full pb-0 pt-[70px] antialiased subpixel-antialiased">
                <FamilySlider 
                    title="Mikrofon serilerimizi keşfedin" 
                    data={relatedSeries} 
                />
            </section>

            {/* 4. Product Title & Filter Bar */}
            <section id="products">
                <div className="max-w-full px-[20px] pt-[30px] pb-[1rem] flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-[50px] font-medium leading-none antialiased subpixel-antialiased">
                        Ürünler
                    </h2>
                </div>

                {/* Filter & Search Bar Row */}
                <div className="sticky top-[76px] z-30 backdrop-blur-md border-b border-light-gray px-[20px] py-4">
                    <div className="max-w-full mx-auto flex items-center gap-[4px] h-[36px]">
                        
                        {/* Search Container */}
                        <div 
                            ref={searchRef}
                            className={`relative flex items-center h-[36px] transition-all duration-500 ease-in-out leading-none antialiased subpixel-antialiased rounded-full overflow-hidden shrink-0 ${
                                isSearchOpen 
                                    ? 'max-w-[300px] bg-light-gray' 
                                    : 'max-w-[36px] bg-light-gray'
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
                                <div className="w-2 cursor-pointer shrink-0" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery("");
                                        setIsSearchOpen(false);
                                    }}
                                    className="w-[20px] h-[36px] flex items-center justify-center shrink-0"
                                >
                                    <svg width="10" height="10" viewBox="0 0 32 32"><path d="M13.84 16.36l-13.552 13.551 1.887 1.887 13.552-13.551 14.128 14.128 1.887-1.887-14.128-14.128 14.128-14.128-1.887-1.887-14.128 14.128-13.552-13.551-1.887 1.887 13.552 13.551z" fill="#545252" /></svg>
                                </button>
                            </div>

                            {/* 4. Right-side Padding */}
                            <div className={`transition-all duration-500 ease-in-out shrink-0 ${
                                    isSearchOpen ? 'w-3' : 'w-0'
                                }`} />
                        </div>

                        {/* Dropdown Filters */}
                        <FilterDropdown 
                            title="Uygulama türü" 
                            items={applicationTypes} 
                            selectedItems={filters.applicationTypes}
                            onSelectionChange={(val) => setFilters({...filters, applicationTypes: val})}
                        />
                        <FilterDropdown 
                            title="Mikrofon formu" 
                            items={microphoneForm} 
                            selectedItems={filters.microphoneForm}
                            onSelectionChange={(val) => setFilters({...filters, microphoneForm: val})}
                        />
                        <FilterDropdown 
                            title="Kutup deseni" 
                            items={pickupPattern} 
                            selectedItems={filters.pickupPattern}
                            onSelectionChange={(val) => setFilters({...filters, pickupPattern: val})}
                        />
                        <FilterDropdown 
                            title="Transformatör tipi" 
                            items={transducerType} 
                            selectedItems={filters.transducerType}
                            onSelectionChange={(val) => setFilters({...filters, transducerType: val})}
                        />
                        <FilterDropdown 
                            title="Bağlantı" 
                            items={connection} 
                            selectedItems={filters.connection}
                            onSelectionChange={(val) => setFilters({...filters, connection: val})}
                        />
                        <FilterDropdown 
                            title="Konektörler" 
                            items={connectors} 
                            selectedItems={filters.connectors}
                            onSelectionChange={(val) => setFilters({...filters, connectors: val})}
                        />
                        <FilterDropdown 
                            title="Ürün serisi" 
                            items={productSeries} 
                            selectedItems={filters.productSeries}
                            onSelectionChange={(val) => setFilters({...filters, productSeries: val})}
                        />

                        {/* Only render the button if something is selected or searched */}
                        {hasActiveFilters && (
                            /* RESET FILTERS BUTTON */
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="w-[36px] h-[36px] min-w-[36px] flex items-center justify-center rounded-full border border-sennheiser-gray bg-sennheiser-gray cursor-pointer transition-all duration-200 hover:bg-brand-hover-blue hover:text-white hover:border-transparent group"
                                title="Clear all filters"
                            >
                                <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
                                    <path 
                                        d="M13.84 16.36l-13.552 13.551 1.887 1.887 13.552-13.551 14.128 14.128 1.887-1.887-14.128-14.128 14.128-14.128-1.887-1.887-14.128 14.128-13.552-13.551-1.887 1.887 13.552 13.551z" 
                                        fill="#545252" 
                                        className="group-hover:fill-white transition-colors duration-300"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* 5. Product Grid & Pagination */}
                <div className="px-[20px] pb-16 pt-[20px] w-full flex flex-col items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full pb-[16px]">
                        {currentProducts.map((product) => {
                        // Check if the link is external (starts with http)
                        const isExternal = product.link.startsWith('http');

                        // We use a constant for the inner UI to keep the code clean
                        const CardContent = (
                            <div className="group relative aspect-square bg-[var(--color-light-gray)] overflow-hidden transition-colors">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    {product.image ? (
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="antialiased subpixel-antialiased object-contain w-full h-full transition-transform duration-300 ease-out group-hover:scale-110"
                                        />
                                    ) : (
                                        <span className="antialiased subpixel-antialiased text-[10px] text-gray-300 tracking-widest">
                                            {product.articleNo}
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                                    <h3 
                                        className="antialiased subpixel-antialiased font-medium transition-colors duration-300 group-hover:text-[var(--color-brand-hover-blue)]"
                                        style={{ fontSize: '0.65rem', lineHeight: '110%', fontWeight: 500, letterSpacing: '0.02em' }}
                                    >
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        );

                        if (isExternal) {
                            return (
                                <a 
                                    key={product.id} 
                                    href={product.link}
                                    target="_blank" // Keeps external Sennheiser links in a new tab
                                    rel="noopener noreferrer"
                                >
                                    {CardContent}
                                </a>
                            );
                        }

                        return (
                            <Link 
                                key={product.id} 
                                href={product.link}
                                // No target="_blank" here, so it opens in the same tab
                            >
                                {CardContent}
                            </Link>
                        );
                    })}

                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="py-20 text-center text-gray-400 italic">
                            Aradığınız kriterlere uygun ürün bulunamadı.
                        </div>
                    ) : (
                        /* Removed cursor-pointer from this wrapper so it only applies to the buttons themselves */
                        <div className="mt-[16px] mb-[0px] flex flex-col items-center gap-2">
                            
                            {/* Pagination Numbers */}
                            {totalPages > 1 && (
                                <nav aria-label="Pagination">
                                    <div className="flex items-center justify-center gap-1" role="list">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            const isActive = currentPage === pageNum;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    role="listitem"
                                                    aria-current={isActive ? "page" : undefined}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`
                                                        flex items-center justify-center rounded-full transition-colors antialiased subpixel-antialiased
                                                        w-[32px] h-[32px] min-w-[32px] max-w-[32px] min-h-[32px] max-h-[32px] 
                                                        cursor-pointer text-[13px] font-[400] leading-[0]
                                                        ${isActive 
                                                            ? 'bg-light-gray text-black' 
                                                            : 'bg-transparent text-black hover:bg-light-gray'}
                                                    `}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </nav>
                            )}

                            {/* Products Per Page Dropdown */}
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-black font-normal antialiased subpixel-antialiased">
                                    Sayfada gösterilen ürün sayısı:
                                </span>
                                <div className="relative">
                                    {/* Backdrop for closing dropdown */}
                                    {isPageSizeOpen && (
                                        <div 
                                            className="fixed inset-0 cursor-default" 
                                            onClick={() => setIsPageSizeOpen(false)}
                                        />
                                    )}

                                    {/* Custom Drop-down Menu */}
                                    {isPageSizeOpen && (
                                        <div className="absolute top-full -mt-[1px] left-0 w-full bg-white border-x border-b border-light-gray rounded-b-[16px] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                                            <div className="flex flex-col pt-0">
                                                {[24, 48, 72].map((size) => {
                                                    const isActive = productsPerPage === size;
                                                    return (
                                                        <button
                                                            key={size}
                                                            onClick={() => {
                                                                setProductsPerPage(size);
                                                                setCurrentPage(1);
                                                                setIsPageSizeOpen(false);
                                                            }}
                                                            className={`px-1 py-1 pl-3 pr-3 text-[13px] font-medium transition-colors duration-200 leading-[1.2] flex items-left justify-left ${
                                                                isActive 
                                                                    ? 'text-[var(--color-brand-hover-blue)] cursor-default'
                                                                    : 'text-black hover:bg-light-gray cursor-pointer'
                                                            }`}
                                                        >
                                                            {size}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Trigger Button */}
                                    <button 
                                        onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
                                        className={`
                                            relative flex items-center gap-2 antialiased subpixel-antialiased text-black text-[13px] font-medium 
                                            py-1 pl-3 pr-3 cursor-pointer focus:outline-none transition-all duration-200 min-w-[60px] justify-between
                                            border
                                            ${isPageSizeOpen 
                                                ? 'bg-[#E9E9ED] rounded-t-[16px] rounded-b-none border-[#E9E9ED]' 
                                                : 'bg-[#F5F5F7] hover:bg-[#E9E9ED] rounded-[16px] border-transparent'}
                                        `}
                                    >
                                        <span>{productsPerPage}</span>
                                        <svg 
                                            viewBox="0 0 32 32" 
                                            className={`w-[8px] h-[8px] fill-current transition-transform duration-300 ${isPageSizeOpen ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M1.1,1.1l15,29.9L30.9,1.1H1.1z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}