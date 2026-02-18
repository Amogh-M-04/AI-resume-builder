import { steps } from './steps';

export const CHECKLIST_ITEMS = [
    { id: 'storage', label: 'All form sections save to localStorage' },
    { id: 'preview', label: 'Live preview updates in real-time' },
    { id: 'templates', label: 'Template switching preserves data' },
    { id: 'theme', label: 'Color theme persists after refresh' },
    { id: 'ats', label: 'ATS score calculates correctly' },
    { id: 'live_score', label: 'Score updates live on edit' },
    { id: 'export', label: 'Export buttons work (copy/download)' },
    { id: 'empty', label: 'Empty states handled gracefully' },
    { id: 'mobile', label: 'Mobile responsive layout works' },
    { id: 'console', label: 'No console errors on any page' }
];

export function checkShippedStatus() {
    // 1. Check Steps (8 required)
    const stepsCompleted = steps.every(step => {
        return !!localStorage.getItem(`rb_step_${step.id}_artifact`);
    });

    // 2. Check Checklist (10 required)
    const checklistJson = localStorage.getItem('rb_checklist');
    const checklist = checklistJson ? JSON.parse(checklistJson) : {};
    const checklistCompleted = CHECKLIST_ITEMS.every(item => checklist[item.id] === true);

    // 3. Check Final Links (3 required)
    const linksJson = localStorage.getItem('rb_final_links');
    const links = linksJson ? JSON.parse(linksJson) : {};
    const linksCompleted = !!(links.lovable && links.github && links.deploy);

    return {
        stepsCompleted,
        checklistCompleted,
        linksCompleted,
        isShipped: stepsCompleted && checklistCompleted && linksCompleted
    };
}
