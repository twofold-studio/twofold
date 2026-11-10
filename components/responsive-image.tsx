const ORIGINAL_WIDTH = 3200;

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
