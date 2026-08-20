import { FORMULAS } from "../../lib/formula-sheet";
import { DM } from "../../lib/mathx";
import PrintButton from "../../components/PrintButton";

export const metadata = {
  title: "Calculus I Formula Sheet",
  description: "A printable MAT 221 Calculus I formula sheet covering integration, applications, limits, series and Taylor polynomials.",
  alternates: { canonical: "/formula-sheet" }
};

/* Server component: formulas render to static HTML; only the print button hydrates. */
export default function FormulaSheet() {
  return (
    <>
      <p className="eyebrow">Tool · printable</p>
      <h1>Formula <span className="it">sheet</span></h1>
      <p className="lead">Everything the course expects you to command, on one page. Print it, rewrite it from memory daily, and check against this.</p>
      <PrintButton />
      {FORMULAS.map(function (g, gi) {
        return (
          <section key={g.group}>
            <h2>{gi + 1}. {g.group}</h2>
            <div className="fs-grid">
              {g.items.map(function (it, i) {
                return (
                  <div className="fs-item" key={i}>
                    <div className="fname">{it.name}</div>
                    <div className="displaymath">{DM(it.tex)}</div>
                    {it.note ? <div className="fnote">{it.note}</div> : null}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
