"use client";

import { useEffect, useState } from "react";
import "./ColorShift.css";

/**
 * ColorShift
 * Variations chromatiques décoratives très lentes.
 *
 * Palette : marron → brique → orange (uniquement les couleurs WYZ).
 *
 * Objectif : donner un léger mouvement sans être agressif.
 * Reduced motion : animation totalement désactivée.
 *
 * Props :
 *  - variant : "gradient" | "blob" (défaut "blob")
 *  - duration: durée d'un cycle en secondes (défaut 24s)
 *  - className
 *  - children (optionnel)
 */
export default function ColorShift({
  variant = "blob",
  duration = 24,
  className = "",
  children,
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div
      className={[
        "color-shift",
        `color-shift--${variant}`,
        reduced ? "is-static" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--color-shift-duration": `${duration}s` }}
      aria-hidden="true"
    >
      <span className="color-shift__layer color-shift__layer--1" />
      <span className="color-shift__layer color-shift__layer--2" />
      <span className="color-shift__layer color-shift__layer--3" />

      {children && <div className="color-shift__content">{children}</div>}
    </div>
  );
}