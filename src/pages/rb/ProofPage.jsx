import React, { useState, useEffect } from 'react';
import { steps } from '@/lib/steps';
import { CheckCircle2, Circle, Copy, ExternalLink, Github, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils'; // Keep check if utils exists

export function ProofPage() {
    const [stepStatus, setStepStatus] = useState({});
    const [finalLinks, setFinalLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    });

    useEffect(() => {
        const statuses = {};
        steps.forEach(step => {
            const artifact = localStorage.getItem(`rb_step_${step.id}_artifact`);
            statuses[step.id] = !!artifact;
        });
        setStepStatus(statuses);

        const savedLinks = localStorage.getItem('rb_final_links');
        if (savedLinks) {
            try {
                setFinalLinks(JSON.parse(savedLinks));
            } catch (e) { }
        }
    }, []);

    const allStepsCompleted = Object.values(stepStatus).every(Boolean) && Object.keys(stepStatus).length === 8;
    const isReadyToShip = allStepsCompleted && finalLinks.lovable && finalLinks.github && finalLinks.deploy;

    const handleLinkChange = (key, value) => {
        const newLinks = { ...finalLinks, [key]: value };
        setFinalLinks(newLinks);
        localStorage.setItem('rb_final_links', JSON.stringify(newLinks));
    };

    const copyFinalSubmission = () => {
        const submission = `
Project 3: AI Resume Builder - Submission
----------------------------------------
Lovable Project: ${finalLinks.lovable}
GitHub Repo: ${finalLinks.github}
Deployed URL: ${finalLinks.deploy}

Steps Completed: ${Object.values(stepStatus).filter(Boolean).length}/8
        `.trim();
        navigator.clipboard.writeText(submission);
        alert('Submission details copied to clipboard!');
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-primary mb-3">Proof of Work</h1>
                <p className="text-muted-foreground text-lg">Verify your progress and submit your project.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Status Column */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Build Status
                    </h2>
                    <div className="space-y-4">
                        {steps.map(step => (
                            <div key={step.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <span className="font-medium text-sm flex items-center gap-3">
                                    <span className="text-muted-foreground font-mono w-6">0{step.id}</span>
                                    {step.label}
                                </span>
                                {stepStatus[step.id] ? (
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5 border border-green-100">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Completed
                                    </span>
                                ) : (
                                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5 border border-amber-100">
                                        <Circle className="w-3.5 h-3.5" />
                                        Pending
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submission Column */}
                <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Final Artifacts
                    </h2>

                    <div className="space-y-5 flex-1">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <ExternalLink className="w-3 h-3" /> Lovable Project Link
                            </label>
                            <input
                                type="url"
                                placeholder="https://lovable.dev/..."
                                className="w-full p-2.5 bg-background border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                value={finalLinks.lovable}
                                onChange={(e) => handleLinkChange('lovable', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <Github className="w-3 h-3" /> GitHub Repository
                            </label>
                            <input
                                type="url"
                                placeholder="https://github.com/..."
                                className="w-full p-2.5 bg-background border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                value={finalLinks.github}
                                onChange={(e) => handleLinkChange('github', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <Rocket className="w-3 h-3" /> Deployed URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://vercel.app/..."
                                className="w-full p-2.5 bg-background border rounded-lg text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                value={finalLinks.deploy}
                                onChange={(e) => handleLinkChange('deploy', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                        <button
                            onClick={copyFinalSubmission}
                            disabled={!isReadyToShip}
                            className={cn(
                                "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-sm",
                                isReadyToShip
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                            )}
                        >
                            <Copy className="w-4 h-4" />
                            Copy Final Submission
                        </button>
                        {!isReadyToShip && (
                            <p className="text-xs text-center text-muted-foreground mt-3">
                                Complete all steps and fill all links to unlock.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
