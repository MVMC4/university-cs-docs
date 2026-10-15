'use client';
import { useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { MathText } from './math-text';

type Question = {
  question: string;
  /** Optional program or snippet shown in a code block beneath the question text. */
  code?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  /** Optional per-option feedback, same length/order as `options`. Shown for
   *  whichever option the student picked instead of the shared `explanation`. */
  optionFeedback?: string[];
};

/** Renders `inline code` spans as <code> and passes everything else through MathText. */
const RichText = ({ text }: { text: string }) => {
  const parts = text.split(/(`[^`\n]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
          <code key={index}>{part.slice(1, -1)}</code>
        ) : (
          <MathText key={index} text={part} />
        ),
      )}
    </>
  );
};

type QuizProps = {
  title?: string;
  questions?: Question[];
};

type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dim';

/** The one scored multiple-choice quiz used on review pages in every course. */
export function Quiz({ title = 'Knowledge check', questions = [] }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  if (questions.length === 0) {
    return (
      <section className="ui-quiz">
        <header className="ui-quiz-head"><h3>{title}</h3></header>
        <p className="ui-quiz-empty">No questions for this section yet.</p>
      </section>
    );
  }

  const answered = Object.keys(answers).length;
  const missing = questions.length - answered;
  const score = isSubmitted ? questions.reduce((total, q, i) => total + (answers[i] === q.correctIndex ? 1 : 0), 0) : 0;

  const select = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setAnswers((previous) => ({ ...previous, [qIndex]: optIndex }));
  };

  const submit = () => {
    if (missing > 0) {
      setShowMissing(true);
      return;
    }
    setShowMissing(false);
    setIsSubmitted(true);
  };

  const reset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowMissing(false);
  };

  const optionState = (q: Question, qIndex: number, optIndex: number): OptionState => {
    if (!isSubmitted) return answers[qIndex] === optIndex ? 'selected' : 'idle';
    if (optIndex === q.correctIndex) return 'correct';
    if (answers[qIndex] === optIndex) return 'wrong';
    return 'dim';
  };

  return (
    <section className="ui-quiz">
      <header className="ui-quiz-head">
        <h3>{title}</h3>
        <span className="ui-quiz-stats">
          {isSubmitted ? `Score ${score} / ${questions.length}` : `${answered} of ${questions.length} answered`}
        </span>
      </header>

      <ol className="ui-quiz-list">
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          const isCorrect = selected === q.correctIndex;
          const feedback = isCorrect ? q.explanation : q.optionFeedback?.[selected] || q.explanation;
          const unanswered = showMissing && selected === undefined;
          return (
            <li key={qIndex} className="ui-quiz-q" data-unanswered={unanswered || undefined}>
              <p className="ui-quiz-prompt"><RichText text={q.question} /></p>
              {q.code && <pre className="ui-quiz-code"><code>{q.code}</code></pre>}
              <div className="ui-quiz-options" role="radiogroup" aria-label={`Question ${qIndex + 1}`}>
                {q.options.map((option, optIndex) => {
                  const state = optionState(q, qIndex, optIndex);
                  return (
                    <button
                      key={optIndex}
                      type="button"
                      role="radio"
                      aria-checked={selected === optIndex}
                      className="ui-quiz-option"
                      data-state={state}
                      onClick={() => select(qIndex, optIndex)}
                      disabled={isSubmitted}
                    >
                      <span><RichText text={option} /></span>
                      {state === 'correct' && <Check size={16} aria-label="Correct answer" />}
                      {state === 'wrong' && <X size={16} aria-label="Your answer" />}
                    </button>
                  );
                })}
              </div>
              {isSubmitted && feedback && (
                <div className="ui-quiz-feedback" data-correct={isCorrect || undefined}>
                  <strong>{isCorrect ? 'Why' : 'What went wrong'}</strong> <RichText text={feedback} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <footer className="ui-quiz-foot">
        {isSubmitted ? (
          <>
            <span className="ui-quiz-score" data-perfect={score === questions.length || undefined}>
              {score === questions.length ? 'All correct.' : `${score} of ${questions.length} correct. Read the feedback under each question.`}
            </span>
            <button type="button" className="ui-btn ui-btn-sm" onClick={reset}><RotateCcw size={15} /> Try again</button>
          </>
        ) : (
          <>
            <span className="ui-quiz-missing" aria-live="polite">
              {showMissing && missing > 0 ? `Answer the ${missing} remaining ${missing === 1 ? 'question' : 'questions'} first.` : ''}
            </span>
            <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={submit}>Check answers</button>
          </>
        )}
      </footer>
    </section>
  );
}
