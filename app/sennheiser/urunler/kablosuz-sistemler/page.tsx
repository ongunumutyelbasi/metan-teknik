"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
import Image from 'next/image';
import { SennheiserProduct, sennheiserProducts } from '@/src/data/sennheiser-products';
import { ProductFilterBar, ProductGrid, CategoryHero, Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
import { TECHNOLOGY, PRODUCT_TYPE, SYSTEM_PART, APPLICATION_TYPES, PRODUCT_SERIES, PICKUP_PATTERN, TRANSDUCER_TYPE } from '@/src/types/product-schema';
import ActionButton from '@/components/ui/ActionButton';
import { ArrowUpRight } from 'lucide-react';

export default function KablosuzSistemlerPage() {
    const allowedParts = ["Aksesuarlar", "Bodypacks", "Combiners", "Handheld", "Mikrofonlar", "Monitoring", "Alıcılar", "Setler", "Masa üstü ayaklar", "Vericiler", "Antenler"];
    const displaySystemParts = SYSTEM_PART.filter(part => allowedParts.includes(part));


    const normalizeString = (str: string) => {
        // 1. Convert to lowercase
        // 2. Remove all spaces, hyphens, and special characters
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const [filters, setFilters] = useState({
        systemPart: [] as string[],
        productType: [] as string[],
        applicationTypes: [] as string[],
        productSeries: [] as string[],
        technology: [] as string[],
        pickupPattern: [] as string[],
        transducerType: [] as string[],
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

    const systemPartOptions = [...SYSTEM_PART];
    const productTypeOptions = [...PRODUCT_TYPE];
    const applicationOptions = [...APPLICATION_TYPES];
    const seriesOptions = [...PRODUCT_SERIES];
    const technologyOptions = [...TECHNOLOGY];
    const patternOptions = [...PICKUP_PATTERN];
    const transducerOptions = [...TRANSDUCER_TYPE];
    
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

    const PAGE_CATEGORY = "Kablosuz Sistemler";

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
                title="Kablosuz Sistemler"
                subtitle="Size en iyi şekilde performans sergileme, ilham verme ve iş birliği yapma özgürlüğü sunan yenilik"
                imageSrc="/images/sennheiser/kablosuz-sistemler/kablosuz-sistemler-hero.avif"
            />

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Kablosuz Sistemler" categoryHref="/sennheiser/urunler/kablosuz-sistemler" className="mb-0" />
                </div>
            </main>

            {/* Design Tools Section */}
            <section className="px-[20px] pt-[60px] antialiased subpixel-antialiased">
                <h2 className="text-[50px] font-medium mb-[20px] leading-none">Tasarım araçları</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                    {/* Card 1: Wireless Planner */}
                    <a 
                        href="https://wirelessplanner.sennheiser.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative aspect-[756/500] md:aspect-auto md:h-[500px] overflow-hidden group cursor-pointer"
                    >
                        <Image 
                            src="/images/sennheiser/kablosuz-sistemler/wireless-planner.avif" 
                            alt="Wireless Planner"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                        
                        <div className="absolute inset-0 p-[.6rem] flex flex-col justify-between text-white">
                            <div>
                                <h3 className="antialiased subpixel-antialiased text-[1rem] font-medium leading-tight mb-0">Wireless Planner</h3>
                                <p className="antialiased subpixel-antialiased text-[1rem] opacity-75 font-medium max-w-full leading-[1.2rem]">
                                    Dakikalar içinde bir kablosuz sistem tasarlayın (EW-DX, EW-D, SL DW, Spectera)
                                </p>
                            </div>
                            
                            <ActionButton 
                                text="Şimdi deneyin" 
                                className="!px-4 !bg-brand-hover-blue opacity-0 group-hover:opacity-100 !transition-opacity !duration-300 pointer-events-none"
                                Icon={ArrowUpRight}
                            />
                        </div>
                    </a>

                    {/* Card 2: SoundBase */}
                    <a 
                        href="https://en-de.sennheiser.com/soundbase" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative aspect-[756/500] md:aspect-auto md:h-[500px] overflow-hidden group cursor-pointer"
                    >
                        <Image 
                            src="/images/sennheiser/kablosuz-sistemler/soundbase.png" 
                            alt="SoundBase"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                        
                        <div className="absolute inset-0 p-[.6rem] flex flex-col justify-between text-white">
                            <div>
                                <h3 className="antialiased subpixel-antialiased text-[1rem] font-medium leading-tight mb-0">SoundBase</h3>
                                <p className="antialiased subpixel-antialiased text-[1rem] opacity-75 font-medium max-w-full leading-[1.2rem]">
                                    Wireless Audio Management Platform
                                </p>
                            </div>
                            
                            {/* Added !important modifiers to transition and duration to override 
                            the base component's internal 'transition-all duration-300' 
                            */}
                            <ActionButton 
                                text="Daha Fazla Bilgi" 
                                className="!px-4 !bg-brand-hover-blue opacity-0 group-hover:opacity-100 !transition-opacity !duration-300 pointer-events-none [will-change:opacity]"
                            />
                        </div>
                    </a>
                </div>
            </section>

            {/* 3. Series Slider */}
            <section className="max-w-full pb-0 pt-[100px] antialiased subpixel-antialiased normal-case">
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
                    <FilterDropdown 
                        title="Sistem parçası" 
                        items={systemPartOptions}
                        selectedItems={filters.systemPart}
                        onSelectionChange={(val) => setFilters({...filters, systemPart: val})}
                    />
                    <FilterDropdown 
                        title="Ürün serisi" 
                        items={seriesOptions}
                        selectedItems={filters.productSeries}
                        onSelectionChange={(val) => setFilters({...filters, productSeries: val})}
                    />
                    <FilterDropdown 
                        title="Uygulama" 
                        items={applicationOptions}
                        selectedItems={filters.applicationTypes}
                        onSelectionChange={(val) => setFilters({...filters, applicationTypes: val})}
                    />
                    <FilterDropdown 
                        title="Teknoloji" 
                        items={technologyOptions}
                        selectedItems={filters.technology}
                        onSelectionChange={(val) => setFilters({...filters, technology: val})}
                    />
                    <FilterDropdown 
                        title="Kutup Deseni" 
                        items={patternOptions}
                        selectedItems={filters.pickupPattern}
                        onSelectionChange={(val) => setFilters({...filters, pickupPattern: val})}
                    />
                    <FilterDropdown 
                        title="Dönüştürücü" 
                        items={transducerOptions}
                        selectedItems={filters.transducerType}
                        onSelectionChange={(val) => setFilters({...filters, transducerType: val})}
                    />
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