'use client';

import { BookCheck, Clock3, FileQuestion, GraduationCap } from 'lucide-react';
import { Card } from '@/components/callouts/card';
import { Checklist } from '@/components/callouts/checklist';
import { HighlightCard } from '@/components/callouts/highlight-card';
import { PresetCard } from '@/components/callouts/preset-card';
import { ExamQuestion, SubQuestion } from '@/components/interactive/exam-question';
import { FlashcardDeck } from '@/components/interactive/flashcard-deck';
import { Quiz } from '@/components/interactive/quiz';
import { Step, StepByStep } from '@/components/interactive/step-by-step';
import { TOPIC_CARDS } from './topic-card-data';

type ChapterPageProps = { course: string; topic: string; summary: string };
type CardItem = { front: string; back: string };

const fallbackCards = (topic: string, summary: string): CardItem[] => [
  { front: `What is the central idea of ${topic}?`, back: summary },
  { front: `What demonstrates mastery of ${topic}?`, back: 'A precise explanation, a justified method, a correct application, and an independent check.' },
  { front: `How should an answer about ${topic} be checked?`, back: 'Test the definitions, assumptions, intermediate reasoning, notation, and conclusion against the original task.' },
];

function getCards(topic: string, summary: string): CardItem[] {
  const core = (TOPIC_CARDS[topic] ?? fallbackCards(topic, summary)).slice(0, 3);
  const lenses = [
    { lead: 'Meaning', prompt: 'State this idea precisely', answer: 'A precise answer includes its defining property and uses the course terminology correctly.' },
    { lead: 'Conditions', prompt: 'When may this idea be used', answer: 'Check every assumption and restriction before applying it.' },
    { lead: 'Application', prompt: 'How would you apply this idea', answer: 'Identify the target, select the idea, show the intermediate work, and conclude in context.' },
    { lead: 'Diagnosis', prompt: 'How can misuse of this idea be detected', answer: 'Compare the attempted step with the definition and test a boundary case or counterexample.' },
    { lead: 'Transfer', prompt: 'How does this idea connect to the wider topic', answer: `It supports the complete ${topic} workflow by linking definition, method choice, execution, and verification.` },
  ];
  const expanded = core.flatMap((card) => lenses.map((lens) => ({
    front: `${lens.lead}: ${lens.prompt} - ${card.front}`,
    back: `${card.back} ${lens.answer}`,
  })));
  return [...core, ...expanded];
}

function getQuiz(topic: string, summary: string) {
  const cards = getCards(topic, summary);
  const genericDistractors = [
    'It is enough to memorise one worked example without its conditions.',
    'Only the final answer matters; the method does not need justification.',
    'A plausible result is automatically correct and needs no verification.',
  ];
  return cards.slice(0, 15).map((card, index) => {
    const distractors = cards.filter((_, cardIndex) => cardIndex !== index).map((item) => item.back).concat(genericDistractors).slice(0, 3);
    const options = [...distractors];
    options.splice(index % 4, 0, card.back);
    return { question: card.front, options, correctIndex: options.indexOf(card.back), explanation: card.back };
  });
}

function practicePrompt(index: number, topic: string, cards: CardItem[]) {
  const prompts = [
    `Define the central terms in ${topic} and give one valid example.`,
    `Explain a core idea in your own words and state why it matters.`,
    `Distinguish two ideas in ${topic} that a beginner might confuse.`,
    `Translate an informal description of ${topic} into the course's formal representation.`,
    `List the conditions that must hold before the main method in ${topic} can be used.`,
    `Apply the standard method to a small example of your own construction.`,
    `Show all intermediate steps for an unfamiliar ${topic} task and label each justification.`,
    `Construct a non-example and identify the exact definition it violates.`,
    `Find and correct a plausible error involving ${topic}.`,
    `Use a second method or representation to verify a result from ${topic}.`,
    `Explain how changing one assumption changes the result or method.`,
    `Connect ${topic} to an earlier course idea and explain the dependency.`,
    `Interpret a completed result in the language of the original problem.`,
    `Write a six-step checklist for solving a new ${topic} problem.`,
    `Create a one-minute explanation that teaches the key idea without memorised wording.`,
  ];
  return { prompt: prompts[index], card: cards[index % cards.length] };
}

type ExamMode = {
  label: string;
  marks: number;
  prompt: (topic: string, focus: CardItem, related: CardItem) => string;
  marking: (focus: CardItem, related: CardItem) => string;
  variation: (topic: string, focus: CardItem) => string;
};

const quantitativeExamModes: ExamMode[] = [
  {
    label: 'Definition and witness', marks: 3,
    prompt: (topic, focus) => `${focus.front} Give a precise answer, then construct one valid ${topic} example that satisfies every condition in your answer.`,
    marking: (focus) => `Award credit for the precise result (${focus.back}), a valid constructed example, and an explicit check of the defining conditions.`,
    variation: (_, focus) => `Change the example so that one condition behind “${focus.front}” fails, and explain the consequence.`,
  },
  {
    label: 'Multiple representations', marks: 4,
    prompt: (topic, focus) => `Represent the idea tested by “${focus.front}” in two appropriate forms—for example symbolic, numerical, graphical, tabular, or set-based. Explain exactly how the two representations encode the same ${topic} information.`,
    marking: (focus) => `Use this anchor: ${focus.back} Credit two correct representations and a justified correspondence between them.`,
    variation: () => 'Replace one representation with a proof, algorithm, or diagram and preserve the same conclusion.',
  },
  {
    label: 'Error diagnosis', marks: 4,
    prompt: (_, focus) => `A student attempts to answer “${focus.front}” but ignores one necessary definition or restriction. Write a plausible incorrect solution, identify its first invalid step, and repair it without changing valid earlier work.`,
    marking: (focus) => `The repair must agree with: ${focus.back} Credit a realistic error, exact localisation, and a corrected chain of reasoning.`,
    variation: () => 'Use a different misconception and show a quick test that exposes it.',
  },
  {
    label: 'Boundary case', marks: 5,
    prompt: (topic, focus) => `Construct a boundary or exceptional case in ${topic} for which careless use of the answer to “${focus.front}” would fail. Analyse the case and state the strongest correct conclusion that remains.`,
    marking: (focus) => `Use ${focus.back} as the governing fact. Credit a genuine boundary case, correct analysis, and a properly limited conclusion.`,
    variation: () => 'Move just inside the valid boundary and recompute or re-prove the result.',
  },
  {
    label: 'Constrained application', marks: 5,
    prompt: (topic, focus) => `Create and solve a non-routine ${topic} problem whose solution depends on “${focus.front}”. Add one meaningful restriction that rules out the most obvious approach, and justify the alternative method you use.`,
    marking: (focus) => `The solution must correctly use ${focus.back} Credit model construction, response to the restriction, execution, and checking.`,
    variation: () => 'Remove the restriction and compare the efficient solution paths.',
  },
  {
    label: 'Reverse reasoning', marks: 6,
    prompt: (_, focus) => `Instead of computing a result from given information, work backwards from a conclusion related to “${focus.front}”. Determine the possible starting conditions, state whether they are unique, and prove that they produce the required conclusion.`,
    marking: (focus) => `A defensible answer uses ${focus.back} Credit valid reverse steps, all admissible cases, the uniqueness decision, and forward verification.`,
    variation: () => 'Add a second admissible solution or prove why no second solution can exist.',
  },
  {
    label: 'Derivation from first principles', marks: 7,
    prompt: (topic, focus) => `Derive the result needed to answer “${focus.front}” directly from definitions or previously established ${topic} principles. Do not quote the final rule. Mark every step where an assumption is used.`,
    marking: (focus) => `The derivation must reach the substance of ${focus.back} Credit foundations, logically connected steps, assumption tracking, and the derived result.`,
    variation: () => 'Give a shorter derivation and identify what theorem it imports.',
  },
  {
    label: 'Method comparison', marks: 8,
    prompt: (_, focus, related) => `Develop two valid ways to resolve “${focus.front}”, one of which must use the idea behind “${related.front}”. Compare their assumptions, workload, risk of error, and suitability for a time-limited examination.`,
    marking: (focus, related) => `The comparison should respect both anchors: ${focus.back} Also use: ${related.back} Credit two complete methods and a reasoned evaluation.`,
    variation: () => 'Change the input scale or form so that the less attractive method becomes preferable.',
  },
  {
    label: 'Proof or counterexample', marks: 9,
    prompt: (topic, focus) => `Formulate a tempting but non-trivial universal claim about ${topic} based on “${focus.front}”. Decide whether it is true. Supply a complete proof if true, or a minimal counterexample followed by a corrected theorem if false.`,
    marking: (focus) => `The decision must be consistent with ${focus.back} Credit a precise quantified claim, valid proof or counterexample, and an exact correction where required.`,
    variation: () => 'Alter one hypothesis so that the truth value changes, then justify the change.',
  },
  {
    label: 'Chapter synthesis', marks: 9,
    prompt: (topic, focus, related) => `Design and solve one multi-stage ${topic} problem in which answering “${focus.front}” is necessary but not sufficient, and the idea behind “${related.front}” controls a later stage. Verify the final result using a method independent of the main solution.`,
    marking: (focus, related) => `A complete solution integrates ${focus.back} It must also use ${related.back} Credit coherent staging, correct reasoning, and a genuinely independent check.`,
    variation: () => 'Reverse the order of the two concepts and determine whether the problem remains solvable.',
  },
];

const programmingExamModes: ExamMode[] = [
  {
    label: 'Contract and example', marks: 3,
    prompt: (_, focus) => `Answer “${focus.front}” as a precise programming contract or rule, then give the smallest Java or pseudocode example that demonstrates it correctly.`,
    marking: (focus) => `The governing answer is: ${focus.back} Credit the rule, a minimal valid artefact, and correct terminology.`,
    variation: () => 'Modify the artefact so that it violates exactly one part of the contract.',
  },
  {
    label: 'Hand trace', marks: 4,
    prompt: (topic, focus) => `Write a short ${topic} fragment whose behaviour depends on “${focus.front}”. Hand-trace its state after every significant step and give the exact final output or failure.`,
    marking: (focus) => `Trace according to ${focus.back} Credit the fragment, complete state table, and exact result.`,
    variation: () => 'Change one input to exercise a boundary path and retrace only the affected states.',
  },
  {
    label: 'First-fault debugging', marks: 4,
    prompt: (_, focus) => `Construct a plausible buggy Java or pseudocode solution involving “${focus.front}”. Identify the first statement at which actual state diverges from intended state, explain the cause, and provide the smallest safe correction.`,
    marking: (focus) => `The diagnosis must respect ${focus.back} Credit reproducible failure, first-fault localisation, explanation, and minimal repair.`,
    variation: () => 'Repair the same defect without changing the faulty line itself.',
  },
  {
    label: 'Boundary test design', marks: 5,
    prompt: (topic, focus) => `Design a compact test set for a ${topic} implementation governed by “${focus.front}”. Include normal, boundary, empty or minimal, and invalid cases, with the expected result and purpose of each test.`,
    marking: (focus) => `Tests must enforce ${focus.back} Credit coverage, precise expectations, and justification of why each test is distinct.`,
    variation: () => 'Remove one test and show a defect that could now escape detection.',
  },
  {
    label: 'Constraint-driven implementation', marks: 5,
    prompt: (topic, focus) => `Implement or specify a ${topic} task that depends on “${focus.front}” under a restriction such as no extra collection, one pass, immutable input, or no library shortcut. State and justify the restriction you choose.`,
    marking: (focus) => `The implementation must be consistent with ${focus.back} Credit correct logic, compliance with the restriction, and justification.`,
    variation: () => 'Lift the restriction and refactor for clarity without changing observable behaviour.',
  },
  {
    label: 'Recover the input', marks: 6,
    prompt: (_, focus) => `A program using the idea behind “${focus.front}” produces a stated final state of your choice. Work backwards to construct at least one valid input and execution path. Decide whether the input is unique and justify your answer.`,
    marking: (focus) => `Reverse reasoning must use ${focus.back} Credit a valid target, reconstructable input, execution evidence, and uniqueness analysis.`,
    variation: () => 'Construct a second input with the same observable output but different internal states.',
  },
  {
    label: 'Invariant or correctness argument', marks: 7,
    prompt: (topic, focus) => `State a useful invariant, class invariant, pre/postcondition pair, or recursive measure for a ${topic} solution involving “${focus.front}”. Use it to argue termination and/or correctness.`,
    marking: (focus) => `The formal argument must reflect ${focus.back} Credit a meaningful assertion, preservation or progress, and a valid conclusion.`,
    variation: () => 'Introduce one mutation or branch and revise the invariant so it remains sufficient.',
  },
  {
    label: 'Competing designs', marks: 8,
    prompt: (_, focus, related) => `Produce two designs for a task centred on “${focus.front}”; one design must exploit “${related.front}”. Compare readability, correctness risk, time cost, space cost, and ease of testing before selecting one.`,
    marking: (focus, related) => `Use both anchors: ${focus.back} ${related.back} Credit viable designs, explicit trade-offs, and an evidence-based selection.`,
    variation: () => 'Change the expected input size or failure policy and reassess the selection.',
  },
  {
    label: 'Adversarial code review', marks: 9,
    prompt: (topic, focus) => `Write a short but subtly defective ${topic} implementation associated with “${focus.front}”. Perform a line-by-line review, demonstrate the defect with a counterexample, repair it, and add a regression test.`,
    marking: (focus) => `The corrected behaviour must agree with ${focus.back} Credit realistic code, rigorous diagnosis, correct repair, and a targeted regression test.`,
    variation: () => 'Make the defect intermittent or input-dependent and improve the diagnostic strategy.',
  },
  {
    label: 'Integrated program design', marks: 9,
    prompt: (topic, focus, related) => `Design a complete small program for a realistic ${topic} task that requires both “${focus.front}” and “${related.front}”. Specify inputs, outputs, decomposition, core logic, exceptional cases, and a verification strategy.`,
    marking: (focus, related) => `The design must embody ${focus.back} It must also account for ${related.back} Credit a complete interface, coherent decomposition, edge handling, and verification.`,
    variation: () => 'Change one requirement after implementation and show the smallest maintainable redesign.',
  },
];

const systemsExamModes: ExamMode[] = [
  {
    label: 'Precise explanation', marks: 3,
    prompt: (_, focus) => `Give a precise answer to “${focus.front}”, then name a concrete computing-system example where the distinction or process is observable.`,
    marking: (focus) => `The explanation must capture ${focus.back} Credit precision, a relevant example, and a clear connection.`,
    variation: () => 'Replace the example with one from a different class of computing device.',
  },
  {
    label: 'Labelled model', marks: 4,
    prompt: (topic, focus) => `Draw or describe a labelled system model for ${topic} that makes the answer to “${focus.front}” visible. Trace one unit of data, control, or communication through the model.`,
    marking: (focus) => `The model should express ${focus.back} Credit correct components, relationships, and a valid trace.`,
    variation: () => 'Remove one component and predict the first observable system failure.',
  },
  {
    label: 'Fault isolation', marks: 4,
    prompt: (_, focus) => `Invent a realistic symptom caused by misunderstanding “${focus.front}”. Identify three possible causes, order the diagnostic checks, and justify which observation would isolate the root cause.`,
    marking: (focus) => `Diagnosis should be grounded in ${focus.back} Credit plausible causes, efficient test order, and discriminating evidence.`,
    variation: () => 'Assume the first diagnostic result is inconclusive and revise the investigation.',
  },
  {
    label: 'Capacity boundary', marks: 5,
    prompt: (topic, focus) => `Analyse a ${topic} system at a boundary of capacity, precision, compatibility, or throughput connected to “${focus.front}”. Predict the failure mode and propose one mitigation with a stated trade-off.`,
    marking: (focus) => `The analysis must remain consistent with ${focus.back} Credit boundary identification, causal prediction, mitigation, and trade-off.`,
    variation: () => 'Double the workload or halve one resource and update the analysis.',
  },
  {
    label: 'Requirement-constrained design', marks: 5,
    prompt: (topic, focus) => `Design a small ${topic} solution whose requirements make “${focus.front}” decisive. State the requirements, select components or processes, and defend the choice against one rejected alternative.`,
    marking: (focus) => `The selection should follow ${focus.back} Credit explicit requirements, coherent design, and comparative justification.`,
    variation: () => 'Prioritise a different requirement and determine whether the design choice changes.',
  },
  {
    label: 'Infer the architecture', marks: 6,
    prompt: (_, focus) => `Specify a set of observable outputs, timings, or failures from which an analyst could infer the hidden mechanism behind “${focus.front}”. Work backwards and state what cannot be determined uniquely.`,
    marking: (focus) => `Inference should use ${focus.back} Credit informative observations, valid deductions, and recognition of ambiguity.`,
    variation: () => 'Add the smallest extra observation that resolves the ambiguity.',
  },
  {
    label: 'Causal argument', marks: 7,
    prompt: (topic, focus) => `Build a cause-and-effect argument showing how the mechanism in “${focus.front}” influences performance, reliability, security, or usability in ${topic}. State assumptions and identify one confounding factor.`,
    marking: (focus) => `The causal chain must honour ${focus.back} Credit mechanism, linked effects, assumptions, and confounder.`,
    variation: () => 'Reverse one causal link and explain why the revised claim is or is not defensible.',
  },
  {
    label: 'Architecture comparison', marks: 8,
    prompt: (_, focus, related) => `Compare two system designs: one optimised around “${focus.front}” and another around “${related.front}”. Evaluate cost, speed, reliability, scalability, and operational complexity for a stated workload.`,
    marking: (focus, related) => `Apply both anchors: ${focus.back} ${related.back} Credit workload definition, balanced comparison, and justified recommendation.`,
    variation: () => 'Change the workload from predictable to bursty and revisit the recommendation.',
  },
  {
    label: 'Claim evaluation', marks: 9,
    prompt: (topic, focus) => `Write a strong but debatable claim about ${topic} based on “${focus.front}”. Test it against two contrasting systems or scenarios, then replace it with a carefully qualified conclusion.`,
    marking: (focus) => `Evaluation should remain consistent with ${focus.back} Credit a testable claim, contrasting evidence, limitations, and precise revision.`,
    variation: () => 'Introduce a security, ethical, or environmental constraint and reassess the conclusion.',
  },
  {
    label: 'End-to-end systems case', marks: 9,
    prompt: (topic, focus, related) => `Develop an end-to-end ${topic} case that requires both “${focus.front}” and “${related.front}”. Model the path through the system, identify a bottleneck or risk, propose an intervention, and specify evidence that would verify improvement.`,
    marking: (focus, related) => `The case must integrate ${focus.back} It must also use ${related.back} Credit modelling, diagnosis, intervention, and measurable verification.`,
    variation: () => 'Assume the intervention creates a new bottleneck and redesign the system response.',
  },
];

const communicationExamModes: ExamMode[] = [
  {
    label: 'Principle in practice', marks: 3,
    prompt: (_, focus) => `Answer “${focus.front}” precisely, then give one sentence or short academic interaction that demonstrates the principle in practice.`,
    marking: (focus) => `The governing answer is ${focus.back} Credit accuracy, an appropriate example, and a clear link.`,
    variation: () => 'Rewrite the example for a different audience or purpose.',
  },
  {
    label: 'Focused revision', marks: 4,
    prompt: (topic, focus) => `Create a short flawed ${topic} passage or interaction involving “${focus.front}”. Revise it, and annotate the two most important changes with reasons.`,
    marking: (focus) => `The revision should apply ${focus.back} Credit a credible original, effective changes, and justified annotations.`,
    variation: () => 'Preserve the original wording as far as possible while achieving the same improvement.',
  },
  {
    label: 'Breakdown diagnosis', marks: 4,
    prompt: (_, focus) => `Construct a realistic academic communication failure connected to “${focus.front}”. Identify the first point of breakdown, explain its effect on the reader or listener, and provide a targeted repair.`,
    marking: (focus) => `Diagnosis must be grounded in ${focus.back} Credit causal precision, audience effect, and effective repair.`,
    variation: () => 'Keep the message unchanged and repair only the channel, context, or delivery.',
  },
  {
    label: 'Audience boundary', marks: 5,
    prompt: (topic, focus) => `Prepare two versions of the same ${topic} content for audiences with sharply different knowledge or expectations. Make “${focus.front}” central to the adaptation and justify the important differences.`,
    marking: (focus) => `The adaptations should follow ${focus.back} Credit audience analysis, meaningful differences, and justification.`,
    variation: () => 'Add a strict word or time limit and revise both versions.',
  },
  {
    label: 'Evidence-constrained response', marks: 5,
    prompt: (topic, focus) => `Plan a response to a realistic ${topic} task in which evidence is incomplete, contested, or limited. Show how the answer to “${focus.front}” governs what may responsibly be claimed.`,
    marking: (focus) => `The plan should respect ${focus.back} Credit evidence limits, cautious claims, structure, and responsible qualification.`,
    variation: () => 'Add one high-quality source and identify exactly which claim can now be strengthened.',
  },
  {
    label: 'Reverse outline', marks: 6,
    prompt: (_, focus) => `Create a short finished passage, presentation segment, or source record that correctly embodies “${focus.front}”. Reverse-engineer its outline and explain why each element appears where it does.`,
    marking: (focus) => `The artefact and outline must reflect ${focus.back} Credit coherence, structural recovery, and functional explanation.`,
    variation: () => 'Reorder two elements and analyse the damage to meaning or flow.',
  },
  {
    label: 'Criteria derivation', marks: 7,
    prompt: (topic, focus) => `Derive a practical assessment rubric for a ${topic} task from the principle behind “${focus.front}”. Include observable performance levels and defend the weight assigned to each criterion.`,
    marking: (focus) => `The rubric must operationalise ${focus.back} Credit relevant criteria, observable descriptors, coherent weighting, and defence.`,
    variation: () => 'Apply the rubric to a borderline example and justify the score.',
  },
  {
    label: 'Strategy comparison', marks: 8,
    prompt: (_, focus, related) => `Develop two defensible communication strategies for the same academic task, one centred on “${focus.front}” and the other on “${related.front}”. Compare their effect on clarity, credibility, efficiency, and audience response.`,
    marking: (focus, related) => `Use both anchors: ${focus.back} ${related.back} Credit viable strategies, criteria-based comparison, and a justified choice.`,
    variation: () => 'Change the medium from written to spoken, or spoken to written, and reassess.',
  },
  {
    label: 'Ethical challenge', marks: 9,
    prompt: (topic, focus) => `Construct an ethically difficult ${topic} case involving “${focus.front}”. Identify competing responsibilities, evaluate at least two responses, and defend a decision while acknowledging its limitation.`,
    marking: (focus) => `The response should apply ${focus.back} Credit a genuine dilemma, balanced evaluation, reasoned decision, and limitation.`,
    variation: () => 'Change one stakeholder’s power or access to information and reconsider the decision.',
  },
  {
    label: 'Integrated communication case', marks: 9,
    prompt: (topic, focus, related) => `Produce a complete response plan for a high-stakes ${topic} situation requiring both “${focus.front}” and “${related.front}”. Include preparation, the communication artefact, feedback or revision, and criteria for success.`,
    marking: (focus, related) => `The plan must integrate ${focus.back} It must also account for ${related.back} Credit completeness, audience fit, revision logic, and measurable success criteria.`,
    variation: () => 'Introduce a misunderstanding halfway through and show how the plan detects and repairs it.',
  },
];

function getExamModes(course: string) {
  if (course.startsWith('COM')) return communicationExamModes;
  if (course === 'CSI141' || course === 'CSI142') return programmingExamModes;
  if (course === 'CSI161') return systemsExamModes;
  return quantitativeExamModes;
}

function buildExamPaper(course: string, topic: string, cards: CardItem[]) {
  const core = cards.slice(0, 3);
  const modes = getExamModes(course);
  return Array.from({ length: 30 }, (_, index) => {
    const mode = modes[Math.floor(index / core.length)];
    const focus = core[index % core.length];
    const related = core[(index + 1) % core.length];
    return {
      ...mode,
      focus,
      promptText: mode.prompt(topic, focus, related),
      markingText: mode.marking(focus, related),
      variationText: mode.variation(topic, focus),
    };
  });
}

export function ChapterReview({ course, topic, summary }: ChapterPageProps) {
  const cards = getCards(topic, summary);
  return <div>
    <HighlightCard variant="neutral" title={`${course} review: ${topic}`} description="Work closed-book first. This page contains 18 flashcards and a separate 15-question knowledge check."><p className="m-0">{summary}</p></HighlightCard>
    <Checklist title="Mastery checklist" rules={[
      ...cards.slice(0, 6).map((card) => ({ type: 'must' as const, text: `Answer: ${card.front}` })),
      { type: 'must' as const, text: `Apply the main method from ${topic} to an unfamiliar example.` },
      { type: 'must' as const, text: 'Explain each step and verify the result independently.' },
      { type: 'avoid' as const, text: 'Do not treat recognition while rereading as recall.' },
    ]} />
    <h2>Core recap</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{cards.slice(0, 6).map((card, index) => <Card key={card.front} className="m-0"><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">Key idea {index + 1}</p><h3 className="mt-0 text-base">{card.front}</h3><p>{card.back}</p></Card>)}</div>
    <h2>Closed-book review routine</h2>
    <StepByStep title={`Review ${topic} in four passes`}>
      <Step number={1} title="Retrieve">Write the core answers from memory before opening the notes.</Step>
      <Step number={2} title="Reconstruct">Reproduce the main definition, rule, process, diagram, proof, or trace in full.</Step>
      <Step number={3} title="Apply">Solve a changed example and justify the method.</Step>
      <Step number={4} title="Repair">Find the first incorrect step and redo the task without looking.</Step>
    </StepByStep>
    <h2>18 flashcards</h2>
    <p>Complete the full deck and repeat every missed card before moving on.</p>
    <FlashcardDeck cards={cards} title={`${course}: ${topic}`} />
    <h2>15-question review quiz</h2>
    <Quiz title={`${topic} review assessment`} questions={getQuiz(topic, summary)} />
  </div>;
}

export function ChapterQuestions({ course, topic, summary }: ChapterPageProps) {
  const cards = getCards(topic, summary);
  return <div>
    <HighlightCard variant="info" title={`${course} guided practice`} description="Complete all 15 questions before checking the answer guidance."><p className="m-0">The set progresses from recall to explanation, application, transfer, and error analysis.</p></HighlightCard>
    {Array.from({ length: 15 }, (_, index) => {
      const item = practicePrompt(index, topic, cards);
      return <ExamQuestion key={index} title={`Question ${index + 1} [6 marks]`}><SubQuestion part="a" prompt={<>{item.prompt} [6]</>} solution={<><p><strong>Anchor:</strong> {item.card.back}</p><p>A complete response states the governing idea, makes its conditions visible, applies it in connected steps, and checks the conclusion.</p></>} variations={<>Change one input, condition, audience, or representation and solve the revised version.</>} /></ExamQuestion>;
    })}
  </div>;
}

export function ChapterExam({ course, topic, summary }: ChapterPageProps) {
  const cards = getCards(topic, summary);
  const paper = buildExamPaper(course, topic, cards);
  const totalMarks = paper.reduce((sum, item) => sum + item.marks, 0);
  return <div>
    <div className="my-6 rounded-xl border border-fd-border bg-fd-muted/20 p-5"><div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2 font-semibold"><GraduationCap size={18} /> {course} advanced mock exam</span>
      <span className="inline-flex items-center gap-2"><Clock3 size={17} /> 180 minutes</span>
      <span className="inline-flex items-center gap-2"><BookCheck size={17} /> {totalMarks} marks</span>
      <span className="inline-flex items-center gap-2"><FileQuestion size={17} /> 30 questions</span>
    </div></div>
    <PresetCard type="exam" title="Exam instructions"><ul><li>Work without notes and attempt every question.</li><li>State definitions and assumptions before using them.</li><li>These questions require transfer; rehearsed answers earn limited credit.</li><li>Open marking guidance only after completing the paper.</li></ul></PresetCard>
    <h2>Advanced mock paper: {topic}</h2>
    <p>{summary} This paper moves from precise foundations into diagnosis, constrained application, reverse reasoning, evaluation, and chapter synthesis. Marks increase with the number of decisions, representations, and justifications required.</p>
    {paper.map((item, index) => <ExamQuestion key={index} title={`Question ${index + 1}: ${item.label} [${item.marks} marks]`}>
      <SubQuestion part="a" prompt={item.promptText} solution={<><p><strong>Conceptual anchor:</strong> {item.focus.back}</p><p><strong>Marking guidance:</strong> {item.markingText}</p></>} variations={item.variationText} />
    </ExamQuestion>)}
    <HighlightCard variant="neutral" title="After marking"><p className="m-0">Record every lost mark under missing knowledge, wrong method choice, execution error, or weak communication. Reattempt only the affected parts after a short break.</p></HighlightCard>
  </div>;
}
