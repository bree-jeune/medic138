import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../utils/contentLoader';
import { BookOpen, Clock, Tag } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const data = getAllCourses();
        setCourses(data);
    }, []);

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Course Library</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive medical protocols, theory, and clinical guidelines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.slug} course={course} />
                ))}
            </div>
        </div>
    );
};

const CourseCard = ({ course }) => {
    return (
        <Link
            to={`/courses/${course.slug}`}
            className="block bg-surface p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group h-full flex flex-col"
        >
            <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {course.level || 'General'}
                    </span>
                    <BookOpen size={20} className="text-gray-400" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-gray-900">
                    {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                </p>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 flex items-center gap-4 text-xs text-gray-500 font-medium">
                {course.duration && (
                    <span className="flex items-center gap-1">
                        <Clock size={14} /> {course.duration}
                    </span>
                )}
                {course.topic && (
                    <span className="flex items-center gap-1">
                        <Tag size={14} /> {course.topic}
                    </span>
                )}
            </div>
        </Link>
    );
};

export default Courses;
