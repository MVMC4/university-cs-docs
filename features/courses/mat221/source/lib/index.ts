import { T_FOUNDATIONS } from "./topics-foundations";
import { T_TECHNIQUES } from "./topics-techniques";
import { T_APPLICATIONS } from "./topics-applications";
import { T_SERIES } from "./topics-series";
import { EXTRAS } from "./topics-extra";
import { T_CURRENT } from "./topics-current";
import type { Topic, Extra } from "./types";

function merge(base: Topic, ex?: Extra): Topic {
  if (!ex) return base;
  return {
    ...base,
    blocks: base.blocks.concat(ex.blocks || []),
    cornell: { cues: base.cornell.cues.concat(ex.cues || []), summary: base.cornell.summary },
    cards: base.cards.concat(ex.cards || []),
    quiz: base.quiz.concat(ex.quiz || []),
    traps: base.traps.concat(ex.traps || [])
  };
}

function enrichRecall(topic: Topic): Topic {
  const existing = new Set(topic.cards.map(function (card) { return card.front.replace(/\s+/g, " ").trim().toLowerCase(); }));
  const conceptCards = topic.cornell.cues
    .filter(function (item) {
      const cue = item.cue.replace(/\s+/g, " ").trim().toLowerCase();
      return !Array.from(existing).some(function (front) { return front.includes(cue) || cue.includes(front); });
    })
    .map(function (item) {
      return {
        front: "Explain or state: " + item.cue,
        back: item.note,
        note: "Give the condition or reason as well as the formula before marking this card correct."
      };
    });
  return { ...topic, cards: topic.cards.concat(conceptCards) };
}
const DEPENDENCY_ORDER = ["foundations", "substitution", "partials", "parts", "reduction-formulas", "trig", "trig-substitution", "weierstrass", "improper", "numerical", "applications", "lhopital", "sequences-series", "power-series", "taylor"];
const ALL_TOPICS = ([] as Topic[]).concat(T_FOUNDATIONS, T_TECHNIQUES, T_CURRENT, T_APPLICATIONS, T_SERIES);

export const TOPICS: Topic[] = DEPENDENCY_ORDER
  .map(function (slug) { return ALL_TOPICS.find(function (t) { return t.slug === slug; }); })
  .filter(function (t): t is Topic { return Boolean(t); })
  .map(function (t) { return enrichRecall(merge(t, EXTRAS[t.slug])); });
