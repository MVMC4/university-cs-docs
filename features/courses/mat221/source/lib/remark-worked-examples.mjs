function plainText(node) {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  return Array.isArray(node.children) ? node.children.map(plainText).join("") : "";
}

function stripExamplePrefix(heading) {
  const prefix = /^(?:worked example|example|second worked example|fully worked example|worked approximation)(?:\s+\d+)?\s*:?\s*/i;
  for (const child of heading.children || []) {
    if (child.type !== "text") continue;
    child.value = child.value.replace(prefix, "");
    if (child.value.trim()) break;
  }
}

/* Turn every authored example section into the same MDX component used by
   data-driven examples. Authors can keep examples next to the idea they
   teach; the build supplies the shared frame and continuous numbering. */
export default function remarkWorkedExamples() {
  return function transform(tree) {
    const children = tree.children || [];
    let number = 0;

    for (let index = 0; index < children.length; index += 1) {
      const heading = children[index];
      if (heading.type !== "heading") continue;
      const label = plainText(heading).trim();
      if (!/^(?:worked example|example|second worked example|fully worked example|worked approximation)(?:\s+\d+)?(?:\s*:|\s|$)/i.test(label)) continue;
      if (/^worked examples\b/i.test(label)) continue;

      number += 1;
      const depth = heading.depth;
      let end = index + 1;
      while (end < children.length) {
        const candidate = children[end];
        if (candidate.type === "heading" && candidate.depth <= depth) break;
        end += 1;
      }

      stripExamplePrefix(heading);
      heading.depth = Math.min(6, depth + 1);
      const section = children.slice(index, end);
      children.splice(index, end - index, {
        type: "mdxJsxFlowElement",
        name: "WorkedExample",
        attributes: [
          { type: "mdxJsxAttribute", name: "number", value: String(number) },
          { type: "mdxJsxAttribute", name: "purpose", value: "Apply the method in a new form and justify every decision." }
        ],
        children: section
      });
    }
  };
}
