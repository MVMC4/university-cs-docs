import { CheckCircle2, CircleAlert, Eye, Flag, ListChecks } from 'lucide-react';
import { MathText } from '@/components/interactive/math-text';
import type { WorkedExample as WorkedExampleRecord } from '@/features/courses/mat221';

export function WorkedExample({ example }: { example: WorkedExampleRecord }) {
  return (
    <article className={`worked-example worked-example-${example.difficulty}`} id={example.id}>
      <header>
        <div>
          <span>Example {example.number}</span>
          <em>{example.difficulty.replace('-', ' ')}</em>
        </div>
        <h3>{example.title}</h3>
        <p>{example.purpose}</p>
      </header>

      <section className="worked-example-prompt">
        <strong>Problem</strong>
        <MathText text={example.prompt} />
      </section>

      <div className="worked-example-decision">
        <div><Eye size={17} /><span><strong>Recognition</strong>{example.recognition}</span></div>
        <div><Flag size={17} /><span><strong>Method decision</strong>{example.methodDecision}</span></div>
        <div><ListChecks size={17} /><span><strong>Rule and conditions</strong>{example.ruleAndConditions}</span></div>
      </div>

      <ol className="worked-example-steps">
        {example.steps.map((step, index) => (
          <li key={`${example.id}-step-${index + 1}`}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.explanation}</p>
              {step.math ? <div className="worked-example-math"><MathText text={step.math} /></div> : null}
            </div>
          </li>
        ))}
      </ol>

      <footer>
        <div className="worked-example-answer"><CheckCircle2 size={18} /><span><strong>Answer</strong><MathText text={example.answer} /></span></div>
        <div><CheckCircle2 size={18} /><span><strong>Verification</strong>{example.verification}</span></div>
        <div className="worked-example-warning"><CircleAlert size={18} /><span><strong>Avoid</strong>{example.commonWrongPath}</span></div>
        {example.transferPrompt ? <div><Flag size={18} /><span><strong>Transfer</strong>{example.transferPrompt}</span></div> : null}
      </footer>
    </article>
  );
}

export function WorkedExampleSet({ examples }: { examples: WorkedExampleRecord[] }) {
  return <div className="worked-example-set">{examples.map((example) => <WorkedExample key={example.id} example={example} />)}</div>;
}
