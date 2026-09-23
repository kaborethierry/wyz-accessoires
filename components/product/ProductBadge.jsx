// components/product/ProductBadge.jsx
import Badge from "@/components/ui/Badge";
import "./ProductBadge.css";

/**
 * ProductBadge
 * Badge spécifique produit.
 *
 * Seuls les badges suivants sont utilisés selon les données réelles :
 *  - "ask"       → Prix sur demande (si product.price == null)
 *  - "new"       → Nouveau (si product.isNew === true)
 *  - "available" → Disponible (si product.available === true)
 *
 * Aucun statut fictif n'est ajouté.
 */
export default function ProductBadge({ product, className = "" }) {
  if (!product) return null;

  const badges = [];

  if (product.price == null) {
    badges.push({ key: "ask", variant: "ask", label: "Prix sur demande" });
  }

  if (product.isNew === true) {
    badges.push({ key: "new", variant: "new", label: "Nouveau" });
  }

  if (product.available === true) {
    badges.push({ key: "available", variant: "available", label: "Disponible" });
  }

  if (badges.length === 0) return null;

  return (
    <div className={`product-badge-group ${className}`.trim()}>
      {badges.map((b) => (
        <Badge key={b.key} variant={b.variant} size="sm">
          {b.label}
        </Badge>
      ))}
    </div>
  );
}