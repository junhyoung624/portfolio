import { motion } from "motion/react";
import { C } from "../../theme";

// ── FOOTER ───────────────────────────────────────────────────
export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6 md:px-16 lg:px-24"
      style={{ borderTop: `1px solid ${C.border}` }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[11px]" style={{ color: C.subtle }}>mjh.dev © 2025</span>
        <span className="font-mono text-[11px]" style={{ color: C.subtle }}>
          React · TypeScript · Vite · Swiper · Lenis
        </span>
      </div>
    </motion.footer>
  );
}
