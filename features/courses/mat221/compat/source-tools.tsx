import { ExternalLink, Globe2 } from 'lucide-react';
import PrintButton from '../source/components/PrintButton';
import ResourceIcon from '../source/components/ResourceIcon';
import { FORMULAS } from '../source/lib/formula-sheet';
import { DM } from '../source/lib/mathx';
import { RESOURCES } from '../source/lib/resources';

export function Mat221SourceFormulaSheet() {
  return <>
    <p className="eyebrow">Tool · printable</p>
    <h1>Formula <span className="it">sheet</span></h1>
    <p className="lead">Everything the course expects you to command, on one page. Print it, rewrite it from memory daily, and check against this.</p>
    <PrintButton />
    {FORMULAS.map(function (group, groupIndex) {
      return <section key={group.group}>
        <h2>{groupIndex + 1}. {group.group}</h2>
        <div className="fs-grid">{group.items.map(function (item, index) {
          return <div className="fs-item" key={index}><div className="fname">{item.name}</div><div className="displaymath">{DM(item.tex)}</div>{item.note ? <div className="fnote">{item.note}</div> : null}</div>;
        })}</div>
      </section>;
    })}
  </>;
}

export function Mat221SourceResources() {
  return <>
    <p className="eyebrow">Hub</p>
    <h1>Resources</h1>
    <p className="lead">Everything outside these pages: textbooks, free courses, visual intuition, computational tools, and the study science that makes the method work.</p>
    {RESOURCES.map(function (group) {
      return <section key={group.group}>
        <h2>{group.group}</h2><p className="hint">{group.blurb}</p>
        <div className="grid">{group.cards.map(function (card) {
          const href = card.href === '/formula-sheet' ? '/docs/sem3/mat221/formula-sheet' : card.href;
          const external = Boolean(href?.startsWith('http'));
          return <a key={card.title} className="tcard" href={href || '#'} target={external ? '_blank' : undefined} rel="noreferrer">
            <div className="resource-media">{card.thumbnail ? <img className="resource-thumb" src={card.thumbnail} alt="" loading="lazy" /> : <div className="ricon"><ResourceIcon name={card.icon} /></div>}{external ? <span className="resource-logo" aria-hidden="true"><img src={`https://www.google.com/s2/favicons?domain=${new URL(card.href as string).hostname}&sz=64`} alt="" loading="lazy" /><Globe2 size={15} /></span> : null}</div>
            <span className="n">{card.tag}{external ? <span className="resource-open"><ExternalLink size={12} /> opens in new tab</span> : ''}</span><h3>{card.title}</h3><p>{card.desc}</p>
          </a>;
        })}</div>
      </section>;
    })}
  </>;
}
