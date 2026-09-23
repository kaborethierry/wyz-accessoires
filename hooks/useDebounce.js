"use client";

import { useState, useEffect } from "react";

/**
 * useDebounce
 * Retarde la mise à jour d'une valeur.
 * Exemple : la recherche attend 300ms avant de se lancer.
 *
 * @param {*} value      valeur à debouncer
 * @param {number} delay délai en ms
 * @returns {*} valeur debouncée
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;