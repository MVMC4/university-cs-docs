import type { TopicCard } from './topic-notes-flow';

export const TOPIC_CARDS: Record<string, TopicCard[]> = {
  'University Learning and Study Practice': [
    { front: 'What is active recall?', back: 'Producing an answer from memory before checking the source; retrieval, not rereading, is the learning event.' },
    { front: 'What makes a useful study goal?', back: 'A specific, observable, time-bounded outcome such as solving and correcting ten induction problems by Friday.' },
    { front: 'What belongs in a weekly review?', back: 'One mastered concept, one usable skill, one recurring error, and one question or next action.' },
  ],
  'Communication': [
    { front: 'What completes a communication cycle?', back: 'The receiver interprets the message and feedback confirms or repairs that interpretation.' },
    { front: 'What is noise?', back: 'Any physical, technical, linguistic, emotional, or contextual factor that distorts a message.' },
    { front: 'How should a channel be selected?', back: 'Match it to the complexity, urgency, sensitivity, and need for a permanent record.' },
  ],
  'Listening and Speaking': [
    { front: 'What makes listening active?', back: 'Attending, interpreting, connecting, questioning, paraphrasing, and responding rather than merely hearing.' },
    { front: 'What is the Cornell note structure?', back: 'A main notes area, a cue or question column, and a concise summary written after the session.' },
    { front: 'What is a reliable presentation structure?', back: 'Open with relevance and a roadmap, develop a few supported points, then answer the purpose in the close.' },
  ],
  'Academic Reading': [
    { front: 'How do skimming and scanning differ?', back: 'Skimming finds structure and main ideas; scanning locates a specific term, name, number, or section.' },
    { front: 'What does SQ3R stand for?', back: 'Survey, Question, Read, Recite, Review.' },
    { front: 'What does critical reading add?', back: 'Evaluation of assumptions, evidence quality, limitations, alternatives, and implications.' },
  ],
  'Information Literacy': [
    { front: 'What is a primary source?', back: 'Original data, documents, observations, interviews, creative work, or experimental findings.' },
    { front: 'What should source evaluation test?', back: 'Authority, accuracy, currency, relevance, method, evidence, and purpose.' },
    { front: 'Why keep a source record?', back: 'To preserve bibliographic details, exact locations, claims, and evaluation while the evidence is still traceable.' },
  ],
  'Writing and Referencing': [
    { front: 'What completes an academic paragraph?', back: 'A controlling claim, relevant evidence, explanation of the connection, and a link to the larger argument.' },
    { front: 'Does paraphrasing remove the need to cite?', back: 'No. New wording does not make the underlying idea your own.' },
    { front: 'What is the right revision order?', back: 'Argument and structure, paragraph reasoning, sentence clarity, then proofreading and reference auditing.' },
  ],
  'Logic and Inference': [
    { front: 'When is an implication p → q false?', back: 'Only when p is true and q is false.' },
    { front: 'What is logical equivalence?', back: 'Two propositions have the same truth value under every possible assignment.' },
    { front: 'What makes an inference valid?', back: 'Whenever all premises are true, the conclusion must also be true.' },
  ],
  'Proof Techniques': [
    { front: 'How does a contrapositive proof work?', back: 'Replace P → Q with the equivalent statement not-Q → not-P and prove that directly.' },
    { front: 'What does one counterexample establish?', back: 'It disproves a universal claim by providing one valid case where the claim fails.' },
    { front: 'What are the parts of induction?', back: 'Base case, inductive hypothesis for arbitrary k, proof of k+1, and the quantified conclusion.' },
  ],
  'Sets, Functions, Relations, and Graphs': [
    { front: 'How do domain, codomain, and range differ?', back: 'The domain contains inputs, the codomain is the declared target, and the range contains outputs actually reached.' },
    { front: 'When is a function bijective?', back: 'When it is both injective and surjective.' },
    { front: 'What defines an equivalence relation?', back: 'Reflexivity, symmetry, and transitivity.' },
  ],
  'Sequences, Summations, and Recursion': [
    { front: 'What defines an arithmetic sequence?', back: 'Consecutive terms differ by a constant d, giving a_n = a_1 + (n−1)d.' },
    { front: 'What must accompany a recurrence?', back: 'Enough initial conditions to determine every later term uniquely.' },
    { front: 'What makes recursion terminate?', back: 'A reachable base case and a recursive step that strictly progresses toward it.' },
  ],
  'Algorithms and Counting': [
    { front: 'When should the product rule be used?', back: 'When an outcome is formed by a sequence of choices whose counts multiply.' },
    { front: 'Permutation or combination?', back: 'Use a permutation when order or assigned roles matter; use a combination when only membership matters.' },
    { front: 'What does Big-O communicate?', back: 'An asymptotic upper-growth class for resource use as the input becomes large.' },
  ],
  'Integers and Matrices': [
    { front: 'What does a divides b mean?', back: 'There is an integer k such that b = ak.' },
    { front: 'When can matrices be multiplied?', back: 'When the number of columns of the left matrix equals the number of rows of the right matrix.' },
    { front: 'What does a Boolean matrix represent?', back: 'A relation or adjacency structure using 0 for absence and 1 for presence.' },
  ],
  'Programming Process and Java Setup': [
    { front: 'What are the stages from problem to program?', back: 'Analyse, specify, design an algorithm, implement, compile, test, debug, and document.' },
    { front: 'What does the Java compiler produce?', back: 'Bytecode that the Java Virtual Machine loads and executes.' },
    { front: 'What makes a test useful?', back: 'A stated input, expected result, actual result, and purpose such as a boundary or error case.' },
  ],
  'Java Basics, Types, and I/O': [
    { front: 'Primitive value versus object reference?', back: 'A primitive variable contains its value; an object variable contains a reference to an object.' },
    { front: 'How should String contents be compared?', back: 'Use equals(), not ==, because == compares reference identity.' },
    { front: 'What is narrowing conversion?', back: 'A conversion to a smaller or less expressive type that may lose information and usually needs an explicit cast.' },
  ],
  'Control Flow and Debugging': [
    { front: 'What three parts make a loop reliable?', back: 'A correct initial state, a continuation condition, and guaranteed progress toward termination.' },
    { front: 'What is a loop invariant?', back: 'A statement that remains true before and after every iteration and explains partial correctness.' },
    { front: 'What exposes off-by-one errors?', back: 'Tracing zero, one, first-index, and last-index cases.' },
  ],
  'Arrays and ArrayLists': [
    { front: 'What are valid indices for an array of length n?', back: '0 through n−1.' },
    { front: 'Array versus ArrayList?', back: 'An array has fixed length; an ArrayList resizes and provides collection operations such as add and remove.' },
    { front: 'What is aliasing?', back: 'Two variables refer to the same mutable object, so a change through one reference is visible through the other.' },
  ],
  'Methods, Libraries, and Classes': [
    { front: 'What belongs in a method contract?', back: 'Inputs, preconditions, returned result, side effects, and postconditions.' },
    { front: 'How does Java pass arguments?', back: 'By value; for objects, the copied value is the reference.' },
    { front: 'What is encapsulation?', back: 'Keeping representation private and exposing operations that preserve the object invariant.' },
  ],
  'Files, Streams, and Tested Programs': [
    { front: 'Why use try-with-resources?', back: 'It closes files and other AutoCloseable resources even when an exception occurs.' },
    { front: 'What is a stream?', back: 'An ordered flow of data between a source and a destination.' },
    { front: 'What should an error path test?', back: 'The program’s observable response to missing, malformed, inaccessible, or otherwise invalid input.' },
  ],
  'Computing Systems and the Information Cycle': [
    { front: 'What is the information-processing cycle?', back: 'Input, processing, output, storage, and communication, coordinated by control and feedback.' },
    { front: 'Hardware versus software?', back: 'Hardware is the physical system; software is the encoded instructions and data that direct it.' },
    { front: 'What is systems thinking?', back: 'Explaining how components, interfaces, constraints, and feedback interact to produce behaviour.' },
  ],
  'Architecture, Organisation, and Memory': [
    { front: 'What are the main CPU units?', back: 'Control unit, arithmetic-logic unit, registers, clocking, and interfaces to memory and buses.' },
    { front: 'What is the instruction cycle?', back: 'Fetch, decode, execute, and store or write back.' },
    { front: 'Why is memory hierarchical?', back: 'Fast storage is costly and small, so systems combine registers, cache, RAM, and secondary storage.' },
  ],
  'Software and Operating Systems': [
    { front: 'What does an operating system manage?', back: 'Processes, memory, files, devices, security, users, and shared hardware resources.' },
    { front: 'Compiler versus interpreter?', back: 'A compiler translates a program before execution; an interpreter executes translated operations incrementally.' },
    { front: 'What is a file system?', back: 'The naming, organisation, metadata, storage, and access model for persistent data.' },
  ],
  'Data Representation': [
    { front: 'Why is hexadecimal useful?', back: 'One hexadecimal digit represents four binary bits, making long bit patterns compact and readable.' },
    { front: 'What causes integer overflow?', back: 'A result falls outside the representable range of the fixed-width encoding.' },
    { front: 'How is text represented?', back: 'Characters map to numeric code points, then to encoded byte sequences such as UTF-8.' },
  ],
  'Networks and Telecommunications': [
    { front: 'What is a protocol?', back: 'A shared set of rules for message format, sequencing, meaning, and error handling.' },
    { front: 'Bandwidth versus latency?', back: 'Bandwidth is transfer capacity; latency is delay before or during communication.' },
    { front: 'Why are packets used?', back: 'They let networks share links, route data independently, detect errors, and retransmit missing pieces.' },
  ],
  'Emerging Technologies': [
    { front: 'What defines cloud computing?', back: 'On-demand access to shared, elastic computing resources delivered as services.' },
    { front: 'What should an AI claim be evaluated against?', back: 'Training data, task definition, error measures, deployment context, bias, and human consequences.' },
    { front: 'What makes technology evaluation responsible?', back: 'Assessing benefit, risk, security, privacy, accessibility, sustainability, and affected stakeholders.' },
  ],
  'Functions and Graphs': [
    { front: 'What makes a relation a function?', back: 'Every input in the domain is assigned exactly one output.' },
    { front: 'When does an inverse function exist?', back: 'When the function is one-to-one on its domain, or bijective relative to the stated codomain.' },
    { front: 'How does y=f(x−h)+k transform a graph?', back: 'It moves the graph h units right and k units up.' },
  ],
  'Polynomial and Rational Functions': [
    { front: 'What does the factor theorem state?', back: '(x−a) is a factor of p(x) exactly when p(a)=0.' },
    { front: 'What creates a removable hole?', back: 'A factor cancels algebraically but the original function remains undefined at its zero.' },
    { front: 'What creates a vertical asymptote?', back: 'A non-cancelled denominator factor approaches zero while the numerator remains non-zero.' },
  ],
  'Exponential and Logarithmic Functions': [
    { front: 'What is the inverse relationship?', back: 'y=a^x exactly when x=log_a y, for a>0 and a≠1.' },
    { front: 'What is the logarithm product law?', back: 'log_a(xy)=log_a x+log_a y for positive x and y.' },
    { front: 'What domain restriction applies to logarithms?', back: 'Every logarithm argument must be strictly positive.' },
  ],
  'Trigonometry': [
    { front: 'What is the fundamental Pythagorean identity?', back: 'sin²x+cos²x=1.' },
    { front: 'When is the sine rule useful?', back: 'When a known angle-side pair is available and another side or angle is required.' },
    { front: 'What must a trigonometric solution include?', back: 'All angles in the stated interval, not only the principal inverse-trig value.' },
  ],
  'Complex Numbers': [
    { front: 'What is the conjugate of a+bi?', back: 'a−bi; multiplying conjugates gives a²+b².' },
    { front: 'What is the modulus of a+bi?', back: 'sqrt(a²+b²), the distance from the origin on the Argand plane.' },
    { front: 'What does De Moivre’s theorem do?', back: 'It raises a polar-form complex number to powers by raising the modulus and multiplying the argument.' },
  ],
  'Academic Writing': [
    { front: 'What distinguishes an academic claim?', back: 'It is specific, contestable, appropriately qualified, and supported by traceable evidence.' },
    { front: 'What is academic voice?', back: 'Clear, precise, evidence-led language calibrated to purpose, audience, discipline, and degree of certainty.' },
    { front: 'Why qualify a claim?', back: 'To make its strength and scope match the evidence rather than overstating what the source establishes.' },
  ],
  'The Writing Process': [
    { front: 'What happens during planning?', back: 'Unpack the prompt, define the question, form a working thesis, outline the reasoning, and map evidence.' },
    { front: 'Revision versus proofreading?', back: 'Revision changes argument and structure; proofreading corrects surface errors after the reasoning is stable.' },
    { front: 'What is a reverse outline?', back: 'A list of what each drafted paragraph actually does, used to test sequence, relevance, and balance.' },
  ],
  'Paragraphs and Essays': [
    { front: 'What is paragraph unity?', back: 'Every sentence develops the controlling idea stated or implied by the topic sentence.' },
    { front: 'What does coherence require?', back: 'A logical order, consistent key terms, clear references, and transitions that name relationships.' },
    { front: 'What should a conclusion do?', back: 'Synthesize the established reasoning and answer the question without introducing a new major claim.' },
  ],
  'Argument and Evidence': [
    { front: 'What is a warrant?', back: 'The reasoning that explains why the evidence supports the claim.' },
    { front: 'When is evidence sufficient?', back: 'When its amount, quality, and variety justify the scope and strength of the claim.' },
    { front: 'How should a counterargument be handled?', back: 'Represent it accurately, examine its evidence, then qualify, rebut, or integrate it.' },
  ],
  'Research and Referencing': [
    { front: 'What is synthesis?', back: 'Organising several sources around an idea, relationship, agreement, disagreement, method, or limitation.' },
    { front: 'What must an in-text citation do?', back: 'Identify the source exactly where its words, ideas, data, image, or method is used.' },
    { front: 'What is a reference audit?', back: 'Checking that every in-text citation has a matching retrievable entry and every entry is used.' },
  ],
  'Group Research and Presentation': [
    { front: 'What makes a group task accountable?', back: 'A named owner, definition of done, dependency, due date, and visible evidence of completion.' },
    { front: 'What should meeting minutes preserve?', back: 'Decisions, action owners, deadlines, risks, and unresolved questions.' },
    { front: 'What must be integrated before presenting?', back: 'Thesis, terminology, evidence standard, citation method, visual style, timing, and handovers.' },
  ],
  'Sets and Functions': [
    { front: 'What is a Cartesian product?', back: 'A×B is the set of ordered pairs (a,b) with a in A and b in B.' },
    { front: 'Injective versus surjective?', back: 'Injective means outputs do not merge distinct inputs; surjective means every codomain value is reached.' },
    { front: 'When does a function have an inverse?', back: 'When it is bijective between its stated domain and codomain.' },
  ],
  'Proofs and Induction': [
    { front: 'What does a direct proof assume?', back: 'The hypothesis, then uses definitions and established results to reach the conclusion.' },
    { front: 'When is strong induction useful?', back: 'When proving the next case needs several or all earlier cases rather than only case k.' },
    { front: 'Why is the base case essential?', back: 'It anchors the implication chain; without it, the inductive step proves no first case.' },
  ],
  'Sequences and Summations': [
    { front: 'Arithmetic sequence formula?', back: 'a_n=a_1+(n−1)d.' },
    { front: 'Finite geometric sum?', back: 'Sum from i=0 to n−1 of ar^i equals a(1−r^n)/(1−r), for r not equal to 1.' },
    { front: 'How is a proposed recurrence solution checked?', back: 'Verify all initial conditions and substitute the formula into the recurrence, often using induction.' },
  ],
  'Counting': [
    { front: 'What does C(n,r) count?', back: 'Unordered selections of r distinct objects from n distinct objects.' },
    { front: 'What is complementary counting?', back: 'Count all allowed outcomes and subtract outcomes that violate the required property.' },
    { front: 'Why subtract an intersection in inclusion-exclusion?', back: 'Because outcomes in both sets were counted twice when the separate set sizes were added.' },
  ],
  'Relations and Graphs': [
    { front: 'What is an equivalence class?', back: 'The set of all elements related to a representative under an equivalence relation.' },
    { front: 'Walk, trail, or path?', back: 'A walk may repeat; a trail repeats no edge; a path repeats no vertex.' },
    { front: 'BFS versus DFS?', back: 'BFS explores by distance layers; DFS follows a branch before backtracking.' },
  ],
  'Number Theory': [
    { front: 'What does a≡b mod m mean?', back: 'm divides a−b.' },
    { front: 'What does the Euclidean algorithm compute?', back: 'The greatest common divisor through repeated division with remainder.' },
    { front: 'When is cancellation modulo m safe?', back: 'When the cancelled factor is invertible modulo m, commonly when it is coprime to m.' },
  ],
  'Java Recap and Control Flow': [
    { front: 'What is short-circuit evaluation?', back: 'Java skips the right operand of && after false and of || after true.' },
    { front: 'When should a for loop be preferred?', back: 'When initialisation, continuation, and update follow a clear iteration pattern.' },
    { front: 'What is the first debugging target?', back: 'The earliest program state that differs from the expected trace.' },
  ],
  'Methods and Modularity': [
    { front: 'What is method cohesion?', back: 'A method has one clear responsibility and all its steps contribute to that responsibility.' },
    { front: 'What defines method overloading?', back: 'Methods share a name but have different parameter type lists.' },
    { front: 'Why return rather than print?', back: 'Returned values are composable, reusable, and directly testable by callers.' },
  ],
  'Classes and Objects': [
    { front: 'Class versus object?', back: 'A class defines a type and its behaviour; an object is one runtime instance with identity and state.' },
    { front: 'What is a class invariant?', back: 'A condition that must hold after construction and after every public operation.' },
    { front: 'What does this refer to?', back: 'The current object whose constructor or instance method is executing.' },
  ],
  'Collections and Generics': [
    { front: 'List, Set, or Map?', back: 'A List is ordered and allows duplicates; a Set enforces uniqueness; a Map associates keys with values.' },
    { front: 'Why use generics?', back: 'They express element types at compile time and reduce unsafe casts and runtime type errors.' },
    { front: 'How can items be removed during traversal?', back: 'Use a suitable Iterator removal operation or collect changes for application after traversal.' },
  ],
  'Exceptions, Recursion, and Testing': [
    { front: 'What belongs in try, catch, and finally?', back: 'Risky work in try, targeted recovery in catch, and unconditional cleanup in finally when needed.' },
    { front: 'What guarantees recursive progress?', back: 'Each recursive call moves to a measurably smaller or simpler input that reaches a base case.' },
    { front: 'What cases should a unit test set include?', back: 'Normal, boundary, empty, invalid, and explicit error-path cases.' },
  ],
  'Limits and Continuity': [
    { front: 'When does a two-sided limit exist?', back: 'When the left-hand and right-hand limits both exist and are equal.' },
    { front: 'What are the three continuity conditions at a?', back: 'f(a) exists, lim x→a f(x) exists, and that limit equals f(a).' },
    { front: 'What does 0/0 indicate?', back: 'An indeterminate form requiring algebraic, graphical, or theorem-based analysis—not the answer zero.' },
  ],
  'Differentiation': [
    { front: 'What does f′(a) represent?', back: 'The instantaneous rate of change and slope of the tangent line at x=a.' },
    { front: 'What is the chain rule?', back: 'The derivative of f(g(x)) is f′(g(x))g′(x).' },
    { front: 'How is implicit differentiation handled?', back: 'Differentiate both sides with respect to x, attach dy/dx to derivatives of y, then solve for dy/dx.' },
  ],
  'Applications of Differentiation': [
    { front: 'What is a critical number?', back: 'A domain value where f′ is zero or does not exist.' },
    { front: 'What confirms an inflection point?', back: 'A change in concavity across the point, not merely f″=0.' },
    { front: 'How are absolute extrema found on [a,b]?', back: 'Evaluate f at all interior critical numbers and both endpoints, then compare values.' },
  ],
  'Integration': [
    { front: 'What does +C represent?', back: 'The family of antiderivatives differing by an arbitrary constant.' },
    { front: 'What does the fundamental theorem connect?', back: 'Accumulated definite integrals and antiderivatives or derivatives.' },
    { front: 'What does substitution reverse?', back: 'The chain rule by replacing an inner expression and its derivative with a new variable.' },
  ],
  'Applications of Integration': [
    { front: 'Area between curves with vertical slices?', back: 'Integrate top minus bottom, splitting where the order changes.' },
    { front: 'Washer formula?', back: 'V=π∫(R²−r²)dx, using outer and inner radii perpendicular to the axis.' },
    { front: 'Displacement versus distance?', back: 'Displacement integrates signed velocity; distance integrates speed and splits at sign changes.' },
  ],
  'Coordinate Geometry': [
    { front: 'Slope through two points?', back: 'm=(y₂−y₁)/(x₂−x₁), provided x₂≠x₁.' },
    { front: 'Circle in standard form?', back: '(x−h)²+(y−k)²=r², with centre (h,k) and radius r.' },
    { front: 'How are curve intersections found?', back: 'Solve the equations simultaneously and verify candidates in the original domains.' },
  ],
  'Set Theory and Events': [
    { front: 'What is a sample space?', back: 'The complete set of possible outcomes for the stated random experiment.' },
    { front: 'What is an event?', back: 'A subset of the sample space.' },
    { front: 'What makes events disjoint?', back: 'Their intersection is empty, so they cannot occur together.' },
  ],
  'Probability Foundations': [
    { front: 'General addition rule?', back: 'P(A∪B)=P(A)+P(B)−P(A∩B).' },
    { front: 'Why use a complement for “at least one”?', back: 'It is often simpler to subtract the probability of zero successes from one.' },
    { front: 'When is favourable-over-total valid?', back: 'When the finite sample-space outcomes are equally likely.' },
  ],
  'Conditional Probability and Independence': [
    { front: 'Definition of P(A|B)?', back: 'P(A∩B)/P(B), provided P(B)>0.' },
    { front: 'How is independence checked?', back: 'P(A∩B)=P(A)P(B), equivalently conditioning on one does not change the other.' },
    { front: 'What does Bayes’ theorem reverse?', back: 'It converts a likelihood P(B|A) and prior P(A) into the posterior P(A|B).' },
  ],
  'Random Variables': [
    { front: 'What is a random variable?', back: 'A function assigning a numerical value to each outcome.' },
    { front: 'Expected value of a discrete X?', back: 'E[X]=Σx p(x), the probability-weighted long-run average.' },
    { front: 'Computational variance formula?', back: 'Var(X)=E[X²]−(E[X])².' },
  ],
  'Discrete Probability Distributions': [
    { front: 'When is a binomial model valid?', back: 'A fixed number of independent Bernoulli trials with constant success probability.' },
    { front: 'What does a geometric variable model?', back: 'Waiting time until the first success, with the convention stated explicitly.' },
    { front: 'Poisson mean and variance?', back: 'Both equal the interval rate parameter λ.' },
  ],
  'Continuous Probability Distributions': [
    { front: 'How is continuous probability found?', back: 'As area under the density over an interval.' },
    { front: 'What is P(X=a) for continuous X?', back: 'Zero.' },
    { front: 'How is a normal value standardised?', back: 'z=(x−μ)/σ.' },
  ],
};
