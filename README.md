# Medic 138

## Description
Medic 138 is an interactive EMS education platform built for real‑world pattern recognition and rapid decision training. The project includes a modular Skills Drills Game Engine, a Firebase‑powered analytics dashboard, and Jekyll‑based course pages. The platform focuses on clinical reasoning, high‑signal scenarios, and fast iteration for instructors and learners.

## Badges
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange)
![AI Powered](https://img.shields.io/badge/AI-Gemini-purple)

## /docs Folder Structure
```
/docs
  /getting-started
    installation.md
    repo-structure.md
  /content-authoring
    updating-datajs.md
    adding-new-games.md
  /developer
    engine-architecture.md
    dashboard-integration.md
  /instructor-tools
    progress-tracking.md
    class-management.md
  roadmap.md
  changelog.md
  faq.md
```

## Medic 138: Interactive EMS Education Platform

High-signal, scenario-based training for EMTs, paramedic students, and critical care clinicians.

Medic 138 delivers interactive, pattern-recognition-focused EMS education built for real-world use.
This repository contains the core engine that powers the platform, including the Skills Drills Game Engine, Content Hub, and the Firebase-backed Dashboard.

Our mission: teach clinicians how to think, not memorize—and how to recognize patterns when seconds matter.

## 🚑 Project Architecture Overview

Medic 138 is built on a lean, modular structure designed for fast content updates, clean scaling, and zero bloat.

File	Purpose	Key Concept
index.html	Core UI layout; loads CSS + JS assets	Frontend Entry Point
style.css	Dark-mode Medic Teal / Storm Gray theme	Brand Identity
data.js	All clinical content (scenarios, rhythms, dosing, answers)	Content Hub
games.js	Game Engine logic (GameEngine class + per-game play functions)	Core Logic
app.js	Navigation controller (menu → config → game)	Routing & State
medic138_dashboard.html	Firebase-powered user portal	Dynamic Backend

## 🛠 Installation & Setup

Medic 138 includes standalone JS modules and Jekyll-powered course pages.

1. Clone the repository
git clone [repository-url]
cd medic138

2. Run Jekyll (for lesson pages)
bundle install
bundle exec jekyll serve

3. Run interactive games and site locally

- The interactive games are static JS pages and can be opened directly in a modern browser for quick testing (open `index.html`).
- The Jekyll-powered course and lesson pages require the Ruby/Bundler toolchain. To build and serve the site locally:

```bash
bundle install
bundle exec jekyll serve
```

This will build the site and start a local dev server at `http://127.0.0.1:4000/`.

⚙️ Content & Game Configuration (data.js)

All content customization happens in data.js.

GAMES Array

Defines:

game id

title

description

icon

activation status

Add a new game → add its JSON object → add a matching case in app.js.

Clinical Scenario Objects

Examples:

oxygenScenarios

ivCalculations

rhythmRecognition

traumaScenarios

Each entry includes:

{
  "scenario": "text",
  "answer": "...",
  "difficulty": 1
}

### How to add new questions

Copy an existing object.

Update fields.

Confirm the play function in games.js uses the same expected schema.

No database. No rebuild. No backend changes required.

⚡ Skills Drills Engine Architecture

The interactive engine relies on two core components:

1. GameEngine Class (games.js)

Handles:

scoring

timers

answer checking

tolerance for medication math

shuffling

question progression

This class can support:

ABG interpretation

IV flow rate calculations

trauma MOI reasoning

EKG pattern matching

med math drills

whatever else you create

2. Launch Sequence (app.js)

When the user hits Start Game:

launchGame() reads the selected gameId.

A switch block routes to play[GameName].

A new GameEngine instance spins up.

First scenario renders.

Adding a new game

Add game data to data.js.

Create playYourGameName() in games.js.

Add the case to launchGame() in app.js.

You now have a new module.

🧭 Advanced Dashboard (Firebase + Gemini)

medic138_dashboard.html is a Firebase SPA that powers:

Feature	Tech	Purpose
User Authentication	Firebase Auth	Secure sign-in (email or anonymous token)
Progress Tracking	Firestore	Saves user progress in /artifacts/{appId}/users/{userId}
Community Huddle	Firestore	Real-time Q&A board
AI ECG Interpretation	Gemini API	“Streetwise Sage” analysis for pattern recognition drills

This makes Medic 138 a scalable hybrid LMS + simulation tool.

📦 Recommended README Additions (included below)

These are standard in strong repos:

Features list

Tech stack

Roadmap

Contribution guidelines

License

Contact / Support

All included.

🌟 Key Features

Scenario-based learning

Real-time skills drills

Medication math engine

ABG interpreter

Trauma reasoning simulations

Interactive cardiology modules

Instructor analytics (coming soon)

AI-assisted clinical reasoning

🧰 Tech Stack

Frontend:

Vanilla JS

HTML5

CSS3

Jekyll (course pages)

Backend / Services:

Firebase Auth

Firestore

Gemini API (ECG + reasoning)

GitHub Pages (static hosting)

🗺 Roadmap
Phase 1 – Core Release

 Multi-game Skills Drills engine

 Clinical Content Hub system

 Firebase login + tracking

 AI ECG interpretation

Phase 2 – Instructor Tools

 Class dashboards

 Custom game builder

 LMS export (SCORM & xAPI)

Phase 3 – Student Experience

 Streaks + XP + badges

 Leaderboards

 Adaptive difficulty AI

 Offline mode

Phase 4 – Mobile App

 Capacitor build

 Push notifications

 Learned pattern analytics

## 🤝 Contributing

Fork the repo.

Create a feature branch.

Submit a PR with clear commit messages.

Bug reports and feature suggestions are welcome.

## 📄 License

## 📬 Contact

For EMS educators, collaborators, or contract work:

Medic 138
Website: medic138.com
Email: connect@medic138.com