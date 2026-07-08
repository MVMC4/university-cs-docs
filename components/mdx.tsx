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
import { Step, StepByStep, StepByStepTitle, StepTitle } from './interactive/step-by-step';
import { InteractiveStepper, StepperStep } from './interactive/interactive-stepper';
import { Flashcard } from './interactive/flashcard';
import { GraphViewer } from './visuals/graph-viewer';
import { Card } from './callouts/card';
import { ResourceHub } from './interactive/resource-hub';


import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Steps as FumaSteps, Step as FumaStep } from 'fumadocs-ui/components/steps';

import { ExamQuestion, SubQuestion } from './interactive/exam-question';
import { FlashcardDeck } from './interactive/flashcard-deck';

import { ExcalidrawCanvas } from './interactive/excalidraw-canvas';

import { ResourceCard, ResourceGrid } from './interactive/resource-card';


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
    StepByStepTitle,
    StepTitle,
    InteractiveStepper,
    StepperStep,
    Flashcard,
    GraphViewer,
    Callout,
    Tabs,
    Tab,
    Accordion,
    Accordions,
    FumaSteps,
    FumaStep,
    Card,
    ResourceHub,
    ExamQuestion,
    SubQuestion,
    FlashcardDeck,
    ExcalidrawCanvas,
    ResourceCard, 
    ResourceGrid,
    
    // Allow any other passed components to override
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}