"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]); // Append the next character
        setI((prev) => prev + 1); // Increment the index
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  return (
    <h1
      className={cn(
        "font-display text-center text-5xl font-semibold leading-[5rem] tracking-wide drop-shadow-md transition-all duration-300", // Adjusted styling for a softer look
        className
      )}
    >
      {displayedText}
      <span className="blinking-cursor">|</span> {/* Add a blinking cursor effect */}
    </h1>
  );
}
  