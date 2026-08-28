export const quizData = [
  {
    question: "Which module declaration is valid?",
    options: [
      "module myCalculator where",
      "module MyCalculator where",
      "Module MyCalculator where",
      "module MyCalculator:",
    ],
    correctIndex: 1,
    explanation: "Module names are alphanumeric and must begin with an uppercase letter. The keyword module is lowercase, and the declaration ends with where.",
  },
  {
    question: "`Wrong.hs` contains `module MyCalculator where`. What happens?",
    options: [
      "It compiles; the names are unrelated",
      "GHC rejects it, because the file name must match the module name",
      "GHC renames the file automatically",
      "It compiles but cannot be imported",
    ],
    correctIndex: 1,
    explanation: "This course follows the one-module-per-file convention, where the file name must match the module name exactly including capitalisation. A mismatch is rejected.",
  },
  {
    question: "Where must import statements appear?",
    options: [
      "Anywhere in the file",
      "After the type declarations but before the functions",
      "Before any function definition, at the top of the file",
      "At the end of the file",
    ],
    correctIndex: 2,
    explanation: "Importing must be done before defining any functions, so imports are placed at the top, with each import statement on its own line.",
  },
  {
    question: "Which import brings in everything from Data.List except `nub`?",
    options: [
      "import Data.List (nub)",
      "import Data.List hiding (nub)",
      "import qualified Data.List (nub)",
      "import Data.List except nub",
    ],
    correctIndex: 1,
    explanation: "hiding excludes the listed names and brings in everything else. Note that algebraic datatypes and type synonyms cannot be hidden — they are always imported.",
  },
  {
    question: "What does a qualified import achieve?",
    options: [
      "It imports only the exported names",
      "It requires every imported name to carry the module name as a prefix",
      "It imports the module lazily",
      "It hides the module's types",
    ],
    correctIndex: 1,
    explanation: "With a qualified import all imported values include the module name as a prefix, which removes ambiguity when two modules export the same name.",
  },
  {
    question: "Why does Prelude need no import statement?",
    options: [
      "It is built into the compiler rather than being a module",
      "It is imported automatically into every Haskell module",
      "It is imported only when a program has a main function",
      "It must be imported; the examples simply omit it",
    ],
    correctIndex: 1,
    explanation: "Prelude contains the standard definitions and is included automatically in every module, which is why arithmetic, comparison, and basic list operations work without any import.",
  },
  {
    question: "Given `type Metres = Double` and `type Feet = Double`, what does `Metres 100 + Feet 30` style code do?",
    options: [
      "Fails, because the types differ",
      "Compiles, because both expand to Double",
      "Fails, because synonyms cannot be added",
      "Compiles but produces a run-time error",
    ],
    correctIndex: 1,
    explanation: "A synonym introduces a name, not a distinct type. The compiler expands both to Double before checking, so the addition is accepted. Synonyms document intent without enforcing it.",
  },
  {
    question: "Why is `type Chain = [Chain]` rejected?",
    options: [
      "Lists cannot contain their own type",
      "Type synonyms cannot be recursive; the expansion never terminates",
      "The name Chain is reserved",
      "It needs a deriving clause",
    ],
    correctIndex: 1,
    explanation: "Expanding Chain gives [Chain], then [[Chain]], without ever reaching a concrete type. Recursive structures require a data declaration, whose constructors stop the expansion.",
  },
  {
    question: "In `data Shape = Circle Float | Rectangle Float Float`, what is `Circle`?",
    options: [
      "A type",
      "A type synonym",
      "A data constructor, and a function of type Float -> Shape",
      "A field name",
    ],
    correctIndex: 2,
    explanation: "Constructors are the capitalised values of the type. A constructor taking arguments is a function that builds a value, so Circle :: Float -> Shape.",
  },
  {
    question: "Why does `print (classify 64)` fail for a newly declared type?",
    options: [
      "print only works on numbers",
      "There is no Show instance for the type",
      "The type needs an export list",
      "classify must return IO",
    ],
    correctIndex: 1,
    explanation: "GHC cannot know how to display a type you have just invented. Adding deriving (Show) to the data declaration asks it to generate the obvious instance.",
  },
  {
    question: "Which pattern correctly matches a circle and binds its radius?",
    options: [
      "area Circle r = pi * r * r",
      "area (Circle r) = pi * r * r",
      "area [Circle r] = pi * r * r",
      "area {Circle r} = pi * r * r",
    ],
    correctIndex: 1,
    explanation: "Constructor patterns must be parenthesised, because function application binds more tightly than anything else. Without them the equation is read as area applied to two separate arguments.",
  },
  {
    question: "A `Square` constructor is added to an existing `Shape` type. What must happen?",
    options: [
      "Nothing; existing functions still work",
      "Every function pattern matching on Shape needs a new case, or it becomes non-exhaustive",
      "The type must be renamed",
      "All deriving clauses must be removed",
    ],
    correctIndex: 1,
    explanation: "A function missing the new constructor fails at run time with a non-exhaustive patterns error. Enabling -Wincomplete-patterns makes GHC list exactly which functions still need updating.",
  },
];
