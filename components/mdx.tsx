import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// 1. Import your custom components
import { SafeImage } from './visuals/safe-image';
import { Quiz } from './interactive/quiz';
import { Columns, Column } from './layouts/columns';
import { ComparisonTable } from './layouts/comparison-table';
import { PresetCard } from './callouts/preset-card';
import { HighlightCard } from './callouts/highlight-card';
import { Checklist } from './callouts/checklist';
import { MathEnv } from './math/math-env';
import { EquationBreakdown, Equation, Term, TermGrid } from './math/equation-breakdown';
import { FormulaBlock } from './math/formula-block';
import { CaseAnalysis, Case } from './math/case-analysis';
import { StepByStep, Step } from './interactive/step-by-step';
import { InteractiveStepper, StepperStep } from './interactive/interactive-stepper';
import { Flashcard } from './interactive/flashcard';
import { GraphViewer } from './visuals/graph-viewer';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    
    // 2. Register them globally
    SafeImage,
    Quiz,
    Columns,
    Column,
    ComparisonTable,
    PresetCard,
    HighlightCard,
    Checklist,
    MathEnv,
    EquationBreakdown,
    Equation,
    Term,
    TermGrid,
    FormulaBlock,
    CaseAnalysis,
    Case,
    StepByStep,
    Step,
    InteractiveStepper,
    StepperStep,
    Flashcard,
    GraphViewer,
    
    // Allow any other passed components to override
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}