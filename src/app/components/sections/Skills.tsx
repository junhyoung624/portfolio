import { motion } from "motion/react";
import { SectionHeading } from "../shared/SectionHeading";
import { SkillBar } from "../shared/SkillBar";
import { C } from "../../theme";
import { SKILLS, TOOL_BADGES } from "../../../types/constants";

// ── SKILLS ───────────────────────────────────────────────────
export function Skills() {
  return (
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
          {TOOL_BADGES.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, borderColor: C.accent, color: C.text }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.03 }}
              className="font-mono text-[10px] px-3 py-1.5 rounded-full tracking-wider"
              style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
