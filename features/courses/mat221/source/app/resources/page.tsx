import { RESOURCES } from "../../lib/resources";
import ResourceIcon from "../../components/ResourceIcon";
import { ExternalLink, Globe2 } from "lucide-react";

export const metadata = {
  title: "Calculus I Learning Resources",
  description: "Recommended textbooks, free courses, visual intuition tools and study methods for MAT 221 Calculus I.",
  alternates: { canonical: "/resources" }
};

export default function Resources() {
  return (
    <>
      <p className="eyebrow">Hub</p>
      <h1>Resources</h1>
      <p className="lead">Everything outside these pages: textbooks, free courses, visual intuition, computational tools, and the study science that makes the method work.</p>
      {RESOURCES.map(function (g) {
        return (
          <section key={g.group}>
            <h2>{g.group}</h2>
            <p className="hint">{g.blurb}</p>
            <div className="grid">
              {g.cards.map(function (c) {
                var ext = c.href && c.href.indexOf("http") === 0;
                return (
                  <a key={c.title} className="tcard" href={c.href || "#"} target={ext ? "_blank" : undefined} rel="noreferrer">
                    <div className="resource-media">
                      {c.thumbnail ? <img className="resource-thumb" src={c.thumbnail} alt="" loading="lazy" /> : <div className="ricon"><ResourceIcon name={c.icon} /></div>}
                      {ext ? <span className="resource-logo" aria-hidden="true"><img src={"https://www.google.com/s2/favicons?domain=" + new URL(c.href as string).hostname + "&sz=64"} alt="" loading="lazy" /><Globe2 size={15} /></span> : null}
                    </div>
                    <span className="n">{c.tag}{ext ? <><span className="resource-open"><ExternalLink size={12} /> opens in new tab</span></> : ""}</span>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
