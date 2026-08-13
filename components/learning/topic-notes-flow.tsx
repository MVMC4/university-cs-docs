'use client';

import React from 'react';
import { AlertTriangle, BookOpenCheck, CheckCircle2, GraduationCap, Link2, Route, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Card } from '@/components/callouts/card';
import { HighlightCard } from '@/components/callouts/highlight-card';
import { PresetCard } from '@/components/callouts/preset-card';
import { Checklist } from '@/components/callouts/checklist';
import { FormulaBlock } from '@/components/math/formula-block';
import { Step, StepByStep } from '@/components/interactive/step-by-step';
import { TOPIC_CARDS } from './topic-card-data';

export type TopicCard = { front: string; back: string };
export type TopicStep = { title: string; body: string };

export type TopicNotesFlowProps = {
  course: string;
  topic: string;
  summary: string;
  outcomes?: string[];
  definitions?: TopicCard[];
  method?: TopicStep[];
  formulas?: TopicCard[];
  traps?: string[];
  examFocus?: string[];
  flashcards?: TopicCard[];
  children?: React.ReactNode;
};

type StudyProfile = {
  representation: string;
  execution: string;
  verification: string;
  evidence: string;
  precision: string;
};

function profileFor(course: string): StudyProfile {
  if (course.startsWith('CSI14')) return {
    representation: 'Turn the specification into named inputs, outputs, variables, control flow, and small test cases before writing the complete Java program.',
    execution: 'Trace state after every important statement. Separate syntax errors, runtime failures, and incorrect logic because each needs a different repair.',
    verification: 'Compile, run a normal case, test a boundary case, test invalid input where relevant, and compare the actual output with the specification.',
    evidence: 'A strong answer includes valid Java, a readable trace or explanation, deliberate test data, and a conclusion about correctness.',
    precision: 'Use exact Java terminology: value versus variable, expression versus statement, parameter versus argument, class versus object, and checked versus unchecked behaviour.',
  };
  if (course.startsWith('CSI13')) return {
    representation: 'Translate the statement into symbols, sets, functions, relations, graphs, sequences, matrices, or pseudocode before attempting a proof or calculation.',
    execution: 'Begin from definitions and justify each implication. When an algorithm is involved, state its input, output, invariant or stopping condition, and trace a small case.',
    verification: 'Check a truth-table row, substitute a small integer, test a boundary case, construct a counterexample, or verify both directions of the claimed relationship.',
    evidence: 'A strong answer contains the formal representation, the governing definition or theorem, connected reasoning, and a final statement matching the claim.',
    precision: 'Quantifiers, domains, implication direction, indices, and set membership symbols are part of the meaning and cannot be treated as decoration.',
  };
  if (course.startsWith('MAT')) return {
    representation: 'Record the domain, given quantities, target expression, graph features, and applicable identities before manipulating algebra.',
    execution: 'Write one algebraic transformation per line, name the identity or rule being used, and retain restrictions introduced by denominators, radicals, logarithms, or inverse functions.',
    verification: 'Substitute the result, inspect a graph or sign, differentiate or reverse the operation where appropriate, and test excluded or endpoint values.',
    evidence: 'A strong answer shows setup, rule selection, complete symbolic working, an exact result where possible, and a domain-aware conclusion.',
    precision: 'Brackets, signs, function arguments, units, exact values, and domain restrictions all earn or lose marks independently of the final number.',
  };
  if (course.startsWith('STA')) return {
    representation: 'Define the random experiment, sample space, events or random variable, support, parameters, and assumptions before selecting a probability model.',
    execution: 'Explain why the model fits, write the probability statement before substituting, calculate with visible intermediate values, and interpret the result.',
    verification: 'Check bounds, complements, total probability, parameter conditions, units, and whether the numerical scale is plausible for the experiment.',
    evidence: 'A strong answer contains the event definition, model justification, formula, substitution, calculation, and a contextual probability statement.',
    precision: 'Disjointness is not independence; a density is not a probability at a point; parameters and random-variable values must remain distinct.',
  };
  if (course.startsWith('COM')) return {
    representation: 'Identify purpose, audience, context, genre, central claim, source role, and required evidence before drafting or evaluating communication.',
    execution: 'Build a visible line from claim to evidence to explanation. Revise structure and reasoning before editing sentences and surface accuracy.',
    verification: 'Use an audience check, reverse outline, source-to-claim audit, citation check, and read-aloud pass to test meaning and presentation separately.',
    evidence: 'A strong answer demonstrates a purposeful structure, relevant evidence, explained relationships, ethical source use, and controlled academic language.',
    precision: 'Summary, paraphrase, quotation, synthesis, claim, evidence, and interpretation perform different jobs and must be labelled and executed accurately.',
  };
  return {
    representation: 'Identify the system, components, data, process, users, constraints, and level of abstraction before explaining how the parts interact.',
    execution: 'Follow information from input through processing, storage, communication, and output while distinguishing physical components from logical services.',
    verification: 'Check the explanation against a concrete device or scenario, trace cause and effect, and test whether every named component has a clear role.',
    evidence: 'A strong answer combines an accurate definition, labelled structure, process explanation, example, limitation, and appropriate terminology.',
    precision: 'Do not collapse related terms—hardware and software, memory and storage, architecture and organisation, Internet and Web—into synonyms.',
  };
}

function DeepWorkedSet({ course, topic, summary, cards, profile }: { course: string; topic: string; summary: string; cards: TopicCard[]; profile: StudyProfile }) {
  const modes = [
    ['Orientation', 'Identify the objects and vocabulary', 'Rewrite the problem in the formal language of the topic before solving anything.'],
    ['Definition test', 'Separate an example from a near-miss', 'Apply the defining conditions one by one and identify the first condition the near-miss violates.'],
    ['Guided routine', 'Carry out the standard method', 'Use the chapter method in full, preserving every intermediate state needed for method marks.'],
    ['Representation', 'Move between two forms', 'Translate the same information into a second representation and explain what becomes easier to see.'],
    ['Method selection', 'Choose between plausible approaches', 'Compare the conditions of two methods and reject the one whose assumptions do not match.'],
    ['Error analysis', 'Diagnose a believable wrong solution', 'Locate the first invalid step, name the misconception, and rebuild only from that point.'],
    ['Boundary case', 'Test an edge condition', 'Choose an empty, zero, extreme, invalid, or limiting case and explain what the method must do there.'],
    ['Reverse problem', 'Recover missing information', 'Start from a result or conclusion and determine what premises, inputs, or structure could produce it.'],
    ['Transfer', 'Use the idea in a new context', 'Keep the deep structure but change the surface setting, data, audience, or representation.'],
    ['Exam synthesis', 'Combine the chapter into one response', 'Connect definition, method, execution, verification, and interpretation without being told the intermediate steps.'],
  ];
  return <div className="deep-example-set">
    {modes.map(([classification, title, instruction], index) => {
      const anchor = cards[index % cards.length];
      return <article className="deep-worked-example" key={classification}>
        <div className="deep-example-head"><span>Worked case {String(index + 1).padStart(2, '0')}</span><em>{classification}</em></div>
        <h4>{title}: {anchor.front}</h4>
        <p className="deep-purpose"><strong>Why this case matters.</strong> {instruction}</p>
        <div className="deep-decision"><Target size={16} /><p><strong>Choose the method.</strong> {profile.representation}</p></div>
        <ol>
          <li><strong>Decode the target.</strong> State what must be produced and rewrite every given fact in a form suitable for {course}.</li>
          <li><strong>Anchor the reasoning.</strong> {anchor.back}</li>
          <li><strong>Check the conditions.</strong> Identify the assumption, definition, domain, input contract, source requirement, or model condition that permits the next step.</li>
          <li><strong>Execute.</strong> {profile.execution}</li>
          <li><strong>Explain the connection.</strong> Link the result of the previous step to the original target; do not leave a calculation, quotation, program output, or fact uninterpreted.</li>
          <li><strong>Verify.</strong> {profile.verification}</li>
          <li><strong>Conclude.</strong> State exactly what has been shown, calculated, implemented, or communicated and retain every relevant restriction.</li>
        </ol>
        <div className="deep-check"><ShieldCheck size={16} /><div><strong>What full-credit evidence looks like</strong><p>{profile.evidence}</p></div></div>
        <div className="deep-transfer"><Link2 size={16} /><div><strong>Transfer variation</strong><p>Change one important condition in this case. Predict which step changes, redo only the affected reasoning, and explain why the remaining steps still hold.</p></div></div>
        <p className="deep-diagnostic"><AlertTriangle size={15} /><span><strong>First wrong step to inspect:</strong> If the conclusion fails, return to the representation and the conditions before redoing the arithmetic, wording, or code.</span></p>
      </article>;
    })}
  </div>;
}

export function TopicNotesFlow({
  course,
  topic,
  summary,
  outcomes,
  definitions,
  method,
  formulas = [],
  traps,
  examFocus,
  children,
}: TopicNotesFlowProps) {
  const learningOutcomes = outcomes ?? [
    `Explain the central language and notation of ${topic} without consulting the notes.`,
    `Apply the standard method for ${topic} to a fresh example and justify every step.`,
    `Recognise a common error, diagnose why it fails, and correct the reasoning.`,
    `Transfer the ideas from ${topic} to an unfamiliar problem or context.`,
  ];
  const coreDefinitions = definitions ?? TOPIC_CARDS[topic] ?? [
    { front: `What is the central idea of ${topic}?`, back: summary },
    { front: `What counts as mastery of ${topic}?`, back: 'You can define the terms, choose the correct method, execute it accurately, and explain why the result is valid.' },
    { front: `How should ${topic} be studied?`, back: 'Move from a precise definition to a worked example, then reproduce the reasoning closed-book and test it on a changed problem.' },
  ];
  const reliableMethod = method ?? [
    { title: 'Decode the task', body: 'Identify the given information, the requested result, the relevant domain, and any restrictions or assumptions.' },
    { title: 'Choose a representation', body: 'Translate the task into the notation, diagram, table, outline, program state, or model used in the course.' },
    { title: 'State the governing idea', body: `Write the definition, rule, model, or invariant from ${topic} that makes the next step valid.` },
    { title: 'Execute transparently', body: 'Work one justified transformation at a time. Keep notation, units, variable meanings, and intermediate state visible.' },
    { title: 'Verify independently', body: 'Check the result by substitution, tracing, a second representation, a boundary case, or comparison with the source.' },
    { title: 'Conclude in context', body: 'Answer the exact question and explain what the result means.' },
  ];
  const commonTraps = traps ?? [
    'Memorising an example while forgetting the definition or condition that makes it valid.',
    'Skipping intermediate reasoning, which hides a sign, scope, domain, or interpretation error.',
    'Accepting a plausible result without checking it against the original question.',
  ];
  const assessmentFocus = examFocus ?? [
    `Define the key terms in ${topic} precisely.`,
    'Show a complete method, not only the final result.',
    'Explain why the selected rule applies and identify its conditions.',
    'Adapt the method when the surface details or constraints change.',
  ];
  const profile = profileFor(course);

  return (
    <div className="topic-notes-flow">
      <div className="my-8 border-b border-fd-border pb-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground"><BookOpenCheck size={15} /> {course} guided notes</div>
        <p className="text-fd-muted-foreground">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Orient', 'Understand', 'Apply', 'Verify', 'Transfer'].map((label) => <span key={label} className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-muted px-3 py-1.5 text-xs font-medium">{label}</span>)}
        </div>
      </div>

      <Checklist title="By the end of this topic" rules={learningOutcomes.map((text) => ({ type: 'must' as const, text }))} />

      <HighlightCard variant="neutral" title="Start-to-finish route" description={`Treat ${topic} as a connected method, not a list of facts. Complete each stage in order before moving to Review.`}>
        <ol>
          <li><strong>Orient:</strong> identify what you must explain, produce, calculate, prove, trace, or evaluate.</li>
          <li><strong>Build:</strong> learn the vocabulary and conditions before copying a procedure.</li>
          <li><strong>Model:</strong> connect every definition to a representation, example, and non-example.</li>
          <li><strong>Apply:</strong> execute the method with important intermediate steps visible.</li>
          <li><strong>Verify:</strong> use a second representation, boundary case, substitution, trace, or source check.</li>
          <li><strong>Transfer:</strong> change one assumption and predict the effect before recomputing.</li>
        </ol>
      </HighlightCard>

      {children && <div className="my-6 rounded-xl border border-fd-border bg-fd-muted/20 p-5">{children}</div>}

      <div className="mb-4 mt-10 flex items-center gap-3 border-b border-fd-border pb-2">
        <BookOpenCheck size={18} className="shrink-0 text-fd-muted-foreground" />
        <div><span className="block text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">01 · Orient</span><h3 className="m-0 text-xl font-bold">What the topic is doing</h3></div>
      </div>
      <p>{summary}</p>
      <p>Before using a rule, name the object being studied, the information supplied, the required outcome, and the conditions that make the rule valid. This prevents a familiar-looking example from pulling the solution toward the wrong method.</p>

      <div className="mb-4 mt-10 flex items-center gap-3 border-b border-fd-border pb-2">
        <Sparkles size={18} className="shrink-0 text-fd-muted-foreground" />
        <div><span className="block text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">02 · Understand</span><h3 className="m-0 text-xl font-bold">Core ideas and language</h3></div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {coreDefinitions.map((item, index) => (
          <Card key={item.front} className="m-0"><span className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">Definition {index + 1}</span><h4>{item.front}</h4><p>{item.back}</p></Card>
        ))}
      </div>

      {formulas.length > 0 && <>
        <div className="mb-4 mt-10 flex items-center gap-3 border-b border-fd-border pb-2">
          <Target size={18} className="shrink-0 text-fd-muted-foreground" />
          <div><span className="block text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">03 · Command</span><h3 className="m-0 text-xl font-bold">Rules and formulas</h3></div>
        </div>
        {formulas.map((item) => <FormulaBlock key={item.front} title={item.front} latex={item.back}>{item.back}</FormulaBlock>)}
      </>}

      <div className="mb-4 mt-10 flex items-center gap-3 border-b border-fd-border pb-2">
        <Route size={18} className="shrink-0 text-fd-muted-foreground" />
        <div><span className="block text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">04 · Apply</span><h3 className="m-0 text-xl font-bold">The reliable method</h3></div>
      </div>
      <StepByStep title={`Method: ${topic}`}>{reliableMethod.map((item, index) => <Step key={`${item.title}-${index}`} number={index + 1} title={item.title}>{item.body}</Step>)}</StepByStep>

      <h3>Worked reasoning pattern</h3>
      <Card>
        <ol>
          <li><strong>Restate:</strong> replace vague wording with a precise target.</li>
          <li><strong>Represent:</strong> encode the information in a suitable form.</li>
          <li><strong>Select:</strong> choose a principle and verify its conditions.</li>
          <li><strong>Execute:</strong> preserve a readable chain of intermediate work.</li>
          <li><strong>Check:</strong> verify independently rather than repeating the same steps.</li>
          <li><strong>Conclude:</strong> interpret the result in the language of the problem.</li>
        </ol>
      </Card>

      <h3>From routine work to mastery</h3>
      <p>A routine exercise tells you which method to use. A stronger exercise changes the surface details, combines two ideas, or withholds the method. Mastery means recognising the structure anyway. Practise by changing one assumption at a time and predicting the effect before recomputing.</p>
      <p>For written work, preserve definitions, assumptions, evidence, and reasoning. For mathematics, preserve domains, notation, algebra, and checks. For programming, preserve inputs, state changes, invariants, output, and tests. These are different expressions of the same disciplined workflow.</p>

      <div className="deep-section-heading">
        <div><span>05 · Develop</span><h3>Ten worked reasoning cases</h3><p>These cases follow the MAT221 learning pattern: choose the method, state its conditions, show the full chain, verify, diagnose, then transfer.</p></div>
        <GraduationCap size={21} />
      </div>
      <DeepWorkedSet course={course} topic={topic} summary={summary} cards={coreDefinitions} profile={profile} />

      <div className="deep-section-heading">
        <div><span>06 · Connect</span><h3>How the chapter fits together</h3><p>A chapter becomes examinable knowledge only when you can move between its definitions, methods, representations, and consequences.</p></div>
        <Link2 size={21} />
      </div>
      <div className="chapter-connections">
        <Card className="m-0"><h4>Prerequisite chain</h4><p>Begin with the chapter vocabulary and the earlier ideas named in the course sequence. If a later step feels arbitrary, return to the first definition you cannot explain without notes.</p></Card>
        <Card className="m-0"><h4>Decision chain</h4><p>Classify the task, match its conditions to a method, execute visibly, and select a verification that is independent of the original path.</p></Card>
        <Card className="m-0"><h4>Transfer chain</h4><p>Change the inputs, constraints, audience, or representation while preserving the underlying idea. Explain exactly which steps remain invariant.</p></Card>
        <Card className="m-0"><h4>Assessment chain</h4><p>Retrieve the definition, justify the method, produce complete work, interpret the result, and diagnose an error. Each link can earn separate marks.</p></Card>
      </div>

      <HighlightCard variant="neutral" title="Precision standard" description="Use this as the final editing pass before submitting an answer.">
        <p>{profile.precision}</p>
        <p><strong>Chapter purpose:</strong> {summary}</p>
      </HighlightCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PresetCard type="trap" title="Common traps"><ul>{commonTraps.map((item) => <li key={item}>{item}</li>)}</ul></PresetCard>
        <PresetCard type="exam" title="Assessment focus"><ul>{assessmentFocus.map((item) => <li key={item}>{item}</li>)}</ul></PresetCard>
      </div>

      <div className="my-6 flex items-start gap-3 rounded-xl border border-fd-border bg-fd-muted/20 p-4">
        <CheckCircle2 size={20} />
        <div><strong className="block">Next: Review</strong><span className="text-sm text-fd-muted-foreground">Close these notes. Reconstruct the definitions and method from memory, then use Review for the 18-card deck and 15-question knowledge check.</span></div>
      </div>
    </div>
  );
}
