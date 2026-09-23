"use client";

import { useEffect, useRef, useState } from "react";
import "./Parallax.css";

/**
 * Parallax
 * Mouvement parallaxe léger basé sur le scroll.
 *
 * Desktop : translation douce basée sur la position dans le viewport.
 * Mobile  : réduit ou désactivé (défaut : réduit de moitié).
 * Reduced motion : totalement désactivé.
 *
 * Performance : uniquement `transform: translate3d(...)` (pas de top/left).
 *
 * Props :
 *  - speed      : intensité (0 = aucune, 1 = fort, défaut 0.2)
 *  - maxOffset  : offset max en px (défaut 80)
 *  - disabled   : désactive manuellement
 *  - as         : balise HTML (défaut "div")
 *  - className
 */
export default function Parallax({
  children,
  speed = 0.2,
  maxOffset = 80,
  disabled = false,
  as: Tag = "div",
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const [enabled, setEnabled] = useState(true);

  // Détection prefers-reduced-motion + viewport mobile
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlMobile = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setEnabled(!mqlMotion.matches);
    };
    update();

    const onMotion = (e) => setEnabled(!e.matches);
    mqlMotion.addEventListener?.("change", onMotion);

    return () => {
      mqlMotion.removeEventListener?.("change", onMotion);
    };
  }, []);

  // Parallax basé sur scroll
  useEffect(() => {
    if (disabled || !enabled) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || 1;

      // Progression : -1 (élément sous la fenêtre) → 1 (élément au-dessus)
      const centerY = rect.top + rect.height / 2;
      const progress = (centerY - windowH / 2) / (windowH / 2 + rect.height / 2);

      const raw = progress * speed * maxOffset;
      // clamp
      const clamped = Math.max(-maxOffset, Math.min(maxOffset, raw));

      setOffset(clamped);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    // Init
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [disabled, enabled, speed, maxOffset]);

  const finalOffset = disabled || !enabled ? 0 : offset;

  return (
    <Tag
      ref={ref}
      className={`parallax ${className}`.trim()}
      style={{
        ...style,
        "--parallax-offset": `${finalOffset}px`,
      }}
      {...rest}
    >
      <span
        className="parallax__inner"
        style={{ transform: `translate3d(0, ${finalOffset}px, 0)` }}
      >
        {children}
      </span>
    </Tag>
  );
}