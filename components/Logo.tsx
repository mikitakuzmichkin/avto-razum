import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-11 w-auto", priority = false }: LogoProps) {
  return (
    <Image
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
