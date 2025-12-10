import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  aspectRatio?: "square" | "video" | "wide" | number;
  containerClassName?: string;
  imageClassName?: string;
}

export function OptimizedImage({
  alt,
  aspectRatio = "video",
  containerClassName = "",
  imageClassName = "",
  ...props
}: OptimizedImageProps) {
  const aspectRatioMap = {
    square: "1 / 1",
    video: "16 / 9",
    wide: "21 / 9",
  };

  const aspectRatioValue =
    typeof aspectRatio === "number"
      ? aspectRatio
      : aspectRatioMap[aspectRatio as keyof typeof aspectRatioMap];

  const containerStyle: CSSProperties = {
    aspectRatio: aspectRatioValue,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div
      className={`relative bg-gray-200 ${containerClassName}`}
      style={containerStyle}
    >
      <Image
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        loading="lazy"
        className={`object-cover ${imageClassName}`}
        {...props}
      />
    </div>
  );
}

// Fallback for external images
interface ExternalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | number;
}

export function ExternalOptimizedImage({
  src,
  alt,
  width = 1200,
  height = 630,
  loading = "lazy",
  className = "",
  aspectRatio = "video",
}: ExternalImageProps) {
  const aspectRatioMap = {
    square: "1 / 1",
    video: "16 / 9",
    wide: "21 / 9",
  };

  const aspectRatioValue =
    typeof aspectRatio === "number"
      ? aspectRatio
      : aspectRatioMap[aspectRatio as keyof typeof aspectRatioMap];

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      style={{
        aspectRatio: aspectRatioValue,
        objectFit: "cover",
      }}
    />
  );
}
