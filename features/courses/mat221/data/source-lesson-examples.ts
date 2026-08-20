export type LessonExample = { title: string; method: string; rule: string; steps: string[]; answer: string; check: string; difficulty?: "Foundation" | "Developing" | "Exam-ready"; purpose?: string };
const R = String.raw;
const e = (title: string, method: string, rule: string, steps: string[], answer: string, check: string): LessonExample => ({ title, method, rule, steps, answer, check });

export const LESSON_EXAMPLES: Record<string, LessonExample[]> = {
  foundations: [
    e(R`\int(3x^2-4x+5)dx`, "Integrate term by term.", R`\int x^n dx=x^{n+1}/(n+1)+C.`, [R`\int3x^2dx=x^3`, R`\int-4x dx=-2x^2`, R`\int5dx=5x`], R`x^3-2x^2+5x+C`, "Differentiate each term."),
    e(R`\int x^{-3}dx`, "Use the power rule; the exponent is not -1.", R`\int x^n dx=x^{n+1}/(n+1)+C.`, [R`n+1=-2`, R`x^{-2}/(-2)=-1/(2x^2)`], R`-1/(2x^2)+C`, R`d[-x^{-2}/2]/dx=x^{-3}.`),
    e(R`\int dx/x`, "Recognise the exceptional power.", R`\int du/u=\ln|u|+C.`, [R`x^{-1} cannot use the power rule`, R`Apply the logarithmic rule directly`], R`\ln|x|+C`, R`d\ln|x|/dx=1/x.`),
    e(R`\frac d{dx}\int_1^{3x}t^2dt`, "Use FTC 1 and the chain rule.", R`d/dx\int_a^{g(x)}f(t)dt=f(g(x))g'(x).`, [R`f(3x)=(3x)^2=9x^2`, R`g'(x)=3`, R`9x^2(3)=27x^2`], R`27x^2`, "Direct integration gives the same derivative."),
    e(R`\int_{-2}^2x^3dx`, "Use odd symmetry.", R`For odd f, \int_{-a}^a f=0.`, [R`f(-x)=-f(x)`, R`The signed areas cancel`], R`0`, "FTC also gives 4-4=0."),
    e(R`\frac d{dx}\int_{x}^{4}\sqrt{1+t^2}\,dt`, "Reverse the bounds before applying FTC Part 1.", R`\int_x^a f(t)dt=-\int_a^x f(t)dt.`, [R`Rewrite as -\int_4^x\sqrt{1+t^2}\,dt`, R`FTC Part 1 returns the integrand at t=x`, R`Keep the leading negative sign`], R`-\sqrt{1+x^2}`, "A growing lower bound removes area, so a negative rate is reasonable."),
    e(R`\int_0^2|x-1|\,dx`, "Split where the absolute-value expression changes sign.", R`|x-1|=1-x\text{ on }[0,1],\ x-1\text{ on }[1,2].`, [R`\int_0^1(1-x)dx+\int_1^2(x-1)dx`, R`Each triangular contribution equals 1/2`, R`Add the two nonnegative areas`], R`1`, "The graph consists of two right triangles of total area 1.")
  ],
  substitution: [
    e(R`\int\sin^3x\cos xdx`, "The derivative of sin x is present.", R`u=\sin x,\ du=\cos xdx.`, [R`\int u^3du`, R`u^4/4+C`, R`Replace u by \sin x`], R`\sin^4x/4+C`, "Differentiate using the chain rule."),
    e(R`\int3x^2e^{x^3+1}dx`, "Choose u=x^3+1 because it is the exponential's inner function and its derivative 3x² is present exactly.", R`u=x^3+1,\ du=3x^2dx.`, [R`Compute du=3x^2dx; no compensating constant is needed`, R`Replace the exponent and the complete differential to obtain \int e^u du`, R`Integrate to e^u+C`, R`Back-substitute because the original integral is indefinite`], R`e^{x^3+1}+C`, "Differentiate: the chain rule gives 3x²e^(x³+1)."),
    e(R`\int x\ln(1+x^2)dx`, "Substitution removes the inner quadratic first; integration by parts then handles ln u. This is a method-selection example.", R`u=1+x^2,\ du=2x dx;\quad \int\ln u\,du=u\ln u-u.`, [R`Select u=1+x^2 because its derivative differs from x by only the constant 2`, R`Compute du=2x dx, so x dx=du/2; no x-term remains`, R`Rewrite as \frac12\int\ln u\,du`, R`Use parts inside u: \int\ln udu=u\ln u-u`, R`Back-substitute u=1+x^2`], R`\frac12[(1+x^2)\ln(1+x^2)-(1+x^2)]+C`, "Differentiate the bracket; product-rule terms cancel, leaving x ln(1+x²).")
  ],
  partials: [
    e(R`\int dx/(x^2-1)`, "Factor into distinct linear factors.", R`1/[(x-1)(x+1)]=A/(x-1)+B/(x+1).`, [R`1=A(x+1)+B(x-1)`, R`x=1:A=1/2;\ x=-1:B=-1/2`, R`Integrate both logarithmic pieces`], R`\frac12\ln|(x-1)/(x+1)|+C`, "Recombine the decomposition."),
    e(R`\int dx/[x(x-1)]`, "Use one term per linear factor.", R`1/[x(x-1)]=A/x+B/(x-1).`, [R`1=A(x-1)+Bx`, R`x=0:A=-1;\ x=1:B=1`, R`Integrate -1/x+1/(x-1)`], R`\ln|x-1|-\ln|x|+C`, "Differentiate the log difference."),
    e(R`\int x^2/(x-1)dx`, "Divide before decomposing.", R`Degree numerator >= degree denominator.`, [R`x^2/(x-1)=x+1+1/(x-1)`, R`Integrate each term`], R`x^2/2+x+\ln|x-1|+C`, "Multiply the quotient identity by x-1."),
    e(R`\int dx/(x-2)^2`, "A single repeated-factor power is already simple.", R`\int(x-a)^{-2}dx=-(x-a)^{-1}+C.`, [R`Let u=x-2`, R`\int u^{-2}du=-u^{-1}`], R`-1/(x-2)+C`, "Differentiate."),
    e(R`\int(2x+2)/(x^2+2x+5)dx`, "Numerator equals the denominator derivative.", R`\int g'/g=\ln|g|+C.`, [R`u=x^2+2x+5`, R`du=(2x+2)dx`, R`\int du/u`], R`\ln(x^2+2x+5)+C`, "The quadratic is positive, so absolute values are optional."),
    e(R`\int dx/(x^2+4)`, "Use the arctangent standard form.", R`\int dx/(x^2+a^2)=a^{-1}\tan^{-1}(x/a)+C.`, [R`a^2=4\Rightarrow a=2`, R`Insert a=2`], R`\frac12\tan^{-1}(x/2)+C`, "Differentiate using the inverse-tangent derivative."),
    e(R`\int(3x+5)/[(x-1)(x^2+1)]dx`, "Use a constant numerator over the linear factor and a linear numerator over the irreducible quadratic.", R`\frac{3x+5}{(x-1)(x^2+1)}=\frac A{x-1}+\frac{Bx+C}{x^2+1}.`, [R`Clear denominators: 3x+5=A(x^2+1)+(Bx+C)(x-1)`, R`Set x=1 to obtain A=4`, R`Compare coefficients to obtain B=-4 and C=1`, R`Integrate 4/(x-1)-4x/(x^2+1)+1/(x^2+1)`], R`4\ln|x-1|-2\ln(x^2+1)+\tan^{-1}x+C`, "Differentiate and recombine over the original denominator.")
  ],
  parts: [
    e(R`\int x\cos xdx`, "Polynomial times trig; choose u=x.", R`\int u dv=uv-\int vdu.`, [R`u=x,du=dx;\ dv=\cos xdx,v=\sin x`, R`x\sin x-\int\sin xdx`, R`x\sin x+\cos x`], R`x\sin x+\cos x+C`, "Differentiate with the product rule."),
    e(R`\int xe^{-x}dx`, "Differentiate x and integrate the exponential.", R`u=x,\ dv=e^{-x}dx.`, [R`du=dx,\ v=-e^{-x}`, R`-xe^{-x}+\int e^{-x}dx`, R`-xe^{-x}-e^{-x}`], R`-(x+1)e^{-x}+C`, "Differentiate."),
    e(R`\int\tan^{-1}x dx`, "Create an invisible product with 1.", R`u=\tan^{-1}x,\ dv=dx.`, [R`du=dx/(1+x^2),\ v=x`, R`x\tan^{-1}x-\int x/(1+x^2)dx`, R`Use w=1+x^2 for the remaining integral`], R`x\tan^{-1}x-\frac12\ln(1+x^2)+C`, "Differentiate."),
    e(R`\int x^2e^xdx`, "Repeat parts until the polynomial reaches zero.", R`Tabular signs are +,-,+.`, [R`First: x^2e^x-2\int xe^xdx`, R`\int xe^xdx=xe^x-e^x`, R`Substitute and collect e^x`], R`e^x(x^2-2x+2)+C`, "Product-rule differentiation cancels lower powers."),
    e(R`\int_0^\pi x\sin xdx`, "Use definite integration by parts.", R`\int_a^bu dv=[uv]_a^b-\int_a^bvdu.`, [R`u=x,\ dv=\sin xdx,\ v=-\cos x`, R`[-x\cos x]_0^\pi+\int_0^\pi\cos xdx`, R`\pi+[\sin x]_0^\pi`], R`\pi`, "The integrand is nonnegative on the interval.")
  ],
  "reduction-formulas": [
    e(R`I_2=\int x^2e^xdx`, "Apply the recurrence twice.", R`I_n=x^ne^x-nI_{n-1}.`, [R`I_2=x^2e^x-2I_1`, R`I_1=xe^x-I_0`, R`I_0=e^x`], R`e^x(x^2-2x+2)+C`, "Differentiate."),
    e(R`J_4=\int_0^{\pi/2}\sin^4xdx`, "Step down by two.", R`J_n=(n-1)J_{n-2}/n.`, [R`J_4=3J_2/4`, R`J_2=J_0/2`, R`J_0=\pi/2`], R`3\pi/16`, "The value is positive and below pi/2."),
    e(R`J_5=\int_0^{\pi/2}\sin^5xdx`, "Odd indices reach J1.", R`J_n=(n-1)J_{n-2}/n.`, [R`J_5=4J_3/5`, R`J_3=2J_1/3`, R`J_1=1`], R`8/15`, "Odd parity correctly ends at J1."),
    e(R`I_3=\int_0^1x^3e^{-x^2/2}dx`, "Use the n-to-n-2 recurrence.", R`I_n=(n-1)I_{n-2}-e^{-1/2}.`, [R`I_3=2I_1-e^{-1/2}`, R`I_1=[-e^{-x^2/2}]_0^1=1-e^{-1/2}`, R`Substitute I1`], R`2-3e^{-1/2}`, "The result is positive, matching the integrand."),
    e(R`K_n=\int_0^1x^n\ln x\,dx`, "Derive a recurrence that lowers the power while preserving the endpoint term.", R`K_n=-\frac1{n+1}\int_0^1x^n dx.`, [R`Choose u=\ln x and dv=x^n dx`, R`Then du=dx/x and v=x^{n+1}/(n+1)`, R`The boundary term [x^{n+1}\ln x/(n+1)]_0^1 is 0 for n>-1`, R`So K_n=-\frac1{n+1}\int_0^1x^n dx=-1/(n+1)^2`], R`K_n=-1/(n+1)^2`, "The integrand is nonpositive on (0,1), matching the negative answer.")
  ],
  trig: [
    e(R`\int\cos^3xdx`, "Save one cosine; convert the even remainder.", R`\cos^2x=1-\sin^2x.`, [R`\int(1-\sin^2x)\cos xdx`, R`u=\sin x,du=\cos xdx`, R`\int(1-u^2)du`], R`\sin x-\sin^3x/3+C`, "Differentiate."),
    e(R`\int\sin^2xdx`, "Use power reduction because the power is even.", R`\sin^2x=(1-\cos2x)/2.`, [R`\frac12\int1dx-\frac12\int\cos2xdx`, R`\int\cos2xdx=\sin2x/2`], R`x/2-\sin2x/4+C`, "Differentiate and use cos2x identity."),
    e(R`\int\sec^2x\tan^3xdx`, "Save sec²x for u=tan x.", R`d(\tan x)=\sec^2xdx.`, [R`u=\tan x,du=\sec^2xdx`, R`\int u^3du=u^4/4`], R`\tan^4x/4+C`, "Differentiate."),
    e(R`\int\sec^3x\tan xdx`, "Save sec x tan x for u=sec x.", R`d(\sec x)=\sec x\tan xdx.`, [R`Write \sec^2x(\sec x\tan xdx)`, R`u=\sec x`, R`\int u^2du`], R`\sec^3x/3+C`, "Differentiate."),
    e(R`\int\cos4x\cos2xdx`, "Different angles require product-to-sum.", R`\cos A\cos B=[\cos(A-B)+\cos(A+B)]/2.`, [R`=\frac12\int(\cos2x+\cos6x)dx`, R`Integrate each term with its chain factor`], R`\sin2x/4+\sin6x/12+C`, "Differentiate and recombine."),
    e(R`\int\tan^2x\,dx`, "Convert tangent squared using the Pythagorean identity.", R`\tan^2x=\sec^2x-1.`, [R`Rewrite as \int(\sec^2x-1)dx`, R`Use \int\sec^2x dx=\tan x and \int1dx=x`], R`\tan x-x+C`, "Differentiate and recover sec²x−1=tan²x.")
  ],
  "trig-substitution": [
    e(R`\int dx/\sqrt{4-x^2}`, "Match a²-x².", R`x=2\sin\theta.`, [R`dx=2\cos\theta d\theta`, R`\sqrt{4-x^2}=2\cos\theta`, R`Integral becomes \int d\theta`], R`\sin^{-1}(x/2)+C`, "Differentiate."),
    e(R`\int dx/(x^2+9)`, "A trig substitution exposes arctangent.", R`x=3\tan\theta.`, [R`dx=3\sec^2\theta d\theta`, R`x^2+9=9\sec^2\theta`, R`Integral becomes \frac13\int d\theta`], R`\frac13\tan^{-1}(x/3)+C`, "Differentiate."),
    e(R`\int\sqrt{x^2-4}/x\,dx`, "Match x²-a².", R`x=2\sec\theta.`, [R`dx=2\sec\theta\tan\theta d\theta`, R`\sqrt{x^2-4}=2\tan\theta`, R`Integral becomes 2\int\tan^2\theta d\theta=2\int(\sec^2\theta-1)d\theta`], R`\sqrt{x^2-4}-2\sec^{-1}(|x|/2)+C`, "Differentiate on the stated domain."),
    e(R`\int x^2/\sqrt{9-x^2}\,dx`, "Use x=3sin theta.", R`\sin^2\theta=(1-\cos2\theta)/2.`, [R`x=3\sin\theta,dx=3\cos\theta d\theta`, R`Radical=3\cos\theta`, R`Integral=9\int\sin^2\theta d\theta`], R`\frac92\sin^{-1}(x/3)-\frac{x}{2}\sqrt{9-x^2}+C`, "Differentiate."),
    e(R`\int dx/(x^2\sqrt{x^2-1})`, "Use x=sec theta.", R`\sec^2\theta-1=\tan^2\theta.`, [R`dx=\sec\theta\tan\theta d\theta`, R`x^2=\sec^2\theta, radical=\tan\theta`, R`Integral=\int\cos\theta d\theta`], R`\sqrt{x^2-1}/x+C`, "Differentiate for x>1."),
    e(R`\int_0^1\sqrt{1-x^2}dx`, "Use a definite sine substitution.", R`x=\sin\theta.`, [R`Bounds: 0\to0,1\to\pi/2`, R`Integral=\int_0^{\pi/2}\cos^2\theta d\theta`, R`Use \cos^2\theta=(1+\cos2\theta)/2`], R`\pi/4`, "It is the area of a quarter unit circle.")
  ],
  weierstrass: [
    e(R`\int dx/(1+\cos x)`, "Use t=tan(x/2).", R`\cos x=(1-t^2)/(1+t^2),\ dx=2dt/(1+t^2).`, [R`1+\cos x=2/(1+t^2)`, R`The quotient becomes \int dt`, R`Back-substitute t`], R`\tan(x/2)+C`, "Differentiate using the half-angle identity."),
    e(R`\int dx/(1-\cos x)`, "Rationalise with Weierstrass.", R`1-\cos x=2t^2/(1+t^2).`, [R`Substitute dx=2dt/(1+t^2)`, R`Integral=\int t^{-2}dt`, R`=-1/t+C`], R`-\cot(x/2)+C`, "Differentiate."),
    e(R`\int dx/(2+\sin x)`, "Convert to a quadratic in t.", R`\sin x=2t/(1+t^2).`, [R`Integral=\int2dt/[2t^2+2t+2]`, R`=\int dt/[t^2+t+1]`, R`Complete square: (t+1/2)^2+3/4`], R`\frac{2}{\sqrt3}\tan^{-1}((2\tan(x/2)+1)/\sqrt3)+C`, "Differentiate."),
    e(R`\int\sin x/(1+\cos x)dx`, "A direct u-sub is shorter than Weierstrass.", R`u=1+\cos x,du=-\sin xdx.`, [R`Integral=-\int du/u`, R`Back-substitute`], R`-\ln|1+\cos x|+C`, "This example teaches method selection."),
    e(R`\int dx/(3-2\cos x)`, "Use the universal rational substitution.", R`t=\tan(x/2).`, [R`Denominator=[3(1+t^2)-2(1-t^2)]/(1+t^2)`, R`= (1+5t^2)/(1+t^2)`, R`Integral=\int2dt/(1+5t^2)`], R`\frac{2}{\sqrt5}\tan^{-1}(\sqrt5\tan(x/2))+C`, "Differentiate."),
    e(R`\int(1+\sin x)^{-1}dx`, "Convert and factor the resulting quadratic.", R`t=\tan(x/2).`, [R`Integral=\int2dt/(t+1)^2`, R`=-2/(t+1)+C`, R`Replace t`], R`-2/[1+\tan(x/2)]+C`, "Differentiate."),
    e(R`\int dx/(1+\sin x+\cos x)`, "Use the universal substitution because both sine and cosine appear rationally.", R`t=\tan(x/2).`, [R`Replace sin x, cos x, and dx by their rational forms`, R`The denominator becomes 2(1+t)/(1+t^2)`, R`The integral reduces to \int dt/(1+t)`, R`Back-substitute t=\tan(x/2)`], R`\ln|1+\tan(x/2)|+C`, "Differentiate on an interval avoiding the denominator's zeros.")
  ],
  improper: [
    e(R`\int_1^\infty x^{-3}dx`, "Replace infinity by a limit.", R`\int_1^\infty=\lim_{t\to\infty}\int_1^t.`, [R`[-1/(2x^2)]_1^t`, R`=1/2-1/(2t^2)`, R`Take t\to\infty`], R`1/2`, "p=3>1 predicts convergence."),
    e(R`\int_1^\infty dx/x`, "Use the p=1 boundary case.", R`\int_1^t dx/x=\ln t.`, [R`Replace infinity by t`, R`\ln t\to\infty`], R`diverges`, "Matches the p-test."),
    e(R`\int_0^1x^{-1/2}dx`, "Treat the blow-up at zero with a right limit.", R`\lim_{t\to0^+}\int_t^1.`, [R`[2\sqrt x]_t^1`, R`=2-2\sqrt t`, R`Take t\to0^+`], R`2`, "p=1/2<1 predicts convergence."),
    e(R`\int_0^1x^{-2}dx`, "Endpoint singularity.", R`\lim_{t\to0^+}[-1/x]_t^1.`, [R`=-1+1/t`, R`1/t\to\infty`], R`diverges`, "p=2>=1 at zero."),
    e(R`\int_0^\infty e^{-2x}dx`, "Use an infinite-endpoint limit.", R`\int e^{-2x}dx=-e^{-2x}/2.`, [R`\lim_{t\to\infty}[-e^{-2x}/2]_0^t`, R`=-e^{-2t}/2+1/2`, R`e^{-2t}\to0`], R`1/2`, "Positive finite area."),
    e(R`\int_{-\infty}^{\infty}dx/(1+x^2)`, "Split a doubly infinite integral.", R`Both halves must converge.`, [R`Split at 0`, R`Each half uses [\tan^{-1}x]`, R`Left=\pi/2, right=\pi/2`], R`\pi`, "Even symmetry confirms twice the right half.")
  ],
  numerical: [
    e(R`T_2\text{ for }\int_0^2x^2dx`, "Build nodes and trapezoidal weights.", R`T_n=\Delta x[f_0+2f_1+f_2]/2.`, [R`\Delta x=1; f_0=0,f_1=1,f_2=4`, R`T_2=\frac12(0+2+4)`], R`3`, "Exact value 8/3; concave-up gives an overestimate."),
    e(R`S_2\text{ for }\int_0^2x^3dx`, "Use Simpson weights 1,4,1.", R`S_2=\Delta x(f_0+4f_1+f_2)/3.`, [R`\Delta x=1`, R`f_0=0,f_1=1,f_2=8`, R`S_2=(0+4+8)/3`], R`4`, "Simpson is exact for cubics."),
    e(R`M_2\text{ for }\int_0^2x^2dx`, "Use midpoint rectangles.", R`M_n=\Delta x\sum f(\text{midpoint}).`, [R`\Delta x=1; midpoints 1/2,3/2`, R`M_2=1[(1/2)^2+(3/2)^2]`], R`5/2`, "Concave-up midpoint rectangles underestimate."),
    e(R`T_4\text{ error order when n doubles}`, "Use the n^-2 scaling.", R`E_T=O(n^{-2}).`, [R`Replace n by 2n`, R`(2n)^{-2}=n^{-2}/4`], R`about four times smaller`, "This is scaling, not an exact equality."),
    e(R`S_n\text{ admissible n}`, "Check the method condition before calculating.", R`Simpson pairs subintervals, so n must be even.`, [R`n=5 cannot form complete pairs`, R`Choose n=4 or n=6`], R`n\text{ even}`, "The weight pattern ends 4,1 only for even n."),
    e(R`T_2\text{ direction for }f(x)=e^x`, "Use concavity.", R`f''(x)=e^x>0.`, [R`The graph is concave up`, R`Chords lie above the graph`], R`overestimate`, "This predicts direction before arithmetic."),
    e(R`L_4\text{ for }\int_0^2(1+x)dx`, "Use left endpoints with equal width h=1/2.", R`L_n=h\sum_{i=0}^{n-1}f(x_i).`, [R`Nodes are 0,1/2,1,3/2,2 and h=1/2`, R`Left heights are 1,3/2,2,5/2`, R`Multiply their sum 7 by h`], R`7/2`, "The exact area is 4; an increasing function gives a left underestimate."),
    e(R`S_4\text{ for tabulated values }(0,1),(1,2),(2,5),(3,10),(4,17)`, "Apply Simpson weights 1,4,2,4,1 to equally spaced data.", R`S_4=\frac h3[f_0+4f_1+2f_2+4f_3+f_4].`, [R`The spacing is h=1 and n=4 is even`, R`Weighted sum =1+8+10+40+17=76`, R`Multiply by h/3`], R`76/3`, "The data follow x²+1; Simpson is exact for this quadratic, whose integral is 76/3." )
  ],
  applications: [
    e(R`A\text{ between }y=x\text{ and }y=x^2\text{ on }[0,1]`, "Use top minus bottom.", R`A=\int(f-g)dx.`, [R`x\ge x^2 on [0,1]`, R`A=\int_0^1(x-x^2)dx`, R`=[x^2/2-x^3/3]_0^1`], R`1/6`, "Area is positive."),
    e(R`V\text{ of }y=x,0\le x\le1\text{ about x-axis}`, "Use disks.", R`V=\pi\int R^2dx.`, [R`R=x`, R`V=\pi\int_0^1x^2dx`, R`=\pi[x^3/3]_0^1`], R`\pi/3`, "Matches cone volume."),
    e(R`V\text{ under }y=x\text{ about y-axis}`, "Use vertical shells.", R`V=2\pi\int(radius)(height)dx.`, [R`radius=x,height=x`, R`2\pi\int_0^1x^2dx`], R`2\pi/3`, "Matches a cone with radius and height 1? Axis geometry confirms the solid."),
    e(R`L\text{ of }y=x\text{ on }[0,1]`, "Use arc length.", R`L=\int\sqrt{1+(y')^2}dx.`, [R`y'=1`, R`L=\int_0^1\sqrt2dx`], R`\sqrt2`, "It is the distance from (0,0) to (1,1)."),
    e(R`\text{Average of }x^2\text{ on }[0,2]`, "Use average value.", R`f_{avg}=\frac1{b-a}\int_a^bf.`, [R`=\frac12\int_0^2x^2dx`, R`=\frac12[x^3/3]_0^2`], R`4/3`, "It lies between min 0 and max 4."),
    e(R`\bar x\text{ of region under }y=x,0\le x\le1`, "Use the first moment divided by area.", R`\bar x=A^{-1}\int x f(x)dx.`, [R`A=\int_0^1x dx=1/2`, R`Moment=\int_0^1x^2dx=1/3`, R`\bar x=(1/3)/(1/2)`], R`2/3`, "The region is heavier toward x=1.")
  ],
  lhopital: [
    e(R`\lim_{x\to0}\sin3x/x`, "Direct form is 0/0.", R`L'Hopital: differentiate top and bottom.`, [R`\lim3\cos3x/1`, R`Substitute x=0`], R`3`, "Matches the standard sine limit."),
    e(R`\lim_{x\to\infty}\ln x/x`, "Form is infinity/infinity.", R`Differentiate separately.`, [R`\lim(1/x)/1`, R`1/x\to0`], R`0`, "Powers grow faster than logs."),
    e(R`\lim_{x\to\infty}x^2/e^x`, "Repeat while indeterminate.", R`L'Hopital applies to infinity/infinity.`, [R`\lim2x/e^x`, R`Still infinity/infinity`, R`\lim2/e^x=0`], R`0`, "Exponentials outrun powers."),
    e(R`\lim_{x\to0}(1-\cos x)/x^2`, "Form is 0/0 twice.", R`Differentiate separately each time.`, [R`\lim\sin x/(2x)`, R`Still 0/0`, R`\lim\cos x/2`], R`1/2`, "Known small-angle result."),
    e(R`\lim_{x\to\infty}x^{1/x}`, "Power form infinity^0; take logs.", R`\ln L=\lim\ln x/x.`, [R`Apply L'Hopital to ln x/x`, R`Limit is 0`, R`L=e^0`], R`1`, "Exponentiate at the end.")
  ],
  "sequences-series": [
    e(R`\lim_{n\to\infty}(2n+1)/(n-3)`, "Divide by the highest power n.", R`Sequence limits respect quotients when denominator limit is nonzero.`, [R`=(2+1/n)/(1-3/n)`, R`1/n\to0`], R`2`, "Leading coefficients agree."),
    e(R`\sum_{n=0}^\infty3(1/2)^n`, "Recognise geometric form.", R`Sum=a/(1-r), |r|<1.`, [R`a=3,r=1/2`, R`3/(1-1/2)`], R`6`, "Partial sums approach 6."),
    e(R`\sum1/n^2`, "Use the p-series benchmark.", R`\sum1/n^p converges iff p>1.`, [R`p=2`, R`2>1`], R`converges`, "No sum value is required."),
    e(R`\sum n/(n^3+1)`, "Compare leading powers.", R`n/(n^3+1)\sim1/n^2.`, [R`Compute limit ratio with 1/n^2`, R`n^3/(n^3+1)\to1`, R`Compare with convergent p=2 series`], R`converges`, "Limit comparison constant is positive finite."),
    e(R`\sum(-1)^{n+1}/n`, "Use the alternating-series test.", R`b_n decreases and tends to zero.`, [R`b_n=1/n>0`, R`b_{n+1}<b_n`, R`b_n\to0`], R`converges conditionally`, "Absolute harmonic series diverges."),
    e(R`\sum_{n=1}^{\infty}2^n/n!`, "Factorials suggest the ratio test.", R`L=\lim|a_{n+1}/a_n|.`, [R`a_{n+1}/a_n=2/(n+1)`, R`The limit is 0`, R`Since 0<1, the series converges absolutely`], R`converges absolutely`, "The factorial eventually dominates every fixed exponential."),
    e(R`\sum_{n=2}^{\infty}1/[n\ln n]`, "Use the integral test because the logarithm prevents direct p-series comparison.", R`\int_2^\infty dx/(x\ln x)=\lim_{b\to\infty}[\ln(\ln x)]_2^b.`, [R`f(x)=1/(x\ln x) is positive, continuous, and decreasing for x\ge2`, R`The comparison integral equals \ln(\ln b)-\ln(\ln2)`, R`This tends to infinity`], R`diverges`, "This is the boundary logarithmic series; adding a power (ln n)^p with p>1 would converge.")
  ],
  "power-series": [
    e(R`\sum x^n`, "Recognise the geometric series.", R`\sum x^n converges for |x|<1.`, [R`Centre a=0`, R`R=1`, R`At x=\pm1 terms do not yield convergence`], R`(-1,1)`, "Both endpoints diverge."),
    e(R`\sum (x-3)^n/2^n`, "Treat it as geometric in (x-3)/2.", R`|r|<1.`, [R`|(x-3)/2|<1`, R`|x-3|<2`, R`1<x<5; endpoints have r=\pm1`], R`R=2,\ (1,5)`, "Centre is 3."),
    e(R`\sum x^n/n!`, "Use the ratio test.", R`L=|x|/(n+1)\to0.`, [R`Form |a_{n+1}/a_n|`, R`Limit is 0 for every real x`], R`R=\infty`, "No finite endpoints."),
    e(R`d/dx\sum_{n=0}^\infty x^n`, "Differentiate term by term inside R=1.", R`d(x^n)/dx=nx^{n-1}.`, [R`Left derivative of 1/(1-x) is 1/(1-x)^2`, R`Right becomes \sum_{n=1}^\infty nx^{n-1}`], R`\sum nx^{n-1}=1/(1-x)^2`, "Valid only for |x|<1."),
    e(R`\int\sum_{n=0}^\infty x^n dx`, "Integrate term by term.", R`\int x^n=x^{n+1}/(n+1).`, [R`C+\sum x^{n+1}/(n+1)`, R`Integral of 1/(1-x) is -\ln(1-x)`], R`-\ln(1-x)=\sum_{n=1}^\infty x^n/n`, "Valid for |x|<1 before endpoint checks."),
    e(R`\sum n x^n`, "Use the ratio test and endpoints.", R`L=|x|.`, [R`|x|<1`, R`x=1 gives \sum n`, R`x=-1 terms do not approach 0`], R`(-1,1)`, "Both endpoints diverge by the term test."),
    e(R`\sum_{n=1}^{\infty}(x+2)^n/n`, "Find the radius first, then test the two endpoints in the original series.", R`\lim|a_{n+1}/a_n|=|x+2|.`, [R`Convergence inside requires |x+2|<1, so -3<x<-1`, R`At x=-3 the series is \sum(-1)^n/n, which converges`, R`At x=-1 the series is harmonic and diverges`], R`R=1,\ [-3,-1)`, "The interval is centred at -2 and has the correct one-sided endpoint inclusion."),
    e(R`\text{Represent }\tan^{-1}x\text{ as a power series}`, "Integrate the geometric series for 1/(1+x²) term by term.", R`1/(1+x^2)=\sum_{n=0}^{\infty}(-1)^n x^{2n},\ |x|<1.`, [R`Integrate from 0 to x so the constant is fixed`, R`\tan^{-1}x=\sum(-1)^n x^{2n+1}/(2n+1)`, R`The radius remains 1; endpoints require separate analysis`], R`x-x^3/3+x^5/5-\cdots`, "Differentiating the series recovers 1/(1+x²) for |x|<1.")
  ],
  taylor: [
    e(R`T_2\text{ for }e^x\text{ at }0`, "Use derivatives of e^x.", R`T_n=\sum f^{(k)}(0)x^k/k!.`, [R`f(0)=f'(0)=f''(0)=1`, R`Insert through k=2`], R`1+x+x^2/2`, "Matches the known Maclaurin series."),
    e(R`T_3\text{ for }\sin x\text{ at }0`, "Cycle sine derivatives.", R`Coefficients are f^{(k)}(0)/k!.`, [R`Values: 0,1,0,-1`, R`Insert powers x^0 through x^3`], R`x-x^3/6`, "Odd symmetry gives only odd powers."),
    e(R`T_2\text{ for }\ln x\text{ at }1`, "Use a nonzero centre.", R`Powers are (x-1)^k.`, [R`f(1)=0,f'(1)=1,f''(1)=-1`, R`Divide f''(1) by 2!`], R`(x-1)-(x-1)^2/2`, "Differentiate coefficients at x=1."),
    e(R`\text{Series for }\cos(x^2)`, "Substitute x² into a known series.", R`\cos z=\sum(-1)^nz^{2n}/(2n)!.`, [R`Set z=x^2`, R`z^{2n}=x^{4n}`], R`1-x^4/2!+x^8/4!-\cdots`, "Only powers divisible by 4 appear."),
    e(R`\text{Cubic estimate of }e^{0.1}`, "Use T3 for e^x.", R`T_3=1+x+x^2/2+x^3/6.`, [R`Insert x=0.1`, R`1+0.1+0.005+0.0001667`], R`1.1051667`, "Close to the calculator value 1.105170... ."),
    e(R`T_4\text{ for }\cos x\text{ at }0`, "Use the four-derivative cycle and retain terms through degree four.", R`T_n=\sum f^{(k)}(0)x^k/k!.`, [R`Derivative values at 0 are 1,0,-1,0,1`, R`Insert the nonzero coefficients at k=0,2,4`], R`1-x^2/2+x^4/24`, "Even symmetry correctly produces only even powers."),
    e(R`\text{Approximate }\sqrt{1.04}\text{ with a quadratic}`, "Expand f(x)=\sqrt{x} about the nearby centre a=1.", R`T_2=f(1)+f'(1)(x-1)+f''(1)(x-1)^2/2.`, [R`f(1)=1, f'(1)=1/2, f''(1)=-1/4`, R`Thus T_2=1+(x-1)/2-(x-1)^2/8`, R`Insert x=1.04`], R`1.0198`, "Squaring gives approximately 1.039992, very close to 1.04."),
    e(R`\text{Bound the error in }T_3\text{ for }e^{0.1}`, "Use the Lagrange remainder with a bound for the fourth derivative.", R`|R_3(x)|\le M|x|^4/4!.`, [R`For e^x on [0,0.1], the fourth derivative is e^x\le e^{0.1}`, R`Take M=e^{0.1}`, R`Compute e^{0.1}(0.1)^4/24`], R`|R_3(0.1)|<4.61\times10^{-6}`, "The actual difference is about 4.08×10⁻⁶, within the bound.")
  ]
};

