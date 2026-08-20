import { notFound } from "next/navigation";
import Flashcards from "../../../../components/Flashcards";
import LectureReviewVideo from "../../../../components/LectureReviewVideo";
import { TOPICS } from "../../../../lib";
import { getRepairTopic } from "../../../../lib/content-model";

export function generateStaticParams() {
  return TOPICS.map(function (t) { return { slug: t.slug }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  return t ? { title: t.title + " Review", description: "Review " + t.title + " with a guided video, active-recall flashcards and common calculus exam traps.", alternates: { canonical: "/topics/" + t.slug + "/review" } } : {};
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  if (!t) notFound();
  var modelTopic = getRepairTopic(t.slug);
  var worked = modelTopic ? modelTopic.examples.map(function (example) { return { h: example.source_title, example: { title: example.source_title, items: example.worked_steps } }; }) : [];
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week} · review</p>
      <h1>{t.title} — <span className="it">review</span></h1>
      <p className="lead">A retrieval session for definitions, formulas, choices of method, and exam traps. Use Questions for written working and Quiz for timed recognition.</p>
      <LectureReviewVideo slug={t.slug} />
      <section id="cards"><h2>Flashcards ({t.cards.length})</h2><Flashcards cards={t.cards} worked={worked} storageKey={"mat221-flashcards-" + t.slug} /></section>
      <section id="traps"><h2>Exam traps</h2>{t.traps.map(function (tr, i) { return <div className="trap" key={i}><span className="chip bad">Trap {i + 1}</span><strong>{tr.title}. </strong>{tr.text}</div>; })}</section>
    </>
  );
}
