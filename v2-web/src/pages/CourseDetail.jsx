import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseBySlug } from '../utils/contentLoader';
import MarkdownViewer from '../components/content/MarkdownViewer';
import { ArrowLeft, Clock, Tag, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
    const { slug } = useParams();
    const { user, saveProgress, getProgress } = useAuth();
    const [course, setCourse] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const data = getCourseBySlug(slug);
        setCourse(data);

        // Load progress
        if (user && slug) {
            getProgress(slug).then(p => {
                if (p && p.completed) setIsCompleted(true);
            });
        }
    }, [slug, user, getProgress]);

    const handleComplete = async () => {
        if (!user) return; // Should prompt login in real app
        await saveProgress(slug, { completed: true });
        setIsCompleted(true);
    };

    if (!course) {
        return <div className="p-12 text-center">Course not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition">
                <ArrowLeft size={18} /> Back to Library
            </Link>

            {/* Header */}
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                    {course.level && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {course.level}
                        </span>
                    )}
                    {course.duration && (
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                            <Clock size={12} /> {course.duration}
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{course.title}</h1>
                {course.description && (
                    <p className="text-xl text-gray-600 leading-relaxed">{course.description}</p>
                )}
            </div>

            {/* Content */}
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[50vh]">
                {/* Render Markdown Content */}
                <MarkdownViewer content={course.content} />

                {/* Completion Section */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
                    {user ? (
                        <button
                            onClick={handleComplete}
                            disabled={isCompleted}
                            className={`btn px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition ${isCompleted
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {isCompleted ? (
                                <>
                                    <CheckCircle size={20} />
                                    Completed
                                </>
                            ) : (
                                'Mark Lesson Complete'
                            )}
                        </button>
                    ) : (
                        <div className="text-center bg-gray-50 p-6 rounded-xl">
                            <p className="text-gray-600 mb-2">Log in to track your progress.</p>
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Sign In Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
