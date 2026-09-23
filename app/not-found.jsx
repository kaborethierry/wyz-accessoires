// app/not-found.jsx
import Link from "next/link";
import "./not-found.css";

export const metadata = {
  title: "Page introuvable",
  description: "La page demandée n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__inner">
        <div className="notfound__code" aria-hidden="true">
          <span>4</span>
          <span className="notfound__code-dot">0</span>
          <span>4</span>
        </div>

        <h1 className="notfound__title">Page introuvable</h1>

        <p className="notfound__text">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="notfound__actions">
          <Link
            href="/boutique"
            className="notfound__btn notfound__btn--primary"
          >
            Voir la boutique
          </Link>

          <Link href="/" className="notfound__btn notfound__btn--ghost">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}