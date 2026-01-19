"use client";

import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export const RelatedAndVariantsEditor = ({ control, register, name, title }: any) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    return (
        <div className="bg-white p-4 rounded-md border border-gray-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                <h2 className="text-xs font-bold flex items-center gap-2">
                    <LinkIcon size={14} className="text-black" /> {title}
                </h2>
                <button 
                    type="button" 
                    onClick={() => append("")} 
                    className="text-[10px] cursor-pointer font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                    <Plus size={12} /> Ekle
                </button>
            </div>
            
            <div className="space-y-2 flex-1">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center group">
                        <div className="flex flex-col flex-1 gap-0.5">
                            <input 
                                {...register(`${name}.${index}`)} 
                                placeholder="Article No (Örn: 508895)" 
                                className="w-full h-[37px] p-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-brand-blue focus:bg-white outline-none font-mono"
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={() => remove(index)} 
                            className="p-1.5 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}

                {fields.length === 0 && (
                    <p className="text-[10px] text-dark-gray italic py-2 pl-1">Henüz eklenmedi.</p>
                )}
            </div>
        </div>
    );
};