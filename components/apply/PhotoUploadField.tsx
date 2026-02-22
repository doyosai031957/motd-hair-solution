"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoUploadFieldProps {
  label: string;
  previews: string[];
  maxPhotos?: number;
  error?: string;
  onFileSelect: (file: File, previewUrl: string) => void;
  onRemove: (index: number) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const PhotoUploadField = ({
  label,
  previews,
  maxPhotos = 3,
  error,
  onFileSelect,
  onRemove,
}: PhotoUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    onFileSelect(file, url);

    if (inputRef.current) inputRef.current.value = "";
  };

  const canAdd = previews.length < maxPhotos;
  const totalSlots = previews.length + (canAdd ? 1 : 0);

  // Grid columns based on total visible items
  const gridCols =
    totalSlots === 1
      ? "grid-cols-1"
      : totalSlots === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <div data-error={error ? "true" : undefined}>
      <p className="text-sm font-medium text-foreground mb-2">
        {label}
        <span className="text-muted-foreground font-normal ml-1.5 text-xs">
          (최대 {maxPhotos}장)
        </span>
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div className={`grid ${gridCols} gap-2`}>
        {/* Photo previews */}
        {previews.map((url, index) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-32 rounded-xl border border-border bg-card overflow-hidden"
          >
            <img
              src={url}
              alt={`${label} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        ))}

        {/* Add button */}
        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-32 rounded-xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors hover:border-foreground/30 hover:bg-card"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="text-xs text-muted-foreground">사진 첨부</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
