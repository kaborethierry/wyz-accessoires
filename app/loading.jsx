// app/loading.jsx
import "./loading.css";

export default function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite" aria-busy="true">
      <div className="loading__inner">
        <div className="loading__logo" aria-hidden="true">
          <span className="loading__logo-text">WYZ</span>
        </div>

        <div className="loading__bar" aria-hidden="true">
          <span className="loading__bar-fill" />
        </div>

        <p className="loading__label">Chargement…</p>
      </div>

      <span className="sr-only">Chargement de la page en cours</span>
    </div>
  );
}