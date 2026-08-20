export type Mat221TopicWave = 'A' | 'B' | 'C' | 'D';

export type Mat221TopicManifest = {
  order: number;
  title: string;
  sourceSlug: string;
  slug: string;
  wave: Mat221TopicWave;
  prerequisites: string[];
  objectives: string[];
  assets: string[];
};

export type WorkedExample = {
  id: string;
  number: number;
  title: string;
  difficulty: 'foundation' | 'developing' | 'exam-ready';
  purpose: string;
  prompt: string;
  recognition: string;
  methodDecision: string;
  ruleAndConditions: string;
  steps: Array<{ title: string; explanation: string; math?: string }>;
  answer: string;
  verification: string;
  commonWrongPath: string;
  transferPrompt?: string;
};

export type Mat221Flashcard = {
  id: string;
  front: string;
  back: string;
  note?: string;
};

export type Mat221QuizQuestion = {
  id: string;
  question: string;
  options: [string, string, ...string[]];
  correctIndex: number;
  explanation: string;
};

export type Mat221WrittenQuestion = {
  id: string;
  prompt: string;
  marks: number;
  solution: string;
  diagnostic: string;
};

export type Mat221ExamQuestion = Mat221WrittenQuestion & {
  minutes: number;
  markingNotes: string;
};

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`MAT221 content validation: ${message}`);
}

export function validateWorkedExamples(examples: WorkedExample[]) {
  invariant(examples.length >= 8, 'each topic requires at least eight explicit worked examples');
  const ids = new Set<string>();
  const numbers = new Set<number>();

  examples.forEach((example, index) => {
    invariant(example.id.trim(), `example ${index + 1} has no id`);
    invariant(!ids.has(example.id), `duplicate example id "${example.id}"`);
    invariant(example.number === index + 1, `example numbers must be sequential from one`);
    invariant(!numbers.has(example.number), `duplicate example number ${example.number}`);
    invariant(example.steps.length > 0, `example "${example.id}" has no explained steps`);
    invariant(example.verification.trim(), `example "${example.id}" has no verification`);
    invariant(example.commonWrongPath.trim(), `example "${example.id}" has no wrong-path diagnostic`);
    ids.add(example.id);
    numbers.add(example.number);
  });
}

export function validateQuizQuestions(questions: Mat221QuizQuestion[]) {
  invariant(questions.length >= 6, 'each topic requires at least six explained quiz questions');
  questions.forEach((question) => {
    invariant(question.options.length >= 2, `quiz "${question.id}" needs at least two choices`);
    invariant(question.correctIndex >= 0 && question.correctIndex < question.options.length, `quiz "${question.id}" has an invalid correct index`);
    invariant(question.explanation.trim(), `quiz "${question.id}" needs an explanation`);
  });
}

export function validateStudyRecords(input: {
  flashcards: Mat221Flashcard[];
  questions: Mat221WrittenQuestion[];
  examPractice: Mat221ExamQuestion[];
}) {
  invariant(input.flashcards.length >= 10, 'each topic requires at least ten reviewed flashcards');
  invariant(input.questions.length >= 6, 'each topic requires at least six written questions');
  invariant(input.examPractice.length >= 3, 'each topic requires at least three exam-practice questions');

  const ids = [
    ...input.flashcards.map((record) => record.id),
    ...input.questions.map((record) => record.id),
    ...input.examPractice.map((record) => record.id),
  ];
  invariant(new Set(ids).size === ids.length, 'study records contain duplicate ids');

  input.flashcards.forEach((card) => {
    invariant(card.front.trim() && card.back.trim(), `flashcard "${card.id}" is incomplete`);
  });
  [...input.questions, ...input.examPractice].forEach((question) => {
    invariant(question.prompt.trim() && question.solution.trim() && question.diagnostic.trim(), `question "${question.id}" is incomplete`);
    invariant(question.marks > 0, `question "${question.id}" must award marks`);
  });
}

export const prohibitedGeneratedContentPatterns = [
  /topic variation \d+/i,
  /continue the algebra/i,
  /apply the rule\.?$/i,
  /generic constraint/i,
  /repair topic/i,
];

export function assertNoGeneratedFiller(records: unknown) {
  const text = JSON.stringify(records);
  prohibitedGeneratedContentPatterns.forEach((pattern) => {
    invariant(!pattern.test(text), `prohibited generated-content pattern ${pattern} found`);
  });
}
