import { notFound } from "next/navigation";
import WrittenQuestionBank from "../../../../components/WrittenQuestionBank";
import { TOPICS } from "../../../../lib";
import { getRepairTopic } from "../../../../lib/content-model";

export function generateStaticParams() {
  return TOPICS.map(function (t) { return { slug: t.slug }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  return t ? { title: t.title + " Written Questions", description: "Written MAT 221 practice for " + t.title + " with complete solutions, method choices and checks.", alternates: { canonical: "/topics/" + t.slug + "/questions" } } : {};
}

export default async function QuestionsPage({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  var modelTopic = getRepairTopic(resolved.slug);
  if (!t || !modelTopic) notFound();
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week} · questions</p>
      <h1>{t.title} — <span className="it">questions</span></h1>
      <p className="lead">Self-contained, exam-style questions with marks shown. Everything needed is in the question, so you do not have to switch back to the notes or hunt for a worked-example label.</p>
      <section id="questions"><h2>Written question bank</h2><p className="section-lead">Answer directly on paper, show the method-bearing steps, then reveal the solution and compare the first line where your approach differs.</p><WrittenQuestionBank items={modelTopic.practice} /></section>
    </>
  );
}
