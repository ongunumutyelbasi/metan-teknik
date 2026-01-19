"use client";

import React from 'react';
import { useFieldArray, Control, UseFormRegister } from 'react-hook-form';
import { Plus, Trash2, List, GripVertical } from 'lucide-react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    control: Control<any>;
    register: UseFormRegister<any>;
}

export const TechnicalSpecsEditor = ({ control, register }: Props) => {
    const { fields: sectionFields, append: appendSection, remove: removeSection, move: moveSection } = useFieldArray({
        control,
        name: "technicalSpecs"
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = sectionFields.findIndex((f) => f.id === active.id);
            const newIndex = sectionFields.findIndex((f) => f.id === over.id);
            moveSection(oldIndex, newIndex);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold flex items-center gap-2 text-black">
                    <List size={16} /> Teknik Özellikler
                </h3>
                <button
                    type="button"
                    onClick={() => appendSection({ mainTitle: "Yeni Bölüm", specs: [{ label: "", value: "" }] })}
                    className="flex items-center gap-1 px-3 py-1 bg-black cursor-pointer text-white rounded-md text-[13px] font-bold hover:bg-brand-hover-blue transition-all"
                >
                    <Plus size={12} /> Bölüm Ekle
                </button>
            </div>
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sectionFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {sectionFields.map((section, index) => (
                            <SortableSection 
                                key={section.id} 
                                id={section.id} 
                                sectionIndex={index} 
                                control={control} 
                                register={register} 
                                onRemove={() => removeSection(index)} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

const SortableSection = ({ id, sectionIndex, control, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 30 : 'auto',
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div ref={setNodeRef} style={style} className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden w-full">
            <div className="flex items-center gap-2 bg-gray-50 p-2 border-b border-gray-200 group">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600">
                    <GripVertical size={14} />
                </div>
                
                <input
                    {...register(`technicalSpecs.${sectionIndex}.mainTitle`)}
                    placeholder="Bölüm Başlığı"
                    className="flex-1 text-xs font-bold bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-gray-300 text-black px-1 py-0.5 rounded hover:bg-white/50 focus:bg-white transition-colors"
                />
                
                <button 
                    type="button" 
                    onClick={onRemove} 
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} />
                </button>
            </div>
            <div className="p-3 w-full">
                <SpecRows sectionIndex={sectionIndex} control={control} register={register} />
            </div>
        </div>
    );
};

const SpecRows = ({ sectionIndex, control, register }: any) => {
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: `technicalSpecs.${sectionIndex}.specs`
    });

    const sensors = useSensors(useSensor(PointerSensor));

    const handleRowDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    return (
        <div className="space-y-1.5 w-full">
            <DndContext id={`dnd-rows-${sectionIndex}`} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleRowDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    {fields.map((field, index) => (
                        <SortableRow 
                            key={field.id} 
                            id={field.id} 
                            sectionIndex={sectionIndex} 
                            index={index} 
                            register={register} 
                            onRemove={() => remove(index)} 
                        />
                    ))}
                </SortableContext>
            </DndContext>
            
            <button
                type="button"
                onClick={() => append({ label: "", value: "" })}
                className="mt-2 text-[10px] font-bold text-gray-400 flex items-center gap-0.5 cursor-pointer hover:text-black transition-colors"
            >
                <Plus size={12} /> Satır Ekle
            </button>
        </div>
    );
};

const SortableRow = ({ id, sectionIndex, index, register, onRemove }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div ref={setNodeRef} style={style} className="grid grid-cols-[30px_1fr_1fr_30px] gap-3 items-center group w-full">
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 flex justify-center">
                <GripVertical size={14} />
            </div>
            
            <input
                {...register(`technicalSpecs.${sectionIndex}.specs.${index}.label`)}
                placeholder="Özellik"
                className="w-full p-2 text-xs border border-gray-100 rounded focus:border-brand-hover-blue outline-none bg-gray-50/30 font-medium transition-colors"
            />
            
            <input
                {...register(`technicalSpecs.${sectionIndex}.specs.${index}.value`)}
                placeholder="Değer"
                className="w-full p-2 text-xs border border-gray-100 rounded focus:border-brand-hover-blue outline-none bg-gray-50/30 transition-colors"
            />
            
            <div className="flex justify-center">
                <button type="button" onClick={onRemove} className="p-1.5 cursor-pointer text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};