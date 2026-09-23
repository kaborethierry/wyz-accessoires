"use client";

import "./QuantityControl.css";

const IconMinus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="14" height="14" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="14" height="14" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * QuantityControl
 * Contrôle de quantité − / 1 / +
 *
 * Props :
 *  - value
 *  - onChange(newValue)
 *  - min (défaut 1)
 *  - max (optionnel)
 *  - size : sm | md
 *  - disabled
 */
export default function QuantityControl({
  value = 1,
  onChange,
  min = 1,
  max = Infinity,
  size = "md",
  disabled = false,
  className = "",
}) {
  const dec = () => {
    if (disabled) return;
    const next = Math.max(min, value - 1);
    if (next !== value && onChange) onChange(next);
  };

  const inc = () => {
    if (disabled) return;
    const next = Math.min(max, value + 1);
    if (next !== value && onChange) onChange(next);
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      className={`qty qty--${size} ${disabled ? "is-disabled" : ""} ${className}`}
      role="group"
      aria-label="Quantité"
    >
      <button
        type="button"
        className="qty__btn"
        onClick={dec}
        disabled={disabled || atMin}
        aria-label="Diminuer la quantité"
      >
        <IconMinus />
      </button>

      <span className="qty__value" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        className="qty__btn"
        onClick={inc}
        disabled={disabled || atMax}
        aria-label="Augmenter la quantité"
      >
        <IconPlus />
      </button>
    </div>
  );
}