import { notFound } from "next/navigation";
import ExamPractice from "../../../../components/ExamPractice";
import { TOPICS } from "../../../../lib";
import { getRepairTopic } from "../../../../lib/content-model";

export function generateStaticParams() {
  return TOPICS.map(function (t) { return { slug: t.slug }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  return t ? { title: t.title + " Exam Practice", description: "Timed MAT 221 exam practice for " + t.title + " with worked reasoning and error diagnostics.", alternates: { canonical: "/topics/" + t.slug + "/exam-practice" } } : {};
}

export default async function ExamPracticePage({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  var modelTopic = getRepairTopic(resolved.slug);
  if (!t || !modelTopic) notFound();
  return (
    <>
      <p className="eyebrow">Topic {t.num} · {t.week} · exam practice</p>
      <h1>{t.title} - <span className="it">exam practice</span></h1>
      <p className="lead">A production set with prerequisite checks, method selection, controlled variation, error analysis, transfer, and exam-style synthesis. Attempt first; reveal only when you are ready to inspect the reasoning.</p>
      <section id="exam-practice"><h2>Assessment-shaped production</h2><ExamPractice slug={t.slug} items={modelTopic.practice} /></section>
    </>
  );
}
