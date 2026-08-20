import type { FormulaGroup } from "./types";
const R = String.raw;
export const FORMULAS: FormulaGroup[] = [
{ group: "Derivatives", items: [
  { name: "Power / chain", tex: R`\((x^n)'=nx^{n-1},\ (f(g))'=f'(g)g'\)` },
  { name: "Product / quotient", tex: R`\((uv)'=u'v+uv',\ \left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}\)` },
  { name: "Trig", tex: R`\((\sin)'=\cos,\ (\cos)'=-\sin,\ (\tan)'=\sec^2\)` },
  { name: "Exp / log", tex: R`\((e^x)'=e^x,\ (\ln x)'=\frac1x\)` },
  { name: "Inverse trig", tex: R`\((\sin^{-1}x)'=\frac{1}{\sqrt{1-x^2}},\ (\tan^{-1}x)'=\frac{1}{1+x^2}\)` } ] },
{ group: "Basic integrals", items: [
  { name: "Power rule", tex: R`\(\int x^ndx=\frac{x^{n+1}}{n+1}+C\ (n\neq-1),\ \int\frac{dx}{x}=\ln|x|+C\)` },
  { name: "Exp / trig", tex: R`\(\int e^x=e^x,\ \int\cos=\sin,\ \int\sin=-\cos,\ \int\sec^2=\tan\)` },
  { name: "arctan form", tex: R`\(\int\frac{dx}{a^2+x^2}=\frac1a\tan^{-1}\frac xa+C\)` },
  { name: "arcsin form", tex: R`\(\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac xa+C\)` } ] },
{ group: "FTC & properties", items: [
  { name: "FTC 1", tex: R`\(\frac{d}{dx}\int_a^x f(t)dt=f(x)\)` },
  { name: "FTC 2", tex: R`\(\int_a^b f=F(b)-F(a)\)` },
  { name: "Linearity", tex: R`\(\int(af+bg)=a\int f+b\int g\)` },
  { name: "Symmetry", tex: R`even: \(\int_{-a}^a=2\int_0^a\); odd: \(\int_{-a}^a=0\)` } ] },
{ group: "Techniques", items: [
  { name: "u-sub (definite)", tex: R`\(\int_a^b f(g)g'\,dx=\int_{g(a)}^{g(b)} f(u)du\)` },
  { name: "By parts", tex: R`\(\int u\,dv=uv-\int v\,du;\ \text{LIATE for }u\)` },
  { name: "Reduction: polynomial-exponential", tex: R`\(I_n=\int x^ne^x dx=x^ne^x-nI_{n-1}\)` },
  { name: "Reduction: cosine powers", tex: R`\(I_n=\frac{\sin x\cos^{n-1}x}{n}+\frac{n-1}{n}I_{n-2}\)` },
  { name: "Partial fractions", tex: R`\(\frac{A}{x-a};\ \frac{A_1\dots A_m}{(x-a)^m};\ \frac{Bx+C}{q(x)}\)` },
  { name: "Trig subs", tex: R`\(\sqrt{a^2-x^2}\!\to\!a\sin\theta;\ \sqrt{a^2+x^2}\!\to\!a\tan\theta;\ \sqrt{x^2-a^2}\!\to\!a\sec\theta\)` },
  { name: "Half-angle", tex: R`\(\sin^2x=\frac{1-\cos2x}{2},\ \cos^2x=\frac{1+\cos2x}{2}\)` },
  { name: "Weierstrass", tex: R`\(t=\tan\frac x2:\ \sin=\frac{2t}{1+t^2},\ \cos=\frac{1-t^2}{1+t^2},\ dx=\frac{2dt}{1+t^2}\)` } ] },
{ group: "Numerical", items: [
  { name: "Step", tex: R`\(\Delta x=\frac{b-a}{n}\)` },
  { name: "Trapezoidal", tex: R`\(T_n=\frac{\Delta x}{2}[f_0+2f_1+\cdots+2f_{n-1}+f_n]\)` },
  { name: "Simpson (n even)", tex: R`\(S_n=\frac{\Delta x}{3}[f_0+4f_1+2f_2+\cdots+4f_{n-1}+f_n]\)` },
  { name: "Error bounds", tex: R`\(|E_T|\le\frac{K(b-a)^3}{12n^2},\ |E_S|\le\frac{K(b-a)^5}{180n^4}\)` } ] },
{ group: "Applications", items: [
  { name: "Area between", tex: R`\(A=\int(f-g)dx\)` },
  { name: "Disk / washer", tex: R`\(V=\pi\int R^2dx,\ \pi\int(R^2-r^2)dx\)` },
  { name: "Shell", tex: R`\(V=2\pi\int(\text{rad})(\text{ht})dx\)` },
  { name: "Arc length", tex: R`\(L=\int\sqrt{1+(y')^2}dx\)` },
  { name: "Surface area", tex: R`\(S=2\pi\int y\sqrt{1+(y')^2}dx\)` },
  { name: "Centroid", tex: R`\(\bar x=\frac1A\int x(f-g)dx,\ \bar y=\frac1A\int\frac12(f^2-g^2)dx\)` },
  { name: "Average value", tex: R`\(\frac1{b-a}\int_a^b f dx\)` } ] },
{ group: "Improper & L'Hopital", items: [
  { name: "p-test at ∞", tex: R`\(\int_1^\infty x^{-p}\) conv. iff p>1` },
  { name: "p-test at 0", tex: R`\(\int_0^1 x^{-p}\) conv. iff p<1` },
  { name: "L'Hopital", tex: R`\(\lim\frac fg=\lim\frac{f'}{g'}\) for \(\frac00,\frac\infty\infty\)` },
  { name: "Growth hierarchy", tex: R`\(\ln x \ll x^p \ll e^x \ll x!\)? no: \(\ln x\ll x^p\ll e^x\)`, note: "logs, then powers, then exponentials" } ] },
{ group: "Sequences & series", items: [
  { name: "Geometric", tex: R`\(\sum ar^n=\frac{a}{1-r},\ |r|<1\)` },
  { name: "Divergence test", tex: R`\(a_n\not\to0 \Rightarrow \sum a_n\) div.` },
  { name: "Ratio / root", tex: R`L<1 abs. conv.; L>1 div.; L=1 ?` },
  { name: "p-series", tex: R`\(\sum 1/n^p\) conv. iff p>1` },
  { name: "AST", tex: R`decreasing |a_n|→0 ⇒ \(\sum(-1)^na_n\) conv.; err ≤ first omitted` },
  { name: "Absolute ⇒ conv.", tex: R`\(\sum|a_n|\) conv. ⇒ \(\sum a_n\) conv.` } ] },
{ group: "Taylor & common series", items: [
  { name: "Taylor", tex: R`\(T_n=\sum\frac{f^{(k)}(a)}{k!}(x-a)^k\)` },
  { name: "Lagrange remainder", tex: R`\(R_n=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}\)` },
  { name: "e^x / sin / cos", tex: R`\(\sum\frac{x^n}{n!};\ \sum\frac{(-1)^nx^{2n+1}}{(2n+1)!};\ \sum\frac{(-1)^nx^{2n}}{(2n)!}\)` },
  { name: "1/(1-x) / ln(1+x)", tex: R`\(\sum x^n\ (|x|<1);\ \sum\frac{(-1)^{n-1}x^n}{n}\ (|x|\le1,x\neq-1)\)` },
  { name: "Term-by-term", tex: R`radius R unchanged by \(\frac{d}{dx}\) or \(\int\)` } ] }
];
