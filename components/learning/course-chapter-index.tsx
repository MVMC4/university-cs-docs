import Link from 'next/link';
import { Card } from '@/components/callouts/card';

type Topic = { slug: string; title: string; description: string };

const courseTopics: Record<string, Topic[]> = {
  COM141: [
    { slug: '01-university-learning', title: '1. University Learning', description: 'University expectations, independent learning, practical study habits, time management, goals, and using academic support systems.' },
    { slug: '02-communication', title: '2. Communication', description: 'The communication process, context, channels, feedback, barriers, and responsible communication in academic settings.' },
    { slug: '03-listening-speaking', title: '3. Listening and Speaking', description: 'Active listening, lecture note-making, discussion skills, presentation planning, delivery, and constructive feedback.' },
    { slug: '04-reading', title: '4. Academic Reading', description: 'Purposeful reading, previewing, questioning, close reading, extracting structure, and interpreting written and visual information.' },
    { slug: '05-information-literacy', title: '5. Information Literacy', description: 'Finding sources and evaluating their currency, authority, relevance, accuracy, objectivity, and supporting evidence.' },
    { slug: '06-writing-referencing', title: '6. Writing and Referencing', description: 'Academic paragraphs, note-making, paraphrasing, summarising, drafting, revision, plagiarism, citation, and reference lists.' },
  ],
  CSI131: [
    { slug: '01-logic', title: '1. Logic', description: 'Propositions, truth tables, logical equivalence, predicates, quantifiers, inference rules, and translating arguments into formal notation.' },
    { slug: '02-proofs', title: '2. Proof Techniques', description: 'Direct proof, contraposition, contradiction, induction, counterexamples, and writing complete mathematical arguments.' },
    { slug: '03-sets-functions', title: '3. Sets and Functions', description: 'Set algebra, Cartesian products, relations, functions, composition, inverses, injectivity, surjectivity, and graph models.' },
    { slug: '04-sequences-induction', title: '4. Sequences and Induction', description: 'Sequence notation, recurrence relations, sigma notation, recursive definitions, and inductive reasoning.' },
    { slug: '05-algorithms-counting', title: '5. Algorithms and Counting', description: 'Pseudocode, correctness, searching, sorting, growth, sum and product rules, permutations, and combinations.' },
    { slug: '06-matrices', title: '6. Integers and Matrices', description: 'Integer arithmetic, matrix operations, Boolean matrices, zero-one representations, and discrete-structure applications.' },
  ],
  CSI141: [
    { slug: '01-programming-process', title: '1. Programming Process', description: 'Problem decomposition, algorithms, source code, compilation, execution, testing, and systematic debugging.' },
    { slug: '02-java-basics-io', title: '2. Java Basics and I/O', description: 'Values, primitive types, variables, expressions, strings, type conversion, Scanner input, and formatted output.' },
    { slug: '03-control-flow', title: '3. Control Flow', description: 'Boolean expressions, selection, loops, tracing, invariants, boundary cases, and reliable program control.' },
    { slug: '04-arrays-collections', title: '4. Arrays and Collections', description: 'One- and two-dimensional arrays, ArrayList operations, traversal patterns, mutation, bounds, and data-processing algorithms.' },
    { slug: '05-methods-classes', title: '5. Methods and Classes', description: 'Method contracts, parameters, return values, scope, libraries, objects, constructors, fields, and encapsulation.' },
    { slug: '06-files-debugging', title: '6. Files and Debugging', description: 'Text files, streams, exceptions, input validation, hand tracing, test design, and dependable program submissions.' },
  ],
  CSI161: [
    { slug: '01-systems-overview', title: '1. Computing Systems Overview', description: 'System components, the information-processing cycle, categories of computers, and the role of computing in society.' },
    { slug: '02-architecture-memory', title: '2. Architecture and Memory', description: 'CPU components, instruction execution, buses, primary memory, cache, storage, and the memory hierarchy.' },
    { slug: '03-software-operating-systems', title: '3. Software and Operating Systems', description: 'System and application software, translators, operating-system services, utilities, processes, and file management.' },
    { slug: '04-data-representation', title: '4. Data Representation', description: 'Binary and hexadecimal notation, integers, text, images, audio, representation limits, and conversion methods.' },
    { slug: '05-networks', title: '5. Networks', description: 'Network types, topologies, devices, addressing, protocols, packets, performance, security, and Internet services.' },
    { slug: '06-emerging-technologies', title: '6. Emerging Technologies', description: 'Cloud computing, artificial intelligence, connected systems, automation, social impact, ethics, and responsible adoption.' },
  ],
  MAT111: [
    { slug: '01-functions', title: '1. Functions', description: 'Domains, ranges, graphs, transformations, composition, one-to-one functions, inverse functions, and modelling.' },
    { slug: '02-polynomials-rational', title: '2. Polynomial and Rational Functions', description: 'Division algorithms, factor and remainder theorems, roots, multiplicity, rational expressions, graphs, and asymptotes.' },
    { slug: '03-exponential-logarithmic', title: '3. Exponential and Logarithmic Functions', description: 'Exponent and logarithm laws, inverse relationships, graphs, equations, growth, decay, and applications.' },
    { slug: '04-trigonometry', title: '4. Trigonometry', description: 'Angles, unit-circle values, identities, sine and cosine rules, equations, extrema, and inverse functions.' },
    { slug: '05-complex-numbers', title: '5. Complex Numbers', description: 'Cartesian and polar forms, Argand diagrams, arithmetic, modulus, argument, De Moivre’s theorem, powers, and roots.' },
  ],
  COM142: [
    { slug: '01-academic-writing', title: '1. Academic Writing', description: 'Purpose, audience, formal register, academic voice, precise claims, clarity, and the expectations of university writing.' },
    { slug: '02-writing-process', title: '2. The Writing Process', description: 'Interpreting a task, planning, drafting, feedback, substantive revision, sentence editing, and proofreading.' },
    { slug: '03-paragraphs-essays', title: '3. Paragraphs and Essays', description: 'Paragraph unity and development, cohesion, transitions, essay structure, introductions, body sections, and conclusions.' },
    { slug: '04-argument-evidence', title: '4. Argument and Evidence', description: 'Thesis statements, reasons, evidence, warrants, counterarguments, rebuttals, source integration, and logical strength.' },
    { slug: '05-research-referencing', title: '5. Research and Referencing', description: 'Research questions, search strategy, source evaluation, synthesis, paraphrase, citation, reference lists, and academic integrity.' },
    { slug: '06-group-project', title: '6. Group Project', description: 'Team roles, project planning, collaboration, shared drafting, presentations, peer accountability, and handling conflict.' },
  ],
  CSI132: [
    { slug: '01-sets-functions', title: '1. Sets and Functions', description: 'Set operations, Cartesian products, relations, mappings, composition, inverses, and the properties of functions.' },
    { slug: '02-proofs-induction', title: '2. Proofs and Induction', description: 'Quantified statements, direct and indirect proof, contradiction, counterexamples, mathematical induction, and strong induction.' },
    { slug: '03-sequences-summations', title: '3. Sequences and Summations', description: 'Explicit and recursive sequences, recurrence relations, arithmetic and geometric progressions, and finite sums.' },
    { slug: '04-counting', title: '4. Counting', description: 'Sum and product rules, inclusion-exclusion, permutations, combinations, repeated objects, and restrictions.' },
    { slug: '05-relations-graphs', title: '5. Relations and Graphs', description: 'Relation properties, equivalence classes, partial orders, directed graphs, paths, cycles, connectivity, and representations.' },
    { slug: '06-number-theory', title: '6. Number Theory', description: 'Divisibility, primes, greatest common divisors, the Euclidean algorithm, congruences, and modular arithmetic.' },
  ],
  CSI142: [
    { slug: '01-java-control-flow', title: '1. Java and Control Flow', description: 'Java syntax, expressions, input and output, conditions, loops, tracing, validation, and control-flow reliability.' },
    { slug: '02-arrays-arraylists', title: '2. Arrays and ArrayLists', description: 'Indexed collections, one- and two-dimensional arrays, ArrayList operations, traversal, mutation, and command-line data.' },
    { slug: '03-methods-modularity', title: '3. Methods and Modularity', description: 'Signatures, parameters, return values, pass-by-value, scope, overloading, decomposition, contracts, and reusable design.' },
    { slug: '04-classes-objects', title: '4. Classes and Objects', description: 'Object state, constructors, fields, encapsulation, instance methods, class invariants, identity, and collaboration.' },
    { slug: '05-collections-generics', title: '5. Collections and Generics', description: 'Collection interfaces, generic types, iteration, type safety, and selecting an appropriate data structure.' },
    { slug: '06-exceptions-recursion', title: '6. Exceptions and Recursion', description: 'Exception handling, defensive programming, base cases, recursive progress, stack traces, testing, and failure analysis.' },
  ],
  MAT122: [
    { slug: '01-limits-continuity', title: '1. Limits and Continuity', description: 'Limit notation, one-sided behaviour, algebraic techniques, infinite limits, continuity, and the intermediate value principle.' },
    { slug: '02-differentiation', title: '2. Differentiation', description: 'Derivatives from first principles, standard rules, chain rule, implicit differentiation, and related rates.' },
    { slug: '03-applications-differentiation', title: '3. Applications of Differentiation', description: 'Critical points, monotonicity, extrema, concavity, curve sketching, optimisation, and checking candidates.' },
    { slug: '04-integration', title: '4. Integration', description: 'Antiderivatives, definite integrals, the Fundamental Theorem, substitution, integration by parts, and partial fractions.' },
    { slug: '05-applications-integration', title: '5. Applications of Integration', description: 'Signed and geometric area, average value, solids of revolution, disk and washer methods, and interpretation.' },
    { slug: '06-coordinate-geometry', title: '6. Coordinate Geometry', description: 'Equations of lines, parallel and perpendicular conditions, point-to-line distance, circles, conics, and graph interpretation.' },
  ],
  STA122: [
    { slug: '01-set-theory', title: '1. Set Theory for Probability', description: 'Sample spaces, events, set operations, Venn diagrams, complements, partitions, and translating experiments into sets.' },
    { slug: '02-probability', title: '2. Probability Foundations', description: 'Axioms, complements, unions, finite counting, equally likely outcomes, propositions, and coherent probability reasoning.' },
    { slug: '03-conditional-probability', title: '3. Conditional Probability', description: 'Conditional probability, multiplication rules, tree diagrams, total probability, Bayes’ theorem, and independence.' },
    { slug: '04-random-variables', title: '4. Random Variables', description: 'Discrete and continuous variables, PMFs, PDFs, CDFs, expectation, variance, transformations, and interpretation.' },
    { slug: '05-discrete-distributions', title: '5. Discrete Probability Distributions', description: 'Bernoulli, binomial, geometric, negative binomial, hypergeometric, and Poisson models with selection conditions.' },
    { slug: '06-continuous-distributions', title: '6. Continuous Probability Distributions', description: 'Density functions, continuous probabilities, uniform, exponential, and normal models, standardisation, and applications.' },
  ],
};

export function CourseChapterIndex({ course, base }: { course: string; base: string }) {
  const topics = courseTopics[course] ?? [];
  return <section className="course-chapter-index" aria-labelledby={`${course.toLowerCase()}-chapter-index`}>
    <h2 id={`${course.toLowerCase()}-chapter-index`}>Chapter Index</h2>
    {topics.map((topic) => <Card key={topic.slug} className="chapter-index-card">
      <h3><Link href={`${base}/${topic.slug}/notes`}>{topic.title}</Link></h3>
      <p>{topic.description}</p>
    </Card>)}
  </section>;
}
