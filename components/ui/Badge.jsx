// components/ui/Badge.jsx
import "./Badge.css";

/**
 * Badge
 * Petites étiquettes.
 *
 * Variantes : new | popular | available | ask | default
 * Tailles   : sm | md
 */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...rest
}) {
  const classes = ["badge", `badge--${variant}`, `badge--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}