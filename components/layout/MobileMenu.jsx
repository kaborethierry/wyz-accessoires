"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Logo from "./Logo";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { mainNav } from "@/data/navigation";
import { whatsappGeneralLink } from "@/lib/whatsapp";

import "./MobileMenu.css";

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23z" />
  </svg>
);

export default function MobileMenu({ open, onClose }) {
  const pathname = usePathname();
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => setMounted(true), []);

  // Ferme au changement de route
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape + focus initial
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Focus initial
    const t = setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 120);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Piège de focus simple
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      id="mobile-menu"
      className={`mobile-menu${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        className="mobile-menu__overlay"
        aria-label="Fermer le menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      {/* Panneau */}
      <aside
        ref={panelRef}
        className="mobile-menu__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        <div className="mobile-menu__header">
          <Logo onClick={onClose} />
          <button
            type="button"
            className="mobile-menu__close"
            aria-label="Fermer le menu"
            onClick={onClose}
          >
            <IconClose />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Navigation mobile">
          <ul className="mobile-menu__list">
            {mainNav.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li
                  key={item.href}
                  className="mobile-menu__item"
                  style={{ "--i": index }}
                >
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    className={`mobile-menu__link${
                      active ? " is-active" : ""
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <a
            href={whatsappGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__whatsapp"
            onClick={onClose}
          >
            <IconWhatsApp />
            <span>Contacter sur WhatsApp</span>
          </a>
        </div>
      </aside>
    </div>
  );
}