import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { SectionHeadingProps } from "../../../types";
import { C } from "../../theme";

// ── SectionHeading ────────────────────────────────────────────
export function SectionHeading({ label, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3"
        style={{ color: C.accent }}
      >
        {label}
      </motion.span>
      <h2
        className="font-mono font-bold leading-tight"
        style={{ fontSize: "clamp(28px, 5vw, 40px)", color: C.text, letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
