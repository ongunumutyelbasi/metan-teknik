"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { sennheiserProducts } from '@/src/data/sennheiser-products';
import { 
  Plus, Search, ArrowUpDown, Filter, X,
  LayoutDashboard, Package, Users, Settings, LogOut, ChevronRight 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = ["Mikrofonlar", "Kulaklıklar", "Kablosuz Sistemler", "Konferans & Rehber Sistemleri", "Aksesuarlar", "Yazılımlar", "Çift Yönlü İletişim"];

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(CATEGORIES);
    const [sortConfig, setSortConfig] = useState<{key: 'name' | 'articleNo' | 'category' | null, direction: 'asc' | 'desc'}>({ key: null, direction: 'asc' });

    const handleSort = (key: 'name' | 'articleNo' | 'category') => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const processedProducts = useMemo(() => {
        let filtered = sennheiserProducts.filter(p => {
            // 1. Improved Search Logic
            const searchWords = searchTerm.toLowerCase().split(' ').filter(word => word !== '');
            
            // Check if the product name contains EVERY word in the search query
            const matchesSearch = searchWords.every(word => 
                p.name.toLowerCase().includes(word) || 
                p.articleNo?.toLowerCase().includes(word)
            );

            // 2. Category Matching
            const productCategories = p.category.split(',').map((cat: string) => cat.trim());
            const matchesCategory = productCategories.some((cat: string) => 
                selectedCategories.includes(cat)
            );

            return matchesSearch && matchesCategory;
        });

        // ... sorting logic remains the same
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = (a[sortConfig.key!] || '').toString().toLowerCase();
                const bVal = (b[sortConfig.key!] || '').toString().toLowerCase();
                return sortConfig.direction === 'asc' ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
            });
        }
        return filtered;
    }, [searchTerm, selectedCategories, sortConfig]);

    return (
        <div className="min-h-screen bg-white font-sennheiser pt-[100px]">
            {/* The main wrapper remains in the normal flow so the whole page scrolls */}
            <div className="flex w-full items-start">
                
                {/* COLUMN 1: SIDEBAR 
                    - h-[calc(100vh-100px)]: Ensures it takes up exactly the visible height.
                    - sticky top-[100px]: Freezes it relative to the header while scrolling.
                */}
                <aside className="w-64 flex-none sticky top-[100px] h-[calc(100vh-100px)] border-r border-gray-100 bg-white hidden md:block">
                    <div className="flex flex-col h-full p-6 sticky top-[100px]">
                        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Yönetim Paneli</p>
                        
                        <nav className="space-y-1 flex-1">
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-black text-white rounded-md text-xs font-bold transition-all">
                                <LayoutDashboard size={14} /> Ürün Yönetimi
                            </Link>
                            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-black rounded-md text-xs font-bold transition-all">
                                <Package size={14} /> Dashboard
                            </Link>
                            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-black rounded-md text-xs font-bold transition-all">
                                <Users size={14} /> Kullanıcılar
                            </Link>
                        </nav>

                        <div className="pt-6 border-t border-gray-50 space-y-1 mt-auto">
                            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-black rounded-md text-xs font-bold transition-all">
                                <Settings size={14} /> Ayarlar
                            </Link>
                            <button className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 w-full rounded-md text-xs font-bold transition-colors">
                                <LogOut size={14} /> Çıkış Yap
                            </button>
                        </div>
                    </div>
                </aside>

                {/* COLUMN 2: MAIN CONTENT 
                    - flex-1: Automatically takes up the remaining width (100% minus 256px).
                    - h-auto: The height will grow as long as the table requires.
                */}
                <main className="flex-1 bg-white min-h-[calc(100vh-100px)] border-l border-transparent">
                    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
                        
                        {/* Header Block */}
                        <div className="flex justify-between items-end border-b border-gray-100 pb-5">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-black">Ürün Yönetimi</h1>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                                    Toplam {processedProducts.length} ürün listeleniyor
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="h-9 bg-white text-xs font-bold cursor-pointer uppercase border-gray-200 hover:border-black transition-all">
                                            <Filter className="mr-2 h-3.5 w-3.5" /> Filtrele
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-xl z-50">
                                        <DropdownMenuLabel className="text-[10px] uppercase text-gray-400 font-bold">Kategoriler</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {CATEGORIES.map(cat => (
                                            <DropdownMenuCheckboxItem
                                                key={cat}
                                                checked={selectedCategories.includes(cat)}
                                                onSelect={(e) => e.preventDefault()}
                                                onCheckedChange={() => setSelectedCategories(prev => 
                                                    prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                                                )}
                                                className="text-xs cursor-pointer font-medium"
                                            >
                                                {cat}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Link href="/admin/add-product">
                                    <Button className="h-9 bg-black cursor-pointer text-white hover:bg-brand-hover-blue text-xs font-bold uppercase px-6">
                                        <Plus className="mr-2 h-4 w-4" /> Yeni Ürün
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Search & Table */}
                        <div className="space-y-6">
                            <div className="relative max-w-sm flex items-center group">
                                <Search className="absolute left-4 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                <Input
                                    placeholder="Ürün ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                                    className="h-10 text-xs border-x-0 border-t-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-400 font-medium bg-transparent w-full"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-0 p-1 cursor-pointer text-gray-400 hover:text-black transition-colors">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="rounded-md border border-gray-100 mb-20">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-gray-100 hover:bg-transparent bg-gray-50/50">
                                            <TableHead className="h-10 w-[45%] text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-6 cursor-pointer" onClick={() => handleSort('name')}>
                                                <div className="flex items-center gap-1">Ürün Adı <ArrowUpDown size={12} className="opacity-30"/></div>
                                            </TableHead>
                                            <TableHead className="h-10 text-[10px] font-bold uppercase tracking-widest text-gray-500">Kodu</TableHead>
                                            <TableHead className="h-10 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Kategori</TableHead>
                                            <TableHead className="h-10 text-right text-[10px] font-bold uppercase tracking-widest text-gray-500 pr-6">İşlem</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {processedProducts.length > 0 ? (
                                            processedProducts.map((product) => (
                                                /* FIX 1: Add key directly to the TableRow */
                                                <TableRow key={product.articleNo} className="border-gray-50 hover:bg-gray-50/50 transition-colors h-12 group">
                                                    <TableCell className="pl-6 font-bold text-xs text-black">{product.name}</TableCell>
                                                    <TableCell className="font-mono text-[12px] text-gray-500">{product.articleNo}</TableCell>
                                                    <TableCell className="hidden md:table-cell text-[10px] font-bold text-gray-400">{product.category}</TableCell>
                                                    <TableCell className="text-right pr-6">
                                                        <Link href={`/admin/edit/${product.articleNo}`}>
                                                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-[12px] cursor-pointer font-bold uppercase text-gray-400 hover:text-black hover:bg-gray-100 px-3 transition-all">
                                                                Düzenle
                                                                <ChevronRight size={14} className="opacity-30" />
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            /* FIX 2: Ensure the fallback row also has a key */
                                            <TableRow key="no-results-row">
                                                <TableCell colSpan={4} className="h-32 text-center text-xs text-gray-400 italic">
                                                    Eşleşen ürün bulunamadı.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}