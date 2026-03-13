import Link from "next/link";
import { Activity, ShieldCheck, Stethoscope, Video } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
          Medic 138
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-cyan-900/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-semibold text-cyan-400 mb-8 uppercase tracking-widest backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Now Live: The NREMT Clinical Simulation Engine
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
          Prehospital Education,<br className="hidden md:block"/> 
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Engineered for Reality.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Level up your EMS training. Practice your clinical skills in a safe, realistic environment with interactive modules and scenario-based simulations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/simulation"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg transition-all hover:-translate-y-1 shadow-xl shadow-cyan-900/30 flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Launch Simulator
          </Link>
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-white font-bold text-lg transition-all hover:-translate-y-1 backdrop-blur-sm"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-cyan-900/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center text-cyan-400 mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Dynamic Physiology</h3>
            <p className="text-slate-400 leading-relaxed">
              Vitals aren't static. Our engine models real pathologies—watch the SpO2 drop and heart rate spike if you delay critical interventions.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-900/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-950/50 border border-blue-900/50 flex items-center justify-center text-blue-400 mb-6">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Interactive Assessments</h3>
            <p className="text-slate-400 leading-relaxed">
              Listen to lung sounds on a digital anatomical avatar, operate a simulated cardiac monitor, and calculate manual blood pressures.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-emerald-900/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center text-emerald-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Evidence Based</h3>
            <p className="text-slate-400 leading-relaxed">
              Every scenario maps strictly to current AHA, NAEMT, and National EMS Educational Standards. No guessing, just facts.
            </p>
          </div>

        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="border-t border-slate-800/50 py-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Medic 138. All rights reserved.</p>
      </footer>
    </main>
  );
}
