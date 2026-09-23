"use client";

import { useEffect, useState } from "react";
import "./Toast.css";

const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconInfo = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="10" x2="12" y2="16" />
    <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
  </svg>
);

const IconError = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
  </svg>
);

/**
 * Toast
 * Notification temporaire.
 *
 * Props :
 *  - open
 *  - message
 *  - variant : success | info | error
 *  - duration (ms)
 *  - onClose
 */
export default function Toast({
  open,
  message,
  variant = "success",
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;

    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 260);
    }, duration);

    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open && !visible) return null;

  return (
    <div
      className={`toast toast--${variant}${visible ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast__icon" aria-hidden="true">
        {variant === "success" && <IconCheck />}
        {variant === "info" && <IconInfo />}
        {variant === "error" && <IconError />}
      </span>
      <span className="toast__message">{message}</span>
    </div>
  );
}