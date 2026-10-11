import { SiteImage } from "@/components/SiteImage";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-11 w-auto", priority = false }: LogoProps) {
  return (
    <SiteImage
      src="/brand/logo.svg"
      alt=""
      width={878}
      height={417}
      priority={priority}
      unoptimized
      className={`block ${className}`}
    />
  );
}
