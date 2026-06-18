import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { Toaster } from "react-hot-toast";

import { Preloader } from "./components/shared/Preloader";
import { CursorGlow } from "./components/shared/CursorGlow";
import { GlobalStyles } from "./components/shared/GlobalStyles";
import { ProjectDetailOverlay } from "./components/shared/ProjectDetailOverlay";
import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

import { C } from "./theme";
import type { MousePosition, ProjectCategory, Project } from "../types";
import { PROJECTS, HERO_TYPED_TEXT } from "../types/constants";

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

      <ProjectDetailOverlay
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

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
            <CursorGlow mousePos={mousePos} />

            <Nav />
            <Hero typedText={typedText} />
            <Skills />
            <Projects
              activeFilter={activeFilter}
              onChangeFilter={setActiveFilter}
              filteredProjects={filteredProjects}
              onOpenDetail={setSelectedProject}
            />
            <About />
            <Contact />
            <Footer />

            <GlobalStyles />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
