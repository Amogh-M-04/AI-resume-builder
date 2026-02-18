import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ATSScoreMeter({ score, suggestions }) {
    // Determine color based on score
    let colorClass = "text-red-500";
    let bgClass = "bg-red-500";
    if (score >= 80) {
        colorClass = "text-green-600";
        bgClass = "bg-green-600";
    } else if (score >= 50) {
        colorClass = "text-orange-500";
        bgClass = "bg-orange-500";
    }

    // Calculate circumference for circle (r=30 -> c~188.5)
    // 2 * pi * 30 = 188.5
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-card border rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-center gap-6">
                {/* Score Circle */}
                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-muted/20"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className={cn("transition-all duration-1000 ease-out", colorClass)}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={cn("text-xl font-bold font-serif", colorClass)}>{score}</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">ATS Readiness Score</h3>
                    <p className="text-sm text-foreground mb-3">
                        {score >= 80 ? "Excellent! Your resume is ready." :
                            score >= 50 ? "Good start. Needs a few improvements." :
                                "Needs work. Follow the suggestions below."}
                    </p>
                </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="mt-4 pt-4 border-t space-y-2">
                    {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <AlertCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{suggestion}</span>
                        </div>
                    ))}
                </div>
            )}
            {suggestions.length === 0 && score === 100 && (
                <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs text-green-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All checks passed!</span>
                </div>
            )}
        </div>
    );
}
