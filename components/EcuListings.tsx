import Image from "next/image";
import type { EcuListing } from "@/content/ebu-listings";
import { ecuListings } from "@/content/ebu-listings";

function ListingCard({ item }: { item: EcuListing }) {
  const photos = [{ image: item.image, imageAlt: item.imageAlt }, ...(item.photos ?? [])];
  return (
    <>
      <div className={photos.length > 1 ? "grid grid-cols-2 gap-2" : undefined}>
        {photos.map((photo) => (
          <div key={photo.image} className="relative aspect-[4/3] overflow-hidden border border-line bg-white">
            <Image
              src={photo.image}
              alt={photo.imageAlt}
              fill
              sizes={photos.length > 1 ? "(min-width: 640px) 25vw, 50vw" : "(min-width: 640px) 50vw, 100vw"}
              className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl leading-none md:text-3xl">{item.title}</h3>
        <span className="shrink-0 text-sm">{item.price}</span>
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">{item.vehicle}</p>
      {item.text ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{item.text}</p> : null}
      <p className="mt-3 text-sm leading-relaxed text-muted">Артикул {item.article}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        <span className="text-foreground">Номер запчасти: </span>
        {item.parts}
      </p>
    </>
  );
}

export function EcuListings() {
  return (
    <section className="mt-20 border-t border-line pt-16" aria-labelledby="ecu-stock">
      <h2 id="ecu-stock" className="font-serif text-4xl leading-none md:text-5xl">
        В наличии
      </h2>
      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {ecuListings.map((item) => (
          <li key={item.article}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                <ListingCard item={item} />
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] group-hover:text-muted">
                  Открыть объявление
                </p>
              </a>
            ) : (
              <ListingCard item={item} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
