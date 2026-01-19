"use client";

import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Package, GripVertical } from 'lucide-react';

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

export const BoxContentsEditor = ({ control, register }: any) => {
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "boxContents"
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
        <div className="bg-white p-4 rounded-md border border-gray-200 h-full">
            <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                <h2 className="text-xs font-bold flex items-center gap-2 text-black">
                    <Package size={14} /> Kutu İçeriği
                </h2>
                <button
                    type="button"
                    onClick={() => append({ item: "", quantity: 1 })}
                    className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-0.5"
                >
                    <Plus size={12} /> Ekle
                </button>
            </div>

            <DndContext 
                id="box-contents-dnd" 
                sensors={sensors} 
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1">
                        {fields.length > 0 && (
                            <div className="flex gap-2 px-7">
                                <span className="flex-1 text-[9px] font-bold text-gray-400 uppercase">Ürün / Parça</span>
                                <span className="w-12 text-[9px] font-bold text-gray-400 uppercase text-center">Adet</span>
                                <div className="w-4"></div>
                            </div>
                        )}

                        {fields.map((field, index) => (
                            <SortableBoxItem 
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

const SortableBoxItem = ({ id, index, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto'
    };

    return (
        <div ref={setNodeRef} style={style} className="flex gap-1.5 items-center group bg-white">
            <div 
                {...attributes} 
                {...listeners} 
                className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-600"
            >
                <GripVertical size={14} />
            </div>

            <input 
                {...register(`boxContents.${index}.item`)} 
                placeholder="Ürün adı..."
                className="flex-1 h-[37px] p-1.5 border border-gray-100 rounded-md text-xs focus:border-brand-blue outline-none bg-gray-50/30"
            />
            <input 
                type="number"
                {...register(`boxContents.${index}.quantity`, { valueAsNumber: true })} 
                className="w-12 h-[37px] p-1.5 border border-gray-100 rounded-md text-xs text-center focus:border-brand-blue outline-none bg-gray-50/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button 
                type="button"
                onClick={onRemove}
                className="p-1 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
            >
                <Trash2 size={13} />
            </button>
        </div>
    );
};