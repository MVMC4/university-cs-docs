# Components for MDX content

Every course page is built from the same small set of components. The page structure, the notes template and the rules for which component goes where are in [docs/content-standard.md](../docs/content-standard.md); read that first. This file is the reference for the components themselves.

## Rules

1. **Never import components in MDX.** Every component is registered once, in [`components/mdx.tsx`](mdx.tsx), and the MDX compiler resolves it by name. To add a component, create it and register it there.
2. **Data imports are the one exception.** A review page imports its flashcards as data (`import { flashcardData } from '@/content/flashcard-data/...'` at the top of `review.mdx`), never a component.
3. **Questions stay out of the MDX.** Quiz questions live in JSON under `content/quiz-data` and are referenced with `<QuizRef />`; flashcards live in a TypeScript module under `content/flashcard-data`; playground examples and seed datasets live under `content/playground-data`. Older quizzes that are still TypeScript modules (`quizData`, passed to `<Quiz questions={quizData} />`) keep working until their course is migrated.
4. **No emojis in the interface or in headings.** Use plain labels or lucide icons.
5. **Style through tokens.** Components use the `--ui-*` tokens in `app/styles/tokens.css` and the rules in `app/styles/components.css`. Do not add per-component colours or per-course stylesheets.

## The standard elements

| Element | Use | Props |
|---|---|---|
| `LearningObjectives`, `Prerequisites` | Open a notes page | `items` (array of strings) |
| `KeyTerm` | A definition or theorem | `label` (default "Key term"), `title`, `tone` (`blue`, `purple`, `green`, `amber`, `red`) |
| `Steps` and `Step` | A procedure or a worked example | `title` on `Steps`; `title` on each `Step` |
| `Callout` | An aside with one meaning | `type`: `note`, `tip`, `caution`, `mistake`, `key`, `analogy`; optional `title` |
| `CheckQuestions` and `CheckQuestion` | "Check your understanding" at the end of a notes page | `question` on each `CheckQuestion`; the answer is its children |
| `SiteDiagram`, `Mermaid`, `SafeImage` | Figures | see the component |
| `ComparisonTable` | A comparison (renders as a table) | |
| `JavaTryIt`, `HaskellTryIt`, `CodeTryIt` and the algorithm stories | Running or watching code | see the component |

`Callout` also accepts the Fumadocs names `info`, `warning`, `error`, `success` and `idea`, and maps them onto the six kinds above.

```mdx
<LearningObjectives items={['Define a recursive function', 'Trace a call by hand']} />

<KeyTerm title="Recursive function">A function that calls itself on a smaller input until it reaches a base case.</KeyTerm>

<Steps title="Tracing factorial 3">
  <Step title="Expand">`factorial 3 = 3 * factorial 2`</Step>
  <Step title="Reach the base case">`factorial 0 = 1`</Step>
</Steps>

<Callout type="key">Every recursive definition needs a base case and a smaller recursive call.</Callout>

## Check your understanding

<CheckQuestions>
  <CheckQuestion question="Why does the base case matter?">Without it the calls never stop.</CheckQuestion>
</CheckQuestions>
```

## Assessment components

| Page | Components | Data |
|---|---|---|
| Notes | `CheckQuestions` at the end, nothing else | in the MDX, three to five items |
| `review.mdx` | `FlashcardDeck`, then `QuizRef` | `content/flashcard-data/<page path>.ts`, `content/quiz-data/<page path>.json` |
| `questions.mdx` | `ExamQuestion` containing `SubQuestion` with worked solutions | in the MDX |
| `exam.mdx` | `ExamQuestion` containing `SubQuestion` with marks | in the MDX |

```mdx
<QuizRef src="sem3/csi243/01-functional-thinking/review" id="chapter-quiz" />

<ExamQuestion title="Question 1: Pure functions [10 marks]">
  <SubQuestion part="a" prompt={<>Define a pure function. [3]</>} solution={<>Its result depends only on its arguments and it has no side effects. [3]</>} />
</ExamQuestion>
```

### Quiz data

A quiz data file mirrors the path of the page that uses it:

```text
content/docs/sem3/csi243/01-functional-thinking/review.mdx
content/quiz-data/sem3/csi243/01-functional-thinking/review.json
```

```json
{
  "$schema": "../../../quiz.schema.json",
  "quizzes": {
    "chapter-quiz": {
      "title": "Functional thinking",
      "questions": [
        {
          "question": "What makes a function pure?",
          "code": ["double :: Integer -> Integer", "double x = x * 2"],
          "options": ["...", "...", "...", "..."],
          "correctIndex": 2,
          "explanation": "Shown after submitting.",
          "optionFeedback": ["Why option 1 is wrong.", "...", "Correct.", "..."]
        }
      ]
    }
  }
}
```

`code` is optional (one array entry per line) and so is `optionFeedback` (one entry per option, in order). Run `npm run audit:quizzes`: it fails on a malformed question, a reference to a missing file or id, and a quiz that no page uses. The `$schema` path depends on how deep the file is.

## Retired components

These still work, because each one renders through a standard element, but new content should not use them. `npm run audit:content-standard` flags every use so the content can be migrated.

| Retired | Use instead |
|---|---|
| `Card`, `HighlightCard`, `ConceptBlock`, `TheoremBlock` | `KeyTerm` (`label="Theorem" tone="purple"` for a theorem) |
| `PresetCard`, `CommonMistake`, `RecognitionStrategy` | `Callout` |
| `StepByStep`, `MethodSteps`, `InteractiveStepper`, `FumaSteps` | `Steps` |
| `Checklist`, `PracticeCheckpoint` | `LearningObjectives` and `CheckQuestions` |
| `Accordion`, `Accordions` | A plain section, or `CheckQuestions` |
| `Columns`, `Column` | A table, or two sections |
| `WorkedExample`, `WorkedExampleSet` | `Steps` |
| `LessonIntroduction`, `LessonSummary`, `LessonConnection` | The page description, `LearningObjectives`, a `key` callout, the pager |

## Writing math in MDX

The MDX compiler parses JSX before KaTeX reads the LaTeX, so a few habits keep the build from breaking.

- **Math goes in children, never in props.** `<Step title="Setup">$x^2$</Step>`, not `<Step content="$x^2$" />`. A prop is a plain string and is never typeset.
- **No raw `<` or `>` inside JSX.** Write `\lt` and `\gt` in LaTeX, or `&lt;` and `&gt;` in text, for example `<Callout>$P(X \gt 5)$</Callout>`.
- **Use `$...$` for inline math and `$$...$$` for display math.** Do not wrap math in backticks.
- **Wide formulas scroll; they do not wrap.** The layout components already allow horizontal overflow, so do not override it.
- **Keep SVG coordinates rounded.** `GraphViewer` rounds every coordinate with `.toFixed(2)` so the server and the browser render the same markup; do not remove that.

## Where things live

| What | Where |
|---|---|
| Page content | `content/docs/semN/<course>/` |
| Quiz questions | `content/quiz-data/` |
| Flashcards | `content/flashcard-data/` |
| Playground examples | `content/playground-data/` |
| Component registry | `components/mdx.tsx` |
| Styles | `app/styles/` (`tokens.css`, `base.css`, `chrome.css`, `prose.css`, `components.css`, `study-timer.css`) |
| Page chrome (tabs, pager, keys) | `components/layouts/`, `lib/page-navigation.ts`, `lib/topic-pages.ts` |
| The audit | `npm run audit:content-standard` |
