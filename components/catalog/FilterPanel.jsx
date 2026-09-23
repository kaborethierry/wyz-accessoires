"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import "./FilterPanel.css";

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

/**
 * FilterPanel
 * Filtrage du catalogue.
 *
 * Filtres prévus :
 *  - catégorie
 *  - disponibilité (disponible / prix sur demande)
 *  - matière (non utilisé : aucune donnée fiable)
 *  - autres métadonnées futures
 *
 * Mobile  : panneau coulissant (bottom sheet / off-canvas)
 * Desktop : panneau intégré (mode inline)
 *
 * Props :
 *  - open, onClose (mobile)
 *  - variant : "inline" | "drawer" (défaut "inline")
 *  - filters  : { category, availability }
 *  - onChange : (newFilters) => void
 *  - onReset  : () => void
 */
export default function FilterPanel({
  open = false,
  onClose,
  variant = "inline",
  filters = {},
  onChange,
  onReset,
}) {
  const [mounted, setMounted] = useState(false);
  const [local, setLocal] = useState({
    category: filters.category ?? "",
    availability: filters.availability ?? "",
  });

  useEffect(() => setMounted(true), []);

  // Sync externe
  useEffect(() => {
    setLocal({
      category: filters.category ?? "",
      availability: filters.availability ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.availability]);

  // Escape en mode drawer
  useEffect(() => {
    if (variant !== "drawer" || !open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [variant, open, onClose]);

  const apply = (patch) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange?.(next);
  };

  const handleReset = () => {
    const next = { category: "", availability: "" };
    setLocal(next);
    onChange?.(next);
    onReset?.();
  };

  if (!mounted) return null;

  const isDrawer = variant === "drawer";
  const panelClass = [
    "filter-panel",
    isDrawer ? "filter-panel--drawer" : "filter-panel--inline",
    isDrawer && open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div className="filter-panel__content">
      <header className="filter-panel__header">
        <h3 className="filter-panel__title">Filtres</h3>
        {isDrawer && (
          <button
            type="button"
            className="filter-panel__close"
            aria-label="Fermer les filtres"
            onClick={onClose}
          >
            <IconClose />
          </button>
        )}
      </header>

      {/* Catégorie */}
      <section className="filter-panel__section">
        <h4 className="filter-panel__section-title">Catégorie</h4>
        <ul className="filter-panel__options">
          <li>
            <label className="filter-panel__option">
              <input
                type="radio"
                name="filter-category"
                value=""
                checked={local.category === ""}
                onChange={() => apply({ category: "" })}
              />
              <span>Toutes</span>
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <label className="filter-panel__option">
                <input
                  type="radio"
                  name="filter-category"
                  value={cat.slug}
                  checked={local.category === cat.slug}
                  onChange={() => apply({ category: cat.slug })}
                />
                <span>{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Disponibilité */}
      <section className="filter-panel__section">
        <h4 className="filter-panel__section-title">Disponibilité</h4>
        <ul className="filter-panel__options">
          <li>
            <label className="filter-panel__option">
              <input
                type="radio"
                name="filter-availability"
                value=""
                checked={local.availability === ""}
                onChange={() => apply({ availability: "" })}
              />
              <span>Toutes</span>
            </label>
          </li>
          <li>
            <label className="filter-panel__option">
              <input
                type="radio"
                name="filter-availability"
                value="available"
                checked={local.availability === "available"}
                onChange={() => apply({ availability: "available" })}
              />
              <span>Avec prix</span>
            </label>
          </li>
          <li>
            <label className="filter-panel__option">
              <input
                type="radio"
                name="filter-availability"
                value="ask"
                checked={local.availability === "ask"}
                onChange={() => apply({ availability: "ask" })}
              />
              <span>Prix sur demande</span>
            </label>
          </li>
        </ul>
      </section>

      {/* Reset */}
      <div className="filter-panel__footer">
        <button
          type="button"
          className="filter-panel__reset"
          onClick={handleReset}
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );

  // Mode drawer (mobile)
  if (isDrawer) {
    return (
      <div className={panelClass} aria-hidden={!open}>
        <button
          type="button"
          className="filter-panel__overlay"
          aria-label="Fermer les filtres"
          tabIndex={open ? 0 : -1}
          onClick={onClose}
        />
        <aside
          className="filter-panel__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Filtres"
        >
          {content}
        </aside>
      </div>
    );
  }

  // Mode inline (desktop)
  return <div className={panelClass}>{content}</div>;
}