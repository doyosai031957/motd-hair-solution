"use client";

import { motion } from "framer-motion";

interface ConsultingSheetData {
  nickname: string;
  date: string;
  content: string;
  designer: string;
  designerTitle: string;
  photos: string[];
}

const SAMPLE_SHEET: ConsultingSheetData = {
  nickname: "도요새",
  date: "2025.02.24",
  content:
    "안녕하세요! 보내주신 사진을 확인했습니다.\n\n현재 얼굴형과 모발 상태를 고려했을 때, 사이드를 짧게 정리하고 윗머리에 볼륨을 살리는 투블럭 스타일을 추천드립니다. 앞머리는 이마를 살짝 덮는 정도로 내려주시면 얼굴 비율이 더 좋아 보일 거예요.\n\n스타일링 팁: 왁스를 소량 사용해서 윗머리를 자연스럽게 세워주시면 됩니다.",
  designer: "김민수 디자이너",
  designerTitle: "GROOMEET 헤어 컨설턴트",
  photos: ["/images/리젠트컷2.jpg", "/images/다운로드.webp"],
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export const ConsultingSheet = () => {
  const sheet = SAMPLE_SHEET;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더: 닉네임 + 날짜 */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {sheet.nickname}
            <span className="text-muted-foreground font-normal text-sm ml-2">
              님의 컨설팅지
            </span>
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">{sheet.date}</span>
      </motion.div>

      {/* 본문 */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-5"
      >
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {sheet.content}
        </p>
      </motion.div>

      {/* 디자이너 프로필 카드 */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3"
      >
        <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-blue-400"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{sheet.designer}</p>
          <p className="text-xs text-muted-foreground">{sheet.designerTitle}</p>
        </div>
      </motion.div>

      {/* 참고 사진 */}
      {sheet.photos.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            참고 스타일
          </p>
          <div className="grid grid-cols-2 gap-2">
            {sheet.photos.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] rounded-xl border border-border overflow-hidden"
              >
                <img
                  src={src}
                  alt={`참고 사진 ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
