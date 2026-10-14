"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="font-serif text-2xl leading-tight md:text-3xl">{item.question}</span>
                <span className="pt-1 text-sm uppercase tracking-[0.16em] text-muted" aria-hidden="true">
                  {expanded ? "Скрыть" : "Узнать"}
                </span>
              </button>
            </h3>
            {expanded ? (
              <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
