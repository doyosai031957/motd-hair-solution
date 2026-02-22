"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 유효한 코드 — 변경하려면 이 값을 수정하세요
const VALID_CODE = "111111";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

export const CodeModal = ({ isOpen, onClose, onSuccess }: CodeModalProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === VALID_CODE) {
      const submittedCode = code;
      setCode("");
      setError(false);
      onSuccess(submittedCode);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setCode("");
    setError(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-4"
          >
            <div className="rounded-2xl border border-border bg-[#161616] p-8 flex flex-col items-center gap-6">
              {/* Title */}
              <p className="text-center text-foreground font-medium text-base leading-relaxed">
                무료 컨설팅을 받으려면
                <br />
                코드를 입력해주세요.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-center gap-3"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  placeholder="코드를 입력하세요"
                  maxLength={20}
                  autoFocus
                  className="w-full text-center rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors text-sm tracking-widest"
                />

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-xs text-red-400"
                    >
                      유효하지 않은 코드입니다.
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 mt-1"
                >
                  확인
                </button>

                <a
                  href="https://groomeet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-blue-500 py-3 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-500/10 text-center"
                >
                  무료 코드 받으러가기
                </a>
              </form>

              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
