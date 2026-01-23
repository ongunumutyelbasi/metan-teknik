"use client";

import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Link as LinkIcon, GripVertical } from 'lucide-react';
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

export const RelatedAndVariantsEditor = ({ control, register, name, title }: any) => {
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: name
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
        <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
                <h2 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <LinkIcon size={14} className="text-brand-hover-blue" /> {title}
                </h2>
                <button 
                    type="button" 
                    onClick={() => append("")} 
                    className="text-[10px] font-bold text-brand-hover-blue hover:underline cursor-pointer uppercase transition-all"
                >
                    + Ürün Ekle
                </button>
            </div>
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1.5">
                        {fields.map((field, index) => (
                            <SortableRelatedItem 
                                key={field.id}
                                id={field.id}
                                index={index}
                                name={name}
                                register={register}
                                onRemove={() => remove(index)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {fields.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Henüz {title.toLowerCase()} eklenmedi</p>
                </div>
            )}
        </div>
    );
};

const SortableRelatedItem = ({ id, index, name, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.6 : 1
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className="flex gap-1.5 items-center group bg-white"
        >
            <div 
                {...attributes} 
                {...listeners} 
                className="cursor-grab active:cursor-grabbing p-1.5 text-slate-300 hover:text-slate-500 transition-colors"
            >
                <GripVertical size={14} />
            </div>

            <div className="flex-1 relative">
                <input 
                    {...register(`${name}.${index}`)} 
                    placeholder="Article No" 
                    className="w-full h-8 px-2.5 text-[11px] border border-slate-100 rounded-lg outline-none focus:border-brand-hover-blue/40 bg-slate-50/30 font-mono transition-all group-hover:bg-slate-50"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] font-bold text-slate-300 pointer-events-none group-hover:text-slate-400 uppercase">
                    SKU
                </div>
            </div>

            <button 
                type="button" 
                onClick={onRemove} 
                className="p-1.5 cursor-pointer text-slate-300 hover:text-red-500 transition-colors bg-transparent hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100"
                title="Kaldır"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
};