"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray, Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { 
  Trash2, Plus, ImageIcon, Save, 
  Building2, Upload, GripVertical,
  CheckCircle2, XCircle, Library, Check, ChevronDown, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Interfaces ---
interface Dealer {
    id: string;
    name: string;
    logo: string;
    logoFile?: File;
    city: string;
    address: string;
    phone: string;
    website: string;
    websiteLabel: string;
    googleMapsUrl: string;
}

interface BayiSection {
    id: string;
    title: string;
    dealers: Dealer[];
}

interface SortableSectionProps {
    id: string;
    index: number;
    register: UseFormRegister<{ sections: BayiSection[] }>;
    remove: (index: number) => void;
    control: Control<{ sections: BayiSection[] }>;
    setValue: UseFormSetValue<{ sections: BayiSection[] }>;
    watch: UseFormWatch<{ sections: BayiSection[] }>;
    library: string[];
    onRefreshLibrary: () => void;
}

interface SortableDealerProps {
    id: string;
    index: number;
    sectionIndex: number;
    register: UseFormRegister<{ sections: BayiSection[] }>;
    remove: (index: number) => void;
    watch: UseFormWatch<{ sections: BayiSection[] }>;
    setValue: UseFormSetValue<{ sections: BayiSection[] }>;
    library: string[];
    onRefreshLibrary: () => void;
}

export default function BayiManager() {
    const [modal, setModal] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [logoLibrary, setLogoLibrary] = useState<string[]>([]);

    const fetchLibrary = async () => {
        try {
            const res = await fetch('/api/admin/bayi-logolari');
            const data = await res.json();
            if (Array.isArray(data)) setLogoLibrary(data);
        } catch (e) { console.error("Library fetch error", e); }
    };

    const { register, control, handleSubmit, setValue, watch, formState: { isDirty }, reset } = useForm<{ sections: BayiSection[] }>({
        defaultValues: async () => {
            fetchLibrary();
            const res = await fetch('/api/admin/bayiler');
            const data = await res.json();
            return { 
                sections: (data || []).map((s: any) => ({
                    ...s,
                    id: s.id || `sec-${Math.random()}`,
                    dealers: (s.dealers || []).map((d: any) => ({ 
                        ...d, 
                        id: d.id || `dlr-${Math.random()}`
                    }))
                }))
            };
        }
    });

    const { fields, append, remove, move } = useFieldArray({ control, name: "sections" });
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    useEffect(() => {
        if (modal.show) {
            const timer = setTimeout(() => {
                setModal(prev => ({ ...prev, show: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [modal.show]);

    const handleSectionDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    const onSubmit = async (formData: { sections: BayiSection[] }) => {
        setIsSaving(true);
        try {
            const data = new FormData();
            const cleanSections = formData.sections.map(section => ({
                ...section,
                dealers: section.dealers.map(({ logoFile, ...d }: Dealer) => d)
            }));
            data.append('sectionsData', JSON.stringify(cleanSections));
            formData.sections.forEach((section, sIdx) => {
                section.dealers.forEach((dealer: Dealer, dIdx) => {
                    if (dealer.logoFile instanceof File) data.append(`logo_${sIdx}_${dIdx}`, dealer.logoFile);
                });
            });
            const res = await fetch('/api/admin/bayiler', { method: 'POST', body: data });
            if (res.ok) {
                setModal({ show: true, type: 'success', message: 'Başarıyla kaydedildi!' });
                fetchLibrary();
                reset(formData);
            }
        } catch (err) {
            setModal({ show: true, type: 'error', message: 'Sunucu hatası.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-[100vw] mx-auto px-0 pb-10 animate-in fade-in duration-500">
            <style jsx global>{`@keyframes modalCountdown { from { width: 100%; } to { width: 0%; } }`}</style>
            
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-2 py-2 rounded-lg border border-slate-200 sticky top-4 z-50 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
                        <Building2 size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-regular leading-none mb-1">Bayi Yönetimi</p>
                        <p className="text-sm font-bold text-slate-900 leading-none">
                            {fields.length} <span className="text-[11px] font-medium text-slate-500">Aktif Bölge</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={() => append({ id: `sec-${Date.now()}`, title: 'Yeni Bölge', dealers: [] })} 
                        className="h-8.5 px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer uppercase"
                    >
                        Bölge Ekle
                    </button>
                    
                    <Button 
                        onClick={handleSubmit(onSubmit)} 
                        disabled={!isDirty || isSaving} 
                        className="h-8.5 bg-metan-orange hover:bg-metan-orange/85 text-white font-bold uppercase text-[10px] tracking-normal px-4 rounded-lg transition-all cursor-pointer border-none flex items-center gap-2"
                    >
                        <Save size={14} /> {isSaving ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
                    </Button>
                </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
                <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <SortableSection key={field.id} id={field.id} index={index} register={register} remove={remove} control={control} setValue={setValue} watch={watch} library={logoLibrary} onRefreshLibrary={fetchLibrary} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {modal.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
                    <div className="bg-white rounded-sm shadow-2xl border border-slate-200 min-w-[320px] overflow-hidden pointer-events-auto">
                        <div className="p-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {modal.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                                <p className="text-[12px] font-bold text-slate-800">{modal.message}</p>
                            </div>
                            <button onClick={() => setModal(prev => ({ ...prev, show: false }))} className="text-slate-300 hover:text-slate-500 cursor-pointer">
                                <X size={16} />
                            </button>
                        </div>
                        {modal.type === 'success' && <div className="h-1 bg-emerald-500 w-full animate-[modalCountdown_4s_linear_forwards]" />}
                    </div>
                </div>
            )}
        </div>
    );
}

const SortableSection = ({ id, index, register, remove, control, setValue, watch, library, onRefreshLibrary }: SortableSectionProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const { fields, append, remove: removeDealer, move } = useFieldArray({ control, name: `sections.${index}.dealers` as const });
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    const handleDealerDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            titleInputRef.current?.blur();
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setIsEditing(true);
        setTimeout(() => {
            titleInputRef.current?.focus();
            titleInputRef.current?.select();
        }, 10);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };

    return (
        <div 
            ref={setNodeRef} 
            style={{ 
                transform: CSS.Transform.toString(transform), 
                transition, 
                zIndex: isDragging ? 100 : 1,
                position: 'relative'
            }} 
            className={`bg-white border rounded-lg overflow-hidden transition-all duration-200 
                ${isDragging 
                    ? 'opacity-40 shadow-2xl scale-[1.01] border-metan-orange ring-2 ring-metan-orange/10' 
                    : 'border-slate-200 shadow-sm hover:border-slate-300'}`}
        >
            <div className="flex items-center gap-1 h-12 bg-white cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
                <div {...attributes} {...listeners} className="cursor-grab p-3 text-slate-300 hover:text-metan-orange transition-colors" onClick={(e) => e.stopPropagation()}>
                    <GripVertical size={18} />
                </div>
                
                <div className="flex items-center flex-1 gap-2 h-full">
                    <button 
                        type="button"
                        onClick={handleEditClick}
                        className={`cursor-pointer p-1.5 rounded-md transition-all ml-1 ${isEditing ? 'text-metan-orange bg-metan-orange/10' : 'text-slate-400 hover:text-metan-orange hover:bg-slate-50'}`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>

                    <input 
                        {...register(`sections.${index}.title`)} 
                        ref={(e) => {
                            register(`sections.${index}.title`).ref(e);
                            titleInputRef.current = e;
                        }}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => isEditing ? e.stopPropagation() : null}
                        className={`text-[13px] font-bold outline-none w-full transition-all duration-200 px-2 h-8 rounded
                            ${isEditing 
                                ? 'text-metan-orange bg-white border border-metan-orange/30 shadow-sm cursor-text pointer-events-auto' 
                                : 'text-slate-700 bg-transparent border-transparent cursor-pointer pointer-events-none'}`} 
                    />
                    
                    <div className="flex items-center bg-slate-50 rounded-md px-2 py-1 gap-1.5 min-w-[70px] justify-center mr-2 border border-slate-200">
                        <span className="text-[12px] font-bold text-metan-orange leading-none">{fields.length}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">BAYİ</span>
                    </div>
                </div>

                <div className="flex items-center pr-2 gap-1">
                    <div className={`p-2 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown size={18} />
                    </div>
                    <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); remove(index); }} 
                        className="p-2 text-slate-200 hover:text-red-500 transition-all cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[5000px] border-t border-slate-100' : 'max-h-0 overflow-hidden'}`}>
                <div className="p-3 bg-slate-50/30">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDealerDragEnd}>
                        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {fields.map((field, dIdx) => (
                                    <SortableDealer 
                                        key={field.id} 
                                        id={field.id} 
                                        index={dIdx} 
                                        sectionIndex={index} 
                                        register={register} 
                                        remove={removeDealer} 
                                        watch={watch} 
                                        setValue={setValue} 
                                        library={library} 
                                        onRefreshLibrary={onRefreshLibrary}
                                    />
                                ))}
                                
                                <button 
                                    type="button" 
                                    onClick={() => append({ id: `dlr-${Date.now()}`, name: '', logo: '', city: '', address: '', phone: '', website: '', websiteLabel: 'Satın Al', googleMapsUrl: '' })} 
                                    className="w-full py-2 border border-dashed border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white hover:text-metan-orange hover:border-metan-orange/50 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <Plus size={12} /> Bayi Ekle
                                </button>
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
};

const SortableDealer = ({ id, index, sectionIndex, register, remove, watch, setValue, library, onRefreshLibrary }: SortableDealerProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const logoPath = watch(`sections.${sectionIndex}.dealers.${index}.logo`);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDeleteLogo = async (e: React.MouseEvent, path: string) => {
        e.stopPropagation();
        if (!confirm('Bu logoyu kütüphaneden kalıcı olarak silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch('/api/admin/bayi-logolari', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path })
            });
            if (res.ok) onRefreshLibrary();
        } catch (err) { console.error("Logo delete error", err); }
    };

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 20 : 1 }} className={`bg-white border border-slate-200 rounded-sm p-2 flex gap-3 shadow-sm ${isDragging ? 'opacity-50 ring-1 ring-metan-orange/50' : ''}`}>
            <div {...attributes} {...listeners} className="flex items-center cursor-grab text-slate-300 hover:text-slate-500 px-1"><GripVertical size={16} /></div>

            <div className="flex flex-col gap-1 shrink-0 border-r border-slate-100 pr-3 w-24 relative" ref={dropdownRef}>
                <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block text-center">Logo</label>
                
                <div 
                    onClick={() => setIsOpen(!isOpen)} 
                    className={`group relative w-full h-16 bg-slate-50 border rounded-sm flex items-center justify-center cursor-pointer transition-all overflow-hidden resize-none
                        ${isOpen ? 'border-metan-orange ring-1 ring-metan-orange/10' : 'border-slate-200 hover:border-metan-orange'}`} 
                >
                    {logoPath ? (
                        <img src={logoPath} className="w-full h-full object-contain p-2" alt="" />
                    ) : (
                        <ImageIcon size={20} className="text-slate-200" />
                    )}
                    
                    <div className={`absolute bottom-0 right-0 p-0.5 rounded-tl-sm border-t border-l transition-colors z-10 pointer-events-none
                        ${isOpen 
                            ? 'bg-metan-orange border-metan-orange' 
                            : 'bg-white/90 border-slate-100 group-hover:bg-metan-orange group-hover:border-metan-orange'}`}>
                        <ChevronDown size={8} className={isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 shadow-2xl z-[60] rounded-md overflow-hidden p-3">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Library size={12}/> Logo Seçimi</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <label className="relative aspect-square bg-slate-50 border border-dashed border-slate-300 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-metan-orange hover:bg-metan-orange/5 transition-all text-slate-400 hover:text-metan-orange">
                                <Upload size={16} />
                                <span className="text-[7px] font-bold mt-1 uppercase">Yükle</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setValue(`sections.${sectionIndex}.dealers.${index}.logoFile`, file, { shouldDirty: true });
                                        setValue(`sections.${sectionIndex}.dealers.${index}.logo`, URL.createObjectURL(file), { shouldDirty: true });
                                        setIsOpen(false);
                                    }
                                }} />
                            </label>

                            {library.map((path) => {
                                const isSelected = logoPath === path;
                                return (
                                    <button 
                                        key={path} 
                                        type="button" 
                                        onClick={() => { 
                                            setValue(`sections.${sectionIndex}.dealers.${index}.logo`, path, { shouldDirty: true }); 
                                            setValue(`sections.${sectionIndex}.dealers.${index}.logoFile`, undefined); 
                                            setIsOpen(false); 
                                        }} 
                                        className={`group/tile cursor-pointer relative aspect-square bg-slate-50 border rounded-sm p-1 hover:border-metan-orange transition-all ${isSelected ? 'border-metan-orange ring-1 ring-metan-orange/20 bg-white shadow-sm' : 'border-slate-100'}`}
                                    >
                                        <img src={path} className="w-full h-full object-contain" alt="" />
                                        
                                        <div 
                                            onClick={(e) => handleDeleteLogo(e, path)}
                                            className="cursor-pointer absolute -top-1.5 -left-1.5 bg-white text-red-500 rounded-full p-0.5 shadow-sm border border-slate-100 opacity-0 group-hover/tile:opacity-100 hover:bg-red-50 transition-all z-20"
                                        >
                                            <X size={10} strokeWidth={3} />
                                        </div>

                                        {isSelected && (
                                            <div className="cursor-pointer absolute -top-1.5 -right-1.5 bg-metan-orange text-white rounded-full p-0.5 shadow-sm border border-white z-10 flex items-center justify-center">
                                                <Check size={8} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-2">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Bayi Adı</label>
                        <input {...register(`sections.${sectionIndex}.dealers.${index}.name`)} className="w-full h-7 px-2 text-[11px] border border-slate-200 rounded-sm focus:border-metan-orange outline-none" />
                    </div>
                    <div className="col-span-3">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Şehir</label>
                        <input {...register(`sections.${sectionIndex}.dealers.${index}.city`)} className="w-full h-7 px-2 text-[10px] border border-slate-200 rounded-sm outline-none uppercase font-bold text-slate-600" />
                    </div>
                    <div className="col-span-5">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Google Maps Linki</label>
                        <input {...register(`sections.${sectionIndex}.dealers.${index}.googleMapsUrl`)} className="w-full h-7 px-2 text-[10px] border border-slate-200 rounded-sm focus:border-metan-orange outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Adres</label>
                        <input {...register(`sections.${sectionIndex}.dealers.${index}.address`)} className="w-full h-7 px-2 text-[10px] border border-slate-200 rounded-sm outline-none" />
                    </div>
                    <div className="col-span-3">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Telefon</label>
                        <input {...register(`sections.${sectionIndex}.dealers.${index}.phone`)} className="w-full h-7 px-2 text-[10px] border border-slate-200 rounded-sm outline-none" />
                    </div>
                    <div className="col-span-4">
                        <label className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 block">Web Sitesi / Buton Etiketi</label>
                        <div className="flex gap-1">
                            <input {...register(`sections.${sectionIndex}.dealers.${index}.website`)} placeholder="Link" className="flex-1 h-7 px-2 text-[10px] border border-slate-200 rounded-sm outline-none" />
                            <input {...register(`sections.${sectionIndex}.dealers.${index}.websiteLabel`)} placeholder="Etiket" className="w-16 h-7 px-2 text-[10px] border border-slate-200 rounded-sm outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" onClick={() => remove(index)} className="p-1 text-slate-300 hover:text-red-500 self-center transition-colors cursor-pointer"><Trash2 size={16} /></button>
        </div>
    );
};