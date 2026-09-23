"use client";

import { useMemo, useState } from "react";
import "./page.css";

import SearchBar from "@/components/catalog/SearchBar";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogEmpty from "@/components/catalog/CatalogEmpty";

import { searchProducts, getAllProducts, withImages } from "@/lib/products";

export default function RecherchePage() {
  const [query, setQuery] = useState("");

  // ✅ Liste brute enrichie (.jpeg)
  const all = useMemo(() => withImages(getAllProducts()), []);

  // ✅ Résultats enrichis (.jpeg)
  const results = useMemo(() => {
    if (!query || !query.trim()) return [];
    return withImages(searchProducts(query));
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="recherche">
      <header className="recherche__header container">
        <p className="recherche__eyebrow">Recherche</p>
        <h1 className="recherche__title">Trouver un produit</h1>
      </header>

      <div className="recherche__search container">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un produit…"
          autoFocus
        />
      </div>

      <div className="recherche__main container">
        {!hasQuery ? (
          <div className="recherche__idle">
            <p className="recherche__idle-text">
              Commencez à taper pour rechercher un produit.
            </p>
          </div>
        ) : results.length === 0 ? (
          <CatalogEmpty query={query} />
        ) : (
          <>
            <p className="recherche__count" aria-live="polite">
              {results.length} résultat{results.length > 1 ? "s" : ""} pour
              « {query} »
            </p>

            <ProductGrid products={results} />
          </>
        )}
      </div>
    </div>
  );
}