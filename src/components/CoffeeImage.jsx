export default function CoffeeImage({
  src,
  alt,
  className = "",
  aspect = "",
  loading = "lazy",
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`object-cover ${aspect} ${className}`}
    />
  );
}

export function ImageBand({ src, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <CoffeeImage
        src={src}
        alt={alt}
        className="h-full w-full scale-105 transition duration-700 hover:scale-100"
      />
    </div>
  );
}
