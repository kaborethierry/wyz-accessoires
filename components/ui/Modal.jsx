"use client";

import { useEffect, useRef, useState } from "react";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import "./Modal.css";

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

/**
 * Modal
 * Fenêtre modale générique.
 *
 * Props :
 *  - open
 *  - onClose
 *  - title (optionnel)
 *  - children
 *  - size : sm | md | lg | full
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  showClose = true,
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => setMounted(true), []);

  // Escape + focus initial
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const t = setTimeout(() => closeBtnRef.current?.focus(), 120);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`modal${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="modal__overlay"
        aria-label="Fermer"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`modal__panel modal__panel--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Fenêtre modale"}
      >
        {(title || showClose) && (
          <header className="modal__header">
            {title && <h2 className="modal__title">{title}</h2>}
            {showClose && (
              <button
                ref={closeBtnRef}
                type="button"
                className="modal__close"
                aria-label="Fermer"
                onClick={onClose}
              >
                <IconClose />
              </button>
            )}
          </header>
        )}

        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}