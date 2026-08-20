import Link from "next/link";
import { TOPICS } from "../lib";

export default function Home() {
  return (
    <>
      <div className="hero">
        <p className="eyebrow">University of Botswana · Mathematics · Semester 1, 2026/2027</p>
        <h1>Don&rsquo;t memorize, <span className="it">understand.</span></h1>
        <p className="lead">A focused companion for MAT 221 Calculus I. Every topic includes guided notes, a concise chapter summary, visual examples, active-recall flashcards, checkpoint quizzes and the examiner-style traps that cost marks.</p>
        <div className="home-scene" aria-hidden="true">
          <span className="scene-grid" />
          <span className="scene-sun" />
          <span className="scene-ridge ridge-far" />
          <span className="scene-ridge ridge-mid" />
          <span className="scene-ridge ridge-near" />
          <span className="scene-path" />
          <span className="scene-curve" />
          <span className="scene-point point-one" />
          <span className="scene-point point-two" />
          <span className="scene-delta delta-x">Δx</span>
          <span className="scene-delta delta-y">Δy</span>
          <span className="scene-caption">a small landscape for big ideas</span>
        </div>
      </div>
      <div className="grid">
        <div className="tcard"><span className="n">Method</span><h3>Chapter summaries</h3><p>The essential rules, conditions and decisions from each chapter in one quick revision block.</p></div>
        <div className="tcard"><span className="n">Method</span><h3>Flashcards</h3><p>Expanded active-recall decks with shuffle, keyboard control and progress tracking.</p></div>
        <div className="tcard"><span className="n">Method</span><h3>Visual examples</h3><p>A figure per topic: geometry, triangles and rule comparisons you can picture.</p></div>
        <div className="tcard"><span className="n">Method</span><h3>Exam traps</h3><p>The classic mark-losers, flagged before they cost you.</p></div>
      </div>
      <h2>Tools</h2>
      <div className="grid">
        <Link className="tcard" href="/formula-sheet"><span className="n">Tool</span><h3>Formula sheet</h3><p>Every formula of the course on one printable page, grouped by topic.</p></Link>
        <Link className="tcard" href="/resources"><span className="n">Hub</span><h3>Resources hub</h3><p>Textbooks, free courses, visual intuition channels, computational tools and study science.</p></Link>
      </div>
      <h2>Chapters — notes &amp; review</h2>
      <div className="grid">
        {TOPICS.map(function (t) {
          return (
            <Link className="tcard" href={"/topics/" + t.slug} key={t.slug}>
              <span className="n">{t.num} · {t.week}</span>
              <h3>{t.title}</h3>
              <p>{t.blurb}</p>
            </Link>
          );
        })}
      </div>
      <h2>Assessment map</h2>
      <table>
        <tbody>
          <tr><th>Item</th><th>Date</th><th>Time</th><th>Venue</th><th>Weight</th></tr>
          <tr><td>Test 1</td><td>Sun 06 Sep 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td><td rowSpan={3}>CA = 50% (average of 3 tests)</td></tr>
          <tr><td>Test 2</td><td>Sun 04 Oct 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td></tr>
          <tr><td>Test 3</td><td>Sun 25 Oct 2026</td><td>13:00–15:00</td><td>233/G12, 230/G5</td></tr>
          <tr><td>Special Test (all of 1, 2 &amp; 3)</td><td>Wed 04 Nov 2026</td><td>18:00–20:00</td><td>TBA</td><td>—</td></tr>
          <tr><td>Final Exam (2 h)</td><td>TBA</td><td>—</td><td>—</td><td>50%</td></tr>
        </tbody>
      </table>
      <h2>How to use this pack</h2>
      <ol className="steps">
        <li>Read the <strong>overview</strong> once, slowly: theorems first, examples second, figures third.</li>
        <li>Read the <strong>chapter summary</strong>, close it, then reproduce the key rules and conditions from memory.</li>
        <li>Run the <strong>flashcards</strong> until every card is &ldquo;Got it&rdquo; twice (shuffle on).</li>
        <li>Take the <strong>quiz</strong> closed-book; retake until 100%.</li>
        <li>Memorize the <strong>formula sheet</strong> and the <strong>exam traps</strong> — protected free marks.</li>
      </ol>
    </>
  );
}
