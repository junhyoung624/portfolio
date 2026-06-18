import type { LucideIcon } from "lucide-react";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type ProjectCategory =
  | "All"
  | "Web Renewal"
  | "SPA Development"
  | "Full-Stack"
  | "Mobile"
  | "Open Source";

// ─── 프로젝트 상세 정보 타입 ─────────────────────────────────
export interface ProjectSection {
  name: string;        // 페이지명 (예: index, 영화 상세)
  desc: string;        // 기능 설명
  link?: string;       // 해당 페이지 링크 (옵션)
}

export interface ProjectDetail {
  title: string;
  techStack: string[];          // 사용 기술
  pages: string[];              // 제작 페이지 목록
  crossBrowsing: string[];      // 크로스브라우징 지원 브라우저
  responsive: string[];         // 반응형 지원 범위
  concept: string;              // 컨셉 설명
  mainColors: string[];         // 메인 컬러 hex
  typography: string;           // 타이포그래피
  overview: string;             // 전체 페이지 기능 설명
  sections: ProjectSection[];   // 각 섹션별 기능 설명
  demoUrl?: string;
  sourceUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  techColors: string[];
  image: string;
  accent: string;
  year: string;
  category: Exclude<ProjectCategory, "All">;
  demoUrl?: string;
  sourceUrl?: string;
  detail?: ProjectDetail;       // 상세 페이지 정보
}

export interface Skill {
  name: string;
  level: number;
}

export type ToolBadge = string;

export interface HeroStat {
  value: string;
  label: string;
}

export interface AboutFeature {
  label: string;
  desc: string;
  icon: LucideIcon;
}

export type NavItem = "Skills" | "Projects" | "Contact";

export interface MousePosition {
  x: number;
  y: number;
}

export interface PreloaderProps {
  onComplete: () => void;
}

export interface GlitchTextProps {
  text: string;
}

export interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: ProjectCategory;
  onChange: (cat: ProjectCategory) => void;
}

export interface SectionHeadingProps {
  label: string;
  title: string;
}

export interface ProjectDetailPageProps {
  project: Project;
  onClose: () => void;
}