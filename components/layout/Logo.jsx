"use client";

import Link from "next/link";
import { useState } from "react";
import "./Logo.css";

/**
 * Logo WYZ Accessoires
 * - Image officielle si disponible
 * - Fallback texte "WYZ" sinon
 * - Clic → accueil
 */
export default function Logo({ variant = "default", onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/"
      className={`logo logo--${variant}`}
      aria-label="WYZ Accessoires — Retour à l'accueil"
      onClick={onClick}
    >
      {!imgError ? (
        <img
          src="/images/brand/logo.png"
          alt="WYZ Accessoires"
          className="logo__img"
          onError={() => setImgError(true)}
          width={140}
          height={40}
        />
      ) : (
        <span className="logo__text">
          <span className="logo__text-wyz">WYZ</span>
          <span className="logo__text-sub">Accessoires</span>
        </span>
      )}
    </Link>
  );
}