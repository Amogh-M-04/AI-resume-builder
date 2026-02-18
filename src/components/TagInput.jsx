import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TagInput({ label, tags = [], onTagsChange, placeholder }) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onTagsChange([...tags, trimmed]);
            setInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">{label}</label>
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-white border rounded-md focus-within:ring-1 focus-within:ring-primary/20 min-h-[42px]">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive focus:outline-none"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    className="flex-1 bg-transparent text-sm min-w-[120px] focus:outline-none"
                    placeholder={tags.length === 0 ? placeholder : ""}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag} // Also add on blur for better UX
                />
            </div>
            <p className="text-[10px] text-muted-foreground">Type and press Enter to add.</p>
        </div>
    );
}
