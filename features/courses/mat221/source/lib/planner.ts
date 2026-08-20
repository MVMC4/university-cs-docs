import type { Assessment, WeekPlan } from "./types";
export const SEMESTER_START = "2026-07-27T00:00:00";
export const ASSESSMENTS: Assessment[] = [
  { name: "Test 1", date: "2026-09-06T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Test 2", date: "2026-10-04T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Test 3", date: "2026-10-25T13:00:00", time: "13:00-15:00", venue: "233/G12, 230/G5", weight: "CA" },
  { name: "Special Test (1,2,3)", date: "2026-11-04T18:00:00", time: "18:00-20:00", venue: "TBA", weight: "CA rescue" }
];
export const TIMELINE: WeekPlan[] = [
  { week: "Week 1", dates: "27-31 Jul", focus: "Introduction, basic integration review, substitution", topics: "01-02" },
  { week: "Week 2", dates: "03-07 Aug", focus: "Partial fractions and integration by parts", topics: "03-04" },
  { week: "Week 3", dates: "10-14 Aug", focus: "Reduction formulas, trig identities, trig substitution", topics: "05-07" },
  { week: "Week 4", dates: "18-22 Aug", focus: "Weierstrass substitution and improper integrals", topics: "08-09" },
  { week: "Week 5", dates: "24-28 Aug", focus: "Riemann sums, trapezoidal and Simpson rules", topics: "10" },
  { week: "Week 6", dates: "31 Aug-04 Sep", focus: "Volumes and arc length", topics: "11", milestone: "TEST 1 - Sun 06 Sep" },
  { week: "Week 7", dates: "07-11 Sep", focus: "Surface area, centre of mass and centroid", topics: "11" },
  { week: "Week 8", dates: "14-18 Sep", focus: "Semester break", topics: "review" },
  { week: "Week 9", dates: "21-25 Sep", focus: "L'Hopital, bounded monotone sequences, geometric series", topics: "12-13" },
  { week: "Week 10", dates: "28 Sep-02 Oct", focus: "Independence holiday and consolidation", topics: "review", milestone: "TEST 2 - Sun 04 Oct" },
  { week: "Week 11", dates: "05-09 Oct", focus: "Divergence, ratio and root tests", topics: "13" },
  { week: "Week 12", dates: "12-16 Oct", focus: "Alternating, absolute/conditional and integral tests", topics: "13" },
  { week: "Week 13", dates: "19-23 Oct", focus: "Comparison test; power-series definitions, radius and interval", topics: "13-14", milestone: "TEST 3 - Sun 25 Oct" },
  { week: "Week 14", dates: "26-30 Oct", focus: "Power-series calculus; Taylor and Maclaurin series", topics: "14-15" },
  { week: "Week 15", dates: "02-06 Nov", focus: "Applications and cumulative revision", topics: "all", milestone: "SPECIAL - Wed 04 Nov; classes end Fri 06 Nov" }
];
export const DEFAULT_GOALS: string[] = [
  "Run flashcards 01-07 until every card is 'Got it' twice",
  "Reproduce the chapter summaries for Topics 01-09 from memory",
  "Score 100% on quizzes 01-10 closed-book",
  "Memorize formula sheet sections 1-4 verbatim",
  "Do a timed 2-hour mock of Test 1 style questions",
  "Write out all 4 partial-fraction cases from memory"
];
