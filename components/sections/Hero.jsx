"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useScroll from "@/hooks/useScroll";
import { whatsappGeneralLink } from "@/lib/whatsapp";
import "./Hero.css";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

/**
 * Hero
 * Bannière d'accueil WYZ Accessoires.
 *
 * - Image de fond (à fournir plus tard → /images/brand/hero.jpg)
 * - Fallback : dégradé marron/orange
 * - Overlay marron semi-transparent
 * - Titre Playfair Display + sous-titre
 * - CTA Boutique + CTA WhatsApp
 * - Parallax léger au scroll
 * - Animation d'entrée
 *
 * ⚠️ Aucun slogan officiel n'est inventé. Le titre décrit WYZ factuellement.
 */
export default function Hero() {
  const { y } = useScroll(0);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => setMounted(true), []);

  // Parallax léger : max 80px
  const parallax = mounted ? Math.min(y * 0.25, 80) : 0;

  return (
    <section className="hero" aria-label="Bienvenue">
      {/* Image de fond */}
      <div
        className="hero__bg"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      >
        {!imgError ? (
          <img
            src="/images/brand/hero.jpg"
            alt=""
            className="hero__img"
            onError={() => setImgError(true)}
          />
        ) : null}
      </div>

      {/* Overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Contenu */}
      <div className="hero__content container">
        <p className="hero__eyebrow">Accessoires artisanaux</p>

        <h1 className="hero__title">
          WYZ Accessoires
        </h1>

        <p className="hero__subtitle">
          Sacs, trousses, accessoires enfant et articles maison — faits main en
          jute et wax.
        </p>

        <div className="hero__cta">
          <Link href="/boutique" className="hero__btn hero__btn--primary">
            Découvrir la boutique
          </Link>

          <a
            href={whatsappGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--whatsapp"
          >
            <IconWhatsApp />
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Éléments décoratifs */}
      <span className="hero__deco hero__deco--1" aria-hidden="true" />
      <span className="hero__deco hero__deco--2" aria-hidden="true" />
    </section>
  );
}