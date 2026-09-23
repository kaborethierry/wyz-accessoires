import Link from "next/link";
import "./page.css";

import site from "@/data/site";

export const metadata = {
  title: "Conditions générales",
  description:
    "Conditions générales de WYZ Accessoires — objet, produits, commandes, paiement, livraison, responsabilité, contact, modifications.",
};

/**
 * Conditions générales.
 *
 * ⚠️ Les règles commerciales réelles seront ajoutées lorsque WYZ les
 *    aura fournies. Tout ce qui n'est pas connu est marqué
 *    « À compléter ».
 */
export default function ConditionsPage() {
  return (
    <div className="legal">
      {/* En-tête */}
      <header className="legal__header container">
        <p className="legal__eyebrow">Informations légales</p>
        <h1 className="legal__title">Conditions générales</h1>
        <p className="legal__updated">Dernière mise à jour : à compléter</p>
      </header>

      <article className="legal__content container">
        {/* 1. Objet */}
        <section className="legal__section">
          <h2 className="legal__section-title">1. Objet</h2>
          <p className="legal__text">
            Les présentes conditions générales encadrent l&apos;utilisation du
            site {site.name} et les modalités de commande des articles qui y
            sont présentés.
          </p>
          <p className="legal__text legal__text--muted">
            Informations complémentaires : à compléter.
          </p>
        </section>

        {/* 2. Produits */}
        <section className="legal__section">
          <h2 className="legal__section-title">2. Produits</h2>
          <p className="legal__text">
            Les produits proposés sont des créations artisanales réalisées à la
            main. Chaque pièce peut présenter de légères variations.
          </p>
          <p className="legal__text legal__text--muted">
            Détails complémentaires : à compléter.
          </p>
        </section>

        {/* 3. Commandes */}
        <section className="legal__section">
          <h2 className="legal__section-title">3. Commandes</h2>
          <p className="legal__text">
            Les commandes peuvent être passées via WhatsApp ou via le
            formulaire de commande du site.
          </p>
          <p className="legal__text legal__text--muted">
            Procédure détaillée de commande : à compléter.
          </p>
        </section>

        {/* 4. Paiement */}
        <section className="legal__section">
          <h2 className="legal__section-title">4. Paiement</h2>
          <p className="legal__text">
            Les modes de paiement ne sont pas encore définis.
          </p>
          <p className="legal__text legal__text--muted">
            Modes de paiement acceptés : à compléter.
          </p>
        </section>

        {/* 5. Livraison */}
        <section className="legal__section">
          <h2 className="legal__section-title">5. Livraison</h2>
          <p className="legal__text">
            Les modalités et frais de livraison ne sont pas encore définis.
          </p>
          <p className="legal__text legal__text--muted">
            Zones, délais et frais de livraison : à compléter.
          </p>
        </section>

        {/* 6. Responsabilité */}
        <section className="legal__section">
          <h2 className="legal__section-title">6. Responsabilité</h2>
          <p className="legal__text">
            Les informations concernant la responsabilité seront précisées
            ultérieurement.
          </p>
          <p className="legal__text legal__text--muted">
            Clauses de responsabilité : à compléter.
          </p>
        </section>

        {/* 7. Contact */}
        <section className="legal__section">
          <h2 className="legal__section-title">7. Contact</h2>
          <ul className="legal__contact">
            <li>
              <span className="legal__contact-label">Téléphone :</span>{" "}
              <a href={`tel:${site.phoneRaw}`} className="legal__link">
                {site.phoneIntl}
              </a>
            </li>
            <li>
              <span className="legal__contact-label">Email :</span>{" "}
              <a href={`mailto:${site.email}`} className="legal__link">
                {site.email}
              </a>
            </li>
          </ul>
        </section>

        {/* 8. Modifications */}
        <section className="legal__section">
          <h2 className="legal__section-title">8. Modifications</h2>
          <p className="legal__text">
            Les présentes conditions pourront être modifiées à tout moment.
          </p>
          <p className="legal__text legal__text--muted">
            Modalités de modification : à compléter.
          </p>
        </section>

        <div className="legal__back">
          <Link href="/" className="legal__back-link">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </article>
    </div>
  );
}