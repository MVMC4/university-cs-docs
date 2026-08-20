import {
  assertNoGeneratedFiller,
  validateQuizQuestions,
  validateStudyRecords,
  validateWorkedExamples,
  type Mat221ExamQuestion,
  type Mat221Flashcard,
  type Mat221QuizQuestion,
  type Mat221WrittenQuestion,
  type WorkedExample,
} from './schemas';

export function validateMat221TopicRecords(input: {
  examples: WorkedExample[];
  flashcards: Mat221Flashcard[];
  quiz: Mat221QuizQuestion[];
  questions: Mat221WrittenQuestion[];
  examPractice: Mat221ExamQuestion[];
}) {
  validateWorkedExamples(input.examples);
  validateQuizQuestions(input.quiz);
  validateStudyRecords(input);
  assertNoGeneratedFiller(input);
  return input;
}
