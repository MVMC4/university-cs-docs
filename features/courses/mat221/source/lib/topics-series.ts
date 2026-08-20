import type { Topic } from "./types";
const R = String.raw;
export const T_SERIES: Topic[] = [
{
  slug: "taylor", num: "15", week: "Week 14", title: "Taylor & Maclaurin Series",
  blurb: "Polynomial imitations of functions: match derivatives at a point; bound the error with Lagrange.",
  blocks: [
    { t: "p", md: "A Taylor polynomial matches f in value, slope, curvature... up to order n at a; Maclaurin means a = 0. The Lagrange remainder quantifies the imitation error." },
    { t: "theorem", tag: "FB-10", title: "Taylor polynomial & remainder", tex: R`T_n(x)=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k,\quad R_n=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}`, body: "Bound the remainder by bounding the (n+1)-th derivative on the interval." },
    { t: "list", items: [R`\(e^x=\sum\frac{x^n}{n!}\); \(\sin x=\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}\); \(\cos x=\sum\frac{(-1)^nx^{2n}}{(2n)!}\); \(\frac1{1-x}=\sum x^n\); \(\ln(1+x)=\sum\frac{(-1)^{n-1}x^n}{n}\).`] },
    { t: "example", title: R`Estimate \(e^{0.2}\) via \(T_3\)`, items: [R`\(1+0.2+0.02+0.001333=1.221333\).`, R`Error \(\le\frac{3(0.2)^4}{24}=0.0002\).`] },
    { t: "example", title: R`\(T_2\) of \(\sqrt{x}\) at 4`, items: [R`\(2+\frac{x-4}{4}-\frac{(x-4)^2}{64}\); \(\sqrt{4.1}\approx2.02484\).`] }
  ],
  cornell: { cues: [
    { cue: "Taylor vs Maclaurin", note: "Maclaurin = Taylor at a = 0." },
    { cue: "Coefficient k", note: R`\(f^{(k)}(a)/k!\) — do not forget the factorial.` },
    { cue: "Lagrange remainder", note: R`uses \(f^{(n+1)}(c)\) at some unknown c: bound it.` },
    { cue: "Building from known series", note: R`substitute/multiply instead of differentiating (e.g. \(x^2e^x\)).` }
  ], summary: "Match derivatives, divide by factorials, shift by (x-a)^k; remainder bounded by the next derivative." },
  cards: [
    { front: "Maclaurin series of e^x", back: R`\(\sum x^n/n!\).` },
    { front: R`\(T_2\) of \(\sqrt{x}\) at 4`, back: R`\(2+\frac{x-4}{4}-\frac{(x-4)^2}{64}\).` },
    { front: "Lagrange remainder formula", back: R`\(\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}\).` },
    { front: R`Series of \(\ln(1+x)\)`, back: R`\(x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\), R = 1.` },
    { front: R`\(x^2e^x\) series`, back: R`\(\sum x^{n+2}/n!\), R = infinity.` }
  ],
  quiz: [
    { q: R`Coefficient of \(x^3\) in the Maclaurin series of \(e^x\)`, options: ["1/3", "1/6", "1/2", "3"], answer: 1, explain: "1/3! = 1/6." },
    { q: R`\(T_2\) of \(\sqrt{x}\) at a=4: coefficient of \((x-4)^2\)`, options: [R`\(-1/32\)`, R`\(-1/64\)`, R`\(1/64\)`, R`\(-1/16\)`], answer: 1, explain: "f''(4)/2! = (-1/32)/2." },
    { q: "The Lagrange remainder involves which derivative?", options: ["f'", R`\(f^{(n)}\)`, R`\(f^{(n+1)}\)`, "f''"], answer: 2, explain: "At some c between a and x." },
    { q: R`Radius of convergence of \(\sum x^n/n!\)`, options: ["0", "1", "infinity", "e"], answer: 2, explain: "Ratio test limit 0 for all x." }
  ],
  traps: [
    { title: "(x-a)^k not x^k", text: "at a ≠ 0 the powers are shifted; using x^k is wrong." },
    { title: "Forgotten factorial", text: "coefficients are derivatives divided by k!." },
    { title: "Remainder bound", text: "you must bound the (n+1)-th derivative on the whole interval, not at a point." }
  ]
},
{
  slug: "sequences-series", num: "13", week: "Weeks 9-12", title: "Sequences & Convergence Tests",
  blurb: "Bounded monotone sequences converge; geometric series sum; a toolbox of tests decides the rest.",
  blocks: [
    { t: "p", md: "A sequence converges if its terms approach a limit; bounded + monotone guarantees convergence. An infinite series converges if its partial sums do." },
    { t: "theorem", tag: "Geometric", title: "The only series with a clean sum", tex: R`\sum_{n=0}^\infty ar^n=\frac{a}{1-r}\ \ (|r|<1)`, body: "Diverges for |r| >= 1." },
    { t: "list", items: ["Divergence test: terms not → 0 ⇒ divergent (can never prove convergence).", "Ratio test: L < 1 converges absolutely; L > 1 diverges; L = 1 inconclusive.", "Root test: same verdicts with nth roots.", "Comparison & limit comparison with p-series.", "Integral test for positive decreasing terms.", "Alternating series test: terms decrease to 0 ⇒ converges."] },
    { t: "p", md: "Absolute convergence (|a_n| sums) implies convergence and safe reordering; conditional convergence (like the alternating harmonic series) converges but reordering can change the sum." },
    { t: "example", title: R`\(\sum 2\cdot(\tfrac12)^n\) from n=0`, items: [R`a=2, r=1/2: sum \(=\frac{2}{1-1/2}=\boxed{4}\).`] }
  ],
  cornell: { cues: [
    { cue: "Bounded + monotone", note: "⇒ convergent sequence." },
    { cue: "Geometric sum", note: R`\(a/(1-r)\), |r|<1.` },
    { cue: "Divergence test", note: "only proves divergence." },
    { cue: "Ratio L = 1", note: "inconclusive — try another test." },
    { cue: "Conditional convergence", note: "converges, but reordering is dangerous." }
  ], summary: "Sequences via limits and monotonicity; series via the test toolbox; geometric sums exactly." },
  cards: [
    { front: "Geometric series sum", back: R`\(a/(1-r)\) when |r| < 1.` },
    { front: "Divergence test", back: R`if \(a_n\not\to0\), the series diverges.` },
    { front: "Ratio test verdicts", back: "L<1 abs. conv.; L>1 div.; L=1 ?." },
    { front: "Harmonic series", back: "diverges (p = 1)." },
    { front: "Alternating harmonic series", back: "converges conditionally to ln 2." }
  ],
  quiz: [
    { q: R`\(\sum_{n=0}^\infty 2(1/2)^n =\)`, options: ["2", "4", "1", "diverges"], answer: 1, explain: "2/(1-1/2)." },
    { q: "The divergence test can prove…", options: ["convergence", "divergence only", "absolute convergence", "nothing"], answer: 1, explain: "Terms → 0 tells you nothing definitive." },
    { q: "Ratio test with L = 1:", options: ["converges", "diverges", "inconclusive", "converges conditionally"], answer: 2, explain: "Try comparison or integral test." },
    { q: "The alternating harmonic series is…", options: ["absolutely convergent", "conditionally convergent", "divergent", "telescoping"], answer: 1, explain: "Harmonic magnitudes diverge; signs rescue it." }
  ],
  traps: [
    { title: "Divergence test backwards", text: "terms → 0 does NOT imply convergence (harmonic series)." },
    { title: "Ratio = 1", text: "p-series live exactly at L = 1; the ratio test is blind there." },
    { title: "AST conditions", text: "alternating series test needs decreasing magnitudes AND limit 0." }
  ]
},
{
  slug: "power-series", num: "14", week: "Weeks 13-14", title: "Power Series",
  blurb: "Series whose terms are powers of (x-a): radius by ratio test, endpoints by hand, calculus term by term.",
  blocks: [
    { t: "p", md: R`A power series \(\sum c_n(x-a)^n\) converges on an interval centred at a. The ratio test gives the radius R; endpoints must be tested separately by plugging in.` },
    { t: "theorem", tag: "Term-by-term", title: "Calculus inside the radius", tex: R`\frac{d}{dx}\sum c_n(x-a)^n=\sum n c_n(x-a)^{n-1}`, body: "Differentiation and integration term by term keep the same radius R (endpoints may change)." },
    { t: "p", md: "This is how new series are manufactured: differentiate or integrate a known one, e.g. integrating the geometric series gives ln(1+x)." },
    { t: "example", title: R`Radius of \(\sum\frac{x^n}{n}\)`, items: [R`ratio: \(|x|\cdot\frac{n}{n+1}\to|x|\) ⇒ R = 1.`, R`Endpoints: x=1 harmonic diverges; x=-1 alternating converges ⇒ interval \([-1,1)\).`] }
  ],
  cornell: { cues: [
    { cue: "Radius tool", note: "ratio test on |x-a|." },
    { cue: "Endpoints", note: "plug in and use ordinary series tests." },
    { cue: "Term-by-term calculus", note: "same R; endpoints may change." },
    { cue: "Taylor vs Maclaurin", note: "centre a vs centre 0." }
  ], summary: "Ratio test for the radius, hand-check endpoints, and differentiate/integrate series freely inside." },
  cards: [
    { front: R`Radius of \(\sum x^n/n!\)`, back: "infinity." },
    { front: R`Radius of \(\sum x^n\)`, back: "1." },
    { front: R`Interval of \(\sum x^n/n\)`, back: "[-1, 1)." },
    { front: "Maclaurin =", note: "", back: "Taylor centred at 0." }
  ],
  quiz: [
    { q: R`Radius of \(\sum n! x^n\)`, options: ["0", "1", "infinity", "e"], answer: 0, explain: "Ratio limit infinity unless x = 0." },
    { q: "Endpoints of the interval of convergence are decided by…", options: ["the ratio test", "plugging in and testing the numeric series", "the root test", "graphing"], answer: 1, explain: "The ratio test is inconclusive exactly at |x-a| = R." },
    { q: "Term-by-term differentiation changes the radius by…", options: ["squaring it", "nothing", "halving it", "1"], answer: 1, explain: "R unchanged; endpoint behaviour may differ." },
    { q: "A Maclaurin series is a Taylor series with…", options: ["a = 1", "a = 0", "n = 0", "no remainder"], answer: 1, explain: "Centre zero." }
  ],
  traps: [
    { title: "Endpoints skipped", text: "an interval answer without endpoint checks is incomplete." },
    { title: "Radius vs interval", text: "R is a number; the interval also records which endpoints join." },
    { title: "Centre shift", text: R`for \((x-a)^n\) everything is measured from a, not 0.` }
  ]
}
];
