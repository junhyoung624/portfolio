import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { SectionHeading } from "../shared/SectionHeading";
import { ProjectFilter } from "../shared/ProjectFilter";
import { ProjectSlideCard } from "../shared/ProjectSlideCard";
import { C } from "../../theme";
import { FILTER_CATEGORIES } from "../../../types/constants";
import type { Project, ProjectCategory } from "../../../types";

interface ProjectsProps {
  activeFilter: ProjectCategory;
  onChangeFilter: (cat: ProjectCategory) => void;
  filteredProjects: Project[];
  onOpenDetail: (p: Project) => void;
}

// ── PROJECTS ─────────────────────────────────────────────────
export function Projects({ activeFilter, onChangeFilter, filteredProjects, onOpenDetail }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="Selected Work" title="프로젝트" />

        {/* 카테고리 필터 */}
        <ProjectFilter
          categories={FILTER_CATEGORIES}
          active={activeFilter}
          onChange={onChangeFilter}
        />

        {/* Swiper 슬라이더 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  prevEl: ".swiper-btn-prev",
                  nextEl: ".swiper-btn-next",
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-bullet",
                  bulletActiveClass: "swiper-bullet-active",
                }}
                breakpoints={{
                  640:  { slidesPerView: 1.4, spaceBetween: 16 },
                  768:  { slidesPerView: 2,   spaceBetween: 18 },
                  1024: { slidesPerView: 2.5, spaceBetween: 20 },
                }}
                className="pb-12"
                a11y={{ prevSlideMessage: "이전 프로젝트", nextSlideMessage: "다음 프로젝트" }}
              >
                {filteredProjects.map((project, i) => (
                  <SwiperSlide key={project.id} style={{ height: "auto" }}>
                    <ProjectSlideCard project={project} index={i} onOpenDetail={onOpenDetail} />
                  </SwiperSlide>
                ))}

                {/* 커스텀 내비게이션 버튼 */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <button
                      className="swiper-btn-prev w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200"
                      style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                      aria-label="이전"
                    >
                      ←
                    </button>
                    <button
                      className="swiper-btn-next w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200"
                      style={{ border: `1px solid ${C.subtle}`, color: C.muted }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.muted; }}
                      aria-label="다음"
                    >
                      →
                    </button>
                  </div>
                </div>
              </Swiper>
            ) : (
              <p className="font-mono text-sm text-center py-16" style={{ color: C.muted }}>
                해당 카테고리의 프로젝트가 없습니다.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
