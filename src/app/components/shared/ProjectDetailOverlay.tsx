import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ProjectDetailPage } from "../ProjectDetailPage";
import type { Project } from "../../../types";

interface ProjectDetailOverlayProps {
  selectedProject: Project | null;
  onClose: () => void;
}

// ── 프로젝트 상세 — 전체 페이지 전환 (body 스크롤 활용) ────────
export function ProjectDetailOverlay({ selectedProject, onClose }: ProjectDetailOverlayProps) {
  return (
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
              onClick={onClose}
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
            onClose={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
