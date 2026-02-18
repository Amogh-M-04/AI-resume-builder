export const steps = [
    {
        id: 1,
        path: '01-problem',
        label: 'Problem',
        title: 'Define the Problem',
        description: 'Clearly articulate the problem your AI Resume Builder solves.',
        lovablePrompt: "Create a landing page for an AI Resume Builder. The hero section should explain how it helps users create professional resumes in minutes using AI. Include a 'Get Started' button and a feature grid highlighting 'AI Writing', 'ATS Optimization', and 'Beautiful Templates'."
    },
    {
        id: 2,
        path: '02-market',
        label: 'Market',
        title: 'Market Research',
        description: 'Analyze the target audience and competitors.',
        lovablePrompt: "Add a 'Market Analysis' section to the dashboard. Display charts showing the demand for resume services. Include a comparison table of competitors like Canva and Zety, highlighting our unique 'AI-first' approach."
    },
    {
        id: 3,
        path: '03-architecture',
        label: 'Architecture',
        title: 'System Architecture',
        description: 'Design the high-level architecture of the application.',
        lovablePrompt: "Create an 'Architecture Diagram' view. Use a mermaid diagram or a visual node graph to show the flow: User Input -> AI Processing (LLM) -> PDF Generation -> User Download. Style it with the system colors."
    },
    {
        id: 4,
        path: '04-hld',
        label: 'HLD',
        title: 'High Level Design',
        description: 'Map out the core modules and data flow.',
        lovablePrompt: "Generate a High-Level Design document view. List the core modules: Authentication, Profile Management, Resume Editor, and Export Service. Use expansive cards for each module with descriptions."
    },
    {
        id: 5,
        path: '05-lld',
        label: 'LLD',
        title: 'Low Level Design',
        description: 'Detail the API endpoints and database schema.',
        lovablePrompt: "Create a 'Database Schema' viewer. Show tables for Users, Resumes, Experiences, and Education. Also, list the API endpoints like POST /api/generate-resume and GET /api/resumes/:id."
    },
    {
        id: 6,
        path: '06-build',
        label: 'Build',
        title: 'Core Implementation',
        description: 'Develop the core features of the Resume Builder.',
        lovablePrompt: "Implement the 'Resume Editor' interface. Sidebar for input forms (Personal Info, Experience, Skills) and a live preview on the right. Add a 'Generate with AI' button that simulates content generation."
    },
    {
        id: 7,
        path: '07-test',
        label: 'Test',
        title: 'Testing & Validation',
        description: 'Ensure the application works as expected.',
        lovablePrompt: "Add a 'Test Suite' dashboard. Show a list of automated tests (Unit, Integration, E2E) with their pass/fail status. Add a 'Run All Tests' button that triggers a progress bar animation."
    },
    {
        id: 8,
        path: '08-ship',
        label: 'Ship',
        title: 'Deployment',
        description: 'Prepare the application for production.',
        lovablePrompt: "Create the 'Deployment' page. Show status checks for 'Build', 'Lint', and 'Deploy'. Include a 'Launch' button that triggers a confetti animation when clicked, simulating a successful deployment."
    }
];
