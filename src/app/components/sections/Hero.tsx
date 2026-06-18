import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Terminal, ArrowRight } from "lucide-react";
import { GlitchText } from "../shared/GlitchText";
import { C } from "../../theme";
import { HERO_STATS } from "../../../types/constants";

interface HeroProps {
  typedText: string;
}

// ── HERO ─────────────────────────────────────────────────────
export function Hero({ typedText }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 스크롤 시 살짝 위로 이동 + 페이드 아웃되는 패럴랙스
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-24 overflow-hidden"
    >
      <motion.div className="max-w-4xl" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2.5 mb-10"
        >
          <Terminal className="w-3.5 h-3.5" style={{ color: C.accent }} />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.muted }}>
            Portfolio · 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono font-bold leading-[0.9] tracking-tight mb-8"
          style={{ fontSize: "clamp(52px, 10vw, 96px)", color: C.text }}
        >
          <GlitchText text="문준형" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="font-mono text-xl md:text-2xl mb-5 h-8 flex items-center"
          style={{ color: C.text }}
        >
          {typedText}
          <span className="ml-0.5 animate-pulse" style={{ color: C.accent }}>|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-sm md:text-base max-w-md leading-relaxed mb-10 font-light"
          style={{ color: C.muted }}
        >
          사용자 경험을 최우선으로 생각하며, 아름답고 기능적인 웹 애플리케이션을 만듭니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:brightness-110"
            style={{ background: C.accent, color: C.bg }}
          >
            Projects <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs px-5 py-2.5 rounded-lg transition-all duration-200"
            style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero 통계 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{ y, opacity }}
        className="absolute bottom-16 right-6 md:right-16 lg:right-24 flex gap-10"
      >
        {HERO_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="text-right"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15 + i * 0.1 }}
          >
            <div className="font-mono text-4xl font-bold" style={{ color: C.text }}>{s.value}</div>
            <div className="font-mono text-[11px] tracking-widest uppercase mt-1" style={{ color: C.muted }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* 스크롤 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 mx-auto"
          style={{ background: `linear-gradient(to bottom, ${C.accent}, transparent)` }}
        />
      </motion.div>
    </section>
  );
}
