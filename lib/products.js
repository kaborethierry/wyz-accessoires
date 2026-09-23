// lib/products.js
// Couche d'accès aux produits WYZ Accessoires.
// Plus tard, cette couche pourra être reliée à une API sans refaire les composants.

import { products as RAW_PRODUCTS } from "@/data/products";

/**
 * Calcule le chemin d'image d'un produit par convention :
 *   /images/products/{category}/{slug}.jpeg
 *
 * - Si product.image est défini explicitement → on le respecte.
 * - Sinon, on construit depuis category + slug.
 * - Retourne null si l'un des deux manque.
 */
export function getProductImagePath(product) {
  if (!product) return null;
  if (product.image) return product.image;
  if (!product.category || !product.slug) return null;
  return `/images/products/${product.category}/${product.slug}.jpeg`;
}

/**
 * Enrichit un produit avec son image calculée (sans muter l'original).
 */
export function withImage(product) {
  if (!product) return null;
  return { ...product, image: getProductImagePath(product) };
}

/**
 * Enrichit une liste de produits.
 */
export function withImages(list) {
  if (!Array.isArray(list)) return [];
  return list.map(withImage);
}

/* ------------------------------------------------------------------
 * Accès brut
 * ------------------------------------------------------------------ */

export function getAllProducts() {
  return [...RAW_PRODUCTS];
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  return RAW_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getProductById(id) {
  if (!id) return null;
  return RAW_PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug) return [];
  return RAW_PRODUCTS.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(product, limit = 4) {
  if (!product || !product.category) return [];
  return RAW_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return RAW_PRODUCTS.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.slug && p.slug.toLowerCase().includes(q))
    );
  });
}

export function filterProducts(options = {}) {
  const { category, minPrice, maxPrice, hasPrice } = options;
  let list = [...RAW_PRODUCTS];

  if (category) {
    list = list.filter((p) => p.category === category);
  }

  if (typeof hasPrice === "boolean") {
    list = list.filter((p) =>
      hasPrice ? p.price != null : p.price == null
    );
  }

  if (typeof minPrice === "number") {
    list = list.filter((p) => p.price != null && p.price >= minPrice);
  }

  if (typeof maxPrice === "number") {
    list = list.filter((p) => p.price != null && p.price <= maxPrice);
  }

  return list;
}

export function sortProducts(list, sortKey = "default") {
  const arr = [...list];

  switch (sortKey) {
    case "price-asc":
      return arr.sort((a, b) => {
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price;
      });

    case "price-desc":
      return arr.sort((a, b) => {
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return b.price - a.price;
      });

    case "name-asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name, "fr"));

    case "name-desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name, "fr"));

    case "default":
    default:
      return arr;
  }
}

export function getFeaturedProducts(limit = 8) {
  return RAW_PRODUCTS.filter((p) => p.price != null).slice(0, limit);
}

export default {
  getAllProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  filterProducts,
  sortProducts,
  getFeaturedProducts,
  getProductImagePath,
  withImage,
  withImages,
};