"use client";

import { useRouter } from "next/navigation";
import { AnimatedMarqueeHero } from "@/components/main/hero/AnimatedMarqueeHero";
import { EventSection } from "@/components/main/EventSection";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <AnimatedMarqueeHero
        tagline="무료 헤어 컨설팅 신청"
        title="GROOMEET"
        subtitle="Hair Consulting"
        description="친구 초대하고 무료 컨설팅 받기"
        ctaText="무료 컨설팅 신청하기"
        ctaLocked={false}
        // 이거 false로 바꾼게 추천인코드 입력한 상태고 true가 입력하지 않은 상태
        onCtaClick={() => router.push("/apply")}
        images={[
          "/images/133013132044.jpg",
          "/images/20140902_4_16526.jpg",
          "/images/22KYDG6SST_1.jpg",
          "/images/ch0rQ1714383581.webp",
          "/images/mck_58ae3809b82b6.jpg",
          "/images/MMIsZ1716876542.webp",
          "/images/QS1kZjBpcHVZUGNyZmFwbnhjUGxH.jpeg",
          "/images/QWI3cXdmY3FsRU01OVZHQjNhRXg1.jpeg",
          "/images/tai00270000001.jpg",
          "/images/Y21JeTl2dGlSWTRleXhaX0x4YldB.jpeg",
          "/images/다운로드.webp",
          "/images/리젠트컷2.jpg",
        ]}
      />

      <EventSection unlocked={!false} />
      {/* unlocked: ctaLocked의 반대값. true면 컨설팅지 확인하기 버튼 표시 */}
      {/* {ctaLocked={false} + unlocked={true} → 활성 상태} */}
      {/* {ctaLocked={true} + unlocked={false} → 잠금 상태} */}
    </main>
  );
}
