"use client";

import Image from "next/image";
import styles from "./AboutUsInfo.module.scss";
import { RevealOnScroll } from "@/components/components/RevealOnScroll";

interface ImageWithRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  hiddenClassName?: string;
}

export const ImageWithReveal = ({
  src,
  alt,
  width,
  height,
  className = styles.article__img,
  hiddenClassName = "hide--right",
}: ImageWithRevealProps) => {
  return (
    <RevealOnScroll hiddenClassName={hiddenClassName}>
      <div className={`skeleton ${className}`}>
        <Image
          className={className}
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          onLoadingComplete={(e) => {
            e.parentElement?.classList.remove("skeleton");
          }}
        />
      </div>
    </RevealOnScroll>
  );
};
