import type { ElementType } from "react";

// ── 카테고리 ──────────────────────────────────────────────────
export type ProjectCategory = "All" | "Web Renewal" | "SPA Development" | "Full-Stack";

// ── Nav ───────────────────────────────────────────────────────
export type NavItem = "Skills" | "Projects" | "Contact";

// ── Skill ─────────────────────────────────────────────────────
export interface Skill {
  name:  string;
  level: number;
}

// ── ToolBadge ─────────────────────────────────────────────────
export type ToolBadge = string;

// ── HeroStat ──────────────────────────────────────────────────
export interface HeroStat {
  value: string;
  label: string;
}

// ── AboutFeature ──────────────────────────────────────────────
export interface AboutFeature {
  label: string;
  desc:  string;
  icon:  ElementType;
}

// ── Project ───────────────────────────────────────────────────
export interface ProjectSection {
  name: string;
  desc: string;
}

export interface ProjectDetail {
  title:         string;
  demoUrl?:      string;
  sourceUrl?:    string;
  techStack:     string[];
  pages:         string[];
  crossBrowsing: string[];
  responsive:    string[];
  concept:       string;
  mainColors:    string[];
  typography:    string;
  overview:      string;
  sections:      ProjectSection[];
}

export interface Project {
  id:          string;
  title:       string;
  subtitle:    string;
  category:    ProjectCategory;
  year:        string;
  image:       string;
  accent:      string;
  tech:        string[];
  techColors:  string[];
  description: string;
  demoUrl?:    string;
  sourceUrl?:  string;
  detail?:     ProjectDetail;
}

// ── Component props ───────────────────────────────────────────
export interface GlitchTextProps   { text: string; }
export interface SkillBarProps     { name: string; level: number; index: number; }
export interface ProjectCardProps  { project: Project; index: number; }
export interface ProjectFilterProps {
  categories: ProjectCategory[];
  active:     ProjectCategory;
  onChange:   (cat: ProjectCategory) => void;
}
export interface SectionHeadingProps { label: string; title: string; }
export interface MousePosition       { x: number; y: number; }
export interface PreloaderProps      { onComplete: () => void; }

export interface ProjectCardComponentProps {
  title:        string;
  description:  string;
  technologies: { name: string; color: string }[];
  image:        string;
  index:        number;
}