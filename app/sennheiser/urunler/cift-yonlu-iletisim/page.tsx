"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
import Image from 'next/image';
import { SennheiserProduct, products as sennheiserProducts } from '@/src/data/sennheiser-products';
import { ProductFilterBar, ProductGrid, CategoryHero, Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
import { PRODUCT_TYPE, SYSTEM_PART } from '@/src/types/product-schema';

export default function CiftYonluIletisimPage() {
    
    const PAGE_CATEGORY = "Çift Yönlü İletişim";

    const normalizeString = (str: string) => {
        // 1. Convert to lowercase
        // 2. Remove all spaces, hyphens, and special characters
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const FILTER_CONFIG = [
        { id: 'systemPart', title: 'Sistem parçası', options: SYSTEM_PART as unknown as string[] },
        { id: 'productType', title: 'Ürün tipi', options: PRODUCT_TYPE as unknown as string[] },
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
        // This ensures no products from other categories appear.
        let results = sennheiserProducts.filter(
            product => product.category === PAGE_CATEGORY
        );

        // 2. Apply Fuzzy Search if there is a search query
        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(results, {
                keys: ['name', 'articleNo', 'productSeries'],
                threshold: 0.3, 
                distance: 100,
            });
            results = fuse.search(searchQuery).map(result => result.item);
        }

        // 3. Apply the Dropdown Pill Filters (System Part & Product Type)
        return results.filter((product) => {
            return (Object.keys(filters) as Array<keyof typeof filters>).every((key) => {
                const selectedValues = filters[key];

                if (selectedValues.length === 0) return true;

                // Use a type cast to tell TS that we expect an array or undefined for these specific keys
                const productValues = product[key as keyof SennheiserProduct];

                // Ensure we are dealing with an array before calling .some()
                if (Array.isArray(productValues)) {
                    return selectedValues.some((val) => (productValues as string[]).includes(val));
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
        { title: "MobileConnect", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/cift-yonlu-iletisim-sayfasi/mobileConnect.avif", href: "/ev" },
    ];

    return (
        <div className="min-h-screen bg-white font-sennheiser selection:bg-black selection:text-white">
            {/* 1. Hero Section */}
            <CategoryHero 
                title="Çift Yönlü İletişim"
                subtitle="Tüm dinleyicilerinizin sohbete katılma vakti geldi."
                imageSrc="/images/sennheiser/cift-yonlu-iletisim-sayfasi/ciftYonluIletisim-Hero.avif"
            />

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Çift Yönlü İletişim" categoryHref="/sennheiser/urunler/cift-yonlu-iletisim" className="mb-0" />
                </div>
            </main>

            {/* 3. Series Slider */}
            <section className="max-w-full pb-0 pt-[70px] antialiased subpixel-antialiased normal-case">
                <FamilySlider 
                    title="İlgili serileri keşfedin" 
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