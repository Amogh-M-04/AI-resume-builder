import React, { forwardRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { MapPin, Phone, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ResumePreview = forwardRef(({ className, scale = 1 }, ref) => {
    const { resumeData } = useResume();
    const { personalInfo, summary, experience, education, projects, skills, links, template, themeColor } = resumeData;

    // Template-specific classes
    const isModern = template === 'modern';
    const isMinimal = template === 'minimal';
    const isClassic = !isModern && !isMinimal;

    // Base container styles
    const containerClasses = cn(
        "bg-white text-black shadow-2xl mx-auto origin-top transition-transform duration-200",
        "font-sans", // Default font
        className
    );

    return (
        <div
            ref={ref}
            className={containerClasses}
            style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '0', // Reset padding for layout control
                transform: `scale(${scale})`,
                '--theme-color': themeColor || 'hsl(168, 60%, 40%)'
            }}
        >
            {/* Modern Layout Wrapper */}
            <div className={cn(
                "w-full h-full min-h-[297mm]",
                isModern ? "grid grid-cols-[30%_70%]" : "p-[20mm]"
            )}>

                {/* Modern Sidebar (Left Column) */}
                {isModern && (
                    <aside className="bg-[var(--theme-color)] text-white p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                                {personalInfo.name ? personalInfo.name.charAt(0) : "A"}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold uppercase tracking-wide leading-tight">
                                    {personalInfo.name || "Your Name"}
                                </h1>
                                <p className="text-white/80 mt-1 font-medium">{personalInfo.title}</p>
                            </div>
                        </div>

                        {/* Contact Info in Sidebar */}
                        <div className="space-y-3 text-sm text-white/90">
                            {personalInfo.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 shrink-0" /> {personalInfo.location}
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 shrink-0" /> {personalInfo.phone}
                                </div>
                            )}
                            {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 shrink-0" /> {personalInfo.email}
                                </div>
                            )}
                            {links.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin className="w-4 h-4 shrink-0" /> {links.linkedin}
                                </div>
                            )}
                            {links.github && (
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4 shrink-0" /> {links.github}
                                </div>
                            )}
                            {links.portfolio && (
                                <div className="flex items-center gap-2 pb-1 border-b border-white/20">
                                    <Globe className="w-4 h-4 shrink-0" /> {links.portfolio}
                                </div>
                            )}
                        </div>

                        {/* Skills in Sidebar */}
                        {skills && (typeof skills === 'object' || typeof skills === 'string') && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">Skills</h3>
                                {typeof skills === 'string' ? (
                                    <p className="text-sm leading-relaxed opacity-90">{skills}</p>
                                ) : (
                                    <div className="space-y-4">
                                        {skills.technical?.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-semibold opacity-70 mb-2">Technical</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {skills.technical.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-white/20 text-xs rounded">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {skills.tools?.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-semibold opacity-70 mb-2">Tools</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {skills.tools.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-white/20 text-xs rounded">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {skills.soft?.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-semibold opacity-70 mb-2">Soft</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {skills.soft.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-white/20 text-xs rounded">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </section>
                        )}
                    </aside>
                )}

                {/* Main Content Area */}
                <div className={cn(isModern ? "p-8 space-y-6" : "space-y-6")}>

                    {/* Header (Non-Modern) */}
                    {!isModern && (
                        <header className={cn(
                            "mb-6 pb-6",
                            isClassic && "border-b-2 border-[var(--theme-color)]"
                        )}>
                            <h1 className={cn(
                                "text-4xl font-bold uppercase tracking-wide mb-2",
                                isClassic && "font-serif text-[var(--theme-color)]",
                                isMinimal && "normal-case tracking-tight font-light text-5xl"
                            )}>
                                {personalInfo.name || "Your Name"}
                            </h1>
                            <p className="text-lg text-neutral-600 mb-3">{personalInfo.title}</p>

                            <div className={cn(
                                "flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600",
                                isMinimal && "text-xs uppercase tracking-widest"
                            )}>
                                {[
                                    personalInfo.location && <span key="loc" className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>,
                                    personalInfo.email && <span key="email" className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personalInfo.email}</span>,
                                    personalInfo.phone && <span key="phone" className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>,
                                    links.github && <span key="gh" className="flex items-center gap-1"><Github className="w-3 h-3" /> {links.github}</span>,
                                    links.linkedin && <span key="li" className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {links.linkedin}</span>,
                                    links.portfolio && <span key="port" className="flex items-center gap-1"><Globe className="w-3 h-3" /> {links.portfolio}</span>
                                ].filter(Boolean)}
                            </div>
                        </header>
                    )}

                    {/* Summary */}
                    {summary && (
                        <section>
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest mb-3",
                                isClassic && "text-[var(--theme-color)] border-b border-neutral-200 pb-1",
                                isModern && "text-[var(--theme-color)]",
                                isMinimal && "text-neutral-400 font-medium tracking-widest"
                            )}>Summary</h2>
                            <p className="text-sm leading-relaxed text-neutral-800">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest mb-4",
                                isClassic && "text-[var(--theme-color)] border-b border-neutral-200 pb-1",
                                isModern && "text-[var(--theme-color)]",
                                isMinimal && "text-neutral-400 font-medium tracking-widest"
                            )}>Experience</h2>
                            <div className="space-y-5">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-1">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-base">{exp.role}</h3>
                                            <span className="text-xs font-medium text-neutral-500">{exp.duration}</span>
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-wide text-[var(--theme-color)] mb-2 opacity-80">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-neutral-800 whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest mb-4",
                                isClassic && "text-[var(--theme-color)] border-b border-neutral-200 pb-1",
                                isModern && "text-[var(--theme-color)]",
                                isMinimal && "text-neutral-400 font-medium tracking-widest"
                            )}>Projects</h2>
                            <div className="space-y-4">
                                {projects.map(proj => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-base">{proj.name}</h3>
                                                <div className="flex gap-2">
                                                    {proj.liveUrl && <Globe className="w-3 h-3 text-neutral-400" />}
                                                    {proj.github && <Github className="w-3 h-3 text-neutral-400" />}
                                                </div>
                                            </div>
                                        </div>

                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-1.5">
                                                {proj.techStack.map((tech, idx) => (
                                                    <span key={idx} className={cn(
                                                        "px-1.5 py-0.5 text-[10px] font-medium rounded border",
                                                        isModern ? "bg-[var(--theme-color)]/10 text-[var(--theme-color)] border-[var(--theme-color)]/20" : "bg-neutral-100 text-neutral-600 border-neutral-200"
                                                    )}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-sm leading-relaxed text-neutral-800">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest mb-4",
                                isClassic && "text-[var(--theme-color)] border-b border-neutral-200 pb-1",
                                isModern && "text-[var(--theme-color)]",
                                isMinimal && "text-neutral-400 font-medium tracking-widest"
                            )}>Education</h2>
                            <div className="space-y-3">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-sm">{edu.school}</h3>
                                            <span className="text-xs font-medium text-neutral-500">{edu.year}</span>
                                        </div>
                                        <div className="text-sm text-neutral-700">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Non-Modern Only) */}
                    {!isModern && skills && (typeof skills === 'object' || typeof skills === 'string') && (
                        <section>
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest mb-3",
                                isClassic && "text-[var(--theme-color)] border-b border-neutral-200 pb-1",
                                isMinimal && "text-neutral-400 font-medium tracking-widest"
                            )}>Skills</h2>

                            {typeof skills === 'string' ? (
                                <p className="text-sm leading-relaxed text-neutral-800">{skills}</p>
                            ) : (
                                <div className="space-y-3">
                                    {['technical', 'tools', 'soft'].map(key => skills[key]?.length > 0 && (
                                        <div key={key} className="flex items-baseline gap-2">
                                            <span className="text-xs font-bold w-24 flex-shrink-0 uppercase text-neutral-500">{key}</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {skills[key].map((s, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-neutral-100 text-xs font-medium rounded-md text-neutral-700">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
