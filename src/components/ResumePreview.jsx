import React, { forwardRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { MapPin, Phone, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ResumePreview = forwardRef(({ className, scale = 1 }, ref) => {
    const { resumeData } = useResume();
    const { personalInfo, summary, experience, education, projects, skills, links, template } = resumeData;

    // Template-specific classes
    const isModern = template === 'modern';
    const isMinimal = template === 'minimal';

    // Base container styles
    const containerClasses = cn(
        "bg-white text-black shadow-2xl mx-auto origin-top transition-transform duration-200",
        isModern ? "font-sans" : isMinimal ? "font-sans" : "font-sans", // Standardize body font, keep serif for headers in classic
        className
    );

    // Initial check for layout
    return (
        <div
            ref={ref}
            className={containerClasses}
            style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '20mm',
                transform: `scale(${scale})`
            }}
        >
            {/* Header */}
            <header className={cn(
                "mb-8 pb-6",
                !isMinimal && "border-b border-black",
                isModern && "flex justify-between items-start border-b-2 border-neutral-800"
            )}>
                <div>
                    <h1 className={cn(
                        "text-4xl font-bold uppercase tracking-wide mb-2",
                        !isModern && "font-serif",
                        isModern && "text-5xl tracking-tighter"
                    )}>
                        {personalInfo.name || "Your Name"}
                    </h1>
                    <div className={cn(
                        "flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-600",
                        isModern && "text-neutral-500 normal-case tracking-normal text-sm"
                    )}>
                        {personalInfo.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {personalInfo.location}
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {personalInfo.phone}
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {personalInfo.email}
                            </div>
                        )}
                    </div>
                    {/* Links - Moved inside header div for modern layout flow if needed */}
                    {(links.github || links.linkedin || links.portfolio) && (
                        <div className={cn(
                            "flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-600 mt-2",
                            isModern && "text-neutral-500 normal-case tracking-normal text-sm"
                        )}>
                            {links.github && (
                                <div className="flex items-center gap-1">
                                    <Github className="w-3 h-3" /> {links.github}
                                </div>
                            )}
                            {links.linkedin && (
                                <div className="flex items-center gap-1">
                                    <Linkedin className="w-3 h-3" /> {links.linkedin}
                                </div>
                            )}
                            {links.portfolio && (
                                <div className="flex items-center gap-1">
                                    <Globe className="w-3 h-3" /> {links.portfolio}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Sections */}
            <div className={cn("space-y-8", isMinimal && "space-y-6")}>
                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className={cn(
                            "text-sm font-bold uppercase tracking-widest mb-3",
                            !isMinimal && "border-b border-neutral-200 pb-1",
                            isModern && "text-lg tracking-tight border-black border-b-2"
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
                            !isMinimal && "border-b border-neutral-200 pb-1",
                            isModern && "text-lg tracking-tight border-black border-b-2"
                        )}>Experience</h2>
                        <div className={cn("space-y-5", isMinimal && "space-y-4")}>
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.role}</h3>
                                        <span className={cn("text-xs font-medium text-neutral-500 uppercase tracking-wide", isModern && "normal-case")}>{exp.duration}</span>
                                    </div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 mb-2">{exp.company}</div>
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
                            !isMinimal && "border-b border-neutral-200 pb-1",
                            isModern && "text-lg tracking-tight border-black border-b-2"
                        )}>Projects</h2>
                        <div className={cn("space-y-5", isMinimal && "space-y-4")}>
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-base">{proj.name}</h3>
                                            <div className="flex gap-2">
                                                {proj.liveUrl && (
                                                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black">
                                                        <Globe className="w-3 h-3" />
                                                    </a>
                                                )}
                                                {proj.github && (
                                                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black">
                                                        <Github className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {proj.techStack && proj.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1.5">
                                            {proj.techStack.map((tech, idx) => (
                                                <span key={idx} className="px-1.5 py-0.5 bg-neutral-100 text-[10px] font-medium rounded text-neutral-600 border border-neutral-200">
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
                            !isMinimal && "border-b border-neutral-200 pb-1",
                            isModern && "text-lg tracking-tight border-black border-b-2"
                        )}>Education</h2>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-sm">{edu.school}</h3>
                                        <span className={cn("text-xs font-medium text-neutral-500", isModern && "text-sm")}>{edu.year}</span>
                                    </div>
                                    <div className="text-sm text-neutral-700">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && (typeof skills === 'object' || typeof skills === 'string') && (
                    <section>
                        <h2 className={cn(
                            "text-sm font-bold uppercase tracking-widest mb-3",
                            !isMinimal && "border-b border-neutral-200 pb-1",
                            isModern && "text-lg tracking-tight border-black border-b-2"
                        )}>Skills</h2>

                        {typeof skills === 'string' ? (
                            <p className="text-sm leading-relaxed text-neutral-800">{skills}</p>
                        ) : (
                            <div className="space-y-3">
                                {skills.technical?.length > 0 && (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold w-24 flex-shrink-0 uppercase text-neutral-500">Technical</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {skills.technical.map((s, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-neutral-100 text-xs font-medium rounded-md text-neutral-700">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {skills.tools?.length > 0 && (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold w-24 flex-shrink-0 uppercase text-neutral-500">Tools</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {skills.tools.map((s, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-neutral-100 text-xs font-medium rounded-md text-neutral-700">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {skills.soft?.length > 0 && (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold w-24 flex-shrink-0 uppercase text-neutral-500">Soft Skills</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {skills.soft.map((s, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-neutral-100 text-xs font-medium rounded-md text-neutral-700">
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
            </div>
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
