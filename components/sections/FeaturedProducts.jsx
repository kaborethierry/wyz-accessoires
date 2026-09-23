import Link from "next/link";
import ProductGrid from "@/components/catalog/ProductGrid";
import { getFeaturedProducts, withImages } from "@/lib/products";
import "./FeaturedProducts.css";

/**
 * FeaturedProducts
 * Mise en avant de produits issus de products.js.
 *
 * ⚠️ Aucun produit n'est inventé comme « vedette » :
 *    on utilise `getFeaturedProducts()` qui retourne les premiers
 *    produits ayant un prix défini (aucune donnée fictive).
 */
export default function FeaturedProducts({ limit = 8 }) {
  // ✅ Enrichit chaque produit avec son image calculée (.jpeg)
  const products = withImages(getFeaturedProducts(limit));

  if (!products || products.length === 0) return null;

  return (
    <section className="featured" aria-label="Produits en avant">
      <div className="container">
        <header className="featured__header">
          <h2 className="featured__title">Nos produits</h2>
          <p className="featured__subtitle">
            Une sélection d&apos;articles faits main en jute et wax.
          </p>
        </header>

        <div className="featured__grid">
          <ProductGrid products={products} priorityCount={2} />
        </div>

        <div className="featured__cta">
          <Link href="/boutique" className="featured__cta-btn">
            Voir toute la boutique
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}