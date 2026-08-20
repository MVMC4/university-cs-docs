'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { TimerTrigger } from '@/features/study-timer';
import { mat221Topics } from '../manifest';
import { mat221DocsBase, sourceTopicHref } from './routes';

export function Mat221SourceSidebar() {
  const path = usePathname();
  const activeTopic = mat221Topics.find((topic) => path.includes(`/${topic.slug}/`))?.sourceSlug ?? '';
  const toolActive = path === `${mat221DocsBase}/formula-sheet` || path === `${mat221DocsBase}/resources` || path === `${mat221DocsBase}/planner`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(toolActive);
  const [openChapter, setOpenChapter] = useState(activeTopic);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    if (activeTopic) setOpenChapter(activeTopic);
    if (toolActive) setToolsOpen(true);
  }, [path, activeTopic, toolActive]);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen);
    return () => document.body.classList.remove('mobile-nav-active');
  }, [mobileOpen]);

  return (
    <aside className="sidebar">
      <div className="sbrand"><span className="bars"><i /><i /><i /><i /></span> MAT 221 <em>Flow Docs</em><button className="mobile-nav-toggle" type="button" aria-expanded={mobileOpen} aria-controls="mat221-source-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}<span className="sr-only">Toggle navigation</span></button></div>
      <nav id="mat221-source-navigation" className={mobileOpen ? 'nav-open' : ''} aria-label="MAT221 course navigation">
        <Link aria-current={path === mat221DocsBase ? 'page' : undefined} className={`slink${path === mat221DocsBase ? ' on' : ''}`} href={mat221DocsBase}>Overview &amp; method</Link>

        <div className="nav-section">
          <button className="section-toggle" type="button" aria-expanded={toolsOpen} aria-controls="mat221-tool-links" onClick={() => setToolsOpen(!toolsOpen)}><span className="sgroup">Tools</span><ChevronDown size={16} aria-hidden="true" className={toolsOpen ? 'turned' : ''} /></button>
          <div id="mat221-tool-links" className="section-links" hidden={!toolsOpen}>
            <Link className={`slink${path.endsWith('/formula-sheet') ? ' on' : ''}`} href={`${mat221DocsBase}/formula-sheet`}>Formula sheet</Link>
            <Link className={`slink${path.endsWith('/resources') ? ' on' : ''}`} href={`${mat221DocsBase}/resources`}>Resources hub</Link>
            <Link className={`slink${path.endsWith('/planner') ? ' on' : ''}`} href={`${mat221DocsBase}/planner`}>Planner &amp; timers</Link>
          </div>
        </div>

        <p className="sgroup">Chapters</p>
        {mat221Topics.map((topic) => {
          const chapterOpen = openChapter === topic.sourceSlug;
          const chapterId = `mat221-chapter-links-${topic.sourceSlug}`;
          return (
            <div className="chap" key={topic.sourceSlug}>
              <button className={`chapter-toggle${chapterOpen ? ' open' : ''}`} type="button" aria-expanded={chapterOpen} aria-controls={chapterId} onClick={() => setOpenChapter(chapterOpen ? '' : topic.sourceSlug)}><span className="chapter-name"><span className="snum">{String(topic.order).padStart(2, '0')}</span>{topic.title}</span><ChevronDown size={16} aria-hidden="true" className={chapterOpen ? 'turned' : ''} /></button>
              <div id={chapterId} className="sublinks" hidden={!chapterOpen}>
                {(['notes', 'questions', 'quiz', 'review', 'exam-practice'] as const).map((page) => {
                  const href = sourceTopicHref(topic.sourceSlug, page);
                  const label = page === 'exam-practice' ? 'Exam' : page[0].toUpperCase() + page.slice(1);
                  return <Link key={page} aria-current={path === href ? 'page' : undefined} className={path === href ? 'on' : ''} href={href}>{label}</Link>;
                })}
              </div>
            </div>
          );
        })}

        <div className="nav-section assessment-section">
          <button className="section-toggle" type="button" aria-expanded={assessmentOpen} aria-controls="mat221-assessment-links" onClick={() => setAssessmentOpen(!assessmentOpen)}><span className="sgroup">Assessment</span><ChevronDown size={16} aria-hidden="true" className={assessmentOpen ? 'turned' : ''} /></button>
          <div id="mat221-assessment-links" className="section-links" hidden={!assessmentOpen}><div className="sfoot">Test 1 - 06 Sep<br />Test 2 - 04 Oct<br />Test 3 - 25 Oct<br />Special - 04 Nov<br />Final = (CA + EXAM) / 2</div></div>
        </div>
      </nav>
      <div className="source-host-controls" aria-label="University study controls"><TimerTrigger /><ThemeSwitch mode="light-dark" /></div>
    </aside>
  );
}
