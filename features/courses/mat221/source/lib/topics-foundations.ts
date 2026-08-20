import type { Topic } from "./types";
const R = String.raw;
export const T_FOUNDATIONS: Topic[] = [
{
  slug: "foundations", num: "01", week: "Week 1", title: "Antiderivatives & the FTC",
  blurb: "Reverse derivatives, the +C family, and the two parts of the Fundamental Theorem of Calculus.",
  blocks: [
    { t: "p", md: R`An antiderivative of \(f\) is a function \(F\) with \(F'(x)=f(x)\): differentiation breaks a function into its rate of change, antidifferentiation rebuilds it. Because constants vanish when differentiated, the answer is a whole family: \(\int f(x)\,dx = F(x)+C\).` },
    { t: "theorem", tag: "FTC · Part 1", title: "Differentiation undoes integration", tex: R`\frac{d}{dx}\int_a^x f(t)\,dt = f(x)`, body: "The rate at which accumulated area under f grows equals the height of f at the moving edge." },
    { t: "theorem", tag: "FTC · Part 2", title: "The Evaluation Theorem", tex: R`\int_a^b f(x)\,dx = F(b)-F(a)`, body: "A definite integral equals any antiderivative evaluated at the bounds and subtracted. Every later technique exists to build F for harder f." },
    { t: "p", md: R`Workhorse rule — run the power rule backwards (raise the exponent by one, divide by the new exponent):` },
    { t: "example", title: R`\frac{d}{dx}\int_2^x(3t^2+1)\,dt`, items: [R`The upper limit is the moving edge, so FTC Part 1 applies directly.`, R`Evaluate the integrand at that edge: \(3x^2+1\); no antiderivative is needed.`, R`\boxed{\frac{d}{dx}\int_2^x(3t^2+1)\,dt=3x^2+1}. Variation: if the upper limit is \(x^2\), multiply by its derivative \(2x\).`] },
    { t: "math", tex: R`\int x^n\,dx=\frac{x^{n+1}}{n+1}+C \ (n\neq -1), \qquad \int \frac{dx}{x}=\ln|x|+C` },
    { t: "example", title: R`\int 3x^2\,dx`, items: [R`Raise the power: \(2+1=3\); divide: \(\frac{3x^3}{3}\).`, R`Simplify and add \(C\): \(\boxed{x^3+C}\). Check: \(\frac{d}{dx}(x^3+C)=3x^2\).`] },
    { t: "example", title: R`Area under \(f(x)=2x\) from 1 to 3`, items: [R`\(F(x)=x^2\) (drop \(+C\): it cancels in definite integrals).`, R`\(F(3)-F(1)=9-1=\boxed{8}\); a trapezoid check agrees.`] },
    { t: "why", text: "velocity is the derivative of position, so position is the antiderivative of velocity: integrating speed over a trip recovers distance. The +C is the unknown starting odometer." }
  ],
  cornell: { cues: [
    { cue: "Antiderivative", note: R`\(F\) with \(F'=f\); written \(\int f\,dx=F+C\).` },
    { cue: "Why +C?", note: "Constants die when differentiated, so infinitely many originals share one derivative." },
    { cue: "FTC 1", note: R`\(\frac{d}{dx}\int_a^x f(t)\,dt=f(x)\): accumulation rate = height.` },
    { cue: "FTC 2", note: R`\(\int_a^b f=F(b)-F(a)\): area via any antiderivative.` },
    { cue: "The n = -1 case", note: R`Power rule fails; \(\int dx/x=\ln|x|+C\).` }
  ], summary: "Integration reverses differentiation; the FTC turns area into evaluation, F(b) minus F(a)." },
  cards: [
    { front: R`\(F\) is an antiderivative of \(f\) means…`, back: R`\(F'(x)=f(x)\).` },
    { front: R`\(\int 2x\,dx\)`, back: R`\(x^2+C\) — never drop \(+C\) on an indefinite integral.` },
    { front: "State FTC Part 1", back: R`\(\frac{d}{dx}\int_a^x f(t)\,dt=f(x)\).` },
    { front: "State FTC Part 2", back: R`\(\int_a^b f(x)\,dx=F(b)-F(a)\).` },
    { front: R`\(\int_1^3 2x\,dx\)`, back: R`\(9-1=8\).` },
    { front: R`\(\int x^4\,dx\)`, back: R`\(\frac{x^5}{5}+C\).` }
  ],
  quiz: [
    { q: R`Which is the general antiderivative of \(2x\)?`, options: [R`\(x^2\)`, R`\(x^2+C\)`, R`\(2+C\)`, R`\(x^2/2+C\)`], answer: 1, explain: "Constants vanish under differentiation, so the family needs +C." },
    { q: R`\(\int_1^3 2x\,dx =\)`, options: ["6", "8", "9", "1"], answer: 1, explain: R`\(F(x)=x^2\); \(9-1=8\).` },
    { q: "Why does the constant of integration exist?", options: ["Integrals are scale-free", "Constants differentiate to 0", "It fixes rounding error", "The bounds are unknown"], answer: 1, explain: "Reversing the derivative cannot recover destroyed constant information." },
    { q: "FTC Part 1 says the derivative of the area function is…", options: ["0", "the average of f", "f(x) itself", "F(x)"], answer: 2, explain: "Differentiation undoes accumulation." }
  ],
  traps: [
    { title: "Dropping +C", text: "an indefinite answer without +C loses marks even when the algebra is perfect." },
    { title: "FTC across a blow-up", text: R`\(\int_{-1}^1 dx/x^2 \neq -2\): the integrand explodes at 0 — that is an improper integral (Topic 07).` },
    { title: "Power rule at n = -1", text: R`\(\int dx/x\) is \(\ln|x|+C\), not \(x^0/0\).` }
  ]
},
{
  slug: "substitution", num: "02", week: "Week 1", title: "Integration by Substitution",
  blurb: "The chain rule played backwards: spot an inside function plus (a multiple of) its derivative.",
  blocks: [
    { t: "p", md: R`Substitution reverses the chain rule. An integrand of the shape \(f(g(x))\,g'(x)\) collapses when you set \(u=g(x)\): the \(g'(x)\,dx\) becomes \(du\) and the integral simplifies to \(\int f(u)\,du\).` },
    { t: "theorem", tag: "FB-2", title: "Substitution rule, both forms", tex: R`\int f(g(x))g'(x)\,dx=\int f(u)\,du, \qquad \int_a^b f(g(x))g'(x)\,dx=\int_{g(a)}^{g(b)} f(u)\,du`, body: "Indefinite: back-substitute at the end. Definite: change the limits and never return to x." },
    { t: "steps", items: [R`Choose \(u\) = the inside function (root, denominator, exponent, trig argument).`, R`Differentiate with respect to x: \(\frac{du}{dx}=u'(x)\).`, R`Multiply by \(dx\): \(du=u'(x)\,dx\).`, R`Solve for the exact differential piece present: if the integrand has \(u'(x)\,dx\), replace it by \(du\); if it has only \(dx\), write \(dx=\frac{du}{u'(x)}\) and also rewrite every remaining x in terms of u.`, "Rewrite entirely in u — no x may survive.", "Integrate (FB-1), then back-substitute or use the new limits."] },
    { t: "list", items: [R`\(u\) heuristics: expression inside a power or root; a denominator; an exponent; anything whose derivative sits nearby up to a constant.`] },
    { t: "example", title: R`\int 2x\cos(x^2)\,dx`, items: [R`\(u=x^2\), \(du=2x\,dx\).`, R`\(\int\cos u\,du=\sin u+C\).`, R`\(\boxed{\sin(x^2)+C}\); chain-rule check.`] },
    { t: "example", title: R`\int_0^1 \frac{x}{1+x^2}\,dx`, items: [R`\(u=1+x^2\), \(x\,dx=\frac{du}{2}\); limits \(1\to2\).`, R`\(\frac12\int_1^2\frac{du}{u}=\frac12\ln2\). \(\boxed{\tfrac12\ln2}\)`] }
  ],
  cornell: { cues: [
    { cue: "When to substitute", note: R`integrand contains \(g(x)\) and (a multiple of) \(g'(x)\).` },
    { cue: "Definite integrals", note: "change the limits to u-limits; do not back-substitute." },
    { cue: R`\(\int\tan x\,dx\)`, note: R`\(-\ln|\cos x|+C=\ln|\sec x|+C\) via \(u=\cos x\).` },
    { cue: "Leftover x?", note: "your u was wrong, or solve for x in terms of u (e.g. x = u-1)." },
    { cue: "Constant mismatch", note: R`du may need a constant factor adjusted. Example: \(u=1+x^2\Rightarrow du=2x\,dx\Rightarrow x\,dx=\frac12du\). Do not write \(dx=du/2\) unless the x factor has also been handled.` }
  ], summary: "u = inside, du = derivative piece, rewrite fully, integrate, back-substitute or swap limits." },
  cards: [
    { front: R`\(\int 2x\cos(x^2)dx\)`, back: R`\(\sin(x^2)+C\).` },
    { front: R`\(\int\tan x\,dx\)`, back: R`\(-\ln|\cos x|+C\).` },
    { front: R`\(\int x\sqrt{x+1}\,dx\)`, back: R`\(\tfrac25(x+1)^{5/2}-\tfrac23(x+1)^{3/2}+C\).` },
    { front: R`\(\int_0^{\pi/2}\cos x\,e^{\sin x}dx\)`, back: R`\(u=\sin x\): \(\int_0^1e^u du=e-1\).` },
    { front: R`Best u for \(\int \frac{x}{(x^2+1)^2}dx\)`, back: R`\(u=x^2+1\); answer \(-\frac{1}{2(x^2+1)}+C\).` },
    { front: "How do we get dx?", note: "", back: R`Differentiate \(u=g(x)\): \(du=g'(x)dx\). Then solve for the exact piece present. If \(g'(x)dx\) is present, replace it by \(du\); otherwise use \(dx=du/g'(x)\) and rewrite any remaining x.` }
  ],
  quiz: [
    { q: R`\(\int x\sqrt{x+1}\,dx\) equals`, options: [R`\(\tfrac23(x+1)^{3/2}+C\)`, R`\(\tfrac25(x+1)^{5/2}-\tfrac23(x+1)^{3/2}+C\)`, R`\(\sqrt{x+1}+C\)`, R`\(\tfrac25 x^{5/2}+C\)`], answer: 1, explain: "With u = x+1, x = u-1 must also be replaced." },
    { q: R`\(\int\tan x\,dx =\)`, options: [R`\(\ln|\cos x|+C\)`, R`\(-\ln|\cos x|+C\)`, R`\(\sec^2x+C\)`, R`\(-\cot x+C\)`], answer: 1, explain: "du = -sin x dx produces the minus sign." },
    { q: R`In \(\int_0^{\pi/2}\cos x\,e^{\sin x}dx\) with \(u=\sin x\), the limits become`, options: ["0 to 1", "0 to pi/2", "1 to e", "-1 to 1"], answer: 0, explain: "sin 0 = 0, sin(pi/2) = 1." },
    { q: R`Best choice of u for \(\int \frac{x}{(x^2+1)^2}dx\)`, options: [R`\(u=x\)`, R`\(u=(x^2+1)^2\)`, R`\(u=x^2+1\)`, R`\(u=1/x\)`], answer: 2, explain: "du = 2x dx is present up to a constant." }
  ],
  traps: [
    { title: "Leftover x", text: "any x surviving after substitution means an incomplete rewrite." },
    { title: "Forgot limit swap", text: "evaluating u-antiderivatives at x-limits is the most common substitution error in scripts." },
    { title: "Constant factor", text: R`du = 2x dx but only x dx present? Insert \(\frac12\) — missing constants cost the whole answer.` }
  ]
},
{
  slug: "trig", num: "06", week: "Week 3", title: "Integrals of Trigonometric Functions",
  blurb: "Choose identities by parity for sine-cosine and secant-tangent powers, then handle products with product-to-sum identities.",
  blocks: [
    { t: "p", md: R`Classify the powers before integrating. Odd sine or cosine powers preserve one differential factor; two even powers call for half-angle identities. Secant-tangent powers use the derivative pairs \(\sec^2x\,dx\) and \(\sec x\tan x\,dx\).` },
    { t: "list", items: [R`odd sin: save one \(\sin x\), convert rest with \(\sin^2=1-\cos^2\), \(u=\cos x\).`, R`odd cos: save one \(\cos x\), \(u=\sin x\).`, R`both even: half-angle \(\sin^2x=\frac{1-\cos2x}{2},\ \cos^2x=\frac{1+\cos2x}{2}\).`] },
    { t: "theorem", tag: "Lesson 6-7", title: "Secant-tangent decision", tex: R`\sec^2x=1+\tan^2x,\qquad \tan^2x=\sec^2x-1`, body: "Save sec²x when the secant power is even; save sec x tan x when the tangent power is odd." },
    { t: "example", title: R`\int\sin^3x\cos^2x\,dx`, items: [R`odd sin: \((1-\cos^2x)\cos^2x\sin x\); \(u=\cos x\).`, R`\(-\int(u^2-u^4)du=-\frac{u^3}{3}+\frac{u^5}{5}+C\).`, R`\(\boxed{\tfrac15\cos^5x-\tfrac13\cos^3x+C}\)`] },
    { t: "example", title: R`\int\tan^2x\,dx`, items: [R`Use \(\tan^2x=\sec^2x-1\).`, R`\(\boxed{\tan x-x+C}\)`] },
    { t: "theorem", tag: "Products", title: "Product-to-sum", tex: R`\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]`, body: "Use product-to-sum when the angles differ and parity identities do not apply." }
  ],
  cornell: { cues: [
    { cue: "odd sin power", note: R`peel \(\sin x\), convert, \(u=\cos x\).` },
    { cue: "both even", note: "half-angle identities." },
    { cue: "even secant power", note: R`save \(\sec^2x\,dx\), use \(u=\tan x\).` },
    { cue: "odd tangent power", note: R`save \(\sec x\tan x\,dx\), use \(u=\sec x\).` },
    { cue: "different angles", note: "use product-to-sum identities." }
  ], summary: "Use exponent parity to preserve the derivative factor that makes a substitution work." },
  cards: [
    { front: R`\(\int\sin^2x\,dx\)`, back: R`\(\frac{x}{2}-\frac{\sin2x}{4}+C\).` },
    { front: R`\(\int\cos^3x\,dx\)`, back: R`\(\sin x-\frac{\sin^3x}{3}+C\).` },
    { front: R`\(\int\tan^2x\,dx\)`, back: R`\(\tan x-x+C\).` },
    { front: "Even secant power", back: R`Save \(\sec^2x\,dx\) and use \(u=\tan x\).` },
    { front: "Odd tangent power", back: R`Save \(\sec x\tan x\,dx\) and use \(u=\sec x\).` },
    { front: R`\(\sin A\cos B\)`, back: R`\(\frac12[\sin(A+B)+\sin(A-B)]\).` }
  ],
  quiz: [
    { q: R`\(\int\cos^3x\,dx =\)`, options: [R`\(\sin x-\frac{\sin^3x}{3}+C\)`, R`\(\frac{\sin^4x}{4}+C\)`, R`\(\cos^2x\sin x+C\)`, R`\(-\sin x+\frac{\sin^3x}{3}+C\)`], answer: 0, explain: "Odd cos: u = sin x." },
    { q: R`\(\int\tan^2x\,dx=\)`, options: [R`\(\tan x-x+C\)`, R`\(\tan x+x+C\)`, R`\(\sec^2x+C\)`, R`\(\tan^3x/3+C\)`], answer: 0, explain: "Use tan²x=sec²x-1." },
    { q: R`\(\int\sin^2x\,dx =\)`, options: [R`\(\frac{x}{2}-\frac{\sin2x}{4}+C\)`, R`\(\frac{x}{2}+\frac{\sin2x}{4}+C\)`, R`\(-\cos^2x+C\)`, R`\(\frac{\sin^3x}{3}+C\)`], answer: 0, explain: "Half-angle identity." },
    { q: "When the secant power is even, save", options: [R`\(\tan x\,dx\)`, R`\(\sec^2x\,dx\)`, R`\(\sin x\,dx\)`, R`\(dx\) only`], answer: 1, explain: "It is the derivative factor for u=tan x." }
  ],
  traps: [
    { title: "Even powers, wrong identity", text: "using sin^2 = 1-cos^2 on even powers leads nowhere; half-angle is mandatory." },
    { title: "Wrong saved factor", text: "The preserved factor must match the differential of the intended substitution." },
    { title: "Product-to-sum skipped", text: "Different angles usually need product-to-sum before integration." }
  ]
}
];
