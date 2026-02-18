export function generatePlainText(data) {
    const { personalInfo, summary, experience, education, projects, skills, links } = data;
    const lines = [];

    // Header
    if (personalInfo.name) lines.push(personalInfo.name.toUpperCase());
    const contact = [personalInfo.email, personalInfo.phone, personalInfo.location]
        .filter(Boolean).join(' | ');
    if (contact) lines.push(contact);

    lines.push('');

    // Links
    const socialLinks = [links.github, links.linkedin, links.portfolio].filter(Boolean).join(' | ');
    if (socialLinks) {
        lines.push('LINKS');
        lines.push(socialLinks);
        lines.push('');
    }

    // Summary
    if (summary) {
        lines.push('SUMMARY');
        lines.push(summary);
        lines.push('');
    }

    // Experience
    if (experience.length > 0) {
        lines.push('EXPERIENCE');
        experience.forEach(exp => {
            lines.push(`${exp.role} | ${exp.company} | ${exp.duration}`);
            if (exp.description) lines.push(exp.description);
            lines.push('');
        });
    }

    // Projects
    if (projects.length > 0) {
        lines.push('PROJECTS');
        projects.forEach(proj => {
            let header = proj.name;
            const links = [proj.liveUrl, proj.github].filter(Boolean).join(' | ');
            if (links) header += ` (${links})`;

            lines.push(header);
            if (proj.techStack && proj.techStack.length > 0) {
                lines.push(`Tech Stack: ${proj.techStack.join(', ')}`);
            }
            if (proj.description) lines.push(proj.description);
            lines.push('');
        });
    }

    // Education
    if (education.length > 0) {
        lines.push('EDUCATION');
        education.forEach(edu => {
            lines.push(`${edu.school} | ${edu.degree} | ${edu.year}`);
            lines.push('');
        });
    }

    // Skills
    if (skills) {
        lines.push('SKILLS');
        if (typeof skills === 'string') {
            lines.push(skills);
        } else {
            if (skills.technical?.length > 0) lines.push(`Technical: ${skills.technical.join(', ')}`);
            if (skills.tools?.length > 0) lines.push(`Tools: ${skills.tools.join(', ')}`);
            if (skills.soft?.length > 0) lines.push(`Soft Skills: ${skills.soft.join(', ')}`);
        }
    }

    return lines.join('\n');
}

export function validateExport(data) {
    const missing = [];
    if (!data?.personalInfo?.name) missing.push("Name");
    if ((!data?.experience || data.experience.length === 0) && (!data?.projects || data.projects.length === 0)) missing.push("Experience or Projects");

    return {
        isValid: missing.length === 0,
        missing
    };
}
