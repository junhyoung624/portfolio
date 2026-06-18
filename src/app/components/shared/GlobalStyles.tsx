import { C } from "../../theme";

// ── 전역 스타일 (Swiper 커스텀 등) ───────────────────────────
export function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: auto; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }

      .swiper-bullet {
        display: inline-block;
        width: 4px; height: 4px;
        border-radius: 9999px;
        background: #ddd;
        margin: 0 3px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .swiper-bullet-active { width: 16px; background: ${C.text}; }
      .swiper-pagination { display: flex; align-items: center; justify-content: center; margin-top: 16px; }
      .swiper-button-prev, .swiper-button-next { display: none !important; }
    `}</style>
  );
}
