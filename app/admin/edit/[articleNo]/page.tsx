"use client";

import React, { useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
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

    const { register, control, handleSubmit, formState: { isDirty }, reset } = useForm({
        defaultValues: product
    });
    
    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: "highlightedFeatures"
    });

    const onSubmit = async (data: any) => {
        try {
            const updatedProducts = sennheiserProducts.map(p => 
                p.articleNo === articleNo ? data : p
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

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (modal.show && modal.type === 'success') {
            timer = setTimeout(() => {
                setModal(prev => ({ ...prev, show: false }));
            }, 4000); // Closes after 6 seconds
        }
        return () => clearTimeout(timer);
    }, [modal.show, modal.type]);

    if (!product) return <div className="p-20 text-center font-bold">Ürün bulunamadı.</div>;

    return (
        <div className="min-h-screen pt-[96px] bg-gray-50 p-4 font-sennheiser relative">
            {/* GLOBAL CSS INJECTION TO HIDE NUMBER ARROWS */}
            <style jsx global>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
                
                /* Added the countdown animation here */
                @keyframes modalCountdown {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-3 pb-10">
                {/* STICKY HEADER */}
                <div className="flex justify-between items-center bg-white px-4 py-2 rounded-md border border-gray-200 sticky top-[96px] z-20 shadow-sm">
                    <div className="flex items-center gap-3">
                        <h1 className="text-md font-bold text-black">{product.name}</h1>
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 text-dark-gray font-mono">
                            {product.articleNo}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <ActionButton className="bg-black text-white border border-transparent hover:bg-transparent hover:text-black hover:border-black" text="İptal" type="button" onClick={() => router.back()} />
                        <ActionButton 
                            text="Kaydet" 
                            type="submit" 
                            disabled={!isDirty} 
                            className="!text-white border !transition-all !duration-300 disabled:!bg-gray-400 enabled:!bg-brand-hover-blue enabled:!border-brand-hover-blue enabled:hover:!bg-transparent enabled:hover:!text-brand-hover-blue" 
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
                                <label className="text-[9px] font-bold text-gray-500 uppercase">ÜRÜN KODU</label>
                                <input {...register("articleNo")} className="w-full h-[37px] p-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 font-mono outline-none focus:border-brand-hover-blue" />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Ürün Adı</label>
                                <input {...register("name")} className="w-full h-[37px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue" />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Kategori</label>
                                <div className="relative group">
                                    <select 
                                        {...register("category")} 
                                        className="w-full h-[37px] px-2 text-xs border border-gray-200 rounded-md outline-none bg-white appearance-none cursor-pointer focus:border-brand-hover-blue transition-colors"
                                    >
                                        <option value="">Kategori Seçin</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-brand-hover-blue">
                                        <ChevronDown size={14} strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5 pt-2">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Kısa Açıklama</label>
                                <textarea 
                                    {...register("shortDescription")} 
                                    className="w-full min-h-[60px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue resize-none"
                                    placeholder="Ürün başlığı altındaki kısa özet..."
                                />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <label className="text-[9px] font-bold text-gray-500 uppercase">Uzun Açıklama (Markdown Destekli)</label>
                                <textarea 
                                    {...register("longDescription")} 
                                    className="w-full min-h-[120px] p-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-brand-hover-blue font-sans"
                                    placeholder="Ana ürün açıklaması..."
                                />
                            </div>
                        </div>
                    </div>
                    <BoxContentsEditor control={control} register={register} />
                </div>

                <FeaturesEditor control={control} register={register} />

                {/* ÖNE ÇIKAN ÖZELLİKLER */}
                <div className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                        <h2 className="text-xs font-bold flex items-center gap-2 text-black">
                            <CheckCircle2 size={14} /> Öne Çıkan Özellikler
                        </h2>
                        <button 
                            type="button" 
                            onClick={() => appendHighlight({ label: "", value: "" })} 
                            className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-1"
                        >
                            <Plus size={12} /> Ekle
                        </button>
                    </div>
                    
                    <div className="space-y-2">
                        {/* Header for the two columns */}
                        {highlightFields.length > 0 && (
                            <div className="flex gap-2 px-7 mb-1">
                                <label className="flex-1 text-[8px] font-bold text-gray-400 uppercase">Başlık (Label)</label>
                                <label className="flex-1 text-[8px] font-bold text-gray-400 uppercase">Detay (Value)</label>
                                <div className="w-[22px]"></div> {/* Spacer for trash icon */}
                            </div>
                        )}

                        {highlightFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                                <div className="p-1 text-gray-300">
                                    <ChevronDown size={14} className="-rotate-90 opacity-50" />
                                </div>
                                
                                {/* Label Input (Left Side) */}
                                <input 
                                    {...register(`highlightedFeatures.${index}.label`)} 
                                    placeholder="Örn: Frekans"
                                    className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-blue outline-none bg-gray-50/30 font-medium"
                                />

                                {/* Value Input (Right Side) */}
                                <input 
                                    {...register(`highlightedFeatures.${index}.value`)} 
                                    placeholder="Örn: 20Hz - 20kHz"
                                    className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-blue outline-none bg-gray-50/30"
                                />

                                <button 
                                    type="button" 
                                    onClick={() => removeHighlight(index)} 
                                    className="p-1 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        
                        {highlightFields.length === 0 && (
                            <p className="text-[10px] text-gray-400 italic py-2 text-center">Henüz öne çıkan özellik eklenmemiş.</p>
                        )}
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

            {/* CENTERED NOTIFICATION BANNER */}
            {modal.show && (
                <div className="fixed top-[105px] left-1/2 -translate-x-1/2 z-[100000] animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
                    <div className="bg-white rounded-md shadow-xl border border-gray-200 w-[280px] overflow-hidden relative">
                        <div className="p-3 flex items-center gap-3">
                            <div className="flex-shrink-0">
                                {modal.type === 'success' ? (
                                    <CheckCircle2 className="text-emerald-500" size={20} />
                                ) : (
                                    <XCircle className="text-red-500" size={20} />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[11px] font-bold text-black leading-none mb-0.5">
                                    {modal.type === 'success' ? 'İşlem Başarılı' : 'Hata Oluştu'}
                                </h3>
                                <p className="text-[10px] text-gray-500 truncate">
                                    {modal.message}
                                </p>
                            </div>

                            <button 
                                onClick={() => setModal({ ...modal, show: false })}
                                className="text-gray-400 hover:text-black cursor-pointer transition-colors"
                            >
                                <XCircle size={14} />
                            </button>
                        </div>

                        {/* Countdown Bar */}
                        {modal.type === 'success' && (
                            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
                                <div 
                                    className="h-full bg-emerald-500"
                                    style={{
                                        animation: 'modalCountdown 4s linear forwards'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export const FeaturesEditor = ({ control, register }: any) => {
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "features"
    });

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
                <h2 className="text-xs font-bold flex items-center gap-2">
                    <ListChecks size={14} /> Özellikler
                </h2>
                <button 
                    type="button" 
                    onClick={() => append("")} 
                    className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                    <Plus size={12} /> Ekle
                </button>
            </div>
            
            <DndContext id="features-dnd-context" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1">
                        {fields.map((field, index) => (
                            <SortableFeatureItem 
                                key={field.id} 
                                id={field.id} 
                                index={index} 
                                register={register} 
                                onRemove={() => remove(index)} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

const SortableFeatureItem = ({ id, index, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto'
    };

    return (
        <div ref={setNodeRef} style={style} className="flex gap-2 items-center group bg-white">
            <div 
                {...attributes} 
                {...listeners} 
                className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-600"
            >
                <GripVertical size={14} />
            </div>

            <input 
                {...register(`features.${index}`)} 
                placeholder="Özellik metni..."
                className="flex-1 p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-blue outline-none bg-gray-50/30"
            />
            
            <button 
                type="button" 
                onClick={onRemove} 
                className="p-1 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
};