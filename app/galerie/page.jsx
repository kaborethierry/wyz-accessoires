"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./page.css";

import Modal from "@/components/ui/Modal";

/**
 * Page Galerie.
 *
 * ⚠️ Aucune photo inventée.
 *    Les slots pointent vers /public/images/gallery/*.jpeg.
 *    Tant que les photos ne sont pas fournies, un fallback « WYZ » s'affiche.
 *
 * Interactions :
 *  - clic image → Modal (lightbox)
 *  - navigation précédente / suivante
 *  - Escape → fermeture
 *  - flèches gauche/droite → navigation
 *  - swipe mobile
 */
export default function GaleriePage() {
  // Slots de 1 à 12 en .jpeg
  const images = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return {
          id: `img-${n}`,
          src: `/images/gallery/${n}.jpeg`,
          alt: `WYZ Accessoires — photo ${i + 1}`,
        };
      }),
    []
  );

  const [index, setIndex] = useState(-1); // -1 = fermé
  const open = index >= 0;

  const touchRef = useRef({ x: 0, active: false });

  const close = () => setIndex(-1);
  const next = () =>
    setIndex((i) => (i + 1 + images.length) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  // Clavier
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Swipe mobile
  const onTouchStart = (e) => {
    touchRef.current.x = e.touches[0].clientX;
    touchRef.current.active = true;
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current.active) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchRef.current.active = false;
  };

  return (
    <div className="galerie">
      {/* En-tête */}
      <header className="galerie__header container">
        <p className="galerie__eyebrow">Nos créations</p>
        <h1 className="galerie__title">Galerie</h1>
        <p className="galerie__subtitle">
          Quelques réalisations WYZ Accessoires.
        </p>
      </header>

      {/* Grille */}
      <div className="galerie__grid container">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            className="galerie__item"
            style={{ "--i": i }}
            onClick={() => setIndex(i)}
            aria-label={`Voir la photo ${i + 1}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="galerie__img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="galerie__fallback" aria-hidden="true">WYZ</span>
            <span className="galerie__overlay" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Modal
        open={open}
        onClose={close}
        size="full"
        showClose
      >
        <div
          className="galerie__lightbox"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {index >= 0 && (
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="galerie__lightbox-img"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <div className="galerie__lightbox-nav">
            <button
              type="button"
              className="galerie__nav-btn"
              onClick={prev}
              aria-label="Photo précédente"
            >
              ‹
            </button>

            <span className="galerie__counter">
              {index + 1} / {images.length}
            </span>

            <button
              type="button"
              className="galerie__nav-btn"
              onClick={next}
              aria-label="Photo suivante"
            >
              ›
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}