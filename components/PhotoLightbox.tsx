"use client";

import { publicPath } from "@/lib/public-path";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function PhotoLightbox({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 cursor-zoom-in"
        aria-haspopup="dialog"
        aria-label={`Увеличить: ${alt}`}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-auto max-h-[90vh] max-w-[min(92vw,1100px)] border-0 bg-transparent p-0 text-foreground backdrop:bg-black/80"
      >
        <div className="relative">
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <img src={publicPath(src)} alt={alt} className="max-h-[85vh] w-full object-contain" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 border border-white/30 bg-black/70 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-foreground"
          >
            Закрыть
          </button>
        </div>
      </dialog>
    </>
  );
}
