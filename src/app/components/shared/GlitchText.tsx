import { useState, useEffect } from "react";
import type { GlitchTextProps } from "../../../types";
import { C } from "../../theme";

// ── GlitchText ───────────────────────────────────────────────
export function GlitchText({ text }: GlitchTextProps) {
  const [glitching, setGlitching] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      {text}
      {glitching && (
        <>
          <span aria-hidden className="absolute inset-0 opacity-60"
            style={{ color: "#ff003c", clipPath: "polygon(0 20%,100% 20%,100% 45%,0 45%)", transform: "translateX(-3px)" }}>
            {text}
          </span>
          <span aria-hidden className="absolute inset-0 opacity-60"
            style={{ color: C.accent, clipPath: "polygon(0 58%,100% 58%,100% 80%,0 80%)", transform: "translateX(3px)" }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}
