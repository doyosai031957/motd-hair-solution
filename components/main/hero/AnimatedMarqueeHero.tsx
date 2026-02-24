"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  subtitle?: string;
  description: string;
  ctaText: string;
  ctaLocked?: boolean;
  images: string[];
  onCtaClick?: () => void;
  decorations?: React.ReactNode;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
  locked = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  locked?: boolean;
}) => {
  if (locked) {
    return (
      <div className="relative mt-8 overflow-hidden rounded-full border border-white/10 bg-white/5 cursor-not-allowed select-none">
        {/* 채워지다 멈추는 파란 fill */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500"
          animate={{ x: ["-100%", "-20%", "-20%", "-100%"] }}
          transition={{
            duration: 2.8,
            times: [0, 0.55, 0.74, 1],
            ease: ["easeOut", "linear", "easeIn"] as const,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
        <span className="relative z-10 block px-8 py-3 text-sm font-semibold text-white/40">
          {children}
        </span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-8 px-8 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      {children}
    </motion.button>
  );
};

const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  subtitle,
  description,
  ctaText,
  ctaLocked = false,
  images,
  onCtaClick,
  decorations,
  className,
}) => {
  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center text-center px-4",
        className
      )}
    >
      {/* SVG Decorations */}
      {decorations && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {decorations}
        </div>
      )}

      <div className="z-10 flex flex-col items-center -translate-y-[20vh]">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-4 inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground"
        >
          {typeof title === "string"
            ? title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
            : title}

          {subtitle && (
            <>
              <br />
              {subtitle.split(" ").map((word, i, arr) => (
                <motion.span
                  key={`sub-${i}`}
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  className="inline-block text-3xl md:text-5xl font-light tracking-widest text-muted-foreground"
                >
                  {word}{i < arr.length - 1 && "\u00A0"}
                </motion.span>
              ))}
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
        >
          <ActionButton onClick={onCtaClick} locked={ctaLocked}>{ctaText}</ActionButton>
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      <div className="absolute bottom-[10vh] left-0 w-full h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
              style={{ rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
