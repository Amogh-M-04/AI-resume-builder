import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArtifactStatusControl({ stepId }) {
    const [status, setStatus] = useState('pending'); // pending, success, error
    const [artifact, setArtifact] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`rb_step_${stepId}_artifact`);
        if (saved) {
            setArtifact(saved);
            setStatus('success');
        } else {
            setArtifact('');
            setStatus('pending');
        }
    }, [stepId]);

    const handleSuccess = () => {
        if (!artifact.trim()) {
            setStatus('error');
            return;
        }
        setIsLoading(true);
        // Simulate network/validation
        setTimeout(() => {
            localStorage.setItem(`rb_step_${stepId}_artifact`, artifact);
            setStatus('success');
            setIsLoading(false);
            // Force reload or use context to update layout state?
            // Layout is parent. It won't know unless we trigger it.
            // A simple hack is dispatching a storage event or using context.
            window.dispatchEvent(new Event('storage')); // Useful for cross-tab, but maybe not same-tab hook.
            // Actually, since Layout reads localStorage on render, we need to re-render Layout.
            // But we are deep down.
            // For now, assume the user clicks "Next" which re-checks?
            // "Next" button in footer relies on `currentStepArtifact`.
            // We need to trigger a re-render of Layout.
            window.location.reload(); // Hard refresh to ensure state sync? A bit jarring but robust for "Premium Build System" prototype.
        }, 800);
    };

    const handleError = () => {
        setStatus('error');
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Artifact Link / Text</label>
                <textarea
                    placeholder="Paste Lovable link or artifact details..."
                    className={cn(
                        "w-full h-24 p-3 text-sm bg-background border rounded-md resize-none focus:outline-none focus:ring-1",
                        status === 'error' ? "border-destructive focus:ring-destructive" : "focus:ring-primary/20"
                    )}
                    value={artifact}
                    onChange={(e) => setArtifact(e.target.value)}
                />
                {status === 'error' && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Please provide valid artifact details.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={handleError}
                    className="flex items-center justify-center gap-2 py-2 border border-destructive/20 bg-destructive/5 text-destructive rounded-md text-sm font-medium hover:bg-destructive/10 transition-colors"
                >
                    <AlertCircle className="w-4 h-4" />
                    <span>Error</span>
                </button>
                <button
                    onClick={handleSuccess}
                    disabled={isLoading || status === 'success'}
                    className={cn(
                        "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all shadow-sm",
                        status === 'success'
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span>{status === 'success' ? 'Completed' : 'It Worked'}</span>
                </button>
            </div>

            {status === 'success' && (
                <p className="text-xs text-center text-green-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                    Artifact saved! You can proceed.
                </p>
            )}
        </div>
    );
}
