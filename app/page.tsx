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
        description="그루밋 남성 헤어 무료 컨설팅 이벤트에 참여해보세요!"
        ctaText="무료 컨설팅 신청하기"
        ctaLocked={false}
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

      <EventSection />
    </main>
  );
}
