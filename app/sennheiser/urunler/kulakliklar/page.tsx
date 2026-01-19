"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
// import Link from 'next/link';
import Fuse from 'fuse.js';
// import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
// import Image from 'next/image';
import { SennheiserProduct, sennheiserProducts } from '@/src/data/sennheiser-products';
import { ProductFilterBar, ProductGrid, CategoryHero, Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
import { AUDIO_SOURCE, WEARING_STYLE, CONNECTOR, TECHNOLOGY, PRODUCT_TYPE, SYSTEM_PART, APPLICATION_TYPES, PRODUCT_SERIES, PICKUP_PATTERN, TRANSDUCER_TYPE } from '@/src/types/product-schema';
// import ActionButton from '@/components/ui/ActionButton';
// import { ArrowUpRight } from 'lucide-react';

export default function KulakliklarPage() {
    
    const PAGE_CATEGORY = "Kulaklıklar";
    
    const allowedConnectors = ["3.5mm", "6.3mm"];
    const displayConnectors = CONNECTOR.filter(conn => allowedConnectors.includes(conn));


    const normalizeString = (str: string) => {
        // 1. Convert to lowercase
        // 2. Remove all spaces, hyphens, and special characters
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const FILTER_CONFIG = [
        { id: 'applicationTypes', title: 'Uygulama türü', options: APPLICATION_TYPES },
        { id: 'wearingStyle', title: 'Kullanılış tipi', options: WEARING_STYLE },
        { id: 'connectors', title: 'Konektörler', options: displayConnectors as unknown as string[] },
        { id: 'audioSource', title: 'Ses kaynağı', options: AUDIO_SOURCE },
    ] as const;

    const [filters, setFilters] = useState(() => 
        Object.fromEntries(FILTER_CONFIG.map(f => [f.id, [] as string[]]))
    );

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
        // 1. Start with the category-specific list for this page
        let results = sennheiserProducts.filter(
            product => product.category === PAGE_CATEGORY
        );

        // 2. Apply Fuzzy Search
        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(results, {
                keys: ['name', 'articleNo', 'productSeries'],
                threshold: 0.3, 
                distance: 100,
            });
            results = fuse.search(searchQuery).map(result => result.item);
        }

        // 3. Apply the Dropdown Pill Filters
        return results.filter((product) => {
            return (Object.keys(filters) as Array<keyof typeof filters>).every((key) => {
                const selectedValues = filters[key];

                if (selectedValues.length === 0) return true;

                // Using 'any' here is the cleanest way to tell TS: 
                // "I know some fields are objects now, but the ones in 'filters' are definitely strings."
                const productValues = product[key as keyof SennheiserProduct] as any;

                if (Array.isArray(productValues)) {
                    // Ensure we are checking against an array of strings
                    return selectedValues.some((val) => 
                        typeof productValues[0] === 'string' && productValues.includes(val)
                    );
                } else if (typeof productValues === 'string') {
                    return selectedValues.includes(productValues);
                }

                return false;
            });
        });
    }, [searchQuery, filters, sennheiserProducts]);

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
        { title: "Spectera", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/spectera.avif", href: "/ev" },
        { title: "EW-D for Pro Audio", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/ew-d-for-proAudio.avif", href: "/ev" },
        { title: "EW-D for Business & Education", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/ew-d-for-busEdu.avif", href: "/ev" },
        { title: "Evolution Wireless-Digital Portable (EW-DP)", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/ewdp.png", href: "/ev" },
        { title: "EW-DX for Business & Education", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/ew-dx-for-busEdu.png", href: "/ev" },
        { title: "EW-DX for Pro Audio", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/ewdx-proAudio.png", href: "/ev" },
        { title: "Speechline Wireless", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/speechline-wireless.avif", href: "/ev" },
        { title: "Digital 6000", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/digital-6000.avif", href: "/ev" },
        { title: "Digital 9000", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/digital-9000.avif", href: "/ev" },
        { title: "XS Wireless Digital", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/xs-wireless-digital.avif", href: "/ev" },
        { title: "XS Wireless", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/xs-wireless.avif", href: "/ev" },
        { title: "AVX", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/kablosuz-sistemler/related-series/avx.avif", href: "/ev" },
    ];

    return (
        <div className="min-h-screen bg-white font-sennheiser selection:bg-black selection:text-white">
            {/* 1. Hero Section */}
            <CategoryHero 
                title="Kulaklıklar"
                subtitle="Güvenilir stüdyo kulaklıkları"
                imageSrc="/images/sennheiser/kulakliklar/kulakliklar-hero.avif"
            />

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Kulaklıklar" categoryHref="/sennheiser/urunler/kulakliklar" className="mb-0" />
                </div>
            </main>

            {/* 3. Product Title & Filter Bar */}
            <section id="products">
                <div className="max-w-full px-[20px] pt-[70px] pb-[1rem] flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-[50px] font-medium leading-none antialiased subpixel-antialiased">
                        Ürünler
                    </h2>
                </div>

                {/* Filter & Search Bar Row */}
                <ProductFilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    inputRef={inputRef}
                    searchRef={searchRef}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    hasActiveFilters={hasActiveFilters}
                    resetFilters={resetFilters}
                >
                    {FILTER_CONFIG.map((config) => (
                    <FilterDropdown 
                        key={config.id}
                        title={config.title} 
                        items={config.options}
                        selectedItems={filters[config.id] || []}
                        onSelectionChange={(val) => setFilters(prev => ({
                            ...prev, 
                            [config.id]: val
                        }))}
                    />
                ))}
                    
                </ProductFilterBar>

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