/**
 * Quiz content lives in JSON files under content/quiz-data, mirroring the path of the page that uses it:
 *
 *   content/quiz-data/sem3/csi243/01-functional-thinking/notes/functional-thinking.json
 *
 * A page references a quiz from MDX with <QuizRef src="<path without .json>" id="<quiz id>" />.
 * Keeping the questions out of the MDX keeps notes readable and lets the data be validated and reused on its own.
 */

export type QuizLevel = 'foundation' | 'developing' | 'exam';

export type QuizQuestionData = {
  /** A stable id. If missing, one is derived from the question text; set it so editing the wording keeps a reader's saved answer. */
  id?: string;
  question: string;
  /** A program or snippet shown beneath the question. An array is one entry per line. */
  code?: string | string[];
  options: string[];
  correctIndex: number;
  explanation?: string;
  optionFeedback?: string[];
  /** The topic or section the question belongs to; the chooser lets a reader pick groups. */
  group?: string;
  /** How hard the question is: foundation, developing, or exam-style. */
  level?: QuizLevel;
  /** A short worked solution shown after answering. */
  steps?: string[];
  /** Where the question comes from, for example a past paper and question number. */
  source?: string;
};

export type QuizData = {
  title?: string;
  questions: QuizQuestionData[];
};

export type QuizFile = {
  quizzes: Record<string, QuizData>;
};

const SAFE_PATH = /^[A-Za-z0-9][A-Za-z0-9/_.-]*$/;

export async function loadQuiz(src: string, id: string) {
  if (!SAFE_PATH.test(src) || src.includes('..')) {
    throw new Error(`QuizRef: invalid src "${src}".`);
  }

  let file: QuizFile;
  try {
    const module_ = await import(`@/content/quiz-data/${src}.json`);
    file = (module_.default ?? module_) as QuizFile;
  } catch {
    throw new Error(`QuizRef: no quiz data file at content/quiz-data/${src}.json.`);
  }

  const quiz = file.quizzes?.[id];
  if (!quiz) {
    const known = Object.keys(file.quizzes ?? {}).join(', ') || 'none';
    throw new Error(`QuizRef: quiz "${id}" is not in content/quiz-data/${src}.json (known ids: ${known}).`);
  }

  return {
    title: quiz.title,
    questions: quiz.questions.map((question) => ({
      ...question,
      code: Array.isArray(question.code) ? question.code.join('\n') : question.code,
    })),
  };
}
