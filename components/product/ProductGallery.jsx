"use client";

import { useEffect, useMemo, useState } from "react";
import ProductImage from "./ProductImage";
import Modal from "@/components/ui/Modal";
import "./ProductGallery.css";

/**
 * ProductGallery
 * Galerie d'images produit.
 *
 * - Desktop : image principale + miniatures
 * - Mobile  : slider horizontal (swipe)
 * - Clic miniature : change l'image principale
 * - Clic image principale : ouvre lightbox (Modal)
 *
 * ⚠️ Les données réelles ne fournissent qu'une seule image potentielle.
 *    Si `product.images` est absent, on utilise `product.image`.
 */
export default function ProductGallery({ product }) {
  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) return [product.image];
    return [];
  }, [product]);

  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Reset si le produit change
  useEffect(() => {
    setIndex(0);
  }, [product?.id]);

  const hasImages = images.length > 0;
  const currentSrc = hasImages ? images[index] : null;

  const goPrev = () => {
    if (images.length <= 1) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (images.length <= 1) return;
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="product-gallery">
      {/* Image principale */}
      <button
        type="button"
        className="product-gallery__main"
        onClick={() => hasImages && setLightbox(true)}
        aria-label="Agrandir l'image"
        disabled={!hasImages}
      >
        <ProductImage
          src={currentSrc}
          alt={product?.name || ""}
          ratio="1 / 1"
          sizes="(max-width: 1024px) 100vw, 560px"
          priority
          zoom={false}
        />

        {!hasImages && (
          <span className="product-gallery__empty-label">
            Photo à venir
          </span>
        )}
      </button>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="product-gallery__thumbs" role="tablist">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`product-gallery__thumb${
                i === index ? " is-active" : ""
              }`}
              onClick={() => setIndex(i)}
            >
              <ProductImage
                src={src}
                alt={`${product?.name || ""} — vue ${i + 1}`}
                ratio="1 / 1"
                sizes="80px"
                zoom={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Navigation mobile (affichée si > 1 image) */}
      {images.length > 1 && (
        <div className="product-gallery__nav">
          <button
            type="button"
            className="product-gallery__nav-btn"
            onClick={goPrev}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <span className="product-gallery__counter">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            className="product-gallery__nav-btn"
            onClick={goNext}
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>
      )}

      {/* Lightbox */}
      <Modal
        open={lightbox}
        onClose={() => setLightbox(false)}
        size="lg"
        title={product?.name}
      >
        <div className="product-gallery__lightbox">
          <ProductImage
            src={currentSrc}
            alt={product?.name || ""}
            ratio="1 / 1"
            sizes="(max-width: 1024px) 100vw, 860px"
            zoom={false}
          />

          {images.length > 1 && (
            <div className="product-gallery__lightbox-nav">
              <button
                type="button"
                className="product-gallery__nav-btn"
                onClick={goPrev}
                aria-label="Image précédente"
              >
                ‹
              </button>
              <span className="product-gallery__counter">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                className="product-gallery__nav-btn"
                onClick={goNext}
                aria-label="Image suivante"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}