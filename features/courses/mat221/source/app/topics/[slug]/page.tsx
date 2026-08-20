import { notFound } from "next/navigation";
import TopicView from "../../../components/TopicView";
import { TOPICS } from "../../../lib";
import { source } from "../../../lib/source";

/* Static generation: every topic renders to HTML at build time, and the
   content modules stay on the server (never enter the client bundle). */
export function generateStaticParams() {
  return TOPICS.map(function (t) { return { slug: t.slug }; });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  return t ? { title: t.num + " " + t.title, description: t.blurb, alternates: { canonical: "/topics/" + t.slug } } : { title: "MAT 221 Flow Docs" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  var resolved = await params;
  var t = TOPICS.find(function (x) { return x.slug === resolved.slug; });
  if (!t) notFound();
  var page = source.getPage([resolved.slug]);
  return <TopicView t={t} Body={page ? page.data.exports.default : undefined} />;
}
