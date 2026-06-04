"use client";

import Link from 'next/link';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Binary, FunctionSquare, GitBranch, Calculator, Sigma } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;
  const isSmallLaptop = screenWidth >= 1024 && screenWidth < 1280;

  const parallaxIntensity = isMobile ? 0 : isTablet ? 8 : isSmallLaptop ? 12 : 15;
  const springConfig = { damping: isMobile ? 10 : 25, stiffness: isMobile ? 80 : 180 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const c1x = useTransform(mouseX, [-parallaxIntensity, parallaxIntensity], [parallaxIntensity, -parallaxIntensity]);
  const c1y = useTransform(mouseY, [-parallaxIntensity, parallaxIntensity], [parallaxIntensity, -parallaxIntensity]);
  const c2x = useTransform(mouseX, [-parallaxIntensity, parallaxIntensity], [-parallaxIntensity, parallaxIntensity]);
  const c2y = useTransform(mouseY, [-parallaxIntensity, parallaxIntensity], [-parallaxIntensity, parallaxIntensity]);
  const c3x = useTransform(mouseX, [-parallaxIntensity, parallaxIntensity], [-parallaxIntensity, parallaxIntensity]);
  const c3y = useTransform(mouseY, [-parallaxIntensity, parallaxIntensity], [parallaxIntensity, -parallaxIntensity]);
  const c4x = useTransform(mouseX, [-parallaxIntensity, parallaxIntensity], [parallaxIntensity, -parallaxIntensity]);
  const c4y = useTransform(mouseY, [-parallaxIntensity, parallaxIntensity], [-parallaxIntensity, parallaxIntensity]);

  useEffect(() => {
    setMounted(true);
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * parallaxIntensity;
      const y = (e.clientY / window.innerHeight - 0.5) * parallaxIntensity;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile, parallaxIntensity]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:32px_32px] opacity-20 sm:opacity-25 md:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-4 sm:py-6 md:py-12 z-20">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }} className="inline-flex items-center justify-center w-10 h-10 sm:w-12 md:w-14 lg:w-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 border border-white/10 mb-2 sm:mb-4 md:mb-6">
          <Binary className="w-4 h-4 sm:w-5 md:w-6 lg:w-7 text-white/90" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-1.5 sm:mb-2 text-center leading-tight px-2">
          University CS Docs
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-xs sm:text-sm md:text-base text-white/60 max-w-[260px] sm:max-w-sm md:max-w-md mx-auto mb-3 sm:mb-5 md:mb-8 font-light text-center px-2">
          Notes, code & quizzes for University of Botswana CS.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="w-full sm:w-auto px-2">
          <Link href="/docs" className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl font-medium hover:bg-white/90 transition-all text-xs sm:text-sm">
            Access Docs
            <ArrowRight className="w-3 h-3 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Desktop/Tablet: Floating Cards with Parallax */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <ModuleCard delay={0.5} style={{ x: c1x, y: c1y }} className={`absolute ${isTablet ? 'top-[8%] left-[3%] w-44' : isSmallLaptop ? 'top-[10%] left-[4%] w-52' : 'top-[10%] left-[5%] lg:left-[8%] xl:left-[12%] w-64 lg:w-72'}`} icon={<GitBranch className="w-3.5 h-3.5 sm:w-4" />} code="CSI247" title="Data Structures" preview={<Preview type="ds" compact={isTablet} />} />
          <ModuleCard delay={0.7} style={{ x: c2x, y: c2y }} className={`absolute ${isTablet ? 'bottom-[8%] left-[3%] w-44' : isSmallLaptop ? 'bottom-[10%] left-[4%] w-52' : 'bottom-[10%] left-[5%] lg:left-[8%] xl:left-[12%] w-64 lg:w-72'}`} icon={<FunctionSquare className="w-3.5 h-3.5 sm:w-4" />} code="CSI243" title="Functional" preview={<Preview type="fp" compact={isTablet} />} />
          <ModuleCard delay={0.6} style={{ x: c3x, y: c3y }} className={`absolute ${isTablet ? 'top-[8%] right-[3%] w-44' : isSmallLaptop ? 'top-[10%] right-[4%] w-52' : 'top-[10%] right-[5%] lg:right-[8%] xl:right-[12%] w-64 lg:w-72'}`} icon={<Sigma className="w-3.5 h-3.5 sm:w-4" />} code="CSI213" title="Discrete" preview={<Preview type="disc" compact={isTablet} />} />
          <ModuleCard delay={0.8} style={{ x: c4x, y: c4y }} className={`absolute ${isTablet ? 'bottom-[8%] right-[3%] w-44' : isSmallLaptop ? 'bottom-[10%] right-[4%] w-52' : 'bottom-[10%] right-[5%] lg:right-[8%] xl:right-[12%] w-64 lg:w-72'}`} icon={<Calculator className="w-3.5 h-3.5 sm:w-4" />} code="MAT221" title="Calculus" preview={<Preview type="calc" compact={isTablet} />} />
        </div>
      )}

      {/* Mobile: Layered 2x2 Grid (No Animation) */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between pt-[22vh] pb-[16vh] px-3">
          <div className="flex justify-center gap-3 w-full max-w-[300px] mx-auto">
            <div className="relative w-[48%]"><div className="absolute inset-0 bg-[#111]/80 border border-white/5 rounded-lg transform translate-x-1.5 translate-y-1.5" /><MobileCard icon={<GitBranch className="w-3 h-3" />} code="CSI247" title="Data Struct" preview={<Preview type="ds" mobile />} /></div>
            <div className="relative w-[48%]"><div className="absolute inset-0 bg-[#111]/80 border border-white/5 rounded-lg transform -translate-x-1.5 -translate-y-1.5" /><MobileCard icon={<FunctionSquare className="w-3 h-3" />} code="CSI243" title="Functional" preview={<Preview type="fp" mobile />} /></div>
          </div>
          <div className="flex justify-center gap-3 w-full max-w-[300px] mx-auto">
            <div className="relative w-[48%]"><div className="absolute inset-0 bg-[#111]/80 border border-white/5 rounded-lg transform translate-x-1.5 -translate-y-1.5" /><MobileCard icon={<Sigma className="w-3 h-3" />} code="CSI213" title="Discrete" preview={<Preview type="disc" mobile />} /></div>
            <div className="relative w-[48%]"><div className="absolute inset-0 bg-[#111]/80 border border-white/5 rounded-lg transform -translate-x-1.5 translate-y-1.5" /><MobileCard icon={<Calculator className="w-3 h-3" />} code="MAT221" title="Calculus" preview={<Preview type="calc" mobile />} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Desktop/Tablet Module Card
function ModuleCard({ className = "", delay = 0, style, icon, code, title, preview }: { className?: string; delay?: number; style?: any; icon: React.ReactNode; code: string; title: string; preview: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, delay, type: "spring", stiffness: 120, damping: 18 }} style={style} className={className}>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }} className="relative">
        <div className="bg-[#111] border border-white/10 rounded-lg p-2.5 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-white/5 border border-white/10 text-white/80 flex-shrink-0">{icon}</div>
            <div className="min-w-0"><div className="text-[9px] font-medium text-white/40 uppercase truncate">{code}</div><div className="text-xs font-semibold text-white/90 truncate">{title}</div></div>
          </div>
          <div className="bg-[#0d0d0d] rounded p-2 border border-white/5 overflow-x-auto font-mono leading-relaxed">{preview}</div>
        </div>
        <div className="absolute -inset-0.5 bg-white/5 rounded-lg blur-sm -z-10" />
      </motion.div>
    </motion.div>
  );
}

// Mobile Card (Static)
function MobileCard({ icon, code, title, preview }: { icon: React.ReactNode; code: string; title: string; preview: React.ReactNode }) {
  return (
    <div className="relative bg-[#111] border border-white/10 rounded-lg p-2 shadow-xl backdrop-blur-sm z-10">
      <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-white/5">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10 text-white/80 flex-shrink-0">{icon}</div>
        <div className="min-w-0"><div className="text-[8px] font-medium text-white/40 uppercase truncate">{code}</div><div className="text-[10px] font-semibold text-white/90 truncate text-center">{title}</div></div>
      </div>
      <div className="bg-[#0d0d0d] rounded p-1.5 border border-white/5 overflow-x-auto font-mono leading-relaxed text-center">{preview}</div>
    </div>
  );
}

// VS Code Dark+ Syntax Highlighting
function Preview({ type, compact = false, mobile = false }: { type: 'ds' | 'fp' | 'disc' | 'calc'; compact?: boolean; mobile?: boolean }) {
  const baseText = mobile ? 'text-[8px]' : compact ? 'text-[9px]' : 'text-[10px]';
  const sp = mobile ? 'space-y-0.5' : compact ? 'space-y-0.5' : 'space-y-1';
  
  const kw = "text-[#c678dd]"; const fn = "text-[#e5c07b]"; const typeC = "text-[#56b6c2]";
  const str = "text-[#98c379]"; const num = "text-[#d19a66]"; const cm = "text-[#5c6370]";

  if (type === 'ds') return (
    <div className={`${baseText} ${sp}`}>
      <div className={cm}>// O(n) linear search</div>
      <div><span className={kw}>function</span> <span className={fn}>search</span>(<span className={typeC}>arr</span>: <span className={typeC}>number</span>[], <span className={typeC}>target</span>) {'{'}</div>
      <div className="pl-2"><span className={kw}>for</span> (<span className={kw}>let</span> i = <span className={num}>0</span>; i &lt; arr.length; i++) {'{'}</div>
      <div className="pl-4"><span className={kw}>if</span> (arr[i] === <span className={typeC}>target</span>) <span className={kw}>return</span> i;</div>
      <div className="pl-2">{'}'}</div>
      <div className="pl-2"><span className={kw}>return</span> <span className={num}>-1</span>;</div>
      <div>{'}'}</div>
    </div>
  );
  if (type === 'fp') return (
    <div className={`${baseText} ${sp}`}>
      <div className={cm}>// Pure recursive factorial</div>
      <div><span className={kw}>const</span> <span className={fn}>factorial</span> = (n: <span className={typeC}>number</span>): <span className={typeC}>number</span> <span className={kw}>=&gt;</span></div>
      <div className="pl-2">n === <span className={num}>0</span> ? <span className={num}>1</span> : n * <span className={fn}>factorial</span>(n - <span className={num}>1</span>);</div>
      <div className="mt-1 pt-1 border-t border-white/10"><span className={cm}>✓ Deterministic</span></div>
      <div><span className={cm}>✓ No side effects</span></div>
    </div>
  );
  if (type === 'disc') return (
    <div className={`${sp}`}>
      <div className={`${baseText} ${cm} font-mono`}>Σ deg(v) = <span className={num}>2</span>|E|</div>
      <div className="flex gap-1 flex-wrap justify-center mt-1">
        <span className={`px-1 py-0.5 rounded bg-[#c678dd]/15 text-[#c678dd] ${mobile ? 'text-[7px]' : 'text-[8px]'} font-mono`}>∀x</span>
        <span className={`px-1 py-0.5 rounded bg-[#56b6c2]/15 text-[#56b6c2] ${mobile ? 'text-[7px]' : 'text-[8px]'} font-mono`}>P ∧ Q</span>
        <span className={`px-1 py-0.5 rounded bg-[#e5c07b]/15 text-[#e5c07b] ${mobile ? 'text-[7px]' : 'text-[8px]'} font-mono`}>→ R</span>
      </div>
    </div>
  );
  return (
    <div className={`${sp}`}>
      <div className={`font-mono ${baseText}`}><span className={typeC}>f</span>(x) = (<span className={num}>3</span>x<span className={kw}>²</span> + <span className={num}>1</span>)<span className={num}>⁴</span></div>
      <div className="flex items-center gap-1 mt-0.5"><span className={cm}>↓</span> <span className={cm}>Outer: <span className={num}>4</span>(3x²+1)³</span></div>
      <div className="flex items-center gap-1"><span className={cm}>↓</span> <span className={cm}>Inner: <span className={num}>6</span>x</span></div>
      <div className="mt-1 font-mono text-[#98c379]"><span className={typeC}>f'</span>(x) = <span className={num}>24</span>x(3x²+1)³</div>
    </div>
  );
}