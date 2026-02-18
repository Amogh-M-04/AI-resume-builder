import React, { createContext, useContext, useState } from 'react';
import { sampleResume } from '@/data/sampleResume';

const ResumeContext = createContext();

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

export const ResumeProvider = ({ children }) => {
    // Initialize from localStorage or default
    const [resumeData, setResumeData] = useState(() => {
        const savedData = localStorage.getItem('resumeBuilderData');
        let parsedData = null;

        try {
            parsedData = savedData ? JSON.parse(savedData) : null;
        } catch (e) {
            console.error("Failed to parse resume data:", e);
            parsedData = null;
        }

        if (parsedData) {
            // Migration: Skills (String -> Object)
            if (typeof parsedData.skills === 'string') {
                const oldSkills = parsedData.skills.split(',').filter(s => s.trim().length > 0).map(s => s.trim());
                parsedData.skills = {
                    technical: oldSkills,
                    soft: [],
                    tools: []
                };
            }
            // Ensure skills object structure if it exists but might be partial (safety)
            if (!parsedData.skills || typeof parsedData.skills !== 'object') {
                parsedData.skills = { technical: [], soft: [], tools: [] };
            }

            // Migration: Projects (Add new fields)
            if (parsedData.projects) {
                parsedData.projects = parsedData.projects.map(p => ({
                    ...p,
                    techStack: Array.isArray(p.techStack) ? p.techStack : [],
                    liveUrl: p.liveUrl || '',
                    github: p.github || ''
                }));
            }

            // Ensure template defaults
            if (!parsedData.template) parsedData.template = 'classic';
            if (!parsedData.themeColor) parsedData.themeColor = 'hsl(168, 60%, 40%)';

            // Ensure distinct objects exist (Deep merge safety for essential objects)
            if (!parsedData.personalInfo) parsedData.personalInfo = { name: '', email: '', phone: '', location: '', title: '' };
            if (!parsedData.links) parsedData.links = { github: '', linkedin: '', portfolio: '' };
            if (!Array.isArray(parsedData.education)) parsedData.education = [];
            if (!Array.isArray(parsedData.experience)) parsedData.experience = [];
            if (!Array.isArray(parsedData.projects)) parsedData.projects = [];

            return parsedData;
        }

        return {
            personalInfo: { name: '', email: '', phone: '', location: '' },
            summary: '',
            education: [],
            experience: [],
            projects: [],
            skills: { technical: [], soft: [], tools: [] },
            links: { github: '', linkedin: '', portfolio: '' },
            template: 'classic',
            themeColor: 'hsl(168, 60%, 40%)', // Default Teal
        };
    });

    // Auto-save effect
    React.useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const updateLinks = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            links: { ...prev.links, [field]: value }
        }));
    };

    const updateField = (field, value) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    // Generic list handlers for Edu, Exp, Projects
    const addEntry = (section, entry) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...entry, id: Date.now() }]
        }));
    };

    const removeEntry = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const updateEntry = (section, id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const loadSampleData = () => {
        setResumeData(sampleResume);
    };

    const clearData = () => {
        const emptyState = {
            personalInfo: { name: '', email: '', phone: '', location: '' },
            summary: '',
            education: [],
            experience: [],
            projects: [],
            skills: { technical: [], soft: [], tools: [] },
            links: { github: '', linkedin: '', portfolio: '' },
            template: 'classic',
            themeColor: 'hsl(168, 60%, 40%)',
        };
        setResumeData(emptyState);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonalInfo,
            updateLinks,
            updateField,
            addEntry,
            removeEntry,
            updateEntry,
            loadSampleData,
            clearData,
            setTemplate: (tmpl) => setResumeData(prev => ({ ...prev, template: tmpl })),
            setThemeColor: (color) => setResumeData(prev => ({ ...prev, themeColor: color }))
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
