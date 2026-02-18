import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

const ACTION_VERBS = [
    'built', 'developed', 'designed', 'implemented', 'led', 'managed', 'created',
    'optimized', 'automated', 'improved', 'reduced', 'increased', 'launched',
    'engineered', 'architected', 'orchestrated', 'streamlined', 'deployed',
    'collaborated', 'initiated', 'executed', 'formulated', 'spearheaded'
];

export function SmartTextArea({ label, value, onChange, placeholder, rows = 4, checkType }) {
    const [tip, setTip] = useState(null);

    useEffect(() => {
        if (!value) {
            setTip(null);
            return;
        }

        const text = value.trim();
        if (text.length === 0) return;

        // Check 1: Action Verb (for first word)
        if (checkType?.includes('action-verb')) {
            const firstWord = text.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
            if (!ACTION_VERBS.includes(firstWord)) {
                setTip("Start with a strong action verb (e.g., Built, Led, Optimized).");
                return;
            }
        }

        // Check 2: Measurable Impact (numbers, %, $)
        if (checkType?.includes('measurable')) {
            // Regex for numbers, %, $, or "X" placeholder
            const hasMetrics = /[0-9]%|\$|increased|reduced|saved|improved|\b\d+\b/i.test(text);
            if (!hasMetrics) {
                setTip("Add measurable impact (numbers, %, $).");
                return;
            }
        }

        setTip(null);
    }, [value, checkType]);

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between">
                <label className="text-xs font-medium text-foreground">{label}</label>
                {tip && (
                    <div className="flex items-center gap-1 text-[10px] text-orange-600 font-medium animate-pulse">
                        <Lightbulb className="w-3 h-3" />
                        {tip}
                    </div>
                )}
            </div>
            <textarea
                className={cn(
                    "w-full px-3 py-2 bg-white border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/20",
                    tip ? "border-orange-300 focus:ring-orange-200" : ""
                )}
                rows={rows}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
