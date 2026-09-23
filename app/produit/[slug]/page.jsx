import { notFound } from "next/navigation";
import "./page.css";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductGrid from "@/components/catalog/ProductGrid";

import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  withImage,
  withImages,
} from "@/lib/products";

/**
 * Fiche produit détaillée.
 * Next.js 15/16 → params est une Promise, on l'await.
 * On enrichit les produits avec leur image calculée (category + slug).
 */

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: `${product.name} — ${product.priceDisplay}. WYZ Accessoires.`,
  };
}

export default async function ProduitPage({ params }) {
  const { slug } = await params;
  const raw = getProductBySlug(slug);

  if (!raw) {
    notFound();
  }

  // ✅ On enrichit le produit avec son image calculée
  const product = withImage(raw);

  // ✅ Idem pour les produits similaires
  const related = withImages(getRelatedProducts(product, 4));

  return (
    <div className="produit">
      {/* Fiche principale */}
      <div className="produit__main container">
        {/* Zone gauche : galerie */}
        <div className="produit__media">
          <ProductGallery product={product} />
        </div>

        {/* Zone droite : informations */}
        <div className="produit__details">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Produits similaires */}
      {related.length > 0 && (
        <section
          className="produit__related container"
          aria-label="Produits similaires"
        >
          <header className="produit__related-header">
            <h2 className="produit__related-title">Produits similaires</h2>
            <p className="produit__related-subtitle">
              Vous aimerez peut-être aussi ces articles.
            </p>
          </header>

          <ProductGrid products={related} priorityCount={0} />
        </section>
      )}
    </div>
  );
}