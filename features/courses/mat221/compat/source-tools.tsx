'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Globe2 } from 'lucide-react';
import { TimerPanel } from '@/features/study-timer';
import PrintButton from '../source/components/PrintButton';
import ResourceIcon from '../source/components/ResourceIcon';
import { FORMULAS } from '../source/lib/formula-sheet';
import { DM } from '../source/lib/mathx';
import { ASSESSMENTS, SEMESTER_START, TIMELINE } from '../source/lib/planner';
import { RESOURCES } from '../source/lib/resources';

function pad(value: number) { return value < 10 ? `0${value}` : String(value); }

function Countdown() {
  const [now, setNow] = useState(0);
  useEffect(function () {
    setNow(Date.now());
    const id = setInterval(function () { setNow(Date.now()); }, 1000);
    return function () { clearInterval(id); };
  }, []);
  if (!now) return <div className="card countdown"><p className="hint">Loading assessment clock...</p></div>;
  const upcoming = ASSESSMENTS.map(function (assessment) { return { assessment, time: new Date(assessment.date).getTime() }; }).filter(function (item) { return Number.isFinite(item.time) && item.time > now; }).sort(function (a, b) { return a.time - b.time; })[0];
  if (!upcoming) return <div className="card countdown"><h4>All scheduled assessments are complete</h4><p className="hint">Add the final exam date in the planner data when it is published.</p></div>;
  const difference = upcoming.time - now;
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor(difference / 3600000) % 24;
  const minutes = Math.floor(difference / 60000) % 60;
  const seconds = Math.floor(difference / 1000) % 60;
  return <div className="card countdown"><span className="chip bad">Next assessment</span><h4>{upcoming.assessment.name}</h4><p className="hint">{upcoming.assessment.time} · {upcoming.assessment.venue}</p><p className="cd-num" aria-live="polite">{days}d {pad(hours)}:{pad(minutes)}:{pad(seconds)}</p><p className="hint">{upcoming.assessment.weight}</p></div>;
}

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
          const href = card.href === '/formula-sheet' ? '/docs/sem3/mat221/formula-sheet' : card.href === '/planner' ? '/docs/sem3/mat221/planner' : card.href;
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

export function Mat221SourcePlanner() {
  const [now, setNow] = useState(0);
  useEffect(function () { setNow(Date.now()); }, []);
  const week = now ? Math.floor((now - new Date(SEMESTER_START).getTime()) / (7 * 86400000)) + 1 : -1;
  return <div>
    <p className="eyebrow">Tool · timeline, countdowns, timer</p>
    <h1>Study <span className="it">planner</span></h1>
    <p className="lead">The semester at a glance: what to cover each week, live countdowns to every test, and the university-wide pomodoro for focused sessions.</p>
    <div className="grid"><Countdown /><TimerPanel /></div>
    <h2>Week-by-week timeline</h2>
    <ol className="timeline">{TIMELINE.map(function (item, index) {
      const current = week > 0 && index + 1 === week;
      return <li key={item.week} className={`tl-item${current ? ' now' : ''}`}><div className="tl-dates">{item.week} · {item.dates}{current ? <span className="tl-mile">you are here</span> : null}</div><strong>{item.focus}</strong><div className="hint">Topics {item.topics}</div>{item.milestone ? <span className="tl-mile">{item.milestone}</span> : null}</li>;
    })}</ol>
  </div>;
}
