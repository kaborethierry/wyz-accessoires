// components/ui/EmptyState.jsx
import Link from "next/link";
import "./EmptyState.css";

const IconBox = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" width="40" height="40" {...props}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
    <path d="M3 8l9 5 9-5" />
    <path d="M12 13v8" />
  </svg>
);

/**
 * EmptyState
 * Affichage pour un état sans données.
 *
 * Props :
 *  - icon (optionnel, remplace l'icône par défaut)
 *  - title
 *  - description
 *  - actionLabel
 *  - actionHref
 */
export default function EmptyState({
  icon = null,
  title = "Rien à afficher",
  description,
  actionLabel,
  actionHref,
}) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        {icon || <IconBox />}
      </div>

      <h3 className="empty-state__title">{title}</h3>

      {description && (
        <p className="empty-state__description">{description}</p>
      )}

      {actionLabel && actionHref && (
        <Link href={actionHref} className="empty-state__action">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}