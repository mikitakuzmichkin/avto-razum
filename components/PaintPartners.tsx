import Image from "next/image";

const partners = [
  { src: "/images/partners/ergo-hq.jpg", name: "ERGO", width: 800, height: 200 },
  { src: "/images/partners/kupala-hq.jpg", name: "Купала", width: 900, height: 280 },
  { src: "/images/partners/task.png", name: "Таск", width: 143, height: 128 },
  { src: "/images/partners/promtransinvest-hq.jpg", name: "Промтрансинвест", width: 800, height: 400 },
  { src: "/images/partners/kentavr-hq.jpg", name: "Кентавр", width: 900, height: 280 },
];

const certificates = [
  { src: "/images/certificates/audatex.jpg", name: "Сертификат Audatex", width: 276, height: 390 },
  { src: "/images/certificates/sootvetstvie.jpg", name: "Сертификат соответствия", width: 275, height: 390 },
  {
    src: "/images/certificates/prilozhenie.jpg",
    name: "Приложение к сертификату соответствия",
    width: 275,
    height: 390,
  },
];

export function PaintPartners() {
  return (
    <section className="mt-20 border-t border-line pt-16" aria-labelledby="partners-heading">
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="partners-heading" className="font-serif text-4xl leading-none md:text-5xl">
            Партнёры
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {partners.map((partner) => (
              <li key={partner.src}>
                <span className="flex h-16 items-center justify-center rounded-xl bg-white px-3">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-10 w-auto max-w-36 object-contain"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-4xl leading-none md:text-5xl">Сертификаты</h2>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {certificates.map((certificate) => (
              <li key={certificate.src}>
                <a href={certificate.src} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={certificate.src}
                    alt={certificate.name}
                    width={certificate.width}
                    height={certificate.height}
                    className="h-auto w-full"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
