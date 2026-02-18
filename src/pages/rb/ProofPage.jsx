import React, { useState, useEffect } from 'react';
import { steps } from '@/lib/steps';
import { CheckCircle2, Circle, Copy, ExternalLink, Github, Rocket, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkShippedStatus, CHECKLIST_ITEMS } from '@/lib/submissionUtils';

export function ProofPage() {
    const [stepStatus, setStepStatus] = useState({});
    const [checklist, setChecklist] = useState({});
    const [finalLinks, setFinalLinks] = useState({ lovable: '', github: '', deploy: '' });
    const [shippedStatus, setShippedStatus] = useState({ isShipped: false });

    // Load initial state
    useEffect(() => {
        // Steps
        const statuses = {};
        steps.forEach(step => {
            statuses[step.id] = !!localStorage.getItem(`rb_step_${step.id}_artifact`);
        });
        setStepStatus(statuses);

        // Checklist
        const savedChecklist = localStorage.getItem('rb_checklist');
        if (savedChecklist) setChecklist(JSON.parse(savedChecklist));

        // Links
        const savedLinks = localStorage.getItem('rb_final_links');
        if (savedLinks) setFinalLinks(JSON.parse(savedLinks));

        // Initial check
        updateShippedStatus();
    }, []);

    // Update status whenever dependencies change
    useEffect(() => {
        updateShippedStatus();
        // Dispatch storage event for Badge update in Layout
        window.dispatchEvent(new Event('storage'));
    }, [stepStatus, checklist, finalLinks]);

    const updateShippedStatus = () => {
        setShippedStatus(checkShippedStatus());
    };

    const handleChecklistToggle = (id) => {
        const newChecklist = { ...checklist, [id]: !checklist[id] };
        setChecklist(newChecklist);
        localStorage.setItem('rb_checklist', JSON.stringify(newChecklist));
    };

    const handleLinkChange = (key, value) => {
        const newLinks = { ...finalLinks, [key]: value };
        setFinalLinks(newLinks);
        localStorage.setItem('rb_final_links', JSON.stringify(newLinks));
    };

    const copyFinalSubmission = () => {
        const submission = `
AI Resume Builder — Final Submission

Lovable Project: ${finalLinks.lovable}
GitHub Repository: ${finalLinks.github}
Live Deployment: ${finalLinks.deploy}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
        `.trim();
        navigator.clipboard.writeText(submission);
        alert('Final Submission copied to clipboard.');
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6 font-sans">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-primary mb-3">Proof of Work</h1>
                <p className="text-muted-foreground text-lg">Verify your progress and submit your project.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Left Column: Steps & Checklist */}
                <div className="space-y-8">
                    {/* 1. Build Status */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            Build Process
                        </h2>
                        <div className="space-y-3">
                            {steps.map(step => (
                                <div key={step.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border/50">
                                    <span className="font-medium text-sm flex items-center gap-3">
                                        <span className="text-muted-foreground font-mono w-6 opacity-70">0{step.id}</span>
                                        {step.label}
                                    </span>
                                    {stepStatus[step.id] ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-muted-foreground/30" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Verification Checklist */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            Verification Checklist
                        </h2>
                        <div className="space-y-3">
                            {CHECKLIST_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleChecklistToggle(item.id)}
                                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted/30 transition-all group"
                                >
                                    <div className={cn(
                                        "w-5 h-5 flex items-center justify-center rounded border transition-colors",
                                        checklist[item.id] ? "bg-primary border-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                                    )}>
                                        {checklist[item.id] && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium transition-colors",
                                        checklist[item.id] ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                    )}>
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Artifacts & Submission */}
                <div className="flex flex-col gap-8">
                    <div className="bg-card border rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            Final Artifacts
                        </h2>

                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <ExternalLink className="w-3.5 h-3.5" /> Lovable Project Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    className="w-full p-3 bg-muted/10 border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    value={finalLinks.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <Github className="w-3.5 h-3.5" /> GitHub Repository
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    className="w-full p-3 bg-muted/10 border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    value={finalLinks.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <Rocket className="w-3.5 h-3.5" /> Deployed URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://vercel.app/..."
                                    className="w-full p-3 bg-muted/10 border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    value={finalLinks.deploy}
                                    onChange={(e) => handleLinkChange('deploy', e.target.value)}
                                />
                            </div>
                        </div>

                        {shippedStatus.isShipped && (
                            <div className="mt-8 mb-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <p className="text-green-800 font-serif font-medium text-lg">
                                    Project 3 Shipped Successfully.
                                </p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t">
                            <button
                                onClick={copyFinalSubmission}
                                disabled={!shippedStatus.isShipped}
                                className={cn(
                                    "w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-sm text-sm uppercase tracking-wide",
                                    shippedStatus.isShipped
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                                )}
                            >
                                <Copy className="w-4 h-4" />
                                Copy Final Submission
                            </button>
                            {!shippedStatus.isShipped && (
                                <div className="mt-4 text-xs text-center text-muted-foreground space-y-1">
                                    <p>To unlock submission:</p>
                                    <ul className="flex flex-col items-center gap-1 opacity-80">
                                        <li className={cn(shippedStatus.stepsCompleted ? "text-green-600" : "text-amber-600")}>
                                            • Complete 8/8 Steps
                                        </li>
                                        <li className={cn(shippedStatus.checklistCompleted ? "text-green-600" : "text-amber-600")}>
                                            • Check 10/10 Verification Items
                                        </li>
                                        <li className={cn(shippedStatus.linksCompleted ? "text-green-600" : "text-amber-600")}>
                                            • Add 3/3 Artifact Links
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
