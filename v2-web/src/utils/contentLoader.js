import yaml from 'js-yaml';

const parseMarkdown = (raw) => {
    try {
        const match = /^\s*---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
        if (match) {
            const frontmatter = yaml.load(match[1]);
            const content = match[2];
            return { data: frontmatter, content: content.trim() };
        }
        // Fallback if no frontmatter
        return { data: {}, content: raw };
    } catch (e) {
        console.error("Error parsing markdown", e);
        return { data: {}, content: "" };
    }
};

export const getAllCourses = () => {
    const modules = import.meta.glob('../content/courses/*.md', { query: '?raw', import: 'default', eager: true });

    return Object.keys(modules).map((path) => {
        const fileName = path.split('/').pop().replace('.md', '');
        const { data, content } = parseMarkdown(modules[path]);

        return {
            slug: fileName,
            ...data,
            content
        };
    });
};

export const getAllLessons = () => {
    const modules = import.meta.glob('../content/lessons/*.md', { query: '?raw', import: 'default', eager: true });

    return Object.keys(modules).map((path) => {
        const fileName = path.split('/').pop().replace('.md', '');
        const { data, content } = parseMarkdown(modules[path]);

        return {
            slug: fileName,
            ...data,
            content
        };
    });
};

export const getCourseBySlug = (slug) => {
    const courses = getAllCourses();
    return courses.find(course => course.slug === slug);
};
