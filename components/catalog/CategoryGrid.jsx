import CategoryCard from "./CategoryCard";
import { categories as defaultCategories } from "@/data/categories";
import "./CategoryGrid.css";

/**
 * CategoryGrid
 * Organisation des catégories.
 * Par défaut : Sacs, Trousses, Enfant, Maison (source data/categories.js).
 *
 * Props :
 *  - categories : override (optionnel)
 */
export default function CategoryGrid({ categories = defaultCategories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-grid">
      {categories.map((cat, i) => (
        <div
          key={cat.slug}
          className="category-grid__item"
          style={{ "--i": i }}
        >
          <CategoryCard category={cat} />
        </div>
      ))}
    </div>
  );
}