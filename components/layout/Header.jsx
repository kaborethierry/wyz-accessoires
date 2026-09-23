"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import CartBadge from "@/components/cart/CartBadge";

import useScroll from "@/hooks/useScroll";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";

import { mainNav } from "@/data/navigation";
import { whatsappGeneralLink } from "@/lib/whatsapp";

import "./Header.css";

/* ---------------------------------------------------------
   Icônes inline (pas de dépendance externe)
   --------------------------------------------------------- */
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.5" y2="16.5" />
  </svg>
);

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
  </svg>
);

const IconMenu = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

/* ---------------------------------------------------------
   Header
   --------------------------------------------------------- */
export default function Header() {
  const pathname = usePathname();
  const { scrolled, direction } = useScroll(20);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Évite les écarts SSR/client sur les compteurs
  useEffect(() => setMounted(true), []);

  // Ferme le menu mobile au changement de route
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const favoritesCount = useFavoritesStore((s) => s.items.length);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + it.quantity, 0)
  );

  // Header toujours solide : robuste sur toutes les pages
  const transparent = false;
  const hidden = direction === "down" && scrolled;

  const headerClass = [
    "header",
    transparent ? "header--transparent" : "header--solid",
    scrolled ? "header--scrolled" : "",
    hidden ? "header--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header className={headerClass}>
        <div className="header__inner container">
          {/* -------- Logo -------- */}
          <div className="header__left">
            <Logo variant={transparent ? "light" : "default"} />
          </div>

          {/* -------- Navigation desktop -------- */}
          <nav className="header__nav" aria-label="Navigation principale">
            <ul className="header__nav-list">
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`header__nav-link${
                        active ? " is-active" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* -------- Actions -------- */}
          <div className="header__actions">
            <Link
              href="/recherche"
              className="header__icon-btn"
              aria-label="Rechercher"
            >
              <IconSearch />
            </Link>

            <Link
              href="/favoris"
              className="header__icon-btn"
              aria-label="Favoris"
            >
              <IconHeart />
              {mounted && favoritesCount > 0 && (
                <span className="header__badge">{favoritesCount}</span>
              )}
            </Link>

            <Link
              href="/panier"
              className="header__icon-btn"
              aria-label="Panier"
            >
              <IconCart />
              {mounted && cartCount > 0 && (
                <span className="header__badge header__badge--cart">
                  {cartCount}
                </span>
              )}
            </Link>

            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="header__whatsapp"
              aria-label="Contacter sur WhatsApp"
            >
              <IconWhatsApp />
              <span className="header__whatsapp-label">WhatsApp</span>
            </a>

            <button
              type="button"
              className="header__menu-btn"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* -------- MobileMenu -------- */}
      <MobileMenu open={mobileOpen} onClose={closeMenu} />
    </>
  );
}