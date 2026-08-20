import type { Topic } from "./types";
const R = String.raw;
export const T_APPLICATIONS: Topic[] = [
{
  slug: "applications", num: "11", week: "Weeks 6-7", title: "Volume, Arc Length, Surface Area, Centroid",
  blurb: "Slice, approximate, take the limit: disks, washers, shells, tiny hypotenuses and weighted averages.",
  blocks: [
    { t: "p", md: "One philosophy: slice the object, approximate the slice, let the slice count go to infinity. Disks/washers slice perpendicular to the axis; shells slice parallel; arc length sums tiny hypotenuses; centroids average position weighted by area." },
    { t: "theorem", tag: "FB-7", title: "The toolkit", tex: R`V=\pi\int R^2dx,\ V=\pi\int(R^2-r^2)dx,\ V=2\pi\int(\text{rad})(\text{ht})dx`, body: "Disk, washer, shell. Plus arc length and surface area below." },
    { t: "math", tex: R`L=\int_a^b\sqrt{1+(y')^2}\,dx, \quad S=2\pi\int_a^b y\sqrt{1+(y')^2}\,dx, \quad \bar x=\frac{1}{A}\int x(f-g)dx,\ \bar y=\frac{1}{A}\int\frac12(f^2-g^2)dx` },
    { t: "example", title: "Washer: between y = x^2 and y = 2x about x-axis", items: [R`bounds 0..2; \(R=2x,\ r=x^2\).`, R`\(\pi\int_0^2(4x^2-x^4)dx=\boxed{\frac{64\pi}{15}}\).`] },
    { t: "example", title: "Shell: same region about y-axis", items: [R`radius \(x\), height \(2x-x^2\).`, R`\(2\pi\int_0^2(2x^2-x^3)dx=\boxed{\frac{8\pi}{3}}\).`] },
    { t: "example", title: R`Arc length of \(y=\frac{x^3}{6}+\frac{1}{2x}\) on [1,2]`, items: [R`\(1+(y')^2\) is a perfect square: \((\frac{x^2}{2}+\frac{1}{2x^2})^2\).`, R`\(\boxed{\frac{17}{12}}\).`] }
  ],
  cornell: { cues: [
    { cue: "Disk vs washer", note: "washer when the slice has a hole (two curves)." },
    { cue: "Shell radius/height", note: "radius = distance to axis; height = top minus bottom." },
    { cue: "Arc length integrand", note: R`\(\sqrt{1+(y')^2}\).` },
    { cue: "Surface area extra factor", note: R`\(2\pi y\) (circumference of the swept circle).` },
    { cue: "Centroid y-bar", note: R`uses \(\frac12(f^2-g^2)\), the mid-height of each strip.` }
  ], summary: "Identify slice geometry first; the integral then writes itself." },
  cards: [
    { front: "Disk volume", back: R`\(\pi\int R(x)^2dx\).` },
    { front: "Washer volume", back: R`\(\pi\int(R^2-r^2)dx\).` },
    { front: "Shell volume", back: R`\(2\pi\int(\text{radius})(\text{height})dx\).` },
    { front: "Arc length", back: R`\(\int\sqrt{1+(y')^2}dx\).` },
    { front: "Surface area (x-axis)", back: R`\(2\pi\int y\sqrt{1+(y')^2}dx\).` },
    { front: "Centroid formulas", back: R`\(\bar x=\frac1A\int x(f-g)\), \(\bar y=\frac1A\int\frac12(f^2-g^2)\).` }
  ],
  quiz: [
    { q: "Revolving about the y-axis with vertical strips suggests…", options: ["disks", "washers", "shells", "arc length"], answer: 2, explain: "Parallel slices = shells." },
    { q: R`Arc length integrand for y = f(x)`, options: [R`\(\sqrt{1+y'}\)`, R`\(\sqrt{1+(y')^2}\)`, R`\(1+(y')^2\)`, R`\(\sqrt{(y')^2-1}\)`], answer: 1, explain: "Pythagoras on dx, dy." },
    { q: "Washer outer radius between y=2x and y=x^2 on (0,2):", options: [R`\(x^2\)`, R`\(2x\)`, R`\(2x-x^2\)`, "2"], answer: 1, explain: "2x is the upper curve." },
    { q: R`Centroid \(\bar y\) integrand`, options: [R`\(f-g\)`, R`\(\frac12(f^2-g^2)\)`, R`\((f-g)^2\)`, R`\(x(f-g)\)`], answer: 1, explain: "Strip midpoint times strip area." }
  ],
  traps: [
    { title: "Axis mismatch", text: "using disks for vertical strips about the y-axis; match slice orientation to axis." },
    { title: "Forgetting to square", text: R`washer integrand is \(R^2-r^2\), not \(R-r\).` },
    { title: "Wrong y-bar", text: R`using \((f-g)^2/2\) instead of \((f^2-g^2)/2\).` }
  ]
},
{
  slug: "improper", num: "09", week: "Week 4", title: "Improper Integrals",
  blurb: "Infinite intervals and exploding integrands: cut off, integrate, take the limit.",
  blocks: [
    { t: "p", md: "Type I: infinite interval. Type II: integrand blows up inside the interval. Both are defined by cutting the problem at t and letting t approach the trouble. Finite limit = convergent." },
    { t: "theorem", tag: "p-test", title: "The benchmark", tex: R`\int_1^\infty\frac{dx}{x^p}\ \text{conv. iff } p>1;\quad \int_0^1\frac{dx}{x^p}\ \text{conv. iff } p<1`, body: "Note the direction flips between the two types. Comparison test: 0 <= f <= g with g convergent forces f convergent." },
    { t: "example", title: R`\int_1^\infty\frac{dx}{x^2}`, items: [R`\(\lim_{t\to\infty}(1-\frac1t)=\boxed{1}\): infinite region, finite area.`] },
    { t: "trap", title: "Blind FTC across a singularity", text: R`\(\int_0^2\frac{dx}{x-1}\) is NOT 0: split at 1; the left half diverges to \(-\infty\), so the integral diverges.` }
  ],
  cornell: { cues: [
    { cue: "Type I", note: "infinite interval; limit at infinity." },
    { cue: "Type II", note: "blow-up inside; split and limit." },
    { cue: "p-test at infinity", note: "converges iff p > 1." },
    { cue: "p-test at 0", note: "converges iff p < 1." },
    { cue: "Doubly infinite", note: "split; BOTH halves must converge." }
  ], summary: "Replace the offending bound by t, integrate, take the limit; compare with p-integrals." },
  cards: [
    { front: R`\(\int_1^\infty dx/x\)`, back: "diverges (p = 1)." },
    { front: R`\(\int_0^1 dx/\sqrt{x}\)`, back: "converges to 2 (p = 1/2 < 1)." },
    { front: R`\(\int_0^\infty e^{-x}dx\)`, back: "1." },
    { front: R`\(\int_{-\infty}^{\infty}\frac{dx}{1+x^2}\)`, back: R`\(\pi\): split at 0, halves \(\pi/2\).` },
    { front: "Comparison test", note: "", back: "smaller than convergent = convergent; bigger than divergent = divergent." }
  ],
  quiz: [
    { q: "Which converges?", options: [R`\(\int_1^\infty dx/x\)`, R`\(\int_1^\infty dx/x^2\)`, R`\(\int_0^1 dx/x\)`, R`\(\int_1^\infty dx/\sqrt{x}\)`], answer: 1, explain: "p = 2 > 1." },
    { q: R`\(\int_0^1 x^{-1/2}dx =\)`, options: ["1", "2", "diverges", "1/2"], answer: 1, explain: "2 sqrt(x) from 0 to 1." },
    { q: R`\(\int_{-\infty}^{\infty}\frac{dx}{1+x^2} =\)`, options: [R`\(\pi/2\)`, R`\(\pi\)`, "0", "diverges"], answer: 1, explain: "Both halves pi/2." },
    { q: "A doubly-infinite integral converges when…", options: ["either half converges", "both halves converge", "the integrand is even", "the limit of f is 0"], answer: 1, explain: "One divergent half kills it." }
  ],
  traps: [
    { title: "Invisible singularity", text: "always scan the interval for blow-ups before applying FTC." },
    { title: "p-test direction", text: "the convergence condition flips between infinity-type and zero-type." },
    { title: "Limit of f is 0 ≠ convergence", text: R`1/x → 0 yet its integral diverges.` }
  ]
},
{
  slug: "lhopital", num: "12", week: "Week 9", title: "Indeterminate Forms & L'Hopital",
  blurb: "Compare rates of growth: differentiate top and bottom separately until the form decides.",
  blocks: [
    { t: "p", md: R`A form like \(\frac00\) is indeterminate because the form alone does not determine the answer. L'Hopital compares rates: near the point, functions behave like their derivatives.` },
    { t: "theorem", tag: "FB-9", title: "L'Hopital's Rule", tex: R`\lim\frac{f}{g}\ (\tfrac00\text{ or }\tfrac\infty\infty)\ =\ \lim\frac{f'}{g'}`, body: "Differentiate separately — never the quotient rule. Repeat while the form stays indeterminate." },
    { t: "list", items: [R`\(0\cdot\infty\): move one factor down. \(\infty-\infty\): combine over one denominator. \(0^0,\infty^0,1^\infty\): take \(\ln\), then exponentiate.`] },
    { t: "example", title: R`\lim_{x\to0}\frac{e^x-1-x}{x^2}`, items: [R`\(\frac{e^x-1}{2x}\) still \(\frac00\).`, R`\(\frac{e^x}{2}\to\boxed{\frac12}\).`] }
  ],
  cornell: { cues: [
    { cue: "Allowed forms", note: R`only \(\frac00\) and \(\frac\infty\infty\).` },
    { cue: R`\(0\cdot\infty\)`, note: R`rewrite as \(\frac{\ln x}{1/x}\) style quotient.` },
    { cue: R`\(1^\infty\)`, note: "log first, L'Hopital, exponentiate." },
    { cue: "Growth hierarchy", note: "logs << powers << exponentials." }
  ], summary: "Verify the form, differentiate separately, repeat or rewrite until decided." },
  cards: [
    { front: R`\(\lim_{x\to0}\frac{\sin3x}{x}\)`, back: "3." },
    { front: R`\(\lim_{x\to\infty}\frac{\ln x}{x}\)`, back: "0." },
    { front: R`\(\lim_{x\to0^+}x\ln x\)`, back: "0." },
    { front: R`\(\lim_{x\to\infty}(1+\frac1x)^x\)`, back: "e." },
    { front: R`\(\lim_{x\to0}(\frac1x-\frac1{\sin x})\)`, back: "0." }
  ],
  quiz: [
    { q: R`\(\lim_{x\to0}\frac{\sin3x}{x} =\)`, options: ["1", "3", "0", "1/3"], answer: 1, explain: "3cos3x/1 at 0." },
    { q: R`\(\lim_{x\to0^+}x\ln x\) needs the rewrite`, options: [R`\(\frac{\ln x}{1/x}\)`, R`\(\frac{x}{1/\ln x}\)`, R`\(e^{x\ln x}\)`, "none"], answer: 0, explain: "Produces infinity/infinity with an easy derivative ratio -x." },
    { q: R`\(\lim_{x\to\infty}(1+1/x)^x =\)`, options: ["1", "0", "e", "infinity"], answer: 2, explain: "Log gives limit 1; exponentiate." },
    { q: "Which form may use L'Hopital directly?", options: [R`\(0\cdot\infty\)`, R`\(\infty-\infty\)`, R`\(\frac{\infty}{\infty}\)`, R`\(1^\infty\)`], answer: 2, explain: "Only 0/0 and inf/inf apply directly." }
  ],
  traps: [
    { title: "Not indeterminate", text: "applying the rule to a determinate form (e.g. 1/0) is invalid." },
    { title: "Quotient rule", text: "differentiate top and bottom separately; quotient rule here is wrong." },
    { title: "Stopping early", text: "if the result is still 0/0, apply the rule again." }
  ]
}
];
