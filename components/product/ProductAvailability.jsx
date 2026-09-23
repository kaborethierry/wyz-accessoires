// components/product/ProductAvailability.jsx
import "./ProductAvailability.css";

/**
 * ProductAvailability
 * Affiche la disponibilité du produit.
 *
 * États :
 *  - "available"   → Disponible
 *  - "unavailable" → Indisponible
 *  - "ask"         → Prix sur demande
 *
 * ⚠️ Aucune quantité de stock n'est affichée : cette information
 *    n'est pas fournie dans les données réelles.
 *
 * Props :
 *  - product          : objet produit
 *  - showAsk          : booléen, affiche l'état "ask" si prix null (défaut true)
 */
export default function ProductAvailability({
  product,
  showAsk = true,
  className = "",
}) {
  if (!product) return null;

  // Priorité : état "ask" si prix sur demande
  if (showAsk && product.price == null) {
    return (
      <span className={`product-availability is-ask ${className}`.trim()}>
        <span className="product-availability__dot" aria-hidden="true" />
        Prix sur demande
      </span>
    );
  }

  if (product.available === false) {
    return (
      <span className={`product-availability is-unavailable ${className}`.trim()}>
        <span className="product-availability__dot" aria-hidden="true" />
        Indisponible
      </span>
    );
  }

  if (product.available === true) {
    return (
      <span className={`product-availability is-available ${className}`.trim()}>
        <span className="product-availability__dot" aria-hidden="true" />
        Disponible
      </span>
    );
  }

  return null;
}