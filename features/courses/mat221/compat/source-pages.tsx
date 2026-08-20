import Link from 'next/link';
import ExamPractice from '../source/components/ExamPractice';
import Flashcards from '../source/components/Flashcards';
import FoundationsReviewVideo from '../source/components/FoundationsReviewVideo';
import LectureReviewVideo from '../source/components/LectureReviewVideo';
import Quiz from '../source/components/Quiz';
import WrittenQuestionBank from '../source/components/WrittenQuestionBank';
import { getRepairTopic } from '../source/lib/content-model';
import { TOPICS } from '../source/lib';
import { mat221DocsBase, sourceTopicHref } from './routes';

function topicFor(slug: string) {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function Mat221SourceQuestionsPage({ slug }: { slug: string }) {
  const topic = topicFor(slug);
  const modelTopic = getRepairTopic(slug);
  if (!topic || !modelTopic) return null;
  return <>
    <p className="eyebrow">Topic {topic.num} · {topic.week} · questions</p>
    <h1>{topic.title} — <span className="it">questions</span></h1>
    <p className="lead">Self-contained, exam-style questions with marks shown. Everything needed is in the question, so you do not have to switch back to the notes or hunt for a worked-example label.</p>
    <section id="questions"><h2>Written question bank</h2><p className="section-lead">Answer directly on paper, show the method-bearing steps, then reveal the solution and compare the first line where your approach differs.</p><WrittenQuestionBank items={modelTopic.practice} /></section>
  </>;
}

export function Mat221SourceQuizPage({ slug }: { slug: string }) {
  const topic = topicFor(slug);
  if (!topic) return null;
  return <>
    <p className="eyebrow">Topic {topic.num} · {topic.week} · quiz</p>
    <h1>{topic.title} — <span className="it">quiz</span></h1>
    <p className="lead">A closed-book multiple-choice check. Use Questions for full written working; use this tab to test speed, recognition, and exam decisions.</p>
    <section id="quiz"><h2>Checkpoint quiz</h2><Quiz questions={topic.quiz} /></section>
  </>;
}

export function Mat221SourceReviewPage({ slug }: { slug: string }) {
  const topic = topicFor(slug);
  if (!topic) return null;
  const modelTopic = getRepairTopic(slug);
  const worked = modelTopic ? modelTopic.examples.map((example) => ({ h: example.source_title, example: { title: example.source_title, items: example.worked_steps } })) : [];
  return <>
    <p className="eyebrow">Topic {topic.num} · {topic.week} · review</p>
    <h1>{topic.title} — <span className="it">review</span></h1>
    <p className="lead">A retrieval session for definitions, formulas, choices of method, and exam traps. Use Questions for written working and Quiz for timed recognition.</p>
    {slug === 'foundations' ? <FoundationsReviewVideo /> : null}
    <LectureReviewVideo slug={slug} />
    <section id="cards"><h2>Flashcards ({topic.cards.length})</h2><Flashcards cards={topic.cards} worked={worked} storageKey={`mat221-flashcards-${slug}`} /></section>
    <section id="traps"><h2>Exam traps</h2>{topic.traps.map((trap, index) => <div className="trap" key={index}><span className="chip bad">Trap {index + 1}</span><strong>{trap.title}. </strong>{trap.text}</div>)}</section>
  </>;
}

export function Mat221SourceExamPracticePage({ slug }: { slug: string }) {
  const topic = topicFor(slug);
  const modelTopic = getRepairTopic(slug);
  if (!topic || !modelTopic) return null;
  return <>
    <p className="eyebrow">Topic {topic.num} · {topic.week} · exam practice</p>
    <h1>{topic.title} - <span className="it">exam practice</span></h1>
    <p className="lead">A production set with prerequisite checks, method selection, controlled variation, error analysis, transfer, and exam-style synthesis. Attempt first; reveal only when you are ready to inspect the reasoning.</p>
    <section id="exam-practice"><h2>Assessment-shaped production</h2><ExamPractice slug={slug} items={modelTopic.practice} /></section>
  </>;
}

export function Mat221SourceCourseOverview() {
  return <>
    <div className="hero">
      <p className="eyebrow">University of Botswana · Mathematics · Semester 1, 2026/2027</p>
      <h1>Don&apos;t memorize, <span className="it">understand.</span></h1>
      <p className="lead">A focused companion for MAT 221 Calculus I. Every topic includes guided notes, a concise chapter summary, visual examples, active-recall flashcards, checkpoint quizzes and the examiner-style traps that cost marks.</p>
      <div className="home-scene" aria-hidden="true"><span className="scene-grid" /><span className="scene-sun" /><span className="scene-ridge ridge-far" /><span className="scene-ridge ridge-mid" /><span className="scene-ridge ridge-near" /><span className="scene-path" /><span className="scene-curve" /><span className="scene-point point-one" /><span className="scene-point point-two" /><span className="scene-delta delta-x">Δx</span><span className="scene-delta delta-y">Δy</span><span className="scene-caption">a small landscape for big ideas</span></div>
    </div>
    <div className="grid"><div className="tcard"><span className="n">Method</span><h3>Chapter summaries</h3><p>The essential rules, conditions and decisions from each chapter in one quick revision block.</p></div><div className="tcard"><span className="n">Method</span><h3>Flashcards</h3><p>Expanded active-recall decks with shuffle, keyboard control and progress tracking.</p></div><div className="tcard"><span className="n">Method</span><h3>Visual examples</h3><p>A figure per topic: geometry, triangles and rule comparisons you can picture.</p></div><div className="tcard"><span className="n">Method</span><h3>Exam traps</h3><p>The classic mark-losers, flagged before they cost you.</p></div></div>
    <h2>Tools</h2>
    <div className="grid"><Link className="tcard" href={`${mat221DocsBase}/formula-sheet`}><span className="n">Tool</span><h3>Formula sheet</h3><p>Every formula of the course on one printable page, grouped by topic.</p></Link><Link className="tcard" href={`${mat221DocsBase}/planner`}><span className="n">Tool</span><h3>Planner &amp; timers</h3><p>Week-by-week timeline, live exam countdowns and the shared university pomodoro.</p></Link><Link className="tcard" href={`${mat221DocsBase}/resources`}><span className="n">Hub</span><h3>Resources hub</h3><p>Textbooks, free courses, visual intuition channels, computational tools and study science.</p></Link></div>
    <h2>Chapters — notes &amp; review</h2>
    <div className="grid">{TOPICS.map((topic) => <Link className="tcard" href={sourceTopicHref(topic.slug)} key={topic.slug}><span className="n">{topic.num} · {topic.week}</span><h3>{topic.title}</h3><p>{topic.blurb}</p></Link>)}</div>
    <h2>Assessment map</h2>
    <table><tbody><tr><th>Item</th><th>Date</th><th>Time</th><th>Venue</th><th>Weight</th></tr><tr><td>Test 1</td><td>Sun 06 Sep 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td><td rowSpan={3}>CA = 50% (average of 3 tests)</td></tr><tr><td>Test 2</td><td>Sun 04 Oct 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td></tr><tr><td>Test 3</td><td>Sun 25 Oct 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td></tr><tr><td>Special Test (all of 1, 2 &amp; 3)</td><td>Wed 04 Nov 2026</td><td>18:00–20:00</td><td>TBA</td><td>—</td></tr><tr><td>Final Exam (2 h)</td><td>TBA</td><td>—</td><td>—</td><td>50%</td></tr></tbody></table>
    <h2>How to use this pack</h2>
    <ol className="steps"><li>Read the <strong>overview</strong> once, slowly: theorems first, examples second, figures third.</li><li>Read the <strong>chapter summary</strong>, close it, then reproduce the key rules and conditions from memory.</li><li>Run the <strong>flashcards</strong> until every card is “Got it” twice (shuffle on).</li><li>Take the <strong>quiz</strong> closed-book; retake until 100%.</li><li>Memorize the <strong>formula sheet</strong> and the <strong>exam traps</strong> — protected free marks.</li><li>Plan sessions in the <strong>planner</strong> and run pomodoros while practising.</li></ol>
  </>;
}
