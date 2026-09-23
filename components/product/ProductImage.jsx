"use client";

import { useState } from "react";
import "./ProductImage.css";

/**
 * ProductImage
 * Gestion visuelle de l'image produit.
 * - <img> natif (robuste, aucune config next.config nécessaire)
 * - Fallback visuel si image absente ou erreur
 * - Ratio constant
 * - Lazy loading par défaut
 * - Hover : zoom très léger (désactivable via `zoom={false}`)
 */
export default function ProductImage({
  src,
  alt = "",
  ratio = "1 / 1",
  priority = false,
  zoom = true,
  className = "",
}) {
  const [errored, setErrored] = useState(false);
  const hasSrc = Boolean(src);
  const showFallback = !hasSrc || errored;

  return (
    <div
      className={`product-image ${zoom ? "product-image--zoom" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {showFallback ? (
        <div className="product-image__fallback" aria-hidden="true">
          <span className="product-image__fallback-text">WYZ</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="product-image__img"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}