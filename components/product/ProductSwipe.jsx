"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductBadge from "./ProductBadge";
import "./ProductSwipe.css";

/**
 * ProductSwipe
 * Expérience catalogue Swipe.
 *
 * - Une carte au premier plan
 * - Glisser gauche / droite pour passer au produit suivant/précédent
 * - Seuil de validation basé sur distance OU vitesse
 * - Retour élastique sinon
 * - Rotation légère pendant le drag
 * - Le geste n'empêche pas le scroll vertical (touch-action: pan-y)
 *
 * Props :
 *  - products : tableau de produits
 *  - onSelect(product) : callback clic carte
 */
export default function ProductSwipe({ products = [], onSelect }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, dragging: false });
  const [leaving, setLeaving] = useState(null);

  const cardRef = useRef(null);
  const stateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startT: 0,
    lastX: 0,
    lastT: 0,
    lockedVertical: false,
  });

  const total = products.length;
  const current = useMemo(
    () => (total > 0 ? products[index % total] : null),
    [products, index, total]
  );

  const reset = useCallback(() => {
    stateRef.current = {
      active: false,
      startX: 0,
      startY: 0,
      startT: 0,
      lastX: 0,
      lastT: 0,
      lockedVertical: false,
    };
    setDrag({ x: 0, dragging: false });
  }, []);

  const goNext = useCallback(() => {
    if (total <= 1) {
      reset();
      return;
    }
    setLeaving("left");
    setTimeout(() => {
      setIndex((i) => (i + 1) % total);
      setLeaving(null);
      setDrag({ x: 0, dragging: false });
    }, 220);
  }, [total, reset]);

  const goPrev = useCallback(() => {
    if (total <= 1) {
      reset();
      return;
    }
    setLeaving("right");
    setTimeout(() => {
      setIndex((i) => (i - 1 + total) % total);
      setLeaving(null);
      setDrag({ x: 0, dragging: false });
    }, 220);
  }, [total, reset]);

  // Pointer events
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onDown = (e) => {
      if (leaving) return;
      const s = stateRef.current;
      s.active = true;
      s.startX = e.clientX;
      s.startY = e.clientY;
      s.startT = performance.now();
      s.lastX = e.clientX;
      s.lastT = s.startT;
      s.lockedVertical = false;
      setDrag({ x: 0, dragging: true });
    };

    const onMove = (e) => {
      const s = stateRef.current;
      if (!s.active) return;

      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;

      // Détection direction : si vertical dominant, on n'agit pas
      if (!s.lockedVertical) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
          s.lockedVertical = true;
          s.active = false;
          setDrag({ x: 0, dragging: false });
          return;
        }
      }

      if (s.lockedVertical) return;

      s.lastX = e.clientX;
      s.lastT = performance.now();
      setDrag({ x: dx, dragging: true });
    };

    const onUp = (e) => {
      const s = stateRef.current;
      if (!s.active) {
        reset();
        return;
      }

      const dx = e.clientX - s.startX;
      const dt = Math.max(1, performance.now() - s.startT);
      const vx = dx / dt;

      const distance = Math.abs(dx);
      const swipeLeft = dx < 0 && (distance > 80 || vx < -0.4);
      const swipeRight = dx > 0 && (distance > 80 || vx > 0.4);

      if (swipeLeft) {
        goNext();
      } else if (swipeRight) {
        goPrev();
      } else {
        // Retour élastique
        reset();
      }
    };

    const onCancel = () => reset();

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    el.addEventListener("pointerleave", onCancel);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("pointerleave", onCancel);
    };
  }, [goNext, goPrev, reset, leaving]);

  if (!current) {
    return (
      <div className="product-swipe">
        <div className="product-swipe__empty">Aucun produit à afficher.</div>
      </div>
    );
  }

  const rot = drag.x / 18;
  const scale = 1 - Math.min(Math.abs(drag.x) / 1200, 0.06);
  const opacity = 1 - Math.min(Math.abs(drag.x) / 700, 0.35);

  const cardStyle = {
    transform: `translate3d(${drag.x}px, 0, 0) rotate(${rot}deg) scale(${scale})`,
    opacity,
    transition: drag.dragging
      ? "none"
      : "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms cubic-bezier(0.22,1,0.36,1)",
  };

  if (leaving === "left") {
    cardStyle.transform = `translate3d(-120%, 0, 0) rotate(-12deg) scale(0.96)`;
    cardStyle.opacity = 0;
    cardStyle.transition =
      "transform 220ms cubic-bezier(0.22,1,0.36,1), opacity 220ms cubic-bezier(0.22,1,0.36,1)";
  } else if (leaving === "right") {
    cardStyle.transform = `translate3d(120%, 0, 0) rotate(12deg) scale(0.96)`;
    cardStyle.opacity = 0;
    cardStyle.transition =
      "transform 220ms cubic-bezier(0.22,1,0.36,1), opacity 220ms cubic-bezier(0.22,1,0.36,1)";
  }

  const href = `/produit/${current.slug}`;

  const handleClick = (e) => {
    // Si on vient de dragger suffisamment, on ne navigue pas
    if (Math.abs(drag.x) > 6) {
      e.preventDefault();
      return;
    }
    if (onSelect) {
      e.preventDefault();
      onSelect(current);
    }
  };

  return (
    <div className="product-swipe">
      <div className="product-swipe__stack">
        <article
          ref={cardRef}
          className="product-swipe__card"
          style={cardStyle}
        >
          <ProductBadge product={current} />

          <Link
            href={href}
            className="product-swipe__link"
            onClick={handleClick}
            draggable={false}
          >
            <div className="product-swipe__media">
              <ProductImage
                src={current.image}
                alt={current.name}
                ratio="1 / 1"
                sizes="(max-width: 640px) 90vw, 420px"
                priority
                zoom={false}
              />
            </div>

            <div className="product-swipe__body">
              <h3 className="product-swipe__name">{current.name}</h3>
              <ProductPrice price={current.price} size="md" />
            </div>
          </Link>
        </article>
      </div>

      {/* Navigation + compteur */}
      <div className="product-swipe__nav">
        <button
          type="button"
          className="product-swipe__nav-btn"
          onClick={goPrev}
          aria-label="Produit précédent"
        >
          ‹
        </button>

        <span className="product-swipe__counter" aria-live="polite">
          {index + 1} / {total}
        </span>

        <button
          type="button"
          className="product-swipe__nav-btn"
          onClick={goNext}
          aria-label="Produit suivant"
        >
          ›
        </button>
      </div>

      <p className="product-swipe__hint">
        Glissez la carte à gauche ou à droite pour découvrir d&apos;autres
        produits.
      </p>
    </div>
  );
}