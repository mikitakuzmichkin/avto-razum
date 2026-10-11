import type { ReactNode } from "react";

export function marked(text: string, marks: string[] = []): ReactNode {
  if (marks.length === 0) return text;
  const pattern = [...marks]
    .sort((a, b) => b.length - a.length)
    .map((mark) => mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(`(${pattern})`, "g")).map((part, index) =>
    marks.includes(part) ? (
      <span key={index} className="text-muted">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
