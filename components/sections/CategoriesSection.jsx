import CategoryGrid from "@/components/catalog/CategoryGrid";
import "./CategoriesSection.css";

/**
 * CategoriesSection
 * Présente les quatre grandes catégories :
 * Sacs, Trousses, Enfant, Maison.
 *
 * Animation : apparition successive des cartes (gérée dans CategoryGrid).
 * Hover : zoom image + overlay (géré dans CategoryCard).
 */
export default function CategoriesSection() {
  return (
    <section className="categories-section" aria-label="Catégories">
      <div className="container">
        <header className="categories-section__header">
          <h2 className="categories-section__title">Nos catégories</h2>
          <p className="categories-section__subtitle">
            Explorez nos univers : sacs, trousses, enfant et maison.
          </p>
        </header>

        <CategoryGrid />
      </div>
    </section>
  );
}