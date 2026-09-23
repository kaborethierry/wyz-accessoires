// components/ui/Skeleton.jsx
import "./Skeleton.css";

/**
 * Skeleton
 * Remplace temporairement les éléments pendant chargement.
 *
 * Variantes : text | image | card | block
 * Props :
 *  - variant
 *  - width
 *  - height
 *  - radius
 *  - lines (pour variant="text")
 *  - className
 */
export default function Skeleton({
  variant = "block",
  width,
  height,
  radius,
  lines = 1,
  className = "",
}) {
  const style = {
    width: width || undefined,
    height: height || undefined,
    borderRadius: radius || undefined,
  };

  if (variant === "text") {
    return (
      <div className={`skeleton-text ${className}`.trim()} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="skeleton skeleton--text"
            style={{
              width: i === lines - 1 && lines > 1 ? "70%" : width || "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`skeleton skeleton--${variant} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}