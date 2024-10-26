"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
}) => {
  const wordsArray = words.split(" ");

  const renderWords = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
      }}
      className="flex flex-wrap gap-1 text-justify" // Use text-justify for alignment
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="text-black dark:text-white"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn(className, "text-center mt-4 text-gray-300 text-base leading-relaxed tracking-wide")}>
      {renderWords()}
    </div>
  );
};

export default TextGenerateEffect;
