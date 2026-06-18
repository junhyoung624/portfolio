import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { SkillBarProps } from "../../../types";
import { C } from "../../theme";

// ── SkillBar ─────────────────────────────────────────────────
export function SkillBar({ name, level, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
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
    </motion.div>
  );
}
