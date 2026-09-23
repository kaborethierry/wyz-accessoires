"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { whatsappProductLink } from "@/lib/whatsapp";

import "./ProductActions.css";

const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const IconHeartFilled = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

/**
 * ProductActions
 * Actions d'un produit : panier, favori, WhatsApp.
 *
 * Props :
 *  - product
 *  - showWhatsApp (défaut true)
 *  - layout : row | column
 */
export default function ProductActions({
  product,
  showWhatsApp = true,
  layout = "row",
  className = "",
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleFav = useFavoritesStore((s) => s.toggle);

  // Lecture de l'état favori, mais SANS mismatch SSR
  const isFav = useFavoritesStore((s) =>
    s.items.some((it) => it.id === product?.id)
  );

  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleToggleFav = () => {
    toggleFav(product);
  };

  // ✅ Lien WhatsApp déterministe (aucun window.location)
  const productWaLink = whatsappProductLink(product, 1);

  return (
    <div
      className={[
        "product-actions",
        `product-actions--${layout}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Button
        variant="primary"
        size="md"
        onClick={handleAddToCart}
        leftIcon={<IconCart />}
        className={justAdded ? "is-just-added" : ""}
      >
        {justAdded ? "Ajouté !" : "Ajouter au panier"}
      </Button>

      {/* ✅ On n'ajoute aria-pressed qu'APRÈS le montage → zéro mismatch */}
      <Button
        variant="ghost"
        size="md"
        onClick={handleToggleFav}
        leftIcon={mounted && isFav ? <IconHeartFilled /> : <IconHeart />}
        aria-pressed={mounted ? isFav : undefined}
        aria-label={mounted && isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
        className={mounted && isFav ? "is-active" : ""}
      >
        {mounted && isFav ? "Favori" : "Favoris"}
      </Button>

      {showWhatsApp && (
        <Button
          variant="whatsapp"
          size="md"
          href={productWaLink}
          external
          leftIcon={<IconWhatsApp />}
        >
          WhatsApp
        </Button>
      )}
    </div>
  );
}