import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export function Home() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium mb-8 border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered Resume Creation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-primary mb-6 max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Build a Resume <br />
                <span className="text-foreground/80">That Gets Read.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                Create professional, ATS-optimized resumes in minutes.
                Focus on your story, let us handle the design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Link
                    to="/builder"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-medium text-base hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Start Building
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    to="/rb/01-problem"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-input rounded-lg font-medium text-base hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground"
                >
                    View Build Process
                </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl w-full animate-in fade-in zoom-in duration-1000 delay-500">
                <FeatureItem title="Premium Design" desc="Minimalist layouts that recruiters love." />
                <FeatureItem title="Real-time Preview" desc="See changes instantly as you type." />
                <FeatureItem title="Privacy First" desc="Your data stays locally in your browser." />
            </div>
        </div>
    );
}

function FeatureItem({ title, desc }) {
    return (
        <div className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
