import { Suspense } from "react";
import { ConsultingForm } from "@/components/apply/ConsultingForm";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-24 md:py-32 flex justify-center">
      <div className="w-full max-w-lg">
        <Suspense>
          <ConsultingForm />
        </Suspense>
      </div>
    </main>
  );
}
