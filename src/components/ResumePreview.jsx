import React, { forwardRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { MapPin, Phone, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ResumePreview = forwardRef(({ className, scale = 1 }, ref) => {
    const { resumeData } = useResume();
    const { personalInfo, summary, experience, education, projects, skills, links } = resumeData;

    return (
        <div
            ref={ref}
            className={cn("bg-white text-black font-sans shadow-2xl mx-auto origin-top transition-transform duration-200", className)}
            style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '20mm',
                transform: `scale(${scale})`
            }}
        >
            {/* Header */}
            <header className="mb-8 border-b pb-6 border-black">
                <h1 className="text-4xl font-serif font-bold uppercase tracking-wide mb-2">
                    {personalInfo.name || "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-600">
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

                {/* Links */}
                {(links.github || links.linkedin || links.portfolio) && (
                    <div className="flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-600 mt-2">
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
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Summary</h2>
                    <p className="text-sm leading-relaxed text-neutral-800">
                        {summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-neutral-200 pb-1">Experience</h2>
                    <div className="space-y-5">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{exp.role}</h3>
                                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{exp.duration}</span>
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
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-neutral-200 pb-1">Projects</h2>
                    <div className="space-y-5">
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{proj.name}</h3>
                                    {proj.link && <span className="text-xs text-neutral-500">{proj.link}</span>}
                                </div>
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
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-neutral-200 pb-1">Education</h2>
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

            {/* Skills */}
            {skills && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Skills</h2>
                    <p className="text-sm leading-relaxed text-neutral-800">
                        {skills}
                    </p>
                </section>
            )}
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
