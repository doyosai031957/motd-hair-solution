import { ConsultingSheet } from "@/components/consulting/ConsultingSheet";
import Link from "next/link";

export default function ConsultingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-10">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        <ConsultingSheet />

        {/* groomeet.com 이동 버튼 */}
        <a
          href="https://groomeet.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 w-full py-3.5 rounded-2xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all text-center block"
        >
          다이렉트 요청하기
        </a>
      </div>
    </main>
  );
}
