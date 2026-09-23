"use client";

import { useState, useEffect } from "react";

/**
 * useScroll
 * Surveille le scroll de la fenêtre.
 * Retourne : { y, direction, scrolled }
 *  - y         : position verticale courante (px)
 *  - direction : "up" | "down"
 *  - scrolled  : true si l'utilisateur a dépassé un seuil
 */
export function useScroll(threshold = 10) {
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState("up");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        setY(currentY);
        setScrolled(currentY > threshold);
        setDirection(currentY > lastY ? "down" : "up");

        lastY = currentY;
        ticking = false;
      });
    };

    // Init
    lastY = window.scrollY;
    setY(lastY);
    setScrolled(lastY > threshold);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return { y, direction, scrolled };
}

export default useScroll;