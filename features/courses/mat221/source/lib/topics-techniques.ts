import type { Topic } from "./types";
const R = String.raw;
export const T_TECHNIQUES: Topic[] = [
{
  slug: "parts", num: "04", week: "Week 2", title: "Integration by Parts",
  blurb: "The product rule reversed; LIATE chooses u; cyclic integrals solved algebraically.",
  blocks: [
    { t: "theorem", tag: "FB-3", title: "Integration by parts", tex: R`\int u\,dv = uv-\int v\,du`, body: "Choose u by LIATE (Log, Inverse trig, Algebraic, Trig, Exponential); dv is everything else. The new integral must be simpler." },
    { t: "example", title: R`\int xe^x\,dx`, items: [R`\(u=x,\ dv=e^xdx\).`, R`\(xe^x-\int e^xdx=\boxed{(x-1)e^x+C}\).`] },
    { t: "example", title: R`\int e^x\sin x\,dx \text{ (cyclic)}`, items: [R`\(I=e^x\sin x-\int e^x\cos x\,dx\); second parts gives \(\int e^x\cos x=e^x\cos x+I\).`, R`\(2I=e^x(\sin x-\cos x)\) → \(\boxed{\frac{e^x}{2}(\sin x-\cos x)+C}\).`] },
    { t: "p", md: R`Speed tool: the tabular method for algebraic × exponential/trig — differentiate one column to 0, integrate the other, alternate signs down the diagonals.` }
  ],
  cornell: { cues: [
    { cue: "LIATE", note: "priority list for choosing u." },
    { cue: R`\(\int\ln x\,dx\)`, note: R`force parts with \(dv=dx\): \(x\ln x-x+C\).` },
    { cue: "Cyclic signal", note: "the original integral reappears: solve for I." },
    { cue: "Definite parts", note: R`\([uv]_a^b-\int_a^b v\,du\).` }
  ], summary: "u by LIATE, dv the rest; trade the integral for a simpler one; cycles solved algebraically." },
  cards: [
    { front: "LIATE order", back: "Log, Inverse trig, Algebraic, Trig, Exponential." },
    { front: R`\(\int xe^x dx\)`, back: R`\((x-1)e^x+C\).` },
    { front: R`\(\int\ln x\,dx\)`, back: R`\(x\ln x-x+C\).` },
    { front: R`\(\int x^2\sin x\,dx\)`, back: R`\(-x^2\cos x+2x\sin x+2\cos x+C\).` },
    { front: R`\(\int_0^1 xe^{-x}dx\)`, back: R`\(1-\frac{2}{e}\).` }
  ],
  quiz: [
    { q: R`Best u for \(\int x\ln x\,dx\)`, options: [R`\(u=x\)`, R`\(u=\ln x\)`, R`\(u=x\ln x\)`, R`\(u=1\)`], answer: 1, explain: "Logs beat algebraics in LIATE." },
    { q: R`\(\int xe^x dx =\)`, options: [R`\(xe^x+e^x+C\)`, R`\((x-1)e^x+C\)`, R`\(\frac{x^2}{2}e^x+C\)`, R`\(e^x+C\)`], answer: 1, explain: "Use \(uv-\int v\,du\) with \(v=e^x\)." },
    { q: R`Cyclic case \(\int e^x\cos x\,dx\) ends by`, options: ["tabulating", "solving 2I = ... algebraically", "trig substitution", "partial fractions"], answer: 1, explain: "The integral returns; collect and divide." },
    { q: R`Definite by-parts formula`, options: [R`\(\int_a^b u\,dv=uv-\int v\,du\) with uv at bounds`, R`\(uv|_a^b+\int v du\)`, R`\(\int u dv =0\)`, "none"], answer: 0, explain: "Boundary term evaluated, then minus the new integral." }
  ],
  traps: [
    { title: "Wrong u", text: "choosing u = e^x against a polynomial makes the integral worse, not better." },
    { title: "Sign of v", text: R`dv = sin x dx gives v = -cos x; dropped minus signs are the classic parts error.` },
    { title: "Definite boundary term", text: "forgetting to evaluate [uv] at the bounds loses half the answer." }
  ]
},
{
  slug: "partials", num: "03", week: "Week 2", title: "Partial Fraction Decomposition",
  blurb: "Un-mix a rational function into integrable pieces: four cases, two solving methods.",
  blocks: [
    { t: "p", md: R`Decomposition rewrites \(\frac{P(x)}{Q(x)}\) as a sum of simpler fractions — the reverse of adding over a common denominator. It works because every simple piece is integrable: logs, powers, arctans.` },
    { t: "steps", items: ["Proper? If deg P >= deg Q, long-divide first.", "Factor Q completely into linear and irreducible quadratic factors.", "Write the template: one term per factor per power.", "Clear denominators; solve constants by substituting roots and/or equating coefficients.", "Integrate piece by piece (complete the square for quadratics)."] },
    { t: "list", items: [R`Case 1 distinct linear: \(\frac{A}{x-a}\). Case 2 repeated: one term per power. Case 3 irreducible quadratic: \(\frac{Bx+C}{q(x)}\). Case 4 improper: divide first.`] },
    { t: "example", title: R`\int\frac{x+3}{x(x-1)^2}dx`, items: [R`Template \(\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^2}\); clear: \(x+3=A(x-1)^2+Bx(x-1)+Cx\).`, R`\(x=0:A=3\); \(x=1:C=4\); coeff \(x^2\): \(B=-3\).`, R`\(\boxed{3\ln|x|-3\ln|x-1|-\frac{4}{x-1}+C}\)`] },
    { t: "example", title: R`\int\frac{dx}{x^2+2x+5}`, items: [R`Complete the square: \((x+1)^2+4\).`, R`\(\boxed{\frac12\tan^{-1}\frac{x+1}{2}+C}\)`] }
  ],
  cornell: { cues: [
    { cue: "Step 0", note: "improper? divide first." },
    { cue: "Repeated factor", note: "one term per power, 1..m." },
    { cue: "Irreducible quadratic", note: R`numerator must be \(Bx+C\), not a constant.` },
    { cue: "Solving constants", note: "roots kill terms fast; coefficients fill the rest." },
    { cue: "Quadratic won't factor", note: "complete the square to log or arctan." }
  ], summary: "Factor, template per power, solve constants two ways, integrate logs/powers/arctans." },
  cards: [
    { front: R`Template for \(\frac{1}{(x-1)(x+2)}\)`, back: R`\(\frac{A}{x-1}+\frac{B}{x+2}\).` },
    { front: R`Template for \(\frac{1}{x(x-1)^2}\)`, back: R`\(\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^2}\).` },
    { front: R`\(\int\frac{dx}{x^2-1}\)`, back: R`\(\frac12\ln|\frac{x-1}{x+1}|+C\).` },
    { front: R`\(\int\frac{Bx}{x^2+1}dx\)`, back: R`\(\frac{B}{2}\ln(x^2+1)\).` },
    { front: R`\(\int\frac{C}{x^2+1}dx\)`, back: R`\(C\tan^{-1}x\).` }
  ],
  quiz: [
    { q: R`Correct template for \(\frac{x+3}{x(x-1)^2}\)`, options: [R`\(\frac{A}{x}+\frac{B}{(x-1)^2}\)`, R`\(\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^2}\)`, R`\(\frac{Ax+B}{x(x-1)^2}\)`, R`\(\frac{A}{x-1}+\frac{B}{(x-1)^2}\)`], answer: 1, explain: "Every factor, every power." },
    { q: R`In \(\frac{5x-1}{(x-2)(x+1)}=\frac{A}{x-2}+\frac{B}{x+1}\), A =`, options: ["2", "3", "5", "-1"], answer: 1, explain: "Cover-up: (5*2-1)/(2+1) = 3." },
    { q: "First step when deg P >= deg Q?", options: ["partial fractions", "polynomial long division", "substitution", "parts"], answer: 1, explain: "Templates only apply to proper fractions." },
    { q: R`\(\int\frac{dx}{x^2+2x+5} =\)`, options: [R`\(\ln(x^2+2x+5)+C\)`, R`\(\frac12\tan^{-1}\frac{x+1}{2}+C\)`, R`\(\tan^{-1}(x+1)+C\)`, R`\(\frac{1}{2}\ln|x+1|+C\)`], answer: 1, explain: "(x+1)^2 + 4, arctan form with a = 2." }
  ],
  traps: [
    { title: "Missing repeated term", text: "omitting the middle power term makes the system unsolvable." },
    { title: "Constant over a quadratic", text: R`using A instead of Bx+C on irreducible quadratics is wrong.` },
    { title: "Skipping division", text: "improper fractions must be divided before decomposing." }
  ]
},
{
  slug: "numerical", num: "10", week: "Week 5", title: "Riemann, Trapezoidal, and Simpson Rules",
  blurb: "When no antiderivative exists: rectangles, trapezoids, parabolas — and their error behaviour.",
  blocks: [
    { t: "p", md: R`Some integrals (e.g. \(\int e^{x^2}dx\)) have no elementary antiderivative, so the FTC cannot produce a number. Numerical rules approximate area directly; they are the limit-of-sums definition of the integral made practical.` },
    { t: "theorem", tag: "FB-6", title: "The two rules", tex: R`T_n=\frac{\Delta x}{2}[f_0+2f_1+\cdots+2f_{n-1}+f_n], \quad S_n=\frac{\Delta x}{3}[f_0+4f_1+2f_2+\cdots+4f_{n-1}+f_n]`, body: "Trapezoidal weights 1,2,...,2,1; Simpson (n even) 1,4,2,...,4,1. Simpson is exact for cubics." },
    { t: "theorem", tag: "Errors", title: "How accuracy scales", tex: R`|E_T|\le\frac{K(b-a)^3}{12n^2}, \quad |E_S|\le\frac{K(b-a)^5}{180n^4}`, body: "Doubling n makes trapezoidal ~4x better but Simpson ~16x better." },
    { t: "example", title: R`\int_1^3\frac{dx}{x},\ n=4`, items: [R`values \(1,\frac23,\frac12,\frac25,\frac13\).`, R`\(T_4=\frac{67}{60}\approx1.1167\); \(S_4=1.1000\); exact \(\ln3\approx1.0986\).`] }
  ],
  cornell: { cues: [
    { cue: "Riemann sum", note: R`\(\sum f(x_i^*)\Delta x\); the integral is its limit.` },
    { cue: "Trapezoid weights", note: "1,2,...,2,1 with dx/2." },
    { cue: "Simpson weights", note: "1,4,2,...,4,1 with dx/3; n even." },
    { cue: "Exactness", note: "Simpson is exact up to degree 3 (its error uses the fourth derivative)." },
    { cue: "Concave down f", note: "trapezoids underestimate." }
  ], summary: "Rectangles define, trapezoids linear, Simpson parabolic; errors scale n^-2 vs n^-4." },
  cards: [
    { front: "Trapezoidal weight pattern", back: "1,2,2,...,2,1 times dx/2." },
    { front: "Simpson weight pattern", back: "1,4,2,4,...,4,1 times dx/3, n even." },
    { front: "Simpson exact for polynomials up to degree…", back: "3." },
    { front: "Trapezoidal error order", back: R`\(O(n^{-2})\); bound uses max |f''|.` },
    { front: R`\(\Delta x\)`, back: R`\(\frac{b-a}{n}\).` }
  ],
  quiz: [
    { q: R`T_4 for \(\int_1^3 dx/x\) is`, options: ["1.0986", "1.1167", "1.1000", "1.25"], answer: 1, explain: "67/60." },
    { q: "Simpson with n = 2 on a cubic gives", options: ["an overestimate", "an underestimate", "the exact value", "zero"], answer: 2, explain: "The fourth derivative of a cubic is zero." },
    { q: "The trapezoidal error bound uses which derivative?", options: ["f'", "f''", "f'''", "f⁽⁴⁾"], answer: 1, explain: "The trapezoidal bound uses the maximum of |f''|; Simpson uses |f⁽⁴⁾|." },
    { q: "On a concave-down curve, trapezoidal rule…", options: ["overestimates", "underestimates", "is exact", "diverges"], answer: 1, explain: "Chords lie below the curve." }
  ],
  traps: [
    { title: "Odd n in Simpson", text: "Simpson requires an even number of subintervals." },
    { title: "Endpoint weights", text: "endpoints get weight 1; doubling them is the most common arithmetic slip." },
    { title: "Swapped patterns", text: "using 1,4,2,... for trapezoidal (or vice versa) invalidates the rule." }
  ]
}
];
