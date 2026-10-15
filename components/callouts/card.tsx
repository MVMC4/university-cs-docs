import type { ReactNode } from 'react';
import { KeyTerm } from '@/components/learning/key-term';

/**
 * Retired: notes used Card for definitions (a `###` heading followed by the statement).
 * It now renders as a KeyTerm so those definitions match every other course.
 */
export function Card({ children }: { children: ReactNode; className?: string }) {
  return <KeyTerm label={null}>{children}</KeyTerm>;
}
