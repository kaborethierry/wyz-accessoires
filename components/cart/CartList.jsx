"use client";

import CartItem from "./CartItem";
import { useCartStore } from "@/store/cartStore";
import { formatPriceOrAsk } from "@/lib/formatters";
import "./CartList.css";

/**
 * CartList
 * Affiche la liste des articles du panier.
 * États gérés :
 *  - rempli
 *  - vide
 *  - mise à jour (via ré-render Zustand)
 */
export default function CartList({ emptyState = null }) {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());

  if (!items || items.length === 0) {
    return (
      <div className="cart-list cart-list--empty">
        {emptyState ?? (
          <div className="cart-list__empty">
            <p className="cart-list__empty-title">
              Votre panier est vide
            </p>
            <p className="cart-list__empty-text">
              Parcourez la boutique pour ajouter des articles.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-list">
      <ul className="cart-list__items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <p className="cart-list__count" aria-live="polite">
        {items.length} article{items.length > 1 ? "s" : ""} — Total{" "}
        <strong>{formatPriceOrAsk(total)}</strong>
      </p>
    </div>
  );
}