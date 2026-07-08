'use client';

import katex from 'katex';

export const MathText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch { return <span key={index}>{part}</span>; }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch { return <span key={index}>{part}</span>; }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};