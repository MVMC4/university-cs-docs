'use client';

import katex from 'katex';

export const MathText = ({ text }: { text: any }) => {
  if (!text) return null;

  // 🛡️ BULLETPROOF FIX: If text is a React node, number, or object, just render it directly.
  // This prevents the 'a.split is not a function' crash when passing JSX to MathText.
  if (typeof text !== 'string') {
    return <>{text}</>;
  }

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