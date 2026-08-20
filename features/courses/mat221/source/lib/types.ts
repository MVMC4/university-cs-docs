/* ================= content blocks: discriminated union on `t` =================
   Each variant carries ONLY its own fields, so TypeScript enforces that a
   theorem has title+body, a math block has tex, etc. No more god-object. */
export type PBlock = { t: "p"; md: string };
export type MathBlock = { t: "math"; tex: string };
export type TheoremBlock = { t: "theorem"; title: string; body: string; tag?: string; tex?: string };
export type StepsBlock = { t: "steps"; items: string[] };
export type ListBlock = { t: "list"; items: string[] };
export type ExampleBlock = { t: "example"; title: string; items: string[] };
export type WhyBlock = { t: "why"; text: string };
export type TrapBlock = { t: "trap"; title: string; text: string };
export type VisualBlock = { t: "visual"; img: string; title: string; caption?: string; tex?: string; items?: string[] };
export type Block =
  | PBlock | MathBlock | TheoremBlock | StepsBlock | ListBlock
  | ExampleBlock | WhyBlock | TrapBlock | VisualBlock;

export type Card = { front: string; back: string; note?: string };
export type QuizQ = { q: string; options: string[]; answer: number; explain: string };
export type Cue = { cue: string; note: string };
export type Trap = { title: string; text: string };

export type Topic = {
  slug: string; num: string; week: string; title: string; blurb: string;
  blocks: Block[]; cornell: { cues: Cue[]; summary: string };
  cards: Card[]; quiz: QuizQ[]; traps: Trap[];
};

/* Slim shape for the client Sidebar so the full content graph never crosses
   the server/client boundary. */
export type TopicLink = { slug: string; num: string; title: string };

export type Extra = { blocks?: Block[]; cards?: Card[]; quiz?: QuizQ[]; traps?: Trap[]; cues?: Cue[] };
export type DeepSection = { h: string; paras?: string[]; math?: string[]; steps?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] }; example?: { title: string; items: string[] }; why?: string; visual?: { img: string; title: string; caption: string } };
export type ResourceCard = { icon: string; title: string; desc: string; tag: string; href?: string; thumbnail?: string; logo?: string };
export type ResourceGroup = { group: string; blurb: string; cards: ResourceCard[] };
export type FormulaItem = { name: string; tex: string; note?: string };
export type FormulaGroup = { group: string; items: FormulaItem[] };
export type WeekPlan = { week: string; dates: string; focus: string; topics: string; milestone?: string };
export type Assessment = { name: string; date: string; time: string; venue: string; weight: string };
