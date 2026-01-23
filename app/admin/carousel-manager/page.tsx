"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { 
  Trash2, Plus, ImageIcon, 
  Link as LinkIcon, Save, Layout, Type,
  CheckCircle2, XCircle, ChevronUp, ChevronDown, Upload
} from 'lucide-react';
import { Button } from "@/components/ui/button";

import initialSlides from '@/data/hero-slides.json';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    link: string;
    productImg: string;
    lifestyleImg: string;
    productFile?: File;
    lifestyleFile?: File;
}

export default function CarouselManager() {
    const [modal, setModal] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const { register, control, handleSubmit, setValue, watch, formState: { isDirty } } = useForm<{ slides: HeroSlide[] }>({
        defaultValues: { slides: initialSlides }
    });

    const { fields, append, remove, move } = useFieldArray({ control, name: "slides" });

    const onSubmit = async (formData: { slides: HeroSlide[] }) => {
        setIsSaving(true);
        try {
            const data = new FormData();
            const jsonContent = formData.slides.map(({ productFile, lifestyleFile, ...rest }) => rest);
            data.append('slidesData', JSON.stringify(jsonContent));
            data.append('password', 'sennheiser_admin_2026');
            formData.slides.forEach((slide, index) => {
                if (slide.productFile) data.append(`product_${index}`, slide.productFile);
                if (slide.lifestyleFile) data.append(`lifestyle_${index}`, slide.lifestyleFile);
            });
            const res = await fetch('/api/admin/save-hero', { method: 'POST', body: data });
            if (res.ok) {
                setModal({ show: true, type: 'success', message: 'Carousel başarıyla güncellendi!' });
                setTimeout(() => window.location.reload(), 1500);
            } else {
                setModal({ show: true, type: 'error', message: 'Kaydetme hatası oluştu.' });
            }
        } catch (err) {
            setModal({ show: true, type: 'error', message: 'Sunucuya bağlanılamadı.' });
        } finally {
            setIsSaving(false);
        }
    };

    // Modal auto-hide logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (modal.show && modal.type === 'success') {
            timer = setTimeout(() => {
                setModal(prev => ({ ...prev, show: false }));
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [modal.show, modal.type]);

    const handleJumpToOrder = (fromIndex: number, toOrder: string) => {
        const toIndex = parseInt(toOrder, 10) - 1;
        if (!isNaN(toIndex) && toIndex >= 0 && toIndex < fields.length && toIndex !== fromIndex) {
            move(fromIndex, toIndex);
        }
    };

    return (
        <div className="max-w-[100vw] mx-auto px-0 pb-10 animate-in fade-in duration-500">
            {/* Global Animation Styles */}
            <style jsx global>{`
                @keyframes modalCountdown { from { width: 100%; } to { width: 0%; } }
            `}</style>
            
            {/* STICKY HEADER */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-4 rounded-xl border border-slate-200 sticky top-4 z-50 shadow-sm mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
                        <Layout size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-regular leading-none mb-1">Carousel Yönetimi</p>
                        <p className="text-sm font-bold text-slate-900 leading-none">
                            {fields.length} <span className="text-[11px] font-medium text-slate-500">Aktif Slayt</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={() => append({ id: Date.now(), title: '', subtitle: '', link: '', productImg: '', lifestyleImg: '' })} 
                        className="h-8.5 px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer uppercase"
                    >
                        Yeni Slayt Ekle
                    </button>
                    
                    <Button 
                        onClick={handleSubmit(onSubmit)} 
                        disabled={!isDirty || isSaving} 
                        className="h-8.5 bg-metan-orange hover:bg-metan-orange/85 text-white font-bold uppercase text-[10px] tracking-normal px-4 rounded-lg transition-all cursor-pointer border-none shadow-sm shadow-metan-orange/20"
                    >
                        <Save className="mr-1.5 h-3.5 w-3.5" /> {isSaving ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                {fields.map((field, index) => (
                    <SlideRow 
                        key={field.id}
                        index={index}
                        total={fields.length}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        onRemove={() => remove(index)}
                        onMoveUp={() => index > 0 && move(index, index - 1)}
                        onMoveDown={() => index < fields.length - 1 && move(index, index + 1)}
                        onJumpOrder={(val: string) => handleJumpToOrder(index, val)}
                    />
                ))}
            </div>

            {/* UPDATED MODAL - Centered at top with progress bar */}
            {modal.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-8 duration-300">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[320px] overflow-hidden">
                        <div className="p-4 flex items-center gap-3">
                            {modal.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">{modal.type === 'success' ? 'Başarılı' : 'Hata'}</h3>
                                <p className="text-[11px] text-slate-500 leading-tight">{modal.message}</p>
                            </div>
                        </div>
                        {modal.type === 'success' && (
                            <div className="h-1 bg-emerald-500 w-full animate-[modalCountdown_4s_linear_forwards]" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const SlideRow = ({ index, total, register, onRemove, onMoveUp, onMoveDown, onJumpOrder, setValue, watch }: any) => {
    const productImg = watch(`slides.${index}.productImg`);
    const lifestyleImg = watch(`slides.${index}.lifestyleImg`);
    const [tempOrder, setTempOrder] = useState((index + 1).toString());

    useEffect(() => {
        setTempOrder((index + 1).toString());
    }, [index]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileField: any, pathField: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fileField, file, { shouldDirty: true });
            setValue(pathField, URL.createObjectURL(file), { shouldDirty: true });
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-300 transition-all p-2 flex items-center gap-4">
            <div className="flex flex-col gap-0.5 items-center w-8 shrink-0">
                <button type="button" onClick={onMoveUp} disabled={index === 0} className="p-1 hover:bg-slate-100 rounded disabled:opacity-20 cursor-pointer text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronUp size={14} />
                </button>
                <input 
                    type="text"
                    value={tempOrder}
                    onChange={(e) => setTempOrder(e.target.value.replace(/\D/g, ''))}
                    onBlur={() => onJumpOrder(tempOrder)}
                    onKeyDown={(e) => e.key === 'Enter' && onJumpOrder(tempOrder)}
                    className="w-full text-center text-[11px] font-extrabold text-slate-600 bg-slate-50 border border-slate-100 rounded py-0.5 focus:bg-white focus:border-metan-orange focus:ring-1 focus:ring-metan-orange/20 outline-none transition-all"
                />
                <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="p-1 hover:bg-slate-100 rounded disabled:opacity-20 cursor-pointer text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronDown size={14} />
                </button>
            </div>

            <div className="flex gap-2">
                <div className="relative w-14 h-14 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden group/img shrink-0">
                    {lifestyleImg ? <img src={lifestyleImg} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={14} /></div>}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload size={12} className="text-white" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, `slides.${index}.lifestyleFile`, `slides.${index}.lifestyleImg`)} />
                    </label>
                </div>
                <div className="relative w-14 h-14 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden group/img shrink-0">
                    {productImg ? <img src={productImg} className="w-full h-full object-contain p-1" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={14} /></div>}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload size={12} className="text-white" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, `slides.${index}.productFile`, `slides.${index}.productImg`)} />
                    </label>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-3 items-end pb-1">
                <div className="col-span-3 flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Başlık</label>
                    <input {...register(`slides.${index}.title`)} className="w-full h-7 px-2 text-[11px] font-bold border border-slate-200 rounded-md outline-none bg-slate-50/50 focus:bg-white focus:border-metan-orange transition-all" />
                </div>
                <div className="col-span-5 flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Alt Başlık</label>
                    <input {...register(`slides.${index}.subtitle`)} className="w-full h-7 px-2 text-[11px] border border-slate-200 rounded-md outline-none bg-slate-50/50 focus:bg-white focus:border-metan-orange transition-all" />
                </div>
                <div className="col-span-4 flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Link</label>
                    <div className="relative">
                        <LinkIcon size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input {...register(`slides.${index}.link`)} className="w-full h-7 pl-6 pr-2 text-[11px] border border-slate-200 rounded-md outline-none bg-slate-50/50 focus:bg-white focus:border-metan-orange transition-all" />
                    </div>
                </div>
            </div>

            <button type="button" onClick={onRemove} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer shrink-0">
                <Trash2 size={16} />
            </button>
        </div>
    );
};