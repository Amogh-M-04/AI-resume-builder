import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { steps } from '@/lib/steps';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StepPage() {
    // We can get step ID from URL or context. 
    // Since this component is generic for /rb/:stepId, we'll parse URL match from parent logic?
    // Actually, App.jsx defines routes. Let's assume we pass props or use params.
    // The Layout already parses currentStep.
    const { currentStep } = useOutletContext();
    const stepData = steps.find(s => s.id === currentStep);

    if (!stepData) return <div>Step not found</div>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-4">{stepData.id}. {stepData.title}</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {stepData.description}
            </p>

            <div className="prose prose-neutral max-w-none">
                {/* Content would go here. For now, placeholders */}
                <div className="p-6 bg-white border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                        <li>Read the prompt in the Build Panel.</li>
                        <li>Click "Copy" to copy the prompt.</li>
                        <li>Open Lovable and create a new project (or continue existing).</li>
                        <li>Paste the prompt and generate the UI.</li>
                        <li>Verify the output matches the requirements.</li>
                        <li>Once satisfied, copy the "Share Link" or "Project URL".</li>
                        <li>Paste it into the artifact verified below (simulated for now).</li>
                    </ul>
                </div>
            </div>

            {/* Visual spacer */}
            <div className="h-12"></div>
        </div>
    );
}

// Control component for the sidebar (defined here but used in Layout? No, I put it in layout code)
// Wait, I referenced `ArtifactStatusControl` in the Layout replacement but haven't defined it.
// I should define it in the Layout file or a separate file.
// I will create a separate component file for it or embed it in Layout.
// For simplicity, I'll add it to the Layout file in a subsequent edit or create a separate file `src/components/ArtifactStatusControl.jsx`
