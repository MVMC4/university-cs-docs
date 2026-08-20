'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { TopicLink } from "../lib/types";

/* Client island: only the slim topic links cross into the client bundle. */
export default function Sidebar({ topics }: { topics: TopicLink[] }) {
  const path = usePathname();
  const activeTopic = path.split("/")[2] || "";
  const toolActive = path === "/formula-sheet" || path === "/resources" || path === "/planner";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(toolActive);
  const [openChapter, setOpenChapter] = useState(activeTopic);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  useEffect(function () {
    setMobileOpen(false);
    if (activeTopic) setOpenChapter(activeTopic);
    if (toolActive) setToolsOpen(true);
  }, [path]);

  useEffect(function () {
    document.body.classList.toggle("mobile-nav-active", mobileOpen);
    return function () { document.body.classList.remove("mobile-nav-active"); };
  }, [mobileOpen]);

  function toggleChapter(slug: string) {
    setOpenChapter(function (current) { return current === slug ? "" : slug; });
  }

  return (
    <aside className="sidebar">
      <div className="sbrand"><span className="bars"><i></i><i></i><i></i><i></i></span> MAT 221 <em>Flow Docs</em><button className="mobile-nav-toggle" type="button" aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={function () { setMobileOpen(!mobileOpen); }}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}<span className="sr-only">Toggle navigation</span></button></div>
      <nav id="main-navigation" className={mobileOpen ? "nav-open" : ""} aria-label="Main navigation">
        <Link aria-current={path === "/" ? "page" : undefined} className={"slink" + (path === "/" ? " on" : "")} href="/">Overview &amp; method</Link>

        <div className="nav-section">
          <button className="section-toggle" type="button" aria-expanded={toolsOpen} aria-controls="tool-links" onClick={function () { setToolsOpen(!toolsOpen); }}>
            <span className="sgroup">Tools</span><ChevronDown size={16} aria-hidden="true" className={toolsOpen ? "turned" : ""} />
          </button>
          <div id="tool-links" className="section-links" hidden={!toolsOpen}>
            <Link aria-current={path === "/formula-sheet" ? "page" : undefined} className={"slink" + (path === "/formula-sheet" ? " on" : "")} href="/formula-sheet">Formula sheet</Link>
            <Link aria-current={path === "/resources" ? "page" : undefined} className={"slink" + (path === "/resources" ? " on" : "")} href="/resources">Resources hub</Link>
            <Link aria-current={path === "/planner" ? "page" : undefined} className={"slink" + (path === "/planner" ? " on" : "")} href="/planner">Planner, goals &amp; timers</Link>
          </div>
        </div>

        <p className="sgroup">Chapters</p>
        {topics.map(function (t) {
          var notesOn = path === "/topics/" + t.slug;
          var reviewOn = path === "/topics/" + t.slug + "/review";
          var chapterOpen = openChapter === t.slug;
          var chapterId = "chapter-links-" + t.slug;
          return (
            <div className="chap" key={t.slug}>
              <button className={"chapter-toggle" + (chapterOpen ? " open" : "")} type="button" aria-expanded={chapterOpen} aria-controls={chapterId} onClick={function () { toggleChapter(t.slug); }}>
                <span className="chapter-name"><span className="snum">{t.num}</span>{t.title}</span><ChevronDown size={16} aria-hidden="true" className={chapterOpen ? "turned" : ""} />
              </button>
              <div id={chapterId} className="sublinks" hidden={!chapterOpen}>
                <Link aria-current={notesOn ? "page" : undefined} className={notesOn ? "on" : ""} href={"/topics/" + t.slug}>Notes</Link>
                <Link aria-current={path === "/topics/" + t.slug + "/questions" ? "page" : undefined} className={path === "/topics/" + t.slug + "/questions" ? "on" : ""} href={"/topics/" + t.slug + "/questions"}>Questions</Link>
                <Link aria-current={path === "/topics/" + t.slug + "/quiz" ? "page" : undefined} className={path === "/topics/" + t.slug + "/quiz" ? "on" : ""} href={"/topics/" + t.slug + "/quiz"}>Quiz</Link>
                <Link aria-current={reviewOn ? "page" : undefined} className={reviewOn ? "on" : ""} href={"/topics/" + t.slug + "/review"}>Review</Link>
                <Link aria-current={path === "/topics/" + t.slug + "/exam-practice" ? "page" : undefined} className={path === "/topics/" + t.slug + "/exam-practice" ? "on" : ""} href={"/topics/" + t.slug + "/exam-practice"}>Exam</Link>
              </div>
            </div>
          );
        })}

        <div className="nav-section assessment-section">
          <button className="section-toggle" type="button" aria-expanded={assessmentOpen} aria-controls="assessment-links" onClick={function () { setAssessmentOpen(!assessmentOpen); }}>
            <span className="sgroup">Assessment</span><ChevronDown size={16} aria-hidden="true" className={assessmentOpen ? "turned" : ""} />
          </button>
          <div id="assessment-links" className="section-links" hidden={!assessmentOpen}>
            <div className="sfoot">Test 1 - 06 Sep<br />Test 2 - 04 Oct<br />Test 3 - 25 Oct<br />Special - 04 Nov<br />Final = (CA + EXAM) / 2</div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
