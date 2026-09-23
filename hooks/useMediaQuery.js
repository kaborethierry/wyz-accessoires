"use client";

import { useState, useEffect } from "react";

/**
 * useMediaQuery
 * Détecte si une media query correspond au viewport.
 * SSR-safe : renvoie false au premier rendu, puis se synchronise côté client.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);

    // Sync initial
    setMatches(mql.matches);

    const onChange = (e) => setMatches(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback anciens navigateurs
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [query]);

  return matches;
}

/**
 * Raccourcis utiles
 */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export default useMediaQuery;