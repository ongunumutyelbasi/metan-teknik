"use client";

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products as sennheiserProducts } from '@/src/data/sennheiser-products';
import type { SennheiserProduct } from '@/src/types/product-schema';

// External Admin Components
import { TechnicalSpecsEditor } from '@/components/admin/TechnicalSpecsEditor';
import { BoxContentsEditor } from '@/components/admin/BoxContentsEditor';
import { RelatedAndVariantsEditor } from '@/components/admin/RelatedAndVariantsEditor';

// UI Components
import { Button } from "@/components/ui/button";
import { 
  Plus, Trash2, Info, ListChecks, GripVertical, CheckCircle2, 
  XCircle, ChevronDown, Package, Save, ImageIcon, GripHorizontal, Upload, X 
} from 'lucide-react';

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CATEGORIES = [
    { label: "Mikrofonlar", value: "Mikrofonlar" },
    { label: "Kulaklıklar", value: "Kulaklıklar" },
    { label: "Kablosuz Sistemler", value: "Kablosuz Sistemler" },
    { label: "Konferans & Rehber Sistemleri", value: "Konferans & Rehber Sistemleri" },
    { label: "Aksesuarlar", value: "Aksesuarlar" },
    { label: "Yazılımlar", value: "Yazılımlar" },
    { label: "Çift Yönlü İletişim", value: "Çift Yönlü İletişim" },
];

export default function EditProductPage() {
    const { articleNo } = useParams();
    const router = useRouter();
    
    const [modal, setModal] = useState<{show: boolean, type: 'success' | 'error', message: string}>({
        show: false,
        type: 'success',
        message: ''
    });

    const product = useMemo(() => 
        sennheiserProducts.find(p => p.articleNo === articleNo),
    [articleNo]);

    const { register, control, handleSubmit, formState: { isDirty }, reset, watch, setValue } = useForm({
        defaultValues: product
    });

    const generateInternalLink = (product: any) => {
        // Convert Turkish characters and spaces for the URL slug
        const categorySlug = product.category
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/&/g, 've')
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^a-z0-9-]/g, ''); // Remove everything except letters, numbers, and dashes
        
        const nameSlug = product.name.toLowerCase().replace(/ /g, '-');
        
        return `/sennheiser/urunler/${categorySlug}/${nameSlug}-${product.articleNo}`;
    };

    const onSubmit = async (data: any) => {
        try {
            const updatedProduct: SennheiserProduct = {
                ...product, 
                ...data,
                link: generateInternalLink(data),
                technicalSpecs: data.technicalSpecs,
            };

            const updatedProducts = sennheiserProducts.map(p => 
                p.articleNo === articleNo ? updatedProduct : p
            );

            const res = await fetch('/api/admin/save-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    password: 'sennheiser_admin_2026',
                    data: updatedProducts 
                }),
            });

            if (res.ok) {
                setModal({ show: true, type: 'success', message: 'Ürün başarıyla güncellendi!' });
                reset(data); 
                router.refresh();
            } else {
                setModal({ show: true, type: 'error', message: 'Kaydetme hatası oluştu.' });
            }
        } catch (err) {
            setModal({ show: true, type: 'error', message: 'Sunucuya bağlanılamadı.' });
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (modal.show && modal.type === 'success') {
            timer = setTimeout(() => {
                setModal(prev => ({ ...prev, show: false }));
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [modal.show, modal.type]);

    if (!product) return <div className="p-20 text-center font-bold">Ürün bulunamadı.</div>;

    return (
        <div className="space-y-3 animate-in fade-in duration-500 pb-10">
            <style jsx global>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                @keyframes modalCountdown { from { width: 100%; } to { width: 0%; } }
            `}</style>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* STICKY HEADER */}
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 sticky top-3 z-30 shadow-sm shadow-slate-200/40">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 flex-shrink-0">
                            <Package size={18} />
                        </div>
                        <div className="flex flex-col border-r border-slate-100 pr-5">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">Ürün Düzenleme</p>
                            <div className="flex items-center gap-2">
                                <h1 className="text-[15px] font-bold text-slate-900 leading-none">{product.name}</h1>
                                <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded uppercase leading-none border border-slate-100">
                                    #{product.articleNo}
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-1">
                            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isDirty ? 'bg-orange-500 animate-pulse' : 'bg-slate-200'}`} />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                {isDirty ? 'Kaydedilmemiş Değişiklikler Var' : 'Kaydedilecek değişiklik yok'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" type="button" onClick={() => router.back()} className="h-9 px-4 text-slate-400 cursor-pointer font-bold text-[11px] uppercase tracking-wider hover:text-slate-900 transition-colors">İptal / Geri</Button>
                        <Button type="submit" disabled={!isDirty} className="h-9 bg-metan-orange hover:bg-metan-orange/90 text-white font-bold uppercase text-[11px] tracking-wide px-6 rounded-lg transition-all cursor-pointer disabled:opacity-30 shadow-sm shadow-metan-orange/20">
                            <Save className="mr-2 h-3.5 w-3.5" /> Değişiklikleri Kaydet
                        </Button>
                    </div>
                </div>

                {/* 1. GENEL BILGILER (Priority 1) */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-5">
                    <h2 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
                        <Info size={14} className="text-brand-hover-blue" /> Genel Bilgiler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Ürün Kodu</label>
                            <input {...register("articleNo")} className="h-10 px-3 text-[12.5px] border border-slate-200 rounded-lg bg-slate-50/50 font-mono outline-none focus:border-brand-hover-blue/50 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Kategori</label>
                            <div className="relative group">
                                <select {...register("category")} className="w-full h-10 px-3 text-[12.5px] border border-slate-200 rounded-lg outline-none bg-white appearance-none cursor-pointer focus:border-brand-hover-blue/50">
                                    <option value="">Kategori Seçin</option>
                                    {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Ürün Adı</label>
                        <input {...register("name")} className="h-10 px-3 text-[12.5px] border border-slate-200 rounded-lg outline-none focus:border-brand-hover-blue/50" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Kısa Açıklama</label>
                            <textarea {...register("shortDescription")} className="min-h-[160px] p-3 text-[12.5px] border border-slate-200 rounded-lg outline-none focus:border-brand-hover-blue/50 resize-none" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Uzun Açıklama (Markdown)</label>
                            <textarea {...register("longDescription")} className="min-h-[160px] p-3 text-[12.5px] border border-slate-200 rounded-lg outline-none focus:border-brand-hover-blue/50" />
                        </div>
                    </div>
                </div>

                {/* 2. GÖRSELLER (Priority 2) */}
                <ImageUploadManager control={control} articleNo={articleNo as string} watch={watch} />

                {/* 3. ÖZELLIKLER VE KUTU İÇERİĞİ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <FeaturesEditor control={control} register={register} />
                    <BoxContentsEditor control={control} register={register} />
                </div>

                {/* 4. TEKNIK ÖZELLIKLER */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <TechnicalSpecsEditor control={control} register={register} />
                </div>

                {/* 5. VARYANTLAR VE İLGİLİ ÜRÜNLER */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <RelatedAndVariantsEditor control={control} register={register} name="variants" title="Varyantlar" />
                    <RelatedAndVariantsEditor control={control} register={register} name="relatedProducts" title="İlgili Ürünler" />
                </div>
            </form>

            {modal.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-8 duration-300">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[320px] overflow-hidden">
                        <div className="p-4 flex items-center gap-3">
                            {modal.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-slate-900">{modal.type === 'success' ? 'Başarılı' : 'Hata'}</h3>
                                <p className="text-[11px] text-slate-500">{modal.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const ImageUploadManager = ({ control, articleNo, watch }: any) => {
    const { fields, append, remove, move } = useFieldArray({ control, name: "image" });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sensors = useSensors(useSensor(PointerSensor));

    // Watching the images so we can pass the actual string value to children
    const imageValues = watch("image");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // We need category and name to build the paths
        const category = watch("category");
        const name = watch("name");

        if (!category || !name) {
            alert("Lütfen önce ürün adını ve kategorisini doldurun.");
            return;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('productName', name);
        Array.from(files).forEach(file => formData.append('files', file));

        try {
            const res = await fetch('/api/admin/upload-product-images', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const { paths } = await res.json();
                // Append the new server paths to the form state
                paths.forEach((path: string) => append(path));
            } else {
                console.error("Yükleme hatası");
            }
        } catch (err) {
            console.error("Sunucu bağlantı hatası", err);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            move(fields.findIndex(f => f.id === active.id), fields.findIndex(f => f.id === over.id));
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
                <h2 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <ImageIcon size={14} className="text-brand-hover-blue" /> Ürün Görselleri
                </h2>
                <div className="flex gap-2">
                    <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <Button type="button" onClick={() => fileInputRef.current?.click()} className="h-8 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase rounded-lg cursor-pointer">
                        <Upload size={12} className="mr-1.5" /> Görsel Yükle
                    </Button>
                </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={horizontalListSortingStrategy}>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {fields.map((field, index) => (
                            <SortableImagePreview 
                                key={field.id} 
                                id={field.id} 
                                index={index} 
                                // CRITICAL: Pass the actual string value from the form state, not field.id
                                src={imageValues?.[index]} 
                                onRemove={() => remove(index)} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            
            {fields.length === 0 && (
                <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer border-2 border-dashed border-slate-100 rounded-xl py-12 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
                    <Upload size={32} className="text-slate-200 mb-2" />
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Görsel seçmek için tıklayın</p>
                </div>
            )}
        </div>
    );
};

const SortableImagePreview = ({ id, index, src, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : 'auto' };

    // Safety check: Don't try to render an Image if src is missing or an invalid UUID
    const isValidSrc = src && (src.startsWith('/') || src.startsWith('blob:') || src.startsWith('http'));

    return (
        <div ref={setNodeRef} style={style} className={`relative aspect-square rounded-xl border border-slate-200 bg-white group transition-all ${isDragging ? 'opacity-50 scale-95 shadow-xl' : 'hover:border-brand-hover-blue/30'}`}>
            {isValidSrc ? (
                <Image src={src} alt="Product" fill className="object-contain p-3" unoptimized />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 italic text-[10px]">Yükleniyor...</div>
            )}
            
            <div {...attributes} {...listeners} className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
                <GripHorizontal className="text-white" size={24} />
            </div>

            <button type="button" onClick={onRemove} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={14} />
            </button>

            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur shadow-sm text-[9px] font-bold text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">
                {index + 1}
            </div>
        </div>
    );
};

const FeaturesEditor = ({ control, register }: any) => {
    const { fields, append, remove, move } = useFieldArray({ control, name: "features" });
    const sensors = useSensors(useSensor(PointerSensor));
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            move(fields.findIndex(f => f.id === active.id), fields.findIndex(f => f.id === over.id));
        }
    };
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
                <h2 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <ListChecks size={14} className="text-brand-hover-blue" /> Ürün Özellikleri
                </h2>
                <button type="button" onClick={() => append("")} className="text-[10px] font-bold text-brand-hover-blue hover:underline cursor-pointer uppercase">+ Özellik Ekle</button>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1.5">
                        {fields.map((field, index) => (
                            <SortableFeatureItem key={field.id} id={field.id} index={index} register={register} onRemove={() => remove(index)} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

const SortableFeatureItem = ({ id, index, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 50 : 'auto' };
    return (
        <div ref={setNodeRef} style={style} className="flex gap-2 items-center bg-white group">
            <div {...attributes} {...listeners} className="cursor-grab p-2 text-slate-300 hover:text-slate-500"><GripVertical size={14} /></div>
            <input {...register(`features.${index}`)} className="flex-1 h-10 px-3 border border-slate-100 rounded-lg text-[12px] outline-none focus:border-brand-hover-blue/40 bg-slate-50/30" />
            <button type="button" onClick={onRemove} className="p-2 text-slate-300 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
        </div>
    );
};