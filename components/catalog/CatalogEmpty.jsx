"use client";

import EmptyState from "@/components/ui/EmptyState";
import "./CatalogEmpty.css";

/**
 * CatalogEmpty
 * Aucun produit trouvé.
 *
 * Props :
 *  - onReset : callback pour réinitialiser les filtres
 *  - query   : recherche courante (optionnel)
 */
export default function CatalogEmpty({ onReset, query }) {
  const description = query
    ? `Aucun produit ne correspond à « ${query} ». Essayez un autre mot-clé ou réinitialisez les filtres.`
    : "Aucun produit ne correspond à vos filtres. Réinitialisez-les pour voir tout le catalogue.";

  return (
    <div className="catalog-empty">
      <EmptyState
        title="Aucun produit trouvé"
        description={description}
      />

      {onReset && (
        <div className="catalog-empty__actions">
          <button
            type="button"
            className="catalog-empty__reset"
            onClick={onReset}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}