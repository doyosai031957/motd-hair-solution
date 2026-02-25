"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { use } from "react";

/* ──────────────────────────────────────────────
 * TODO: API 연동 시 아래 샘플 데이터를 API 응답으로 교체
 * API Endpoint (예정): GET /api/consulting/cards/{id}
 *
 * [비즈니스 로직]
 * - 이 페이지 진입 = 해당 전문가에게 30분 독점 권한이 할당된 상태
 * - "보내기" 클릭 → 컨설팅 내용 + 추천 헤어 사진 제출
 *   API Endpoint (예정): POST /api/consulting/cards/{id}/submit
 * - 30분 내 미제출 시 권한 해제, 메인 리스트에 다시 노출
 * ────────────────────────────────────────────── */

const SAMPLE_IMAGE =
  "https://www.figma.com/api/mcp/asset/fda3c0b2-5927-4c5b-bcbd-5b31a89f6efb";

/** 하드코딩 고객 데이터 (TODO: API로 교체) */
const MOCK_CUSTOMER: Record<
  string,
  {
    customerName: string;
    date: string;
    userImages: string[]; // 유저 본인 사진 (정면, 정수리 등)
    designImages: string[]; // 추구하는 디자인 사진
    usesHairProduct: boolean;
    prefersForehead: boolean;
  }
> = {
  "1": {
    customerName: "뿡순이",
    date: "2024-02-14",
    userImages: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    designImages: [SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: true,
  },
  "2": {
    customerName: "준혁이",
    date: "2024-02-14",
    userImages: [SAMPLE_IMAGE, SAMPLE_IMAGE],
    designImages: [SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: false,
  },
  "3": {
    customerName: "민수",
    date: "2024-02-15",
    userImages: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    designImages: [SAMPLE_IMAGE],
    usesHairProduct: false,
    prefersForehead: true,
  },
};

/* ──────────────────────────────────────────────
 * 컨설팅지 작성 페이지
 * ────────────────────────────────────────────── */
export default function ConsultingWritePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  /* TODO: API에서 고객 데이터를 불러오는 로직으로 교체 */
  const customer = MOCK_CUSTOMER[id];

  /* TODO: 남은 시간은 실제로는 서버에서 권한 할당 시점 기준으로 계산해야 함
   * API 응답에서 claimedAt(권한 할당 시각)을 받아와서 30분 - 경과시간으로 계산 */
  const TIMER_DURATION = 30 * 60; // 30분 (초 단위)
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          /* TODO: 시간 만료 시 권한 해제 API 호출 후 메인 페이지로 이동
           * await fetch(`/api/consulting/cards/${id}/release`, { method: 'POST' });
           * router.push('/');
           */
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = remainingSeconds <= 5 * 60; // 5분 이하면 긴급 표시

  const [consultingText, setConsultingText] = useState("");
  const [attachedImages, setAttachedImages] = useState<
    { file: File; preview: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** 사진 첨부 핸들러 */
  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachedImages((prev) => [...prev, ...newImages]);

    // input 초기화 (같은 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /** 첨부 이미지 삭제 핸들러 */
  const handleRemoveImage = (index: number) => {
    setAttachedImages((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  /** 보내기 핸들러 */
  const handleSubmit = () => {
    /* TODO: API 호출로 교체
     * const formData = new FormData();
     * formData.append('consultingText', consultingText);
     * attachedImages.forEach((img, i) => {
     *   formData.append(`hairDesign_${i}`, img.file);
     * });
     * await fetch(`/api/consulting/cards/${id}/submit`, {
     *   method: 'POST',
     *   body: formData,
     * });
     */
    alert("컨설팅지가 전송되었습니다! (API 연동 전 임시 알림)");
  };

  /* 존재하지 않는 ID 처리 */
  if (!customer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#475569]">
            존재하지 않는 컨설팅 요청입니다.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-[13px] font-medium text-[#3b82f6]"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-[480px] px-5 pb-8">
        {/* ── 상단 네비게이션 ── */}
        <nav className="sticky top-0 z-10 -mx-5 bg-[#f8fafc]/95 px-5 pt-4 pb-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#e2e8f0] active:scale-95"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <h1 className="text-[17px] font-bold text-[#0f172a]">
              컨설팅지 작성
            </h1>
          </div>
        </nav>

        {/* ── 고객 정보 요약 ── */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <span className="rounded-full bg-[#3b82f6] px-3 py-[5px] text-[11px] font-bold tracking-wide text-white">
              {customer.customerName}
            </span>
            <span className="text-[13px] font-medium text-[#94a3b8]">
              {customer.date}
            </span>
          </div>

          {/* 유저 사진 */}
          <div className="px-4 pb-1">
            <span className="text-[12px] font-semibold text-[#64748b]">
              유저사진
            </span>
          </div>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">
            {customer.userImages.map((src: string, i: number) => (
              <div
                key={i}
                className="relative aspect-[4/5] w-[28%] min-w-[100px] max-w-[140px] shrink-0 overflow-hidden rounded-xl bg-[#f1f5f9]"
              >
                <Image
                  src={src}
                  alt={`${customer.customerName} 유저 사진 ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 28vw, 140px"
                />
              </div>
            ))}
          </div>

          {/* 추구하는 디자인 */}
          <div className="px-4 pb-1">
            <span className="text-[12px] font-semibold text-[#64748b]">
              추구하는 디자인
            </span>
          </div>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">
            {customer.designImages.map((src: string, i: number) => (
              <div
                key={i}
                className="relative aspect-[4/5] w-[28%] min-w-[100px] max-w-[140px] shrink-0 overflow-hidden rounded-xl bg-[#f1f5f9]"
              >
                <Image
                  src={src}
                  alt={`추구하는 디자인 ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 28vw, 140px"
                />
              </div>
            ))}
          </div>

          {/* 고객 정보 태그 */}
          <div className="flex gap-2 px-4 pb-4">
            <div
              className={`flex flex-1 items-center justify-center rounded-lg py-2 ${customer.usesHairProduct
                ? "bg-[#eff6ff] text-[#3b82f6]"
                : "bg-[#f1f5f9] text-[#94a3b8]"
                }`}
            >
              <span className="text-[12px] font-semibold sm:text-[13px]">
                헤어 제품{" "}
                {customer.usesHairProduct ? "사용 O" : "미사용 X"}
              </span>
            </div>
            <div
              className={`flex flex-1 items-center justify-center rounded-lg py-2 ${customer.prefersForehead
                ? "bg-[#eff6ff] text-[#3b82f6]"
                : "bg-[#f1f5f9] text-[#94a3b8]"
                }`}
            >
              <span className="text-[12px] font-semibold sm:text-[13px]">
                이마 노출{" "}
                {customer.prefersForehead ? "선호 O" : "비선호 X"}
              </span>
            </div>
          </div>
        </section>

        {/* ── 컨설팅 내용 입력 ── */}
        <section className="mt-4 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[13px] font-bold text-[#0f172a]">
              컨설팅 내용
            </label>
            {/* 남은 시간 표시 */}
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums ${
                isUrgent
                  ? "bg-[#fef2f2] text-[#ef4444]"
                  : "bg-[#f1f5f9] text-[#64748b]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 3.5V6L7.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {timerText}
            </span>
          </div>
          <textarea
            value={consultingText}
            onChange={(e) => setConsultingText(e.target.value)}
            placeholder="사용자님에게 전달할 헤어 컨설팅 내용을 작성해주세요.&#10;&#10;예) 현재 헤어 스타일 분석, 추천 스타일, 관리 방법 등"
            className="w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[14px] leading-[1.7] text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#3b82f6] focus:bg-white"
            rows={8}
          />
        </section>

        {/* ── 추천 헤어 디자인 사진 첨부 ── */}
        <section className="mt-4 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <label className="mb-3 block text-[13px] font-bold text-[#0f172a]">
            추천 헤어 디자인
          </label>

          <div className="flex flex-wrap gap-2">
            {/* 첨부된 이미지 미리보기 */}
            {attachedImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square w-[calc(33.333%-6px)] overflow-hidden rounded-xl bg-[#f1f5f9]"
              >
                <Image
                  src={img.preview}
                  alt={`추천 헤어 ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 30vw, 140px"
                />
                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white transition-opacity"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* 사진 추가 버튼 */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square w-[calc(33.333%-6px)] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#cbd5e1] bg-[#f8fafc] transition-colors hover:border-[#3b82f6] hover:bg-[#eff6ff] active:scale-[0.98]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] font-medium text-[#94a3b8]">
                사진 추가
              </span>
            </button>
          </div>

          {/* 숨겨진 파일 입력 */}
          {/* TODO: 실제 서비스에서는 이미지 리사이징/압축 처리 필요 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageAttach}
            className="hidden"
          />
        </section>

        {/* ── 보내기 버튼 ── */}
        {/* TODO: API 연동 후 실제 제출 로직으로 교체 */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!consultingText.trim()}
            className="w-full rounded-xl bg-[#3b82f6] py-3.5 text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)] transition-all hover:bg-[#2563eb] active:scale-[0.98] disabled:bg-[#cbd5e1] disabled:shadow-none"
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}
