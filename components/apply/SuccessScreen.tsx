"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const SuccessScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex flex-col items-center text-center gap-6 py-16"
    >
      {/* Checkmark icon */}
      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        컨설팅 신청이 완료되었습니다
      </h2>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          컨설팅은 최대 1~3일 정도 소요되며
          <br />
          완료 시 앱 푸시를 통해 알려드리니
          <br />꼭 알림을 켜주세요.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          컨설팅이 완료되면
          <br />앱 내부 마이페이지에서 확인이 가능합니다
        </p>
      </div>

      <Link
        href="/"
        className="mt-4 rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        홈으로 돌아가기
      </Link>
    </motion.div>
  );
};
