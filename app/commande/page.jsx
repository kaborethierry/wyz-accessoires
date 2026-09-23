"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import CartSummary from "@/components/cart/CartSummary";

import { useCartStore } from "@/store/cartStore";
import { whatsappCartLink } from "@/lib/whatsapp";
import { formatPriceOrAsk } from "@/lib/formatters";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

/**
 * Page commande.
 *
 * ⚠️ IMPORTANT :
 *  - Aucun mode de paiement n'est inventé.
 *  - Aucun mode de livraison n'est inventé.
 *  - Les tarifs de livraison ne sont pas affichés.
 *
 *  La confirmation redirige vers WhatsApp avec le récapitulatif complet.
 *  Architecture prête à être reliée à une API/backend plus tard :
 *  la fonction `submitOrder` est isolée et peut être remplacée.
 */
export default function CommandePage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => setMounted(true), []);

  const hasItems = items && items.length > 0;
  const totalDisplay = formatPriceOrAsk(total);

  // Lien WhatsApp prérempli
  const waLink = useMemo(
    () => whatsappCartLink(items, total, totalDisplay),
    [items, total, totalDisplay]
  );

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Veuillez indiquer votre nom.";
    if (!form.phone.trim()) errs.phone = "Veuillez indiquer votre téléphone.";
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      errs.email = "Adresse email invalide.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * Confirmation de commande.
   * Actuellement : redirection WhatsApp avec récapitulatif.
   * Évolution future : remplacer par un appel API.
   */
  const submitOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Ouvre WhatsApp avec le récapitulatif
    if (typeof window !== "undefined") {
      window.open(waLink, "_blank", "noopener,noreferrer");
    }
  };

  if (!mounted) return null;

  // Panier vide
  if (!hasItems) {
    return (
      <div className="commande">
        <header className="commande__header container">
          <p className="commande__eyebrow">Finaliser</p>
          <h1 className="commande__title">Commande</h1>
        </header>

        <div className="commande__empty container">
          <EmptyState
            title="Votre panier est vide"
            description="Ajoutez des articles avant de passer commande."
            actionLabel="Voir la boutique"
            actionHref="/boutique"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="commande">
      {/* En-tête */}
      <header className="commande__header container">
        <p className="commande__eyebrow">Finaliser</p>
        <h1 className="commande__title">Commande</h1>
        <p className="commande__subtitle">
          Renseignez vos informations, puis confirmez via WhatsApp.
        </p>
      </header>

      <div className="commande__layout container">
        {/* Colonne formulaire */}
        <form
          className="commande__form"
          onSubmit={submitOrder}
          noValidate
        >
          <h2 className="commande__section-title">Informations client</h2>

          <div className="commande__fields">
            <Input
              label="Nom complet"
              name="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Votre nom"
              required
              error={errors.name}
            />

            <Input
              label="Téléphone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+226 ..."
              required
              error={errors.phone}
            />

            <Input
              label="Email (optionnel)"
              name="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="votre@email.com"
              error={errors.email}
              hint="Utile pour vous envoyer la confirmation."
            />
          </div>

          <h2 className="commande__section-title">Note (optionnel)</h2>

          <div className="commande__fields">
            <div className="commande__textarea-wrap">
              <label
                htmlFor="commande-note"
                className="commande__textarea-label"
              >
                Message complémentaire
              </label>
              <textarea
                id="commande-note"
                className="commande__textarea"
                rows={4}
                value={form.note}
                onChange={update("note")}
                placeholder="Précisions, adresse, préférences…"
              />
            </div>
          </div>

          <p className="commande__info">
            Après confirmation, vous serez redirigé(e) vers WhatsApp pour
            finaliser votre commande avec nous.
          </p>

          <button
            type="submit"
            className="commande__btn commande__btn--primary"
          >
            Confirmer la commande
          </button>
        </form>

        {/* Colonne résumé */}
        <aside className="commande__aside" aria-label="Résumé de la commande">
          <div className="commande__summary-card">
            <h2 className="commande__summary-title">Résumé</h2>

            <ul className="commande__items">
              {items.map((it) => (
                <li key={it.id} className="commande__item">
                  <span className="commande__item-name">
                    {it.name}
                    <span className="commande__item-qty">× {it.quantity}</span>
                  </span>
                  <span className="commande__item-price">
                    {it.price != null
                      ? formatPriceOrAsk(it.price * it.quantity)
                      : "Prix sur demande"}
                  </span>
                </li>
              ))}
            </ul>

            <CartSummary showShippingNote />

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="commande__btn commande__btn--whatsapp"
            >
              <IconWhatsApp />
              <span>Envoyer sur WhatsApp</span>
            </a>

            <Link href="/panier" className="commande__back">
              ← Retour au panier
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}