// components/product/ProductInfo.jsx
import ProductPrice from "./ProductPrice";
import ProductAvailability from "./ProductAvailability";
import ProductActions from "./ProductActions";
import { categories } from "@/data/categories";
import "./ProductInfo.css";

/**
 * ProductInfo
 * Informations produit sur la fiche.
 *
 * Données absentes :
 * - La description n'existe pas dans les données réelles.
 *   → Affichage : « Description à compléter »
 *
 * Props :
 *  - product
 */
export default function ProductInfo({ product }) {
  if (!product) return null;

  const category = categories.find((c) => c.slug === product.category);
  const categoryLabel = category?.name || product.category;

  return (
    <div className="product-info">
      {/* Catégorie */}
      {categoryLabel && (
        <p className="product-info__category">{categoryLabel}</p>
      )}

      {/* Nom */}
      <h1 className="product-info__name">{product.name}</h1>

      {/* Prix */}
      <div className="product-info__price">
        <ProductPrice price={product.price} size="lg" />
      </div>

      {/* Disponibilité */}
      <div className="product-info__availability">
        <ProductAvailability product={product} />
      </div>

      {/* Description */}
      <div className="product-info__description">
        <h2 className="product-info__description-title">Description</h2>
        <p className="product-info__description-text">
          {product.description && product.description.trim().length > 0
            ? product.description
            : "Description à compléter."}
        </p>
      </div>

      {/* Actions */}
      <div className="product-info__actions">
        <ProductActions product={product} layout="column" />
      </div>
    </div>
  );
}