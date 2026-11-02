export type Spark = {
  id: string;
  question: string;
  answer: string;
  followUps: string[];
  keywords: string[];
};

export const SPARKS: Spark[] = [
  {
    id: "trump-uk",
    question: "Why is Trump so unpopular in the UK?",
    answer:
      "A HuffPost UK poll finds Donald Trump deeply unpopular with British voters, days after he threatened to cut US trade with Europe. The reaction in Westminster has been blunt — one response summed it up as \"what a buffoon\".",
    followUps: [
      "What did Trump threaten to do to Europe?",
      "How are UK politicians responding?",
    ],
    keywords: ["trump", "unpopular", "poll", "uk", "america", "president"],
  },
  {
    id: "trump-trade",
    question: "What did Trump threaten to do to Europe?",
    answer:
      "Trump threatened to cut off US trade with Europe. HuffPost UK reports the threat was immediately torched in Britain, and it has fed a wider row about how unpopular he already is here.",
    followUps: [
      "Why is Trump so unpopular in the UK?",
      "Does this change anything for Starmer?",
    ],
    keywords: ["trade", "europe", "tariff", "cut off", "buffoon"],
  },
  {
    id: "farage",
    question: "What happened in the Farage donations sting?",
    answer:
      "Channel 4's donations sting has hit Nigel Farage's popularity. HuffPost UK reports the fallout is still moving: Reform UK is described as being in complete meltdown after more councillors quit.",
    followUps: [
      "Is Reform UK falling apart?",
      "How badly has Farage's popularity dropped?",
    ],
    keywords: ["farage", "reform", "donation", "sting", "channel"],
  },
  {
    id: "reform",
    question: "Is Reform UK falling apart?",
    answer:
      "HuffPost UK says Reform is in complete meltdown after three more councillors quit, on top of the damage from the Channel 4 donations sting around Nigel Farage.",
    followUps: [
      "What happened in the Farage donations sting?",
      "Where does that leave Starmer?",
    ],
    keywords: ["reform", "councillor", "meltdown", "quit"],
  },
  {
    id: "starmer",
    question: "Why are people calling for Starmer to resign?",
    answer:
      "Keir Starmer is facing down Labour rebels as resignation calls get louder. HuffPost UK's politics desk is tracking it as an internal fight, not a settled outcome.",
    followUps: [
      "Is Reform UK falling apart?",
      "Why is Trump so unpopular in the UK?",
    ],
    keywords: ["starmer", "resign", "labour", "rebel"],
  },
  {
    id: "macklemore",
    question: "What did Macklemore pledge, and why?",
    answer:
      "Macklemore has pledged $1 million to charities helping Palestinians, after fallout from his tour. HuffPost UK is treating it as a response to that backlash, not a one-off stunt.",
    followUps: [
      "Which charities is the money going to?",
      "What was the tour fallout about?",
    ],
    keywords: ["macklemore", "pledge", "palestinian", "gaza", "tour"],
  },
  {
    id: "shoes",
    question: "Which shoes will fashion people want this autumn?",
    answer:
      "Damson Madder x Clarks. HuffPost UK's life desk says they are the pair fashion people will want this autumn.",
    followUps: [
      "Are they actually wearable every day?",
      "What else is HuffPost saying about autumn style?",
    ],
    keywords: ["shoe", "clarks", "fashion", "damson", "autumn"],
  },
  {
    id: "weather",
    question: "Will a super El Ni\u00f1o change the UK winter?",
    answer:
      "HuffPost UK says a super El Ni\u00f1o is on the way and will change UK weather this winter. The piece is about the impact here, not a global climate roundup.",
    followUps: [
      "How cold will it actually get?",
      "When does it start to show up?",
    ],
    keywords: ["el nino", "elnino", "weather", "winter", "cold", "rain"],
  },
];

const IMAGES: Record<string, string> = {
  "trump-uk": "stories/trump-gala.jpg",
  "trump-trade": "stories/trump.jpg",
  farage: "stories/farage.jpg",
  reform: "stories/farage-speech.jpg",
  starmer: "stories/starmer.jpg",
  macklemore: "stories/macklemore.jpg",
  shoes: "stories/fashion.jpg",
  weather: "stories/weather.jpg",
};

export const ASK_PLACEHOLDER = "Ask HuffPost Anything";

export function imageFor(question: string): string {
  const exact = SPARKS.find((spark) => spark.question === question);
  if (exact) return IMAGES[exact.id];
  const parent = SPARKS.find((spark) => spark.followUps.includes(question));
  if (parent) return IMAGES[parent.id];
  const q = question.toLowerCase();
  const hit = SPARKS.find((spark) => spark.keywords.some((word) => q.includes(word)));
  return IMAGES[hit?.id ?? "trump-uk"];
}

export function sparksFor(query: string): Spark[] {
  const q = query.trim().toLowerCase();
  if (!q) return SPARKS.slice(0, 4);
  const matched = SPARKS.filter(
    (spark) =>
      spark.question.toLowerCase().includes(q) ||
      spark.keywords.some((word) => q.includes(word) || word.includes(q)),
  );
  return (matched.length > 0 ? matched : SPARKS).slice(0, 4);
}

export function answerFor(query: string): {
  question: string;
  answer: string;
  followUps: string[];
} {
  const q = query.trim().toLowerCase();
  const ranked = SPARKS.map((spark) => {
    const hits = spark.keywords.reduce(
      (count, word) => (q.includes(word) ? count + 2 : count),
      0,
    );
    const asked = spark.question.toLowerCase() === q ? 5 : 0;
    return { spark, score: hits + asked };
  }).sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (best && best.score > 0) {
    return {
      question: query.trim() || best.spark.question,
      answer: best.spark.answer,
      followUps: best.spark.followUps,
    };
  }

  return {
    question: query.trim(),
    answer:
      "HuffPost hasn't published a direct answer to that. What readers are asking instead is about Trump's standing in Britain, the Farage donations sting, and whether a super El Ni\u00f1o changes this winter.",
    followUps: SPARKS.slice(0, 3).map((spark) => spark.question),
  };
}
