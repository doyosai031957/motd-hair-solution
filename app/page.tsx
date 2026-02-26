"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImageLightbox from "./components/ImageLightbox";

/* ──────────────────────────────────────────────
 * TODO: API 연동 시 아래 인터페이스 및 샘플 데이터를
 * 백엔드 API 응답으로 교체할 것
 * API Endpoint (예정): GET /api/consulting/cards
 *
 * [비즈니스 로직 - 30분 권한 할당 시스템]
 * - 이 페이지는 모든 디렉터(전문가)가 공유하는 게시판
 * - 리스트에는 아직 아무 전문가도 작성하지 않은 요청만 노출됨
 * - "작성하기" 클릭 → 해당 전문가에게 30분간 독점 권한 할당
 *   → 다른 전문가에게는 해당 카드가 리스트에서 사라짐
 * - 30분 내 제출 완료 → 리스트에서 영구 제거
 * - 30분 내 미제출 → 권한 해제, 다시 전체 리스트에 노출
 * ────────────────────────────────────────────── */

/** 컨설팅 신청 카드 데이터 인터페이스 */
interface ConsultingCard {
  id: number; // 컨설팅 신청 고유 ID
  customerName: string; // 고객 닉네임/이름
  date: string; // 신청 날짜
  images: string[]; // 고객이 업로드한 헤어 사진 URL 배열
  usesHairProduct: boolean; // 헤어 제품 사용 여부
  prefersForehead: boolean; // 이마 노출 선호 여부
}

/* ──────────────────────────────────────────────
 * 하드코딩 샘플 데이터
 * TODO: 백엔드 API 완성 후 fetch로 교체
 * ────────────────────────────────────────────── */
const SAMPLE_IMAGE =
  "https://www.figma.com/api/mcp/asset/fda3c0b2-5927-4c5b-bcbd-5b31a89f6efb";

/* TODO: 실제로는 API 응답이 이미 정렬된 상태로 내려올 수 있음
 * 현재는 프론트에서 오래된 순(오름차순) 정렬 처리 */
const cards: ConsultingCard[] = [
  {
    id: 1,
    customerName: "뿡순이",
    date: "2024-02-10",
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: true,
  },
  {
    id: 2,
    customerName: "준혁이",
    date: "2024-02-14",
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: false,
  },
  {
    id: 3,
    customerName: "민수",
    date: "2024-02-18",
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: false,
    prefersForehead: true,
  },
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

/* ──────────────────────────────────────────────
 * 컨설팅 카드 아이템 컴포넌트
 * ────────────────────────────────────────────── */
function ConsultingCardItem({ card }: { card: ConsultingCard }) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#334155] bg-[#1e293b] shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      {/* 상단: 고객 이름 + 신청 날짜 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="rounded-full bg-[#3b82f6] px-3 py-[5px] text-[11px] font-bold tracking-wide text-white">
          {card.customerName}
        </span>
        <span className="text-[13px] font-medium text-[#64748b]">
          {card.date}
        </span>
      </div>

      {/* 사진 그리드 - 모바일 대응 가로 스크롤 */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">
        {card.images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/5] w-[28%] min-w-[100px] max-w-[140px] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[#334155]"
            onClick={() => setLightbox({ images: card.images, index: i })}
          >
            <Image
              src={src}
              alt={`${card.customerName} 헤어 사진 ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 28vw, 140px"
            />
          </div>
        ))}
      </div>

      {/* 고객 정보 태그 */}
      <div className="flex gap-2 px-4 pb-3">
        <div
          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 ${card.usesHairProduct
            ? "bg-[#1e3a5f] text-[#60a5fa]"
            : "bg-[#0f172a] text-[#64748b]"
            }`}
        >
          <span className="text-[12px] font-semibold sm:text-[13px]">
            헤어 제품 {card.usesHairProduct ? "사용 O" : "미사용 X"}
          </span>
        </div>
        <div
          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 ${card.prefersForehead
            ? "bg-[#1e3a5f] text-[#60a5fa]"
            : "bg-[#0f172a] text-[#64748b]"
            }`}
        >
          <span className="text-[12px] font-semibold sm:text-[13px]">
            이마 노출 {card.prefersForehead ? "선호 O" : "비선호 X"}
          </span>
        </div>
      </div>

      {/* 작성하기 버튼 */}
      {/* TODO: 클릭 시 30분 권한 할당 API 호출 후 컨설팅지 작성 페이지로 이동 */}
      {/* API Endpoint (예정): POST /api/consulting/cards/{id}/claim */}
      <div className="border-t border-[#334155] px-4 py-3">
        <Link
          href={`/consulting/${card.id}`}
          className="block w-full rounded-xl bg-[#3b82f6] py-2.5 text-center text-[14px] font-bold text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)] transition-all hover:bg-[#2563eb] active:scale-[0.98]"
        >
          작성하기
        </Link>
      </div>

      {/* 이미지 라이트박스 */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
 * 메인 페이지
 * ────────────────────────────────────────────── */
export default function Home() {
  /* TODO: API에서 카드 목록을 불러오는 로직 추가
   * const [cards, setCards] = useState<ConsultingCard[]>([]);
   * useEffect(() => {
   *   fetch('/api/consulting/cards')
   *     .then(res => res.json())
   *     .then(data => setCards(data));
   * }, []);
   */

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <main className="mx-auto max-w-[480px] px-5 pt-12 pb-8">
        {/* 헤더 영역 */}
        <header className="flex flex-col items-center gap-1.5 pb-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#64748b]">
            EVENTS
          </p>
          <h1
            className="text-[36px] leading-none text-white"
            style={{ fontFamily: "var(--font-pretendard)", fontWeight: 900 }}
          >
            GROOMEET
          </h1>
          <h2 className="mt-0.5 text-[20px] font-extrabold text-[#cbd5e1]">
            헤어 컨설팅지 작성 이벤트
          </h2>
          <p className="mt-2 text-center text-[12px] font-medium leading-[1.8] text-[#94a3b8]">
            고객들의 컨설팅 신청을 확인하고
            <br />
            컨설팅을 진행해보세요!
          </p>
        </header>

        {/* 참여 방법 & 혜택 안내 */}
        <div className="mb-6 flex flex-col gap-3">
          {/* 참여 방법 */}
          <div className="rounded-2xl border border-[#334155] bg-[#1e293b] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b82f6]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4.5 7L6.5 9L10 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[14px] font-bold text-[#f1f5f9]">참여 방법</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-[10px] font-bold text-[#60a5fa]">1</span>
                <p className="text-[13px] leading-[1.6] text-[#cbd5e1]">
                  아래 목록에서 고객의 헤어 컨설팅 요청을 확인해주세요
                </p>
              </div>
              <div className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-[10px] font-bold text-[#60a5fa]">2</span>
                <p className="text-[13px] leading-[1.6] text-[#cbd5e1]">
                  요청에 대한 컨설팅을 진행하면 자동으로 이벤트에 참여됩니다
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-[#0f172a] px-3 py-2.5">
              <p className="text-[11px] leading-[1.7] text-[#94a3b8]">
                <span className="font-semibold text-[#60a5fa]">TIP</span>{" "}
                컨설팅지를 보내면 해당 고객의 컨설팅지에 디렉터님의 프로필이 연결되고,{" "}
                <span className="font-semibold text-[#e2e8f0]">다이렉트 예약 요청 버튼</span>이 활성화됩니다
              </p>
            </div>
          </div>

          {/* 참여 혜택 */}
          <div className="rounded-2xl border border-[#334155] bg-[#1e293b] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f59e0b]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2L8.09 5.26L11.5 5.27L8.71 7.24L9.8 10.5L7 8.54L4.2 10.5L5.29 7.24L2.5 5.27L5.91 5.26L7 2Z" fill="white" />
                </svg>
              </span>
              <span className="text-[14px] font-bold text-[#f1f5f9]">참여 혜택</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#422006] text-[10px] font-bold text-[#fbbf24]">1</span>
                <p className="text-[13px] leading-[1.6] text-[#cbd5e1]">
                  <span className="font-semibold text-[#f1f5f9]">신규 고객 모객</span>{" "}
                  — 컨설팅지 작성 시 예약 연결까지 그루밋이 도움을 드립니다
                </p>
              </div>
              <div className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#422006] text-[10px] font-bold text-[#fbbf24]">2</span>
                <p className="text-[13px] leading-[1.6] text-[#cbd5e1]">
                  <span className="font-semibold text-[#f1f5f9]">서비스 상단 노출</span>{" "}
                  — 이벤트 참여 시 서비스 상단 노출로 활성화에 도움을 드립니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 개수 표시 */}
        {/* TODO: API 응답의 total count 값으로 교체 */}
        <div className="flex items-center justify-between pb-4">
          <span className="text-[13px] font-semibold text-[#cbd5e1]">
            신청 목록
          </span>
          <span className="text-[12px] font-medium text-[#64748b]">
            총 {cards.length}건
          </span>
        </div>

        {/* 카드 리스트 */}
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <ConsultingCardItem key={card.id} card={card} />
          ))}
        </div>
      </main>
    </div>
  );
}
