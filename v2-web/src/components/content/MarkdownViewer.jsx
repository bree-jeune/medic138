import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownViewer = ({ content }) => {
    // Simple cleanup of Liquid tags which react-markdown won't like
    // This is basic; complex liquid logic won't work, but for simple variable interpolation or known tags we can strip them
    const cleanContent = content
        .replace(/{{\s*page\.url\s*}}/g, '#') // Replace page.url with #
        .replace(/{%[^%]*%}/g, '') // Remove other liquid tags
        .replace(/^[ \t]+(<)/gm, '$1'); // Fix: Un-indent HTML tags so they aren't parsed as code blocks

    // Vanilla JS Logic for Legacy Tabs
    React.useEffect(() => {
        // Select all tab containers
        const tabContainers = document.querySelectorAll('.course-tabs');

        tabContainers.forEach(container => {
            const buttons = container.querySelectorAll('.course-tabs__tab');
            const panels = container.querySelectorAll('.course-tabs__panel');

            // Init: Show first tab if none active
            if (buttons.length > 0) {
                buttons[0].classList.add('active');
                // Hide all except first panel (unless we want to default to 'overview' specifically)
                panels.forEach((panel, idx) => {
                    if (idx === 0) {
                        panel.style.display = 'block';
                    } else {
                        panel.style.display = 'none';
                    }
                });
            }

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-target');

                    // Update Buttons
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Update Panels
                    panels.forEach(panel => {
                        if (panel.id === targetId || panel.getAttribute('id') === targetId) {
                            panel.style.display = 'block';
                        } else {
                            panel.style.display = 'none';
                        }
                    });
                });
            });
        });
    }, [cleanContent]); // Re-run when content changes

    return (
        <div className="prose prose-slate max-w-none prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:underline">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {cleanContent}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownViewer;
