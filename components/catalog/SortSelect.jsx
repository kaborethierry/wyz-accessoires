"use client";

import { useId } from "react";
import "./SortSelect.css";

/**
 * SortSelect
 * Tri des produits.
 *
 * Options :
 *  - default     : Par défaut
 *  - price-asc   : Prix croissant
 *  - price-desc  : Prix décroissant
 *  - name-asc    : Nom (A → Z)
 *  - name-desc   : Nom (Z → A)
 *
 * Les "nouveautés" ne sont pas exposées : aucune donnée fiable de date
 * de création n'existe dans le catalogue réel.
 */
export const SORT_OPTIONS = [
  { value: "default", label: "Par défaut" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-asc", label: "Nom (A → Z)" },
  { value: "name-desc", label: "Nom (Z → A)" },
];

const IconChevron = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function SortSelect({
  value = "default",
  onChange,
  options = SORT_OPTIONS,
  label = "Trier par",
  className = "",
}) {
  const id = useId();

  return (
    <div className={`sort-select ${className}`.trim()}>
      <label htmlFor={id} className="sort-select__label">
        {label}
      </label>

      <div className="sort-select__field">
        <select
          id={id}
          className="sort-select__control"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="sort-select__icon" aria-hidden="true">
          <IconChevron />
        </span>
      </div>
    </div>
  );
}