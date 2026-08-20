import type { Topic } from "./types";

const R = String.raw;

export const T_CURRENT: Topic[] = [
  {
    slug: "reduction-formulas", num: "05", week: "Week 3", title: "Reduction Formulas",
    blurb: "Derive a recurrence once, then reduce a difficult integral to known base cases.",
    blocks: [
      { t: "p", md: "A reduction formula is not merely a shortcut: it is an identity connecting a family member I_n to an easier member such as I_{n-1} or I_{n-2}. The derivation, valid n-values, and base cases are part of the answer." },
      { t: "theorem", tag: "Lesson 5", title: "Polynomial-exponential recurrence", tex: R`I_n=\int x^ne^x\,dx=x^ne^x-nI_{n-1}\quad(n\ge1)`, body: "Integration by parts differentiates the polynomial, lowering its degree by one. The base case is I_0=e^x+C." },
      { t: "theorem", tag: "Lesson 5", title: "Cosine-power recurrence", tex: R`I_n=\int\cos^n x\,dx=\frac{\sin x\cos^{n-1}x}{n}+\frac{n-1}{n}I_{n-2}\quad(n\ge2)`, body: "The identity sin^2 x = 1-cos^2 x creates an I_n term; collect it before dividing by n." },
      { t: "example", title: R`I_3=\int x^3e^x\,dx`, items: [R`I_3=x^3e^x-3I_2`, R`I_2=x^2e^x-2I_1,\ I_1=xe^x-I_0,\ I_0=e^x`, R`\boxed{I_3=e^x(x^3-3x^2+6x-6)+C}`] }
    ],
    cornell: { cues: [
      { cue: "Family", note: R`Define (I_n) before deriving anything.` },
      { cue: "Reduction", note: R`The new index must be smaller: (n-1) or (n-2).` },
      { cue: "Base cases", note: R`Step-down by 1 needs (I_0); step-down by 2 may need (I_0) and (I_1).` },
      { cue: "Definite integrals", note: "Evaluate the boundary term during the derivation, not after forgetting it." },
      { cue: "Check", note: "Differentiate an indefinite result; estimate sign and size for a definite result." }
    ], summary: "Define the family, integrate by parts, isolate I_n, state the valid n-range, and stop at the correct base case." },
    cards: [
      { front: "What makes a formula a reduction formula?", back: "It expresses I_n in terms of one or more lower-index members of the same family." },
      { front: R`Base case for \(\int x^ne^x dx\)`, back: R`\(I_0=e^x+C\).` },
      { front: R`Base cases for \(\int_0^{\pi/2}\sin^n x\,dx\)`, back: R`\(I_0=\pi/2\) and \(I_1=1\); parity decides which one is reached.` },
      { front: "Why isolate I_n?", back: "The algebra often produces I_n on both sides; the recurrence is not finished until I_n is alone." },
      { front: R`Reduction formula for \(I_n=\int x^ne^x\,dx\)`, back: R`\(I_n=x^ne^x-nI_{n-1}\), valid for \(n\ge1\).`, note: "Differentiate x^n in integration by parts so the polynomial degree falls." },
      { front: R`Reduction formula for \(I_n=\int\cos^n x\,dx\)`, back: R`\(I_n=\frac{\sin x\cos^{n-1}x}{n}+\frac{n-1}{n}I_{n-2}\).` },
      { front: R`Why does a step of \(n-2\) require parity awareness?`, back: R`Even n reaches \(I_0\); odd n reaches \(I_1\).` },
      { front: "What must be evaluated immediately in a definite reduction derivation?", back: R`The boundary term \([uv]_a^b\).` },
      { front: R`\(J_6\) for \(J_n=\int_0^{\pi/2}\sin^n x\,dx\)`, back: R`\(J_6=\frac56\frac34\frac12\frac\pi2=\frac{5\pi}{32}\).` },
      { front: "How do you check an indefinite reduction result?", back: "Differentiate the final expression and simplify until the original integrand remains." }
    ],
    quiz: [
      { q: R`For \(I_n=\int x^ne^x dx\), the correct recurrence is`, options: [R`\(I_n=x^ne^x-nI_{n-1}\)`, R`\(I_n=nx^{n-1}e^x-I_{n-1}\)`, R`\(I_n=x^ne^x+nI_{n-1}\)`, R`\(I_n=nI_{n+1}\)`], answer: 0, explain: "Parts gives uv minus the new integral." },
      { q: R`A recurrence that lowers n by 2 requires`, options: ["no base case", "only I_2", "base cases chosen by parity", "n=0 only in every problem"], answer: 2, explain: "Even indices reach I_0; odd indices reach I_1." },
      { q: R`For \(J_n=\int_0^{\pi/2}\sin^n x\,dx\), \(J_6\) equals`, options: [R`\(5\pi/32\)`, R`\(15\pi/32\)`, R`\(5\pi/16\)`, R`\(3\pi/16\)`], answer: 0, explain: "J6=(5/6)(3/4)(1/2)(pi/2)=5pi/32." }
    ],
    traps: [
      { title: "Recurrence without a base case", text: "The process cannot produce a number until the chain reaches an explicitly evaluated starting value." },
      { title: "Lost boundary term", text: "For definite integrals, [uv] at the bounds is part of the recurrence." },
      { title: "Constant counted repeatedly", text: "Carry one final +C for an indefinite answer; do not attach a new independent constant to every I_k." }
    ]
  },
  {
    slug: "trig-substitution", num: "07", week: "Week 3", title: "Trigonometric Substitution",
    blurb: "Match a quadratic radical to a Pythagorean identity, simplify, then return to x with a triangle.",
    blocks: [
      { t: "p", md: "Trig substitution is chosen by the sign pattern under a square root. The substitution is designed so the radical becomes a single trig function rather than a sum of squares." },
      { t: "list", items: [R`\(\sqrt{a^2-x^2}: x=a\sin\theta\)`, R`\(\sqrt{a^2+x^2}: x=a\tan\theta\)`, R`\(\sqrt{x^2-a^2}: x=a\sec\theta\)`] },
      { t: "example", title: R`\int\frac{dx}{x^2\sqrt{x^2+4}}`, items: [R`Use \(x=2\tan\theta\), so \(dx=2\sec^2\theta\,d\theta\) and \(\sqrt{x^2+4}=2\sec\theta\).`, R`The integral becomes \(\frac14\int\frac{\cos\theta}{\sin^2\theta}\,d\theta=-\frac1{4\sin\theta}+C\).`, R`From the triangle, \(\sin\theta=x/\sqrt{x^2+4}\), hence \(\boxed{-\frac{\sqrt{x^2+4}}{4x}+C}\).`] }
    ],
    cornell: { cues: [
      { cue: R`\(a^2-x^2\)`, note: R`Use (a\sin\theta).` }, { cue: R`\(a^2+x^2\)`, note: R`Use (a\tan\theta).` },
      { cue: R`\(x^2-a^2\)`, note: R`Use (a\sec\theta).` }, { cue: "Always transform", note: R`Rewrite (x), the radical, and (dx).` },
      { cue: "Return to x", note: "Draw the triangle from the substitution or use an inverse-trig relation." }
    ], summary: "Classify the radical, transform every factor, integrate in theta, and back-substitute to x." },
    cards: [
      { front: R`Substitution for \(\sqrt{9-x^2}\)`, back: R`\(x=3\sin\theta\).` },
      { front: R`If \(x=a\tan\theta\), then \(dx=\)`, back: R`\(a\sec^2\theta\,d\theta\).` },
      { front: R`If \(x=a\sec\theta\), then \(\sqrt{x^2-a^2}=\)`, back: R`\(a\tan\theta\) on the chosen principal interval.` },
      { front: R`Substitution for \(\sqrt{a^2+x^2}\)`, back: R`\(x=a\tan\theta\), because \(1+\tan^2\theta=\sec^2\theta\).` },
      { front: R`Substitution for \(\sqrt{x^2-a^2}\)`, back: R`\(x=a\sec\theta\), because \(\sec^2\theta-1=\tan^2\theta\).` },
      { front: "What four things change in a definite trig substitution?", back: "Every x-factor, the radical, dx, and the bounds." },
      { front: R`Triangle for \(x=a\tan\theta\)`, back: R`Opposite \(x\), adjacent \(a\), hypotenuse \(\sqrt{x^2+a^2}\).` },
      { front: "Why choose a principal theta interval?", back: "It fixes the signs of trig functions so square roots simplify correctly." },
      { front: "How do you verify the final answer?", back: "Differentiate after returning completely to x." }
    ],
    quiz: [
      { q: R`Best substitution for \(\sqrt{x^2-16}\)`, options: [R`\(x=4\sin\theta\)`, R`\(x=4\tan\theta\)`, R`\(x=4\sec\theta\)`, R`\(x=16\sec\theta\)`], answer: 2, explain: "x^2-a^2 matches sec^2 theta-1=tan^2 theta." },
      { q: "What must be rewritten after choosing x in terms of theta?", options: ["Only the radical", "Only dx", "Every x-factor, the radical, and dx", "Nothing else"], answer: 2, explain: "A valid substitution leaves no mixture of x and theta." }
    ],
    traps: [
      { title: "Forgotten differential", text: "Changing x without changing dx gives a different integral." },
      { title: "Answer left in theta", text: "Unless the problem requests it, the final antiderivative must use x." },
      { title: "Wrong sign pattern", text: "Identify a^2-x^2, a^2+x^2, or x^2-a^2 before selecting the substitution." }
    ]
  },
  {
    slug: "weierstrass", num: "08", week: "Week 4", title: "Weierstrass Substitution",
    blurb: "Turn any rational expression in sine and cosine into an ordinary rational function.",
    blocks: [
      { t: "p", md: "Use the tangent half-angle substitution when an integral is rational in sin x and cos x but ordinary identities do not expose a simple differential. It trades trigonometry for algebra." },
      { t: "theorem", tag: "Week 4", title: "Tangent half-angle identities", tex: R`t=\tan\frac{x}{2},\quad \sin x=\frac{2t}{1+t^2},\quad \cos x=\frac{1-t^2}{1+t^2},\quad dx=\frac{2\,dt}{1+t^2}`, body: "After all three replacements, simplify the rational function in t and use algebra or partial fractions." },
      { t: "example", title: R`\int\frac{dx}{1+\sin x}`, items: [R`Substitute the three identities: \(\int \frac{2\,dt}{1+t^2+2t}\).`, R`Since \(1+t^2+2t=(t+1)^2\), integrate \(2\int(t+1)^{-2}dt=-2/(t+1)+C\).`, R`Back-substitute: \(\boxed{-\frac{2}{1+\tan(x/2)}+C}\).`] }
    ],
    cornell: { cues: [
      { cue: "Use when", note: "The integrand is rational in sin x and cos x and no shorter identity-based route appears." },
      { cue: "Three replacements", note: "sin x, cos x, and dx must all be converted." },
      { cue: "After substitution", note: "Simplify first; then factor, complete the square, or use partial fractions." },
      { cue: "Back-substitute", note: R`Replace (t) by (	an(x/2)).` }
    ], summary: "Replace sin, cos, and dx with rational t-expressions; solve the rational integral; return to x." },
    cards: [
      { front: "Weierstrass substitution", back: R`\(t=\tan(x/2)\).` },
      { front: R`\(\sin x\) in terms of t`, back: R`\(2t/(1+t^2)\).` },
      { front: R`\(\cos x\) in terms of t`, back: R`\((1-t^2)/(1+t^2)\).` },
      { front: R`\(dx\) in terms of t`, back: R`\(2dt/(1+t^2)\).` },
      { front: "When should Weierstrass be considered?", back: "When the integrand is rational in sin x and cos x and simpler identities do not expose a direct substitution." },
      { front: "What is the purpose of Weierstrass substitution?", back: "To turn a trigonometric rational expression into an ordinary rational function of t." },
      { front: "What must disappear after the substitution?", back: "Every occurrence of sin x, cos x, and dx; the integral should contain only t and dt." },
      { front: R`Why is there a 2 in \(dx=2dt/(1+t^2)\)?`, back: R`Because \(dt=\frac12\sec^2(x/2)dx=\frac12(1+t^2)dx\).` },
      { front: "What methods finish the rational t-integral?", back: "Factoring, completing the square, polynomial division, or partial fractions." },
      { front: "How is the final answer returned to x?", back: R`Replace \(t\) with \(\tan(x/2)\), then simplify if useful.` }
    ],
    quiz: [
      { q: "The purpose of Weierstrass substitution is to produce", options: ["a polynomial in x", "a rational function of t", "a differential equation", "a power series"], answer: 1, explain: "All sine and cosine factors become rational expressions in t." },
      { q: R`If \(t=\tan(x/2)\), then \(dx=\)`, options: [R`\((1+t^2)dt\)`, R`\(dt/(1+t^2)\)`, R`\(2dt/(1+t^2)\)`, R`\(2(1+t^2)dt\)`], answer: 2, explain: "Differentiate t=tan(x/2) and solve for dx." }
    ],
    traps: [
      { title: "Half-angle factor lost", text: "Differentiating tan(x/2) introduces 1/2; solving gives dx=2dt/(1+t^2)." },
      { title: "Mixed variables", text: "Do not leave sin x or cos x after switching to t." },
      { title: "Using the longest method", text: "If a one-line identity or u-substitution works, use it; Weierstrass is the universal fallback." }
    ]
  }
];
