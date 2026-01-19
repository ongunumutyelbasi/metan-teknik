"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SubNavigationRow from '@/components/navigation/SubNavigationRow';
import { useProductUI } from '@/app/hooks/useProductUI';
import Image from 'next/image';
import { SennheiserProduct, sennheiserProducts } from '@/src/data/sennheiser-products';
import { ProductFilterBar, ProductGrid, CategoryHero, Breadcrumbs, FamilySlider, FamilyCard, FilterDropdown, } from '@/components/Sennheiser';
import { PRODUCT_TYPE, APPLICATION_TYPES, MICROPHONE_FORMS, LOCATION, CONNECTION, CONNECTOR, PRODUCT_SERIES, SYSTEM_PART } from '@/src/types/product-schema';
import ActionButton from '@/components/ui/ActionButton';
import { ArrowUpRight } from 'lucide-react';

export default function ToplantiSistemleriPage() {
    const PAGE_CATEGORY = "Toplantı ve Konferans Sistemleri";
    
    const allowedParts = ["Aksesuarlar", "Mikrofonlar", "Setler", "Masa üstü ayaklar", "Vericiler"];
    const displaySysParts = SYSTEM_PART.filter(part => allowedParts.includes(part));
    
    const allowedMicForms = ["Boundary microphone", "Ceiling microphone", "Stand / boom mounted", "Bar"]
    const displayMicrophoneForms = MICROPHONE_FORMS.filter(part => allowedMicForms.includes(part));

    const allowedProdSeries = ["EW-DX", "Speechline Digital Wireless", "Speechline Wired", "Teamconnect", "Tourguide"];
    const displayProdSeries = PRODUCT_SERIES.filter(part => allowedProdSeries.includes(part));

    const allowedLocations = ["Küçük oda", "Orta boy oda"];
    const displayLocations = LOCATION.filter(part => allowedLocations.includes(part));

    const normalizeString = (str: string) => {
        // 1. Convert to lowercase
        // 2. Remove all spaces, hyphens, and special characters
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    const FILTER_CONFIG = [
        { id: 'productType', title: 'Ürün Tipi', options: PRODUCT_TYPE as unknown as string[] },
        { id: 'productSeries', title: 'Ürün Serisi', options: displayProdSeries as unknown as string[] },
        { id: 'applicationTypes', title: 'Uygulama türü', options: APPLICATION_TYPES as unknown as string[] },
        { id: 'systemPart', title: 'Sistem Parçası', options: displaySysParts as unknown as string[] },
        { id: 'microphoneForm', title: 'Mikrofon formu', options: displayMicrophoneForms as unknown as string[] },
        { id: 'location', title: 'Lokasyon', options: displayLocations as unknown as string[] },
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

    const applicationTypes = [...APPLICATION_TYPES];
    
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
        { title: "TeamConnect Bar Çözümleri", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/toplanti-ve-konferans-sistemleri/teamconnect-bar-solutions.avif", href: "/ev" },
        { title: "TeamConnect Tavan Çözümleri", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/toplanti-ve-konferans-sistemleri/teamconnect-ceiling-solutions.avif", href: "/ev" },
        { title: "SpeechLine Wireless", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/toplanti-ve-konferans-sistemleri/speechline-wireless.avif", href: "/ev" },
        { title: "SpeechLine Wired", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/toplanti-ve-konferans-sistemleri/speechline-wired.avif", href: "/ev" },
        { title: "MobileConnect", description: "Net Duyun. Kolayca Cevaplayın. Canlı Etkileşime Geçin.", image: "/images/sennheiser/toplanti-ve-konferans-sistemleri/mobileconnect.avif", href: "/ev" },
    ];

    return (
        <div className="min-h-screen bg-white font-sennheiser selection:bg-black selection:text-white">
            {/* 1. Hero Section */}
            <CategoryHero 
                title="Toplantı ve Konferans Sistemleri"
                subtitle="Şirketleri iyileştiren toplantı ve konferans çözümleri"
                imageSrc="/images/sennheiser/toplanti-ve-konferans-sistemleri/toplanti-ve-konferans-sistemleri.png"
            />

            {/* 2. Main Product Info Area */}
            <main className="flex w-full">
                <div className="px-[20px] pt-[20px] antialiased subpixel-antialiased">
                    <Breadcrumbs category="Toplantı ve Konferans Sistemleri" categoryHref="/sennheiser/urunler/toplanti-ve-konferans-sistemleri" className="mb-0" />
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

                    {/* Card 2: Room Planner */}
                    <a 
                        href="https://www.sennheiser.com/en-de/room-planner" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative aspect-[756/500] md:aspect-auto md:h-[500px] overflow-hidden group cursor-pointer"
                    >
                        <Image 
                            src="/images/sennheiser/toplanti-ve-konferans-sistemleri/room-planner.png" 
                            alt="Room Planner"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                        
                        <div className="absolute inset-0 p-[.6rem] flex flex-col justify-between text-white">
                            <div>
                                <h3 className="antialiased subpixel-antialiased text-[1rem] font-medium leading-tight mb-0">SoundBase</h3>
                                <p className="antialiased subpixel-antialiased text-[1rem] opacity-75 font-medium max-w-full leading-[1.2rem]">
                                    TeamConnect'le mükemmel çalışma ortamını planlayın
                                </p>
                            </div>

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