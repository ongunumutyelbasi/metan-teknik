"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { products as sennheiserProducts } from '@/src/data/sennheiser-products';
import type { SennheiserProduct } from '@/src/types/product-schema';

// External Admin Components
import { TechnicalSpecsEditor } from '@/components/admin/TechnicalSpecsEditor';
import { BoxContentsEditor } from '@/components/admin/BoxContentsEditor';
import { RelatedAndVariantsEditor } from '@/components/admin/RelatedAndVariantsEditor';

// UI Components
import ActionButton from '@/components/ui/ActionButton';
import { Plus, Trash2, Info, ListChecks, GripVertical, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

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

interface Product {
    name: string;
    articleNo: string;
    category: string;
    shortDescription: string;
    longDescription: string;
    features: string[];
    highlightedFeatures: { label: string; value: string }[];
    boxContents: { item: string; quantity: number }[];
    technicalSpecs: { label: string; value: string }[];
    variants: string[];
    relatedProducts: string[];
}

export default function AddProductPage() {
    const router = useRouter();
    const [modal, setModal] = useState<{show: boolean, type: 'success' | 'error', message: string}>({
        show: false,
        type: 'success',
        message: ''
    });

    const defaultNewProduct = {
        name: "",
        articleNo: "",
        category: "",
        shortDescription: "",
        longDescription: "",
        features: [],
        highlightedFeatures: [],
        boxContents: [],
        technicalSpecs: [],
        variants: [],
        relatedProducts: []
    };

    const { register, control, handleSubmit, formState: { isDirty }, reset } = useForm<Product>({
        defaultValues: defaultNewProduct
    });
    
    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: "highlightedFeatures"
    });

    const onSubmit = async (data: Product) => {
        try {
            const exists = sennheiserProducts.some(p => p.articleNo === data.articleNo);
            if (exists) {
                setModal({ show: true, type: 'error', message: 'Bu ürün kodu zaten mevcut!' });
                return;
            }

            const slugify = (text: string) => 
                text.toLowerCase()
                    .trim()
                    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');

            const nameSlug = slugify(data.name);
            const categorySlug = slugify(data.category);
            
            const finalProductData: SennheiserProduct = {
                ...data,
                id: Number(data.articleNo) || Math.floor(Math.random() * 10000),
                link: `/sennheiser/urunler/${categorySlug}/${nameSlug}-${data.articleNo}`,
                image: [`/images/sennheiser/urunler/${nameSlug}/1.webp`],
                // Directly use data.technicalSpecs because the Editor already 
                // structures it as an array of sections with mainTitle and specs.
                technicalSpecs: data.technicalSpecs as any,
                applicationTypes: [],
                microphoneForm: [],
                pickupPattern: [],
                transducerType: [],
                connectors: [],
                productSeries: [],
                systemPart: [],
                productType: [],
                connection: ""
            };

            const res = await fetch('/api/admin/save-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    password: 'sennheiser_admin_2026',
                    data: [...sennheiserProducts, finalProductData] 
                }),
            });

            if (res.ok) {
                setModal({ show: true, type: 'success', message: 'Yeni ürün başarıyla eklendi!' });
                reset(data); 
                setTimeout(() => {
                    router.refresh(); 
                    router.push(`/admin/edit/${data.articleNo}`);
                }, 1500);
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

    return (
        <div className="relative animate-in fade-in duration-500">
            <style jsx global>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
                @keyframes modalCountdown {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
                {/* Simplified Sticky Header for Admin Dashboard */}
                <div className="flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-4 rounded-xl border border-slate-200 sticky top-4 z-20 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 leading-tight">Yeni Ürün Ekle</h1>
                        <p className="text-xs text-slate-500">Sennheiser ürün kataloğuna yeni bir öğe ekleyin</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                            İptal
                        </button>
                        <ActionButton 
                            text="Ürünü Kaydet" 
                            type="submit" 
                            className="!bg-metan-orange !text-white !px-6 !rounded-lg hover:!bg-metan-orange/85 !border-none !shadow-md shadow-blue-200 transition-all cursor-pointer" 
                        />
                    </div>
                </div>

                {/* Form Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                                <Info size={16} className="text-blue-500" /> Genel Bilgiler
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ÜRÜN KODU (Article No)</label>
                                    <input {...register("articleNo", { required: true })} placeholder="Örn: 508826" className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-slate-50 font-mono outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategori</label>
                                    <div className="relative">
                                        <select {...register("category")} className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                                            <option value="">Kategori Seçin</option>
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ürün Adı</label>
                                <input {...register("name", { required: true })} placeholder="Örn: EW-D ME2 SET" className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kısa Açıklama</label>
                                <textarea {...register("shortDescription")} rows={2} className="w-full p-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uzun Açıklama</label>
                                <textarea {...register("longDescription")} rows={6} className="w-full p-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>
                        </div>

                        <FeaturesEditor control={control} register={register} />
                        
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <TechnicalSpecsEditor control={control} register={register} />
                        </div>
                    </div>

                    {/* Right Column: Sidebar content */}
                    <div className="space-y-6">
                        <BoxContentsEditor control={control} register={register} />
                        
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                                <h2 className="text-sm font-bold flex items-center gap-2 text-slate-800">
                                    <CheckCircle2 size={16} className="text-emerald-500" /> Öne Çıkanlar
                                </h2>
                                <button type="button" onClick={() => appendHighlight({ label: "", value: "" })} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <Plus size={14} /> Ekle
                                </button>
                            </div>

                            {/* Only render this div if there are actually fields to show */}
                            {highlightFields.length > 0 ? (
                                <div className="space-y-3">
                                    {highlightFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start group">
                                            <div className="flex-1 space-y-1">
                                                <input {...register(`highlightedFeatures.${index}.label`)} placeholder="Başlık" className="w-full p-2 border border-slate-100 rounded bg-slate-50/50 text-[11px] focus:bg-white focus:border-blue-500 outline-none" />
                                                <input {...register(`highlightedFeatures.${index}.value`)} placeholder="Değer" className="w-full p-2 border border-slate-100 rounded bg-slate-50/50 text-[11px] focus:bg-white focus:border-blue-500 outline-none" />
                                            </div>
                                            <button type="button" onClick={() => removeHighlight(index)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Optional: Show a placeholder so the box doesn't look "broken" when empty */
                                <p className="text-[11px] text-slate-400 italic text-center py-2">Henüz özellik eklenmedi.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <RelatedAndVariantsEditor control={control} register={register} name="variants" title="Varyantlar" />
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <RelatedAndVariantsEditor control={control} register={register} name="relatedProducts" title="İlgili Ürünler" />
                    </div>
                </div>
            </form>

            {/* Modal remains same but top adjusted */}
            {modal.show && (
                <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-8 duration-300">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[320px] overflow-hidden">
                        <div className="p-4 flex items-center gap-4">
                            {modal.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-900">{modal.type === 'success' ? 'Başarılı' : 'Hata'}</h3>
                                <p className="text-xs text-slate-500">{modal.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export const FeaturesEditor = ({ control, register }: any) => {
    const { fields, append, remove, move } = useFieldArray({ control, name: "features" });
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    return (
        <div className="bg-white p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                <h2 className="text-xs font-bold flex items-center gap-2"><ListChecks size={14} /> Özellikler</h2>
                <button type="button" onClick={() => append("")} className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-1"><Plus size={12} /> Ekle</button>
            </div>
            <DndContext id="features-dnd-context" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1">
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
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-600"><GripVertical size={14} /></div>
            <input {...register(`features.${index}`)} className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-hover-blue outline-none bg-gray-50/30" />
            <button type="button" onClick={onRemove} className="p-1 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
        </div>
    );
};