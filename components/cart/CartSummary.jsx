"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPriceOrAsk } from "@/lib/formatters";
import "./CartSummary.css";

/**
 * CartSummary
 * Résumé financier du panier.
 * - Affiche le sous-total et le total.
 * - NE PAS inventer de frais de livraison : rien n'est encore défini.
 * - Animation douce à chaque changement de total.
 */
export default function CartSummary({ showShippingNote = true }) {
  const total = useCartStore((s) => s.total());
  const count = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  );

  const [displayTotal, setDisplayTotal] = useState(total);
  const [pulseKey, setPulseKey] = useState(0);

  // Animation douce : petite transition sur la valeur
  useEffect(() => {
    setDisplayTotal(total);
    setPulseKey((k) => k + 1);
  }, [total]);

  return (
    <div className="cart-summary">
      <div className="cart-summary__row">
        <span className="cart-summary__label">
          Sous-total ({count} article{count > 1 ? "s" : ""})
        </span>
        <span className="cart-summary__value">
          {formatPriceOrAsk(displayTotal)}
        </span>
      </div>

      <div className="cart-summary__divider" aria-hidden="true" />

      <div className="cart-summary__row cart-summary__row--total">
        <span className="cart-summary__label cart-summary__label--total">
          Total
        </span>
        <span
          key={pulseKey}
          className="cart-summary__value cart-summary__value--total"
        >
          {formatPriceOrAsk(displayTotal)}
        </span>
      </div>

      {showShippingNote && (
        <p className="cart-summary__note">
          Frais de livraison communiqués sur WhatsApp.
        </p>
      )}
    </div>
  );
}