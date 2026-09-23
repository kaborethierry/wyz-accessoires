"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPriceOrAsk } from "@/lib/formatters";
import "./CartItem.css";

/* ---------------------------------------------------------
   Petites icônes inline
   --------------------------------------------------------- */
const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconMinus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="14" height="14" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="14" height="14" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ---------------------------------------------------------
   CartItem
   --------------------------------------------------------- */
export default function CartItem({ item, onRemoveStart }) {
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const [removing, setRemoving] = useState(false);

  if (!item) return null;

  const lineTotal =
    item.price != null ? item.price * item.quantity : null;

  const handleRemove = () => {
    setRemoving(true);
    // Animation de sortie avant suppression réelle
    if (onRemoveStart) onRemoveStart();
    setTimeout(() => {
      removeItem(item.id);
    }, 220);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <li
      className={`cart-item${removing ? " is-removing" : ""}`}
      data-id={item.id}
    >
      {/* Image */}
      <Link
        href={`/produit/${item.slug}`}
        className="cart-item__image-link"
        aria-label={item.name}
      >
        <div className="cart-item__image">
          {item.image ? (
            <img src={item.image} alt={item.name} loading="lazy" />
          ) : (
            <span className="cart-item__image-fallback" aria-hidden="true">
              WYZ
            </span>
          )}
        </div>
      </Link>

      {/* Infos */}
      <div className="cart-item__info">
        <Link
          href={`/produit/${item.slug}`}
          className="cart-item__name"
        >
          {item.name}
        </Link>

        <p className="cart-item__unit-price">
          {formatPriceOrAsk(item.price)}
        </p>

        {/* Quantité + suppression */}
        <div className="cart-item__actions">
          <div className="cart-item__qty" role="group" aria-label="Quantité">
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={handleDecrement}
              aria-label="Diminuer la quantité"
              disabled={item.quantity <= 1}
            >
              <IconMinus />
            </button>

            <span className="cart-item__qty-value" aria-live="polite">
              {item.quantity}
            </span>

            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={handleIncrement}
              aria-label="Augmenter la quantité"
            >
              <IconPlus />
            </button>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={handleRemove}
            aria-label={`Retirer ${item.name} du panier`}
          >
            <IconTrash />
            <span>Retirer</span>
          </button>
        </div>
      </div>

      {/* Sous-total ligne */}
      <div className="cart-item__line-total">
        {lineTotal != null ? (
          formatPriceOrAsk(lineTotal)
        ) : (
          <span className="cart-item__line-total-ask">
            Prix sur demande
          </span>
        )}
      </div>
    </li>
  );
}