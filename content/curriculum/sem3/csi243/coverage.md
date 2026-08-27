# CSI243 source-coverage matrix

This matrix controls the redevelopment of CSI243. A topic is not complete until its source material, explanation, runnable examples, practice, lab, and review checks are all covered.

| Unit | Required coverage | Primary supplied sources | Required practical evidence | Status |
|---|---|---|---|---|
| 00 Start Here | GHCup install, GHC, GHCi, Prelude prompt, `:help`, `:load`, `:reload`, `:type`, `:info`, `:set prompt`, `:quit`, expressions, `let`, `it`, `:{ :}`, first saved script, `runhaskell`, `ghc -o`, comments, module/filename rule | Lecture 2 Using Haskell; Lab 1; csi243_ho4 | Environment check, first saved program, and a compiled executable | Written |
| 01 Functional Thinking | Functions, expressions, purity, side effects, composition, FP vs imperative | Lecture 1 Intro to FP; csi243_ho4 | Compare two solutions and identify side effects | Written |
| 02 Expressions and Types | Syntax/type analysis, `Int`, `Integer`, `Float`, `Double`, `Bool`, `Char`, `String`, lists, tuples, inference | Definitions and Data Types; csi243_ho4 | Predict and verify expression types and results | Written |
| 03 Defining Functions | Signature, specification, implementation, comments, identifiers, precedence, testing | csi243_ho4; csi243_ho6; Lab 1 | A documented `.hs` file with verified calls | Written |
| 04 Making Choices | `if`, guards, pattern matching, `case`, ordering, exhaustiveness | csi243_ho6; Making Choices 2; csi243_ho7; Haskell Functions | One problem implemented four ways (Lab 02) | Written |
| 05 Recursion | Base case, recursive step, termination, factorial, Fibonacci, dry runs, invalid inputs, `error` | Making Choices 2; csi243_ho7; Haskell Functions | Recursive traces and error handling | Written |
| 06 Lists, Tuples and Comprehensions | Homogeneous lists, cons, ranges, list recursion, partial functions, tuple arity, `fst`/`snd`, comprehensions with generators and tests | Modules, Lists, Tuples; Definitions and Data Types; Haskell Functions; csi243_ho7; Lab 3 | Recursive list functions with dry runs (Lab 03) | Written |
| 07 Higher-Order Functions | Lambdas, currying, partial application, sections, `map`, `filter`, `takeWhile`, `zipWith`, folds, composition | csi243_ho7; csi243_ho4; Haskell Functions | Trace and compare higher-order pipelines | Written |
| 08 Modules and Custom Types | Module naming, exports, imports, qualified imports, `Prelude`, type synonyms, `data`, constructors, recursive types | Modules, Lists, Tuples; Lecture 2; csi243_ho7; csi243_ho4 | Two-module program and a custom data type | Written |
| 09 Polymorphism and Type Classes | Type variables, inference rule, constraints, `Eq`/`Ord`/`Show`/`Num`/`Integral`/`Fractional`, numeric conversion, `Maybe`, instances | csi243_ho7; Definitions and Data Types; Haskell Functions | Generic functions and signature reading | Written |
| 10 Reasoning, Testing and Revision | Specification, pre/postconditions, input partitioning, referential transparency, structural induction, error classes, test categories, recursive and list-operation cost, laziness | csi243_ho4; Lecture 1; Making Choices 2 | Reasoning worksheet and complexity comparison | Written |

## Site chapter mapping

The units above are taught on the site inside chapter folders, which do not map one-to-one:

| Unit | Site location |
|---|---|
| 00 Start Here | `02-expressions-types/notes/ghci`, `notes/first-program` |
| 01 Functional Thinking | `01-functional-thinking/notes/*` |
| 02 Expressions and Types | `02-expressions-types/notes/values-text`, `notes/expressions-types` |
| 03 Defining Functions | `03-defining-functions/notes/*`, `lab-01` |
| 04 Making Choices | `04-making-choices/notes/*`, `lab-02` |
| 05 Recursion | `05-recursion/notes/*` |
| 06 Lists, Tuples and Comprehensions | `06-lists-tuples/notes/*`, `lab-03` |
| 07 Higher-Order Functions | `07-higher-order/notes/*` |
| 08 Modules and Custom Types | `08-modules-types/notes/*` |
| 09 Polymorphism and Type Classes | `09-polymorphism/notes/*` |
| 10 Reasoning, Testing and Revision | `10-reasoning-revision/notes/*` |

## Laboratory coverage

| Lab | Source | Site location |
|---|---|---|
| Lab 1 — Introduction to the Haskell Environment | `Labs/Lab 1 (1).docx` | `03-defining-functions/lab-01`, with Tasks 1–3 also covered in `02-expressions-types/notes/ghci` |
| Lab 2 — Making Choices | `Labs/Lab 2 Making Choices (1).docx` | `04-making-choices/lab-02` |
| Lab 3 — Recursion and Lists | `Labs/Lab 3 Recursion Continued.pdf` | `06-lists-tuples/lab-03` |

## Verification status

**Course GHC version: not yet pinned.** Pin it before clearing any row below.

| Unit | GHC-verified output? | Notes |
|---|---|---|
| 00 Start Here | **No — pending** | Written from Lecture 2 and Lab 1. Prompt transcripts follow documented GHC behaviour but were not captured from a run. |
| 01 Functional Thinking | Not applicable | No terminal transcripts. |
| 02 Expressions and Types | Pending re-check | Inherited from the earlier build; version not recorded. |
| 03 Defining Functions | Pending re-check | Inherited from the earlier build; version not recorded. |
| 04–10 | **No — pending** | All code examples and transcripts follow documented GHC behaviour but none were executed. |

## Outstanding work

- Run every code example against the pinned course GHC and replace transcripts with captured output.
- Decide whether Lab 1 Task 5 (the Hello World comparison) should also appear as an exercise in `notes/first-program`.
- Consider a capstone integrating modules, custom types, and IO once units 00–10 are verified.
- Retire `content/archive/sem3/csi243-redemption-drafts`, whose only page links to routes that no longer exist.

## Completion gates

- Every code example is compiled with the selected course GHC version.
- Every displayed output is captured from a real run.
- Each lesson answers what, why, when, when not, and how.
- Each lesson includes a comparison, a worked trace, common errors, guided practice, independent practice, and a mastery check.
- Current and archived resources are visibly separated on the site and in the Semester 3 vault.
- The portable vault note is published only after the site lesson passes academic and technical review.
