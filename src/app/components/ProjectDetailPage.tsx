import { useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";
import { motion } from "motion/react";
import {
  ExternalLink, Github,
  Monitor, Smartphone, Tablet,
  Globe, Palette, Type, FileText, Layers,
} from "lucide-react";
import type { Project } from "../../types";

interface ProjectDetailPageProps {
  project: Project;
  onClose: () => void;
}

interface InfoBlockProps {
  icon: ReactNode;
  label: string;
  accent: string;
  full?: boolean;
  children: ReactNode;
}

const D = {
  bg:      "#1a1a24",
  surface: "#22222e",
  surface2:"#2a2a38",
  border:  "rgba(255,255,255,0.08)",
  text:    "#e8e8f0",
  sub:     "#9999bb",
  muted:   "#6a6a88",
} as const;

function InfoBlock({ icon, label, accent, full, children }: InfoBlockProps) {
  const style: CSSProperties = {
    background: D.surface,
    border: `1px solid ${D.border}`,
    borderRadius: 8,
    padding: "20px 24px",
  };
  if (full) style.gridColumn = "1 / -1";
  return (
    <div style={style}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ color: accent }}>{icon}</span>
        <span style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase" as const,
          color: accent,
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function ProjectDetailPage({ project, onClose }: ProjectDetailPageProps) {
  const d = project.detail;
  const accent = project.accent;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!d) return null;

  const demoHref   = d.demoUrl   ?? project.demoUrl;
  const sourceHref = d.sourceUrl ?? project.sourceUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: D.bg, minHeight: "calc(100vh - 60px)" }}
    >
      {/* ── 히어로 ── */}
      <div style={{ position: "relative", height: 400, overflow: "hidden" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
        }} />

        <div style={{ position: "absolute", bottom: 40, left: 52, maxWidth: 540 }}>
          {/* 히어로 뱃지 */}
          {demoHref ? (
            <a
              href={demoHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Space Grotesk', monospace",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                padding: "5px 12px",
                background: accent, color: "#fff",
                borderRadius: 2, marginBottom: 14,
                textDecoration: "none", opacity: 0.92,
              }}
            >
              <ExternalLink style={{ width: 12, height: 12 }} />
              {demoHref.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <span style={{
              display: "inline-block",
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              padding: "5px 12px",
              background: "rgba(255,255,255,0.15)", color: "#fff",
              borderRadius: 2, marginBottom: 14,
            }}>
              _{project.id} · {project.category}
            </span>
          )}

          <h1 style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            marginBottom: 8,
          }}>
            {project.title}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{project.subtitle}</p>
        </div>
      </div>

      {/* ── 본문 ── */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "48px 48px 80px" }}>

        {/* 배포 링크 + 소스 버튼 */}
        <div style={{
          display: "flex", flexDirection: "column" as const, gap: 16, marginBottom: 36,
          paddingBottom: 32, borderBottom: `1px solid ${D.border}`,
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const }}>
            {demoHref ? (
              <>
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 700,
                    padding: "12px 28px",
                    background: accent, color: "#fff",
                    borderRadius: 4, textDecoration: "none",
                  }}
                >
                  <ExternalLink style={{ width: 16, height: 16 }} />
                  배포 사이트 바로가기
                </a>
                <span style={{
                  fontFamily: "'Space Grotesk',monospace", fontSize: 12,
                  color: D.muted, letterSpacing: "0.02em",
                }}>
                  {demoHref}
                </span>
              </>
            ) : (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 20px",
                background: D.surface2,
                border: `1px solid ${D.border}`,
                borderRadius: 4,
              }}>
                <span style={{ fontSize: 16 }}>🚧</span>
                <span style={{
                  fontFamily: "'Space Grotesk',monospace", fontSize: 13,
                  color: D.sub,
                }}>
                  이 프로젝트는 배포된 프로젝트가 아닙니다.
                </span>
              </div>
            )}
            {sourceHref ? (
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 600,
                  padding: "12px 28px",
                  background: "transparent", color: D.sub,
                  border: `1px solid ${D.border}`,
                  borderRadius: 4, textDecoration: "none",
                }}
              >
                <Github style={{ width: 16, height: 16 }} />
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        {/* 기본 메타 그리드 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 14, marginBottom: 24,
        }}>
          {[
            { label: "기여도",      value: "100% (개인작업)" },
            { label: "제작 기간",   value: `${project.year}` },
            { label: "제작 페이지", value: d.pages.join(" · ") },
            { label: "사용 기술",   value: d.techStack.slice(0, 4).join(", ") + (d.techStack.length > 4 ? " 외" : "") },
          ].map(m => (
            <div key={m.label} style={{
              background: D.surface, border: `1px solid ${D.border}`,
              borderRadius: 8, padding: "20px 24px",
            }}>
              <div style={{
                fontFamily: "'Space Grotesk',monospace", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase" as const,
                color: D.muted, marginBottom: 8,
              }}>
                {m.label}
              </div>
              <div style={{ fontSize: 13, color: D.text, lineHeight: 1.6 }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* 작업 프로세스 + 키워드 */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 8, padding: 36,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 40, marginBottom: 24,
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase" as const,
              color: accent, marginBottom: 20,
            }}>
              작업 프로세스
            </div>
            {[
              { label: "01 분석",  text: "프로젝트 대상을 분석하고 사용자 관점에서 강점과 약점을 파악했습니다." },
              { label: "02 약점",  text: "기존 레이아웃에서 개선이 필요한 부분 — 정보 구조·시각적 위계·반응형 대응 등을 도출했습니다." },
              { label: "03 보완",  text: "도출한 문제를 해결하는 방향으로 레이아웃을 재설계하고 컨셉에 맞는 UI를 적용했습니다." },
            ].map(item => (
              <div key={item.label} style={{
                display: "grid", gridTemplateColumns: "80px 1fr", gap: 12,
                padding: "14px 0", borderBottom: `1px solid ${D.border}`,
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk',monospace", fontSize: 11,
                  fontWeight: 700, color: accent,
                }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.65, color: D.sub }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase" as const,
              color: accent, marginBottom: 20,
            }}>
              핵심 키워드
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginBottom: 28 }}>
              {["이미지 강조", "심플함", "시원함"].map((k, i) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i > 0 && <span style={{ color: D.muted, fontSize: 18 }}>+</span>}
                  <div style={{
                    width: 96, height: 96, borderRadius: "50%",
                    border: `2px solid ${D.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk',monospace", fontSize: 12,
                    fontWeight: 700, color: D.text, textAlign: "center" as const,
                  }}>
                    {k}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase" as const,
              color: D.muted, marginBottom: 10,
            }}>
              KEY
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: D.sub }}>{d.concept}</p>
          </div>
        </div>

        {/* KEY / FONTS / COLOR */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 8, padding: 36,
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 32, marginBottom: 24,
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 700,
              borderBottom: `2px solid ${D.text}`, paddingBottom: 10, marginBottom: 16, color: D.text,
            }}>KEY</div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: D.sub }}>{d.overview}</p>
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 700,
              borderBottom: `2px solid ${D.text}`, paddingBottom: 10, marginBottom: 16, color: D.text,
            }}>FONTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["Black", "Bold", "Medium", "Regular", "Light", "Thin"].map((w, i) => (
                <div key={w} style={{
                  fontSize: 13 - i * 0.4,
                  fontWeight: i === 0 ? 900 : i === 1 ? 700 : i === 2 ? 500 : 400,
                  color: i > 3 ? D.muted : D.text,
                  padding: "5px 0", borderBottom: `1px solid ${D.border}`,
                }}>
                  {d.typography} {w}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 700,
              borderBottom: `2px solid ${D.text}`, paddingBottom: 10, marginBottom: 16, color: D.text,
            }}>COLOR</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10 }}>
              {d.mainColors.map((color) => (
                <div key={color} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: color, border: `1px solid ${D.border}`,
                  }} />
                  <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 8, color: D.muted }}>{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 정보 블록 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          <InfoBlock icon={<Layers className="w-3.5 h-3.5" />} label="사용 기술" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {d.techStack.map(t => (
                <span key={t} style={{
                  fontFamily: "'Space Grotesk',monospace", fontSize: 10, padding: "3px 10px",
                  background: `${accent}20`, color: accent,
                  border: `1px solid ${accent}40`, borderRadius: 2,
                }}>{t}</span>
              ))}
            </div>
          </InfoBlock>

          <InfoBlock icon={<FileText className="w-3.5 h-3.5" />} label="제작 페이지" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {d.pages.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 12, color: D.sub }}>{p}</span>
                </div>
              ))}
            </div>
          </InfoBlock>

          <InfoBlock icon={<Globe className="w-3.5 h-3.5" />} label="크로스브라우징" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {d.crossBrowsing.map(b => (
                <span key={b} style={{
                  fontFamily: "'Space Grotesk',monospace", fontSize: 10, padding: "3px 10px",
                  border: `1px solid ${D.border}`, color: D.sub, borderRadius: 2,
                }}>{b}</span>
              ))}
            </div>
          </InfoBlock>

          <InfoBlock icon={<Monitor className="w-3.5 h-3.5" />} label="반응형" accent={accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {d.responsive.map((r, i) => {
                const Icon = i === 0 ? Smartphone : i === 1 ? Tablet : Monitor;
                return (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon className="w-3 h-3" style={{ color: accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 12, color: D.sub }}>{r}</span>
                  </div>
                );
              })}
            </div>
          </InfoBlock>

          <InfoBlock icon={<Palette className="w-3.5 h-3.5" />} label="메인 컬러" accent={accent}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10, marginTop: 4 }}>
              {d.mainColors.map(color => (
                <div key={color} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 4, background: color, border: `1px solid ${D.border}` }} />
                  <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 8, color: D.muted }}>{color}</span>
                </div>
              ))}
            </div>
          </InfoBlock>

          <InfoBlock icon={<Type className="w-3.5 h-3.5" />} label="타이포그래피" accent={accent}>
            <div style={{ marginTop: 8 }}>
              <p style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 22, fontWeight: 700, color: D.text }}>{d.typography}</p>
              <p style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 11, color: D.muted, marginTop: 4 }}>가나다 ABC 123</p>
            </div>
          </InfoBlock>
        </div>

        {/* 컨셉 */}
        <InfoBlock icon={<FileText className="w-3.5 h-3.5" />} label="디자인 컨셉" accent={accent} full>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: D.sub, marginTop: 4 }}>{d.concept}</p>
        </InfoBlock>

        <div style={{ height: 24 }} />

        {/* 섹션별 기능 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "'Space Grotesk',monospace", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase" as const,
            color: accent, marginBottom: 16,
          }}>
            각 섹션별 기능 설명
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.sections.map((sec, i) => (
              <motion.div
                key={sec.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  background: D.surface, border: `1px solid ${D.border}`,
                  borderRadius: 8, padding: "18px 24px",
                  display: "grid", gridTemplateColumns: "44px 1fr",
                  gap: 16, alignItems: "start",
                }}
              >
                <div style={{
                  width: 36, height: 36, background: accent,
                  borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk',monospace", fontSize: 12, fontWeight: 700, color: "#fff",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 14, fontWeight: 600, color: D.text, marginBottom: 4 }}>
                    {sec.name}
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: D.sub }}>{sec.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE 섹션 */}
        <div style={{
          background: "#111118", borderRadius: 8,
          padding: "48px 40px", marginBottom: 32,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 40, alignItems: "center",
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',monospace", fontSize: 42, fontWeight: 900,
              color: "#fff", letterSpacing: "-0.03em", textTransform: "uppercase" as const, marginBottom: 16,
            }}>MOBILE</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666" }}>
              반응형 웹사이트로 제작되어 모바일 환경에서도 손쉽게 정보들을 확인할 수 있도록 제작하였으며,
              필수 UI는 모바일 환경에서도 모두 확인이 가능하도록 배치하였습니다.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "flex-end" }}>
            {[0, 1, 2].map(i => (
              <img key={i} src={project.image} alt="mobile" style={{
                width: "30%", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                objectFit: "cover" as const, aspectRatio: "9/16",
              }} />
            ))}
          </div>
        </div>

        {/* 하단 링크 */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const, paddingTop: 24, borderTop: `1px solid ${D.border}` }}>
          {demoHref ? (
            <>
              <a
                href={demoHref}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 700,
                  padding: "12px 28px", background: accent, color: "#fff",
                  borderRadius: 4, textDecoration: "none",
                }}
              >
                <ExternalLink style={{ width: 16, height: 16 }} /> 배포 사이트 바로가기
              </a>
              <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 12, color: D.muted }}>
                {demoHref}
              </span>
            </>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px",
              background: D.surface2, border: `1px solid ${D.border}`, borderRadius: 4,
            }}>
              <span style={{ fontSize: 16 }}>🚧</span>
              <span style={{ fontFamily: "'Space Grotesk',monospace", fontSize: 13, color: D.sub }}>
                이 프로젝트는 배포된 프로젝트가 아닙니다.
              </span>
            </div>
          )}
          {sourceHref && (
            <a
              href={sourceHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "'Space Grotesk',monospace", fontSize: 13, fontWeight: 600,
                padding: "12px 28px",
                background: "transparent", color: D.sub,
                border: `1px solid ${D.border}`, borderRadius: 4, textDecoration: "none",
              }}
            >
              <Github style={{ width: 16, height: 16 }} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}