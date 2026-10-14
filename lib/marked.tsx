import type { ReactNode } from "react";

export function marked(text: string, marks: string[] = [], nowrap: string[] = []): ReactNode {
  const phrases = [...marks, ...nowrap];
  if (phrases.length === 0) return text;
  const pattern = [...phrases]
    .sort((a, b) => b.length - a.length)
    .map((mark) => mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(`(${pattern})`, "g")).map((part, index) => {
    const isMark = marks.includes(part);
    const isNowrap = nowrap.includes(part);
    if (!isMark && !isNowrap) return part;
    const className = [isMark ? "text-mark" : "", isNowrap ? "hyphens-none whitespace-nowrap" : ""].filter(Boolean).join(" ");
    return (
      <span key={index} className={className}>
        {part}
      </span>
    );
  });
}
