"use client";

import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/**
 * Reveal
 * Animation d'apparition au scroll via IntersectionObserver.
 *
 * Options :
 *  - direction : "up" | "down" | "left" | "right" | "none" (défaut "up")
 *  - delay     : délai en ms avant lancement (défaut 0)
 *  - duration  : durée en ms (défaut 600)
 *  - distance  : distance de translation en px (défaut 20)
 *  - threshold : seuil d'intersection (défaut 0.15)
 *  - once      : n'anime qu'une fois (défaut true)
 *  - as        : balise HTML (défaut "div")
 *
 * Accessibilité : neutralisé si prefers-reduced-motion: reduce.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  distance = 20,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Détecte prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback : rendu immédiat
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, once, threshold]);

  const isVisible = reduced || visible;

  const cssVars = {
    "--reveal-duration": `${duration}ms`,
    "--reveal-delay": `${delay}ms`,
    "--reveal-distance": `${distance}px`,
    ...style,
  };

  return (
    <Tag
      ref={ref}
      className={[
        "reveal",
        `reveal--${direction}`,
        isVisible ? "is-visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={cssVars}
      {...rest}
    >
      {children}
    </Tag>
  );
}