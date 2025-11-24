---
layout: course
title: Medical Emergencies
permalink: /courses/medical-emergencies/
level: Advanced
topic: Medical · Critical Care
duration: 4–6 hours
tabbed: true

modules:
  - id: overview
    label: Overview
  - id: respiratory
    label: Respiratory
  - id: neuro
    label: Neuro
  - id: endocrine
    label: Endocrine/Metabolic
  - id: infectious
    label: Infectious & Sepsis
  - id: renal
    label: Renal
  - id: electrolytes
    label: Electrolytes
---

<div class="course-tabs" data-default="overview" data-course-key="{{ page.url }}">

  <nav class="course-tabs__nav">
    {% for mod in page.modules %}
      <button
        class="course-tabs__tab"
        type="button"
        data-target="{{ mod.id }}">
        {{ mod.label }}
      </button>
    {% endfor %}
  </nav>

  <section class="course-tabs__panels">

    <div id="overview" class="course-tabs__panel">
      <!-- High-level course intro, how to use, recommended order -->
      {{ page.overview | markdownify }}
    </div>

    <div id="respiratory" class="course-tabs__panel">
      {{ page.respiratory | markdownify }}
    </div>

    <div id="neuro" class="course-tabs__panel">
      {{ page.neuro | markdownify }}
    </div>

    <div id="endocrine" class="course-tabs__panel">
      {{ page.endocrine | markdownify }}
    </div>

    <div id="infectious" class="course-tabs__panel">
      {{ page.infectious | markdownify }}
    </div>

    <div id="renal" class="course-tabs__panel">
      {{ page.renal | markdownify }}
    </div>

    <div id="electrolytes" class="course-tabs__panel">
      {{ page.electrolytes | markdownify }}
    </div>

  </section>
</div>

overview: |
  ## How This Course Works
  - Work through each tab in order.
  - Warm-up scenarios, explanation, practice cases, reflection.
  - Use this with your Medic 138 lab and protocol review.

  ## Course Structure

- **Core Modules** (each as a separate lesson):

1. Cardiac Emergencies
2. Respiratory Emergencies
3. Neurologic Emergencies
4. Endocrine \& Metabolic Emergencies
5. Infectious \& Sepsis Emergencies
6. Renal \& Electrolyte Emergencies
7. GI \& Hepatic Emergencies
8. Hematologic \& Immunologic Emergencies
9. Toxicologic Emergencies and Overdose
10. Environmental \& Temperature-related
11. Pediatric-Specific Medical Emergencies
12. Geriatric-Specific Medical Emergencies
13. OB-GYN Medical Emergencies (excluding trauma)
14. Syncope, Shock, and Collapse: Differential \& Approach
15. “Unknown/Generalized” Medical Collapse

general: |
## Overview of Medical Emergencies
# Medical Emergencies: Deep-Dive Recognition \& Management

**Level:** Advanced
**Topic:** Multi-system · Emergency Medicine · Critical \& Flight Care
**Duration:** Comprehensive deep dive

***

## Arrival Scenario

You’re paged for a hospital transfer: "55M, ‘crashing’ chest pain, SOB, confused, BP dropping. Maybe ACS, maybe sepsis, maybe something worse. What’s your first move? What’s your pattern and what are the likely pitfalls if you fixate too soon?"

***

## Warm-Up Questions

1. What’s your process for differentiating cardiac vs. respiratory distress in minutes?
2. Which vital sign trend makes you suspect shock—even before hypotension sets in?
3. Name two findings that always prompt immediate escalation to higher level care.
4. How can you quickly distinguish between stroke, tox, and metabolic crisis?
5. Which medical emergency do most crews underestimate on scene, and why?

***

## Optional Tally Embed

*Insert Tally onboarding/knowledge check placeholder here.*

***

## Explanation / Breakdown

### **I. Cardiac Emergencies**

- **ACS (Acute Coronary Syndrome):**
    - ST elevation, chest pain, diaphoresis
    - High-risk mimics: pericarditis, dissection, electrolyte disturbance
- **Arrhythmias:**
    - SVT, VT, VF, bradycardia – rapid pattern recognition, pulse check, defib use, antiarrhythmic algorithms
- **Shock States:**
    - Cardiogenic, obstructive, distributive, hypovolemic.
    - MAP <65, altered mental status, rising lactate, skin findings.
- **Heart Failure/Pulmonary Edema:**
    - Dyspnea, crackles, leg edema, pink frothy sputum, rapid BP shifts.


### **II. Neurologic Emergencies**

- **Stroke/TIA:**
    - Sudden neuro deficit, facial droop, arm drift, speech change.
    - BE-FAST pattern, rule out hypoglycemia.
- **Seizure/Status Epilepticus:**
    - Recurrent/unremitting tonic-clonic or focal activity—ABC, glucose, benzos, airway management.
- **Encephalopathy/Delirium:**
    - Sudden confusion, agitation—rule out infection, metabolic, structural brain injury.


### **III. Respiratory Emergencies**

- **Acute Asthma/COPD Exacerbation:**
    - Wheeze, accessory muscle use, tripod, silent chest
- **Pneumothorax/Bronchospasm:**
    - Sudden chest pain, dyspnea, diminished breath sounds, crepitus.
- **Hypoxemic/Hypercapnic Respiratory Failure:**
    - Pulse ox <90% on O₂, rising ETCO₂, confusion, lethargy.


### **IV. Metabolic \& Toxicologic Emergencies**

- **DKA/HHS:**
    - Polyuria, polydipsia, Kussmaul breathing, fruity breath, confusion.
- **Hypoglycemia:**
    - AMS, diaphoresis, seizure-like activity—check glucose!
- **Electrolyte crisis:**
    - Hyperkalemia: peaked T waves, arrhythmia risk.
    - HypoCa/Mg/Na: seizure, tetany, neuro changes.
- **Overdoses/Poisonings:**
    - Opiates: pinpoint pupils, apnea.
    - Stimulants: hyperactivity, tachycardia, agitation.
    - Cholinergic/anticholinergic, TCA toxicity: special ECG findings, unique syndrome patterns.


### **V. Infectious Emergencies**

- **Sepsis:**
    - Fever, tachycardia, hypotension, altered mental status, high lactate.
- **Meningitis:**
    - Fever, nuchal rigidity, photophobia, AMS.
- **Other:**
    - Rapid onset shock, organ failure, rash, pus, drainage, or abscess.


### **VI. GI and Renal Emergencies**

- **GI Bleed:**
    - Melena, hematemesis, tachycardia, hypotension (late).
- **Acute Abdomen:**
    - Distension, rebound, guarding, referred pain.
- **Renal failure/Fluids/Acid-Base:**
    - Oliguria, electrolyte change, acidotic labs, AMS.


### **VII. Hematologic \& Immunologic**

- **Anaphylaxis:**
    - Sudden wheezing, hypotension, urticaria, facial swelling—IM epi is first line.
- **Acute anemia, sickle crisis, thrombocytopenia:**
    - AMS, tachycardia, pallor, bleeding/bruising.

> **Pattern Recognition:** Always compare the “chief complaint” to the most lethal mimic (e.g., chest pain is ACS, PE, aortic dissection, tension pneumo, tox, GI, neuro).

***

## Common Mistakes

- Anchoring on initial diagnosis, missing mimics (e.g., calling every AMS “stroke” or every chest pain “ACS”).
- Underestimating early shock (compensatory tachycardia can precede hypotension).
- Missing airway compromise—late intervention increases risk.
- Overdosing oxygen in certain COPDers, under-monitoring ETCO₂ in others.
- Failing to recheck glucose after initial correction.

***

## Clinical Pearls

- **Assess patterns, not just findings:** A “worried look” and unstable vitals trump numbers.
- **Shock is more about mental status and perfusion than BP.**
- **Reassess, reassess, reassess:** Patterns evolve—make every 10-min check a micro-mental review.
- **When in doubt, treat the worst-case mimic until proven otherwise.**
- **Early push-dose pressors (if permitted) can buy time in crash hypotension.**
- “If it feels wrong, it probably is”—trust your field sense, bring in help early.

***

## Decision Trees

**Medical Emergency Algorithm (Protocol-Agnostic):**

1. **Initial Assessment – “Sick or Not Sick”:**
    - Altered, unstable, or toxic? → Go to resus, activate help.
    - Stable? → R/O mimics, begin focused pattern-check.
2. **ABCs First:**
    - Airway: Obstructed, threatened, compromised? → Secure airway
    - Breathing: Hypoxic? → Oxygen as needed, monitor, support
    - Circulation: Shock or perfusion deficit? → IV/IO access, fluids, pressors, labs
3. **Focused System Drill:**
    - Chest pain? → ECG, nitro if appropriate, O₂, rule out lethal causes
    - AMS? → Glucose, O₂, toxicology, neuro screen, treat as worst-case until better
    - Dyspnea? → Bilateral breath sounds, history, consider pneumothorax, PE, CHF, airway issue
    - Fever/signs infection? → Blood cultures, early antibiotics, fluids, repeat checks
4. **Recheck at every change:**
    - Neuro/resp/Cardiac worsen? → Escalate, modify plan, consider specialty input.
    - Stabilize or improve? → Prep for hand-off, document timeline, monitor closely.
5. **If worsening, restart at step 1—fresh lens, new differential.**

***

## Practice Cases

### Case 1: STEMI vs. Mimic

- 60M, chest pain, SOB. ECG: ST elevation V2-V4.
Timeline: 0min—call received, 8min—first ECG, 15min—pain worsens.
Vitals: HR 88, BP 110/64, SpO₂ 99%, RR 18.
*Troponin negative, pain severe.*
> What’s your next confirmatory test? What’s the mimic you’re ruling out?


### Case 2: AMS Mystery

- 45F, confused, slurred speech.
Timeline: 0min—scene arrival, 5min—glucose 88, 10min—worsens.
Vitals: HR 112, BP 136/84, RR 23, SpO₂ 97%, Temp 37.8°C.
> What two labs will you check next? Most likely cause?


### Case 3: ‘Silent’ Sepsis

- 70M, fever, chills, slightly low BP.
Timeline: 0min—arrival, 12min—BP 94/62, lactate 3.2, mentation normal.
Vitals: HR 124, BP 88/58, SpO₂ 94%, Temp 39.5°C.
> What’s your risk if you delay fluids and antibiotics? Which findings are “red flags”?


### Case 4: Sudden Dyspnea + Hypotension

- 28F, PEA arrest after standing, “normal” chest x-ray.
Timeline: 0min—collapse, 3min—ALS in progress, 8min—POC echo: RV dilated.
Vitals: PEA, no pulse, SpO₂ undetectable.
> Diagnosis? Life-saving maneuver?


### Case 5: Hyperkalemia ECG

- 52M, ESRD, missed dialysis.
Timeline: 0min—report, 13min—found unresponsive, ECG peaked T, wide QRS.
Vitals: HR 54, BP 144/82, SpO₂ 97%, Temp 36.7°C.
> Next three treatments to prevent arrest?


### Case 6: Pediatric Seizure

- 7F, tonic-clonic, not waking up.
Timeline: 0min—call, 6min—midazolam given, 14min—no improvement.
Vitals: HR 128, BP 92/58, SpO₂ 92%, Temp 38.0°C.
> What do you do next? What workup is mandatory in transport?

***

## Reflection

**Structured Reflection Questions:**

- Which system-based emergencies do you feel most and least confident with?
- Can you recall a call where a shift in “pattern” completely changed your management?
- If you’re unsure whether a medical emergency is cardiac, respiratory, or neuro, what’s your “go-to” first diagnostic step?
- How will you handle a scene where multiple emergencies present at once?


respiratory: |
  ## Respiratory Emergencies
  # Respiratory Emergencies

**Level:** Advanced
**Topic:** Airway \& Breathing · Critical Care · EMS/Flight
**Duration:** Deep Dive

***

## Arrival Scenario

Dispatch: 45F, “difficulty breathing.” On arrival—tripod position, audible wheezing, SpO₂ 86% on room air, speaking in two-word sentences. The family says she’s had a cold and now “can’t catch her breath.”
Your mental checklist: Is this asthma, COPD, CHF, PE, airway obstruction, or something else altogether? What’s your first move to stabilize—and what early pattern triggers immediate escalation?

***

## Warm-Up Questions

1. What are the red-flag signs of “immediate threat” in respiratory distress?
2. Which breath sound patterns cue you to the underlying emergency?
3. How do you decide between CPAP, BVM, or intubation before even touching equipment?
4. How can skin signs help you differentiate hypoxemia from shock?
5. When should you NOT give high-flow oxygen?

***

## Optional Tally Embed

*Insert Tally onboarding/knowledge check placeholder here.*

***

## Explanation / Breakdown

### Rapid Pattern Recognition

- **Listen:** Wheezing (asthma/COPD), crackles (CHF/edema), stridor (upper airway), silence (severe obstruction), rhonchi (secretions).[^1][^7]
- **Inspect:** Tripoding, retractions, nasal flaring, cyanosis, AMS, silent chest, access muscle use.
- **Palpate:** Unequal expansion, crepitus, subcutaneous emphysema.[^1]
- **Monitor:** SpO₂, ETCO₂ (if available), respiratory rate/depth/pattern, work of breathing (WOB).[^5]


### Key Emergencies \& Their Field Patterns

| Condition | Typical Pattern | Priority Interventions |
| :-- | :-- | :-- |
| **Asthma/COPD** | Wheeze, two-word sentences, silent chest as warning | Nebs, steroids, CPAP, intubate if failing |
| **CHF/Pulmonary Edema** | Crackles, dyspnea, frothy sputum, high BP, pedal edema | O₂, nitro, CPAP, diuretic route (ED/facility) |
| **Pneumonia** | Fever, cough, rhonchi/crackles, AMS | O₂, monitor, mask, HOB up, rapid transport |
| **Pneumothorax** | Unilateral diminished sounds, tracheal shift | Needle decompression, O₂, rapid transport |
| **Anaphylaxis** | Stridor, wheeze, facial swelling, urticaria | IM epi, O₂, airway adjuncts, prep for intubation |
| **PE** | Sudden dyspnea, clear lungs, chest pain, tachycardia | O₂, monitor, rapid transport, consider lytics (ED) |
| **Obstruction** | Stridor, inability to speak, cough, silence | Heimlich, suction, advanced airway if needed |


***

## Common Mistakes

- **Ignoring silent chest:** True respiratory arrest may be seconds away.
- **Anchoring on “asthma” or “COPD” and missing CHF or PE in older patients.
- **Delaying airway intervention until patient unresponsive.
- **Not reassessing sounds or WOB—patterns shift quickly.
- **Overventilating with BVM (gastric distension, worsened hypoventilation).

***

## Clinical Pearls

- **Tripod = severe distress.** Any patient upright, leaning forward deserves immediate advanced airway prep.
- **CPAP is your friend for CHF and severe asthma/COPD—often reverses distress better than drugs.
- If patient is speaking in one-word sentences or losing ability to talk: Prepare to intubate.
- **Stridor = upper airway threat.** Don’t wait—IM/IV epi and advanced airway.
- Wheezing doesn’t always mean asthma—CHF, PE, anaphylaxis, airway burns all mimic.

***

## Decision Trees

**Protocol-Agnostic Field Algorithm:**

1. **Is the airway open \& protected?**
    - If no → Immediate airway management (OPA/NPA, suction, prep for RSI)
    - If yes → Move to breathing assessment
2. **Work of Breathing/WOB Severe?**
    - Yes → CPAP, BVM if hypoventilating, prep for advanced airway
    - No → O₂ titrate to target, monitor, reassess
3. **Pattern Identification:**
    - Wheeze → Nebs/steroids, monitor for impending arrest
    - Crackles → CHF/edema: O₂, nitro, CPAP
    - Stridor → Anaphylaxis/obstruction: Epi, airway adjunct, rapid escalation
    - Silent chest → Immediate airway support, prep for arrest
4. **Recheck at every change.**
    - If worsening: Escalate, advanced airway, consider rapid transport

***

## Practice Cases

### Case 1: Asthma Exacerbation

- 17F, wheezing, unable to complete sentences, SpO₂ 87% on 4L NC.
- Timeline: 0min—callout, 6min—first nebs, 10min—fatigue, silent chest.
- Vitals: HR 148, BP 128/80, RR 36, Temp 37.2°C.
> Is she failing? What’s your next step?


### Case 2: CHF Flash Pulmonary Edema

- 74M, acute dyspnea sitting up, pink frothy sputum, crackles.
- Timeline: 0min—arrival, 4min—CPAP started, 8min—mental status improves.
- Vitals: HR 104, BP 168/96, RR 32, SpO₂ 88% improving.
> Why does CPAP help—and what else matters here?


### Case 3: Anaphylaxis with Stridor

- 22F, bee sting, facial swelling, voice change, stridor audible.
- Timeline: 0min—on scene, 4min—IM epi, 8min—prep airway.
- Vitals: HR 124, BP 92/62, RR 26, SpO₂ 94%.
> Ventilation priorities? What airway equipment for backup?


### Case 4: Suspected PE

- 59F, SOB, chest pain, lungs clear, tachycardic.
- Timeline: 0min—arrival, 5min—EKG sinus tach, 10min—drop in SpO₂.
- Vitals: HR 112, BP 130/72, RR 24, SpO₂ 89%.
> What makes PE diagnosis challenging? Key supportive actions?


### Case 5: Pediatric Foreign Body Obstruction

- 3M, cyanotic, gagging, stridor, unable to speak.
- Timeline: 0min—arrival, 3min—<1min Heimlich, airway clears.
- Vitals: HR 150, BP 84/p, RR 0, SpO₂ undetectable, then rises.
> What’s your post-obstruction monitoring plan?


### Case 6: COPD “Crash”

- 67M, severe SOB, home O₂, Tripoding, SpO₂ 79% on home O₂.
- Timeline: 0min—scene, 3min—CPAP, 7min—mental status compromise.
- Vitals: HR 94, BP 110/68, RR 40, Temp 36.2°C.
> Why not intubate right away? When do you escalate?

***

## Reflection Placeholder

**Structured Reflection Questions:**

- Recall a patient where your initial impression changed after airway/breathing reassessment. How did your approach change?
- Which breath sound patterns do you need to practice recognizing under stress?
- How will you actively monitor for changes during each 10-minute block of respiratory emergencies?
- What’s your backup airway plan if your first attempt fails in the field?


neuro: |
  ## Neuro Emergencies
  # Neurologic Emergencies

**Level:** Advanced
**Topic:** Neurology · Critical Care · EMS/Flight
**Duration:** Deep Dive

***

## Arrival Scenario

You're paged for a hospital transfer: “72F, sudden altered mental status, right-sided weakness. CT pending, BG normal. Family says she was well until one hour ago.”
Your checklist: Is this ischemic stroke, hemorrhagic stroke, seizure, infection, metabolic?
**With neuro emergencies, minutes matter — how do you rule in or out patterns, and what’s your first safest intervention?**

***

## Warm-Up Questions

1. What are the “big three” neurologic emergencies where seconds save brain?
2. What pattern flags a stroke versus a seizure?
3. What’s the quickest way to rule out common stroke mimics?
4. How can airway and breathing be at risk in neuro cases, even without trauma?
5. When do you always activate a “stroke code”?

***

## Optional Tally Embed

*Insert Tally knowledge check placeholder here.*

***

## Explanation / Breakdown

### High-Impact Neurologic Emergencies

- **Ischemic Stroke** (most common)[^5][^1]
    - Sudden focal deficit: weakness, speech changes, vision loss, facial droop
    - *“Last seen normal” is your clock — activate stroke code fast*
- **Hemorrhagic Stroke**
    - Sudden severe headache (“worst ever”), AMS, vomiting, rapid deterioration, often hypertension
- **Seizure/Status Epilepticus**
    - Recurrent shaking, confusion, inability to respond, post-ictal
    - Any seizure >5 min → treat as status
- **Metabolic/Toxic Encephalopathy**
    - Sudden AMS, confusion, agitation, tremor, or coma — BG, Na, drug ingestion, sepsis must be ruled in/out
- **Infection (CNS)**
    - Fever, AMS, nuchal rigidity, photophobia, seizure — think meningitis or encephalitis[^5]
- **Acute Spinal Cord Disease**
    - Sudden paralysis, loss of sensation/power below a level


### Field Pattern Recognition

- “BE-FAST” for stroke: Balance, Eyes, Face, Arm, Speech, Time
- AMS, lateralizing signs, abrupt loss of function
- Seizure: Unresponsive, rhythmic movement, tongue bite, incontinence, postictal confusion
- Encephalopathy: fluctuating consciousness, asterixis, tremor, abnormal movements

> *Most field neuro emergencies are stroke (ischemic/hemorrhagic), seizure, toxic/metabolic, CNS infection, or acute cord.*

***

## Common Mistakes

- Delaying CT or stroke activation while “waiting for labs.”
- Missing hypoglycemia or drug as stroke mimic (always check BG).
- Over-prioritizing headache without neuro deficit (“worst headache” is always emergency).
- Forgetting to reassess airway/breathing with deteriorating GCS.
- Underestimating seizure risk — postictal state isn’t “back to normal.”

***

## Clinical Pearls

- Get “last seen normal” time for every neuro call — it’s the clock for tPA, EVT, prognosis.
- Any first seizure in an adult = field activation of rapid transport and imaging, not just benzos.
- In neuro emergencies, ABCs come before focused neuro — hypoxia/hypercapnia worsen outcome.
- Stroke mimics: hypoglycemia, drugs/alcohol, infection, migraine, vestibular, post-ictal.
- Always reassess GCS and lateralizing signs at every time block (10–15 min).

***

## Decision Trees

**Protocol-Agnostic Neuro Algorithm:**

1. **ABCs \& Quick BG**
    - If airway/breathing unstable → manage first
    - If BG abnormal → correct immediately
2. **Sudden Focal Deficit or AMS?**
    - Yes → Stroke code, rapid CT (if available), “last seen normal” tracked
    - No → Search for seizure activity, infection, tox/metabolic, spine signs
3. **Seizure >5 min or repeated?**
    - Yes → Benzos IV/IM, airway management, rapid transport
    - No → Mark post-ictal, detailed recheck, monitor closely
4. **Infection suspected (fever, stiff neck, AMS)?**
    - Yes → Early antibiotics (per protocol), supportive care, seizure ready
    - No → Full neuro exam, timeline review
5. **Spinal cord red flags?**
    - Sudden paralysis/paresthesia—immobilize, neuro checks, rapid transfer

***

## Practice Cases

### Case 1: Sudden Left-Sided Weakness

- 67F, abrupt left arm, face droop, slurred speech. BG 108.
- Timeline: 0min—onset, 15min—EMS arrival, 20min—CT pending.
- Vitals: HR 88, BP 142/86, RR 18, SpO₂ 97%.
> What is most likely? What’s your checklist?


### Case 2: Status Epilepticus

- 43M, multiple GM seizures, not regaining consciousness.
- Timeline: 0min—first seizure, 5min—second, 8min—GCS 4, still seizing.
- Vitals: HR 120, BP 136/78, RR agonal, SpO₂ 92%.
> What's your intervention priority? What adverse patterns to monitor?


### Case 3: AMS + Fever

- 31M, confusion, fever, neck stiffness, recent travel.
- Timeline: 0min—ED, 6min—mental status drops, 10min—HR climbs.
- Vitals: HR 118, BP 114/76, RR 22, SpO₂ 95%, Temp 39.8°C
> What’s your leading diagnosis? Immediate treatments?


### Case 4: Post-Ictal Confusion

- 24F, witnessed convulsion, now confused, not following commands.
- Timeline: 0min—call, 8min—arrival, 16min—no return to baseline.
- Vitals: HR 104, BP 128/80, RR 20, SpO₂ 98%.
> Any danger signs? Monitoring plan?


### Case 5: Hyperacute Headache

- 55M, “worst headache,” vomiting, photophobia, BP 180/102.
- Timeline: 0min—onset, 12min—rapid AMS.
- Vitals: HR 92, BP 180/102, RR 16, SpO₂ 98%.
> Why is fast imaging critical? What must you avoid at scene?


### Case 6: Sudden Spine Syndrome

- 52F, abrupt leg paralysis after minor fall.
- Timeline: 0min—fall, 6min—can’t move legs, 9min—urinary retention.
- Vitals: HR 100, BP 124/82, RR 14, SpO₂ 99%.
> Spinal code: what’s required, and what “worsens” management?

***

## Reflection Placeholder

**Structured Reflection Questions:**

- Which neuro findings do you struggle with diagnosing under pressure—how will you drill them?
- Recall a case where your neuro exam changed the entire transport outcome. What tipped you off?
- How do you rapidly rule in/out stroke mimics when a CT isn’t available?
- What is your stepwise approach for neuro emergencies if the scene rapidly evolves?


endocrine: |
  ## Endocrine & Metabolic Emergencies
  # Endocrine \& Metabolic Emergencies

**Level:** Advanced
**Topic:** Endocrinology · Metabolic · Critical Care · Flight/EMS
**Duration:** Deep Dive

***

## Arrival Scenario

You’re called for an unconscious 19F: “History of diabetes. Warm, rapid pulse. Fruity breath. Kussmaul breathing. BP drooping. Friend says she’s ‘run out of insulin’.”
Before the labs even result, your field brain should light up: Is this DKA, HHS, adrenal crisis, sepsis, thyroid storm, or something less obvious?
What do you treat now—and what will kill her in the next fifteen minutes?

***

## Warm-Up Questions

1. What’s the single most dangerous metabolic derangement in DKA/HHS?
2. How do you distinguish myxedema coma from hypoglycemic coma in the field?
3. Which “low” lab has the highest risk of cardiac arrest in the next hour?
4. When should you always consider adrenal crisis as the primary emergency?
5. Which emergency is the hardest to reverse without immediate field intervention?

***

## Optional Tally Embed

*Insert Tally quiz placeholder here.*

***

## Explanation / Breakdown

### High-Risk Endocrine \& Metabolic Emergencies

| Condition | Pattern \& Red Flags | Rapid Field Priorities |
| :-- | :-- | :-- |
| **DKA/HHS** | Vomiting, dehydration, AMS, Kussmaul respiration, fruity breath, hypotension, tachycardia, often sepsis trigger[^4][^9] | ABCs, IV fluids, monitor K+, rapid insulin only in-hospital, identify infection trigger |
| **Thyroid Storm** | Tachycardia, fever, AMS, agitated, sweating, wide pulse pressure[^6] | ABCs, cooling, beta-blocker (ED), supportive, glucose check |
| **Myxedema Coma** | Hypothermia, bradycardia, AMS/coma, hypotension, dry skin, slow reflexes[^5] | ABCs, high-flow O₂, passive rewarming, avoid sedatives/narcotics, rapid transport |
| **Adrenal Crisis** | Hypotension/shock, vomiting, abdominal/flank pain, severe weakness, hyperkalemia, hypoglycemia, history of steroids[^7] | Immediate fluids (20 mL/kg NS), glucose, early steroids if Rx kit present |
| **Hypoglycemia** | AMS, diaphoresis, seizure, focal neuro signs, “not acting right” | Check glucose! Dextrose/Glucagon as needed, re-check every 10–15 min |
| **Metabolic Acidosis/Electrolyte** | Rapid breathing, arrhythmia, EKG changes, syncope, seizure | Identify/treat underlying cause, correct key derangements in hospital |
| **Inborn Errors (esp. peds)** | Failure to thrive, vomiting, lethargy, seizures, acidosis, hypoglycemia[^3] | Glucose admin, ABCs, rapid transport, avoid protein feeds in crisis |

> **Rapid Recognition:**
> - Always check glucose in any “altered” or “seizure” pt, regardless of history.
> - DKA/HHS often present as “sepsis” in the field—look for dehydration, rapid or slow breathing, and known diabetes.

***

## Common Mistakes

- Missing hypokalemia/hyperkalemia risks during DKA resuscitation—watch the EKG.
- Forgetting hypoglycemia as a stroke/AMS/seizure mimic.
- Waiting for the hospital before volume replacement in adrenal crisis, DKA, or severe dehydration.
- Overusing sedatives or warming in myxedema coma—risking respiratory/cardiac collapse.
- Missing inborn metabolic errors in sick infants: consider if unresponsive to usual treatment.

***

## Clinical Pearls

- **Fluids before insulin in DKA/HHS:** Initial large-volume bolus improves perfusion and reduces acidosis.[^4]
- **Passive warming only** for myxedema coma—active warming can worsen shock.[^5]
- **Adult with unexplained shock, GI Sx, or history of steroids = adrenal crisis until proven otherwise; give fluids and seek steroids rapidly.**[^7]
- **Always recheck glucose after correction.** Hypoglycemia recurs frequently if underlying problem persists.
- **Child with weak pulse, lethargy, and vomiting may have metabolic/inborn error—glucose and supportive care first, then transport.**[^3]

***

## Decision Trees

**Protocol-Agnostic, Field-First Algorithm:**

1. **Altered mental status or seizure?**
    - Check glucose
        - Low (<60 mg/dL): Dextrose/Glucagon now; recheck in 10 min
        - Normal/high: Continue down algorithm
2. **Shock (BP low, tachycardia, poor perfusion)?**
    - Rapid IV fluids (20 mL/kg NS up to 2 L adult)
    - Monitor for signs of adrenal crisis (hx steroids, severe GI Sx, known Addison’s): If “crisis kit” (hydrocortisone), use.
    - EKG for arrhythmia, K+ check if possible
3. **Hyperglycemia with dehydration/AMS?**
    - Start IV fluids rapidly (no insulin in field)
    - Watch for K+ derangement (avoid giving insulin without labs)
4. **Suspect thyroid storm or myxedema coma?**
    - Storm: Cooling, supportive airway, monitor for arrhythmia (hospital beta-blockade)
    - Myxedema: Passive rewarming, O₂, rapid transport, no narcotics
5. **Pediatric/infant metabolic error suspected?**
    - Check for hypoglycemia/metabolic acidosis/seizure
    - Glucose bolus, fluids, avoid protein feeds if inborn error
    - Early EMS consult/transport to specialty center

***

## Practice Cases

### Case 1: DKA Crash

- 19F, Type 1 DM, vomiting, Kussmaul breath, AMS, BP 80/52, HR 134.
- Timeline: 0min—call, 6min—labs glucose 620, 10min—fluid resusc started.
> What are your immediate dangers? Interventions needed before ED arrival?


### Case 2: Adrenal Crisis

- 45M, hx Addison’s, found confused, vomiting, BP 64/p, HR 148, glucose 40.
- Timeline: 0min—scene, 5min—glucose correction, 8min—IV 800 mL NS, still hypotensive.
> What do you ask about? Next best steps if no hydrocortisone on hand?


### Case 3: Thyroid Storm

- 37F, palpitations, fever, AMS, atrial fib, SBP 140s, history “thyroid.”
- Timeline: 0min—found agitated, 8min—temp 40°C, HR 180.
> Stabilization priorities? What Rx to avoid in field?


### Case 4: Myxedema Coma

- 63F, cold, puffy face, slow, bradycardic, BP 74/48, RR 10, SpO₂ 91%.
- Timeline: 0min—family call, 9min—now obtunded, GCS 8.
> Airway/vent priorities? Warming risks?


### Case 5: Pediatric Hypoglycemia

- 3M, lethargy, “not waking up,” vomiting, history “weird labs.”
- Timeline: 0min—scene, 3min—glucose 29, 5min—IV D10 given.
> What else to monitor? What metabolic errors to suspect?


### Case 6: Metabolic Acidosis/Unknown

- 50M, ESRD, found unresponsive, RR 28, K+ 7.5, wide QRS.
- Timeline: 0min—family report, 10min—BVM/airway support, 12min—ECG widened.
> Next priorities? Treatments possible in the field?

***

## Reflection Placeholder

**Structured Reflection Questions:**

- Which endocrine/metabolic pattern is most challenging for you in the field—what will you drill next?
- Share a case (real or simulation) where “routine” AMS or shock turned out to be an endocrine/metabolic crisis—what made you catch it (or miss it)?
- If you had only 2 minutes to teach a new medic core field actions for DKA, adrenal crisis, and hypoglycemia, how would you structure it?
- What’s your stepwise protocol if a patient’s vital signs aren’t improving after correcting their “number” (glucose, fluid, K+, etc.)?


infectious: |
  ## Infectious & Sepsis Emergencies
  # Infectious \& Sepsis Emergencies

**Level:** Advanced
**Topic:** Infectious Diseases · Sepsis · EMS/Critical Care
**Duration:** Deep Dive

***

## Arrival Scenario

Dispatch: "68F, febrile, altered, low BP, 'looks septic.'" On scene: flushed, tachycardic, RR 28, SpO₂ 93%, temp 39.1°C, MAP 62. Family reports “flu-like” symptoms for 3 days and confusion overnight.
**Pattern drill:** Are you facing simple infection, full-blown sepsis, or something exotic/contagious? Which actions, patterns, and timeline actually save lives in the next 20 minutes?

***

## Warm-Up Questions

1. What vital sign pattern distinguishes “routine infection” from sepsis?
2. Name three “red flag” findings that trigger sepsis treatment—even without a positive culture.
3. Which populations are at highest risk of silent sepsis or bad outcomes?
4. How does proteinuria or coagulopathy change your approach in suspected infection?
5. Why is time “to antibiotics and fluids” truly critical in sepsis, more than nearly any other condition?

***

## Optional Tally Embed

*Insert Tally knowledge check placeholder here.*

***

## Explanation / Breakdown

### Recognizing Sepsis \& Infectious Emergencies

#### What is Sepsis?

A **life-threatening organ dysfunction** from a dysregulated host response to infection. It’s not about “just” fever—it's *infection* plus unstable vital signs, perfusion failure, or confusion.[^7]

#### High-Risk Patterns

| Pattern (qSOFA) | What You See | Action Signal |
| :-- | :-- | :-- |
| Altered mental status | New confusion, inattentiveness | Always act |
| RR ≥22 | Fast or distressed breathing | Red flag |
| SBP ≤100 mmHg | Low BP, MAP < 65 | “Shock protocol” |

- **Other red flags:** Oliguria, mottled/cool skin, lactate >2, thrombocytopenia, DIC, hypoxemia, hypothermia in elderly, or rapid decompensation.


#### Most Lethal Infectious Emergencies

- **Septic shock:** Infection + hypotension requiring vasopressors, elevated lactate.
- **Meningitis/Encephalitis:** Fever, headache, nuchal rigidity, seizure, purpura, abrupt LOC change.
- **Necrotizing fasciitis/Toxic shock:** Rapid swelling/pain, tissue necrosis, sudden collapse.
- **Emerging infections** (e.g. COVID-19, SARS, Ebola): Rapid cluster cases, unusual presentations, recent travel, immunocompromised host.[^6]


#### Field Priorities

- Early broad-spectrum **antibiotics**
- Immediate, aggressive **IV fluids** (30 mL/kg crystalloid)
- Rapid ID of source (pneumonia, UTI, abdominal, line-related, skin, device)
- Check for **organ dysfunction:** confusion, hypoxemia, low U/O, high lactate
- Assess **immunocompromised risk:** elderly, cancer, transplant, HIV, steroids, pregnancy


#### Infection Surveillance/Emerging Threats (Field Awareness)

- Clusters with similar presentation, rapid decompensation, rare pathogens, or travel history—early reporting for public health triggers.[^1][^2][^6]

***

## Common Mistakes

- Underestimating silent sepsis in elderly or immunosuppressed (may present afebrile or only with confusion).
- Waiting for hypotension before acting—shock is late; treat trends.
- Missing “sepsis mimics” (DKA, PE, withdrawal, intracranial hemorrhage).
- Anchoring on “UTI” or “pneumonia” and missing other sources (abdominal, device, skin).
- Delaying antibiotics/fluids for imaging, IV lines, or “waiting for labs.”

***

## Clinical Pearls

- **A patient who looks sicker than their numbers—act, don’t doubt.**
- Elderly and neutropenic patients can be septic with normal temperature (or even hypothermic).
- Meningitis suspicion = rapid field isolation, supportive care, and alert receiving facility.
- Time to fluids + antibiotics = biggest difference in survival—initiate ASAP, document times.
- Track those on steroids or chemo—signs can be blunted, but risk is doubled.

***

## Decision Trees

**Protocol-Agnostic Infectious/Sepsis Algorithm**

1. **Suspect infection + unstable vital signs or AMS?**
    - Yes → Activate “sepsis pathway”: fluids, O₂, rapid antibiotics/notify
    - No → Monitor, reassess pattern every 10–15 minutes
2. **Shock or organ dysfunction (confusion, low U/O, O₂ sat <90, lactate >2)?**
    - Yes → Aggressive fluids (30 mL/kg), second IV, titrate O₂, prep vasopressors
    - No → Ongoing monitoring, communicate findings, initiate basic labs/cultures
3. **Source known?**
    - Yes → Treat and communicate (line, urine, chest, wound, device, etc.)
    - No → Treat empirically, escalate search (imaging, consult, facility notification)
4. **Immunocompromised or public health risk?**
    - Yes → Report cluster/suspicious findings, use PPE/isolation, notify health authorities per local protocol
    - No → Continue general practice

***

## Practice Cases

### Case 1: Classic Septic Shock

- 72M, hx DM, altered, tachy, BP 84/50, temp 38.9°C, U/O low.
- Timeline: 0min—on scene, 6min—VBG: lactate 5.1, 12min—1L fluid, AMS persists.
> What next? What makes this different than “uncomplicated infection”?


### Case 2: Meningitis Red Flag

- 19F, fever, rapid AMS, nuchal rigidity, petechiae.
- Timeline: 0min—scene, 4min—GCS 10, 10min—vomiting.
> Why is this time-critical? Infection control priorities?


### Case 3: Elderly "Urosepsis"

- 81F, baseline dementia, “just more confused,” temp 36.0°C, U/A positive nitrates, BP 108/62.
- Timeline: 0min—discovered at home, 20min—mental status worse, O₂ sat stable.
> Why is early action still necessary? Which values matter?


### Case 4: Rapidly Spreading Rash

- 36M, diabetic, rapidly spreading cellulitis, shock, “bullae” appearing.
- Timeline: 0min—arrival, 8min—BP falling, HR 136, RR 30, O₂ 91%.
> What’s highest concern? Field protocol?


### Case 5: Cluster Pneumonia

- Multiple patients in group home: fever, cough, hypoxia.
- Timeline: 0min—first call, 30min—five calls from same location.
> How does pattern shift your approach? What do you report?


### Case 6: Neutropenic Sepsis

- 58F, chemo, low-grade fever, chills, “not feeling well.”
- Timeline: 0min—scene, 10min—BP 92/58, HR 110, RR 26, O₂ 91%.
> Why is this automatically time-critical? Immediate steps?

***

## Reflection Placeholder

**Structured Reflection Questions:**

- Which sepsis/immunocompromised pattern is hardest for you to spot in the field—how will you practice it?
- Tell a call (real or simulated) where time to intervention made the biggest survival difference—what would you do differently now?
- How do you balance early empirical treatment with the risk of missing a rare or atypical infectious problem?
- What system do you use to ensure timely handoff, reporting, and documentation for infectious exposures?


renal: |
  ## Renal Emergencies
  # Renal Emergencies

**Level:** Advanced
**Topic:** Renal · AKI · ESRD · EMS/Critical Care
**Duration:** Deep Dive

***

## Arrival Scenario

Your patient: 66M, known ESRD, missed dialysis, now presenting with confusion, vomiting, pitting edema, BP 188/112, HR 108, RR 26, SpO₂ 95%. Foley drained only 20ml in the last hours. Family says he “just seemed more tired, then started acting weird.”
**As the medic:** Are you treating acute kidney injury (AKI), acute on chronic, fluid overload, hypertensive emergency, uremic encephalopathy, or a life-threatening electrolyte crisis? What patterns demand your immediate intervention, and what buys time until dialysis arrives?

***

## Warm-Up Questions

1. What are the top two immediate life threats to rule out with acute renal failure?
2. Which physical exam findings flag urgent dialysis need—even before labs are back?
3. How do you differentiate “prerenal,” “intrarenal,” and “postrenal” causes in the field?
4. What is the most dangerous cardiac trigger from missed dialysis?
5. Which patients are most likely to have oliguric or anuric AKI?

***

## Optional Tally Embed

*Insert Tally quiz placeholder here.*

***

## Explanation / Breakdown

### Rapid Field Patterns

**Acute Kidney Injury (AKI):**

- Sudden ↓ urine output (oliguria/anuria: <0.3 mL/kg/hr), ↑ creatinine/BUN
- Risk factors: volume loss, sepsis, nephrotoxin, hypertension, diabetes, trauma

**Acute on Chronic Renal Failure:**

- ESRD patient (known dialysis) with infection, missed treatment, or new “sick day” triggers
- Uremic symptoms: confusion, pericarditis (friction rub), easy bruising/bleeding, asterixis, muscle twitch, breath “smells like urine”

**ESRD Emergencies/Complications:**

- Fluid overload (pulmonary edema, CHF, hypertension crisis)
- Electrolyte crisis (see: hyperkalemia, next module)
- Uremic encephalopathy (AMS, seizure, asterixis)
- Severe acidosis (Kussmaul breathing, shock)
- Bleeding (platelet dysfunction)
- Pericarditis/pericardial tamponade
- Infection/sepsis (from dialysis access, UTI, pneumonia, skin)

**Postrenal/Obstructive:**

- Lower abdominal pain/distension, complete lack of urine, “bladder scan full” in hospital


### Field Approach: Rule Out Life-Threats First[^1][^3][^4][^5][^6][^7]

1. **Arrhythmia/Cardiac Arrest?**
    - Hyperkalemia risk: Peaked T waves, wide QRS, sine wave EKG, brady/asystole (see electrolyte module)
2. **Pulmonary Edema/Resp Failure?**
    - Severe dyspnea/rales, hypoxemia, chest pressure, pink frothy sputum—consider immediate CPAP/BiPAP and rapid dialysis consult
3. **Hypertensive Emergency?**
    - Severe BP elevation (diastolic >130 or crisis readings) with symptoms (chest pain, CNS, visual changes, flash pulm edema)
4. **Uremic Encephalopathy:**
    - AMS, tremor, confusion, seizures—dialysis indicated if severe/not explained by other causes
5. **Fluid Overload Not Responsive to Diuretics:**
    - Diuretics not reliably effective in ESRD—do not delay definitive dialysis if refractory symptoms

### Urgent Field Interventions

- Airway/ventilatory support for overload/encephalopathy
- Gentle fluid bolus if hypovolemia is suspected (but usually fluid restriction)
- Ringers Lactate preferred for initial resuscitation in AKI[^1]
- Initiate urgent dialysis consult if: Severe hyperkalemia, volume overload with respiratory compromise, refractory acidosis, severe uremic symptoms, or pericarditis[^6][^7]
- Symptomatic bleeding at dialysis/shunt site: Direct pressure, vascular/nephrology consult, avoid AVF/AVG sticks

***
**Common Medical Triggers for Renal Emergencies**

- Sepsis (25% all renal failure in ED)[^2]
- DKA/hyperglycemia (20% in-ED)[^2]
- Hypertensive emergencies (≈10% of cases)[^2]
- Toxic/drug-induced nephropathy—think contrast, NSAIDs, ACE-I/ARB combos


#### Special: Rhabdomyolysis

- Trauma, immobilization, statin, exertion
- Tea/cola urine, muscle pain, comp breakdown.
- Fluids goal: As high as 200 mL/hr if rhabdo confirmed.
***

## Common Mistakes

- Missing hyperkalemia or acidosis as urgent life threats (see Electrolyte module).
- Treating ESRD/AKI solely with diuretics—often ineffective or unsafe.
- Over-resuscitating with fluids without clear hypovolemia (risk: pulmonary edema).
- Ignoring access bleeding (AVF/AVG) until the patient is shocked.
- Relying on BP or GCS alone—look for “uremic” features and trends.
***

## Clinical Pearls

- Oliguria and hypertension are major field predictors of AKI—do not wait for labs if the patient is sick with those signs.[^2]
- Pulmonary edema in ESRD = rapid, high-risk, call for urgent dialysis.
- Uremic pericarditis: Friction rub, chest pain—risk tamponade, low threshold to consult cardiac/nephrology.
- Uremic encephalopathy: Twitch, tremor, asterixis, “metal mouth” = suspect and report.
- Missed dialysis + arrhythmia + AMS = treat as hyperkalemia until ruled out.

***

## Decision Trees

**Renal Emergency Algorithm—Field/Prehospital Focused**:

1. **Is this an ESRD/dialysis patient or acute kidney/injury pattern?**
    - Yes → Check for pulmonary edema, arrhythmia, AMS, severe hypertension or bleeding
    - No → Work up for alternative causes of shock, AMS, oliguria
2. **Airway or resp failure?**
    - Yes → Secure airway as needed, non-invasive ventilation preferred if practical, call for urgent dialysis
3. **Arrhythmia (hyperkalemia pattern, wide QRS, Sine wave)?**
    - Yes → Immediate hyperkalemia management (see electrolyte module), prep for dialysis/defib
4. **AMS or seizure unexplained?**
    - Yes → ABCs, dextrose check, suspect uremic encephalopathy, rapid transport
5. **Major bleeding (GI or at access)?**
    - Yes → Pressure, shock protocol, vascular/nephro consult, consider reversal agents
6. **Volume status:**
    - Overloaded? → O₂, NIV, restrict fluids, urgent dialysis
    - Dry/hypovolemic? → Gentle bolus (e.g., 1L RL), reassess, aim U/O >50ml/hr or >200ml/hr if rhabdo[^1]

***

## Practice Cases

### Case 1: Missed Dialysis, Pulmonary Edema

- 54F, ESRD missed two sessions, dyspnea, rales, SpO₂ 84%, on O₂.
- Timeline: 0min—arrival, 4min—CPAP, 12min—BP 186/110, ongoing distress.
> What interventions to stabilize? Dialysis timing?


### Case 2: Sudden Cardiac Collapse

- 67M, ESRD, missed dialysis, wide QRS, BP 80/60.
- Timeline: 0min—scene, 2min—found pulseless.
> Hyperkalemia pattern? What to do while awaiting dialysis?


### Case 3: Oliguric AKI in Sepsis

- 79F, fever, hypotension, U/O <10 ml/hr, creatinine rises from 0.9 → 3.8 in 24hr.
- Timeline: 0min—ICU admission, 18min—anuria.
> How do you manage fluids? What do you track?


### Case 4: Gross Access Bleed

- 62M, AVF hemorrhaging post-dialysis, hypotensive.
- Timeline: 0min—911 call, 3min—manual pressure, 7min—BP falling.
> When to escalate/suture/pressure? What mistakes to avoid?


### Case 5: Rhabdomyolysis-AKI Mix

- 32M, found after seizure, dark urine, tender thighs, lower U/O.
- Timeline: 0min—EMS finds obtunded, 25min—muscle breakdown signs.
> What fluids/protocol? What renal dangers to anticipate?


### Case 6: Uremic Encephalopathy

- 80F, confusion, twitch, “weird asterixis,” increased BUN/Cr on chart.
- Timeline: 0min—NH call, 8min—GCS 9, O₂ sat 95%, BP 140/62.
> What clinical clue made the call? Next steps on scene/transport?

***

## Reflection Placeholder

**Structured Reflection Questions:**

- Which presenting pattern makes you most likely to “miss” severe renal failure? How can you catch it earlier?
- Recall a call where missed dialysis or oliguric AKI led to rapid changes. What warning signs did you notice only in hindsight?
- How would you teach a junior medic to differentiate hypervolemia, hypovolemia, and euvolemia in a sick renal patient?
- What’s your protocol for access site management—bleeding, infection, or sudden collapse—during transport?


electrolytes: |
  ## Electrolyte Emergencies
  # Electrolyte Emergencies

Here is the complete **Electrolyte Emergencies** module, designed for Medic 138 and seamlessly building off Renal Emergencies. You’ll find field-driven pattern drills, common pitfalls, critical actions (especially for hyperkalemia), and real-world scenario cases. Clinical priorities and actionable decision-trees are mapped directly to what the streetwise medic and flight crew need—no overload, all utility.

***

# Electrolyte Emergencies

**Level:** Advanced
**Topic:** Electrolytes · Cardiac Risk · EMS/Critical Care
**Duration:** Deep Dive
*Builds on: Renal Emergencies module*

***

## Arrival Scenario

You’re intercepting an ESRD patient “not acting right.” On monitor: wide QRS, HR 48, BP 92/59. Patient had muscle cramps, some weakness, and a missed dialysis. You see the dreaded *peaked T waves*.
This is not “routine dialysis delay.” This is **hyperkalemia**—and in 10 minutes, your window to save them may close.
Which immediate steps will buy time—and what are the true “danger patterns” for every life-threatening electrolyte crisis in EMS?

***

## Warm-Up Questions

1. Which three EKG changes signal severe hyperkalemia?
2. Why doesn’t every high potassium need calcium right away?
3. How does acidosis worsen certain electrolyte emergencies?
4. What is your treatment priority: stabilizing the heart or shifting electrolytes?
5. Which meds or toxins can mimic hyper/hypokalemia on the EKG?

***

## Optional Tally Embed

*Insert Tally quiz placeholder here.*

***

## Explanation / Breakdown

### **Key Patterns: Life-Threatening Electrolyte Emergencies**

#### **Hyperkalemia (K⁺ > 6.5–7 mmol/L, or any K⁺ with EKG changes)**

- Etiology: Renal failure, missed dialysis, crush injury, DKA, ACE-I/ARB, potassium supplements
- Field Danger Patterns:
    - Muscle weakness → flaccid paralysis
    - EKG progression: Peaked T, PR prolongation, loss of P, QRS widening, sine wave, VF/VT/asystole


#### **Hypokalemia**

- Etiology: GI loss, diuretics, DKA correction, poor intake
- Field Dangers: Arrhythmias (U waves, torsades), muscle cramps, ileus


#### **Hypercalcemia**

- Etiology: Cancer, parathyroid, chronic renal, vitamin D intoxication
- Risks: Shortened QT, AMS, bradycardia, polyuria


#### **Hypocalcemia**

- Etiology: Renal failure, massive transfusion, hypoparathyroid
- Risks: Tetany, seizure, Chvostek/Trousseau signs, QT prolongation, torsades, stridor


#### **Hypermagnesemia**

- Etiology: Renal failure, eclampsia treatment
- Risks: Bradycardia, hypotension, respiratory depression, flaccid paralysis


#### **Hypomagnesemia**

- Etiology: Alcoholism, GI loss, DKA, poor intake
- Risks: Torsades, seizures, refractory ventricular arrhythmias

***

### **Field-First Priorities and Treatments (Especially Hyperkalemia)**

**Recognize “imminent arrest” patterns:**

- EKG: Peaked T, QRS > 120 ms, sine wave, slow irreg HR
- Severe muscular weakness, brady/asystole, unstable BP

**Key Actions for Hyperkalemia:**

1. **Stabilize cardiac membrane:**
    - **IV calcium chloride** (preferred for arrest; gluconate if not accessible)
        - Dose: 1g slow IV/IO push; repeat once if persistent EKG changes
        - Caution: Use large bore IV, avoid extravasation, monitor for improvement.[^1][^7]
2. **Shift potassium intracellularly:**
    - **Albuterol neb** (10–20 mg continuous),
    - **Sodium bicarb** (1 mEq/kg IV/IO for acidosis/DKA),
    - **Insulin/D50** (if protocol/medical control allows; field use limited unless ALS/critical care)
3. **Remove potassium:**
    - Not truly field-possible except through dialysis or rare use of resins
    - Initiate urgent transport for definitive care[^3][^5][^6]
4. **Monitor/Repeat:**
    - Repeat EKG and re-dose calcium if EKG or status does not improve in 5–10 min.[^2][^3]
    - Continuous cardiac/vitals monitoring.[^2]

**Other Electrolytes:**

- **Hypokalemia:** Replace potassium IV/PO only if monitored, unless unstable arrhythmia (hospital-level action)
- **Hypocalcemia:** IV calcium for tetany, seizure, stridor, or severe arrhythmia
- **Hypermagnesemia:** Calcium IV is antidote for severe toxicity; support airway as priority
- **Hypomagnesemia:** For torsades/seizure, IV mag sulfate (2g over 2–3 min)

***

## Common Mistakes

- Treating “suspected hyperkalemia” without EKG/monitor; always confirm if possible.
- Missing drugs/toxins as reversible causes (ACE/ARB, digoxin, diuretics, lithium).
- Over-relying on fluids for hyperkalemia in ESRD (often does not help).
- Failing to recheck EKG after calcium or not repeating dose for persistent changes.
- Missing hypomagnesemia as “cause of cause”—especially in refractory arrhythmias.

***

## Clinical Pearls

- **Any ESRD patient with bradycardia or widened QRS—treat as hyperkalemia until proven otherwise.**
- **Peak T waves and “disappearing P waves” beat serum potassium for real-time danger.**
- **Albuterol, bicarb, and insulin shift K+ into cells but do NOT remove it; always plan transport for dialysis.**
- **Hypocalcemia after transfusion = citrate binding calcium—treat rapidly if symptomatic (seizure/laryngeal spasm/QT).**
- Severe hypomagnesemia can cause **torsades/V-fib** that won’t convert without magnesium.

***

## Decision Trees

**Electrolyte Emergency Field Algorithm**

1. **Does patient have DKD/ESRD, missed dialysis, or drug exposure?**
    - Yes → Monitor cardiac, draw labs (if available), prep for K+ danger
2. **Any EKG signs of instability (brady, widened QRS, sine wave, VT/VF)?**
    - Yes →
        - Calcium chloride 1g IV/IO (repeat if needed)
        - Albuterol neb (10–20mg)
        - Sodium bicarb if acidotic or per protocol
        - Insulin/D50 if available/ordered
        - Prep for defib/pacing/CPR
    - No → Monitor closely, prep for deterioration, early hospital warning
3. **Hypokalemia, hypocalcemia, or hypomagnesemia on labs/monitor?**
    - Hypokalemia: Monitor for arrhythmia, replace if protocol
    - Hypocalcemia: Treat for tetany, seizures, laryngospasm, prolonged QT
    - Hypomagnesemia: Give IV Mg for torsades, seizure, severe arrhythmia
4. **Still unstable?**
    - Repeat above interventions, escalate airway/cardiac support, rapid transport

***

## Practice Cases

### Case 1: Hyperkalemic Arrest

- 65M, ESRD, pulseless, EKG—sine wave, last dialyzed 3 days ago.
- Timeline: 0min—found down, 2min—IV calcium, 4min—ROSC, wide QRS persists.
> What’s your redose/next move?


### Case 2: Worsening Hyperkalemia

- 71F, missed dialysis, lethargic, EKG—peaked T’s, PR 180 ms, wide QRS.
- Timeline: 0min—scene, 4min—CaCl, 10min—albuterol neb, 20min—QRS narrows.
> Why continue hospital transport and monitor continuously?


### Case 3: Hypokalemia Torsades

- 40M, chronic ETOH, vomiting, runs of VT, U waves, low K+, low Mg.
- Timeline: 0min—arrest, 3min—defib, 7min—no ROSC until Mg given.
> What did you correct? Why did antiarrhythmics fail initially?


### Case 4: Calcium Danger

- 32F, post massive transfusion, tingling, facial spasm, QT 520 ms.
- Timeline: 0min—OR, 15min—numbness, 30min—spasm, EKG changes.
> Cause? Life-saving intervention?


### Case 5: Hypermagnesemia Crisis

- 23F, eclampsia protocol, missing DTRs, bradycardia, flaccid.
- Timeline: 0min—prehospital Mg, 12min—resp depression, BP 80/54.
> Antidote? Supportive priorities?


### Case 6: Electrolyte Mix in Rhabdo

- 58M, found down, muscle pain, dark urine, rising K+, low Ca2+, low Mg2+.
- Timeline: 0min—found, 10min—K+ rising, 20min—ECG restricts.
> How do you prioritize the triad? What buys time?

***

## Reflection

**Structured Reflection Questions:**

- Which EKG changes do you need more practice identifying for immediate calcium intervention?
- How do you avoid tunnel vision on potassium—what clinical cross-checks warn you of calcium or magnesium trouble?
- When do you choose to repeat calcium versus initiate transport in field instability?
- Share a real or simulated case where your first intervention “didn’t work”—what did you do next and why?




