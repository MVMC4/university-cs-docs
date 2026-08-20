import type { Topic } from "../lib/types";
import type { ComponentType } from "react";
import { TOPICS } from "../lib";

/* Notes are deliberately learning-first. Interactive recall tools live on
   the Review route so a long chapter cannot bury the actual explanation. */
export default function TopicView({ t, Body }: { t: Topic; Body?: ComponentType<any> }) {
  var test1 = new Set(["foundations", "substitution", "partials", "parts", "reduction-formulas", "trig", "trig-substitution", "weierstrass", "improper", "numerical", "applications"]);
  var test2 = new Set(["lhopital", "sequences-series"]);
  var assessment = test1.has(t.slug) ? "Test 1 syllabus window" : test2.has(t.slug) ? "Test 2 syllabus window" : "Test 3 and final exam";
  var assessmentNote = test1.has(t.slug) ? "The official scheme places this before Test 1; confirm the lecturer's announced stopping point as the test approaches." : test2.has(t.slug) ? "The official scheme places limits, sequences and the opening series work before Test 2." : "The official scheme places convergence tests, power series and Taylor series in the final teaching block.";
  var topicIndex = TOPICS.findIndex(function (item) { return item.slug === t.slug; });
  var nextTopic = topicIndex >= 0 ? TOPICS[topicIndex + 1] : undefined;
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week}</p>
      <h1>{t.title}</h1>
      <p className="lead">{t.blurb}</p>
      <div className="exam-rail"><span className="chip bad">Assessment track</span><strong>{assessment}</strong><span>{assessmentNote}</span></div>
      <section id="overview" className="mdx-content"><h2>Guided notes</h2><p className="section-lead">Move in order: name the idea, state the rule, work one example, then try the variation before moving on.</p>{Body ? <Body /> : <p className="hint">This topic's MDX notes are not available yet.</p>}</section>
      <section id="summary"><h2>Chapter summary</h2><div className="chapter-summary"><span className="chip ink">The chapter in brief</span><p className="summary-statement">{t.cornell.summary}</p><h3>Rules and decisions to remember</h3><ul className="summary-points">{t.cornell.cues.map(function (item, index) { return <li key={index}><strong>{item.cue}</strong><span>{item.note}</span></li>; })}</ul></div></section>
      <div className="next-step card"><span className="chip grn">Next step</span><h3>Close the notes and write the questions</h3><p>Use the sidebar when you are ready for review tools. For now, test whether you can reproduce the method and explain each line without looking back.</p>{nextTopic ? <p><strong>Connection to the next lesson:</strong> The decisions practised here prepare you for <a href={"/topics/" + nextTopic.slug}>{nextTopic.title}</a>, where the same algebra, identities, or convergence reasoning is used in a new setting.</p> : <p><strong>Course connection:</strong> Taylor series closes the sequence from antiderivatives to approximation; revise it together with power-series convergence and remainder bounds.</p>}<a className="btn sm" href={"/topics/" + t.slug + "/questions"}>Open written questions →</a></div>
    </>
  );
}
