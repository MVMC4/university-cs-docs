'use client';

import { Card } from '@/components/callouts/card';
import { Checklist } from '@/components/callouts/checklist';
import { HighlightCard } from '@/components/callouts/highlight-card';
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
