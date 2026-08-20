import "../styles/base.css";
import "../styles/layout.css";
import "../styles/flashcards.css";
import "../styles/quiz.css";
import "../styles/planner.css";
import "../styles/print.css";
import "../styles/video.css";
import "katex/dist/katex.min.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "../components/Sidebar";
import PageMath from "../components/PageMath";
import { TOPICS } from "../lib";
import { SITE_URL } from "../lib/site-url";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { TopicLink } from "../lib/types";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "MAT 221 Flow Docs | Calculus I Study Guide", template: "%s | MAT 221 Flow Docs" },
  description: "Understand MAT 221 Calculus I with guided chapter notes, worked examples, chapter summaries, quizzes, flashcards, exam practice and a printable formula sheet.",
  keywords: ["MAT 221", "Calculus I", "University of Botswana", "calculus notes", "worked calculus examples", "calculus practice questions", "calculus formula sheet"],
  authors: [{ name: "MAT 221 Flow Docs" }],
  creator: "MAT 221 Flow Docs",
  applicationName: "MAT 221 Flow Docs",
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_BW",
    url: "/",
    siteName: "MAT 221 Flow Docs",
    title: "MAT 221 Flow Docs — Calculus I, understood",
    description: "Guided notes, worked examples, chapter summaries and exam practice for MAT 221 Calculus I.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MAT 221 Flow Docs — Calculus I, understand the method" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "MAT 221 Flow Docs — Calculus I, understood",
    description: "Guided notes, worked examples, chapter summaries and exam practice for MAT 221 Calculus I.",
    images: ["/og.png"]
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  manifest: "/manifest.webmanifest"
};

/* Only the minimal link fields cross into the client Sidebar. */
const LINKS: TopicLink[] = TOPICS.map(function (t) { return { slug: t.slug, num: t.num, title: t.title }; });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script id="mj-config" strategy="beforeInteractive">
          {`window.MathJax={tex:{inlineMath:[["$","$"],["\\\\(","\\\\)"]],displayMath:[["$$","$$"],["\\\\[","\\\\]"]],processEscapes:true},options:{enableMenu:true,skipHtmlTags:["script","noscript","style","textarea","pre","code","annotation","semantics","math"]}};`}
        </Script>
        <Script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" strategy="afterInteractive" />
        <PageMath />
        <div className="shell">
          <Sidebar topics={LINKS} />
          <main className="maincol">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
