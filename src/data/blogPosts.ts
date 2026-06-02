export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  callout?: { title: string; items: string[] };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: string; // emoji
  gradient: string; // tailwind classes
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "conjunctivitis-pink-eye",
    title: "Conjunctivitis (Pink Eye): Causes, Types & Treatment",
    excerpt:
      "Pink Eye is one of the most common eye infections. Learn how it spreads, how to recognise it early, and the right treatment for viral, bacterial and allergic forms.",
    category: "Eye Infections",
    readTime: "6 min read",
    date: "Jun 2, 2026",
    icon: "👁️",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Conjunctivitis, commonly known as Pink Eye, is an inflammation or infection of the conjunctiva — the thin transparent membrane that covers the white part of the eye and the inner surface of the eyelids. When irritated, tiny blood vessels in the conjunctiva enlarge, making the eye appear red or pink.",
          "It affects people of all ages. Most cases are mild and treatable, but certain forms spread rapidly and need prompt medical attention. Hygiene, early diagnosis and the right treatment prevent complications and transmission.",
        ],
      },
      {
        heading: "Types of Conjunctivitis",
        paragraphs: [
          "1. Viral Conjunctivitis — caused by viruses, often along with a common cold. Symptoms include watery eyes, redness, burning and mild swelling. Highly contagious.",
          "2. Bacterial Conjunctivitis — thick yellow discharge, swollen eyelids, crusting and eyelids that stick together in the morning.",
          "3. Allergic Conjunctivitis — triggered by pollen, dust or pet dander. Intense itching, watery eyes and redness in both eyes.",
        ],
      },
      {
        heading: "Common Symptoms",
        list: [
          "Red or pink eye",
          "Itching or burning",
          "Eye discharge",
          "Excessive tearing",
          "Swollen eyelids",
          "Sensitivity to light",
        ],
      },
      {
        heading: "How It Spreads",
        paragraphs: [
          "Viral and bacterial conjunctivitis spread through direct contact — towels, makeup, hands and contaminated surfaces.",
        ],
      },
      {
        heading: "Treatment",
        paragraphs: [
          "Viral: lubricating drops and cold compress — usually resolves on its own.",
          "Bacterial: antibiotic eye drops shorten recovery.",
          "Allergic: avoid allergens and use anti-allergy drops.",
        ],
      },
      {
        callout: {
          title: "When to see a doctor",
          items: [
            "Vision becomes blurry",
            "Severe eye pain",
            "Symptoms worsen rapidly",
            "Thick discharge persists",
            "Symptoms last more than a few days",
          ],
        },
      },
    ],
  },
  {
    slug: "diabetic-retinopathy",
    title: "Diabetic Retinopathy: Protecting Vision in Diabetes",
    excerpt:
      "High blood sugar quietly damages the tiny blood vessels of the retina. Understand the stages, warning signs and modern treatments that prevent blindness.",
    category: "Retina",
    readTime: "7 min read",
    date: "Jun 2, 2026",
    icon: "🩸",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Diabetic Retinopathy is a serious eye disease caused by complications of diabetes. High blood sugar damages the tiny blood vessels of the retina — the light-sensitive layer at the back of the eye. Vessels may leak fluid, bleed or become blocked, leading to vision loss if untreated.",
          "It is one of the leading causes of vision loss in adults worldwide. Early diagnosis and proper diabetes control are essential to preserve sight.",
        ],
      },
      {
        heading: "Stages of the Disease",
        paragraphs: [
          "1. Mild Non-Proliferative (NPDR) — small bulges (microaneurysms) form in retinal vessels. Often no symptoms.",
          "2. Moderate to Severe NPDR — more vessels block, reducing oxygen supply. Blurred vision, floaters and reading difficulty appear.",
          "3. Proliferative (PDR) — abnormal new vessels grow due to oxygen deprivation, leading to bleeding, retinal detachment and severe vision loss.",
          "Diabetic Macular Edema (DME) — fluid leakage causes swelling of the macula, distorting central vision.",
        ],
      },
      {
        heading: "Symptoms to Watch For",
        list: [
          "Blurred or fluctuating vision",
          "Floaters and dark spots",
          "Poor night vision",
          "Sudden vision loss (advanced cases)",
        ],
      },
      {
        heading: "Risk Factors",
        list: [
          "Poorly controlled diabetes",
          "Long duration of diabetes",
          "High blood pressure & cholesterol",
          "Smoking",
          "Pregnancy in diabetic patients",
        ],
      },
      {
        heading: "Treatment",
        paragraphs: [
          "Blood sugar control is the most important preventive measure. Laser photocoagulation seals leaking vessels. Anti-VEGF injections reduce abnormal vessel growth and swelling. Advanced cases may need vitrectomy surgery.",
        ],
      },
      {
        callout: {
          title: "Prevention checklist",
          items: [
            "Maintain controlled blood sugar",
            "Monitor blood pressure",
            "Follow a healthy diet & exercise",
            "Avoid smoking",
            "Annual dilated retinal screening",
          ],
        },
      },
    ],
  },
  {
    slug: "digital-eye-strain",
    title: "Digital Eye Strain: Modern Eyes, Modern Problems",
    excerpt:
      "Hours on screens leave your eyes dry, tired and blurred. Learn why it happens and how the 20-20-20 rule can transform your daily comfort.",
    category: "Lifestyle",
    readTime: "6 min read",
    date: "Jun 2, 2026",
    icon: "💻",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Computer Vision Syndrome (CVS), or Digital Eye Strain, is a group of vision-related problems caused by prolonged use of digital devices. Screens force the eyes to work harder, leading to fatigue, dryness and blurred vision.",
          "Reduced blinking, glare and poor posture all add up — and even though symptoms are usually temporary, persistent strain affects comfort and productivity.",
        ],
      },
      {
        heading: "Why Screens Strain the Eyes",
        list: [
          "Blink rate drops from 15–20/min to just 5–7/min",
          "Tears evaporate faster, eyes become dry",
          "Eye muscles stay under constant focus stress",
          "Glare and flicker increase visual fatigue",
        ],
      },
      {
        heading: "Common Symptoms",
        list: [
          "Eye strain & burning",
          "Dry, gritty eyes",
          "Blurred vision",
          "Headaches",
          "Neck and shoulder pain",
          "Light sensitivity",
        ],
      },
      {
        heading: "The 20-20-20 Rule",
        paragraphs: [
          "Every 20 minutes, look at something 20 feet away, for at least 20 seconds. This simple habit relaxes the focusing muscles and dramatically reduces eye fatigue.",
        ],
      },
      {
        heading: "Proper Screen Setup",
        list: [
          "Screen 20–28 inches from eyes",
          "Slightly below eye level",
          "Reduce glare with proper lighting",
          "Use artificial tears if eyes feel dry",
        ],
      },
      {
        callout: {
          title: "Daily habits to protect your eyes",
          items: [
            "Blink frequently",
            "Take regular screen breaks",
            "Stay hydrated",
            "Reduce screen brightness in dark rooms",
            "Limit unnecessary screen time",
          ],
        },
      },
    ],
  },
  {
    slug: "dry-eye-syndrome",
    title: "Dry Eye Syndrome: Why Your Eyes Burn & Itch",
    excerpt:
      "Healthy tears keep your vision sharp. When the tear film breaks down, eyes burn, blur and tire fast. Here's what causes Dry Eye and how to treat it.",
    category: "General Eye Care",
    readTime: "6 min read",
    date: "Jun 2, 2026",
    icon: "💧",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Dry Eye Syndrome (Dry Eye Disease) occurs when the eyes either don't produce enough tears or tears evaporate too quickly. The tear film keeps your cornea smooth, nourished and protected.",
          "With increasing screen time, AC environments and pollution, Dry Eye has become one of the most common eye complaints worldwide.",
        ],
      },
      {
        heading: "The Tear Film",
        paragraphs: [
          "A healthy tear film has three layers: an outer oil layer (prevents evaporation), a middle water layer (provides moisture) and an inner mucus layer (spreads tears evenly). When any layer is disturbed, Dry Eye develops.",
        ],
      },
      {
        heading: "Two Main Types",
        paragraphs: [
          "Aqueous Deficient — tear glands don't produce enough tears (aging, autoimmune disease, certain medications).",
          "Evaporative — tears evaporate too quickly due to poor oil layer or Meibomian gland dysfunction (screens, wind, AC).",
        ],
      },
      {
        heading: "Symptoms",
        list: [
          "Burning sensation",
          "Itching & redness",
          "Gritty feeling — like sand in the eyes",
          "Blurred vision",
          "Watery eyes (paradoxical)",
          "Eye fatigue & light sensitivity",
        ],
      },
      {
        heading: "Treatment Options",
        list: [
          "Artificial tears for daily lubrication",
          "Warm compress to open oil glands",
          "Eyelid hygiene",
          "Prescription anti-inflammatory drops",
          "Lifestyle changes — hydration, omega-3, screen breaks",
        ],
      },
      {
        callout: {
          title: "Prevention tips",
          items: [
            "Follow the 20-20-20 rule",
            "Blink frequently",
            "Use a humidifier in dry air",
            "Wear sunglasses outdoors",
            "Eat omega-3 rich foods",
          ],
        },
      },
    ],
  },
  {
    slug: "glaucoma",
    title: "Glaucoma: The Silent Thief of Sight",
    excerpt:
      "Glaucoma damages the optic nerve silently — often without symptoms — until vision is permanently lost. Learn the types, tests and treatments that save sight.",
    category: "Glaucoma",
    readTime: "7 min read",
    date: "Jun 2, 2026",
    icon: "🔍",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Glaucoma is a progressive eye disease that damages the optic nerve, the structure that carries visual signals from the eye to the brain. It is often associated with increased intraocular pressure (IOP). Untreated, it leads to permanent vision loss.",
          "It's called the 'Silent Thief of Sight' because vision loss develops slowly and painlessly. Many people don't realise they have it until significant damage has occurred.",
        ],
      },
      {
        heading: "Types of Glaucoma",
        paragraphs: [
          "1. Open-Angle Glaucoma — most common. Drainage channels slowly become blocked, pressure rises gradually. Often painless and unnoticed early.",
          "2. Angle-Closure Glaucoma — a medical emergency. Sudden severe eye pain, blurred vision, headache, nausea and halos around lights.",
          "3. Normal-Tension Glaucoma — optic nerve damage despite normal eye pressure. Linked to poor blood flow.",
        ],
      },
      {
        heading: "Risk Factors",
        list: [
          "Age above 40",
          "Family history of glaucoma",
          "Diabetes & high blood pressure",
          "Long-term steroid use",
          "Eye injuries",
          "Severe myopia",
        ],
      },
      {
        heading: "Diagnosis",
        list: [
          "Tonometry (eye pressure)",
          "Visual field test",
          "Optic nerve examination",
          "OCT scan",
          "Gonioscopy",
        ],
      },
      {
        heading: "Treatment",
        paragraphs: [
          "The goal is to reduce eye pressure and prevent further optic nerve damage. Medicated eye drops are the most common treatment. Laser procedures improve fluid drainage. Surgery creates a new drainage pathway for advanced cases.",
        ],
      },
      {
        callout: {
          title: "Important note",
          items: [
            "Optic nerve damage cannot be reversed",
            "Regular eye check-ups detect glaucoma early",
            "Detect early • Treat early • Protect your vision",
          ],
        },
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);