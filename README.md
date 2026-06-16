# University CS Docs

A comprehensive, interactive documentation platform for Computer Science courses at the University of Botswana. This project provides structured notes, runnable code examples, and interactive quizzes for various modules, including Functional Programming, Data Structures, Discrete Mathematics, and Calculus.

## IMPORTANT: Memory Warning for Large MDX Files
If you experience out-of-memory errors or crashes while running the development server with large MDX files, you may need to increase Node.js memory limits. For systems with 16GB of RAM, it is highly recommended to allocate up to 12GB to Node.js during intensive builds or development to prevent V8 heap exhaustion.

Run the development server with increased memory:
```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run dev
```
For building:
```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run build
```

## Installation and Setup

### Prerequisites
- Node.js (v18.17 or higher recommended)
- npm or yarn
- Git

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MVMC4/university-docs.git
   cd university-docs
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### Running the Development Server
Start the local Next.js development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Production Build and Deployment
To create an optimized production build:
```bash
npm run build
```
To run the production build locally:
```bash
npm start
```
**Deployment**: The project is configured for deployment on platforms like Vercel. Simply push your repository to GitHub and import the project into Vercel. Vercel will automatically detect the Next.js framework and configure the build settings.

## Architecture and Features

This project is built on modern web technologies to ensure a fast, searchable, and interactive learning experience.

- **Framework**: Next.js 15 (App Router)
- **Documentation Engine**: Fumadocs
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX)
- **Math Rendering**: KaTeX

### Key Features
- **Interactive Homepage**: A responsive, parallax-driven landing page built with Framer Motion.
- **Custom MDX Components**: A massive suite of React components designed for computer science notes, including interactive quizzes, step-by-step guides, mathematical proof environments, and function plotters.
- **Resource Hub**: A centralized, searchable file browser for lecture slides, lab manuals, and supplementary PDFs.

## Content Creation Guide

### Writing MDX Content
All course notes live in the `content/docs/` directory, organized by semester and course code (e.g., `sem3/csi247/`). Every MDX file must start with frontmatter:

```mdx
---
title: "Algorithm Analysis and Big-O Notation"
description: "Complete guide to asymptotic analysis and complexity."
---

# Algorithm Analysis

This is standard markdown with **bold** and *italic* text.
```

### Managing Images
Images are stored statically in the `public/images/` directory, organized by semester and course (e.g., `public/images/sem3/csi247/`).

**Guidelines**:
- Use WebP for photos (smaller file size) or PNG for diagrams with transparency.
- Use descriptive, kebab-case filenames (e.g., `binary-search-visualization.png`).
- Always include descriptive alt text for accessibility.

**Usage in MDX**:
Use the custom `<SafeImage>` component, which gracefully handles broken links by displaying a styled fallback UI.

```mdx
<SafeImage
  src="/images/csi247/binary-search-visualization.png"
  alt="Binary search algorithm visualization"
  caption="Figure 1: Binary search divides the array in half each iteration"
  className="max-w-full h-auto"
/>
```

### Managing Resources (Lectures, Labs, PDFs)
External files are stored in the `public/files/` directory (e.g., `public/files/sem3/csi247/`). 

To make these files browsable in the documentation:
1. Place your files in the appropriate course folder.
2. Create or update the `meta.json` file in that same directory. This JSON file acts as the index, defining folders, file types, URLs, and descriptions.
3. In your MDX page, add the Resource Hub component:

```mdx
<ResourceHub modulePath="/files/sem3/csi247" />
```
The component will automatically render a searchable file browser with built-in PDF previewing.

### Adding Quizzes
Quizzes are powered by a custom `<Quiz />` component and separate TypeScript data files.

1. **Create the Data**: Create a `.ts` file in `content/quiz-data/sem3/[course]/` (e.g., `binary-search-quiz.ts`).
2. **Export the Array**: Export an array named `quizData` containing objects with `question`, `options` (array of 4 strings), `correctIndex` (0-3), and `explanation`.
3. **Inject into MDX**: At the bottom of your MDX file, import the data and render the component:

```mdx
import { quizData } from '@/content/quiz-data/sem3/csi247/binary-search-quiz';

<Quiz title="Binary Search Assessment" questions={quizData} />
```

## The Zero-Import Rule & Global Registry

To keep MDX files clean and focused on content, all custom UI components are **globally registered**. You **never** need to import UI components inside your `.mdx` files. The MDX compiler automatically resolves them via the `MDXProvidedComponents` TypeScript declaration.

The **sole exception** to the zero-import rule is quiz data, which must be imported to keep MDX files lightweight.

### How to Add or Remove a Component Globally
When you create a new component or want to remove an existing one, you only need to update a single file: `components/mdx.tsx`.

1. **Create your component** (e.g., `components/interactive/my-widget.tsx`).
2. **Open `components/mdx.tsx`**.
3. **Import your component** at the top of the file:
   ```tsx
   import { MyWidget } from './interactive/my-widget';
   ```
4. **Register it** in the `getMDXComponents` return object:
   ```tsx
   export function getMDXComponents(components?: MDXComponents) {
     return {
       ...defaultMdxComponents,
       // ... other components
       MyWidget, // <-- Add it here
       ...components,
     } satisfies MDXComponents;
   }
   ```
5. **Use it anywhere** in your `.mdx` files without importing:
   ```mdx
   <MyWidget title="Hello" />
   ```

## Custom Components Reference

Below is the complete reference for all globally registered custom components. 

### Callouts
- **`Card`**: A basic container with a subtle border and background.
- **`Checklist`**: Displays a list of rules with icons. Props: `title`, `rules` (array of `{type: 'must' | 'avoid' | 'note', text: string}`).
- **`HighlightCard`**: Wraps core concepts around formulas or code. Props: `variant` (primary, success, warning, danger, info, neutral), `title`, `description`.
- **`PresetCard`**: Color-coded callouts for specific pedagogical purposes. Props: `type` ('trap', 'exam', 'builds', 'intuition').

### Interactive
- **`Flashcard`**: A 3D-flipping card for memorization. Props: `front`, `back` (ReactNode).
- **`InteractiveStepper` & `StepperStep`**: A multi-step walkthrough with a progress bar and next/previous buttons. Wrap steps in `<StepperStep title="...">`.
- **`Quiz`**: A fully interactive multiple-choice quiz with KaTeX math support, scoring, and explanations. Props: `title`, `questions` (array of quiz data).
- **`ResourceHub`**: A searchable file browser for lectures, labs, and PDFs. Reads from a `meta.json` file. Props: `modulePath` (e.g., `/files/sem3/csi247`).
- **`StepByStep` & `Step`**: A static, vertical timeline of steps. Use `<StepByStep title="...">` and nest `<Step number={1} title="...">` inside.
- **`StepByStepTitle` & `StepTitle`**: Helper components to prevent MDX hydration errors when mixing headings and text.

### Layouts
- **`Columns` & `Column`**: A responsive 2-column grid. Wrap content in `<Columns>` and use `<Column>` for each side.
- **`ComparisonTable`**: A styled table that can highlight a specific column. Props: `columns` (array of `{header, key}`), `rows` (array of objects), `highlightCol` (key to highlight).

### Math
- **`CaseAnalysis` & `Case`**: Used for piecewise functions or conditional logic. Wrap `<Case condition="..." explanation="...">` inside `<CaseAnalysis>`.
- **`EquationBreakdown`, `Equation`, `Term`, `TermGrid`**: Tools for breaking down complex equations. Use `<Equation>` for the main formula, and `<TermGrid>` with `<Term symbol="..." meaning="...">` to define variables.
- **`FormulaBlock`**: Highlights canonical formulas with a "Copy LaTeX" button. Props: `title`, `latex` (the raw LaTeX string for the clipboard). The rendered math goes in `children`.
- **`MathCodeBlock`**: A styled code block for pseudocode with a copy button. Props: `title`, `language`.
- **`MathEnv`**: Mimics LaTeX `amsthm` environments. Props: `type` ('definition', 'theorem', 'lemma', 'corollary', 'example'), `number`, `title`.
- **`Proof`**: A dedicated environment for mathematical proofs, automatically appending a QED symbol at the bottom right.

### Visuals
- **`GraphViewer`**: An SVG-based function plotter that supports multiple functions, integral shading, and grid lines. Props: `functions` (array of `{expr, color, label}`), `integrals`, `domain`, `range`.
- **`SafeImage`**: An image wrapper that gracefully handles broken links by displaying a styled fallback UI. Props: `src`, `alt`, `caption`.

### Native Fumadocs Components
These are also globally registered and require zero imports:
- **`Callout`**: Standard Fumadocs callout boxes.
- **`Tabs` & `Tab`**: Tabbed content sections.
- **`Accordion` & `Accordions`**: Collapsible content sections.
- **`FumaSteps` & `FumaStep`**: Fumadocs native step-by-step component.

## MDX + Math Syntax Guardrails

The MDX compiler parses JSX before KaTeX processes LaTeX. Violating these rules will cause build crashes or hydration mismatches.

1. **Never Put Math Inside Component Props**: Props are evaluated as raw JavaScript strings. KaTeX will not render inside them. Always use component children.
2. **Never Use Raw `<` or `>` Inside JSX**: The JSX parser interprets `<` and `>` as tag boundaries. Always use LaTeX commands (`\lt`, `\gt`) or HTML entities (`&lt;`, `&gt;`).
3. **Prevent Grid/Flex Blowout**: Math formulas do not wrap. All layout components already include `min-w-0` and `overflow-x-auto`. Do not override these classes.

## Contributing Guidelines

Contributions are welcome and encouraged. To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Ensure your code adheres to the existing styling and architectural patterns.
4. If adding new content, ensure MDX files are properly formatted and quiz data strictly follows the TypeScript interfaces.
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
6. Push to the branch (`git push origin feature/AmazingFeature`).
7. Open a Pull Request.

### Content Guidelines
- **MDX Files**: Must include frontmatter (title, description), use proper heading hierarchy, and include code examples with syntax highlighting.
- **Quiz Questions**: Must have exactly 4 options per question, a 0-indexed `correctIndex`, and detailed explanations.
- **Images**: Must use descriptive filenames, include captions, and be optimized for the web.

## License

Distributed under the MIT License. See the `LICENSE` file for full text.

Copyright (c) 2026 MVMC4