import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FileText, Edit3, CheckCircle, LayoutTemplate } from 'lucide-react';

export function MainLayout() {
    const location = useLocation();

    // Hide this layout if we are in the legacy /rb routes (they have their own layout)
    // Actually, App.jsx handles this by nesting routes. This layout is only for /builder, /preview, etc.

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 no-print">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-serif shadow-sm">
                        AI
                    </div>
                    <span className="font-serif font-bold text-lg tracking-tight">Resume Builder</span>
                </div>

                <nav className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                    <NavItem to="/builder" icon={Edit3} label="Builder" />
                    <NavItem to="/preview" icon={LayoutTemplate} label="Preview" />
                    <NavItem to="/proof" icon={CheckCircle} label="Proof" />
                </nav>

                <div className="w-24 flex justify-end">
                    {/* Placeholder for user profile or status */}
                    <div className="h-8 w-8 rounded-full bg-secondary border border-border"></div>
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}

function NavItem({ to, icon: Icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            )}
        >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </NavLink>
    );
}
