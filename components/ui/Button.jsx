"use client";

import Link from "next/link";
import { forwardRef } from "react";
import "./Button.css";

/**
 * Button
 * Bouton universel WYZ.
 *
 * Variantes : primary | secondary | outline | whatsapp | danger | ghost
 * Tailles   : sm | md | lg
 * États     : normal | hover | active | focus | disabled | loading
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    href,
    external = false,
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon = null,
    rightIcon = null,
    type = "button",
    className = "",
    ...rest
  },
  ref
) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "is-loading" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className="btn__label">{children}</span>
      {!loading && rightIcon && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  );

  // Lien
  if (href) {
    const isExternal =
      external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <Link
        ref={ref}
        href={href}
        className={classes}
        aria-disabled={disabled || loading ? "true" : undefined}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  // Bouton natif
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;