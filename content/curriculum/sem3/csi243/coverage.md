# CSI243 Redemption source-coverage matrix

This matrix controls the redevelopment of CSI243. A topic is not complete until its source material, explanation, runnable examples, practice, lab, and review checks are all covered.

| Unit | Required coverage | Primary supplied sources | Required practical evidence | Status |
|---|---|---|---|---|
| 00 Start Here | GHCup install, GHC, GHCi, Prelude prompt, `:help`, `:load`, `:reload`, `:type`, `:info`, `:set prompt`, `:quit`, expressions, `let`, `it`, `:{ :}`, first saved script, `runhaskell`, `ghc -o`, comments, module/filename rule | Lecture 2 Using Haskell; Lab 1; csi243_ho4 | Environment check, first saved program, and a compiled executable | Current - delivered as Chapter 2 lessons 1-2 (`notes/ghci`, `notes/first-program`); output re-verification pending |
| 01 Functional Thinking | Functions, expressions, purity, side effects, composition, FP vs imperative | csi243_ho4 | Compare two solutions and identify side effects | Current |
| 02 Expressions and Types | Syntax/type analysis, `Int`, `Integer`, `Float`, `Double`, `Bool`, `Char`, `String`, lists, tuples, inference | Definitions and Data Types; csi243_ho4 | Predict and verify expression types and results | Current |
| 03 Defining Functions | Signature, specification, implementation, comments, identifiers, precedence, testing | csi243_ho4; csi243_ho6; Lab 1 | A documented `.hs` file with verified calls | Current - GHC verified |
| 04 Making Choices | `if`, guards, pattern matching, `case`, ordering, exhaustiveness | csi243_ho6; Making Choices; csi243_ho7 | One problem implemented four ways | Planned |
| 05 Recursion | Base case, recursive step, termination, factorial, Fibonacci, invalid inputs, dry runs | Making Choices; csi243_ho7; Lab 3 | Recursive trace and lab functions | Planned |
| 06 Lists and Tuples | Homogeneous lists, heterogeneous tuples, cons, concatenation, indexing, nested structures | Modules, Lists, Tuples; Definitions and Data Types | Collection-operation lab | Planned |
| 07 Recursive Lists | Structural recursion, head/tail patterns, positional lookup, list construction | Making Choices; Lab 3 | Complete Lab 3 with tests | Planned |
| 08 Modules and Programs | Module naming, exports, imports, qualified imports, Prelude, `main` | csi243_ho4; Modules, Lists, Tuples | Two-module program | Planned |
| 09 List Comprehensions | Output expression, generators, predicates, multiple generators | Modules, Lists, Tuples | Translate comprehensions and ordinary functions | Planned |
| 10 Lambdas, Currying and Sections | Lambda expressions, curried definitions, returned functions, operator sections | csi243_ho7 | Rewrite named functions as lambdas/sections | Planned |
| 11 Higher-Order Functions | `map`, `filter`, folds, `takeWhile`, `dropWhile`, `zipWith`, `iterate`, scans | Higher order functions; csi243_ho7 | Trace and compare higher-order pipelines | Planned |
| 12 Polymorphism and Typeclasses | Polymorphic signatures, constraints, common typeclasses | Existing Lab 6 and legacy notes | Generic functions and signature reading | Planned |
| 13 Data Types and Abstraction | Type synonyms, `data`, constructors, pattern matching, modules | csi243_ho7; legacy labs | Model and process a custom data type | Planned |
| 14 Reasoning and Complexity | Equational traces, correctness, recursive cost, list-operation cost | Course outline and legacy notes | Reasoning worksheet and complexity comparison | Planned |
| 15 Capstone and Revision | Integrated program, troubleshooting, practical and theory revision | All current sources | Capstone, mock lab, mock exam | Planned |

## Site chapter mapping

The units above are taught on the site inside chapter folders, which do not map one-to-one:

| Unit | Site location |
|---|---|
| 00 Start Here | `02-expressions-types/notes/ghci`, `02-expressions-types/notes/first-program` |
| 01 Functional Thinking | `01-functional-thinking/notes/programming-model`, `notes/functional-thinking` |
| 02 Expressions and Types | `02-expressions-types/notes/values-text`, `notes/expressions-types` |
| 03 Defining Functions | `03-defining-functions/notes/*`, `03-defining-functions/lab-01` |

## Verification status

| Unit | GHC-verified output? | Notes |
|---|---|---|
| 00 Start Here | **No — pending** | Rewritten from Lecture 2 and Lab 1. Prompt transcripts follow documented GHC behaviour but were not captured from a run on the course GHC version. |
| 01 Functional Thinking | Not applicable | No terminal transcripts. |
| 02 Expressions and Types | Pending re-check | Inherited from the earlier build; version not recorded. |
| 03 Defining Functions | Pending re-check | Inherited from the earlier build; version not recorded. |

**Course GHC version: not yet pinned.** Pin it before clearing any row above.

## Completion gates

- Every code example is compiled with the selected course GHC version.
- Every displayed output is captured from a real run.
- Each lesson answers what, why, when, when not, and how.
- Each lesson includes a comparison, a worked trace, common errors, guided practice, independent practice, and a mastery check.
- Current and archived resources are visibly separated on the site and in the Semester 3 vault.
- The portable vault note is published only after the site lesson passes academic and technical review.
