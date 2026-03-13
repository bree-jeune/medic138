import { InteractiveAvatar } from "@/components/simulation/InteractiveAvatar";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AnatomyExplorerPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-[1500px] mx-auto h-[85vh] flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-serif font-bold text-white mb-2">Interactive Anatomy Explorer</h1>
             <p className="text-slate-400">Explore UBERON-mapped anatomical models with integrated clinical insights.</p>
           </div>
           <Link href="/dashboard" className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-wider text-sm transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </Link>
        </div>
        <div className="flex-1 min-h-0 bg-[#040914] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative">
           <InteractiveAvatar assessmentMode={false} />
        </div>
      </div>
    </div>
  )
}
