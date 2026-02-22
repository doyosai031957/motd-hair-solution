"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadioFieldProps {
  label: string;
  name: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  error?: string;
}

export const RadioField = ({
  label,
  name,
  value,
  onChange,
  error,
}: RadioFieldProps) => {
  return (
    <fieldset data-error={error ? "true" : undefined}>
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>

      <div className="flex gap-3">
        {[
          { label: "예", val: true },
          { label: "아니오", val: false },
        ].map((option) => (
          <label
            key={String(option.val)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-3 text-center text-sm cursor-pointer transition-colors",
              value === option.val
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-border bg-card text-muted-foreground hover:border-foreground/30"
            )}
          >
            <input
              type="radio"
              name={name}
              checked={value === option.val}
              onChange={() => onChange(option.val)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
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
    </fieldset>
  );
};
