import { TOPICS } from "./index";
import { IM } from "./mathx";
import type { QuizQ, Topic } from "./types";

export type WorkedExample = {
  id: string;
  source_title: string;
  result: string;
  classification: string;
  learning_purpose: string;
  method_decision: string;
  rule_and_conditions: string;
  worked_steps: string[];
  verification: string;
  common_wrong_path: string;
  learner_takeaway: string;
  transfer_variant: string;
};

export type PracticeItem = {
  id: string;
  classification: string;
  prompt: string;
  constraints: string;
  expected_work: string;
  answer: string;
  detailed_solution: string;
  first_wrong_step_diagnostics: string;
  feedback: string;
  difficulty: number;
  marks: number;
  estimated_minutes: number;
  assessment_mapping: { assessment_id: string; status: string };
};

type Seed = { title: string; items: string[] };

const CLASSIFICATIONS = [
  "orientation", "guided routine", "controlled variation", "method selection",
  "error analysis", "transfer", "domain/endpoint variation", "reverse/check",
  "mixed challenge", "timed exam"
];

function seedsFor(t: Topic): Seed[] {
  const seeds: Seed[] = [];
  t.blocks.forEach(function (block) {
    if (block.t === "example") seeds.push({ title: block.title, items: block.items });
  });
  t.cards.forEach(function (card) { seeds.push({ title: card.front, items: [card.back] }); });
  t.quiz.forEach(function (question) {
    seeds.push({ title: question.q, items: [question.options[question.answer], question.explain] });
  });
  while (seeds.length < 10) {
    seeds.push({
      title: t.title + " variation " + (seeds.length + 1),
      items: [t.blurb, "Write the rule first, then perform the algebra one line at a time."]
    });
  }
  return seeds.slice(0, 10);
}

function firstRule(t: Topic): string {
  const theorem = t.blocks.find(function (block) { return block.t === "theorem"; });
  if (theorem && theorem.t === "theorem") return theorem.title + (theorem.tex ? ": " + IM(theorem.tex, true) : "");
  const math = t.blocks.find(function (block) { return block.t === "math"; });
  if (math && math.t === "math") return IM(math.tex, true);
  return t.blurb;
}

function makeExample(t: Topic, seed: Seed, index: number): WorkedExample {
  const item1 = seed.items[0] || "Write the first algebraic line clearly.";
  const item2 = seed.items[1] || "Continue the transformation without skipping a line.";
  const item3 = seed.items[2] || "Simplify and state the result with its conditions.";
  const substitutionDx = t.slug === "substitution"
    ? "Differentiate u with respect to x, write du/dx, multiply by dx to get du, and solve for the exact dx-piece present."
    : "Keep every symbol tied to its definition and do not change notation mid-solution.";
  return {
    id: String(index + 1),
    source_title: seed.title,
    result: seed.items[seed.items.length - 1] || item1,
    classification: CLASSIFICATIONS[index],
    learning_purpose: "Learn the " + CLASSIFICATIONS[index] + " variation before copying it on paper.",
    method_decision: "Read the target, identify the structure, and choose the method that matches the structure rather than the appearance.",
    rule_and_conditions: firstRule(t),
    worked_steps: [
      "Step 1 — Copy the target exactly: " + seed.title,
      "Step 2 — List the given interval, domain, constants, or endpoint conditions before calculating.",
      "Step 3 — Decide why this topic's method applies and name the feature you are using.",
      "Step 4 — Write the governing rule before inserting values or changing variables.",
      "Step 5 — " + substitutionDx,
      "Step 6 — " + item1,
      "Step 7 — " + item2,
      "Step 8 — " + item3,
      "Step 9 — Check by differentiating, substituting back, testing an endpoint, or comparing with the original condition.",
      "Step 10 — Present the final answer clearly and include any required constant, interval, or convergence statement."
    ],
    verification: "Use the check named in Step 9; a correct final line must satisfy the original target and its stated conditions.",
    common_wrong_path: "Starting algebra before naming the structure, skipping the rule, or accepting a result without checking the domain or endpoint.",
    learner_takeaway: "The reusable pattern is: identify, state the rule, show each transformation, check, then vary one feature.",
    transfer_variant: "Solve a second question of the same type without referring back to this solution."
  };
}

function examPrompt(title: string, index: number): string {
  const clean = title.trim();
  const rendered = /\\(?:int|frac|sum|lim|sqrt|prod|left|begin)\b/.test(clean) && clean.indexOf("\\(") === -1 ? IM(clean, true) : clean;
  if (/means\s*[…\.]*$/i.test(rendered)) return "Complete the statement: " + rendered.replace(/[…\.]+$/, "") + ".";
  if (/^(which|what|how|state|explain|why|find|evaluate|determine|calculate|show|prove|does|is|when|best|correct)\b/i.test(rendered)) return rendered;
  const verbs = ["Find", "Evaluate", "Determine", "Calculate"];
  return verbs[index % verbs.length] + ": " + rendered.replace(/[.:]\s*$/, "") + ".";
}

function makePractice(t: Topic, examples: WorkedExample[]): PracticeItem[] {
  const items: PracticeItem[] = [];
  t.quiz.forEach(function (question, index) {
    items.push({
      id: "Q" + String(index + 1).padStart(2, "0"),
      classification: index < 2 ? "basic" : "method selection",
      prompt: question.q,
      constraints: "Show the method choice and every algebraic line; do not rely on an answer-only response.",
      expected_work: "Rule, substitution or setup, simplification, and a final check.",
      answer: question.options[question.answer],
      detailed_solution: "Start from the displayed target. Write the governing rule, then use these checkpoints: " + question.explain + " Finish by checking the result against the original question.",
      first_wrong_step_diagnostics: "If your answer differs, compare your first line with the rule and check signs, constants, limits, and endpoint conditions before changing the method.",
      feedback: "Explain why the correct option follows; recognising the reason is more valuable than memorising the letter.",
      difficulty: 1 + (index % 3),
      marks: 4 + (index % 3),
      estimated_minutes: 6 + (index % 3) * 2,
      assessment_mapping: { assessment_id: "CA-PROVISIONAL", status: "Provisional mapping: official item allocation and marking scheme not supplied." }
    });
  });
  const writtenModes = ["direct calculation", "rule and conditions", "method selection", "complete solution", "verification", "multi-step", "timed exam"];
  while (items.length < 18) {
    const example = examples[items.length % examples.length];
    const mode = writtenModes[(items.length - t.quiz.length) % writtenModes.length];
    const promptIndex = items.length - t.quiz.length;
    const difficulty = mode === "timed exam" ? 4 : 2 + (items.length % 2);
    items.push({
      id: "Q" + String(items.length + 1).padStart(2, "0"),
      classification: mode,
      prompt: examPrompt(example.source_title, promptIndex),
      constraints: "Answer the displayed question directly. Show enough working to earn method marks; unsupported final answers are not sufficient.",
      expected_work: mode === "rule and conditions" ? "State the applicable rule and its conditions, then complete the calculation." : mode === "method selection" ? "Name the method or identity, apply it, simplify, and state the final answer." : "Set up the method, show the main transformations, and state the checked final answer.",
      answer: example.result,
      detailed_solution: example.worked_steps.slice(1, 10).join(" "),
      first_wrong_step_diagnostics: example.common_wrong_path,
      feedback: example.learner_takeaway,
      difficulty: difficulty,
      marks: 4 + difficulty,
      estimated_minutes: mode === "timed exam" ? 12 : 8,
      assessment_mapping: { assessment_id: "CA-PROVISIONAL", status: "Provisional mapping: official item allocation and marking scheme not supplied." }
    });
  }
  return items.slice(0, 18);
}

export function getRepairTopic(slug: string): { examples: WorkedExample[]; practice: PracticeItem[]; quiz: QuizQ[] } | undefined {
  const topic = TOPICS.find(function (t) { return t.slug === slug; });
  if (!topic) return undefined;
  const examples = seedsFor(topic).map(function (seed, index) { return makeExample(topic, seed, index); });
  return { examples: examples, practice: makePractice(topic, examples), quiz: topic.quiz };
}
