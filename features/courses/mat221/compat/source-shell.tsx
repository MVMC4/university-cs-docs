import Script from 'next/script';
import type { ReactNode } from 'react';
import PageMath from '../source/components/PageMath';
import TopicView from '../source/components/TopicView';
import { TOPICS } from '../source/lib';
import { Mat221CourseBodyClass } from './course-body-class';
import { Mat221SourceSidebar } from './source-sidebar';
import { sourceSlugFromPageUrl } from './routes';

function SourceTopicFrame({ sourceSlug, children }: { sourceSlug: string; children: ReactNode }) {
  const topic = TOPICS.find((item) => item.slug === sourceSlug);
  if (!topic) return children;
  function Body() { return <>{children}</>; }
  return <TopicView t={topic} Body={Body} />;
}

export function Mat221SourceShell({ pageUrl, children }: { pageUrl: string; children: ReactNode }) {
  const sourceSlug = sourceSlugFromPageUrl(pageUrl);
  const isNotes = pageUrl.endsWith('/notes');
  return <div className="mat221-source">
    <Mat221CourseBodyClass />
    <Script id="mat221-mathjax-config" strategy="beforeInteractive">{`window.MathJax={tex:{inlineMath:[["$","$"],["\\\\(","\\\\)"]],displayMath:[["$$","$$"],["\\\\[","\\\\]"]],processEscapes:true},options:{enableMenu:true,skipHtmlTags:["script","noscript","style","textarea","pre","code","annotation","semantics","math"]}};`}</Script>
    <Script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" strategy="afterInteractive" />
    <PageMath />
    <div className="shell">
      <Mat221SourceSidebar />
      <main className="maincol">{isNotes && sourceSlug ? <SourceTopicFrame sourceSlug={sourceSlug}>{children}</SourceTopicFrame> : children}</main>
    </div>
  </div>;
}
