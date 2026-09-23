"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductBadge from "./ProductBadge";

import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";

import "./ProductCard.css";

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const IconHeartFilled = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/**
 * ProductCard
 * Carte produit principale.
 *
 * Props :
 *  - product
 *  - priority (booléen, pour next/image)
 */
export default function ProductCard({ product, priority = false }) {
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => setMounted(true), []);

  const addItem = useCartStore((s) => s.addItem);
  const toggleFav = useFavoritesStore((s) => s.toggle);

  if (!product) return null;

  const isFav = useFavoritesStore((s) =>
    s.items.some((it) => it.id === product.id)
  );

  const href = `/produit/${product.slug}`;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFav(product);
  };

  return (
    <article className="product-card">
      <Link href={href} className="product-card__link" aria-label={product.name}>
        <div className="product-card__media">
          <ProductBadge product={product} />
          <ProductImage
            src={product.image}
            alt={product.name}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          />
        </div>

        <div className="product-card__body">
          <h3 className="product-card__name">{product.name}</h3>

          <div className="product-card__price-row">
            <ProductPrice price={product.price} size="md" />
          </div>
        </div>
      </Link>

      {/* Actions en overlay (hover desktop / toujours mobile) */}
      <div className="product-card__actions">
        <button
          type="button"
          className={`product-card__icon-btn${
            mounted && isFav ? " is-active" : ""
          }`}
          onClick={handleFav}
          aria-label={
            mounted && isFav ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          aria-pressed={mounted ? isFav : undefined}
        >
          {mounted && isFav ? <IconHeartFilled /> : <IconHeart />}
        </button>

        <button
          type="button"
          className={`product-card__icon-btn product-card__icon-btn--cart${
            justAdded ? " is-just-added" : ""
          }`}
          onClick={handleAdd}
          aria-label="Ajouter au panier"
        >
          <IconCart />
        </button>
      </div>
    </article>
  );
}