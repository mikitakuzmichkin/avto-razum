import Image from "next/image";

const sceneCss = `
@keyframes audi-settle {
  0% { transform: translateY(-50%) scale(1.04); }
  22% { transform: translateY(-50%) scale(1.025); }
  100% { transform: translateY(-50%) scale(1.02); }
}
@keyframes audi-reveal {
  0% { opacity: 0; filter: brightness(0); }
  22% { opacity: 1; filter: brightness(0.05); }
  100% { opacity: 1; filter: brightness(0.3); }
}
@keyframes audi-lamps {
  0%, 26% { opacity: 0; filter: brightness(0); }
  100% { opacity: 1; filter: brightness(1.7); }
}
.audi-scene {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.audi-frame {
  position: absolute;
  top: 50%;
  right: -68%;
  width: 146%;
  transform-origin: center center;
  mix-blend-mode: lighten;
  animation: audi-settle 8.5s cubic-bezier(0.4, 0.02, 0.2, 1) forwards;
}
.audi-car {
  opacity: 0;
  filter: brightness(0);
  animation: audi-reveal 8.5s cubic-bezier(0.4, 0.02, 0.2, 1) forwards;
}
.audi-lamps {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: 0;
  pointer-events: none;
  filter: brightness(0);
  animation: audi-lamps 8.5s cubic-bezier(0.4, 0.02, 0.2, 1) forwards;
  -webkit-mask-image:
    radial-gradient(ellipse 7.5% 4% at 29% 49%, #000 42%, transparent 70%),
    radial-gradient(ellipse 7.5% 4% at 71% 49%, #000 42%, transparent 70%);
  mask-image:
    radial-gradient(ellipse 7.5% 4% at 29% 49%, #000 42%, transparent 70%),
    radial-gradient(ellipse 7.5% 4% at 71% 49%, #000 42%, transparent 70%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-composite: source-over;
  mask-composite: add;
}
@media (prefers-reduced-motion: reduce) {
  .audi-frame { animation: none; transform: translateY(-50%) scale(1.02); }
  .audi-car { animation: none; opacity: 1; filter: brightness(0.3); }
  .audi-lamps { animation: none; opacity: 1; filter: brightness(1.7); }
}
`;

export function HeadlightCar() {
  return (
    <div className="audi-scene" aria-hidden="true">
      <style>{sceneCss}</style>
      <div className="audi-frame">
        <Image
          src="/images/hero/audi-front.jpg"
          alt=""
          width={1280}
          height={720}
          className="audi-car h-auto w-full"
        />
        <Image
          src="/images/hero/audi-front.jpg"
          alt=""
          width={1280}
          height={720}
          className="audi-lamps"
        />
      </div>
    </div>
  );
}
