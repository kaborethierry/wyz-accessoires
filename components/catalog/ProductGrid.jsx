"use client";

import ProductCard from "@/components/product/ProductCard";
import "./ProductGrid.css";

/**
 * ProductGrid
 * Grille générique de produits.
 *
 * Responsive :
 *  - Mobile (< 480px)   : 2 colonnes compactes
 *  - Mobile (≤ 640px)   : 2 colonnes
 *  - Tablette (≥ 768px) : 2 colonnes
 *  - Desktop (≥ 1024px) : 3 colonnes
 *  - Grand écran (≥1440): 4 colonnes
 *
 * Animation : apparition progressive des cartes (stagger).
 */
export default function ProductGrid({ products = [], priorityCount = 2 }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="product-grid">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="product-grid__item"
          style={{ "--i": i }}
        >
          <ProductCard product={product} priority={i < priorityCount} />
        </div>
      ))}
    </div>
  );
}