import { AnimatedMarqueeHero } from "@/components/main/hero/AnimatedMarqueeHero";

// 가위 SVG — 두 날이 교차하고 아래에 손잡이 링
const ScissorsSVG = () => (
  <svg
    width="180"
    height="240"
    viewBox="0 0 180 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blade 1: top-left → bottom-right ring */}
    <line
      x1="30" y1="15" x2="130" y2="200"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    />
    {/* Blade 2: top-right → bottom-left ring */}
    <line
      x1="150" y1="15" x2="50" y2="200"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    />
    {/* Pivot screw */}
    <circle cx="90" cy="126" r="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    {/* Ring 1 (lower-right) */}
    <circle cx="130" cy="210" r="20" stroke="currentColor" strokeWidth="1.8" fill="none" />
    {/* Ring 2 (lower-left) */}
    <circle cx="50" cy="210" r="20" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

// 빗 SVG — 등판과 이빨
const CombSVG = () => (
  <svg
    width="200"
    height="72"
    viewBox="0 0 200 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Spine */}
    <rect x="4" y="4" width="192" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
    {/* Teeth */}
    {[16, 34, 52, 70, 88, 106, 124, 142, 160, 178].map((x) => (
      <line
        key={x}
        x1={x} y1="28" x2={x} y2="68"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
    ))}
  </svg>
);

// 추상 헤어라인 — 수평 선 패턴
const HairLinesSVG = () => (
  <svg
    width="200"
    height="120"
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[0, 16, 32, 48, 64, 80].map((y, i) => (
      <line
        key={y}
        x1="0" y1={y} x2={160 - i * 12} y2={y}
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"
        opacity={1 - i * 0.12}
      />
    ))}
  </svg>
);

export default function Home() {
  return (
    <main>
      <AnimatedMarqueeHero
        tagline="남성 전용 헤어 컨설팅 서비스"
        title="GROOMEET Hair Consulting"
        description="당신의 개성을 살리는 헤어스타일을 전문 컨설턴트가 1:1로 제안합니다. 간단한 신청서 하나로 시작하세요."
        ctaText="무료 상담 신청하기"
        images={[
          "/images/hair-1.jpg",
          "/images/hair-2.jpg",
          "/images/hair-3.jpg",
          "/images/hair-4.jpg",
          "/images/hair-5.jpg",
          "/images/hair-6.jpg",
        ]}
        decorations={
          <>
            {/* 가위 — 우상단 */}
            <div className="absolute top-10 right-8 md:right-20 opacity-[0.07] rotate-[18deg] text-white">
              <ScissorsSVG />
            </div>

            {/* 빗 — 좌상단 */}
            <div className="absolute top-16 left-8 md:left-20 opacity-[0.07] -rotate-[10deg] text-white">
              <CombSVG />
            </div>

            {/* 헤어라인 — 우하단 */}
            <div className="absolute bottom-40 right-8 md:right-20 opacity-[0.07] text-white">
              <HairLinesSVG />
            </div>
          </>
        }
      />
    </main>
  );
}
