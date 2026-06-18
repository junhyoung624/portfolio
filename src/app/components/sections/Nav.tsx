import { motion } from "motion/react";
import { C } from "../../theme";
import { NAV_ITEMS } from "../../../types/constants";

// ── NAV ──────────────────────────────────────────────────────
export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 h-14"
      style={{
        background: `${C.bg}e0`,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <span className="font-mono text-xs tracking-widest font-bold" style={{ color: C.text }}>Portfolio · 2024</span>
      <div className="flex items-center gap-7">
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
            whileHover={{ y: -1 }}
            className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
            style={{ color: C.muted }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}
