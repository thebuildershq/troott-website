"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import { cx } from "@/lib/utils";

export interface TextRevealProps {
  children: string;
  className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={cx("relative py-10", className)}>
      <div className="sticky top-1/3 h-[10vh] mx-auto flex max-w-4xl flex-wrap p-6 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1 )/ words.length;

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};
