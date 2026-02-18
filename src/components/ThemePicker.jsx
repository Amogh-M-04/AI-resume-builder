import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function ThemePicker() {
    const { resumeData, setTemplate, setThemeColor } = useResume();
    const { template, themeColor } = resumeData;

    const templates = [
        { id: 'classic', label: 'Classic', preview: <ClassicPreview /> },
        { id: 'modern', label: 'Modern', preview: <ModernPreview /> },
        { id: 'minimal', label: 'Minimal', preview: <MinimalPreview /> }
    ];

    const colors = [
        { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
        { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
        { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
        { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
        { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={cn(
                            "relative group flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all text-left",
                            template === t.id
                                ? "border-primary bg-primary/5"
                                : "border-transparent hover:bg-muted/50"
                        )}
                    >
                        <div className="w-full aspect-[210/297] bg-white shadow-sm rounded border overflow-hidden relative">
                            {t.preview}
                            {template === t.id && (
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                                        <Check className="w-4 h-4" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                            {t.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 border-t">
                {colors.map(c => (
                    <button
                        key={c.name}
                        onClick={() => setThemeColor(c.value)}
                        className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center shadow-sm",
                            themeColor === c.value
                                ? "border-primary scale-110"
                                : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                        )}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                    >
                        {themeColor === c.value && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Mini Previews
function ClassicPreview() {
    return (
        <div className="w-full h-full p-2 flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-3/4 bg-current rounded-sm mb-1" />
            <div className="space-y-1">
                <div className="h-1 w-full bg-slate-200 rounded-sm" />
                <div className="h-1 w-full bg-slate-200 rounded-sm" />
            </div>
            <div className="mt-1 h-px w-full bg-slate-300" />
            <div className="space-y-1">
                <div className="h-1.5 w-1/4 bg-slate-300 rounded-sm" />
                <div className="h-1 w-full bg-slate-200 rounded-sm" />
                <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
            </div>
        </div>
    );
}

function ModernPreview() {
    return (
        <div className="w-full h-full flex opacity-60">
            <div className="w-[30%] h-full bg-slate-200 p-1 flex flex-col gap-1">
                <div className="h-2 w-full bg-slate-300 rounded-sm mb-1" />
                <div className="h-1 w-full bg-slate-300 rounded-sm" />
                <div className="h-1 w-full bg-slate-300 rounded-sm" />
            </div>
            <div className="flex-1 p-1 flex flex-col gap-1">
                <div className="h-2 w-3/4 bg-current rounded-sm mb-1" />
                <div className="h-1 w-full bg-slate-100 rounded-sm" />
                <div className="h-1 w-5/6 bg-slate-100 rounded-sm" />
                <div className="mt-1 space-y-0.5">
                    <div className="h-1 w-full bg-slate-100 rounded-sm" />
                    <div className="h-1 w-full bg-slate-100 rounded-sm" />
                </div>
            </div>
        </div>
    );
}

function MinimalPreview() {
    return (
        <div className="w-full h-full p-2 flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-1/2 bg-current rounded-sm" />
            <div className="h-1 w-full bg-slate-100 rounded-sm" />
            <div className="space-y-1 mt-1">
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-sm" />
                <div className="h-1 w-full bg-slate-100 rounded-sm" />
            </div>
            <div className="space-y-1 mt-1">
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-sm" />
                <div className="h-1 w-full bg-slate-100 rounded-sm" />
            </div>
        </div>
    );
}
