import Link from "next/link";
import { notFound } from "next/navigation";
import "./page.css";

import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogEmpty from "@/components/catalog/CatalogEmpty";
import { categories } from "@/data/categories";
import { getProductsByCategory, withImages } from "@/lib/products";

/**
 * Page catégorie dynamique.
 * Next.js 15/16 → params est une Promise, on l'await.
 */

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Catégorie introuvable" };

  return {
    title: category.name,
    description:
      category.description ||
      `Découvrez nos produits dans la catégorie ${category.name}.`,
  };
}

export default async function CategoriePage({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // ✅ Enrichit chaque produit avec son image calculée (.jpeg)
  const products = withImages(getProductsByCategory(category.slug));

  return (
    <div className="categorie">
      <header className="categorie__header container">
        <nav className="categorie__breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/boutique">Boutique</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{category.name}</span>
        </nav>

        <h1 className="categorie__title">{category.name}</h1>

        {category.description && (
          <p className="categorie__subtitle">{category.description}</p>
        )}

        <p className="categorie__count">
          {products.length} produit{products.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="categorie__main container">
        {products.length === 0 ? (
          <CatalogEmpty />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}