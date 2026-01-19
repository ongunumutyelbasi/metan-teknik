"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { products as sennheiserProducts } from '@/src/data/sennheiser-products';

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

    const onSubmit = async (data: any) => {
        try {
            // 1. Prevent duplicate article numbers
            const exists = sennheiserProducts.some(p => p.articleNo === data.articleNo);
            if (exists) {
                setModal({ show: true, type: 'error', message: 'Bu ürün kodu zaten mevcut!' });
                return;
            }

            // 2. Slugification helper for the link
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
            
            // 3. Construct the full product object to match SennheiserProduct schema
            const finalProductData = {
                ...data,
                id: Number(data.articleNo) || Math.floor(Math.random() * 10000),
                link: `/sennheiser/urunler/${categorySlug}/${nameSlug}-${data.articleNo}`,
                image: [`/images/sennheiser/urunler/${nameSlug}/1.webp`],
                // Default values for required filter arrays
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

            // 4. Save to the JSON file via API
            const res = await fetch('/api/admin/save-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    password: 'sennheiser_admin_2026',
                    data: [...sennheiserProducts, finalProductData] 
                }),
            });

            if (res.ok) {
                setModal({ show: true, type: 'success', message: 'Yeni ürün başarıyla eklendi! Düzenleme sayfasına aktarılıyorsunuz...' });
                
                // 5. Reset the form state
                reset(data); 
                
                // 6. Navigate to the edit page so you can continue adding details
                setTimeout(() => {
                    // Ensure the refresh happens so the Edit page can find the new data
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
        <div className="min-h-screen pt-[96px] bg-gray-50 p-4 font-sennheiser relative">
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

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-3 pb-10">
                <div className="flex justify-between items-center bg-white px-4 py-2 rounded-md border border-gray-200 sticky top-[96px] z-20 shadow-sm">
                    <h1 className="text-md font-bold text-black">Yeni Ürün Ekle</h1>
                    <div className="flex gap-2">
                        <ActionButton className="bg-black text-white border border-transparent hover:bg-transparent hover:text-black hover:border-black" text="İptal" type="button" onClick={() => router.back()} />
                        <ActionButton 
                            text="Ürünü Oluştur" 
                            type="submit" 
                            className="!text-white border !transition-all !duration-300 enabled:!bg-brand-hover-blue enabled:!border-brand-hover-blue enabled:hover:!bg-transparent enabled:hover:!text-brand-hover-blue" 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-md border border-gray-200 space-y-2">
                        <h2 className="text-xs font-bold flex items-center gap-2 border-b pb-1.5 mb-2">
                            <Info size={14} /> Genel Bilgiler
                        </h2>
                        <div className="space-y-2">
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">ÜRÜN KODU (Article No)</label>
                                <input {...register("articleNo", { required: true })} className="w-full h-[37px] p-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 font-mono outline-none focus:border-brand-hover-blue" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Ürün Adı</label>
                                <input {...register("name", { required: true })} className="w-full h-[37px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Kategori</label>
                                <div className="relative group">
                                    <select {...register("category")} className="w-full h-[37px] px-2 text-xs border border-gray-200 rounded-md outline-none bg-white appearance-none cursor-pointer focus:border-brand-hover-blue transition-colors">
                                        <option value="">Kategori Seçin</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-brand-hover-blue">
                                        <ChevronDown size={14} strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5 pt-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Kısa Açıklama</label>
                                <textarea {...register("shortDescription")} className="w-full min-h-[60px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue resize-none" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Uzun Açıklama (Markdown)</label>
                                <textarea {...register("longDescription")} className="w-full min-h-[120px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue font-sans" />
                            </div>
                        </div>
                    </div>
                    <BoxContentsEditor control={control} register={register} />
                </div>

                <FeaturesEditor control={control} register={register} />

                <div className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                        <h2 className="text-xs font-bold flex items-center gap-2 text-black">
                            <CheckCircle2 size={14} /> Öne Çıkan Özellikler
                        </h2>
                        <button type="button" onClick={() => appendHighlight({ label: "", value: "" })} className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-1">
                            <Plus size={12} /> Ekle
                        </button>
                    </div>
                    <div className="space-y-2">
                        {highlightFields.length > 0 && (
                            <div className="flex gap-2 px-7 mb-1">
                                <label className="flex-1 text-[8px] font-bold text-gray-400 uppercase">Başlık</label>
                                <label className="flex-1 text-[8px] font-bold text-gray-400 uppercase">Detay</label>
                                <div className="w-[22px]"></div>
                            </div>
                        )}
                        {highlightFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                                <div className="p-1 text-gray-300"><ChevronDown size={14} className="-rotate-90 opacity-50" /></div>
                                <input {...register(`highlightedFeatures.${index}.label`)} className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-hover-blue outline-none bg-gray-50/30" />
                                <input {...register(`highlightedFeatures.${index}.value`)} className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-hover-blue outline-none bg-gray-50/30" />
                                <button type="button" onClick={() => removeHighlight(index)} className="p-1 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md border border-gray-200">
                    <TechnicalSpecsEditor control={control} register={register} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <RelatedAndVariantsEditor control={control} register={register} name="variants" title="Varyantlar" />
                    <RelatedAndVariantsEditor control={control} register={register} name="relatedProducts" title="İlgili Ürünler" />
                </div>
            </form>

            {modal.show && (
                <div className="fixed top-[105px] left-1/2 -translate-x-1/2 z-[100000] animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-md shadow-xl border border-gray-200 w-[280px] overflow-hidden relative">
                        <div className="p-3 flex items-center gap-3">
                            {modal.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                            <div className="flex-1">
                                <h3 className="text-[11px] font-bold text-black leading-none mb-0.5">{modal.type === 'success' ? 'İşlem Başarılı' : 'Hata Oluştu'}</h3>
                                <p className="text-[10px] text-gray-500 truncate">{modal.message}</p>
                            </div>
                        </div>
                        {modal.type === 'success' && (
                            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
                                <div className="h-full bg-emerald-500" style={{ animation: 'modalCountdown 4s linear forwards' }} />
                            </div>
                        )}
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