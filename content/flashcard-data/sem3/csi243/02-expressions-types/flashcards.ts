export const flashcardData = [
  {
    front: "Expression, evaluation, and value",
    back: "An expression is Haskell code that denotes a result. Evaluation is the process of reducing that expression. The value is the resulting data, such as evaluating 2 + 3 to the value 5.",
  },
  {
    front: "What is GHCi's role when you enter an expression?",
    back: "GHCi reads the expression, checks that it is valid and well typed, evaluates it, and displays a representation of the resulting value. The ghci> text is the prompt, not part of the expression.",
  },
  {
    front: "Literal",
    back: "A literal writes a value directly in source code. Examples include 42, True, 'A', and \"CSI243\". Quotes are part of the syntax used to write character and string literals.",
  },
  {
    front: "Identifier",
    back: "A name that refers to a definition, parameter, or other program entity, such as score or square. Unquoted Hello is treated as a name, whereas \"Hello\" is a String literal.",
  },
  {
    front: "Char versus String",
    back: "Char represents one character and uses single quotes, such as 'A'. String represents a sequence of characters and uses double quotes, such as \"A\". They are different types even when the string has length one.",
  },
  {
    front: "Bool",
    back: "The type whose two values are True and False. Comparisons such as 7 < 10 produce Bool values; the words True and False begin with capital letters and do not use quotes.",
  },
  {
    front: "Int versus Integer",
    back: "Both represent whole numbers. Int has a fixed machine-dependent range, while Integer can grow to much larger values as memory permits. A type signature should state which one a definition intends to use.",
  },
  {
    front: "Float and Double",
    back: "Both are approximate floating-point number types. Double normally provides more precision than Float. Neither represents every decimal fraction exactly.",
  },
  {
    front: "Function application with spaces",
    back: "Writing square 3 applies square to 3. Application binds tightly, so square 3 + 4 means (square 3) + 4. Write square (3 + 4) when the sum must be the argument.",
  },
  {
    front: "Why does print Hello World not mean print the sentence?",
    back: "Without double quotes, Hello and World are parsed as identifiers. Spaces mean function application, so the expression groups as (print Hello) World rather than as one String argument.",
  },
];
