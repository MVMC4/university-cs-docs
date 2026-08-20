/* Narrow, explicit MathJax helpers.
   There is deliberately NO MutationObserver anywhere in this codebase:
   callers typeset only when content they own actually changes
   (mount, route change, user answer). */

export function typeset(el?: HTMLElement | null) {
  if (typeof window === "undefined") return;
  var mj = (window as any).MathJax;
  if (!mj || !mj.typesetPromise) return;
  /* Route-level static math is typeset once without clearing. Interactive
     islands clear only their own subtree when their content changes. This
     prevents two renderers (or two overlapping passes) from duplicating a
     formula while still supporting flips, reveals, and quiz feedback. */
  if (el && mj.typesetClear) mj.typesetClear([el]);
  mj.typesetPromise(el ? [el] : undefined).catch(function () {});
}

export function typesetWhenMathJaxReady(el?: HTMLElement | null) {
  if (typeof window === "undefined") return;
  var attempts = 0;
  function wait() {
    var mj = (window as any).MathJax;
    if (mj && mj.startup && mj.startup.promise) {
      mj.startup.promise.then(function () { typeset(el); }).catch(function () {});
      return;
    }
    if (attempts++ < 120) window.setTimeout(wait, 50);
  }
  wait();
}
