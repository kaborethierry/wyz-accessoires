"use client";

import "./CatalogToolbar.css";

const IconGrid = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const IconSwipe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <rect x="7" y="3" width="10" height="18" rx="2" />
    <line x1="3" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="21" y2="12" />
  </svg>
);

const IconFilter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
  </svg>
);

/**
 * CatalogToolbar
 * Barre de contrôle du catalogue :
 *  - nombre de résultats
 *  - bouton filtres
 *  - tri
 *  - mode grille/swipe
 *
 * Props :
 *  - count           : nombre de résultats
 *  - sort            : valeur courante du tri
 *  - onSortChange    : callback(value)
 *  - view            : "grid" | "swipe"
 *  - onViewChange    : callback(view)
 *  - onOpenFilters   : callback (mobile)
 *  - compact         : booléen (mobile)
 */
export default function CatalogToolbar({
  count = 0,
  sort = "default",
  onSortChange,
  view = "grid",
  onViewChange,
  onOpenFilters,
  compact = false,
  sortComponent = null,
  className = "",
}) {
  return (
    <div
      className={`catalog-toolbar ${compact ? "is-compact" : ""} ${className}`}
    >
      {/* Nombre de résultats + filtres mobile */}
      <div className="catalog-toolbar__left">
        <p className="catalog-toolbar__count" aria-live="polite">
          {count} résultat{count > 1 ? "s" : ""}
        </p>

        {onOpenFilters && (
          <button
            type="button"
            className="catalog-toolbar__filter-btn"
            onClick={onOpenFilters}
            aria-label="Ouvrir les filtres"
          >
            <IconFilter />
            <span>Filtres</span>
          </button>
        )}
      </div>

      {/* Droite : tri + view switch */}
      <div className="catalog-toolbar__right">
        {sortComponent || (
          <div className="catalog-toolbar__sort-placeholder" />
        )}

        <div
          className="catalog-toolbar__view"
          role="group"
          aria-label="Mode d'affichage"
        >
          <button
            type="button"
            className={`catalog-toolbar__view-btn${
              view === "grid" ? " is-active" : ""
            }`}
            aria-pressed={view === "grid"}
            aria-label="Affichage en grille"
            onClick={() => onViewChange?.("grid")}
          >
            <IconGrid />
          </button>

          <button
            type="button"
            className={`catalog-toolbar__view-btn${
              view === "swipe" ? " is-active" : ""
            }`}
            aria-pressed={view === "swipe"}
            aria-label="Affichage en swipe"
            onClick={() => onViewChange?.("swipe")}
          >
            <IconSwipe />
          </button>
        </div>
      </div>
    </div>
  );
}