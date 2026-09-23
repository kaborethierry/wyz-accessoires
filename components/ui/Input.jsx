"use client";

import { forwardRef, useId, useState } from "react";
import "./Input.css";

/**
 * Input
 * Champ de formulaire réutilisable.
 *
 * États : normal | focus | erreur | disabled | filled
 */
const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    name,
    value,
    defaultValue,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    error,
    hint,
    icon = null,
    disabled = false,
    required = false,
    id,
    className = "",
    ...rest
  },
  ref
) {
  const autoId = useId();
  const inputId = id || `input-${autoId}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const [focused, setFocused] = useState(false);

  const hasValue =
    (value !== undefined && value !== null && String(value).length > 0) ||
    (defaultValue !== undefined &&
      defaultValue !== null &&
      String(defaultValue).length > 0);

  const classes = [
    "input",
    focused ? "is-focused" : "",
    error ? "is-error" : "",
    disabled ? "is-disabled" : "",
    hasValue ? "is-filled" : "",
    icon ? "has-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required"> *</span>}
        </label>
      )}

      <div className="input__field">
        {icon && (
          <span className="input__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className="input__control"
          onChange={onChange}
          onFocus={(e) => {
            setFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          {...rest}
        />
      </div>

      {error && (
        <p id={errorId} className="input__error" role="alert">
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={hintId} className="input__hint">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;