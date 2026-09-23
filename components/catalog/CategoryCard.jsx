import Link from "next/link";
import ProductImage from "@/components/product/ProductImage";
import "./CategoryCard.css";

/**
 * CategoryCard
 * Carte catégorie.
 *
 * Props :
 *  - category : { slug, name, description, image }
 *  - href     : lien personnalisé (par défaut /categorie/{slug})
 */
export default function CategoryCard({ category, href }) {
  if (!category) return null;

  const link = href || `/categorie/${category.slug}`;
  const imageSrc =
    category.image || `/images/categories/${category.slug}.jpeg`;

  return (
    <Link href={link} className="category-card" aria-label={category.name}>
      <div className="category-card__media">
        <ProductImage
          src={imageSrc}
          alt={category.name}
          ratio="4 / 5"
          zoom={false}
        />
        <div className="category-card__overlay" aria-hidden="true" />
      </div>

      <div className="category-card__body">
        <h3 className="category-card__name">{category.name}</h3>
        {category.description && (
          <p className="category-card__desc">{category.description}</p>
        )}
        <span className="category-card__cta">
          Découvrir
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
  );
}