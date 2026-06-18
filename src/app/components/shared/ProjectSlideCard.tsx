import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import type { ProjectCardProps, Project } from "../../../types";
import { C } from "../../theme";

// ── ProjectSlideCard (Swiper 슬라이드 내부용) ─────────────────
export function ProjectSlideCard({
  project,
  index,
  onOpenDetail,
}: ProjectCardProps & { onOpenDetail: (p: Project) => void }) {
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
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
