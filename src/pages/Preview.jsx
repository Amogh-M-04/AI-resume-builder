import React, { useRef, useState } from 'react';
import { ResumePreview } from '@/components/ResumePreview';
import { useResume } from '@/context/ResumeContext';
import { Download, Copy, AlertTriangle, Check } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { generatePlainText, validateExport } from '@/lib/exportUtils';
import { cn } from '@/lib/utils';

export function Preview() {
    const componentRef = useRef();
    const { resumeData } = useResume();
    const [copied, setCopied] = useState(false);

    const check = validateExport(resumeData);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Resume_${resumeData.personalInfo.name || 'Draft'}`,
    });

    const handleCopyText = () => {
        const text = generatePlainText(resumeData);
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-muted flex flex-col items-center py-12">
            {/* Validation Warning */}
            {!check.isValid && (
                <div className="mb-6 bg-orange-50 text-orange-800 px-4 py-3 rounded-lg border border-orange-200 flex items-center gap-3 max-w-lg shadow-sm no-print">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div className="text-sm">
                        <p className="font-semibold">Your resume may look incomplete.</p>
                        <p>Missing: {check.missing.join(', ')}</p>
                    </div>
                </div>
            )}

            <div className="mb-8 flex gap-4 no-print">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-all font-medium"
                >
                    <Download className="w-4 h-4" />
                    Print / PDF
                </button>
                <button
                    onClick={handleCopyText}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 bg-white text-black border rounded-lg shadow-sm hover:bg-gray-50 transition-all font-medium",
                        copied && "text-green-600 border-green-200 bg-green-50"
                    )}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Text"}
                </button>
            </div>

            <div className="shadow-2xl print:shadow-none resume-print-container">
                <ResumePreview ref={componentRef} />
            </div>
        </div>
    );
}
