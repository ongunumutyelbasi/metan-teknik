"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { products as sennheiserProducts } from '@/src/data/sennheiser-products';
import type { SennheiserProduct } from '@/src/types/product-schema';
import { Check, Plus, Search, ArrowUpDown, Filter, X, ChevronRight, Package, ChevronLeft, ListFilter } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = ["Mikrofonlar", "Kulaklıklar", "Kablosuz Sistemler", "Konferans & Rehber Sistemleri", "Aksesuarlar", "Yazılımlar", "Çift Yönlü İletişim"];

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(CATEGORIES);
    const [sortConfig, setSortConfig] = useState<{key: 'name' | 'articleNo' | 'category' | null, direction: 'asc' | 'desc'}>({ key: null, direction: 'asc' });
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const handleSort = (key: 'name' | 'articleNo' | 'category') => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredProducts = useMemo(() => {
        // Define your shorthands here
        const aliases: Record<string, string> = {
            'prfl': 'profile',
            'mkr': 'mikrofon',
            'klk': 'kulaklık',
            // Add more as needed
        };

        return sennheiserProducts.filter(p => {
            const searchWords = searchTerm.toLowerCase().split(' ').filter(word => word !== '');
            
            const matchesSearch = searchWords.every(word => {
                const targetWord = aliases[word] || word; // Use alias if it exists, otherwise use original word
                
                return (
                    p.name.toLowerCase().includes(targetWord) || 
                    p.articleNo?.toLowerCase().includes(targetWord) ||
                    // Also check original word just in case
                    p.name.toLowerCase().includes(word)
                );
            });

            const productCategories = p.category.split(',').map((cat: string) => cat.trim());
            const matchesCategory = productCategories.some((cat: string) => 
                selectedCategories.includes(cat)
            );

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategories]);

    const sortedProducts = useMemo(() => {
        let sorted = [...filteredProducts];
        if (sortConfig.key) {
            sorted.sort((a, b) => {
                const aVal = (a[sortConfig.key!] || '').toString().toLowerCase();
                const bVal = (b[sortConfig.key!] || '').toString().toLowerCase();
                return sortConfig.direction === 'asc' ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
            });
        }
        return sorted;
    }, [filteredProducts, sortConfig]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageJump = (val: string) => {
        const page = parseInt(val);
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleAllCategories = () => {
        if (selectedCategories.length === CATEGORIES.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(CATEGORIES);
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            {/* Compact Header Stats */}
            <div className="flex items-center justify-between bg-white px-2 py-2 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
                        <Package size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-regular leading-none mb-1">Envanter Özeti</p>
                        <p className="text-sm font-bold text-slate-900 leading-none">
                            {sennheiserProducts.length} <span className="text-[11px] font-medium text-slate-500">Toplam Sennheiser Ürünü</span>
                        </p>
                    </div>
                </div>
                
                {selectedCategories.length < CATEGORIES.length && (
                  <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 uppercase tracking-tight">
                    {selectedCategories.length} Kategori Filtrelendi
                  </div>
                )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-2 py-2 rounded-lg border border-slate-200 sticky top-4 z-50 mb-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                        placeholder="Ürün veya kod ara..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="pl-9 h-8.5 text-[12.5px] border-slate-200 rounded-lg bg-slate-50/50 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
                            <X size={14} />
                        </button>
                    )}
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="outline" 
                                className={`h-8.5 px-3 border-slate-200 cursor-pointer font-bold text-[10px] uppercase tracking-wider transition-all ${
                                    selectedCategories.length < CATEGORIES.length 
                                    ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' 
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                <ListFilter className="mr-1.5 h-3.5 w-3.5" /> 
                                Filtrele {selectedCategories.length < CATEGORIES.length && `(${selectedCategories.length})`}
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-64 rounded-lg border-slate-200 p-1.5 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center justify-between px-2 py-2">
                                <DropdownMenuLabel className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider p-0">
                                    Kategoriler
                                </DropdownMenuLabel>
                                <button 
                                    onClick={toggleAllCategories}
                                    className="text-[10px] font-bold text-brand-hover-blue hover:text-brand-hover-blue hover:underline hover:underline-offset-2 transition-colors uppercase tracking-tighter cursor-pointer"
                                >
                                    {selectedCategories.length === CATEGORIES.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                                </button>
                            </div>
                            
                            <DropdownMenuSeparator className="mx-1 bg-slate-100" />
                            
                            <div className="grid gap-1 mt-1">
                                {CATEGORIES.map(cat => {
                                    const isSelected = selectedCategories.includes(cat);
                                    return (
                                        <div
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategories(prev => 
                                                    isSelected ? prev.filter(c => c !== cat) : [...prev, cat]
                                                );
                                                setCurrentPage(1);
                                            }}
                                            className={`
                                                flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-all group
                                                ${isSelected 
                                                    ? 'bg-brand-hover-blue/10 text-brand-hover-blue' 
                                                    : 'text-slate-600 hover:bg-brand-hover-blue/5'}
                                            `}
                                        >
                                            <span className={`text-[11.5px] font-semibold transition-colors ${
                                                isSelected ? 'text-brand-hover-blue' : 'group-hover:text-slate-900'
                                            }`}>
                                                {cat}
                                            </span>
                                            <div className={`
                                                w-4 h-4 rounded-md border flex items-center justify-center transition-all
                                                ${isSelected 
                                                    ? 'bg-brand-hover-blue border-brand-hover-blue shadow-sm shadow-brand-hover-blue/20' 
                                                    : 'border-slate-300 bg-white group-hover:border-slate-400'}
                                            `}>
                                                {isSelected && <Check size={10} strokeWidth={4} className="text-white" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/admin/add-product" className="flex-1 md:flex-none">
                        <Button className="h-8.5 w-full bg-metan-orange hover:bg-metan-orange/85 text-white font-bold uppercase text-[10px] tracking-normal px-4 rounded-lg transition-all cursor-pointer">
                            <Plus className="mr-1.5 h-3.5 w-3.5" /> ÜRÜN EKLE
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            <div className="space-y-3">
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-200">
                                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-4 cursor-pointer hover:text-brand-hover-blue transition-colors" onClick={() => handleSort('name')}>
                                    <div className="flex items-center gap-1.5">Ürün Adı <ArrowUpDown size={12} className="opacity-50"/></div>
                                </TableHead>
                                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-slate-500">Ürün Kodu</TableHead>
                                <TableHead className="h-10 text-[10px] font-bold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Kategori</TableHead>
                                <TableHead className="h-10 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500 pr-10">Aksiyon</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.length > 0 ? (
                                // Added 'index' here to use in the key
                                currentItems.map((product, index) => (
                                    // Combined articleNo and index to guarantee uniqueness
                                    <TableRow 
                                        key={`${product.articleNo}-${index}`} 
                                        className="hover:bg-slate-50/30 transition-colors group border-slate-100 h-12"
                                    >
                                        <TableCell className="pl-4 py-2">
                                            <div className="flex flex-col leading-tight">
                                                <span className="font-bold text-[12.5px] text-slate-900 group-hover:text-brand-hover-blue transition-colors">{product.name}</span>
                                                <span className="text-[9px] text-slate-400 lg:hidden uppercase tracking-tighter">{product.category}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-[11px] text-slate-500">{product.articleNo}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200/50">
                                                {product.category.split(',')[0]}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <Link href={`/admin/edit/${product.articleNo}`} className="inline-block">
                                                <Button 
                                                    variant="ghost" 
                                                    className="h-7 px-3 ml-auto flex items-center justify-end gap-1 text-[11px] font-bold text-slate-400 hover:text-brand-hover-blue hover:bg-brand-hover-blue/5 rounded-md group/btn cursor-pointer transition-all"
                                                >
                                                    <span className="leading-none">Düzenle</span>
                                                    <ChevronRight 
                                                        size={12} 
                                                        className="opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-1 group-hover/btn:translate-x-0" 
                                                    />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Search size={24} className="mb-2 opacity-20" />
                                            <p className="text-xs">Ürün bulunamadı.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-1">
                    <div className="flex items-center gap-4">
                        <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                            Toplam <span className="text-slate-900">{sortedProducts.length}</span> üründen 
                            <span className="text-slate-900"> {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)}</span> arası gösteriliyor
                        </p>
                        
                        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Göster:</span>
                            <Select 
                                value={itemsPerPage.toString()} 
                                onValueChange={(val) => {
                                    setItemsPerPage(parseInt(val));
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="h-7 w-[70px] text-[11px] cursor-pointer font-bold border-slate-200 bg-white rounded-md">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    {[15, 30, 45, 60].map(num => (
                                        <SelectItem key={num.toString()} value={num.toString()} className="text-xs cursor-pointer">
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 mr-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Git:</span>
                            <input 
                                type="number"
                                min="1"
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => handlePageJump(e.target.value)}
                                className="h-8 w-12 text-center text-[11px] font-bold border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="flex items-center gap-1">
                            <Button 
                                variant="outline" 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="h-8 w-8 p-0 border-slate-200 rounded-lg disabled:opacity-30 cursor-pointer bg-white"
                            >
                                <ChevronLeft size={14} />
                            </Button>
                            <div className="flex items-center px-3 h-8 rounded-lg border border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-700">
                                {currentPage} / {totalPages || 1}
                            </div>
                            <Button 
                                variant="outline" 
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="h-8 w-8 p-0 border-slate-200 rounded-lg disabled:opacity-30 cursor-pointer bg-white"
                            >
                                <ChevronRight size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}