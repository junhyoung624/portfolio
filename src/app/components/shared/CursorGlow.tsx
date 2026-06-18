import { C } from "../../theme";
import type { MousePosition } from "../../../types";

interface CursorGlowProps {
  mousePos: MousePosition;
}

// ── 커서 글로우 ──────────────────────────────────────────────
export function CursorGlow({ mousePos }: CursorGlowProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-full blur-3xl transition-[left,top] duration-500"
      style={{
        width: 320, height: 320,
        background: C.accent,
        opacity: 0.05,
        left: mousePos.x - 160,
        top: mousePos.y - 160,
      }}
    />
  );
}
