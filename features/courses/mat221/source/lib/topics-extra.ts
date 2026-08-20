import type { Extra } from "./types";
const R = String.raw;
export const EXTRAS: Record<string, Extra> = {
foundations: {
  blocks: [{ t: "visual", img: "/visuals/foundations-area.svg", title: "Area accumulates under f", caption: "FTC 1: the area grows at rate f(x) as the right edge moves.", tex: R`\(\frac{d}{dx}\int_a^x f(t)dt = f(x)\)` }],
  cues: [
    { cue: "Linearity", note: R`\(\int (af+bg) = a\int f + b\int g\).` },
    { cue: "Zero-width interval", note: R`\(\int_a^a f = 0\).` }],
  cards: [
    { front: R`\(\int 7\,dx\)`, back: R`\(7x+C\).` },
    { front: R`\(\int x^{1/2}\,dx\)`, back: R`\(\frac{2}{3}x^{3/2}+C\).` },
    { front: R`\(\int e^x\,dx,\ \int \cos x\,dx,\ \int \sin x\,dx\)`, back: R`\(e^x+C;\ \sin x+C;\ -\cos x+C\).` },
    { front: R`\(\frac{d}{dx}\int_0^x \sin t\,dt\)`, back: R`\(\sin x\) — FTC 1, no integration needed.` },
    { front: R`\(\int_a^a f(x)\,dx\)`, back: R`\(0\).` },
    { front: "If F' = f and G' = f, then F - G is…", back: "a constant (that is exactly what +C means)." },
    { front: R`\(\int x^{-3}\,dx\)`, back: R`\(-\frac{1}{2x^2}+C\).` }],
  quiz: [
    { q: R`\(\int x^{-3}dx =\)`, options: [R`\(-\frac{1}{2x^2}+C\)`, R`\(\frac{x^{-2}}{2}+C\)`, R`\(-2x^{-4}+C\)`, R`\(\ln|x^{-3}|+C\)`], answer: 0, explain: "Raise to -2, divide by -2." },
    { q: "FTC Part 2 requires F to be…", options: ["any function", "an antiderivative of f on [a,b]", "positive on [a,b]", "a polynomial"], answer: 1, explain: "F' = f on the whole interval." },
    { q: R`\(\frac{d}{dx}\int_2^x t^3\,dt =\)`, options: [R`\(x^3\)`, R`\(x^3-8\)`, R`\(3x^2\)`, R`\(\frac{x^4}{4}-4\)`], answer: 0, explain: "FTC 1: plug the moving edge in." }],
  traps: [{ title: "Discontinuous integrand", text: "FTC 2 needs continuity on [a,b]; a blow-up inside makes it improper (Topic 07)." }]
},
substitution: {
  blocks: [{ t: "visual", img: "/visuals/substitution-u.svg", title: "u absorbs the inside", caption: "Spot u whose derivative (up to a constant) sits next to dx." }],
  cards: [
    { front: R`\(\int (2x+1)^5\,dx\)`, back: R`\(\frac{(2x+1)^6}{12}+C\) — divide by the inner derivative 2.` },
    { front: R`\(\int x e^{x^2}dx\)`, back: R`\(\frac12 e^{x^2}+C\).` },
    { front: R`\(\int \frac{dx}{x\ln x}\)`, back: R`\(\ln|\ln x|+C\), u = \ln x.` },
    { front: R`\(\int \sin^3x\cos x\,dx\)`, back: R`\(\frac{\sin^4x}{4}+C\), u = \sin x.` },
    { front: R`\(\int_0^2 x\sqrt{4-x^2}\,dx\)`, back: R`\(\frac{8}{3}\) (u = 4-x^2, limits 4→0).` },
    { front: R`\(\int \frac{e^{1/x}}{x^2}dx\)`, back: R`\(-e^{1/x}+C\), u = 1/x.` },
    { front: "Signal that a u will work", back: "a multiple of u' already appears as a factor." }],
  quiz: [
    { q: R`\(\int \frac{x\,dx}{\sqrt{x^2+9}} =\)`, options: [R`\(\sqrt{x^2+9}+C\)`, R`\(\frac12\ln(x^2+9)+C\)`, R`\(\frac{1}{\sqrt{x^2+9}}+C\)`, R`\(2\sqrt{x^2+9}+C\)`], answer: 0, explain: "u = x^2+9 gives du/2 = x dx; ∫u^{-1/2}/2 = u^{1/2}." },
    { q: R`With u = x^2+1, du =`, options: ["2x dx", "x dx", "dx", "x^2 dx"], answer: 0, explain: "Differentiate u." }],
  traps: [{ title: "Mixed x and u", text: "never evaluate a u-antiderivative at x-limits; convert limits or back-substitute first." }]
},
"trig-substitution": {
  blocks: [{ t: "visual", img: "/visuals/trig-triangle.svg", title: "Reference triangle back-sub", caption: "x = a tanθ: opposite x, adjacent a, hypotenuse √(x²+a²)." }],
  cards: [
    { front: R`\(\int \tan^2x\,dx\)`, back: R`\(\tan x - x + C\) (identity tan² = sec²-1).` },
    { front: R`\(\int \sec^2x\,dx,\ \int \sec x\tan x\,dx,\ \int \csc^2x\,dx\)`, back: R`\(\tan x+C;\ \sec x+C;\ -\cot x+C\).` },
    { front: R`\(\int \frac{dx}{x^2+9}\)`, back: R`\(\frac13\tan^{-1}\frac{x}{3}+C\).` },
    { front: R`Sub for \(\sqrt{x^2-9}\)`, back: R`\(x=3\sec\theta\).` },
    { front: R`\(\int \sin x\cos x\,dx\)`, back: R`\(\frac{\sin^2x}{2}+C\), u = \sin x.` },
    { front: R`\(\int \frac{dx}{\sqrt{x^2-4}}\)`, back: R`\(\ln|x+\sqrt{x^2-4}|+C\).` }],
  quiz: [
    { q: R`\(\int \frac{dx}{\sqrt{x^2-4}} =\)`, options: [R`\(\sin^{-1}(x/2)+C\)`, R`\(\ln|x+\sqrt{x^2-4}|+C\)`, R`\(\tan^{-1}(x/2)+C\)`, R`\(\frac12\ln(x^2-4)+C\)`], answer: 1, explain: "sec-sub case; the log form is standard." },
    { q: R`For \(\sqrt{a^2+x^2}\) use`, options: [R`\(x=a\sin\theta\)`, R`\(x=a\tan\theta\)`, R`\(x=a\sec\theta\)`, R`\(x=a\cos\theta\)`], answer: 1, explain: "1+tan² = sec² kills the root." }],
  traps: [{ title: "Wrong triangle side", text: "label the triangle from YOUR substitution; hypotenuse is the root expression." }]
},
parts: {
  blocks: [{ t: "visual", img: "/visuals/parts-tabular.svg", title: "Tabular method", caption: "Differentiate to 0, integrate down, alternate signs on diagonals." }],
  cards: [
    { front: R`\(\int x\cos x\,dx\)`, back: R`\(x\sin x+\cos x+C\).` },
    { front: R`\(\int x e^{-x}dx\)`, back: R`\(-(x+1)e^{-x}+C\).` },
    { front: R`\(\int \tan^{-1}x\,dx\)`, back: R`\(x\tan^{-1}x-\frac12\ln(1+x^2)+C\).` },
    { front: R`\(\int x^2 e^x\,dx\)`, back: R`\(e^x(x^2-2x+2)+C\).` },
    { front: "Tabular sign pattern", back: "+, -, +, - down the diagonals." },
    { front: R`\(\int_0^\pi x\sin x\,dx\)`, back: R`\(\pi\) (boundary term -x cos x gives π).` }],
  quiz: [
    { q: R`Best u for \(\int x^2\ln x\,dx\)`, options: [R`\(x^2\)`, R`\(\ln x\)`, R`\(x^2\ln x\)`, R`\(1\)`], answer: 1, explain: "Logs top LIATE." },
    { q: R`\(\int_0^\pi x\sin x\,dx =\)`, options: [R`\(\pi\)`, "2", "0", R`\(\frac{\pi}{2}\)`], answer: 0, explain: "[-x cos x + sin x] from 0 to π." }],
  traps: [{ title: "dv choice", text: "dv must be integrable AND the new integral simpler; otherwise swap roles." }]
},
partials: {
  blocks: [{ t: "visual", img: "/visuals/partials-split.svg", title: "One term per factor per power", caption: "Repeated linear factors need the full ladder of powers." }],
  cards: [
    { front: R`Template for \(\frac{1}{x^2(x+1)}\)`, back: R`\(\frac{A}{x}+\frac{B}{x^2}+\frac{C}{x+1}\).` },
    { front: R`\(\int \frac{dx}{x^2-4}\)`, back: R`\(\frac14\ln\left|\frac{x-2}{x+2}\right|+C\).` },
    { front: "Cover-up method", back: "to get A over (x-a): plug x=a into the rest of the fraction." },
    { front: R`First step for \(\frac{x^2}{x^2-1}\)`, back: R`divide: \(1+\frac{1}{x^2-1}\).` },
    { front: R`\(\int \frac{2x+2}{x^2+2x+5}dx\)`, back: R`\(\ln(x^2+2x+5)+C\) (numerator is exactly du).` },
    { front: R`\(\int \frac{dx}{(x+1)^2+4}\)`, back: R`\(\frac12\tan^{-1}\frac{x+1}{2}+C\).` }],
  quiz: [
    { q: R`Number of terms for a factor \((x-1)^3\)`, options: ["1", "2", "3", "6"], answer: 2, explain: "Powers 1, 2 and 3." },
    { q: R`In \(\frac{2x}{(x-3)(x+3)}=\frac{A}{x-3}+\frac{B}{x+3}\), A =`, options: ["1", "2", "3", "6"], answer: 0, explain: "Cover-up: 2·3/(3+3) = 1." }],
  traps: [{ title: "Bx+C skipped", text: "irreducible quadratics need a linear numerator, always." }]
},
numerical: {
  blocks: [{ t: "visual", img: "/visuals/numerical-rules.svg", title: "Rectangles → trapezoids → parabolas", caption: "Higher-order fit = faster error decay: n⁻² vs n⁻⁴." }],
  cards: [
    { front: "Midpoint rule", back: R`Σ f(mid_i)·Δx — often beats trapezoidal at same n.` },
    { front: "Doubling n: trapezoidal error", back: "≈ 4× smaller (O(n⁻²))." },
    { front: "Doubling n: Simpson error", back: "≈ 16× smaller (O(n⁻⁴))." },
    { front: "Simpson exactness", back: "exact for polynomials up to degree 3." },
    { front: R`S_2 for \(\int_0^2 x^3 dx\)`, back: "exact: 4." },
    { front: "Trapezoidal on concave-up f", back: "overestimates (chords above curve)." }],
  quiz: [
    { q: R`Which rule is exact for f(x)=x^2?`, options: ["left rectangles", "trapezoidal", "Simpson", "none"], answer: 2, explain: "Simpson is exact up to cubics." },
    { q: "On a concave-up curve, trapezoidal…", options: ["overestimates", "underestimates", "is exact", "diverges"], answer: 0, explain: "Chords lie above the curve." }],
  traps: [{ title: "K in the error bound", text: "K bounds |f''| (trapezoid) or |f⁗| (Simpson) on the WHOLE interval." }]
},
applications: {
  blocks: [{ t: "visual", img: "/visuals/applications-washer.svg", title: "Washer geometry", caption: "Outer radius R from axis to far curve, inner r to near curve." , tex: R`\(V=\pi\int(R^2-r^2)dx\)`}],
  cards: [
    { front: "Area between f (top) and g", back: R`\(\int (f-g)\,dx\).` },
    { front: "Average value of f on [a,b]", back: R`\(\frac{1}{b-a}\int_a^b f\,dx\).` },
    { front: "Shell radius about y-axis", back: "x (distance from strip to axis)." },
    { front: "Shell height between top f, bottom g", back: R`\(f-g\).` },
    { front: "When to prefer shells", back: "when strips are parallel to the axis, or solving for x is painful." },
    { front: R`Centroid \(\bar y\) uses`, back: R`mid-height \(\frac12(f+g)\) times strip area \((f-g)dx\).` }],
  quiz: [
    { q: R`Average value of x^2 on [0,3]`, options: ["1", "3", "9", "27"], answer: 1, explain: "(1/3)·(27/3) = 3." },
    { q: "Shell height between top f and bottom g:", options: [R`\(f-g\)`, R`\(g-f\)`, R`\(f+g\)`, R`\(\frac12(f^2-g^2)\)`], answer: 0, explain: "Top minus bottom." }],
  traps: [{ title: "Radius vs height", text: "radius is distance to the AXIS; height is top minus bottom. Swapping them is fatal." }]
},
improper: {
  blocks: [{ t: "visual", img: "/visuals/improper-limit.svg", title: "Cut off, then limit", caption: "Shade up to t; ask whether the area settles as t → ∞." }],
  cards: [
    { front: R`\(\int_1^\infty \frac{dx}{x^3}\)`, back: "1/2 (p = 3 > 1)." },
    { front: R`\(\int_0^1 \frac{dx}{x^2}\)`, back: "diverges (p = 2 > 1 at the 0-end)." },
    { front: R`\(\int_0^\infty e^{-2x}dx\)`, back: "1/2." },
    { front: R`\(\int_2^\infty \frac{dx}{x\ln x}\)`, back: R`diverges: \(\ln\ln t \to \infty\).` },
    { front: "0 ≤ f ≤ g and ∫g diverges ⇒ ∫f…", back: "no conclusion (comparison only works the other way)." },
    { front: R`\(\int_0^\infty e^{-3x}dx\)`, back: "1/3." }],
  quiz: [
    { q: "Which diverges?", options: [R`\(\int_1^\infty\frac{dx}{x^2}\)`, R`\(\int_0^1\frac{dx}{\sqrt{x}}\)`, R`\(\int_1^\infty\frac{dx}{x}\)`, R`\(\int_0^\infty e^{-x}dx\)`], answer: 2, explain: "Harmonic tail, p = 1." },
    { q: R`\(\int_0^\infty e^{-3x}dx =\)`, options: ["1", "1/3", "3", "diverges"], answer: 1, explain: "(-1/3)e^{-3x} from 0 to ∞." }],
  traps: [{ title: "Both tails", text: "∫_{-∞}^{∞} needs BOTH halves finite; a symmetric limit alone is not convergence." }]
},
lhopital: {
  blocks: [{ t: "visual", img: "/visuals/lhopital-rates.svg", title: "Comparing growth rates", caption: "logs ≪ powers ≪ exponentials: the hierarchy decides most limits at ∞." }],
  cards: [
    { front: R`\(\lim_{x\to0}\frac{1-\cos x}{x^2}\)`, back: "1/2." },
    { front: R`\(\lim_{x\to\infty}\frac{x^2}{e^x}\)`, back: "0 (exponential outruns power)." },
    { front: R`\(\lim_{x\to0^+}x^x\)`, back: "1 (log limit is 0)." },
    { front: R`\(\lim_{x\to\infty}x^{1/x}\)`, back: "1." },
    { front: R`\(\lim_{x\to0}\frac{\tan x - x}{x^3}\)`, back: "1/3." },
    { front: R`\(\lim_{x\to\infty}\frac{\ln x}{\sqrt{x}}\)`, back: "0." }],
  quiz: [
    { q: R`\(\lim_{x\to0}\frac{e^x-1}{x} =\)`, options: ["0", "1", "e", "∞"], answer: 1, explain: "0/0; derivative ratio e^x/1 → 1." },
    { q: R`\(\lim_{x\to\infty}\frac{\ln x}{\sqrt{x}} =\)`, options: ["0", "1", "∞", "1/2"], answer: 0, explain: "∞/∞; (1/x)/(1/(2√x)) = 2/√x → 0." }],
  traps: [{ title: "Looping derivatives", text: "if L'Hopital cycles back to the original form, stop and rewrite (algebra or known limits)." }]
},
taylor: {
  blocks: [{ t: "visual", img: "/visuals/taylor-fit.svg", title: "Polynomials hugging f", caption: "Each added term matches one more derivative at a." }],
  cards: [
    { front: R`\(T_1\) of f at a`, back: "the tangent line f(a)+f'(a)(x-a)." },
    { front: R`\(x^4\) term of cos x`, back: R`\(+\frac{x^4}{24}\).` },
    { front: R`Series of \(\frac{1}{1+x}\)`, back: R`\(\sum(-1)^n x^n\), |x|<1.` },
    { front: R`Series of \(\sin(x^2)\)`, back: R`\(\sum\frac{(-1)^n x^{4n+2}}{(2n+1)!}\).` },
    { front: R`\(T_3\) of \(\ln x\) at 1`, back: R`\((x-1)-\frac{(x-1)^2}{2}+\frac{(x-1)^3}{3}\).` },
    { front: "Alternating series error bound", back: "≤ first omitted term." }],
  quiz: [
    { q: R`Maclaurin coefficient of x^2 in cos x`, options: [R`\(-\frac12\)`, R`\(\frac12\)`, R`\(-1\)`, "0"], answer: 0, explain: "-1/2!." },
    { q: "For an alternating series with decreasing terms, |error| ≤", options: ["first omitted term", "last included term", "n!", "the whole tail sum of magnitudes"], answer: 0, explain: "The alternating series estimation theorem." }],
  traps: [{ title: "Substituting into remainders", text: "the Lagrange bound must be recomputed for the transformed series, not copied." }]
},
"sequences-series": {
  blocks: [{ t: "visual", img: "/visuals/series-tests.svg", title: "Choosing a test", caption: "Factorials → ratio; rational-like → comparison; alternating → AST." }],
  cards: [
    { front: R`\(\sum \frac{1}{n(n+1)}\)`, back: "telescopes to 1." },
    { front: "p-series converges iff", back: "p > 1." },
    { front: R`\(\lim (1+1/n)^n\)`, back: "e." },
    { front: R`\(\sum \frac{(-1)^n}{n!}\)`, back: "absolutely convergent (ratio test L = 0)." },
    { front: "Σ|a_n| converges ⇒ Σa_n…", back: "converges (absolute ⇒ ordinary)." },
    { front: R`\(\lim \frac{n}{\sqrt{n^2+1}}\)`, back: "1." }],
  quiz: [
    { q: R`\(\sum_{n=1}^\infty \frac{1}{n^{1.5}}\)`, options: ["converges", "diverges", "inconclusive", "converges conditionally"], answer: 0, explain: "p = 1.5 > 1." },
    { q: R`\(\sum (1/n - 1/(n+1)) =\)`, options: ["0", "1", "∞", "ln 2"], answer: 1, explain: "Partial sums collapse to 1 - 1/(n+1)." }],
  traps: [{ title: "AST half-checked", text: "alternation alone is not enough: magnitudes must decrease AND tend to 0." }]
},
"power-series": {
  blocks: [{ t: "visual", img: "/visuals/power-interval.svg", title: "Interval of convergence", caption: "Ratio test gives the open interval; endpoints are hand-checked." }],
  cards: [
    { front: R`Interval of \(\sum x^n/n!\)`, back: "(-∞, ∞)." },
    { front: R`Interval of \(\sum n x^n\)`, back: "(-1, 1); both endpoints diverge." },
    { front: R`\(\frac{d}{dx}\sum x^n\) (|x|<1)`, back: R`\(\sum n x^{n-1} = \frac{1}{(1-x)^2}\).` },
    { front: R`\(\sum_{n\ge1} x^n/n =\)`, back: R`\(-\ln(1-x)\), interval [-1,1).` },
    { front: R`Integrating \(\sum(-x^2)^n\) gives`, back: R`\(\tan^{-1}x\) series.` },
    { front: R`Radius of \(\sum (x-3)^n/2^n\)`, back: "2 (centre 3)." }],
  quiz: [
    { q: R`Radius of \(\sum (x-3)^n/2^n\)`, options: ["1", "2", "3", "∞"], answer: 1, explain: "|x-3|/2 < 1." },
    { q: R`At x = -1, \(\sum x^n/n\)`, options: ["converges", "diverges", "equals 0", "equals ln 2"], answer: 0, explain: "Alternating harmonic." }],
  traps: [{ title: "Centre blindness", text: "ratio test gives |x-a| < R; the interval is centred at a, not 0." }]
}
};
