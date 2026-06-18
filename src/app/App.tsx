import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Lenis from "lenis";
import toast, { Toaster } from "react-hot-toast";
import {
  Github, Mail, ExternalLink, Terminal,
  Code2, Layers, ChevronRight, ArrowRight, ArrowLeft,
} from "lucide-react";
import { ProjectDetailPage } from "./components/ProjectDetailPage";



import type {
  GlitchTextProps,
  SkillBarProps,
  ProjectCardProps,
  ProjectFilterProps,
  SectionHeadingProps,
  MousePosition,
  ProjectCategory,
  PreloaderProps,
  Project,
} from "../types";
import {
  PROJECTS, SKILLS, TOOL_BADGES, HERO_STATS,
  ABOUT_FEATURES, HERO_TYPED_TEXT, NAV_ITEMS, FILTER_CATEGORIES,
} from "../types/constants";

// ── 색상 토큰 (미디엄 테마) ──────────────────────────────────
const C = {
  bg:        "#1e1e28",
  surface:   "#26263a",
  border:    "rgba(255,255,255,0.08)",
  accent:    "#00e5c0",
  accentDim: "rgba(0,229,192,0.1)",
  text:      "#e8e8f0",
  muted:     "#6a6a88",
  subtle:    "#32324a",
} as const;

// ── Preloader ────────────────────────────────────────────────
function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState<number>(0);
  const [phase, setPhase] = useState<"count" | "out">("count");

  useEffect(() => {
    let val = 0;
    const step = (): void => {
      val += Math.floor(Math.random() * 18) + 6;
      if (val >= 100) {
        setCount(100);
        setTimeout(() => setPhase("out"), 500);
        setTimeout(onComplete, 1100);
        return;
      }
      setCount(val);
      setTimeout(step, 55 + Math.random() * 55);
    };
    const t = setTimeout(step, 150);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "count" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#18181f" }}
        >
          {/* 진행 바 */}
          <div className="w-44 h-px mb-10" style={{ background: "#2a2a3a" }}>
            <motion.div
              className="h-full"
              style={{ background: C.accent }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.12 }}
            />
          </div>
          {/* 카운터 */}
          <span
            className="font-mono tabular-nums select-none"
            style={{ fontSize: 64, fontWeight: 700, color: "#ddddf0", letterSpacing: "-0.04em" }}
          >
            {String(count).padStart(3, "0")}
          </span>
          <span className="font-mono mt-3 tracking-[0.35em] text-[10px] uppercase" style={{ color: "#56566e" }}>
            Loading
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── GlitchText ───────────────────────────────────────────────
function GlitchText({ text }: GlitchTextProps) {
  const [glitching, setGlitching] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      {text}
      {glitching && (
        <>
          <span aria-hidden className="absolute inset-0 opacity-60"
            style={{ color: "#ff003c", clipPath: "polygon(0 20%,100% 20%,100% 45%,0 45%)", transform: "translateX(-3px)" }}>
            {text}
          </span>
          <span aria-hidden className="absolute inset-0 opacity-60"
            style={{ color: C.accent, clipPath: "polygon(0 58%,100% 58%,100% 80%,0 80%)", transform: "translateX(3px)" }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}

// ── SkillBar ─────────────────────────────────────────────────
function SkillBar({ name, level, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: C.muted }}>{name}</span>
        <span className="font-mono text-[11px]" style={{ color: C.accent }}>{level}%</span>
      </div>
      <div className="h-px rounded-full" style={{ background: C.subtle }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${C.accent}, #00a8ff)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ── ProjectFilter ─────────────────────────────────────────────
function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="font-mono text-[11px] tracking-wider px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: isActive ? C.accent : "transparent",
              color:      isActive ? C.bg : C.muted,
              border:     `1px solid ${isActive ? C.accent : C.subtle}`,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// ── ProjectCard (Swiper 슬라이드 내부용) ─────────────────────
function ProjectCard({ project, index, onOpenDetail }: ProjectCardProps & { onOpenDetail: (p: typeof project) => void }) {
  const [hovered, setHovered] = useState<boolean>(false);

  const handleDemo = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (project.demoUrl) {
      window.open(project.demoUrl, "_blank");
    } else {
      toast("준비 중인 데모입니다 🚧", {
        style: { background: C.surface, color: C.text, border: `1px solid ${C.subtle}`, fontFamily: "monospace", fontSize: "12px" },
        icon: "🔗",
      });
    }
  };

  const handleSource = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (project.sourceUrl) {
      window.open(project.sourceUrl, "_blank");
    } else {
      toast("소스 코드를 준비 중입니다 🛠", {
        style: { background: C.surface, color: C.text, border: `1px solid ${C.subtle}`, fontFamily: "monospace", fontSize: "12px" },
        icon: "💻",
      });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenDetail(project)}
      className="h-full cursor-pointer select-none"
    >
      <div
        className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{
          background: C.surface,
          border: `1px solid ${hovered ? `${project.accent}35` : C.border}`,
          boxShadow: hovered ? `0 8px 40px ${project.accent}10` : "none",
        }}
      >
        {/* 이미지 */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `linear-gradient(180deg, transparent 40%, ${C.bg}cc)`,
              opacity: hovered ? 1 : 0.5,
            }}
          />
          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 rounded-full tracking-wider"
            style={{
              background: `${project.accent}18`,
              color: project.accent,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {project.category}
          </span>
          {/* 프로젝트 번호 */}
          <span
            className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-wider"
            style={{ color: project.accent }}
          >
            _{project.id}
          </span>
        </div>

        {/* 본문 */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-mono font-bold text-base" style={{ color: C.text }}>{project.title}</h3>
            <span className="font-mono text-[10px] ml-2 shrink-0" style={{ color: C.subtle }}>{project.year}</span>
          </div>
          <p className="font-mono text-[11px] mb-3 tracking-wider" style={{ color: C.muted }}>{project.subtitle}</p>
          <p className="text-[13px] leading-relaxed mb-4 flex-1 font-light" style={{ color: "#7777a0" }}>
            {project.description}
          </p>

          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t: string, i: number) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{
                  color: project.techColors[i],
                  background: `${project.techColors[i]}10`,
                  border: `1px solid ${project.techColors[i]}20`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
            <button
              onClick={handleDemo}
              className="flex items-center gap-1.5 font-mono text-[11px] transition-colors duration-200"
              style={{ color: hovered ? project.accent : C.muted }}
            >
              <ExternalLink className="w-3 h-3" /> Live
            </button>
            <button
              onClick={handleSource}
              className="flex items-center gap-1.5 font-mono text-[11px] transition-colors duration-200"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              <Github className="w-3 h-3" /> Source
            </button>
            <motion.div
              className="ml-auto w-6 h-6 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${hovered ? project.accent : C.subtle}` }}
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.22 }}
            >
              <ChevronRight className="w-3 h-3" style={{ color: hovered ? project.accent : C.muted }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── SectionHeading ────────────────────────────────────────────
function SectionHeading({ label, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: C.accent }}>
        {label}
      </span>
      <h2
        className="font-mono font-bold leading-tight"
        style={{ fontSize: "clamp(28px, 5vw, 40px)", color: C.text, letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded]           = useState<boolean>(false);
  const [mousePos, setMousePos]       = useState<MousePosition>({ x: 0, y: 0 });
  const [typedText, setTypedText]     = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const lenisRef    = useRef<InstanceType<typeof Lenis> | null>(null);
  const lenisRafRef = useRef<number>(0);
  const anchorRef   = useRef<((e: MouseEvent) => void) | null>(null);

  // ── Lenis 생성 함수 ──────────────────────────────────────
  const createLenis = useCallback(() => {
    if (lenisRef.current) return;
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const tick = (time: number): void => {
      lenis.raf(time);
      lenisRafRef.current = requestAnimationFrame(tick);
    };
    lenisRafRef.current = requestAnimationFrame(tick);

    const handleAnchor = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute("href")!;
      const el = document.querySelector(id);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -56 });
    };
    anchorRef.current = handleAnchor;
    document.addEventListener("click", handleAnchor);
  }, []);

  // ── Lenis 제거 함수 ──────────────────────────────────────
  const destroyLenis = useCallback(() => {
    if (!lenisRef.current) return;
    cancelAnimationFrame(lenisRafRef.current);
    if (anchorRef.current) document.removeEventListener("click", anchorRef.current);
    lenisRef.current.destroy();
    lenisRef.current = null;
    anchorRef.current = null;
    // Lenis가 걸어둔 overflow:hidden 강제 해제
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  // ── 최초 로드 시 Lenis 시작 ─────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    createLenis();
    return () => destroyLenis();
  }, [loaded, createLenis, destroyLenis]);

  // ── 상세페이지 열릴 때 destroy, 닫힐 때 재생성 ──────────
  useEffect(() => {
    if (!loaded) return;
    if (selectedProject) {
      destroyLenis();
    } else {
      createLenis();
    }
  }, [selectedProject, loaded, createLenis, destroyLenis]);

  // ── 타이핑 ───────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= HERO_TYPED_TEXT.length) {
        setTypedText(HERO_TYPED_TEXT.slice(0, i));
        i++;
      } else clearInterval(id);
    }, 75);
    return () => clearInterval(id);
  }, [loaded]);

  // ── 마우스 글로우 ────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent): void => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── 필터링 ───────────────────────────────────────────────
  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <Preloader onComplete={handleLoaded} />

      {/* react-hot-toast */}
      <Toaster position="bottom-right" />

      {/* 프로젝트 상세 — 전체 페이지 전환 (body 스크롤 활용) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              overflowY: "scroll",
              overflowX: "hidden",
              background: "#1a1a24",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* 상세 페이지 전용 NAV */}
            <div style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              height: 60,
              background: "rgba(26,26,36,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
              gap: 24,
            }}>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 600,
                  color: "#8888aa", background: "none",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "6px 16px",
                  borderRadius: 4, cursor: "pointer", marginRight: "auto",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#e8e8f0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#8888aa"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <ArrowLeft className="w-4 h-4" /> 목록으로
              </button>
              <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 600, color: "#6a6a88" }}>
                {selectedProject.title}
              </span>
            </div>
            <ProjectDetailPage
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen overflow-x-hidden"
            style={{ background: C.bg, fontFamily: "'Outfit', sans-serif" }}
          >
            {/* 커서 글로우 */}
            <div
              className="pointer-events-none fixed z-50 rounded-full blur-3xl transition-[left,top] duration-500"
              style={{
                width: 320, height: 320,
                background: C.accent,
                opacity: 0.05,
                left: mousePos.x - 160,
                top: mousePos.y - 160,
              }}
            />

            {/* ─── NAV ─── */}
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 h-14"
              style={{
                background: `${C.bg}e0`,
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <span className="font-mono text-xs tracking-widest font-bold" style={{ color: C.text }}>Portfolio · 2024</span>
              <div className="flex items-center gap-7">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
                    style={{ color: C.muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>

            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-24">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2.5 mb-10"
                >
                  <Terminal className="w-3.5 h-3.5" style={{ color: C.accent }} />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.muted }}>
                    Portfolio · 2025
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-mono font-bold leading-[0.9] tracking-tight mb-8"
                  style={{ fontSize: "clamp(52px, 10vw, 96px)", color: C.text }}
                >
                  <GlitchText text="문준형" />
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="font-mono text-xl md:text-2xl mb-5 h-8 flex items-center"
                  style={{ color: C.text }}
                >
                  {typedText}
                  <span className="ml-0.5 animate-pulse" style={{ color: C.accent }}>|</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="text-sm md:text-base max-w-md leading-relaxed mb-10 font-light"
                  style={{ color: C.muted }}
                >
                  사용자 경험을 최우선으로 생각하며, 아름답고 기능적인 웹 애플리케이션을 만듭니다.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-3"
                >
                  <a
                    href="#projects"
                    className="flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:brightness-110"
                    style={{ background: C.accent, color: C.bg }}
                  >
                    Projects <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className="font-mono text-xs px-5 py-2.5 rounded-lg transition-all duration-200"
                    style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                  >
                    Contact
                  </a>
                </motion.div>
              </div>

              {/* Hero 통계 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute bottom-16 right-6 md:right-16 lg:right-24 flex gap-10"
              >
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="text-right">
                    <div className="font-mono text-4xl font-bold" style={{ color: C.text }}>{s.value}</div>
                    <div className="font-mono text-[11px] tracking-widest uppercase mt-1" style={{ color: C.muted }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* 스크롤 힌트 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-px h-10 mx-auto"
                  style={{ background: `linear-gradient(to bottom, ${C.accent}, transparent)` }}
                />
              </motion.div>
            </section>

            {/* ─── SKILLS ─── */}
            <section id="skills" className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl mx-auto">
                <SectionHeading label="Technical Skills" title="기술 스택" />
                <div className="grid md:grid-cols-2 gap-x-20">
                  {SKILLS.map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex flex-wrap gap-2"
                >
                  {TOOL_BADGES.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-full tracking-wider"
                      style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─── PROJECTS ─── */}
            <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl mx-auto">
                <SectionHeading label="Selected Work" title="프로젝트" />

                {/* 카테고리 필터 */}
                <ProjectFilter
                  categories={FILTER_CATEGORIES}
                  active={activeFilter}
                  onChange={(cat) => setActiveFilter(cat)}
                />

                {/* Swiper 슬라이더 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredProjects.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                          prevEl: ".swiper-btn-prev",
                          nextEl: ".swiper-btn-next",
                        }}
                        pagination={{
                          clickable: true,
                          bulletClass: "swiper-bullet",
                          bulletActiveClass: "swiper-bullet-active",
                        }}
                        breakpoints={{
                          640:  { slidesPerView: 1.4, spaceBetween: 16 },
                          768:  { slidesPerView: 2,   spaceBetween: 18 },
                          1024: { slidesPerView: 2.5, spaceBetween: 20 },
                        }}
                        className="pb-12"
                        a11y={{ prevSlideMessage: "이전 프로젝트", nextSlideMessage: "다음 프로젝트" }}
                      >
                        {filteredProjects.map((project, i) => (
                          <SwiperSlide key={project.id} style={{ height: "auto" }}>
                            <ProjectCard project={project} index={i} onOpenDetail={setSelectedProject} />
                          </SwiperSlide>
                        ))}

                        {/* 커스텀 내비게이션 버튼 */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex gap-2">
                            <button
                              className="swiper-btn-prev w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200"
                              style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                              aria-label="이전"
                            >
                              ←
                            </button>
                            <button
                              className="swiper-btn-next w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200"
                              style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                              aria-label="다음"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </Swiper>
                    ) : (
                      <p className="font-mono text-sm text-center py-16" style={{ color: C.muted }}>
                        해당 카테고리의 프로젝트가 없습니다.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* ─── ABOUT ─── */}
            <section id="about" className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl mx-auto">
                <div
                  className="rounded-2xl p-10 md:p-14"
                  style={{ background: C.surface, border: `1px solid ${C.border}` }}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-2.5 mb-6">
                        <Code2 className="w-4 h-4" style={{ color: C.accent }} />
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.accent }}>
                          About Me
                        </span>
                      </div>
                      <div className="space-y-4 text-sm leading-relaxed font-light" style={{ color: "#7777a0" }}>
                        <p>
                          안녕하세요. 프론트엔드 개발자 문준형입니다.
                          사용자에게 더 나은 경험을 제공하기 위해 웹 서비스를 기획하고 구현하는 과정에 관심이 많습니다.
                        </p>
                        <p>
                          <span style={{ color: C.text }}>HTML, CSS, JavaScript</span>를 시작으로 <span style={{ color: C.text }}>React</span>와 <span style={{ color: C.text }}>Next.js</span>를 학습하며 다양한 리뉴얼 프로젝트를 진행했습니다.
                        </p>
                        <p>
                          현재는 OTT 서비스인 라프텔 리뉴얼 프로젝트를 개발하며{" "}
                          <span style={{ color: C.text }}>TypeScript, Firebase, TMDB API</span>{" "}
                          등을 활용한 서비스를 구축하고 있습니다.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {ABOUT_FEATURES.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-4 p-4 rounded-xl transition-colors duration-200 cursor-default"
                          style={{ border: `1px solid ${C.border}` }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.accentDim; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: C.accentDim }}
                          >
                            <item.icon className="w-3.5 h-3.5" style={{ color: C.accent }} />
                          </div>
                          <div>
                            <div className="font-mono text-xs font-semibold mb-0.5" style={{ color: C.text }}>{item.label}</div>
                            <div className="font-mono text-[11px]" style={{ color: C.muted }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section id="contact" className="py-24 px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: C.accent }}>
                    Get In Touch
                  </span>
                  <h2
                    className="font-mono font-bold mb-5"
                    style={{ fontSize: "clamp(32px, 6vw, 52px)", color: C.text, letterSpacing: "-0.03em" }}
                  >
                    함께 만들어요
                  </h2>
                  <p className="text-sm font-light mb-10 max-w-sm mx-auto" style={{ color: C.muted }}>
                    새로운 프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href="mailto:hello@portfolio.dev"
                      className="flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:brightness-110"
                      style={{ background: C.accent, color: C.bg }}
                    >
                      <Mail className="w-3.5 h-3.5" /> 이메일 보내기
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-lg transition-all duration-200"
                      style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer
              className="py-8 px-6 md:px-16 lg:px-24"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                <span className="font-mono text-[11px]" style={{ color: C.subtle }}>mjh.dev © 2025</span>
                <span className="font-mono text-[11px]" style={{ color: C.subtle }}>
                  React · TypeScript · Vite · Swiper · Lenis
                </span>
              </div>
            </footer>

            {/* 전역 스타일 */}
            <style>{`
              html { scroll-behavior: auto; }
              ::-webkit-scrollbar { width: 3px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }

              .swiper-bullet {
                display: inline-block;
                width: 4px; height: 4px;
                border-radius: 9999px;
                background: #ddd;
                margin: 0 3px;
                cursor: pointer;
                transition: all 0.2s;
              }
              .swiper-bullet-active { width: 16px; background: ${C.text}; }
              .swiper-pagination { display: flex; align-items: center; justify-content: center; margin-top: 16px; }
              .swiper-button-prev, .swiper-button-next { display: none !important; }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}