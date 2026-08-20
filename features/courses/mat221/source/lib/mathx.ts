export function DM(s: string): string {
  if (!s) return s;
  var repaired = repairMathDelimiters(s);
  if (repaired.indexOf("\\(") !== -1 || repaired.indexOf("\\[") !== -1 || repaired.indexOf("$$") !== -1) return repaired;
  return "\\[" + repaired + "\\]";
}

/* Inline companion for fields such as example headings and table cells. The
   data model intentionally stores prose as strings, so pure TeX strings need
   delimiters added before they reach MathJax. */
export function IM(s: string, force = false): string {
  if (!s) return s;
  var repaired = repairMathDelimiters(s);
  if (repaired.indexOf("\\(") !== -1 || repaired.indexOf("\\[") !== -1 || repaired.indexOf("$$") !== -1) return repaired;
  var looksLikeTeX = /\\[A-Za-z]+|[_^]/.test(repaired);
  return force || looksLikeTeX ? "\\(" + repaired + "\\)" : repaired;
}

/* Content is authored in several forms: bare TeX for display blocks and
   mixed prose with inline delimiters. A single missing delimiter otherwise
   makes MathJax treat the rest of the page as math (or ignore it entirely).
   Repair only the safe, unambiguous case here so one bad formula cannot break
   every following formula. */
export function repairMathDelimiters(s: string): string {
  var out = s.replace(/\\\(/g, "\\(").replace(/\\\)/g, "\\)");
  var inlineOpen = (out.match(/\\\(/g) || []).length;
  var inlineClose = (out.match(/\\\)/g) || []).length;
  if (inlineOpen > inlineClose) out += "\\)".repeat(inlineOpen - inlineClose);
  if (inlineClose > inlineOpen) out = "\\(".repeat(inlineClose - inlineOpen) + out;

  var displayOpen = (out.match(/\\\[/g) || []).length;
  var displayClose = (out.match(/\\\]/g) || []).length;
  if (displayOpen > displayClose) out += "\\]".repeat(displayOpen - displayClose);
  if (displayClose > displayOpen) out = "\\[".repeat(displayClose - displayOpen) + out;
  return out;
}
