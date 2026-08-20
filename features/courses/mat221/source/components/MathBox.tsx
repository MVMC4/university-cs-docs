'use client';
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

/* Lightweight MathJax container kept for compatibility.
   Typesets on mount and when `deps` changes ONLY — no MutationObserver.
   Prefer server-rendered math + PageMath; use this only inside client
   islands whose math genuinely changes with state. */
export default function MathBox({ className, children, deps }: { className?: string; children?: ReactNode; deps?: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(function () { typesetWhenMathJaxReady(ref.current); }, [deps]);
  return <div ref={ref} className={className} aria-live="polite">{children}</div>;
}
