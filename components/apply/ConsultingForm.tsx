"use client";

import { useReducer, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoUploadField } from "./PhotoUploadField";
import { RadioField } from "./RadioField";
import { SuccessScreen } from "./SuccessScreen";

// --- Types ---

type PhotoField = "front" | "sides" | "top" | "sample";

interface PhotoEntry {
  file: File;
  preview: string;
}

interface FormState {
  photos: Record<PhotoField, PhotoEntry[]>;
  usesHairProducts: boolean | null;
  prefersForehead: boolean | null;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

type FormAction =
  | { type: "ADD_PHOTO"; field: PhotoField; file: File; preview: string }
  | { type: "REMOVE_PHOTO"; field: PhotoField; index: number }
  | { type: "SET_HAIR_PRODUCTS"; value: boolean }
  | { type: "SET_FOREHEAD_PREF"; value: boolean }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; message: string };

// --- Initial state ---

const initialState: FormState = {
  photos: { front: [], sides: [], top: [], sample: [] },
  usesHairProducts: null,
  prefersForehead: null,
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  submitError: null,
};

// --- Reducer ---

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "ADD_PHOTO": {
      const newErrors = { ...state.errors };
      delete newErrors[action.field];

      return {
        ...state,
        photos: {
          ...state.photos,
          [action.field]: [
            ...state.photos[action.field],
            { file: action.file, preview: action.preview },
          ],
        },
        errors: newErrors,
      };
    }
    case "REMOVE_PHOTO": {
      const entry = state.photos[action.field][action.index];
      if (entry) URL.revokeObjectURL(entry.preview);

      return {
        ...state,
        photos: {
          ...state.photos,
          [action.field]: state.photos[action.field].filter(
            (_, i) => i !== action.index
          ),
        },
      };
    }
    case "SET_HAIR_PRODUCTS": {
      const newErrors = { ...state.errors };
      delete newErrors.usesHairProducts;
      return { ...state, usesHairProducts: action.value, errors: newErrors };
    }
    case "SET_FOREHEAD_PREF": {
      const newErrors = { ...state.errors };
      delete newErrors.prefersForehead;
      return { ...state, prefersForehead: action.value, errors: newErrors };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitError: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, isSubmitted: true };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, submitError: action.message };
    default:
      return state;
  }
}

// --- Validation ---

function validate(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (state.photos.front.length === 0)
    errors.front = "정면 사진을 첨부해주세요";
  if (state.photos.sides.length === 0)
    errors.sides = "양 옆 사진을 첨부해주세요";
  if (state.photos.top.length === 0)
    errors.top = "정수리 사진을 첨부해주세요";
  if (state.photos.sample.length === 0)
    errors.sample = "원하는 셈플 사진을 첨부해주세요";
  if (state.usesHairProducts === null)
    errors.usesHairProducts = "선택해주세요";
  if (state.prefersForehead === null) errors.prefersForehead = "선택해주세요";
  return errors;
}

// --- Photo field config ---

const PHOTO_FIELDS: { field: PhotoField; label: string }[] = [
  { field: "front", label: "정면 사진" },
  { field: "sides", label: "양 옆 사진" },
  { field: "top", label: "정수리 사진" },
  { field: "sample", label: "원하는 셈플 사진" },
];

// --- Component ---

export const ConsultingForm = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(state.photos)
        .flat()
        .forEach((entry) => URL.revokeObjectURL(entry.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const errors = validate(state);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        setTimeout(() => {
          document
            .querySelector("[data-error='true']")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
        return;
      }

      dispatch({ type: "SUBMIT_START" });

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // API가 설정되어 있으면 실제 전송
        if (apiUrl && apiUrl !== "https://your-api-server.com") {
          const formData = new FormData();
          state.photos.front.forEach((e) =>
            formData.append("frontPhoto", e.file)
          );
          state.photos.sides.forEach((e) =>
            formData.append("sidesPhoto", e.file)
          );
          state.photos.top.forEach((e) =>
            formData.append("topPhoto", e.file)
          );
          state.photos.sample.forEach((e) =>
            formData.append("samplePhoto", e.file)
          );
          formData.append(
            "usesHairProducts",
            String(state.usesHairProducts)
          );
          formData.append("prefersForehead", String(state.prefersForehead));
          formData.append("code", code);

          const res = await fetch(`${apiUrl}/api/consulting/apply`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error(`서버 오류가 발생했습니다. (${res.status})`);
          }
        }

        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "SUBMIT_ERROR",
          message:
            err instanceof Error
              ? err.message
              : "신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    },
    [state, code]
  );

  return (
    <AnimatePresence mode="wait">
      {!state.isSubmitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              무료 컨설팅 신청 서식
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              아래 정보를 모두 입력해주세요
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Photo fields */}
          {PHOTO_FIELDS.map(({ field, label }) => (
            <PhotoUploadField
              key={field}
              label={label}
              previews={state.photos[field].map((e) => e.preview)}
              error={state.errors[field]}
              onFileSelect={(file, preview) =>
                dispatch({ type: "ADD_PHOTO", field, file, preview })
              }
              onRemove={(index) =>
                dispatch({ type: "REMOVE_PHOTO", field, index })
              }
            />
          ))}

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Radio fields */}
          <RadioField
            label="평소에 헤어 제품(왁스, 헤어토닉 등)을 사용하시나요?"
            name="usesHairProducts"
            value={state.usesHairProducts}
            onChange={(value) =>
              dispatch({ type: "SET_HAIR_PRODUCTS", value })
            }
            error={state.errors.usesHairProducts}
          />

          <RadioField
            label="이마를 드러내는 스타일을 선호하시나요?"
            name="prefersForehead"
            value={state.prefersForehead}
            onChange={(value) =>
              dispatch({ type: "SET_FOREHEAD_PREF", value })
            }
            error={state.errors.prefersForehead}
          />

          {/* Submit error */}
          <AnimatePresence>
            {state.submitError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-red-400 text-center"
              >
                {state.submitError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={state.isSubmitting}
            className="w-full rounded-full bg-blue-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {state.isSubmitting ? "신청 중..." : "신청하기"}
          </button>
        </motion.form>
      ) : (
        <SuccessScreen key="success" />
      )}
    </AnimatePresence>
  );
};
