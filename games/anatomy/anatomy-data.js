/**
 * Comprehensive UBERON anatomical data for the Anatomy Explorer
 * Each entry includes clinical correlations relevant to EMS providers
 */

const ANATOMY_DATA = {
    // ═══════════════════════════════════════════════════════════════════
    // CARDIOVASCULAR SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0000948": {
        name: "Heart",
        latin: "Cor",
        system: "Cardiovascular",
        description: "A hollow muscular organ that pumps blood throughout the body via rhythmic contractions. Located in the mediastinum, slightly left of center. The adult heart weighs approximately 250-350 grams and beats 60-100 times per minute at rest.",
        clinical: "Primary assessment target in cardiac emergencies. Auscultate at four valve points. Monitor for irregular rhythms, murmurs, and friction rubs. In arrest, focus on high-quality CPR with minimal interruptions.",
        conditions: ["Myocardial Infarction", "Congestive Heart Failure", "Arrhythmias", "Pericarditis", "Cardiac Tamponade"],
        quiz: [
            { q: "Which organ is the primary pump of the circulatory system?", type: "function" },
            { q: "Located in the mediastinum, this muscular organ weighs 250-350g in adults.", type: "description" }
        ]
    },
    "UBERON_0000947": {
        name: "Aorta",
        latin: "Aorta",
        system: "Cardiovascular",
        description: "The largest artery in the body, originating from the left ventricle. Distributes oxygenated blood to all parts of the body through systemic circulation. Divided into ascending aorta, aortic arch, and descending aorta.",
        clinical: "Aortic dissection presents with sudden, tearing chest pain radiating to the back. Blood pressure differential between arms suggests dissection. Aortic aneurysm rupture causes rapid exsanguination.",
        conditions: ["Aortic Dissection", "Aortic Aneurysm", "Aortic Stenosis", "Aortic Regurgitation"],
        quiz: [
            { q: "The largest artery in the body, originating from the left ventricle.", type: "description" },
            { q: "Which vessel distributes oxygenated blood to all systemic circulation?", type: "function" }
        ]
    },
    "UBERON_0001637": {
        name: "Artery",
        latin: "Arteria",
        system: "Cardiovascular",
        description: "Blood vessels that carry oxygenated blood away from the heart to the body's tissues. Characterized by thick, elastic walls that withstand high pressure from cardiac contractions.",
        clinical: "Arterial bleeding is bright red and spurts with each heartbeat. Requires direct pressure with elevation. Tourniquets for extremity hemorrhage when direct pressure fails.",
        conditions: ["Arterial Bleeding", "Peripheral Artery Disease", "Arterial Occlusion"],
        quiz: [
            { q: "Blood vessels with thick walls that carry oxygenated blood away from the heart.", type: "description" }
        ]
    },
    "UBERON_0001981": {
        name: "Blood Vessel",
        latin: "Vas sanguineum",
        system: "Cardiovascular",
        description: "Tubular structures that transport blood throughout the body. Includes arteries, veins, and capillaries. The total length of blood vessels in an adult is approximately 100,000 kilometers.",
        clinical: "Assess capillary refill time (normal <2 seconds) as indicator of perfusion. Vessel trauma requires hemorrhage control. IV access establishes therapeutic pathway.",
        conditions: ["Hemorrhage", "Thrombosis", "Embolism", "Vasculitis"],
        quiz: [
            { q: "The tubular network totaling ~100,000 km that transports blood.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // RESPIRATORY SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0002048": {
        name: "Lung",
        latin: "Pulmo",
        system: "Respiratory",
        description: "Paired organs of respiration located in the thoracic cavity. The right lung has three lobes, the left has two (to accommodate the heart). Total surface area approximately 70 square meters—the size of a tennis court.",
        clinical: "Auscultate in six fields bilaterally. Listen for crackles (fluid), wheezes (bronchospasm), rhonchi (secretions), or diminished/absent sounds. Percussion reveals hyperresonance (pneumothorax) or dullness (effusion/consolidation).",
        conditions: ["Pneumonia", "COPD", "Asthma", "Pulmonary Embolism", "Pneumothorax", "Pulmonary Edema"],
        quiz: [
            { q: "Paired respiratory organs with a combined surface area of ~70 square meters.", type: "description" },
            { q: "Which organs exchange oxygen and carbon dioxide in the thoracic cavity?", type: "function" }
        ]
    },
    "UBERON_0000977": {
        name: "Pleura",
        latin: "Pleura",
        system: "Respiratory",
        description: "Double-layered serous membrane surrounding each lung. The visceral pleura adheres to the lung surface; the parietal pleura lines the thoracic cavity. The pleural space contains a thin film of lubricating fluid.",
        clinical: "Pleural effusion causes dullness to percussion and decreased breath sounds. Tension pneumothorax requires immediate needle decompression at 2nd intercostal space, midclavicular line.",
        conditions: ["Pleural Effusion", "Pneumothorax", "Hemothorax", "Pleurisy"],
        quiz: [
            { q: "Double-layered membrane surrounding the lungs, containing lubricating fluid.", type: "description" }
        ]
    },
    "UBERON_0001043": {
        name: "Esophagus",
        latin: "Oesophagus",
        system: "Digestive",
        description: "Muscular tube approximately 25 cm long connecting the pharynx to the stomach. Passes through the diaphragm at the esophageal hiatus. Peristaltic contractions propel food downward.",
        clinical: "Esophageal foreign body obstruction may cause drooling and inability to swallow. Varices (from portal hypertension) can cause massive hemorrhage. Boerhaave syndrome: esophageal rupture from forceful vomiting.",
        conditions: ["Foreign Body Obstruction", "Esophageal Varices", "GERD", "Esophageal Rupture"],
        quiz: [
            { q: "25 cm muscular tube connecting the pharynx to the stomach.", type: "description" }
        ]
    },
    "UBERON_0001044": {
        name: "Trachea",
        latin: "Trachea",
        system: "Respiratory",
        description: "The windpipe: a cartilaginous tube approximately 10-12 cm long extending from the larynx to the carina where it bifurcates into the main bronchi. C-shaped cartilage rings keep it patent.",
        clinical: "Tracheal deviation suggests tension pneumothorax (deviated away) or large pleural effusion. Tracheal tugging indicates severe respiratory distress. Cricothyrotomy accesses airway below the larynx.",
        conditions: ["Tracheal Stenosis", "Tracheomalacia", "Foreign Body Aspiration"],
        quiz: [
            { q: "10-12 cm cartilaginous tube extending from larynx to the carina.", type: "description" },
            { q: "Which structure is the 'windpipe' kept open by C-shaped cartilage rings?", type: "function" }
        ]
    },
    "UBERON_0003126": {
        name: "Bronchus",
        latin: "Bronchus",
        system: "Respiratory",
        description: "Airways that branch from the trachea into the lungs. The right main bronchus is wider, shorter, and more vertical than the left—making it a more common site for aspirated foreign bodies.",
        clinical: "Aspirated objects more commonly enter the right bronchus due to its anatomy. Bronchospasm causes expiratory wheezing. Beta-2 agonists relax bronchial smooth muscle.",
        conditions: ["Bronchospasm", "Bronchitis", "Foreign Body Aspiration"],
        quiz: [
            { q: "Airways branching from the trachea; right side is shorter and more vertical.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // NERVOUS SYSTEM (BRAIN)
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0000955": {
        name: "Brain",
        latin: "Encephalon",
        system: "Nervous",
        description: "The central organ of the nervous system, weighing approximately 1.4 kg. Contains roughly 86 billion neurons. Protected by the skull, meninges, and cerebrospinal fluid. Consumes about 20% of the body's oxygen despite being only 2% of body weight.",
        clinical: "Assess using Glasgow Coma Scale (GCS). Pupil response indicates brainstem function. Cushing's triad (hypertension, bradycardia, irregular respirations) signals increased intracranial pressure. Time is brain in stroke.",
        conditions: ["Stroke", "TBI", "Intracranial Hemorrhage", "Seizures", "Meningitis"],
        quiz: [
            { q: "Central nervous system organ containing ~86 billion neurons, using 20% of body's oxygen.", type: "description" },
            { q: "Which organ is assessed using the Glasgow Coma Scale?", type: "function" }
        ]
    },
    "UBERON_0000956": {
        name: "Cerebral Cortex",
        latin: "Cortex cerebri",
        system: "Nervous",
        description: "The outer layer of neural tissue of the cerebrum, 2-4mm thick. Responsible for higher cognitive functions including perception, consciousness, thought, language, and voluntary movement.",
        clinical: "Cortical strokes cause specific deficits based on location: motor strip (weakness), sensory strip (numbness), Broca's area (expressive aphasia), Wernicke's area (receptive aphasia).",
        conditions: ["Cortical Stroke", "Epilepsy", "Dementia"],
        quiz: [
            { q: "2-4mm outer layer of cerebrum responsible for cognition and consciousness.", type: "description" }
        ]
    },
    "UBERON_0001870": {
        name: "Frontal Lobe",
        latin: "Lobus frontalis",
        system: "Nervous",
        description: "The anterior portion of the cerebral hemisphere, separated from the parietal lobe by the central sulcus. Controls executive function, motor activity, personality, speech production (Broca's area), and judgment.",
        clinical: "Frontal lobe injuries cause personality changes, poor judgment, and motor deficits. Broca's area damage causes expressive aphasia—patient understands but cannot produce fluent speech.",
        conditions: ["Frontal Lobe Stroke", "Traumatic Brain Injury", "Behavioral Changes"],
        quiz: [
            { q: "Anterior cerebral lobe controlling personality, judgment, and Broca's area.", type: "description" }
        ]
    },
    "UBERON_0001871": {
        name: "Parietal Lobe",
        latin: "Lobus parietalis",
        system: "Nervous",
        description: "Located posterior to the frontal lobe and superior to the temporal lobe. Processes sensory information including touch, temperature, pain, and spatial orientation.",
        clinical: "Parietal lobe strokes cause contralateral sensory loss, spatial neglect (especially right-sided lesions), and difficulty with mathematical calculations.",
        conditions: ["Sensory Stroke", "Neglect Syndrome", "Asterognosis"],
        quiz: [
            { q: "Cerebral lobe processing touch, temperature, pain, and spatial orientation.", type: "description" }
        ]
    },
    "UBERON_0002021": {
        name: "Occipital Lobe",
        latin: "Lobus occipitalis",
        system: "Nervous",
        description: "The posterior lobe of the cerebrum, containing the primary visual cortex. Processes visual information received from the retina via the optic nerve and optic radiation.",
        clinical: "Occipital strokes cause visual field deficits (homonymous hemianopia). Patient may be unaware of visual loss. Charles Bonnet syndrome: visual hallucinations in visually impaired patients.",
        conditions: ["Visual Field Cuts", "Cortical Blindness", "Visual Agnosia"],
        quiz: [
            { q: "Posterior cerebral lobe containing the primary visual cortex.", type: "description" }
        ]
    },
    "UBERON_0001876": {
        name: "Amygdala",
        latin: "Corpus amygdaloideum",
        system: "Nervous",
        description: "Almond-shaped nuclei located deep within the temporal lobes. Part of the limbic system, crucial for processing emotions, particularly fear and aggression. Involved in emotional memory formation.",
        clinical: "Hyperactive amygdala associated with anxiety disorders and PTSD. Relevant in understanding stress responses and emotional regulation in crisis situations.",
        conditions: ["Anxiety Disorders", "PTSD", "Emotional Dysregulation"],
        quiz: [
            { q: "Almond-shaped limbic structure processing fear and emotional memory.", type: "description" }
        ]
    },
    "UBERON_0001894": {
        name: "Diencephalon",
        latin: "Diencephalon",
        system: "Nervous",
        description: "Region of the brain between the cerebrum and brainstem. Contains the thalamus (sensory relay), hypothalamus (homeostasis), epithalamus (pineal gland), and subthalamus.",
        clinical: "Hypothalamic dysfunction affects temperature regulation, appetite, and hormone release. Thalamic strokes cause contralateral sensory loss and thalamic pain syndrome.",
        conditions: ["Thalamic Stroke", "Hypothalamic Disorders", "Diabetes Insipidus"],
        quiz: [
            { q: "Brain region containing thalamus and hypothalamus, between cerebrum and brainstem.", type: "description" }
        ]
    },
    "UBERON_0001896": {
        name: "Midbrain",
        latin: "Mesencephalon",
        system: "Nervous",
        description: "The uppermost portion of the brainstem, connecting the pons and cerebellum with the diencephalon. Contains nuclei for cranial nerves III and IV, and the substantia nigra.",
        clinical: "Midbrain lesions cause pupillary abnormalities, vertical gaze palsy, and altered consciousness. CN III palsy: ptosis, 'down and out' eye, dilated pupil.",
        conditions: ["Brain Herniation", "Weber Syndrome", "CN III Palsy"],
        quiz: [
            { q: "Upper brainstem containing CN III/IV nuclei and substantia nigra.", type: "description" }
        ]
    },
    "UBERON_0001897": {
        name: "Pons",
        latin: "Pons",
        system: "Nervous",
        description: "Latin for 'bridge,' this brainstem structure connects the cerebellum to the cerebrum. Contains nuclei for cranial nerves V, VI, VII, and VIII. Involved in sleep, respiration, and motor control.",
        clinical: "Pontine hemorrhage causes pinpoint pupils, hyperthermia, and quadriplegia. 'Locked-in syndrome': conscious but only able to move eyes vertically.",
        conditions: ["Pontine Stroke", "Central Pontine Myelinolysis", "Locked-in Syndrome"],
        quiz: [
            { q: "Brainstem 'bridge' connecting cerebellum to cerebrum, contains CN V-VIII.", type: "description" }
        ]
    },
    "UBERON_0001898": {
        name: "Medulla Oblongata",
        latin: "Medulla oblongata",
        system: "Nervous",
        description: "The lowermost portion of the brainstem, continuous with the spinal cord. Contains vital centers for cardiovascular and respiratory control. Origin of cranial nerves IX, X, XI, and XII.",
        clinical: "Medullary lesions are immediately life-threatening—this is where respiratory and cardiac centers reside. Vagal (CN X) stimulation from the medulla can cause bradycardia.",
        conditions: ["Central Herniation", "Medullary Stroke", "Respiratory Arrest"],
        quiz: [
            { q: "Lowest brainstem structure containing vital cardiovascular and respiratory centers.", type: "description" },
            { q: "Which structure's damage would immediately threaten breathing and heart rate?", type: "function" }
        ]
    },
    "UBERON_0002037": {
        name: "Cerebellum",
        latin: "Cerebellum",
        system: "Nervous",
        description: "The 'little brain' located posterior to the brainstem. Contains more neurons than the rest of the brain combined. Coordinates voluntary movement, balance, posture, and motor learning.",
        clinical: "Cerebellar strokes cause ataxia, dysarthria, nausea/vomiting, and vertigo. Test with finger-to-nose, heel-to-shin, and Romberg tests. May present stroke-like without classic stroke signs.",
        conditions: ["Cerebellar Stroke", "Cerebellar Hemorrhage", "Ataxia"],
        quiz: [
            { q: "'Little brain' posterior to brainstem, coordinating balance and motor learning.", type: "description" }
        ]
    },
    "UBERON_0002421": {
        name: "Hippocampus",
        latin: "Hippocampus",
        system: "Nervous",
        description: "Seahorse-shaped structure in the medial temporal lobe. Essential for converting short-term memories to long-term memories. Part of the limbic system.",
        clinical: "Hippocampal damage (hypoxia, Alzheimer's) causes anterograde amnesia—inability to form new memories while old memories remain intact.",
        conditions: ["Alzheimer's Disease", "Hypoxic Brain Injury", "Temporal Lobe Epilepsy"],
        quiz: [
            { q: "Seahorse-shaped structure essential for memory formation in temporal lobe.", type: "description" }
        ]
    },
    "UBERON_0000451": {
        name: "Prefrontal Cortex",
        latin: "Cortex praefrontalis",
        system: "Nervous",
        description: "The anterior portion of the frontal lobe, crucial for executive functions including decision-making, planning, moderating social behavior, and expressing personality.",
        clinical: "Prefrontal damage causes impulsivity, poor judgment, and socially inappropriate behavior. Consider in trauma patients with personality changes.",
        conditions: ["Traumatic Brain Injury", "Frontal Lobe Syndrome"],
        quiz: [
            { q: "Anterior frontal lobe region for decision-making and personality expression.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // DIGESTIVE SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0000945": {
        name: "Stomach",
        latin: "Gaster/Ventriculus",
        system: "Digestive",
        description: "J-shaped muscular organ in the left upper quadrant. Capacity of about 1 liter normally, up to 4 liters when distended. Produces hydrochloric acid and pepsin to begin protein digestion.",
        clinical: "Gastric bleeding presents with hematemesis (coffee-ground or bright red) and melena. Gastric distension in BVM ventilation indicates esophageal air entry—reposition airway.",
        conditions: ["Peptic Ulcer Disease", "GI Bleed", "Gastritis", "Gastric Perforation"],
        quiz: [
            { q: "J-shaped LUQ organ producing HCl and pepsin, capacity ~1-4 liters.", type: "description" }
        ]
    },
    "UBERON_0002107": {
        name: "Liver",
        latin: "Hepar",
        system: "Digestive",
        description: "The largest solid organ, weighing 1.2-1.5 kg, located in the right upper quadrant. Performs over 500 functions including detoxification, protein synthesis, bile production, and glycogen storage.",
        clinical: "Hepatic injury from blunt trauma can cause massive hemorrhage—the liver is highly vascular. Liver failure causes coagulopathy, jaundice, hepatic encephalopathy, and ascites.",
        conditions: ["Hepatic Laceration", "Cirrhosis", "Hepatic Encephalopathy", "Hepatitis"],
        quiz: [
            { q: "Largest solid organ in RUQ, performs 500+ functions including detoxification.", type: "description" }
        ]
    },
    "UBERON_0002106": {
        name: "Spleen",
        latin: "Lien/Splen",
        system: "Lymphatic",
        description: "Fist-sized organ in the left upper quadrant, tucked under ribs 9-11. Filters blood, recycles iron from old RBCs, and acts as a blood reservoir. Part of the immune system.",
        clinical: "Most commonly injured abdominal organ in blunt trauma. Splenic rupture (including delayed) causes left upper quadrant pain, Kehr's sign (referred left shoulder pain), and hypovolemic shock.",
        conditions: ["Splenic Rupture", "Splenomegaly", "Delayed Splenic Rupture"],
        quiz: [
            { q: "LUQ organ under ribs 9-11 that filters blood and recycles iron.", type: "description" }
        ]
    },
    "UBERON_0001155": {
        name: "Colon",
        latin: "Colon/Intestinum crassum",
        system: "Digestive",
        description: "The large intestine, approximately 1.5 meters long. Absorbs water and electrolytes, forms and stores feces. Sections include cecum, ascending, transverse, descending, and sigmoid colon.",
        clinical: "Lower GI bleeding typically from colonic sources—bright red blood per rectum. Colonic perforation causes peritonitis. Volvulus (twisted bowel) presents with obstruction and ischemia.",
        conditions: ["Lower GI Bleed", "Colonic Perforation", "Volvulus", "Diverticulitis"],
        quiz: [
            { q: "1.5 meter large intestine that absorbs water and forms feces.", type: "description" }
        ]
    },
    "UBERON_0002108": {
        name: "Small Intestine",
        latin: "Intestinum tenue",
        system: "Digestive",
        description: "Approximately 6 meters long, divided into duodenum, jejunum, and ileum. Primary site of nutrient absorption. Surface area increased by villi and microvilli to approximately 250 square meters.",
        clinical: "Small bowel obstruction presents with crampy abdominal pain, vomiting, distension, and obstipation. Mesenteric ischemia causes severe pain out of proportion to exam findings.",
        conditions: ["Small Bowel Obstruction", "Mesenteric Ischemia", "Crohn's Disease"],
        quiz: [
            { q: "6 meter intestine with 250 sq meter surface area for nutrient absorption.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // URINARY SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0002113": {
        name: "Kidney",
        latin: "Ren",
        system: "Urinary",
        description: "Bean-shaped paired organs in the retroperitoneal space, each about 11 cm long. Filter approximately 180 liters of blood daily, producing 1-2 liters of urine. Regulate fluid balance, electrolytes, and blood pressure.",
        clinical: "Renal colic from kidney stones causes severe, colicky flank pain radiating to groin. Renal failure presents with fluid overload, hyperkalemia, and uremic symptoms.",
        conditions: ["Kidney Stones", "Acute Kidney Injury", "Pyelonephritis", "Renal Trauma"],
        quiz: [
            { q: "Bean-shaped retroperitoneal organs filtering 180 liters of blood daily.", type: "description" }
        ]
    },
    "UBERON_0001255": {
        name: "Urinary Bladder",
        latin: "Vesica urinaria",
        system: "Urinary",
        description: "Hollow muscular organ in the pelvis that stores urine. Capacity approximately 400-600 mL but can hold more. Controlled by both voluntary and involuntary sphincters.",
        clinical: "Bladder rupture in pelvic trauma—intraperitoneal rupture more dangerous than extraperitoneal. Urinary retention causes suprapubic distension and discomfort.",
        conditions: ["Bladder Rupture", "Urinary Retention", "UTI", "Bladder Cancer"],
        quiz: [
            { q: "Pelvic organ storing 400-600 mL of urine with dual sphincter control.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // MUSCULOSKELETAL SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0001013": {
        name: "Adipose Tissue",
        latin: "Textus adiposus",
        system: "Integumentary",
        description: "Connective tissue composed primarily of adipocytes (fat cells). Provides insulation, energy storage, and cushioning. Subcutaneous fat lies beneath the dermis.",
        clinical: "Excess adipose tissue complicates IV access, intubation, and drug dosing. Obesity increases risk for many conditions including diabetes and cardiovascular disease.",
        conditions: ["Obesity", "Metabolic Syndrome"],
        quiz: [
            { q: "Connective tissue of fat cells providing insulation and energy storage.", type: "description" }
        ]
    },
    "UBERON_0000014": {
        name: "Skin",
        latin: "Cutis/Integumentum",
        system: "Integumentary",
        description: "The body's largest organ, comprising about 16% of body weight. Three layers: epidermis, dermis, and hypodermis. Protects against pathogens, regulates temperature, and provides sensation.",
        clinical: "Skin assessment reveals perfusion status (color, temperature, moisture). Burns classified by depth and BSA (Rule of Nines). Rashes may indicate allergic reactions or infectious diseases.",
        conditions: ["Burns", "Cellulitis", "Necrotizing Fasciitis", "Allergic Reactions"],
        quiz: [
            { q: "Largest organ at 16% of body weight with three protective layers.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ENDOCRINE SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0002369": {
        name: "Adrenal Gland",
        latin: "Glandula suprarenalis",
        system: "Endocrine",
        description: "Paired glands atop each kidney. The medulla produces catecholamines (epinephrine, norepinephrine). The cortex produces corticosteroids and aldosterone.",
        clinical: "Adrenal crisis in chronic steroid users presents with hypotension, hypoglycemia, and shock. Pheochromocytoma (adrenal tumor) causes paroxysmal hypertension, headaches, and palpitations.",
        conditions: ["Adrenal Crisis", "Pheochromocytoma", "Addison's Disease", "Cushing's Syndrome"],
        quiz: [
            { q: "Glands atop kidneys producing catecholamines and corticosteroids.", type: "description" }
        ]
    },
    "UBERON_0002046": {
        name: "Thyroid Gland",
        latin: "Glandula thyroidea",
        system: "Endocrine",
        description: "Butterfly-shaped gland in the anterior neck, inferior to the larynx. Produces thyroid hormones (T3, T4) that regulate metabolism, and calcitonin which regulates calcium.",
        clinical: "Thyroid storm: tachycardia, fever, agitation, and altered mental status—life threatening. Myxedema coma: hypothyroid crisis with hypothermia, altered mentation, bradycardia.",
        conditions: ["Thyroid Storm", "Myxedema Coma", "Goiter", "Thyroid Cancer"],
        quiz: [
            { q: "Butterfly-shaped anterior neck gland producing T3, T4, and calcitonin.", type: "description" }
        ]
    },
    "UBERON_0002371": {
        name: "Bone Marrow",
        latin: "Medulla ossium",
        system: "Lymphatic",
        description: "Spongy tissue inside bones that produces blood cells (hematopoiesis). Red marrow produces RBCs, WBCs, and platelets. Yellow marrow stores fat.",
        clinical: "Bone marrow failure causes pancytopenia. Intraosseous (IO) access provides rapid vascular access via marrow cavity when IV access fails.",
        conditions: ["Leukemia", "Aplastic Anemia", "Multiple Myeloma"],
        quiz: [
            { q: "Spongy bone tissue producing blood cells through hematopoiesis.", type: "description" }
        ]
    },
    "UBERON_0000029": {
        name: "Lymph Node",
        latin: "Nodus lymphoideus",
        system: "Lymphatic",
        description: "Small, bean-shaped structures throughout the body that filter lymph fluid. Contain immune cells that fight infection. Major groups in neck, axilla, and groin.",
        clinical: "Lymphadenopathy may indicate infection, malignancy, or immune disorders. Tender, enlarged nodes suggest acute infection. Hard, fixed, non-tender nodes concerning for malignancy.",
        conditions: ["Lymphadenitis", "Lymphoma", "Metastatic Cancer"],
        quiz: [
            { q: "Bean-shaped structures filtering lymph, concentrated in neck, axilla, and groin.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // REPRODUCTIVE SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0000989": {
        name: "Penis",
        latin: "Penis",
        system: "Reproductive",
        description: "Male external reproductive organ containing erectile tissue (corpora cavernosa and corpus spongiosum) and the urethra. Functions in urination and reproduction.",
        clinical: "Priapism (prolonged erection) is a urological emergency—can cause permanent damage if not treated within 4-6 hours. May be drug-induced or from sickle cell crisis.",
        conditions: ["Priapism", "Penile Fracture", "Paraphimosis"],
        quiz: [
            { q: "Male organ with erectile tissue serving urinary and reproductive functions.", type: "description" }
        ]
    },
    "UBERON_0000473": {
        name: "Testis",
        latin: "Testis",
        system: "Reproductive",
        description: "Paired male gonads within the scrotum, producing sperm and testosterone. Each testis contains seminiferous tubules for sperm production and Leydig cells for hormone production.",
        clinical: "Testicular torsion causes sudden, severe scrotal pain with nausea—surgical emergency. Salvage rate drops significantly after 6 hours. Cremasteric reflex typically absent.",
        conditions: ["Testicular Torsion", "Epididymitis", "Testicular Cancer"],
        quiz: [
            { q: "Paired male gonads producing sperm and testosterone in the scrotum.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ADDITIONAL BRAIN STRUCTURES
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0002702": {
        name: "Middle Frontal Gyrus",
        latin: "Gyrus frontalis medius",
        system: "Nervous",
        description: "A convolution of the frontal lobe between the superior and inferior frontal sulci. Contains part of the dorsolateral prefrontal cortex, involved in working memory and executive function.",
        clinical: "Lesions may cause executive dysfunction, difficulty with complex planning, and working memory deficits.",
        conditions: ["Frontal Stroke", "Tumor"],
        quiz: [
            { q: "Frontal convolution between superior and inferior sulci, involved in working memory.", type: "description" }
        ]
    },
    "UBERON_0002148": {
        name: "Locus Coeruleus",
        latin: "Locus caeruleus",
        system: "Nervous",
        description: "A nucleus in the pons that is the principal site of norepinephrine synthesis in the brain. Involved in physiological responses to stress and panic, arousal, and sleep-wake regulation.",
        clinical: "Dysfunction implicated in anxiety disorders, depression, and PTSD. Understanding its role helps explain stress responses in trauma patients.",
        conditions: ["Anxiety Disorders", "Depression", "PTSD"],
        quiz: [
            { q: "Pontine nucleus producing norepinephrine, involved in stress and arousal.", type: "description" }
        ]
    },
    "UBERON_0002771": {
        name: "Angular Gyrus",
        latin: "Gyrus angularis",
        system: "Nervous",
        description: "A region of the parietal lobe near the border of the temporal and occipital lobes. Involved in language processing, number processing, spatial cognition, and memory retrieval.",
        clinical: "Damage causes Gerstmann syndrome: finger agnosia, acalculia, left-right disorientation, and agraphia.",
        conditions: ["Gerstmann Syndrome", "Angular Gyrus Stroke"],
        quiz: [
            { q: "Parietal gyrus at parieto-temporal-occipital junction, involved in language and math.", type: "description" }
        ]
    },
    "UBERON_0001905": {
        name: "Temporal Lobe",
        latin: "Lobus temporalis",
        system: "Nervous",
        description: "Located beneath the lateral sulcus, contains the auditory cortex, Wernicke's area for language comprehension, hippocampus, and amygdala. Processes auditory information, memory, and emotion.",
        clinical: "Temporal lobe seizures may present with automatisms, olfactory hallucinations, and déjà vu. Wernicke's aphasia: fluent but nonsensical speech, poor comprehension.",
        conditions: ["Temporal Lobe Epilepsy", "Wernicke's Aphasia", "Herpes Encephalitis"],
        quiz: [
            { q: "Lateral lobe containing auditory cortex, Wernicke's area, and hippocampus.", type: "description" }
        ]
    },
    "UBERON_0001872": {
        name: "Parietal Operculum",
        latin: "Operculum parietale",
        system: "Nervous",
        description: "Part of the parietal lobe that covers the insula. Contains secondary somatosensory cortex involved in processing tactile and pain information.",
        clinical: "Lesions may cause deficits in pain and tactile processing, including asymbolia for pain.",
        conditions: ["Sensory Processing Disorders"],
        quiz: [
            { q: "Parietal region covering the insula, processing touch and pain.", type: "description" }
        ]
    },
    "UBERON_0001873": {
        name: "Caudate Nucleus",
        latin: "Nucleus caudatus",
        system: "Nervous",
        description: "C-shaped structure within the basal ganglia, involved in motor planning, learning, memory, and reward. Part of the striatum along with the putamen.",
        clinical: "Atrophy seen in Huntington's disease, causing chorea (involuntary movements). Involved in OCD pathophysiology.",
        conditions: ["Huntington's Disease", "OCD"],
        quiz: [
            { q: "C-shaped basal ganglia structure involved in motor planning and reward.", type: "description" }
        ]
    },
    "UBERON_0001874": {
        name: "Putamen",
        latin: "Putamen",
        system: "Nervous",
        description: "A round structure at the base of the forebrain, part of the basal ganglia. Works with the caudate nucleus in regulating movement and influencing various types of learning.",
        clinical: "Hypertensive hemorrhage commonly occurs in the putamen, causing contralateral hemiparesis. Part of the basal ganglia circuit affected in Parkinson's disease.",
        conditions: ["Basal Ganglia Hemorrhage", "Parkinson's Disease"],
        quiz: [
            { q: "Basal ganglia structure common site for hypertensive hemorrhage.", type: "description" }
        ]
    },
    "UBERON_0001875": {
        name: "Globus Pallidus",
        latin: "Globus pallidus",
        system: "Nervous",
        description: "Pale globe-shaped structure in the basal ganglia, divided into internal and external segments. Major output nucleus of the basal ganglia, involved in voluntary movement regulation.",
        clinical: "Target for deep brain stimulation in Parkinson's disease and dystonia. Lesions cause movement disorders.",
        conditions: ["Parkinson's Disease", "Dystonia"],
        quiz: [
            { q: "Pale basal ganglia structure that is the major output nucleus for movement.", type: "description" }
        ]
    },
    "UBERON_0002360": {
        name: "Substantia Nigra",
        latin: "Substantia nigra",
        system: "Nervous",
        description: "Dark-pigmented midbrain structure producing dopamine. The pars compacta projects to the striatum and is crucial for movement initiation. Named for its dark color due to neuromelanin.",
        clinical: "Degeneration of dopaminergic neurons here causes Parkinson's disease: tremor, rigidity, bradykinesia, and postural instability.",
        conditions: ["Parkinson's Disease"],
        quiz: [
            { q: "Dark midbrain structure producing dopamine, degeneration causes Parkinson's.", type: "description" }
        ]
    },
    "UBERON_0001954": {
        name: "Hypothalamus",
        latin: "Hypothalamus",
        system: "Nervous",
        description: "Small region below the thalamus, above the pituitary. Controls autonomic functions, hormone release (via pituitary), body temperature, hunger, thirst, circadian rhythms, and emotional responses.",
        clinical: "Hypothalamic dysfunction causes diabetes insipidus (ADH deficiency), temperature dysregulation, and hormonal abnormalities. Central in stress response via HPA axis.",
        conditions: ["Diabetes Insipidus", "SIADH", "Hypothalamic Obesity"],
        quiz: [
            { q: "Small structure controlling temperature, hormones, hunger, and circadian rhythms.", type: "description" }
        ]
    },
    "UBERON_0002363": {
        name: "Thalamus",
        latin: "Thalamus",
        system: "Nervous",
        description: "Paired egg-shaped structures serving as the brain's central relay station. Nearly all sensory information passes through the thalamus en route to the cortex. Also involved in consciousness and alertness.",
        clinical: "Thalamic strokes cause contralateral sensory loss and may produce central post-stroke pain (Dejerine-Roussy syndrome)—burning pain in affected areas.",
        conditions: ["Thalamic Stroke", "Dejerine-Roussy Syndrome"],
        quiz: [
            { q: "Central relay station where nearly all sensory information passes to cortex.", type: "description" }
        ]
    },
    "UBERON_0003027": {
        name: "Cingulate Cortex",
        latin: "Cortex cingulatus",
        system: "Nervous",
        description: "Part of the limbic system encircling the corpus callosum. Involved in emotion formation and processing, learning, memory, and the autonomic response to pain.",
        clinical: "Anterior cingulate involved in pain perception and emotional processing. Damage may cause apathy and reduced emotional responsiveness.",
        conditions: ["Depression", "Apathy Syndromes"],
        quiz: [
            { q: "Limbic cortex around corpus callosum involved in emotion and pain processing.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // SENSORY ORGANS
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0000970": {
        name: "Eye",
        latin: "Oculus",
        system: "Sensory",
        description: "Paired organs of vision, approximately 2.5 cm in diameter. Complex structure including cornea, lens, retina, and optic nerve. Extraocular muscles allow coordinated movement.",
        clinical: "Pupil assessment: size, equality, and reactivity (PERRLA). Unequal pupils suggest herniation or CN III palsy. Examine for hyphema, foreign bodies, and globe rupture.",
        conditions: ["Retinal Detachment", "Globe Rupture", "Chemical Burns", "Central Retinal Artery Occlusion"],
        quiz: [
            { q: "2.5 cm paired visual organs assessed for pupil size, equality, and reactivity.", type: "description" }
        ]
    },
    "UBERON_0001831": {
        name: "Salivary Gland",
        latin: "Glandula salivaria",
        system: "Digestive",
        description: "Three paired glands producing saliva: parotid (largest, serous), submandibular (mixed), and sublingual (mucous). Produce about 1-1.5 liters of saliva daily.",
        clinical: "Parotid gland is posterior to the jaw; swelling here suggests mumps or parotitis. Facial nerve runs through parotid—surgery risks facial palsy.",
        conditions: ["Sialadenitis", "Parotitis", "Salivary Stones"],
        quiz: [
            { q: "Three paired glands (parotid, submandibular, sublingual) producing saliva.", type: "description" }
        ]
    },
    "UBERON_0001723": {
        name: "Tongue",
        latin: "Lingua",
        system: "Digestive",
        description: "Muscular organ in the mouth covered with papillae and taste buds. Essential for speaking, tasting, chewing, and swallowing. Richly vascularized and heals quickly.",
        clinical: "Tongue swelling (angioedema) can rapidly obstruct the airway—requires immediate intervention. Deviation to one side suggests hypoglossal nerve (CN XII) injury.",
        conditions: ["Angioedema", "Tongue Laceration", "Hypoglossal Palsy"],
        quiz: [
            { q: "Muscular oral organ for taste and speech; swelling causes airway emergency.", type: "description" }
        ]
    },
    "UBERON_0000004": {
        name: "Nose",
        latin: "Nasus",
        system: "Respiratory",
        description: "External nose and internal nasal cavity. Filters, warms, and humidifies inspired air. Contains olfactory epithelium for smell. Highly vascular mucosa is prone to bleeding.",
        clinical: "Epistaxis usually anterior (Kiesselbach's plexus). Apply direct pressure, lean forward. Posterior bleeds are more serious. CSF rhinorrhea suggests skull fracture.",
        conditions: ["Epistaxis", "Nasal Fracture", "CSF Leak"],
        quiz: [
            { q: "Filters and warms air; highly vascular mucosa prone to nosebleeds.", type: "description" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // ADDITIONAL STRUCTURES
    // ═══════════════════════════════════════════════════════════════════
    "UBERON_0002114": {
        name: "Duodenum",
        latin: "Duodenum",
        system: "Digestive",
        description: "First portion of the small intestine, approximately 25 cm (12 fingerbreadths—hence its name). Receives chyme from stomach, bile from gallbladder, and pancreatic enzymes.",
        clinical: "Duodenal ulcers typically cause pain relieved by food. Perforation causes severe epigastric pain and peritonitis. Retroperitoneal portion may be injured in blunt abdominal trauma.",
        conditions: ["Duodenal Ulcer", "Duodenal Perforation"],
        quiz: [
            { q: "First 25 cm of small intestine receiving bile and pancreatic secretions.", type: "description" }
        ]
    },
    "UBERON_0002110": {
        name: "Gallbladder",
        latin: "Vesica biliaris",
        system: "Digestive",
        description: "Pear-shaped organ beneath the liver storing and concentrating bile. Capacity about 50 mL. Releases bile into the duodenum via the common bile duct when stimulated by fatty foods.",
        clinical: "Cholecystitis presents with RUQ pain, Murphy's sign, and often occurs postprandially. Gallstone pancreatitis from stone passing into common bile duct.",
        conditions: ["Cholecystitis", "Cholelithiasis", "Biliary Colic"],
        quiz: [
            { q: "Pear-shaped organ under liver storing bile, capacity ~50 mL.", type: "description" }
        ]
    },
    "UBERON_0001264": {
        name: "Pancreas",
        latin: "Pancreas",
        system: "Digestive",
        description: "Elongated gland behind the stomach with both exocrine (digestive enzymes) and endocrine (insulin, glucagon) functions. About 15 cm long, divided into head, body, and tail.",
        clinical: "Pancreatitis causes severe epigastric pain radiating to the back, nausea, and vomiting. May be triggered by gallstones or alcohol. Islet cells produce insulin and glucagon.",
        conditions: ["Acute Pancreatitis", "Pancreatic Cancer", "Diabetes Mellitus"],
        quiz: [
            { q: "15 cm gland behind stomach producing digestive enzymes and insulin.", type: "description" }
        ]
    },
    "UBERON_0007844": {
        name: "Cartilage Element",
        latin: "Cartilago",
        system: "Musculoskeletal",
        description: "Flexible connective tissue found throughout the body. Types include hyaline (joints, respiratory tract), elastic (ear, epiglottis), and fibrocartilage (intervertebral discs, menisci).",
        clinical: "Avascular tissue with limited healing capacity. Cartilage injuries often require surgical intervention. Provides structure to airway—damage can cause obstruction.",
        conditions: ["Cartilage Injury", "Osteoarthritis"],
        quiz: [
            { q: "Avascular flexible connective tissue in joints, airways, and discs.", type: "description" }
        ]
    },
    "UBERON_0000310": {
        name: "Breast",
        latin: "Mamma",
        system: "Integumentary",
        description: "Modified sweat glands containing mammary glands for milk production. Composed of glandular tissue, adipose tissue, and Cooper's ligaments. Lymphatic drainage primarily to axillary nodes.",
        clinical: "Breast masses require evaluation for malignancy. Male breast enlargement (gynecomastia) may indicate hormonal imbalance or medication side effect.",
        conditions: ["Breast Cancer", "Mastitis", "Gynecomastia"],
        quiz: [
            { q: "Modified sweat glands with mammary tissue, draining to axillary lymph nodes.", type: "description" }
        ]
    },
    "UBERON_0002372": {
        name: "Tonsil",
        latin: "Tonsilla",
        system: "Lymphatic",
        description: "Lymphoid tissue masses in the pharynx. Palatine tonsils flank the oropharynx; pharyngeal tonsil (adenoid) in nasopharynx; lingual tonsils at tongue base. Part of Waldeyer's ring.",
        clinical: "Peritonsillar abscess causes 'hot potato' voice, trismus, and uvular deviation. May compromise airway. Tonsillar hypertrophy can cause sleep apnea in children.",
        conditions: ["Tonsillitis", "Peritonsillar Abscess", "Obstructive Sleep Apnea"],
        quiz: [
            { q: "Lymphoid masses in pharynx forming Waldeyer's ring immune barrier.", type: "description" }
        ]
    },
    "UBERON_0001103": {
        name: "Diaphragm",
        latin: "Diaphragma",
        system: "Respiratory",
        description: "Dome-shaped skeletal muscle separating thoracic and abdominal cavities. Primary muscle of respiration—contraction flattens the dome and creates negative intrathoracic pressure for inspiration.",
        clinical: "Diaphragmatic injuries may cause herniation of abdominal contents into thorax. Phrenic nerve (C3-5) damage causes hemidiaphragm paralysis. 'C3, 4, 5 keep the diaphragm alive.'",
        conditions: ["Diaphragmatic Hernia", "Phrenic Nerve Palsy"],
        quiz: [
            { q: "Dome-shaped muscle separating chest and abdomen, primary respiratory muscle.", type: "description" }
        ]
    },
    "UBERON_0001021": {
        name: "Nerve",
        latin: "Nervus",
        system: "Nervous",
        description: "Bundles of axons in the peripheral nervous system that transmit signals between the CNS and the body. Classified as sensory, motor, or mixed. Protected by layers: endoneurium, perineurium, epineurium.",
        clinical: "Nerve injuries classified as neurapraxia (temporary), axonotmesis (axon damage), or neurotmesis (complete transection). Assess distal motor and sensory function.",
        conditions: ["Peripheral Neuropathy", "Nerve Transection", "Compression Neuropathy"],
        quiz: [
            { q: "Axon bundles transmitting signals, classified as sensory, motor, or mixed.", type: "description" }
        ]
    },
    "UBERON_0001134": {
        name: "Skeletal Muscle Tissue",
        latin: "Textus muscularis striatus",
        system: "Musculoskeletal",
        description: "Striated, voluntary muscle attached to bones. Comprises about 40% of body weight. Contains actin and myosin filaments that slide past each other to produce contraction.",
        clinical: "Rhabdomyolysis releases myoglobin—causes dark urine and acute kidney injury. Crush syndrome: reperfusion releases potassium and toxins. Muscle rigidity may indicate malignant hyperthermia.",
        conditions: ["Rhabdomyolysis", "Crush Syndrome", "Muscular Dystrophy"],
        quiz: [
            { q: "Striated voluntary tissue comprising 40% of body weight, attached to bones.", type: "description" }
        ]
    },
    "UBERON_0002240": {
        name: "Spinal Cord",
        latin: "Medulla spinalis",
        system: "Nervous",
        description: "Cylindrical bundle of nerve tissue extending from the medulla to approximately L1-L2. Transmits signals between brain and body, and contains reflex centers. Protected by vertebral column and meninges.",
        clinical: "Spinal cord injury levels determine functional loss: cervical affects all four limbs (quadriplegia), thoracic and below affects legs (paraplegia). Maintain spinal immobilization in trauma.",
        conditions: ["Spinal Cord Injury", "Spinal Cord Compression", "Transverse Myelitis"],
        quiz: [
            { q: "Nerve tissue from medulla to L1-L2 transmitting signals and housing reflexes.", type: "description" }
        ]
    },
    "UBERON_0000341": {
        name: "Pharynx",
        latin: "Pharynx",
        system: "Digestive",
        description: "Muscular tube behind the nasal and oral cavities, extending to the esophagus and larynx. Divided into nasopharynx, oropharynx, and laryngopharynx. Common pathway for food and air.",
        clinical: "Pharyngeal obstruction is a primary concern in unconscious patients—tongue falls back against posterior pharynx. Peritonsillar and retropharyngeal abscesses can compromise the airway.",
        conditions: ["Pharyngitis", "Epiglottitis", "Retropharyngeal Abscess"],
        quiz: [
            { q: "Muscular tube (naso-, oro-, laryngopharynx) as common air and food pathway.", type: "description" }
        ]
    },
    "UBERON_0002079": {
        name: "Tricuspid Valve",
        latin: "Valva tricuspidalis",
        system: "Cardiovascular",
        description: "The right atrioventricular valve with three cusps. Prevents backflow of blood from the right ventricle to the right atrium during ventricular systole.",
        clinical: "Tricuspid regurgitation may be seen in right heart failure and IV drug users (endocarditis). Causes prominent jugular venous pulsations.",
        conditions: ["Tricuspid Regurgitation", "Tricuspid Endocarditis"],
        quiz: [
            { q: "Three-cusped valve preventing backflow from right ventricle to right atrium.", type: "description" }
        ]
    },
    "UBERON_0002084": {
        name: "Mitral Valve",
        latin: "Valva mitralis",
        system: "Cardiovascular",
        description: "The left atrioventricular valve with two cusps (bicuspid). Named for its resemblance to a bishop's mitre. Prevents backflow from left ventricle to left atrium during systole.",
        clinical: "Mitral stenosis (often rheumatic) causes dyspnea and atrial fibrillation. Mitral regurgitation causes holosystolic murmur at apex radiating to axilla.",
        conditions: ["Mitral Stenosis", "Mitral Regurgitation", "Mitral Valve Prolapse"],
        quiz: [
            { q: "Two-cusped left AV valve (bicuspid) preventing left ventricular backflow.", type: "description" }
        ]
    },
    "UBERON_0002116": {
        name: "Ileum",
        latin: "Ileum",
        system: "Digestive",
        description: "The final section of the small intestine, approximately 3 meters long. Primary site for vitamin B12 and bile salt absorption. Contains Peyer's patches (lymphoid tissue).",
        clinical: "Crohn's disease commonly affects the terminal ileum. Meckel's diverticulum (embryonic remnant) found in the ileum can cause bleeding or obstruction.",
        conditions: ["Crohn's Disease", "Meckel's Diverticulum", "Ileal Obstruction"],
        quiz: [
            { q: "Final 3 meters of small intestine absorbing B12 and bile salts.", type: "description" }
        ]
    },
    "UBERON_0001882": {
        name: "Nucleus Accumbens",
        latin: "Nucleus accumbens",
        system: "Nervous",
        description: "Region in the basal forebrain playing a central role in the reward circuit, pleasure, and addiction. Receives dopaminergic input from the ventral tegmental area.",
        clinical: "Key structure in understanding addiction and substance abuse. Dopamine release here reinforces drug-seeking behavior.",
        conditions: ["Substance Use Disorder", "Depression"],
        quiz: [
            { q: "Basal forebrain reward center receiving dopamine, central to addiction.", type: "description" }
        ]
    },
    "UBERON_0002285": {
        name: "Telencephalic Ventricle",
        latin: "Ventriculus lateralis",
        system: "Nervous",
        description: "The lateral ventricles: paired C-shaped cavities within the cerebral hemispheres containing cerebrospinal fluid. Connect to the third ventricle via the foramen of Monro.",
        clinical: "Ventricular enlargement (hydrocephalus) increases intracranial pressure. VP shunt malfunction presents with headache, vomiting, and altered mental status.",
        conditions: ["Hydrocephalus", "Intraventricular Hemorrhage"],
        quiz: [
            { q: "Paired C-shaped CSF-filled cavities within the cerebral hemispheres.", type: "description" }
        ]
    }
};

// EMS certification levels
const EMS_LEVELS = {
    basic: { name: "EMT-Basic", abbrev: "EMT-B", color: "#22c55e" },
    aemt: { name: "Advanced EMT", abbrev: "AEMT", color: "#fbbf24" },
    paramedic: { name: "Paramedic", abbrev: "PM", color: "#f97316" },
    advanced: { name: "Advanced", abbrev: "ADV", color: "#ef4444" }
};

// Systems configuration for organizing content (no emojis for clean design)
const BODY_SYSTEMS = {
    "Cardiovascular": {
        color: "#ef4444",
        abbrev: "CV",
        description: "Heart and blood vessels"
    },
    "Respiratory": {
        color: "#06b6d4",
        abbrev: "RS",
        description: "Lungs and airways"
    },
    "Nervous": {
        color: "#8b5cf6",
        abbrev: "NS",
        description: "Brain, spinal cord, and nerves"
    },
    "Digestive": {
        color: "#f59e0b",
        abbrev: "GI",
        description: "GI tract and accessory organs"
    },
    "Urinary": {
        color: "#eab308",
        abbrev: "GU",
        description: "Kidneys and bladder"
    },
    "Musculoskeletal": {
        color: "#dc2626",
        abbrev: "MS",
        description: "Bones, muscles, and cartilage"
    },
    "Endocrine": {
        color: "#10b981",
        abbrev: "EN",
        description: "Hormone-producing glands"
    },
    "Lymphatic": {
        color: "#84cc16",
        abbrev: "LY",
        description: "Immune system components"
    },
    "Integumentary": {
        color: "#f97316",
        abbrev: "IN",
        description: "Skin and related structures"
    },
    "Reproductive": {
        color: "#ec4899",
        abbrev: "RP",
        description: "Reproductive organs"
    },
    "Sensory": {
        color: "#06b6d4",
        abbrev: "SN",
        description: "Eyes, ears, and sensory organs"
    }
};

// Assign EMS levels to each structure (basic = everyone, higher levels = more advanced)
// This function is called on load to add level data
function assignEMSLevels() {
    // Basic structures - fundamental anatomy all EMS should know
    const basicStructures = [
        "UBERON_0000948", // Heart
        "UBERON_0002048", // Lung  
        "UBERON_0000955", // Brain
        "UBERON_0001044", // Trachea
        "UBERON_0002113", // Kidney
        "UBERON_0000945", // Stomach
        "UBERON_0002107", // Liver
        "UBERON_0002106", // Spleen
        "UBERON_0001155", // Colon
        "UBERON_0000014", // Skin
        "UBERON_0001103", // Diaphragm
        "UBERON_0000970", // Eye
        "UBERON_0001723", // Tongue
        "UBERON_0000004", // Nose
        "UBERON_0001264", // Pancreas
        "UBERON_0001255", // Bladder
        "UBERON_0002240", // Spinal Cord
        "UBERON_0001870", // Frontal Lobe
        "UBERON_0001871", // Parietal Lobe
        "UBERON_0002021", // Occipital Lobe
        "UBERON_0002037", // Cerebellum
    ];

    // AEMT structures - more detailed, intermediate level
    const aemtStructures = [
        "UBERON_0000947", // Aorta
        "UBERON_0000977", // Pleura
        "UBERON_0003126", // Bronchus
        "UBERON_0001637", // Artery
        "UBERON_0002108", // Small Intestine
        "UBERON_0002114", // Duodenum
        "UBERON_0002110", // Gallbladder
        "UBERON_0002369", // Adrenal Gland
        "UBERON_0002046", // Thyroid
        "UBERON_0000029", // Lymph Node
        "UBERON_0002372", // Tonsil
        "UBERON_0001898", // Medulla
        "UBERON_0002079", // Tricuspid Valve
        "UBERON_0002084", // Mitral Valve
        "UBERON_0000341", // Pharynx
        "UBERON_0001043", // Esophagus
        "UBERON_0001905", // Temporal Lobe
    ];

    // Paramedic structures - advanced cardiac, neuro details
    const paramedicStructures = [
        "UBERON_0001897", // Pons
        "UBERON_0001896", // Midbrain
        "UBERON_0001894", // Diencephalon
        "UBERON_0002363", // Thalamus
        "UBERON_0001954", // Hypothalamus
        "UBERON_0002421", // Hippocampus
        "UBERON_0000956", // Cerebral Cortex
        "UBERON_0000451", // Prefrontal Cortex
        "UBERON_0001876", // Amygdala
        "UBERON_0003027", // Cingulate Cortex
        "UBERON_0002371", // Bone Marrow
        "UBERON_0001134", // Skeletal Muscle
        "UBERON_0001021", // Nerve
        "UBERON_0002116", // Ileum
        "UBERON_0001981", // Blood Vessel
    ];

    // Advanced - specialized neuroanatomy, basal ganglia, etc.
    const advancedStructures = [
        "UBERON_0001873", // Caudate
        "UBERON_0001874", // Putamen
        "UBERON_0001875", // Globus Pallidus
        "UBERON_0002360", // Substantia Nigra
        "UBERON_0002702", // Middle Frontal Gyrus
        "UBERON_0002148", // Locus Coeruleus
        "UBERON_0002771", // Angular Gyrus
        "UBERON_0001872", // Parietal Operculum
        "UBERON_0001882", // Nucleus Accumbens
        "UBERON_0002285", // Lateral Ventricles
    ];

    // Assign levels
    Object.keys(ANATOMY_DATA).forEach(id => {
        if (basicStructures.includes(id)) {
            ANATOMY_DATA[id].level = "basic";
        } else if (aemtStructures.includes(id)) {
            ANATOMY_DATA[id].level = "aemt";
        } else if (paramedicStructures.includes(id)) {
            ANATOMY_DATA[id].level = "paramedic";
        } else if (advancedStructures.includes(id)) {
            ANATOMY_DATA[id].level = "advanced";
        } else {
            ANATOMY_DATA[id].level = "paramedic"; // Default to paramedic
        }
    });
}

// Initialize levels on load
assignEMSLevels();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANATOMY_DATA, BODY_SYSTEMS, EMS_LEVELS };
}

