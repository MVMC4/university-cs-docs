'use client';

import React, { useState, Children, isValidElement } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export function StepperStep({ children }: { title: string; children: React.ReactNode }) {
  return <>{children}</>;
}

export function InteractiveStepper({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = Children.toArray(children).filter(isValidElement);
  const totalSteps = steps.length;
  const titles = steps.map(step => (step.props as any).title || 'Step');

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (totalSteps === 0) return null;

  return (
    <div className="my-8 w-full overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="h-1.5 w-full bg-fd-muted">
        <div 
          className="h-full bg-fd-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-fd-foreground">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fd-primary text-xs font-bold text-fd-primary-foreground">
              {currentStep + 1}
            </span>
            <span className="break-words">{titles[currentStep]}</span>
          </h3>
          <span className="shrink-0 text-xs font-medium text-fd-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        <div className="prose prose-sm dark:prose-invert mb-6 max-w-none min-w-0 break-words overflow-x-auto">
          {steps[currentStep]}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-fd-border pt-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentStep === totalSteps - 1 ? (
              <><CheckCircle2 className="h-4 w-4" /> Complete</>
            ) : (
              <>Next <ChevronRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}