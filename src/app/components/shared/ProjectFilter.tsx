import { motion } from "motion/react";
import type { ProjectFilterProps } from "../../../types";
import { C } from "../../theme";

// ── ProjectFilter ─────────────────────────────────────────────
export function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mb-10"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {categories.map((cat, i) => {
        const isActive = cat === active;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="font-mono text-[11px] tracking-wider px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: isActive ? C.accent : "transparent",
              color:      isActive ? C.bg : C.muted,
              border:     `1px solid ${isActive ? C.accent : C.subtle}`,
            }}
          >
            {cat}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
