import { SiteImage } from "@/components/SiteImage";
import { featuredWorks } from "@/content/works";
import { services } from "@/content/services";
import Link from "next/link";

export function HomeWorks() {
  const groups = services
    .map((service) => ({
      service,
      items: featuredWorks.filter((work) => work.service === service.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-16">
      {groups.map(({ service, items }) => (
        <section key={service.slug} aria-labelledby={`home-works-${service.slug}`}>
          <h3 id={`home-works-${service.slug}`} className="font-serif text-3xl leading-none md:text-4xl">
            {service.title}
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            {items.map((work) => (
              <li key={work.slug}>
                <Link href={`/uslugi/${work.service}#work-${work.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden bg-black">
                    <SiteImage
                      src={work.image}
                      alt={work.imageAlt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {work.video ? (
                      <span className="absolute bottom-3 left-3 border border-white/30 bg-black/70 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground">
                        Видео
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-4 block font-serif text-2xl leading-none md:text-3xl">{work.title}</span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted">{work.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
