import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { PreloaderProps } from "../../../types";
import { C } from "../../theme";

// ── Preloader ────────────────────────────────────────────────
export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState<number>(0);
  const [phase, setPhase] = useState<"count" | "out">("count");

  useEffect(() => {
    let val = 0;
    const step = (): void => {
      val += Math.floor(Math.random() * 18) + 6;
      if (val >= 100) {
        setCount(100);
        setTimeout(() => setPhase("out"), 500);
        setTimeout(onComplete, 1100);
        return;
      }
      setCount(val);
      setTimeout(step, 55 + Math.random() * 55);
    };
    const t = setTimeout(step, 150);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "count" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#18181f" }}
        >
          {/* 진행 바 */}
          <div className="w-44 h-px mb-10" style={{ background: "#2a2a3a" }}>
            <motion.div
              className="h-full"
              style={{ background: C.accent }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.12 }}
            />
          </div>
          {/* 카운터 */}
          <span
            className="font-mono tabular-nums select-none"
            style={{ fontSize: 64, fontWeight: 700, color: "#ddddf0", letterSpacing: "-0.04em" }}
          >
            {String(count).padStart(3, "0")}
          </span>
          <span className="font-mono mt-3 tracking-[0.35em] text-[10px] uppercase" style={{ color: "#56566e" }}>
            Loading
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
