"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
import Image from 'next/image';
import { products } from '@/src/data/sennheiser-products';
import { SennheiserProduct } from '@/src/types/product-schema';
import { ProductGrid, CategoryHero, Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
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
        // 1. Clear all dropdown arrays dynamically
        setFilters(prev => {
            const resetState = { ...prev };
            (Object.keys(resetState) as Array<keyof typeof prev>).forEach(key => {
                resetState[key] = [];
            });
            return resetState;
        });

        // 2. Clear UI and Search
        setSearchQuery("");
        setIsSearchOpen(false);

        // 3. Remove focus
        inputRef.current?.blur();
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
        // 1. Check if any array in the filters object is not empty
        const dropdownsActive = Object.values(filters).some(selectedArray => selectedArray.length > 0);
        
        // 2. Check if the search query is not empty
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
        const cats = products.map(p => p.category);
        return ["All", ...Array.from(new Set(cats))];
    }, []);

    const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);

    const PAGE_CATEGORY = "Mikrofonlar";

    const filteredProducts = useMemo(() => {
        // 1. Initial filter for category
        let results = products.filter(
            product => product.category === PAGE_CATEGORY
        );

        // 2. Apply Fuzzy Search and maintain relevance order
        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(results, {
                keys: ['name', 'subtitle', 'slug'],
                threshold: 0.3, 
                distance: 100,
                includeScore: true, // We need this to verify internal sorting if needed
            });
            
            // Fuse.js automatically returns results sorted by relevance (score)
            results = fuse.search(searchQuery).map(result => result.item);
        }

        // 3. Apply Pill Filters to the (possibly ordered) results
        return results.filter((product) => {
            return (Object.keys(filters) as Array<keyof typeof filters>).every((key) => {
                const selectedValues = filters[key];
                if (selectedValues.length === 0) return true;

                // Changed SennheiserProduct -> Product
                const productValues = product[key as keyof SennheiserProduct];

                if (Array.isArray(productValues)) {
                    return selectedValues.some((val) => (productValues as string[]).includes(val));
                } else if (typeof productValues === 'string') {
                    return selectedValues.includes(productValues);
                }
                return false;
            });
        });
    }, [searchQuery, filters, products]);

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
            <CategoryHero 
                title="Mikrofonlar"
                subtitle="Sahne, stüdyo, konferans salonu, oditoryum ve daha fazı için efsanevi istikrar..."
                imageSrc="/images/sennheiser/hero-sections/microphones_pageHero.webp"
            />

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Mikrofonlar" categoryHref="/sennheiser/urunler/mikrofonlar" className="mb-0" />
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
                <div className="sticky top-[76px] z-30 backdrop-blur-md border-light-gray px-[20px] py-4">
                    <div className="max-w-full mx-auto flex items-center gap-[4px] h-[36px]">
                        
                        <span 
                            className="antialiased subpixel-antialiased text-grey-on-light mr-1"
                            style={{ fontSize: '0.65rem', fontWeight: 400 }}
                        >
                            Filtreler:
                        </span>

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
                <ProductGrid 
                    currentProducts={currentProducts}
                    filteredProducts={filteredProducts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    productsPerPage={productsPerPage}
                    setCurrentPage={setCurrentPage}
                    setProductsPerPage={setProductsPerPage}
                    isPageSizeOpen={isPageSizeOpen}
                    setIsPageSizeOpen={setIsPageSizeOpen}
                />
            </section>
        </div>
    );
}