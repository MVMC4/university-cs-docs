import { MathText } from '@/components/interactive/math-text';
import type { Mat221ExamQuestion, Mat221WrittenQuestion } from '../lib/schemas';

export function Mat221QuestionBank({ questions }: { questions: Mat221WrittenQuestion[] }) {
  return <div className="mat221-question-bank">{questions.map((question, index) => (
    <details key={question.id}>
      <summary><span>Question {index + 1}</span><strong><MathText text={question.prompt} /></strong><em>{question.marks} marks</em></summary>
      <div><p className="mat221-question-label">Worked solution</p><MathText text={question.solution} /><p className="mat221-question-diagnostic"><strong>Diagnostic:</strong> {question.diagnostic}</p></div>
    </details>
  ))}</div>;
}

export function Mat221ExamPractice({ questions }: { questions: Mat221ExamQuestion[] }) {
  return <div className="mat221-question-bank mat221-exam-bank">{questions.map((question, index) => (
    <details key={question.id}>
      <summary><span>Exam problem {index + 1}</span><strong><MathText text={question.prompt} /></strong><em>{question.marks} marks · {question.minutes} minutes</em></summary>
      <div><p className="mat221-question-label">Model solution</p><MathText text={question.solution} /><p><strong>Marking notes:</strong> {question.markingNotes}</p><p className="mat221-question-diagnostic"><strong>Diagnostic:</strong> {question.diagnostic}</p></div>
    </details>
  ))}</div>;
}
