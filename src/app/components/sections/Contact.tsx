import { motion } from "motion/react";
import { Mail, Github } from "lucide-react";
import { C } from "../../theme";

// ── CONTACT ──────────────────────────────────────────────────
export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-5"
            style={{ color: C.accent }}
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono font-bold mb-5"
            style={{ fontSize: "clamp(32px, 6vw, 52px)", color: C.text, letterSpacing: "-0.03em" }}
          >
            함께 만들어요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-sm font-light mb-10 max-w-sm mx-auto"
            style={{ color: C.muted }}
          >
            새로운 프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-3"
          >
            <motion.a
              href="mailto:hello@portfolio.dev"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:brightness-110"
              style={{ background: C.accent, color: C.bg }}
            >
              <Mail className="w-3.5 h-3.5" /> 이메일 보내기
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-lg transition-all duration-200"
              style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
