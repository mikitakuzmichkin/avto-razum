"use client";

import { SiteImage } from "@/components/SiteImage";
import { useEffect, useRef, useState } from "react";

const sceneCss = `
@keyframes audi-settle {
  0% { transform: translateY(-50%) scale(1.04); }
  22% { transform: translateY(-50%) scale(1.025); }
  100% { transform: translateY(-50%) scale(1.02); }
}
@keyframes audi-reveal {
  0% { opacity: 0; filter: brightness(0); }
  10% { opacity: 1; filter: brightness(0.12); }
  42% { opacity: 1; filter: brightness(0.38); }
  100% { opacity: 1; filter: brightness(0.62); }
}
@keyframes audi-lamps {
  0%, 12% { opacity: 0; filter: brightness(0); }
  42% { opacity: 1; filter: brightness(1.15); }
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
  transform: translateY(-50%) scale(1.04);
  transform-origin: center center;
}
.audi-car {
  opacity: 0;
  filter: brightness(0);
}
.audi-scene.is-ready .audi-frame {
  animation: audi-settle 8.5s cubic-bezier(0.33, 0.15, 0.25, 1) forwards;
}
.audi-scene.is-ready .audi-car {
  animation: audi-reveal 8.5s cubic-bezier(0.33, 0.15, 0.25, 1) forwards;
}
.audi-scene.is-ready .audi-lamps {
  animation: audi-lamps 8.5s cubic-bezier(0.33, 0.15, 0.25, 1) forwards;
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
  .audi-frame,
  .audi-scene.is-ready .audi-frame { animation: none; transform: translateY(-50%) scale(1.02); }
  .audi-car,
  .audi-scene.is-ready .audi-car { animation: none; opacity: 1; filter: brightness(0.62); }
  .audi-lamps,
  .audi-scene.is-ready .audi-lamps { animation: none; opacity: 1; filter: brightness(1.7); }
}
`;

export function HeadlightCar() {
  const [ready, setReady] = useState(false);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = carRef.current;
    if (image?.complete && image.naturalWidth > 0) setReady(true);
  }, []);

  return (
    <div className={ready ? "audi-scene is-ready" : "audi-scene"} aria-hidden="true">
      <style>{sceneCss}</style>
      <div className="audi-frame">
        <SiteImage
          ref={carRef}
          src="/images/hero/audi-blue.png"
          alt=""
          width={1280}
          height={720}
          priority
          onLoad={() => setReady(true)}
          className="audi-car h-auto w-full"
        />
        <SiteImage
          src="/images/hero/audi-blue.png"
          alt=""
          width={1280}
          height={720}
          className="audi-lamps"
        />
      </div>
    </div>
  );
}
