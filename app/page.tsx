"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedMarqueeHero } from "@/components/main/hero/AnimatedMarqueeHero";
import { CodeModal } from "@/components/main/CodeModal";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <AnimatedMarqueeHero
        tagline="무료 헤어 컨설팅 신청"
        title="GROOMEET"
        subtitle="Hair Consulting"
        description="그루밋 남성 헤어 무료 컨설팅 이벤트에 참여해보세요!"
        ctaText="무료 컨설팅 신청하기"
        onCtaClick={() => setIsModalOpen(true)}
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

      <CodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(code) => {
          setIsModalOpen(false);
          router.push(`/apply?code=${encodeURIComponent(code)}`);
        }}
      />
    </main>
  );
}
