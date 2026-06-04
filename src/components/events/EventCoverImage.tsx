import Image from "next/image";

interface EventCoverImageProps {
  src?: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

export function EventCoverImage({
  src,
  alt,
  className = "",
  sizes,
  priority,
  fit = "cover",
}: EventCoverImageProps) {
  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-6 text-center">
        <span className="text-sm font-medium text-white/90">{alt}</span>
      </div>
    );
  }

  const objectClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`${objectClass} ${className}`.trim()}
      sizes={sizes}
      priority={priority}
    />
  );
}
