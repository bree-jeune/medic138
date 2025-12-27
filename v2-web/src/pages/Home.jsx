import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, BookOpen, UserCheck } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                    Master the <span className="text-primary">Art of Medicine</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Interactive scenarios, real-world skills drills, and pattern recognition training for front-line responders.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/games" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2">
                        Start Training <ArrowRight size={20} />
                    </Link>
                    <Link to="/courses" className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Browse Courses
                    </Link>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Activity className="text-primary" size={32} />}
                    title="Skills Drills"
                    description="Practice oxygen math, flow rates, and ECG interpretation with our interactive game engine."
                />
                <FeatureCard
                    icon={<BookOpen className="text-primary" size={32} />}
                    title="Micro-Lessons"
                    description="Bite-sized clinical pearls designed for rapid consumption between calls."
                />
                <FeatureCard
                    icon={<UserCheck className="text-primary" size={32} />}
                    title="Pattern Recognition"
                    description="Train your brain to spot sick patients instantly with our scenario-based approach."
                />
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Home;
