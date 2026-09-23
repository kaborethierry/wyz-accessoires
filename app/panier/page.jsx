"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";

import { useCartStore } from "@/store/cartStore";
import { whatsappCartLink } from "@/lib/whatsapp";
import { formatPriceOrAsk } from "@/lib/formatters";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

export default function PanierPage() {
  const [mounted, setMounted] = useState(false);

  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const hasItems = items && items.length > 0;
  const totalDisplay = formatPriceOrAsk(total);

  return (
    <div className="panier">
      {/* En-tête */}
      <header className="panier__header container">
        <p className="panier__eyebrow">Votre sélection</p>
        <h1 className="panier__title">Panier</h1>
      </header>

      {!hasItems ? (
        <div className="panier__empty container">
          <EmptyState
            title="Votre panier est vide"
            description="Parcourez la boutique pour ajouter des articles."
            actionLabel="Voir la boutique"
            actionHref="/boutique"
          />
        </div>
      ) : (
        <div className="panier__layout container">
          {/* Colonne principale */}
          <div className="panier__main">
            <CartList />

            <div className="panier__actions-top">
              <Link href="/boutique" className="panier__link">
                ← Continuer les achats
              </Link>

              <button
                type="button"
                className="panier__clear"
                onClick={clear}
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Colonne résumé */}
          <aside className="panier__aside" aria-label="Résumé du panier">
            <div className="panier__summary-card">
              <h2 className="panier__summary-title">Résumé</h2>

              <CartSummary />

              <div className="panier__summary-actions">
                <Link
                  href="/commande"
                  className="panier__btn panier__btn--primary"
                >
                  Passer commande
                </Link>

                <a
                  href={whatsappCartLink(items, total, totalDisplay)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panier__btn panier__btn--whatsapp"
                >
                  <IconWhatsApp />
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}