"use client";

import React, { useState } from "react";
import {
  PatientAssessmentData,
  AuscultationPoint,
} from "../../lib/simulation-models";
import { Stethoscope } from "lucide-react";

interface PatientAvatarProps {
  assessmentData: PatientAssessmentData;
  onAuscultate: (point: AuscultationPoint) => void;
}

export function PatientAvatar({
  assessmentData,
  onAuscultate,
}: PatientAvatarProps) {
  const [activePoint, setActivePoint] = useState<AuscultationPoint | null>(
    null,
  );

  const handlePointClick = (point: AuscultationPoint) => {
    setActivePoint(point);
    onAuscultate(point);

    // Play the audio file associated with the lung/heart sound
    if (point.soundFileUrl) {
      const audio = new Audio(point.soundFileUrl);
      audio.play().catch((e) => console.error("Audio playback failed:", e));
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-slate-100 mb-4">
        Patient Assessment (LDA Avatar)
      </h3>

      <div className="relative w-full max-w-[280px] h-[450px] bg-slate-900/60 rounded-xl border border-slate-700/80 overflow-hidden flex items-center justify-center p-2 mx-auto shadow-inner">
        {/* Full Body Anatomical Outline SVG */}
        <div className="absolute inset-2 z-0 opacity-60 mix-blend-screen pointer-events-none flex justify-center pb-4">
          <svg
            viewBox="0 0 100 220"
            className="w-full h-full text-slate-500 drop-shadow-[0_0_8px_rgba(100,116,139,0.5)]"
          >
            {/* Head */}
            <circle
              cx="50"
              cy="20"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Neck */}
            <path
              d="M 45 34 L 45 40 M 55 34 L 55 40"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Shoulders & Torso Outline */}
            <path
              d="M 45 40 L 55 40 C 75 40, 80 45, 80 50 L 75 120 C 65 130, 35 130, 25 120 L 20 50 C 20 45, 25 40, 45 40 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Arms */}
            <path
              d="M 20 50 L 10 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 80 50 L 90 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Legs */}
            <path
              d="M 30 126 L 30 200 L 40 200 L 45 130 L 55 130 L 60 200 L 70 200 L 70 126"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Internal Anatomical Landmarks (Lungs/Heart) - subtle dashed lines */}
            <path
              d="M 35 60 C 30 80, 45 95, 45 95 C 45 95, 45 70, 45 60 Z"
              fill="none"
              stroke="rgba(147,197,253,0.25)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />{" "}
            {/* Right Lung */}
            <path
              d="M 65 60 C 70 80, 55 95, 55 95 C 55 95, 55 70, 55 60 Z"
              fill="none"
              stroke="rgba(147,197,253,0.25)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />{" "}
            {/* Left Lung */}
            <circle
              cx="53"
              cy="75"
              r="5"
              fill="none"
              stroke="rgba(244,63,94,0.3)"
              strokeWidth="1"
              strokeDasharray="1 2"
            />{" "}
            {/* Heart */}
          </svg>
        </div>

        {/* Map over the interactive points provided by the scenario */}
        {assessmentData.auscultationPoints.map((point) => {
          const isSelected =
            activePoint?.anatomicalLocation === point.anatomicalLocation;

          // Map anatomical string codes to X/Y percentages on the SVG bounds
          // U = Upper, L = Lower, R = Right, L = Left for Lungs.
          // Defaulting to central chest for others.
          // Note: "Right" side of patient is "Left" side of screen.
          let top = "50%";
          let left = "50%";
          const loc = point.anatomicalLocation.toUpperCase();

          if (loc.includes("RUL")) {
            top = "30%";
            left = "37%";
          } // Right Upper Lobe
          else if (loc.includes("LUL")) {
            top = "30%";
            left = "63%";
          } // Left Upper Lobe
          else if (loc.includes("RML")) {
            top = "38%";
            left = "35%";
          } // Right Middle Lobe
          else if (loc.includes("RLL")) {
            top = "45%";
            left = "36%";
          } // Right Lower Lobe
          else if (loc.includes("LLL")) {
            top = "45%";
            left = "64%";
          } // Left Lower Lobe
          else if (loc.includes("APEX") || loc.includes("HEART")) {
            top = "37%";
            left = "55%";
          } // Heart Apex
          else if (loc.includes("NECK") || loc.includes("CAROTID")) {
            top = "18%";
            left = "45%";
          } // Neck
          else if (loc.includes("RADIAL")) {
            top = "48%";
            left = "18%";
          } // Wrist
          else if (loc.includes("FEMORAL")) {
            top = "52%";
            left = "45%";
          } // Groin

          return (
            <button
              key={point.anatomicalLocation}
              onClick={() => handlePointClick(point)}
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all shadow-lg backdrop-blur-sm z-10
                ${
                  isSelected
                    ? "bg-cyan-500/80 border-cyan-300 scale-125 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                    : "bg-slate-800/80 border-slate-500 text-slate-400 hover:bg-slate-700 hover:text-white hover:border-cyan-400/50 hover:scale-110"
                }`}
              style={{ top, left, transform: "translate(-50%, -50%)" }}
              aria-label={`Auscultate ${point.anatomicalLocation}`}
            >
              <Stethoscope className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      <div className="w-full mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700 min-h-24">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Auscultation Findings
        </span>
        {activePoint ? (
          <p className="text-blue-300 font-medium mt-1">
            {activePoint.correctFindingText}
          </p>
        ) : (
          <p className="text-slate-500 mt-1 italic">
            Click an anatomical point (RUL, LLL, etc.) to listen...
          </p>
        )}
      </div>

      {assessmentData.visualFindings.length > 0 && (
        <div className="w-full mt-2 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Visual Inspection Findings
          </span>
          <ul className="mt-2 space-y-1">
            {assessmentData.visualFindings.map((finding, idx) => (
              <li key={idx} className="text-slate-200 flex items-start">
                <span className="text-amber-500 mr-2">•</span> {finding}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
