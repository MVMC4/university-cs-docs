import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { codeThemeDark, codeThemeLight } from './lib/code-theme';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    // CRITICAL: Place it at first, it must be executed BEFORE the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      themes: {
        light: codeThemeLight,
        dark: codeThemeDark,
      },
    },
  },
});