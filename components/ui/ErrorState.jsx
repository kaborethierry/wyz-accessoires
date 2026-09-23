// components/ui/ErrorState.jsx
import "./ErrorState.css";

const IconAlert = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" width="40" height="40" {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
  </svg>
);

/**
 * ErrorState
 * Erreur récupérable.
 *
 * Props :
 *  - title
 *  - message
 *  - onRetry (obligatoire pour afficher le bouton)
 *  - retryLabel (défaut "Réessayer")
 */
export default function ErrorState({
  title = "Une erreur est survenue",
  message = "Impossible de charger les données. Veuillez réessayer.",
  onRetry,
  retryLabel = "Réessayer",
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">
        <IconAlert />
      </div>

      <h3 className="error-state__title">{title}</h3>

      {message && <p className="error-state__message">{message}</p>}

      {onRetry && (
        <button
          type="button"
          className="error-state__retry"
          onClick={onRetry}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}