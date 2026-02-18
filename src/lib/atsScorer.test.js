import { describe, it, expect } from 'vitest';
import { calculateATSScore } from './atsScorer';

describe('ATS Scorer Logic', () => {
    it('calculates score based on presence of sections', () => {
        const data = {
            personalInfo: { name: 'John Doe', email: 'test@example.com', phone: '1234567890', location: 'City' },
            summary: 'Experienced developer with a strong background in React and Node.js. Successfully delivered multiple projects on time and within budget. Passionate about clean code and performance optimization. Looking for new challenges in full-stack development.',
            experience: [{ company: 'Test Corp', description: 'Led team and increased performance by 20%.' }],
            education: [{ school: 'University', degree: 'BS CS' }],
            skills: { technical: ['React', 'Node', 'JS', 'CSS', 'HTML', 'Git', 'AWS', 'Docker'], soft: [], tools: [] },
            projects: [{ title: 'P1', description: 'D1' }, { title: 'P2', description: 'D2' }],
            links: { github: 'https://github.com/test' }
        };

        const result = calculateATSScore(data);
        // 20 (base) + 15 (summary) + 10 (exp) + 15 (metrics) + 10 (projects) + 10 (skills) + 10 (links) + 10 (edu) = 100
        expect(result.score).toBeGreaterThan(80);
        expect(result.suggestions).toBeDefined();
    });

    it('returns low score for empty data', () => {
        const emptyData = {
            personalInfo: {},
            summary: '',
            experience: [],
            education: [],
            skills: { technical: [], soft: [], tools: [] },
            projects: []
        };

        const result = calculateATSScore(emptyData);
        expect(result.score).toBeLessThan(40);
    });
});
