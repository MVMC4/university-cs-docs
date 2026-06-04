import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { SafeImage } from './safe-image';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    SafeImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
