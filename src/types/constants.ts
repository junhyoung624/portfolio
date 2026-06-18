import { Zap, Layers, Code2 } from "lucide-react";
import type { Project, Skill, ToolBadge, HeroStat, NavItem, AboutFeature, ProjectCategory } from "./index";

export const NAV_ITEMS: NavItem[] = ["Skills", "Projects", "Contact"];

export const FILTER_CATEGORIES: ProjectCategory[] = [
  "All", "Web Renewal", "SPA Development", "Full-Stack",
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "롯데시네마",
    subtitle: "Web Renewal",
    description: "HTML, CSS, JavaScript를 활용하여 롯데시네마 웹사이트를 현대적인 디자인으로 재구성했습니다.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    techColors: ["#E34F26", "#1572B6", "#F7DF1E"],
    image: "images/lotte.png",
    accent: "#DA0922",
    year: "2025",
    category: "Web Renewal",
    detail: {
      title: "롯데시네마 리뉴얼",
      techStack: ["HTML5", "CSS3", "JavaScript", "Swiper.js", "GSAP"],
      pages: ["메인(index)", "영화 목록", "영화 상세", "예매", "이벤트"],
      crossBrowsing: ["Chrome", "Safari", "Edge", "Firefox"],
      responsive: ["모바일 (360px~)", "태블릿 (768px~)", "데스크탑 (1280px~)"],
      concept: "롯데시네마의 브랜드 아이덴티티인 레드 컬러를 중심으로, 영화관의 웅장하고 몰입감 있는 분위기를 다크 테마로 재해석했습니다. 기존 사이트의 복잡한 구조를 단순화하고 사용자가 빠르게 예매까지 도달할 수 있는 UX를 설계했습니다.",
      mainColors: ["#DA0922", "#1B1B1B", "#808080", "#C9C9C9", "#F9F9F9"],
      typography: "Pretendard",
      overview: "롯데시네마 웹사이트의 전반적인 UI/UX를 리뉴얼하여, 메인 배너부터 예매까지의 사용자 흐름을 개선했습니다. 반응형 레이아웃을 적용하여 모바일에서도 동일한 경험을 제공합니다.",
      sections: [
        { name: "메인(index)", desc: "히어로 배너 슬라이더, 현재 상영작 카드, 빠른 예매 UI, 이벤트 배너 섹션 구성" },
        { name: "영화 목록", desc: "현재 상영작 / 개봉 예정작 탭 전환, 장르별 필터링, 그리드 레이아웃" },
        { name: "영화 상세", desc: "포스터·스틸컷 갤러리, 줄거리, 관람 등급, 예고편 영역" },
        { name: "예매", desc: "영화 선택 → 날짜 선택 → 시간 선택 → 좌석 선택 단계별 UI" },
        { name: "이벤트", desc: "진행 중 / 종료된 이벤트 탭 분류, 카드형 이벤트 목록" },
      ],
    },
  },
  {
    id: "02",
    title: "일룸",
    subtitle: "SPA Development",
    description: "React와 Vite를 사용하여 일룸 가구 웹사이트를 SPA로 구현했습니다. 3D 뷰어, Firebase 인증, 커머스 기능을 갖춘 풀스택 수준의 프로젝트입니다.",
    tech: ["React", "Vite", "JavaScript", "SCSS", "Firebase"],
    techColors: ["#61DAFB", "#646CFF", "#F7DF1E", "#CC6699", "#FFA611"],
    image: "images/iloom.png",
    accent: "#646CFF",
    year: "2025",
    category: "SPA Development",
    demoUrl:   "https://iloom-web.netlify.app/",
    sourceUrl: "https://github.com",
    detail: {
      title: "일룸 리뉴얼",
      techStack: ["React", "Vite", "JavaScript(ES6+)", "SCSS(Sass)", "Firebase", "Zustand", "Three.js", "Kakao Map API", "React Router DOM", "Swiper", "Framer Motion"],
      pages: ["메인(index)", "상품 목록", "상품 상세", "장바구니", "결제", "마이페이지", "로그인/회원가입", "매장안내", "커스터마이즈"],
      crossBrowsing: ["Chrome", "Safari", "Edge"],
      responsive: ["모바일 (360px~)", "태블릿 (768px~)", "데스크탑 (1280px~)"],
      concept: "일룸의 브랜드 철학인 '공간을 밝히는 가구'를 메인 페이지에 반영하여, 단순 쇼핑몰이 아닌 공간 제안형 플랫폼으로 확장했습니다. Brand Philosophy · Exploration Experience · Emotional Design 세 가지 축으로 설계했습니다.",
      mainColors: ["#C70B1E", "#1B1B1B", "#808080", "#C9C9C9", "#F9F9F9"],
      typography: "Pretendard",
      overview: "React 기반 SPA로 일룸 웹사이트를 리뉴얼했습니다. Three.js 기반 3D Viewer, Firebase 인증, Zustand 전역 상태 관리, Kakao Map API 매장찾기, JSON 기반 상품 데이터 필터링 등 실서비스 수준의 기능을 구현했습니다.",
      sections: [
        { name: "메인(index)", desc: "히어로 배너, 3D 쇼룸(Three.js), 공간 제안 섹션(공간 코디 제안 + 상품 태그 UI), 베스트셀러 슬라이더, 매거진 섹션" },
        { name: "상품 목록", desc: "JSON 데이터 기반 상품 렌더링, 가격/시리즈/베스트셀러/신상품 필터, 5가지 정렬 기준, MD픽 노출" },
        { name: "상품 상세", desc: "이미지 확대 렌즈 기능, 컬러별 이미지 변환, 옵션 선택에 따른 가격 자동 계산, 찜하기·공유·장바구니·바로결제" },
        { name: "장바구니", desc: "Zustand Store 기반 수량/옵션 관리, 총금액·할인·최종 결제금액 실시간 계산, 장바구니 미리보기 팝업" },
        { name: "결제", desc: "배송지 입력(Kakao Postcode API), 쿠폰/포인트 적용, 카드·토스페이·네이버페이 결제 수단 선택" },
        { name: "마이페이지", desc: "주문/배송 상태별 조회, 배송일 변경 요청, 주문 취소, 위시리스트 폴더 관리, 회원정보 수정, 회원 탈퇴" },
        { name: "로그인/회원가입", desc: "Firebase Authentication 연동, 이메일·비밀번호 유효성 검증, 구글/카카오/네이버 소셜 로그인" },
        { name: "매장안내", desc: "Kakao Map API 기반 전국 일룸 매장 지도 표시, 지역별 퀵 필터, 매장 목록 사이드바" },
        { name: "커스터마이즈", desc: "Three.js Configurator — 모듈 행/열 추가, 도어 종류 선택(폴딩·드롭다운·슬라이딩 등), 패널·프레임 색상 선택 후 실시간 가격 반영" },
      ],
    },
  },
  {
    id: "03",
    title: "라프텔",
    subtitle: "Full-Stack",
    description: "Next.js + TypeScript로 라프텔 OTT 플랫폼을 리뉴얼했습니다. 애니메이션 스트리밍, 굿즈 이커머스, 커뮤니티, AI 챗봇을 통합한 복합 문화 플랫폼입니다.",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Firebase"],
    techColors: ["#ffffff", "#61DAFB", "#3178C6", "#38BDF8", "#FFA611"],
    image: "images/laftel.png",
    accent: "#8B5CF6",
    year: "2026",
    category: "Full-Stack",
    demoUrl:   "laftel-eta.vercel.app",
    sourceUrl: "https://github.com",
    detail: {
      title: "라프텔 리뉴얼",
      techStack: ["Next.js 15 (App Router)", "React", "TypeScript", "TailwindCSS", "Firebase / Firestore", "Zustand", "TMDB API", "iTunes API", "Groq API (llama-3.3-70b)", "Vercel"],
      pages: ["OTT 홈", "요일별 신작", "애니 상세", "태그 검색", "OST", "라이브/파티방", "스토어 홈", "상품 목록/상세", "장바구니/결제", "마이페이지", "커뮤니티", "어드민(/admin)"],
      crossBrowsing: ["Chrome", "Safari", "Edge", "모바일 웹"],
      responsive: ["모바일 (360px~)", "태블릿 (768px~)", "데스크탑 (1280px~)"],
      concept: "애니메이션 시청 공간(OTT)과 굿즈 소비 공간(스토어)의 역할을 명확히 분리한 듀얼 브랜드 방향성을 채택했습니다. OTT는 다크 모드(몰입감), 스토어는 파스텔 라이트 모드(쇼핑 감성)로 각각 독립된 시각적 경험을 제공합니다. 슬로건: '오타쿠들의 놀이터'",
      mainColors: ["#0B0816", "#1E1548", "#8B5CF6", "#D8B4FE", "#826CFF"],
      typography: "Pretendard",
      overview: "콘텐츠 시청 · 굿즈 구매 · 커뮤니티 활동을 통합한 복합 문화 플랫폼. TMDB·iTunes·Groq 외부 API를 조합하고, Firebase 실시간 DB와 Zustand 전역 상태 관리로 실서비스 수준의 데이터 흐름을 구현했습니다. 관리자 어드민 페이지까지 포함하여 실제 운영 프로세스를 반영했습니다.",
      sections: [
        { name: "OTT 홈", desc: "취향 온보딩 → 개인화 홈, 요일별 신작(DayNew) 섹션, TOP 10, 테마 섹션, 라이브 섹션, OST 섹션 구성" },
        { name: "요일별 신작", desc: "TMDB API 기반 현재 방영 중 애니 fetch, 요일 탭 자동 포커스, 방영 시간순 정렬, 연령 제한 필터 연동" },
        { name: "애니 상세", desc: "작품 정보·에피소드 목록·영상 재생, 몰입 모드(전체 UI 숨김) + 화면 잠금, 타임스탬프 댓글, 찜·북마크" },
        { name: "태그 검색", desc: "장르·태그 멀티 선택 AND 필터링, 60개씩 더보기 로드, 인기순 정렬, 실시간 결과 반영" },
        { name: "OST", desc: "iTunes API 기반 OST 데이터, OP·ED·BGM·OST 타입별 필터, 하단 고정 플레이어 연속 재생, 주간 TOP 10" },
        { name: "라이브/파티방", desc: "요일별 편성표, 파티방 생성·입장·채팅, TMDB 기반 현재 방영 중 애니 편성" },
        { name: "스토어", desc: "파스텔 라이트 모드 독립 UI, 카테고리별 굿즈 탐색, 상품카드 위시리스트·장바구니 팝업(옵션 선택 포함)" },
        { name: "장바구니/결제", desc: "Zustand 전역 장바구니, 쿠폰·포인트 적용, 결제 완료 후 주문 데이터 Firestore 저장" },
        { name: "커뮤니티", desc: "애니별 독립 커뮤니티, 스포일러 태그, 댓글, 보관함, 활동 기반 등급 뱃지(루키→고인물)" },
        { name: "어드민(/admin)", desc: "주문 상태 변경, 환불·취소 승인, 쿠폰·포인트 복구, 1:1 문의 실시간 답변·알림 발송, 매출 대시보드" },
        { name: "AI 챗봇 '라피'", desc: "Groq API(llama-3.3-70b) 자연어 처리, 장르·분위기·키워드 기반 애니 추천, TMDB 포스터 카드 시각화" },
      ],
    },
  },
];

export const SKILLS: Skill[] = [
  { name: "HTML5",      level: 90 },
  { name: "CSS3",       level: 85 },
  { name: "JavaScript", level: 88 },
  { name: "React",      level: 82 },
  { name: "Next.js",    level: 75 },
  { name: "TypeScript", level: 70 },
  { name: "Vite",       level: 80 },
  { name: "UI/UX",      level: 78 },
];

export const TOOL_BADGES: ToolBadge[] = [
  "Git", "GitHub", "Figma", "Responsive Design",
  "REST API", "Webpack", "SCSS", "Tailwind CSS",
];

export const HERO_STATS: HeroStat[] = [
  { value: "03",   label: "Projects" },
  { value: "3+",   label: "Frameworks" },
  { value: "2025", label: "Year" },
];

export const ABOUT_FEATURES: AboutFeature[] = [
  { label: "빠른 개발 속도", desc: "효율적인 컴포넌트 설계로 빠른 개발", icon: Zap },
  { label: "체계적 구조",   desc: "재사용 가능한 모듈식 아키텍처",       icon: Layers },
  { label: "클린 코드",     desc: "가독성 높고 유지보수가 쉬운 코드",     icon: Code2 },
];

export const HERO_TYPED_TEXT = "Frontend Developer_" as const;