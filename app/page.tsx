import Image from "next/image";

const SAMPLE_IMAGE =
  "https://www.figma.com/api/mcp/asset/fda3c0b2-5927-4c5b-bcbd-5b31a89f6efb";

interface ConsultingCard {
  id: string;
  date: string;
  images: string[];
  usesHairProduct: boolean;
  prefersForehead: boolean;
}

const cards: ConsultingCard[] = [
  {
    id: "뿡순이",
    date: "2024-02-14",
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: true,
  },
  {
    id: "준혁이",
    date: "2024-02-14",
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    usesHairProduct: true,
    prefersForehead: true,
  },
];

function ConsultingCardItem({ card }: { card: ConsultingCard }) {
  return (
    <div className="relative rounded-2xl border border-[#e2e8f0] bg-white p-4">
      {/* Shadow overlay */}
      <div className="pointer-events-none absolute inset-[-1px] rounded-2xl shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)]" />

      {/* Header: ID badge + date */}
      <div className="flex items-center justify-between pb-3">
        <span className="rounded-full bg-[#3b82f6] px-3 py-1 text-xs font-semibold tracking-wider text-white shadow-[0px_0px_0px_1px_rgba(59,130,246,0.2)]">
          ID : {card.id}
        </span>
        <span className="text-sm font-semibold text-[#475569]">
          {card.date}
        </span>
      </div>

      {/* Photo grid */}
      <div className="flex gap-[5px] overflow-x-auto py-2">
        {card.images.map((src, i) => (
          <div
            key={i}
            className="relative h-[150px] w-[130px] shrink-0 overflow-hidden rounded-[10px]"
          >
            <Image
              src={src}
              alt={`${card.id} 헤어 사진 ${i + 1}`}
              fill
              className="object-cover"
              sizes="130px"
            />
          </div>
        ))}
      </div>

      {/* Info tags */}
      <div className="flex gap-2 pt-2">
        <div className="flex flex-1 items-center justify-center rounded-[10px] bg-[#f1f5f9] px-3 py-1">
          <span className="text-sm font-medium text-black">
            헤어 제품 사용 여부: {card.usesHairProduct ? "O" : "X"}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-[10px] bg-[#f1f5f9] px-3 py-1">
          <span className="text-sm font-medium text-black">
            이마 노출 선호 여부: {card.prefersForehead ? "O" : "X"}
          </span>
        </div>
      </div>

      {/* Write button */}
      <div className="mt-5 border-t border-[#e2e8f0] pt-4">
        <button className="w-full rounded-lg bg-[#f1f5f9] py-2 text-[13.3px] font-medium text-[#3b82f6] transition-colors hover:bg-[#e2e8f0]">
          작성하기
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="mx-auto max-w-[618px] px-4 pt-10 pb-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-1 pb-6">
          <p className="text-xs font-medium tracking-wider text-[#0f172a]">
            EVENTS
          </p>
          <h1
            className="text-4xl text-[#0f172a]"
            style={{ fontFamily: "var(--font-pretendard)", fontWeight: 900 }}
          >
            GROOMEET
          </h1>
          <h2 className="text-2xl font-extrabold text-[#475569]">
            헤어 컨설팅지 작성 이벤트
          </h2>
          <p className="mt-1 text-center text-xs font-medium leading-5 text-[#0f172a]">
            헤어 컨설팅 이벤트 참여해서 신규 고객 모으고
            <br />
            다양한 혜택까지 챙기기!
          </p>
        </div>

        {/* Card list */}
        <div className="flex flex-col gap-6">
          {cards.map((card) => (
            <ConsultingCardItem key={card.id} card={card} />
          ))}
        </div>
      </main>
    </div>
  );
}
