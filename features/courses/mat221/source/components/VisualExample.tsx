import { DM } from "../lib/mathx";
type Props = { img: string; title: string; caption?: string; tex?: string; items?: string[] };
export default function VisualExample(p: Props) {
  return (
    <figure className="visual">
      <img src={p.img} alt={p.title} loading="lazy" />
      <figcaption><strong>{p.title}</strong>{p.caption ? <span> — {p.caption}</span> : null}</figcaption>
      {p.tex ? <div className="displaymath">{DM(p.tex)}</div> : null}
      {p.items ? <ol className="steps">{p.items.map(function (s, j) { return <li key={j}>{s}</li>; })}</ol> : null}
    </figure>
  );
}
