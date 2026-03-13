import { notFound } from 'next/navigation';
import { INITIAL_SCENARIOS } from '@/lib/simulation-scenarios';
import { SimulationCockpit } from '@/components/simulation/SimulationCockpit';
import Link from 'next/link';

interface ScenarioPageProps {
  params: {
    scenarioId: string;
  };
  searchParams: {
    level?: string;
  };
}

// Ensure scenarios can be statically generated or dynamically rendered
export function generateStaticParams() {
  return INITIAL_SCENARIOS.map((s) => ({
    scenarioId: s().id,
  }));
}

export default function SimulationPage({ params, searchParams }: ScenarioPageProps) {
  // Find scenario factory function
  const scenarioBuilder = INITIAL_SCENARIOS.find(s => s().id === params.scenarioId);

  if (!scenarioBuilder) {
    notFound();
  }

  // We can't pass the scenario object containing `generateSimulation` to the client.
  // Instead, we just extract what we need for the Server Component layout, 
  // and pass the raw ID down to the Cockpit so it can instantiate its own hooks.
  const staticScenario = scenarioBuilder();
  const activeLevel = searchParams.level || 'Paramedic'; // fallback to Paramedic

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-[#020617]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-medium flex items-center gap-2">
            ← Back to Dashboard
          </Link>
          <div className="h-4 w-px bg-slate-800"></div>
          <h1 className="text-sm font-bold tracking-wider uppercase text-slate-300">Medic 138 Simulation Lab</h1>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900 border border-blue-700 text-blue-100">
            Playing As: {activeLevel}
          </span>
        </div>
      </header>
      
      <main className="p-4 md:p-8">
        <SimulationCockpit scenarioId={staticScenario.id} activeLevel={activeLevel} />
      </main>
    </div>
  );
}
