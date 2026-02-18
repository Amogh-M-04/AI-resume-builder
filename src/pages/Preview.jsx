import React, { useRef } from 'react';
import { ResumePreview } from '@/components/ResumePreview';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export function Preview() {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Resume',
    });

    return (
        <div className="min-h-screen bg-muted flex flex-col items-center py-12">
            <div className="mb-8 flex gap-4">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-all font-medium"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>

            <div className="shadow-2xl print:shadow-none">
                <ResumePreview ref={componentRef} />
            </div>
        </div>
    );
}
