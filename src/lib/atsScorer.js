export function calculateATSScore(data) {
    let score = 0;
    let suggestions = [];

    const { personalInfo, summary, experience, education, projects, skills, links } = data;

    // 1. Summary Length (40-120 words) (+15)
    // Basic word count by splitting by spaces
    const summaryWordCount = summary ? summary.trim().split(/\s+/).length : 0;
    if (summaryWordCount >= 40 && summaryWordCount <= 120) {
        score += 15;
    } else {
        suggestions.push("Write a stronger summary (40–120 words).");
    }

    // 2. Experience Entries (>= 1) (+10)
    if (experience && experience.length >= 1) {
        score += 10;

        // 5. Measurable Impact in Bullets (+15)
        // Check for numbers, %, $, etc. in description
        const hasMetrics = experience.some(exp => /[0-9]%|\$|increased|reduced|saved|improved/i.test(exp.description || ""));
        if (hasMetrics) {
            score += 15;
        } else {
            suggestions.push("Add measurable impact (numbers, %, $) in experience bullets.");
        }
    } else {
        suggestions.push("Add at least 1 experience entry.");
        // If no experience, they definitely miss the metrics points too, but let's prioritize adding exp first.
    }

    // 3. Projects (>= 2) (+10)
    if (projects && projects.length >= 2) {
        score += 10;
    } else {
        suggestions.push("Add at least 2 projects.");
    }

    // 4. Skills (>= 8 items) (+10)
    // Handle object structure { technical: [], soft: [], tools: [] }
    let skillsCount = 0;
    if (typeof skills === 'object' && skills !== null) {
        skillsCount = (skills.technical?.length || 0) + (skills.soft?.length || 0) + (skills.tools?.length || 0);
    } else if (typeof skills === 'string') {
        // Fallback for any legacy edge cases
        skillsCount = skills.split(',').filter(s => s.trim().length > 0).length;
    }

    if (skillsCount >= 8) {
        score += 10;
    } else {
        suggestions.push(`Add more skills (target 8+, currently ${skillsCount}).`);
    }

    // 6. Links (GitHub or LinkedIn) (+10)
    if (links && (links.github || links.linkedin)) {
        score += 10;
    } else {
        suggestions.push("Add a GitHub or LinkedIn profile link.");
    }

    // 7. Education (Complete) (+10)
    if (education && education.length > 0) {
        // Simple check if first entry has degree and school
        const firstEdu = education[0];
        if (firstEdu.school && firstEdu.degree) {
            score += 10;
        } else {
            suggestions.push("Complete details for your education section.");
        }
    } else {
        suggestions.push("Add your education details.");
    }

    // Baseline points for having Name + Contact (+20) to make it reachable to 100
    // The above add up to: 15+10+15+10+10+10+10 = 80. 
    // We need 20 more stats.
    if (personalInfo.name && (personalInfo.email || personalInfo.phone)) {
        score += 20;
    } else {
        suggestions.push("Add your name and contact info.");
    }

    return {
        score: Math.min(100, score),
        suggestions: suggestions.slice(0, 3) // Return top 3 suggestions
    };
}
