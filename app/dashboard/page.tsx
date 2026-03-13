import Link from 'next/link';
import { BookOpen, Stethoscope, Video, FileText, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-medicTeal to-blue-500 bg-clip-text text-transparent">
            Medic 138
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-medicTeal bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/lessons" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Lessons</span>
          </Link>
          <Link href="/courses" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition">
            <Video className="w-5 h-5" />
            <span className="font-medium">Courses</span>
          </Link>
          <Link href="/games" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition">
            <Stethoscope className="w-5 h-5" />
            <span className="font-medium">Skills Drills</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Readiness Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-medicTeal flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Readiness Score</h3>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">82<span className="text-lg font-normal text-gray-400">/100</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">CE Hours Needed</h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">12</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Next Renewal</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Mar 15</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Protocols Updated</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
          </div>
        </div>

        {/* Lower Modules Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Action List */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recommended Actions</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/30">
                <FileText className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900 dark:text-orange-300">Review 3 New Protocols</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">Updates to airway management guidelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <Stethoscope className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">Complete Rhythm Module</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">You scored 60% on the last attempt. Review recommended.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legacy Content Panel */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
             <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Continue Learning</h3>
             <div className="space-y-2">
                <Link href="/lessons" className="block p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Browse Lesson Library</span>
                    <span className="text-medicTeal">&rarr;</span>
                  </div>
                </Link>
                <Link href="/courses" className="block p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Continue Active Course</span>
                    <span className="text-medicTeal">&rarr;</span>
                  </div>
                </Link>
                <Link href="/games" className="block p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Launch Skills Drills Simulator</span>
                    <span className="text-medicTeal">&rarr;</span>
                  </div>
                </Link>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
