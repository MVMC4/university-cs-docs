import { notFound } from "next/navigation";
import Quiz from "../../../../components/Quiz";
import { TOPICS } from "../../../../lib";

export function generateStaticParams() {
  return TOPICS.map(function (t) { return { slug: t.slug }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  return t ? { title: t.title + " Quiz", description: "Test your MAT 221 understanding of " + t.title + " with a focused checkpoint quiz.", alternates: { canonical: "/topics/" + t.slug + "/quiz" } } : {};
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  if (!t) notFound();
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week} · quiz</p>
      <h1>{t.title} — <span className="it">quiz</span></h1>
      <p className="lead">A closed-book multiple-choice check. Use Questions for full written working; use this tab to test speed, recognition, and exam decisions.</p>
      <section id="quiz"><h2>Checkpoint quiz</h2><Quiz questions={t.quiz} /></section>
    </>
  );
}
