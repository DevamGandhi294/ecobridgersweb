"use client";

import { useEffect, useState } from "react";

type TypingHeadlineProps = {
  className?: string;
  minWidthCh?: number;
};

const FULL_TEXT = "with EcoBridges";

export function TypingHeadline({ className, minWidthCh }: TypingHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: number;

    // When we've finished typing, pause, then start deleting
    if (!isDeleting && index === FULL_TEXT.length) {
      timeout = window.setTimeout(() => setIsDeleting(true), 1200);
    }
    // When we've deleted everything, pause, then start typing again
    else if (isDeleting && index === 0) {
      timeout = window.setTimeout(() => setIsDeleting(false), 1200);
    } else {
      // Slightly slower typing and deleting speed
      const speed = isDeleting ? 100 : 150;
      timeout = window.setTimeout(() => {
        setIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, speed);
    }

    return () => window.clearTimeout(timeout);
  }, [index, isDeleting]);

  const displayText = FULL_TEXT.slice(0, index);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        minWidth: minWidthCh ? `${minWidthCh}ch` : undefined,
      }}
    >
      <span>{displayText}</span>
      <span className="ml-1 inline-block h-[1.1em] align-middle border-l-2 border-emerald-300 animate-pulse" />
    </span>
  );
}

