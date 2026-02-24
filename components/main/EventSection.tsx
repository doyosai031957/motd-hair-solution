"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const REFERRAL_CODE = "GROOMEET2025";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "친구 가입 후 버튼 활성화",
    description:
      "추천인 코드를 통해 친구가 가입하면 '컨설팅 신청하기' 버튼이 활성화돼요.",
  },
  {
    step: "02",
    title: "디자이너가 컨설팅지 발송",
    description:
      "컨설팅 신청을 진행 후 1~3일 내로 헤어 디자이너가 컨설팅지를 보내드려요.",
  },
  {
    step: "03",
    title: "앱 푸시 알림으로 확인",
    description:
      "앱 내 푸시를 통해 도착 시 알림을 보내드리니 알림을 꼭 켜놓아 주세요.",
  },
];

const STEPS = [
  {
    step: "01",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M17 20h5v-2a4 4 0 0 0-4-4h-1" />
        <path d="M9 20H4v-2a4 4 0 0 1 4-4h1" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11v3m0 0-2 2m2-2 2 2" />
      </svg>
    ),
    title: "추천인 코드로 친구 초대",
    description: "나만의 추천인 코드를 친구에게 공유하세요.",
  },
  {
    step: "02",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "둘 다 무료 컨설팅",
    description: "친구와 나, 모두 전문 디자이너의 1:1 헤어 컨설팅을 무료로 받을 수 있어요.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export const EventSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 w-full bg-background px-4 -mt-[10vh] pb-16">
      {/* 섹션 헤더 */}
      <div className="mx-auto max-w-md text-center mb-8">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
          Events
        </p>
        <h2 className="text-3xl font-bold text-foreground leading-tight">
          이벤트 소개
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          추천인코드만 입력해도 실제 디자이너들이 <br /> 1:1로 컨설팅을 제공합니다.
        </p>
      </div>

      {/* 참여 방법 */}
      <div className="mx-auto max-w-md">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-5">
          참여 방법
        </p>

        <div className="flex flex-col gap-3">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              {/* 아이콘 */}
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
                {item.icon}
              </div>

              {/* 텍스트 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-blue-400">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 진행 방식 */}
      <div className="mx-auto max-w-md mt-10">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-5">
          진행 방식
        </p>

        <div className="flex flex-col">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              className="flex gap-4"
            >
              {/* 스텝 라인 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-500/40 bg-blue-500/10 shrink-0">
                  <span className="text-xs font-mono text-blue-400">{item.step}</span>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="w-px flex-1 bg-border my-1" />
                )}
              </div>

              {/* 텍스트 */}
              <div className={`pb-6 ${i === HOW_IT_WORKS.length - 1 ? "pb-0" : ""}`}>
                <h3 className="text-sm font-semibold text-foreground mb-1 mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* 추천인 코드 */}
      <div className="mx-auto max-w-md mt-10 text-center">
        <h3 className="text-xl font-bold text-foreground mb-5">
          추천인 코드
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={handleCopy}
          className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 cursor-pointer active:opacity-70 transition-opacity"
        >
          <span className="font-mono text-lg font-semibold tracking-widest text-foreground">
            {REFERRAL_CODE}
          </span>

          <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-blue-400">
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                복사됨
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                복사
              </>
            )}
          </div>
        </motion.div>

        <p className="mt-3 text-xs text-muted-foreground">
          위 코드를 친구에게 공유해보세요
        </p>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 mt-6">
          <button className="w-full py-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/40 text-blue-400 text-sm font-semibold hover:bg-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            친구 초대하기
          </button>
          <button className="w-full py-3.5 rounded-2xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all">
            컨설팅지 확인하기
          </button>
        </div>
      </div>
    </section>
  );
};
