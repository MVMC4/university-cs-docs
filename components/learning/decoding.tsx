import Link from 'next/link';
import type { ReactNode } from 'react';
import { Step, Steps } from '@/components/interactive/step-by-step';
import general from '@/content/decoding/command-words.json';

/**
 * Decoding the questions: how to read a question before answering it.
 *
 * `CommandWords` shows the method and the table of command words that every course shares, plus an optional
 * course dictionary from content/decoding/<course>.json (CSI243 has one for Haskell). `DecodeQuestion` works
 * through one real question: as written, in plain English, and how to answer. Both are server components.
 */

type Method = { title: string; text: string }[];
type CourseData = {
  title: string;
  intro?: string;
  method?: Method;
  highlight?: string[];
  /** Generic command words that are ordinary nouns in this course (a Haskell list), so they are not marked. */
  ignore?: string[];
  dictionary?: { says: string; means: string; write: string }[];
};

const SAFE_COURSE = /^[a-z0-9][a-z0-9-]*$/;

async function loadCourse(course?: string): Promise<CourseData | null> {
  if (!course || !SAFE_COURSE.test(course)) return null;
  try {
    const module_ = await import(`@/content/decoding/${course}.json`);
    return (module_.default ?? module_) as CourseData;
  } catch {
    return null;
  }
}

/** `code` spans and [text](url) links, nothing else. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) return <Link key={index} href={link[2]}>{link[1]}</Link>;
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/** The question as written, with `code` spans and the command words marked. */
function Highlighted({ text, words }: { text: string; words: string[] }) {
  const escaped = [...new Set(words)].sort((a, b) => b.length - a.length).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = escaped.length ? new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi') : null;
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        if (!pattern) return <span key={index}>{part}</span>;
        return (
          <span key={index}>
            {part.split(pattern).map((piece, pieceIndex) =>
              pieceIndex % 2 === 1 ? <mark key={pieceIndex}>{piece}</mark> : <span key={pieceIndex}>{piece}</span>,
            )}
          </span>
        );
      })}
    </>
  );
}

function MethodSteps({ method }: { method: Method }) {
  return (
    <Steps title="Decoding any question">
      {method.map((step) => (
        <Step key={step.title} title={step.title}>
          <Inline text={step.text} />
        </Step>
      ))}
    </Steps>
  );
}

export async function CommandWords({ course }: { course?: string }) {
  const specific = await loadCourse(course);
  const method = specific?.method ?? general.method;
  return (
    <details className="ui-decode">
      <summary>Command words and how to read a question</summary>
      <div className="ui-decode-body">
        <MethodSteps method={method} />

        <h4>Command words</h4>
        <table>
          <thead>
            <tr><th>If the question says</th><th>It is asking you to</th><th>A good answer has</th></tr>
          </thead>
          <tbody>
            {general.words.map((entry) => (
              <tr key={entry.word}>
                <td><strong>{entry.word}</strong></td>
                <td>{entry.means}</td>
                <td>{entry.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {specific?.dictionary && (
          <>
            <h4>{specific.title}</h4>
            {specific.intro && <p><Inline text={specific.intro} /></p>}
            <table>
              <thead>
                <tr><th>The question says</th><th>It means</th><th>You write</th></tr>
              </thead>
              <tbody>
                {specific.dictionary.map((row) => (
                  <tr key={row.says}>
                    <td><Inline text={row.says} /></td>
                    <td><Inline text={row.means} /></td>
                    <td><Inline text={row.write} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </details>
  );
}

export async function DecodeQuestion({
  question,
  plain,
  title,
  source,
  course,
  children,
}: {
  question: string;
  plain: string;
  title?: string;
  source?: string;
  course?: string;
  children?: ReactNode;
}) {
  const specific = await loadCourse(course);
  const ignored = new Set(specific?.ignore ?? []);
  const words = [...general.words.map((entry) => entry.word).filter((word) => !ignored.has(word)), ...(specific?.highlight ?? [])];
  return (
    <section className="ui-decode-q">
      {title && <h3>{title}</h3>}
      <span className="ui-decode-label">As written{source ? ` (${source})` : ''}</span>
      <blockquote><Highlighted text={question} words={words} /></blockquote>
      <span className="ui-decode-label">In plain English</span>
      <p className="ui-decode-plain"><Inline text={plain} /></p>
      {children && (
        <>
          <span className="ui-decode-label">How to answer</span>
          <div className="ui-decode-answer">{children}</div>
        </>
      )}
    </section>
  );
}
