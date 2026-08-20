import type { Metadata } from 'next';
import { CommonMistake, ConceptBlock, RecognitionStrategy, TheoremBlock } from '@/components/learning/concept-block';
import { LessonConnection, LessonSummary, MethodSteps, PracticeCheckpoint } from '@/components/learning/lesson-flow';
import { LearningObjectives, LessonIntroduction, Prerequisites } from '@/components/learning/lesson-introduction';
import { WorkedExample } from '@/components/learning/worked-example';
import { FlashcardDeck } from '@/components/interactive/flashcard-deck';
import { Quiz } from '@/components/interactive/quiz';
import { TimerPanel, TimerSummary } from '@/features/study-timer';
import type { WorkedExample as WorkedExampleRecord } from '@/features/courses/mat221';

export const metadata: Metadata = {
  title: 'Internal component reference',
  robots: { index: false, follow: false },
};

const example: WorkedExampleRecord = {
  id: 'reference-substitution',
  number: 1,
  title: 'A complete substitution record',
  difficulty: 'developing',
  purpose: 'Show every required worked-example field and long-math behavior.',
  prompt: 'Evaluate $\\int 2x(x^2+1)^4\\,dx$.',
  recognition: 'The derivative of the inner expression $x^2+1$ is the visible factor $2x$.',
  methodDecision: 'Use $u=x^2+1$ so the integral becomes a power of $u$.',
  ruleAndConditions: 'Substitution applies because the integrand contains a differentiable inner function and its differential.',
  steps: [
    { title: 'Choose the inner expression', explanation: 'Set the repeated composite expression equal to a new variable.', math: '$u=x^2+1$' },
    { title: 'Replace the differential', explanation: 'Differentiate the substitution and replace the complete factor.', math: '$du=2x\\,dx$' },
    { title: 'Integrate and return', explanation: 'Integrate in $u$ and then replace $u$.', math: '$\\frac{(x^2+1)^5}{5}+C$' },
  ],
  answer: '$\\frac{(x^2+1)^5}{5}+C$',
  verification: 'Differentiating the answer gives $2x(x^2+1)^4$.',
  commonWrongPath: 'Do not leave both $u$ and $x$ in the transformed integral.',
  transferPrompt: 'How would a visible constant multiple change the differential replacement?',
};

const cards = [
  { front: 'What must a complete substitution replace?', back: 'The inner expression and every corresponding differential factor.' },
  { front: 'When should definite bounds change?', back: 'Immediately after choosing $u$, before integrating in the new variable.' },
];

const questions = [
  {
    question: 'Which factor signals $u=x^2+1$ in $\\int 2x(x^2+1)^4\\,dx$?',
    options: ['$2x$', '$(x^2+1)^4$', '$dx$', '$4$'],
    correctIndex: 0,
    explanation: '$2x$ is the derivative of the proposed inner expression.',
  },
];

export default function ComponentReferencePage() {
  return (
    <main className="component-reference">
      <article>
        <h1>Internal component reference</h1>
        <p>This non-indexed route keeps theme, content, assessment, and timer states visible in one place.</p>

        <section className="component-reference-section">
          <LessonIntroduction eyebrow="Reference state" title="Lesson orientation">
            <p>Use this surface to inspect long content, mathematics, semantic color, and responsive layout.</p>
          </LessonIntroduction>
          <LearningObjectives items={['Identify the method', 'Explain every condition', 'Verify the final result']} />
          <Prerequisites items={['Chain rule', 'Power rule for integration']} />
        </section>

        <section className="component-reference-section">
          <ConceptBlock title="Concept block"><p>A concept explains what an idea means and why it matters.</p></ConceptBlock>
          <TheoremBlock title="Theorem block"><p>A theorem includes its conditions as well as its conclusion.</p></TheoremBlock>
          <RecognitionStrategy><p>Look for the derivative of an inner expression elsewhere in the integrand.</p></RecognitionStrategy>
          <CommonMistake><p>Never mix the original variable and the substitution variable in one integral.</p></CommonMistake>
          <MethodSteps steps={['Choose a complete substitution', 'Replace every factor', 'Integrate in one variable', 'Return and verify']} />
          <PracticeCheckpoint><p>Evaluate $\\int 3x^2(x^3+5)^2\\,dx$ before opening a solution.</p></PracticeCheckpoint>
        </section>

        <section className="component-reference-section">
          <WorkedExample example={example} />
          <LessonSummary items={['Substitution reverses the chain rule', 'Definite bounds must match the active variable']} />
          <LessonConnection href="/docs/sem3/mat221" title="Return to MAT221">Course navigation reference</LessonConnection>
        </section>

        <section className="component-reference-section">
          <FlashcardDeck cards={cards} title="Flashcard reference" />
          <Quiz questions={questions} title="Quiz state reference" />
          <div className="component-state-grid">
            <div className="component-state-card"><strong>Loading</strong><p>Reserve space and announce progress without shifting the page.</p></div>
            <div className="component-state-card"><strong>Empty</strong><p>Explain what belongs here and how to continue.</p></div>
            <div className="component-state-card"><strong>Error</strong><p>Keep recovery instructions close to the failed state.</p></div>
          </div>
        </section>

        <section className="component-reference-section">
          <TimerPanel />
          <TimerSummary />
        </section>
      </article>
    </main>
  );
}
