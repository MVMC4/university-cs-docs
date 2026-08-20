import type { ResourceGroup } from "./types";

export const RESOURCES: ResourceGroup[] = [
  { group: "Core texts & course material", blurb: "Use one rigorous text as the spine, then use the other references to fill gaps and find extra problems.", cards: [
    { icon: "book", title: "Stewart — Calculus", tag: "Textbook", desc: "The course backbone. Chapters 4–8 and 11 map onto these notes.", href: "https://www.stewartcalculus.com/" },
    { icon: "library", title: "OpenStax Calculus Vol 1 & 2", tag: "Free PDF", desc: "A legal, free and rigorous alternative with worked examples and answers to odd exercises.", href: "https://openstax.org/subjects/math" },
    { icon: "landmark", title: "UB Library past papers", tag: "Past papers", desc: "Do every MAT 221 paper you can find timed, then autopsy every mark lost." },
    { icon: "book-open", title: "Thomas' Calculus", tag: "Reference", desc: "Use the explanations and harder exercises when you want to over-prepare a weak topic." }
  ] },
  { group: "Visual intuition", blurb: "Watch once for the picture, then return to the notes and reproduce the technique yourself.", cards: [
    { icon: "youtube", title: "3Blue1Brown — Essence of calculus", tag: "Intuition", desc: "Visual explanations of accumulation, the FTC and Taylor series.", href: "https://www.3blue1brown.com/topics/calculus", thumbnail: "https://i.ytimg.com/vi/WUvTyaaNkzM/hqdefault.jpg" },
    { icon: "video", title: "MIT OCW 18.01", tag: "Full course", desc: "Complete single-variable lectures with problem sets and solutions.", href: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" },
    { icon: "calculator", title: "Khan Academy — AP Calculus", tag: "Practice", desc: "Drill antiderivatives, area and volume with immediate feedback.", href: "https://www.khanacademy.org/math/ap-calculus-ab" },
    { icon: "teacher", title: "The Organic Chemistry Tutor", tag: "Technique", desc: "Long, slow worked examples of integration techniques and exam-style algebra.", href: "https://www.youtube.com/@TheOrganicChemistryTutor" }
  ] },
  { group: "Problem banks", blurb: "Understanding is proven by problems. Interleave topics as an assessment approaches.", cards: [
    { icon: "folder", title: "UB MAT 221 Studocu collection", tag: "Past papers", desc: "Community-uploaded University of Botswana MAT 221 tests and exam documents. Work them timed and verify the year and syllabus before relying on them.", href: "https://www.studocu.com/row/u/142572035?page=2" },
    { icon: "folder", title: "Paul's Online Math Notes", tag: "Problems", desc: "Free problem banks for integration, improper integrals and series tests with full solutions.", href: "https://tutorial.math.lamar.edu/" },
    { icon: "pencil", title: "Stewart end-of-chapter", tag: "Drill", desc: "Do odd problems first, then target the variants that still slow you down." },
    { icon: "timer", title: "Timed mocks", tag: "Exam prep", desc: "From Week 13: two-hour closed-book mocks built from past papers and graded with the trap list open." }
  ] },
  { group: "Computational tools", blurb: "Attempt first, verify second. The explanation of a mismatch is the learning opportunity.", cards: [
    { icon: "bot", title: "WolframAlpha", tag: "Checker", desc: "Verify antiderivatives and series, then compare the exact step where yours differs.", href: "https://www.wolframalpha.com/" },
    { icon: "chart", title: "Desmos", tag: "Graphing", desc: "Shade areas, compare growth rates and make the geometry of an integral visible.", href: "https://www.desmos.com/calculator" },
    { icon: "compass", title: "GeoGebra", tag: "3D / solids", desc: "Revolve regions and see disks, washers and shells as actual solids.", href: "https://www.geogebra.org/" },
    { icon: "layers", title: "Anki", tag: "Spaced repetition", desc: "Port a deck here for daily spaced-repetition sessions on the go." }
  ] },
  { group: "Study science", blurb: "The method behind the layout of this pack.", cards: [
    { icon: "notebook", title: "Active recall", tag: "Method", desc: "Close the notes, reproduce the chapter summary, check the gaps, then repeat.", href: "https://lsc.cornell.edu/how-to-study/studying-for-and-taking-exams/" },
    { icon: "repeat", title: "Active recall + spacing", tag: "Evidence", desc: "Testing yourself beats rereading; space sessions across several days.", href: "https://www.learningscientists.org/" },
    { icon: "focus", title: "Pomodoro", tag: "Focus", desc: "Use 25-minute focus blocks with the built-in timer, then take a longer break after four." }
  ] },
  { group: "Inside this pack", blurb: "These tools are part of the study loop, not decoration.", cards: [
    { icon: "file", title: "Formula sheet", tag: "Tool", href: "/formula-sheet", desc: "One printable reference. Rewrite it from memory and use it to diagnose gaps." },
    { icon: "cards", title: "Review deck", tag: "Tool", desc: "Every chapter's Review route: flashcards, a quiz and exam traps in one retrieval session." }
  ] }
];
