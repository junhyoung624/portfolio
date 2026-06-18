import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { C } from "../../theme";
import { ABOUT_FEATURES } from "../../../types/constants";

// ── ABOUT ────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-10 md:p-14"
          style={{ background: C.surface, border: `1px solid ${C.border}` }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <Code2 className="w-4 h-4" style={{ color: C.accent }} />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.accent }}>
                  About Me
                </span>
              </div>
              <div className="space-y-4 text-sm leading-relaxed font-light" style={{ color: "#7777a0" }}>
                <p>
                  안녕하세요. 프론트엔드 개발자 문준형입니다.
                  사용자에게 더 나은 경험을 제공하기 위해 웹 서비스를 기획하고 구현하는 과정에 관심이 많습니다.
                </p>
                <p>
                  <span style={{ color: C.text }}>HTML, CSS, JavaScript</span>를 시작으로 <span style={{ color: C.text }}>React</span>와 <span style={{ color: C.text }}>Next.js</span>를 학습하며 다양한 리뉴얼 프로젝트를 진행했습니다.
                </p>
                <p>
                  현재는 OTT 서비스인 라프텔 리뉴얼 프로젝트를 개발하며{" "}
                  <span style={{ color: C.text }}>TypeScript, Firebase, TMDB API</span>{" "}
                  등을 활용한 서비스를 구축하고 있습니다.
                </p>
              </div>
            </motion.div>
            <div className="space-y-3">
              {ABOUT_FEATURES.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4 p-4 rounded-xl transition-colors duration-200 cursor-default"
                  style={{ border: `1px solid ${C.border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.accentDim; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: C.accentDim }}
                  >
                    <item.icon className="w-3.5 h-3.5" style={{ color: C.accent }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-semibold mb-0.5" style={{ color: C.text }}>{item.label}</div>
                    <div className="font-mono text-[11px]" style={{ color: C.muted }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
