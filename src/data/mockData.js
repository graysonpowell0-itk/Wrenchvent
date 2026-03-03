export const sessions = [
  {
    id: "s1",
    date: "Yesterday",
    type: "fix",
    vent: 94,
    peak: "frustrated",
    resolved: "relieved",
    calmMethod: "breathing + empathy",
    calmScore: 4,
    cat: "HVAC",
    equip: "Carrier PTAC 42B",
    room: "412",
    issue: "PTAC condensate drain clogged",
    resolution: "Wet vac + vinegar flush",
    steps: [
      "Kill power",
      "Locate drain pan",
      "Wet vac drain outlet",
      "Vinegar-water flush",
      "Restore power"
    ],
    worked: true,
    quotes: ["that actually worked", "way easier than I thought"],
    rants: ["constant callbacks", "understaffed", "same issue different room"],
    intensity: 78,
    note: "Guest complained twice.",
    convo: [
      { f: "ai", t: "What's going on?" },
      { f: "user", t: "PTAC in 412 blowing warm air again." },
      { f: "ai", t: "Those Carrier 42Bs are notorious. Snap me a photo?" },
      { f: "user", t: "📷 [Photo — PTAC unit]" },
      { f: "ai", t: "Clogged condensate drain. Kill power, wet vac, vinegar flush." },
      { f: "user", t: "That actually worked." }
    ]
  },
  {
    id: "s2",
    date: "2 days ago",
    type: "fix",
    vent: 142,
    peak: "angry",
    resolved: "calm",
    calmMethod: "validation + humor",
    calmScore: 5,
    cat: "Plumbing",
    equip: "Moen Cartridge",
    room: "218",
    issue: "Faucet leak — cartridge worn",
    resolution: "Replaced Moen 1222 cartridge",
    steps: [
      "Shut off water",
      "Remove handle cap",
      "Pull retaining clip",
      "Extract old cartridge",
      "Grease O-rings",
      "Reassemble"
    ],
    worked: true,
    quotes: ["finally no more dripping"],
    rants: ["guests complaining", "no parts in stock"],
    intensity: 85,
    note: "Drove 20 min for part.",
    convo: []
  },
  {
    id: "s3",
    date: "4 days ago",
    type: "fix",
    vent: 67,
    peak: "anxious",
    resolved: "confident",
    calmMethod: "reassurance",
    calmScore: 5,
    cat: "Lock",
    equip: "Vingcard Essence",
    room: "305",
    issue: "Vingcard lock red LED",
    resolution: "Battery replacement + reset",
    steps: [
      "Override key",
      "Replace 4 AA batteries",
      "Wait 10 sec",
      "Sync programmer",
      "Test keycard"
    ],
    worked: true,
    quotes: ["didn't know about the 10 second wait"],
    rants: ["guest locked out", "front desk slow"],
    intensity: 62,
    note: "Battery schedule overdue.",
    convo: []
  },
  {
    id: "s4",
    date: "6 days ago",
    type: "vent",
    vent: 210,
    peak: "overwhelmed",
    resolved: "better",
    calmMethod: "active listening",
    calmScore: 3,
    cat: "General",
    equip: null,
    room: null,
    issue: null,
    resolution: null,
    steps: [],
    worked: null,
    quotes: ["just needed to get that off my chest"],
    rants: ["short-staffed", "12 work orders", "no backup tech"],
    intensity: 92,
    note: null,
    convo: []
  }
];

export const voices = [
  {
    id: "ito",
    name: "Ito",
    gender: "Male",
    accent: "American",
    age: "Adult",
    desc: "Hume's signature male voice. Calm, clear, and reassuring — perfect for walking through repair steps without adding stress.",
    tags: ["Calm", "Clear", "Steady"],
    color: "#5B99BE",
    sample: "Alright, let's take this one step at a time. Kill the power first, then we'll locate that drain pan together."
  },
  {
    id: "kora",
    name: "Kora",
    gender: "Female",
    accent: "American, California",
    age: "Young Adult",
    desc: "Hume's signature female voice. Warm and empathetic with natural expressiveness — great for the vent phase when you need to feel heard.",
    tags: ["Warm", "Empathetic", "Expressive"],
    color: "#C77DBA",
    sample: "I hear you. That sounds incredibly frustrating. Take a breath — we'll figure this out."
  },
  {
    id: "stella",
    name: "Stella",
    gender: "Female",
    accent: "British",
    age: "Adult",
    desc: "Sophisticated and composed. A steady British narrator voice that keeps things professional and organized during complex troubleshooting.",
    tags: ["Professional", "Composed", "British"],
    color: "#9F8FD8",
    sample: "Right then. Based on what you've described, this appears to be a condensate drainage issue. Let's address it systematically."
  },
  {
    id: "dacher",
    name: "Dacher",
    gender: "Male",
    accent: "American",
    age: "Middle-aged",
    desc: "Deep, grounded, and reassuring. Like a veteran maintenance supervisor who's seen it all and knows exactly what to do.",
    tags: ["Deep", "Grounded", "Experienced"],
    color: "#E8793B",
    sample: "Yeah, I've seen this a hundred times. Don't sweat it — here's exactly what you need to do."
  },
  {
    id: "finn",
    name: "Finn",
    gender: "Male",
    accent: "American, Midwest",
    age: "Young Adult",
    desc: "Upbeat and encouraging with a friendly Midwest warmth. Keeps energy positive even when the job is tough.",
    tags: ["Friendly", "Upbeat", "Encouraging"],
    color: "#4ADE80",
    sample: "Hey, you've totally got this! Same thing happened in 218 last week and you nailed it. Let's go."
  },
  {
    id: "rio",
    name: "Rio",
    gender: "Non-binary",
    accent: "American",
    age: "Young Adult",
    desc: "Smooth and direct with a no-nonsense delivery. Cuts through the noise and gets straight to solutions.",
    tags: ["Direct", "Smooth", "Efficient"],
    color: "#F59E0B",
    sample: "Okay. PTAC unit, warm air, Room 412. I know exactly what this is. Here's the fix."
  }
];

export const voiceDescriptions = {
  ito: "A calm, clear adult male voice with a steady, reassuring American accent. Measured and patient.",
  kora: "A warm, empathetic young adult female voice with a Californian American accent. Naturally expressive and caring.",
  stella: "A sophisticated, composed adult British female voice. Professional, steady, and articulate with gentle warmth.",
  dacher: "A deep, grounded middle-aged American male voice. Speaks with authority and hard-earned wisdom, like a veteran supervisor.",
  finn: "An upbeat, friendly young adult male voice with a warm Midwest American accent. Encouraging and positive energy.",
  rio: "A smooth, direct young adult voice with a neutral American accent. Efficient and clear, no-nonsense delivery."
};
