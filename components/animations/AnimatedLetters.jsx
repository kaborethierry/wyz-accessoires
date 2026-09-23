"use client";

import { useEffect, useState } from "react";
import "./AnimatedLetters.css";

/**
 * AnimatedLetters
 * Animation lettre par lettre pour les grands titres.
 *
 * Accessibilité :
 *  - Le texte complet est exposé via aria-label sur le conteneur.
 *  - Les spans individuels sont aria-hidden="true".
 *  - Les lecteurs d'écran lisent donc une seule chaîne propre.
 *
 * Props :
 *  - text        : string à animer
 *  - as          : balise (défaut "span")
 *  - stagger     : délai entre chaque lettre en ms (défaut 40)
 *  - duration    : durée de chaque lettre en ms (défaut 600)
 *  - delay       : délai initial en ms (défaut 0)
 *  - className
 *  - keepSpaces  : conserve les espaces visibles (défaut true)
 */
export default function AnimatedLetters({
  text = "",
  as: Tag = "span",
  stagger = 40,
  duration = 600,
  delay = 0,
  className = "",
  keepSpaces = true,
  ...rest
}) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // En SSR / avant mount : texte brut pour éviter tout CLS
  if (!mounted || reduced) {
    return (
      <Tag className={`animated-letters is-static ${className}`.trim()} {...rest}>
        {text}
      </Tag>
    );
  }

  const chars = Array.from(text);

  return (
    <Tag
      className={`animated-letters ${className}`.trim()}
      aria-label={text}
      {...rest}
    >
      {chars.map((char, i) => {
        const isSpace = char === " ";
        return (
          <span
            key={`${char}-${i}`}
            className={`animated-letters__char${
              isSpace ? " is-space" : ""
            }`}
            aria-hidden="true"
            style={{
              "--i": i,
              "--stagger": `${stagger}ms`,
              "--duration": `${duration}ms`,
              "--delay": `${delay}ms`,
            }}
          >
            {isSpace && keepSpaces ? "\u00A0" : char}
          </span>
        );
      })}
    </Tag>
  );
}