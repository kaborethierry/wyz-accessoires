"use client";

import { useState } from "react";
import "./SafeImage.css";

/**
 * SafeImage
 * <img> avec fallback visuel en cas d'erreur de chargement.
 *
 * Utilisable depuis un Server Component (Next.js App Router) :
 *  - C'est un Client Component → les event handlers sont autorisés.
 *  - Le parent Server Component ne lui passe que des props sérialisables.
 *
 * Props :
 *  - src, alt, className
 *  - fallbackText      : texte affiché si l'image échoue (défaut "WYZ")
 *  - fallbackClassName : classe du fallback (optionnel)
 *  - wrapperClassName  : classe du wrapper <span> (optionnel)
 *  - loading, width, height, sizes, ...
 */
export default function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackText = "WYZ",
  fallbackClassName = "",
  wrapperClassName = "",
  loading = "lazy",
  ...rest
}) {
  const [errored, setErrored] = useState(false);

  return (
    <span className={`safe-image ${wrapperClassName}`.trim()}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading={loading}
          onError={() => setErrored(true)}
          {...rest}
        />
      ) : null}

      {errored && (
        <span
          className={`safe-image__fallback ${fallbackClassName}`.trim()}
          aria-hidden="true"
        >
          {fallbackText}
        </span>
      )}
    </span>
  );
}