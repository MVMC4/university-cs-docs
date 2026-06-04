'use client';
import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export function Quiz({ title = "Knowledge Check", questions }: { title?: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  const score = isSubmitted 
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0) 
    : 0;

  const ScoreDisplay = () => (
    <div className="text-lg font-semibold text-fd-foreground flex items-center gap-2">
      Score: <span className={score === questions.length ? "text-emerald-500" : "text-fd-primary"}>{score}/{questions.length}</span>
    </div>
  );

  return (
    <div className="my-8 rounded-xl border border-fd-border bg-fd-muted/30 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-fd-border pb-4">
        <h3 className="text-2xl font-bold text-fd-foreground">
          {title}
        </h3>
        {isSubmitted && <ScoreDisplay />}
      </div>

      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-3">
            <p className="text-lg font-semibold text-fd-foreground">
              {qIndex + 1}. {q.question}
            </p>
            <div className="space-y-2 pl-2">
              {q.options.map((option, optIndex) => {
                let btnClass = 'w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-sm ';
                
                if (!isSubmitted) {
                  if (answers[qIndex] === optIndex) {
                    btnClass += 'border-fd-primary bg-fd-primary/10 text-fd-primary font-medium';
                  } else {
                    btnClass += 'border-fd-border bg-fd-background hover:border-fd-primary/50 hover:bg-fd-muted text-fd-foreground';
                  }
                } else {
                  if (optIndex === q.correctIndex) {
                    btnClass += 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium';
                  } else if (answers[qIndex] === optIndex) {
                    btnClass += 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400';
                  } else {
                    btnClass += 'border-fd-border bg-fd-background opacity-50 text-fd-muted-foreground';
                  }
                }

                return (
                  <button key={optIndex} onClick={() => handleSelect(qIndex, optIndex)} className={btnClass} disabled={isSubmitted}>
                    <span>{option}</span>
                    {isSubmitted && optIndex === q.correctIndex && <Check className="h-4 w-4" />}
                    {isSubmitted && answers[qIndex] === optIndex && optIndex !== q.correctIndex && <X className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            
            {isSubmitted && q.explanation && (
              <div className="mt-3 p-4 rounded-lg bg-fd-muted border border-fd-border text-sm text-fd-muted-foreground">
                <span className="font-semibold text-fd-foreground">Explanation:</span> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t border-fd-border pt-4">
        {isSubmitted ? (
          <>
            <ScoreDisplay />
            <button 
              onClick={handleReset} 
              className="px-6 py-2 rounded-lg bg-fd-muted border border-fd-border text-fd-foreground font-medium hover:bg-fd-background transition-colors flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </button>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium hover:bg-fd-primary/90 transition-colors shadow-sm"
            >
              Submit Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
