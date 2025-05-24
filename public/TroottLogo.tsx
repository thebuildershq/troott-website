import Image from "next/image";
import type { ImageProps } from "next/image";

export const TroottLogo = (props: Omit<ImageProps, "src" | "alt">) => (
  <Image
    src="/images/troott-logo.svg"
    alt="Troott Logo"
    width={100}
    height={100}
    unoptimized
    {...props}
  />
);
