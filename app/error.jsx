"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./error.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log minimal — à remplacer plus tard par un vrai logger
    console.error("[WYZ] Erreur route :", error);
  }, [error]);

  return (
    <div className="error-page" role="alert">
      <div className="error-page__inner">
        <div className="error-page__icon" aria-hidden="true">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
          </svg>
        </div>

        <h1 className="error-page__title">Une erreur est survenue</h1>

        <p className="error-page__text">
          Nous sommes désolés, quelque chose s&apos;est mal passé pendant le
          chargement de la page.
        </p>

        <div className="error-page__actions">
          <button
            type="button"
            className="error-page__btn error-page__btn--primary"
            onClick={() => reset()}
          >
            Réessayer
          </button>

          <Link href="/" className="error-page__btn error-page__btn--ghost">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}