"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import "./CartBadge.css";

/**
 * CartBadge
 * Affiche le nombre total d'articles dans le panier.
 * - Se met à jour automatiquement via Zustand
 * - Attend l'hydratation avant d'afficher (SSR-safe)
 *
 * Props :
 *  - className : classes additionnelles
 *  - hiddenWhenEmpty : masque le badge si 0 (défaut : true)
 *  - maxDisplay : au-delà, affiche "99+" (défaut : 99)
 */
export default function CartBadge({
  className = "",
  hiddenWhenEmpty = true,
  maxDisplay = 99,
}) {
  const [mounted, setMounted] = useState(false);

  // Compteur dérivé du store — recalculé à chaque changement d'items
  const count = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (hiddenWhenEmpty && count === 0) return null;

  const display = count > maxDisplay ? `${maxDisplay}+` : String(count);

  return (
    <span
      className={`cart-badge ${className}`.trim()}
      aria-label={`${count} article${count > 1 ? "s" : ""} dans le panier`}
    >
      {display}
    </span>
  );
}