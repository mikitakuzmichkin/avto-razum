import Image, { type ImageProps } from "next/image";
import { forwardRef } from "react";
import { publicPath } from "@/lib/public-path";

export const SiteImage = forwardRef<HTMLImageElement, ImageProps>(function SiteImage({ src, ...props }, ref) {
  const resolved = typeof src === "string" ? publicPath(src) : src;
  return <Image ref={ref} src={resolved} {...props} />;
});
