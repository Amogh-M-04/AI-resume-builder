import { checkShippedStatus } from '@/lib/submissionUtils';
// ... other imports

export function AIResumeLayout() {
    // ... hooks

    // Badge State
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const status = checkShippedStatus();
            setIsShipped(status.isShipped);
            setLastUpdate(Date.now()); // Keep existing re-render trigger
        };

        checkStatus();
        window.addEventListener('storage', checkStatus);
        return () => window.removeEventListener('storage', checkStatus);
    }, []);

    // ... handleNext/Prev ...

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Top Bar */}
            <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg shadow-inner">3</div>
                    <h1 className="font-serif font-bold text-lg text-primary tracking-wide">AI Resume Builder</h1>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <span className="text-sm font-medium text-muted-foreground/80">
                        {isProofPage ? 'Final Proof & Submission' : `Project 3 — Step ${currentStep} of 8`}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                        isShipped
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                    )}>
                        {isShipped ? 'Shipped' : 'In Progress'}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                <main className={cn(
                    "flex-1 overflow-y-auto transition-all duration-300",
                    isProofPage ? "w-full bg-muted/10" : "w-[70%] border-r bg-background p-8"
                )}>
                    <Outlet context={{ currentStep }} />
                </main>

                {!isProofPage && (
                    <aside className="w-[30%] bg-muted/30 p-6 flex flex-col border-l overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif font-semibold text-lg text-primary">Build Context</h3>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono bg-muted px-2 py-1 rounded">Step {currentStep}</div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                    <Clipboard className="w-3 h-3" /> Prompt
                                </label>
                                <div className="relative group">
                                    <textarea
                                        readOnly
                                        className="w-full h-48 p-4 text-sm bg-card border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/10 text-muted-foreground leading-relaxed shadow-sm"
                                        value={steps[currentStep - 1]?.lovablePrompt || "No prompt available."}
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(steps[currentStep - 1]?.lovablePrompt || "")}
                                        className="absolute top-2 right-2 p-2 bg-background border rounded-md hover:bg-muted transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                                        title="Copy to Clipboard"
                                    >
                                        <Clipboard className="w-4 h-4 text-foreground" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-muted-foreground/80 italic">Copy this prompt into Lovable to generate the required module.</p>
                            </div>

                            <a
                                href="https://lovable.dev/projects"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform active:scale-95 duration-200"
                            >
                                <span>Build in Lovable</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                            </a>

                            <div className="pt-6 border-t border-dashed border-muted-foreground/20">
                                <ArtifactStatusControl stepId={currentStep} />
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            {/* Proof Footer */}
            <footer className="h-16 bg-card border-t flex items-center justify-between px-8 sticky bottom-0 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors font-medium text-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </button>

                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            currentStep === i
                                ? "bg-primary scale-125"
                                : (i < currentStep || isProofPage
                                    ? "bg-primary/40 cursor-pointer hover:bg-primary/60"
                                    : "bg-muted")
                        )}
                            onClick={() => { if (i < currentStep || isProofPage) navigate(`/rb/${steps[i - 1].path}`) }}
                        />
                    ))}
                    {/* Final dot for Proof */}
                    <div className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300 ml-2",
                        isProofPage ? "bg-green-500 scale-125" : "bg-muted"
                    )} />
                </div>

                {!isProofPage && (
                    <button
                        onClick={handleNext}
                        disabled={!canGoNext}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all shadow-sm text-sm group",
                            canGoNext
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                                : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                        )}
                    >
                        <span>Next Step</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", canGoNext && "group-hover:translate-x-0.5")} />
                    </button>
                )}

                {isProofPage && (
                    <div className="text-sm font-medium text-green-600 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                        <CheckCircle2 className="w-4 h-4" />
                        All Steps Reviewed
                    </div>
                )}
            </footer>
        </div>
    );
}
