/** Smaller copies made by scripts/image-sizes.mjs next to every 3200 px screenshot. */
const WIDTHS = [800, 1600, 2400] as const;
const ORIGINAL_WIDTH = 3200;

export function responsiveSrcSet(src: string): string {
  const base = src.replace(/\.webp$/, "");
  return [
    ...WIDTHS.map((width) => `${base}-${width}.webp ${width}w`),
    `${src} ${ORIGINAL_WIDTH}w`,
  ].join(", ");
}

/** Phone screenshots are 16:9; every other project screenshot is 16:10. */
export function screenshotHeight(src: string): number {
  return src.endsWith("phones.webp") ? 1800 : 2000;
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      srcSet={responsiveSrcSet(src)}
      sizes={sizes}
      width={ORIGINAL_WIDTH}
      height={screenshotHeight(src)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
