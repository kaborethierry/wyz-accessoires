"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useScroll from "@/hooks/useScroll";
import { whatsappGeneralLink } from "@/lib/whatsapp";
import "./Hero.css";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
  </svg>
);

/* ---------------------------------------------------------
   Images du diaporama (fichiers dans public/images/brand/)
   --------------------------------------------------------- */
const HERO_SLIDES = [
  {
    src: "/images/brand/hero.jpg",
    alt: "WYZ Accessoires — créations en jute et wax",
  },
  {
    src: "/images/brand/story.jpg",
    alt: "Atelier WYZ Accessoires",
  },
  {
    src: "/images/brand/caba-zina.jpeg",
    alt: "Caba Zina — sac artisanal WYZ",
  },
];

const SLIDE_INTERVAL_MS = 6000; // 6 secondes par image

/**
 * Titre « WYZ Accessoires » avec lettres qui changent de couleur
 * en boucle continue + effet de vague (jonglage).
 */
function AnimatedTitle({ text = "WYZ Accessoires" }) {
  const chars = Array.from(text);

  return (
    <h1 className="hero__title" aria-label={text}>
      {chars.map((char, i) => {
        const isSpace = char === " ";
        return (
          <span
            key={`${char}-${i}`}
            className={`hero__letter${isSpace ? " is-space" : ""}`}
            aria-hidden="true"
            style={{ "--i": i }}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
}

/**
 * Sous-titre défilant en boucle horizontale (marquee).
 */
function MarqueeSubtitle({
  text = "Sacs, trousses, accessoires enfant et articles maison — faits main en jute et wax.",
}) {
  return (
    <div className="hero__marquee" role="marquee" aria-label={text}>
      <div className="hero__marquee-track" aria-hidden="true">
        <span className="hero__marquee-item">{text}</span>
        <span className="hero__marquee-sep">•</span>
        <span className="hero__marquee-item">{text}</span>
        <span className="hero__marquee-sep">•</span>
      </div>
    </div>
  );
}

/**
 * Hero
 * Bannière d'accueil WYZ Accessoires avec diaporama automatique.
 */
export default function Hero() {
  const { y } = useScroll(0);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState({});

  useEffect(() => setMounted(true), []);

  // Rotation automatique des images
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    // Respecte prefers-reduced-motion : pas de rotation si l'utilisateur
    // a demandé à réduire les animations
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [mounted]);

  const handleImgError = (src) => {
    setFailedSrcs((prev) => ({ ...prev, [src]: true }));
  };

  // Parallax léger : max 80px
  const parallax = mounted ? Math.min(y * 0.25, 80) : 0;

  return (
    <section className="hero" aria-label="Bienvenue">
      {/* Diaporama */}
      <div
        className="hero__bg"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      >
        {HERO_SLIDES.map((slide, i) => {
          const isActive = i === activeIndex;
          const hasFailed = failedSrcs[slide.src];
          return (
            <div
              key={slide.src}
              className={`hero__slide${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
            >
              {!hasFailed && (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="hero__img"
                  onError={() => handleImgError(slide.src)}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Contenu */}
      <div className="hero__content container">
        {/* Eyebrow : italique, gras, rose lumineux, ombre */}
        <p className="hero__eyebrow">Accessoires artisanaux</p>

        {/* Titre animé lettre par lettre */}
        <AnimatedTitle text="WYZ Accessoires" />

        {/* Sous-titre défilant en boucle */}
        <MarqueeSubtitle
          text="Sacs, trousses, accessoires enfant et articles maison — faits main en jute et wax."
        />

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

      {/* Indicateurs de slide */}
      <div className="hero__dots" role="tablist" aria-label="Choisir une image">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Image ${i + 1} sur ${HERO_SLIDES.length}`}
            className={`hero__dot${i === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Éléments décoratifs */}
      <span className="hero__deco hero__deco--1" aria-hidden="true" />
      <span className="hero__deco hero__deco--2" aria-hidden="true" />
    </section>
  );
}