export const flashcardData = [
  {
    front: "Three advantages of splitting code into modules",
    back: "A generic module's exports can be reused across many tasks; loosely coupled modules can be reused separately later; and dividing code into parts with specific purposes makes it more manageable.",
  },
  {
    front: "Module naming rules and the file convention",
    back: "Names are alphanumeric and must begin with an uppercase letter. One module per file, and the file name must match the module name exactly, including capitalisation.",
  },
  {
    front: "How do you define a module?",
    back: "module ModuleName where, followed by the definitions. The where clause marks the start of the module's contents.",
  },
  {
    front: "What does it mean for a module to be closed?",
    back: "Every name mentioned in the source must be defined locally or imported. Entities needed only for type checking are supplied silently and need not be imported by name.",
  },
  {
    front: "What does an export list do?",
    back: "module M (f, g) where restricts what importers can see. Unexported definitions stay private, so they can be rewritten without breaking callers.",
  },
  {
    front: "The five import forms",
    back: "import M (everything); import M (f, g) (selective); import M hiding (f); import qualified M (prefixed); import qualified M as X (prefixed with an alias).",
  },
  {
    front: "Where must import statements appear?",
    back: "Before any function definition, so at the top of the file, with each import on its own line.",
  },
  {
    front: "Two ways to resolve a name clash between modules",
    back: "Use hiding (name) on one import, or import qualified so every use carries the module name as a prefix. Note that types and synonyms cannot be hidden.",
  },
  {
    front: "Name the main standard library modules",
    back: "Prelude (standard definitions, imported automatically), Data.List, Data.Char, Data.Map (key-value pairs), and Data.Set (unique elements, implemented as a binary tree).",
  },
  {
    front: "What is a type synonym?",
    back: "Another name for an existing type, declared with the type keyword. type String = [Char] is the actual Prelude definition. The name must be capitalised.",
  },
  {
    front: "Why does `Metres + Feet` compile when both are synonyms for Double?",
    back: "A synonym introduces a name, not a new type. The compiler expands both to Double before checking, so the addition is valid. Synonyms document intent but give no type safety.",
  },
  {
    front: "Why can't a type synonym be recursive?",
    back: "type Chain = [Chain] expands to [[Chain]], then [[[Chain]]], never reaching a concrete type. Recursive structures need data, whose constructors stop the expansion.",
  },
  {
    front: "What does a `data` declaration create?",
    back: "A genuinely new type, distinct from every other, with one or more capitalised data constructors. Read | as 'or'.",
  },
  {
    front: "What is a data constructor that takes arguments?",
    back: "A function building a value of the type. Circle :: Float -> Shape. Pattern matching such as area (Circle r) extracts the carried value; the parentheses are required.",
  },
  {
    front: "What does `deriving (Show, Eq, Ord)` provide?",
    back: "Show gives conversion to String so values can be printed; Eq gives == and /=; Ord gives comparisons, ordering constructors by their declaration sequence.",
  },
  {
    front: "How do you write a function over a recursive type?",
    back: "One equation per constructor. For data Tree a = Leaf a | Branch (Tree a) (Tree a), the Leaf case is the base case and the Branch case is the recursive step.",
  },
  {
    front: "`type` or `data`?",
    back: "Use type for readability of an existing type; it is interchangeable and cannot recurse. Use data when you need a genuinely new type, enforced separation, or recursion.",
  },
];
