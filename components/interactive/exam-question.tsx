'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Practice and exam questions: a numbered part, the prompt, and buttons that reveal a
 * worked solution and optional follow-up variations. The same component is used on
 * every course's practice and exam pages.
 */
export function SubQuestion({ part, prompt, solution, variations }: {
  part?: string;
  prompt: ReactNode;
  solution: ReactNode;
  variations?: ReactNode;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [showVariations, setShowVariations] = useState(false);

  return (
    <div className="ui-subq">
      <div className="ui-subq-head">
        {part && <span className="ui-subq-part">{part}</span>}
        <div className="ui-subq-prompt">{prompt}</div>
      </div>

      <div className="ui-subq-actions">
        <button type="button" className="ui-btn ui-btn-sm" aria-expanded={showSolution} onClick={() => setShowSolution(!showSolution)}>
          <ChevronDown size={15} className={showSolution ? 'ui-flip' : undefined} />
          {showSolution ? 'Hide solution' : 'Show solution'}
        </button>
        {variations && (
          <button type="button" className="ui-btn ui-btn-sm" aria-expanded={showVariations} onClick={() => setShowVariations(!showVariations)}>
            <ChevronDown size={15} className={showVariations ? 'ui-flip' : undefined} />
            {showVariations ? 'Hide variations' : 'Variations'}
          </button>
        )}
      </div>

      {showSolution && (
        <div className="ui-subq-panel">
          <span className="ui-subq-label">Solution</span>
          <div className="ui-subq-body">{solution}</div>
        </div>
      )}

      {showVariations && variations && (
        <div className="ui-subq-panel ui-subq-panel-alt">
          <span className="ui-subq-label">Variations and follow-ups</span>
          <div className="ui-subq-body">{variations}</div>
        </div>
      )}
    </div>
  );
}

export function ExamQuestion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="ui-exam">
      <h3 className="ui-exam-title">{title}</h3>
      <div className="ui-exam-parts">{children}</div>
    </section>
  );
}
