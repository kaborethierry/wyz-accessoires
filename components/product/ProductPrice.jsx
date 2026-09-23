// components/product/ProductPrice.jsx
import { formatPriceOrAsk } from "@/lib/formatters";
import "./ProductPrice.css";

/**
 * ProductPrice
 * Affichage normalisé du prix.
 *
 * Props :
 *  - price        : nombre ou null
 *  - size         : sm | md | lg
 *  - askLabel     : texte pour "prix sur demande" (défaut "Prix sur demande")
 *  - align        : left | center | right
 */
export default function ProductPrice({
  price,
  size = "md",
  askLabel = "Prix sur demande",
  align = "left",
  className = "",
}) {
  const isAsk = price == null;

  return (
    <span
      className={[
        "product-price",
        `product-price--${size}`,
        isAsk ? "is-ask" : "is-number",
        `product-price--${align}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isAsk ? askLabel : formatPriceOrAsk(price)}
    </span>
  );
}