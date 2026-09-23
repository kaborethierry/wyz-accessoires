"use client";

import { useEffect, useState, useId } from "react";
import useDebounce from "@/hooks/useDebounce";
import "./SearchBar.css";

const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.5" y2="16.5" />
  </svg>
);

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

/**
 * SearchBar
 * Barre de recherche produits.
 *
 * Props :
 *  - value         : valeur contrôlée (optionnel)
 *  - onChange      : callback(val) — reçoit la valeur DEBOUNCÉE
 *  - onInputChange : callback(val) — reçoit la valeur immédiate (optionnel)
 *  - delay         : délai debounce en ms (défaut 300)
 *  - placeholder
 */
export default function SearchBar({
  value,
  onChange,
  onInputChange,
  delay = 300,
  placeholder = "Rechercher un produit…",
  autoFocus = false,
  className = "",
}) {
  const id = useId();
  const [internal, setInternal] = useState(value ?? "");
  const debounced = useDebounce(internal, delay);

  // Sync externe → interne
  useEffect(() => {
    if (value !== undefined && value !== internal) {
      setInternal(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Déclenche onChange (debounced)
  useEffect(() => {
    if (onChange) onChange(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const handleInput = (e) => {
    const v = e.target.value;
    setInternal(v);
    if (onInputChange) onInputChange(v);
  };

  const clear = () => {
    setInternal("");
    if (onInputChange) onInputChange("");
    if (onChange) onChange("");
  };

  return (
    <div className={`search-bar ${className}`.trim()}>
      <label htmlFor={id} className="sr-only">
        Rechercher un produit
      </label>

      <span className="search-bar__icon" aria-hidden="true">
        <IconSearch />
      </span>

      <input
        id={id}
        type="search"
        className="search-bar__input"
        value={internal}
        onChange={handleInput}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />

      {internal.length > 0 && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={clear}
          aria-label="Effacer la recherche"
        >
          <IconClose />
        </button>
      )}
    </div>
  );
}