import type { Review } from "@/content/reviews";

export function ReviewList({ items }: { items: Review[] }) {
  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {items.map((review) => (
          <li key={review.id} className="border-t border-line pt-6">
            <blockquote>
              <p className="font-serif text-2xl leading-snug md:text-3xl">«{review.text}»</p>
              <footer className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted">
                {review.name} · {review.vehicle}
              </footer>
            </blockquote>
          </li>
        ))}
    </ul>
  );
}
