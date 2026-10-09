import Image from "next/image";
import Link from "next/link";
import { getService } from "@/content/services";
import type { Work } from "@/content/works";

function frameClass(work: Work) {
  if (work.video && work.orientation === "vertical") return "aspect-[9/16] w-full max-w-sm";
  if (work.video || work.wide) return "aspect-[16/9]";
  if (work.tall) return "aspect-[3/4]";
  return "aspect-[4/3]";
}

export function WorkGrid({ items }: { items: Work[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
      {items.map((work) => {
        const service = getService(work.service);
        const verticalVideo = Boolean(work.video) && work.orientation === "vertical";
        const span = work.video ? (verticalVideo ? "" : "md:col-span-2") : work.wide ? "md:col-span-2" : "";
        const frame = `relative block bg-black ${frameClass(work)}`;
        return (
          <li key={work.slug} className={span}>
            <figure>
              {work.video ? (
                <div className={verticalVideo ? "md:flex md:justify-center" : undefined}>
                  <div className={frame}>
                    <video
                      src={work.video}
                      poster={work.image}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-label={work.imageAlt}
                    />
                  </div>
                </div>
              ) : (
                <Link href={`/uslugi/${work.service}`} className={`group overflow-hidden ${frame}`}>
                  <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    sizes={work.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
              )}
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-serif text-2xl md:text-3xl">{work.title}</span>
                {service ? (
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                ) : null}
              </figcaption>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{work.description}</p>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
