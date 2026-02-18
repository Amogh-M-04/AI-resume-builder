import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { ResumePreview } from '@/components/ResumePreview';
import { ATSScoreMeter } from '@/components/ATSScoreMeter';
import { calculateATSScore } from '@/lib/atsScorer';
import { SmartTextArea } from '@/components/SmartTextArea';
import { TagInput } from '@/components/TagInput';
import { cn } from '@/lib/utils';
import { Plus, Trash2, Wand2, Layout, ChevronDown, ChevronUp, Github, Globe } from 'lucide-react';
import { useState } from 'react';

export function Builder() {
    const { resumeData } = useResume();
    const { score, suggestions } = calculateATSScore(resumeData);

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Forms (5/12 grid but flex based here) */}
            <div className="w-[40%] min-w-[400px] border-r bg-background flex flex-col h-full">
                <div className="p-6 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif font-bold text-xl text-primary">Content</h2>
                        <SampleLoader />
                    </div>
                    <TemplateTabs />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* ATS Score Meter */}
                    <ATSScoreMeter score={score} suggestions={suggestions} />

                    <PersonalInfoForm />
                    <SummaryForm />
                    <ExperienceForm />
                    <EducationForm />
                    <ProjectsForm />
                    <SkillsForm />
                    <LinksForm />
                    {/* Spacer */}
                    <div className="h-12" />
                </div>
            </div>

            {/* Right Panel - Preview (7/12) */}
            <div className="flex-1 bg-muted/40 p-8 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-8">
                    {/* Scale Logic Could be added here, for now default scale 0.8 to fit */}
                    <div className="transform scale-[0.65] lg:scale-[0.85] origin-top">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ title }) {
    return (
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 border-b pb-2">{title}</h3>
    );
}

function Input({ label, value, onChange, placeholder }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">{label}</label>
            <input
                className="w-full px-3 py-2 bg-white border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">{label}</label>
            <textarea
                className="w-full px-3 py-2 bg-white border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/20"
                rows={rows}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

// --- Form Sections ---

function SampleLoader() {
    const { loadSampleData, clearData } = useResume();
    return (
        <div className="flex gap-2">
            <button
                onClick={clearData}
                className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors px-2 py-1"
            >
                Clear
            </button>
            <button
                onClick={loadSampleData}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors"
            >
                <Wand2 className="w-3 h-3" />
                Load Sample
            </button>
        </div>
    );
}

function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResume();
    return (
        <section>
            <SectionHeader title="Personal Information" />
            <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" value={resumeData.personalInfo.name} onChange={(e) => updatePersonalInfo('name', e.target.value)} />
                <Input label="Job Title" value={resumeData.personalInfo.title} onChange={(e) => updatePersonalInfo('title', e.target.value)} placeholder="e.g. Software Engineer" />
                <Input label="Email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
                <Input label="Phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
                <Input label="Location" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
            </div>
        </section>
    );
}

function SummaryForm() {
    const { resumeData, updateField } = useResume();
    return (
        <section>
            <SectionHeader title="Professional Summary" />
            <TextArea
                label="Summary"
                value={resumeData.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                placeholder="Briefly describe your professional background and key achievements..."
            />
        </section>
    );
}

function ExperienceForm() {
    const { resumeData, addEntry, removeEntry, updateEntry } = useResume();
    return (
        <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Experience</h3>
                <button
                    onClick={() => addEntry('experience', { role: '', company: '', duration: '', description: '' })}
                    className="p-1 hover:bg-muted rounded-full text-primary"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-6">
                {resumeData.experience.map(exp => (
                    <div key={exp.id} className="p-4 bg-muted/20 border rounded-lg space-y-3 relative group">
                        <button
                            onClick={() => removeEntry('experience', exp.id)}
                            className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Role" value={exp.role} onChange={(e) => updateEntry('experience', exp.id, 'role', e.target.value)} />
                            <Input label="Company" value={exp.company} onChange={(e) => updateEntry('experience', exp.id, 'company', e.target.value)} />
                            <Input label="Duration" value={exp.duration} onChange={(e) => updateEntry('experience', exp.id, 'duration', e.target.value)} placeholder="e.g. 2021 - Present" />
                        </div>
                        <SmartTextArea
                            label="Description"
                            value={exp.description}
                            onChange={(e) => updateEntry('experience', exp.id, 'description', e.target.value)}
                            rows={3}
                            checkType={['action-verb', 'measurable']}
                        />
                    </div>
                ))}
                {resumeData.experience.length === 0 && <p className="text-xs text-muted-foreground italic">No experience added yet.</p>}
            </div>
        </section>
    );
}

function EducationForm() {
    const { resumeData, addEntry, removeEntry, updateEntry } = useResume();
    return (
        <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Education</h3>
                <button
                    onClick={() => addEntry('education', { school: '', degree: '', year: '' })}
                    className="p-1 hover:bg-muted rounded-full text-primary"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                {resumeData.education.map(edu => (
                    <div key={edu.id} className="p-4 bg-muted/20 border rounded-lg space-y-3 relative group">
                        <button
                            onClick={() => removeEntry('education', edu.id)}
                            className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="School" value={edu.school} onChange={(e) => updateEntry('education', edu.id, 'school', e.target.value)} />
                            <Input label="Year" value={edu.year} onChange={(e) => updateEntry('education', edu.id, 'year', e.target.value)} />
                        </div>
                        <Input label="Degree" value={edu.degree} onChange={(e) => updateEntry('education', edu.id, 'degree', e.target.value)} />
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProjectsForm() {
    const { resumeData, addEntry, removeEntry, updateEntry } = useResume();
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Projects</h3>
                <button
                    onClick={() => {
                        const newId = Date.now();
                        addEntry('projects', { id: newId, name: 'New Project', techStack: [], liveUrl: '', github: '', description: '' });
                        setExpanded(newId);
                    }}
                    className="p-1 hover:bg-muted rounded-full text-primary"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                {resumeData.projects.map(proj => (
                    <div key={proj.id} className="bg-muted/20 border rounded-lg overflow-hidden transition-all">
                        <div
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted/40"
                            onClick={() => toggleExpand(proj.id)}
                        >
                            <span className="font-semibold text-sm">{proj.name || 'Untitled Project'}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeEntry('projects', proj.id); }}
                                    className="text-muted-foreground hover:text-destructive p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expanded === proj.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                        </div>

                        {expanded === proj.id && (
                            <div className="p-4 pt-0 space-y-3 border-t bg-white/50">
                                <Input label="Project Title" value={proj.name} onChange={(e) => updateEntry('projects', proj.id, 'name', e.target.value)} />

                                <TagInput
                                    label="Tech Stack"
                                    tags={proj.techStack || []}
                                    onTagsChange={(newTags) => updateEntry('projects', proj.id, 'techStack', newTags)}
                                    placeholder="React, Node.js..."
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5 container-input">
                                        <label className="text-xs font-medium flex items-center gap-1"><Globe className="w-3 h-3" /> Live URL</label>
                                        <input
                                            className="w-full px-3 py-2 bg-white border rounded-md text-sm focus:ring-1 focus:ring-primary/20"
                                            value={proj.liveUrl || ''}
                                            onChange={(e) => updateEntry('projects', proj.id, 'liveUrl', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-1.5 container-input">
                                        <label className="text-xs font-medium flex items-center gap-1"><Github className="w-3 h-3" /> GitHub URL</label>
                                        <input
                                            className="w-full px-3 py-2 bg-white border rounded-md text-sm focus:ring-1 focus:ring-primary/20"
                                            value={proj.github || ''}
                                            onChange={(e) => updateEntry('projects', proj.id, 'github', e.target.value)}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <SmartTextArea
                                        label="Description"
                                        value={proj.description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 200) {
                                                updateEntry('projects', proj.id, 'description', e.target.value);
                                            }
                                        }}
                                        rows={3}
                                        checkType={['action-verb', 'measurable']}
                                    />
                                    <span className={cn("absolute top-0 right-0 text-[10px]", (proj.description?.length || 0) > 180 ? "text-orange-500" : "text-muted-foreground")}>
                                        {proj.description?.length || 0}/200
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function SkillsForm() {
    const { resumeData, updateField } = useResume();
    const [loading, setLoading] = useState(false);

    // Ensure skills is object (migration safety)
    const skills = typeof resumeData.skills === 'object' ? resumeData.skills : { technical: [], soft: [], tools: [] };

    const updateCategory = (category, newTags) => {
        updateField('skills', { ...skills, [category]: newTags });
    };

    const suggestSkills = () => {
        setLoading(true);
        setTimeout(() => {
            updateField('skills', {
                technical: [...new Set([...skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                soft: [...new Set([...skills.soft, "Team Leadership", "Problem Solving"])],
                tools: [...new Set([...skills.tools, "Git", "Docker", "AWS"])]
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <SectionHeader title="Skills" />
                <button
                    onClick={suggestSkills}
                    disabled={loading}
                    className="text-xs flex items-center gap-1 text-primary hover:underline disabled:opacity-50"
                >
                    <Wand2 className={cn("w-3 h-3", loading && "animate-spin")} />
                    {loading ? "Loading..." : "Suggest Skills"}
                </button>
            </div>

            <div className="space-y-4">
                <TagInput
                    label="Technical Skills"
                    tags={skills.technical || []}
                    onTagsChange={(tags) => updateCategory('technical', tags)}
                    placeholder="React, Java, Python..."
                />
                <TagInput
                    label="Tools & Technologies"
                    tags={skills.tools || []}
                    onTagsChange={(tags) => updateCategory('tools', tags)}
                    placeholder="Git, Jira, Figma..."
                />
                <TagInput
                    label="Soft Skills"
                    tags={skills.soft || []}
                    onTagsChange={(tags) => updateCategory('soft', tags)}
                    placeholder="Leadership, Communication..."
                />
            </div>
        </section>
    );
}

function LinksForm() {
    const { resumeData, updateLinks } = useResume();
    return (
        <section>
            <SectionHeader title="Social Links" />
            <div className="grid grid-cols-2 gap-4">
                <Input label="GitHub" value={resumeData.links.github} onChange={(e) => updateLinks('github', e.target.value)} placeholder="github.com/username" />
                <Input label="LinkedIn" value={resumeData.links.linkedin} onChange={(e) => updateLinks('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
                <Input label="Portfolio" value={resumeData.links.portfolio} onChange={(e) => updateLinks('portfolio', e.target.value)} placeholder="yourname.dev" />
            </div>
        </section>
    );
}
// --- Components ---

function TemplateTabs() {
    const { resumeData, setTemplate } = useResume();
    const templates = [
        { id: 'classic', label: 'Classic' },
        { id: 'modern', label: 'Modern' },
        { id: 'minimal', label: 'Minimal' }
    ];

    return (
        <div className="flex bg-muted p-1 rounded-lg">
            {templates.map(t => (
                <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={cn(
                        "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                        resumeData.template === t.id
                            ? "bg-white text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
