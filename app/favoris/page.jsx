"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

import ProductGrid from "@/components/catalog/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";

import { useFavoritesStore } from "@/store/favoritesStore";
import { withImages } from "@/lib/products";

export default function FavorisPage() {
  const [mounted, setMounted] = useState(false);

  const items = useFavoritesStore((s) => s.items);
  const clear = useFavoritesStore((s) => s.clear);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const hasItems = items && items.length > 0;

  // ✅ Enrichit chaque favori avec son image calculée (.jpeg)
  const favProducts = withImages(items);

  return (
    <div className="favoris">
      <header className="favoris__header container">
        <p className="favoris__eyebrow">Votre sélection</p>
        <h1 className="favoris__title">Favoris</h1>
        <p className="favoris__subtitle">
          Les produits que vous avez enregistrés.
        </p>
      </header>

      {!hasItems ? (
        <div className="favoris__empty container">
          <EmptyState
            title="Aucun favori pour l'instant"
            description="Enregistrez vos produits préférés pour les retrouver ici."
            actionLabel="Découvrir la boutique"
            actionHref="/boutique"
          />
        </div>
      ) : (
        <>
          <div className="favoris__toolbar container">
            <p className="favoris__count" aria-live="polite">
              {favProducts.length} produit
              {favProducts.length > 1 ? "s" : ""} en favori
            </p>

            <div className="favoris__toolbar-actions">
              <Link href="/boutique" className="favoris__link">
                ← Continuer les achats
              </Link>

              <button
                type="button"
                className="favoris__clear"
                onClick={clear}
              >
                Vider les favoris
              </button>
            </div>
          </div>

          <div className="favoris__grid container">
            <ProductGrid products={favProducts} priorityCount={0} />
          </div>
        </>
      )}
    </div>
  );
}