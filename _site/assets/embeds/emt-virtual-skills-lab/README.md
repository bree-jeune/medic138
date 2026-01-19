# EMT Skills Lab - AI Training Simulator v4.6

A production-grade EMT training simulation platform powered by Google Gemini's vision and audio capabilities. Features real-time feedback, scenario chaining, environmental distractions, and AI-powered performance assessment.

## ✨ Features

- **Real-time Vision Analysis**: Gemini analyzes your hand positions and technique live
- **Scenario Chaining**: Multi-phase scenarios that progress from trauma to medical complications
- **Environmental Distractions**: Simulated sirens, radio chatter, equipment failures (based on level)
- **Lighting Control**: Adjustable scene lighting to simulate low-light conditions
- **Voice Coaching**: TTS feedback speaks corrections as you practice
- **Performance Tracking**: Historical progress charts and session analytics
- **Instructor Dashboard**: Aggregate performance metrics for educators

---

## 🎨 Design System

This project uses a strict design system for visual consistency.

### Color Tokens

```css
/* Surfaces */
--surface-void: #050506      /* Page background */
--surface-base: #0A0A0C      /* Cards */
--surface-raised: #101012    /* Elevated elements */

/* Accents */
--accent-blood: #4c211c      /* Primary actions */
--accent-clay: #6c4a48       /* Secondary accent */
--accent-void: #2d1614       /* Subtle backgrounds */

/* Text */
--text-primary: #FFFFFF
--text-secondary: #A1A1AA
--text-tertiary: #71717A
--text-muted: #52525B
```

### Border Radius (8px grid)

| Class | Size | Usage |
|-------|------|-------|
| `radius-6` | 6px | Tags, small elements |
| `radius-8` | 8px | Inputs, small buttons |
| `radius-12` | 12px | Buttons |
| `radius-16` | 16px | Cards |
| `radius-24` | 24px | Panels |
| `radius-32` | 32px | Large containers |
| `radius-full` | 9999px | Pills, avatars |

### Typography

| Font | Usage |
|------|-------|
| **Syne** | Display headings (`.heading-tactical`) |
| **Hanken Grotesk** | Body text |
| **JetBrains Mono** | Data, timestamps (`.mono`) |

---

## 🤖 AI Prompting Guide

When using Google AI Studio to generate or modify UI components, use this system instruction:

```markdown
You are a senior UI designer working on a tactical medical training app.

DESIGN CONSTRAINTS:
- Dark theme using surface colors: #050506, #0A0A0C, #101012
- Accent: #4c211c (blood red), #6c4a48 (clay)
- Text: #FFFFFF (primary), #A1A1AA (secondary), #71717A (tertiary)
- Fonts: Syne (headings), Hanken Grotesk (body), JetBrains Mono (data)
- Spacing: 8px grid (4, 8, 12, 16, 24, 32, 48px)
- Border radius: Only use radius-6, radius-8, radius-12, radius-16, radius-24, radius-32

COMPONENT PATTERNS:
- Cards: `card` class (bg-surface-base, border-zinc-800/50, radius-24, p-6)
- Buttons: `btn btn-primary` or `btn btn-secondary` 
- Labels: `label` class (text-[10px], uppercase, tracking-wider, text-zinc-500)
- Glass effect: `glass` class for overlays

CSS UTILITIES TO USE:
- `.heading-tactical` for uppercase Syne headings
- `.mono` for monospace data
- `.card-reveal` for entrance animations
- `.accent-glow` for blood-red glow effect

NEVER:
- Use arbitrary Tailwind values like rounded-[28px]
- Use text smaller than 10px
- Use colors outside the defined palette
- Mix inconsistent spacing values
```

### Example Prompts

**Creating new components:**
```
Create a timer component for tracking CPR compression rate.
It should show:
- Current compressions per minute (large number)
- Target range indicator (100-120 CPM)
- Visual metronome pulse
- Status badge (Too Slow / Good / Too Fast)

Use the tactical medical design system.
```

**Improving existing components:**
```
Review this component for design system consistency:
[paste code]

Check:
1. Are border-radius values using the radius-X classes?
2. Is spacing following the 8px grid?
3. Are colors from the design tokens?
4. Are focus states properly implemented?
```

---

## 📁 Project Structure

```
emt-skills-lab-ai/
├── App.tsx                 # Main application
├── design-tokens.css       # CSS design system
├── index.html              # Entry point
├── types.ts                # TypeScript interfaces
├── constants.ts            # Skills & system prompts
├── components/
│   ├── FeedbackDisplay.tsx   # Real-time & debrief feedback
│   ├── HandPositionOverlay.tsx # Vision position guides
│   ├── HistoryChart.tsx      # Performance graph
│   ├── InstructorDashboard.tsx # Analytics
│   ├── ScenarioCard.tsx      # Patient scenario
│   ├── SkillChecklist.tsx    # Criteria tracking
│   ├── SkillSelector.tsx     # Skill picker
│   └── UserAuth.tsx          # Login
└── services/
    └── geminiService.ts      # Gemini API
```

---

## 🚀 Getting Started

1. Set your Gemini API key in `.env.local`:
   ```
   API_KEY=your_gemini_api_key
   ```

2. Run the development server:
   ```bash
   npm install
   npm run dev
   ```

---

## 🎯 Training Levels

| Level | Features |
|-------|----------|
| **Beginner** | Clear guidance, no distractions |
| **Intermediate** | Ambient noise (sirens, dogs, radio) |
| **Advanced** | Equipment failures, bystander interference, telemetry loss |

---

## 📝 Scenario Chaining

Scenarios now support multi-phase progression:

1. **Phase 1**: Initial trauma presentation
2. **Phase 2**: Clinical deterioration (shock, respiratory failure)
3. **Phase 3+**: Continued complications requiring new skills

The AI generates contextually-aware follow-up scenarios based on previous events.

---

## License

MIT
