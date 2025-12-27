import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Trophy, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user, getAllProgress } = useAuth();
    const navigate = useNavigate();
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            const data = await getAllProgress();
            setProgressData(data);
            setLoading(false);
        };

        fetchData();
    }, [user, navigate, getAllProgress]);

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading your profile...</div>;
    }

    // Calculate stats
    const totalCompleted = progressData.filter(p => p._meta?.percentComplete === 100).length;
    const averageScore = progressData.length > 0
        ? Math.round(progressData.reduce((acc, curr) => acc + (curr._meta?.percentComplete || 0), 0) / progressData.length)
        : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={48} />
                    </div>
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{user.displayName}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">Medic 138 Member</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={<Trophy className="text-yellow-500" />} label="Completed Modules" value={totalCompleted} />
                <StatCard icon={<Activity className="text-blue-500" />} label="Average Score" value={`${averageScore}%`} />
                <StatCard icon={<Clock className="text-green-500" />} label="Active Courses" value={progressData.length} />
            </div>

            {/* Progress List */}
            <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-primary" />
                    Recent Activity
                </h2>

                {progressData.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-500 mb-4">No activity recorded yet.</p>
                        <button onClick={() => navigate('/games')} className="btn bg-primary text-white px-6 py-2 rounded-lg">
                            Start Training
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {progressData.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition border border-gray-100">
                                <div>
                                    <h3 className="font-bold text-gray-900 capitalize">{item._meta?.courseId?.replace(/_/g, ' ') || item.id}</h3>
                                    <p className="text-xs text-gray-500">Last updated: {item._meta?.lastUpdated ? new Date(item._meta.lastUpdated.seconds * 1000).toLocaleDateString() : 'Unknown'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-black text-primary">{item._meta?.percentComplete}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-surface p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
    </div>
);

export default Dashboard;
