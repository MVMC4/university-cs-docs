'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

/* Typesets the whole document ONCE per navigation (debounced).
   This replaces the old MathBox MutationObserver: pomodoro ticks, flashcard
   flips and goal edits now trigger zero MathJax work. */
export default function PageMath() {
  const path = usePathname();
  useEffect(function () {
    var timer = setTimeout(function () { typesetWhenMathJaxReady(); }, 80);
    return function () { clearTimeout(timer); };
  }, [path]);
  return null;
}
