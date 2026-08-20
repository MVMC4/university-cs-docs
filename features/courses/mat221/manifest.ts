import type { Mat221TopicManifest } from './lib/schemas';

const topic = (
  order: number,
  title: string,
  sourceSlug: string,
  slug: string,
  wave: Mat221TopicManifest['wave'],
  prerequisites: string[],
  objectives: string[],
  assets: string[] = [],
): Mat221TopicManifest => ({ order, title, sourceSlug, slug, wave, prerequisites, objectives, assets });

export const mat221Topics = [
  topic(1, 'Antiderivatives and the Fundamental Theorem', 'foundations', '01-foundations', 'A', ['Differentiation rules', 'Function notation'], ['Recognize antiderivatives', 'Use both parts of the Fundamental Theorem of Calculus'], ['foundationsArea', 'ftcFlow']),
  topic(2, 'Integration by Substitution', 'substitution', '02-substitution', 'A', ['Antiderivatives', 'Chain rule'], ['Recognize composite integrands', 'Complete indefinite and definite substitutions'], ['substitutionU']),
  topic(3, 'Partial Fractions', 'partials', '03-partial-fractions', 'B', ['Polynomial algebra', 'Basic integration'], ['Classify denominator factors', 'Decompose and integrate rational functions'], ['partialsSplit']),
  topic(4, 'Integration by Parts', 'parts', '04-integration-by-parts', 'B', ['Product rule', 'Substitution'], ['Choose productive parts', 'Handle repeated, cyclic, and definite cases'], ['liateLadder', 'partsTabular']),
  topic(5, 'Reduction Formulas', 'reduction-formulas', '05-reduction-formulas', 'B', ['Integration by parts', 'Recurrence notation'], ['Derive reduction identities', 'Apply valid ranges and base cases']),
  topic(6, 'Trigonometric Integrals', 'trig', '06-trigonometric-integrals', 'B', ['Trigonometric identities', 'Substitution'], ['Choose parity strategies', 'Use identities without losing factors']),
  topic(7, 'Trigonometric Substitution', 'trig-substitution', '07-trigonometric-substitution', 'B', ['Right-triangle trigonometry', 'Radical algebra'], ['Match radical patterns', 'Back-substitute with domain care'], ['trigTriangle']),
  topic(8, 'Weierstrass Substitution', 'weierstrass', '08-weierstrass-substitution', 'B', ['Trigonometric identities', 'Rational integration'], ['Convert trigonometric rational forms', 'Recognize when a shorter method is better']),
  topic(9, 'Improper Integrals', 'improper', '09-improper-integrals', 'C', ['Limits', 'Definite integration'], ['Identify every improper boundary', 'Classify convergence using one-sided limits'], ['improperLimit']),
  topic(10, 'Numerical Integration', 'numerical', '10-numerical-integration', 'C', ['Definite integrals', 'Tables and intervals'], ['Apply trapezoidal and Simpson rules', 'Reason about requirements and error'], ['numericalRules']),
  topic(11, 'Applications of Integration', 'applications', '11-applications', 'C', ['Definite integration', 'Graph intersections'], ['Choose geometric models', 'Track bounds, units, and method'], ['applicationsWasher']),
  topic(12, 'L’Hôpital’s Rule', 'lhopital', '12-lhopital', 'C', ['Limits', 'Differentiation'], ['Verify indeterminate forms', 'Transform products, differences, and powers'], ['lhopitalRates']),
  topic(13, 'Sequences and Series', 'sequences-series', '13-sequences-and-series', 'D', ['Limits', 'Algebraic inequalities'], ['Select valid convergence tests', 'Classify absolute and conditional convergence'], ['seriesTests']),
  topic(14, 'Power Series', 'power-series', '14-power-series', 'D', ['Series tests', 'Intervals'], ['Find radius and interval of convergence', 'Audit endpoints independently'], ['powerInterval']),
  topic(15, 'Taylor Series', 'taylor', '15-taylor-series', 'D', ['Power series', 'Higher derivatives'], ['Construct and transform Taylor series', 'Use remainder bounds and domains'], ['taylorFit']),
] satisfies Mat221TopicManifest[];

export const mat221Course = {
  code: 'MAT221',
  title: 'Calculus II',
  basePath: '/docs/sem3/mat221',
  sourceCommit: '6f4dd6b48dafb2b0378dd265c2dac8bba799f815',
  topics: mat221Topics,
} as const;
