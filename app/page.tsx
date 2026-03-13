import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex border border-gray-200 dark:border-gray-800 p-12 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-medicTeal to-blue-500 bg-clip-text text-transparent">
            Medic 138
          </h1>
          <p className="text-lg text-center opacity-80 max-w-lg">
            EMS readiness operating system for individuals, instructors, programs, and agencies.
          </p>
          <div className="flex gap-4 mt-4">
            <Link 
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-medicTeal text-white font-medium hover:bg-teal-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
