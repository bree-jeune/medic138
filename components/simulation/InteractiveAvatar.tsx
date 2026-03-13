"use client";

import React, { useState } from "react";
import { Activity, Stethoscope, ChevronRight } from "lucide-react";

interface InteractiveAvatarProps {
  onOrganClick?: (region: string) => void;
  assessmentMode?: boolean;
}

// Coordinate mapping for the image
const anatomicalRegions = [
  { id: "head", label: "Head & Neck", x: "45%", y: "5%", width: "10%", height: "10%" },
  { id: "rul", label: "Right Upper Lobe", x: "32%", y: "20%", width: "15%", height: "12%" }, // Patient's Right (viewer's left)
  { id: "lul", label: "Left Upper Lobe", x: "53%", y: "20%", width: "15%", height: "12%" },  // Patient's Left
  { id: "heart", label: "Heart Tones", x: "47%", y: "26%", width: "12%", height: "10%" },
  { id: "rll", label: "Right Lower Lobe", x: "30%", y: "32%", width: "16%", height: "12%" },
  { id: "lll", label: "Left Lower Lobe", x: "54%", y: "32%", width: "16%", height: "12%" },
  { id: "ruq", label: "Right Upper Quadrant (Bowel)", x: "40%", y: "45%", width: "10%", height: "10%" },
  { id: "luq", label: "Left Upper Quadrant (Bowel)", x: "50%", y: "45%", width: "10%", height: "10%" },
  { id: "rlq", label: "Right Lower Quadrant", x: "40%", y: "55%", width: "10%", height: "10%" },
  { id: "llq", label: "Left Lower Quadrant", x: "50%", y: "55%", width: "10%", height: "10%" },
  { id: "r_arm", label: "Right Arm / BP Cuff", x: "20%", y: "25%", width: "10%", height: "25%" },
  { id: "l_arm", label: "Left Arm / Pulse", x: "70%", y: "25%", width: "10%", height: "25%" },
];

export function InteractiveAvatar({
  onOrganClick,
  assessmentMode = true,
}: InteractiveAvatarProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleClick = (id: string, label: string) => {
    setSelectedRegion(id);
    if (onOrganClick) {
      onOrganClick(id);
    }
  };

  const getClinicalFinding = (id: string) => {
    if (id === "lul" || id === "rul" || id === "lll" || id === "rll") {
      return "Expiratory wheezing audible in upper lobes. Diminished bases.";
    }
    if (id === "heart") {
      return "S1/S2 present. Tachycardic. No murmurs, rubs, or gallops.";
    }
    if (id === "ruq" || id === "rlq" || id === "luq" || id === "llq") {
      return "Bowel sounds active x4. Soft, non-tender to palpation.";
    }
    if (id === "r_arm") {
      return "Skin is warm, pink, and dry. Cuff attached.";
    }
    if (id === "l_arm") {
      return "Strong, rapid radial pulse palpable.";
    }
    if (id === "head") {
      return "Pupils 4mm equal, round, reactive to light. Airway patent.";
    }
    return "No acute findings in this region.";
  };

  return (
    <div className="flex h-full w-full bg-[#030712] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-sans">
      {/* Left pane: The Avatar */}
      <div className="flex-1 relative flex bg-slate-950 p-2 overflow-hidden justify-center items-center">
        {/* Glow effect */}
        <div className="absolute w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative h-full w-full max-w-[400px] aspect-[1/2] mx-auto opacity-90 drop-shadow-lg">
          {/* We use an arbitrary female anatomical chart from public domain or placeholder logic for the MVP. */}
          {/* In a real project, this would be the provided image. */}
          <div className="absolute inset-0 bg-[#e4ccb9] opacity-20 rounded-full filter blur-xl shadow-[0_0_50px_rgba(228,204,185,0.3)]"></div>
          
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Human_body_silhouette.svg" 
            alt="Anatomical Avatar"
            className="w-full h-full object-contain filter opacity-60 brightness-150 contrast-125 saturate-50 mix-blend-screen mix-blend-plus-lighter" 
          />
          
          {/* Interactive Hitboxes mapped over the image */}
          {anatomicalRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleClick(region.id, region.label)}
              className={`absolute border border-dashed rounded-lg transition-all duration-300 ${
                selectedRegion === region.id
                  ? "bg-cyan-500/30 border-cyan-400 z-20 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110"
                  : "bg-transparent border-slate-600/50 hover:bg-slate-500/20 hover:border-slate-400 z-10"
              }`}
              style={{
                left: region.x,
                top: region.y,
                width: region.width,
                height: region.height,
              }}
              title={region.label}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right pane: Information & Assessment */}
      <div className="w-[300px] lg:w-[350px] bg-[#090f1f] border-l border-slate-800 flex flex-col">
        <div className="flex border-b border-slate-800 bg-slate-900/50 p-4 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-cyan-500" />
              Physical Exam Profile
            </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!selectedRegion ? (
            <div className="text-center text-slate-500 mt-10">
              <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm px-4">
                Click a region on the avatar to perform a focused physical assessment (e.g., auscultate lungs, palpate abdomen).
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h4 className="text-lg font-serif font-bold text-slate-100 border-b border-slate-800 pb-2 mb-4">
                {anatomicalRegions.find((r) => r.id === selectedRegion)?.label}
              </h4>
              
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-300 text-sm shadow-inner relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>
                <h5 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-500" />
                  Clinical Finding
                </h5>
                <p className="font-mono leading-relaxed tracking-tight">
                  <ChevronRight className="w-4 h-4 inline text-cyan-500/50" />
                  {getClinicalFinding(selectedRegion)}
                </p>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
