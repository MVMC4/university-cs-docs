"use client";

import Link from 'next/link';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Binary, FunctionSquare, GitBranch, Calculator, Sigma } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={containerRef}
      className="
        relative min-h-screen w-full overflow-hidden
        bg-[#F1EBDD] dark:bg-[#0a0a0a]
        text-[#273047] dark:text-white
        bg-[linear-gradient(to_right,rgba(48,54,77,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,54,77,0.06)_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
        bg-[length:40px_40px]
      "
      style={{
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-4 sm:py-6 md:py-12 z-20">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }} className="inline-flex items-center justify-center w-10 h-10 sm:w-12 md:w-14 lg:w-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#FBF5E9] dark:bg-white/5 border-2 border-[#30364D] dark:border-white/10 mb-2 sm:mb-4 md:mb-6 shadow-[4px_4px_0_rgba(48,54,77,.18)] dark:shadow-none">
          <Binary className="w-4 h-4 sm:w-5 md:w-6 lg:w-7 text-[#30364D] dark:text-white/90" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="university-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-1.5 sm:mb-2 text-center leading-tight px-2 text-[#273047] dark:text-white">
          University CS Docs
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-xs sm:text-sm md:text-base text-[#6E7180] dark:text-white/60 max-w-[260px] sm:max-w-sm md:max-w-md mx-auto mb-3 sm:mb-5 md:mb-8 font-light text-center px-2">
          Notes, code & quizzes for University of Botswana CS.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="w-full sm:w-auto px-2">
          <Link href="/docs" className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 bg-[#30364D] text-[#FBF5E9] dark:bg-white dark:text-black rounded-lg sm:rounded-xl font-medium hover:bg-[#273047] dark:hover:bg-white/90 transition-all text-xs sm:text-sm shadow-[4px_4px_0_rgba(201,127,134,.6)] dark:shadow-none">
            Access Docs
            <ArrowRight className="w-3 h-3 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Desktop/Tablet: Floating Cards with Parallax */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <ModuleCard 
            delay={0.5} 
            style={{ x: c1x, y: c1y }} 
            className="absolute top-[10%] left-[4%] sm:left-[6%] lg:left-[10%] w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72" 
            icon={<GitBranch className="w-4 h-4" />} 
            code="CSI247" 
            title="Data Structures" 
            preview={<Preview type="ds" />} 
          />
          <ModuleCard 
            delay={0.7} 
            style={{ x: c2x, y: c2y }} 
            className="absolute bottom-[10%] left-[4%] sm:left-[6%] lg:left-[10%] w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72" 
            icon={<FunctionSquare className="w-4 h-4" />} 
            code="CSI243" 
            title="Functional" 
            preview={<Preview type="fp" />} 
          />
          <ModuleCard 
            delay={0.6} 
            style={{ x: c3x, y: c3y }} 
            className="absolute top-[10%] right-[4%] sm:right-[6%] lg:right-[10%] w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72" 
            icon={<Sigma className="w-4 h-4" />} 
            code="CSI213" 
            title="Discrete" 
            preview={<Preview type="disc" />} 
          />
          <ModuleCard 
            delay={0.8} 
            style={{ x: c4x, y: c4y }} 
            className="absolute bottom-[10%] right-[4%] sm:right-[6%] lg:right-[10%] w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72" 
            icon={<Calculator className="w-4 h-4" />} 
            code="MAT221" 
            title="Calculus" 
            preview={<Preview type="calc" />} 
          />
        </div>
      )}

      {/* Mobile: Layered 2x2 Grid (No Animation) */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between pt-[22vh] pb-[16vh] px-3">
          <div className="flex justify-center gap-3 w-full max-w-[300px] mx-auto">
            <div className="relative w-[48%] h-40">
              <div className="absolute inset-0 bg-[#E4DCCA]/80 dark:bg-[#111]/80 border border-[#CFC4AE] dark:border-white/5 rounded-xl transform translate-x-1.5 translate-y-1.5" />
              <MobileCard icon={<GitBranch className="w-3 h-3" />} code="CSI247" title="Data Struct" preview={<Preview type="ds" mobile />} />
            </div>
            <div className="relative w-[48%] h-40">
              <div className="absolute inset-0 bg-[#E4DCCA]/80 dark:bg-[#111]/80 border border-[#CFC4AE] dark:border-white/5 rounded-xl transform -translate-x-1.5 -translate-y-1.5" />
              <MobileCard icon={<FunctionSquare className="w-3 h-3" />} code="CSI243" title="Functional" preview={<Preview type="fp" mobile />} />
            </div>
          </div>
          <div className="flex justify-center gap-3 w-full max-w-[300px] mx-auto">
            <div className="relative w-[48%] h-40">
              <div className="absolute inset-0 bg-[#E4DCCA]/80 dark:bg-[#111]/80 border border-[#CFC4AE] dark:border-white/5 rounded-xl transform translate-x-1.5 -translate-y-1.5" />
              <MobileCard icon={<Sigma className="w-3 h-3" />} code="CSI213" title="Discrete" preview={<Preview type="disc" mobile />} />
            </div>
            <div className="relative w-[48%] h-40">
              <div className="absolute inset-0 bg-[#E4DCCA]/80 dark:bg-[#111]/80 border border-[#CFC4AE] dark:border-white/5 rounded-xl transform -translate-x-1.5 translate-y-1.5" />
              <MobileCard icon={<Calculator className="w-3 h-3" />} code="MAT221" title="Calculus" preview={<Preview type="calc" mobile />} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Desktop/Tablet Module Card
function ModuleCard({ className = "", delay = 0, style, icon, code, title, preview }: { className?: string; delay?: number; style?: any; icon: React.ReactNode; code: string; title: string; preview: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.92, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 120, damping: 18 }} 
      style={style} 
      className={className}
    >
      <motion.div 
        animate={{ y: [0, -6, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }} 
        className="relative h-full"
      >
        <div className="bg-gradient-to-br from-[#FBF5E9] to-[#EEE5D3] dark:from-[#161616] dark:to-[#0d0d0d] border border-[#CFC4AE] dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl backdrop-blur-md flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2.5 p-3 border-b border-[#DCD1BD] dark:border-white/5 bg-[#F1EBDD]/70 dark:bg-white/[0.02]">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#E4DCCA] dark:bg-white/5 border border-[#CFC4AE] dark:border-white/10 text-[#30364D] dark:text-white/90 flex-shrink-0 shadow-inner">
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold text-[#8D6670] dark:text-white/40 uppercase tracking-wider truncate">{code}</div>
              <div className="text-sm font-bold text-[#273047] dark:text-white/95 truncate leading-tight">{title}</div>
            </div>
          </div>
          <div className="flex-1 bg-[#F7F0E3]/70 dark:bg-[#0d0d0d]/50 p-3 font-mono leading-relaxed overflow-hidden flex items-start">
            {preview}
          </div>
        </div>
        <div className="absolute -inset-1 bg-[#CFC4AE] dark:bg-white/5 rounded-xl blur-md -z-10 opacity-50" />
      </motion.div>
    </motion.div>
  );
}

// Mobile Card (Static)
function MobileCard({ icon, code, title, preview }: { icon: React.ReactNode; code: string; title: string; preview: React.ReactNode }) {
  return (
    <div className="relative bg-gradient-to-br from-[#FBF5E9] to-[#EEE5D3] dark:from-[#161616] dark:to-[#0d0d0d] border border-[#CFC4AE] dark:border-white/10 rounded-xl shadow-lg dark:shadow-xl backdrop-blur-md flex flex-col h-full overflow-hidden z-10">
      <div className="flex items-center gap-2 p-2.5 border-b border-[#DCD1BD] dark:border-white/5 bg-[#F1EBDD]/70 dark:bg-white/[0.02]">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#E4DCCA] dark:bg-white/5 border border-[#CFC4AE] dark:border-white/10 text-[#30364D] dark:text-white/90 flex-shrink-0 shadow-inner">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold text-[#8D6670] dark:text-white/40 uppercase tracking-wider truncate">{code}</div>
          <div className="text-xs font-bold text-[#273047] dark:text-white/95 truncate leading-tight">{title}</div>
        </div>
      </div>
      <div className="flex-1 bg-[#F7F0E3]/70 dark:bg-[#0d0d0d]/50 p-2.5 font-mono leading-relaxed overflow-hidden flex items-start">
        {preview}
      </div>
    </div>
  );
}

// VS Code Syntax Highlighting (Light+ & Dark+)
function Preview({ type, mobile = false }: { type: 'ds' | 'fp' | 'disc' | 'calc'; mobile?: boolean }) {
  const baseText = mobile ? 'text-[10px]' : 'text-[11px]';
  const sp = 'space-y-1.5';

  // Light mode uses GitHub/VS Code Light+ colors, Dark mode uses Dark+
  const kw = "text-[#d73a49] dark:text-[#c678dd]"; 
  const fn = "text-[#6f42c1] dark:text-[#e5c07b]"; 
  const typeC = "text-[#005cc5] dark:text-[#56b6c2]";
  const str = "text-[#22863a] dark:text-[#98c379]"; 
  const num = "text-[#e36209] dark:text-[#d19a66]"; 
  const cm = "text-[#6a737d] dark:text-[#5c6370]";

  if (type === 'ds') return (
    <div className={`${baseText} ${sp} w-full`}>
      <div className={cm}>// O(n) linear search</div>
      <div><span className={kw}>function</span> <span className={fn}>search</span>(<span className={typeC}>arr</span>: <span className={typeC}>number</span>[], <span className={typeC}>target</span>) {'{'}</div>
      <div className="pl-3"><span className={kw}>for</span> (<span className={kw}>let</span> i = <span className={num}>0</span>; i &lt; arr.length; i++) {'{'}</div>
      <div className="pl-6"><span className={kw}>if</span> (arr[i] === <span className={typeC}>target</span>) <span className={kw}>return</span> i;</div>
      <div className="pl-3">{'}'}</div>
      <div className="pl-3"><span className={kw}>return</span> <span className={num}>-1</span>;</div>
      <div>{'}'}</div>
      <div className={`${cm} mt-2`}>// Time Complexity: O(n)</div>
    </div>
  );
  
  if (type === 'fp') return (
    <div className={`${baseText} ${sp} w-full`}>
      <div className={cm}>// Pure recursive factorial</div>
      <div><span className={kw}>const</span> <span className={fn}>factorial</span> = (n: <span className={typeC}>number</span>): <span className={typeC}>number</span> <span className={kw}>=&gt;</span></div>
      <div className="pl-3">n === <span className={num}>0</span> ? <span className={num}>1</span> : n * <span className={fn}>factorial</span>(n - <span className={num}>1</span>);</div>
      <div className={`${cm} mt-2`}>// Higher-order functions</div>
      <div><span className={kw}>const</span> <span className={fn}>apply</span> = (f: <span className={typeC}>Function</span>, x: <span className={typeC}>number</span>) <span className={kw}>=&gt;</span> f(x);</div>
      <div className={`${cm} mt-2`}>✓ Deterministic</div>
      <div className={cm}>✓ No side effects</div>
    </div>
  );
  
  if (type === 'disc') return (
    <div className={`${baseText} ${sp} w-full`}>
      <div className={cm}>// Graph Theory</div>
      <div>Σ deg(v) = <span className={num}>2</span>|E|</div>
      <div className={`${cm} mt-2`}>// Propositional Logic</div>
      <div>P ∧ Q → R</div>
      <div>∀x ∃y (P(x) ∧ Q(y))</div>
      <div className={`${cm} mt-2`}>// Set Theory</div>
      <div>A ∪ B = B ∪ A</div>
      <div>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</div>
    </div>
  );
  
  return (
    <div className={`${baseText} ${sp} w-full`}>
      <div className={cm}>// Chain Rule Application</div>
      <div><span className={typeC}>f</span>(x) = (<span className={num}>3</span>x<span className={kw}>²</span> + <span className={num}>1</span>)<span className={num}>⁴</span></div>
      <div className={cm}>↓ Outer: <span className={num}>4</span>(3x²+1)³</div>
      <div className={cm}>↓ Inner: <span className={num}>6</span>x</div>
      <div className={`${str} mt-1`}><span className={typeC}>f'</span>(x) = <span className={num}>24</span>x(3x²+1)³</div>
      <div className={`${cm} mt-2`}>// Integration</div>
      <div>∫ x<span className={kw}>²</span> dx = x<span className={kw}>³</span>/<span className={num}>3</span> + C</div>
    </div>
  );
}
