import Link from "next/link";
import "./page.css";

import site from "@/data/site";

export const metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de WYZ Accessoires — données collectées, utilisation, conservation, droits et contact.",
};

/**
 * Politique de confidentialité.
 *
 * ⚠️ Tous les éléments juridiques non fournis sont marqués
 *    « À compléter » et ne doivent pas être remplacés par des
 *    formulations inventées.
 */
export default function ConfidentialitePage() {
  return (
    <div className="legal">
      {/* En-tête */}
      <header className="legal__header container">
        <p className="legal__eyebrow">Informations légales</p>
        <h1 className="legal__title">Politique de confidentialité</h1>
        <p className="legal__updated">Dernière mise à jour : à compléter</p>
      </header>

      <article className="legal__content container">
        {/* 1. Introduction */}
        <section className="legal__section">
          <h2 className="legal__section-title">1. Introduction</h2>
          <p className="legal__text">
            La présente politique de confidentialité décrit la manière dont{" "}
            {site.name} traite les informations transmises par les visiteurs du
            site.
          </p>
          <p className="legal__text legal__text--muted">
            Informations complémentaires : à compléter.
          </p>
        </section>

        {/* 2. Données collectées */}
        <section className="legal__section">
          <h2 className="legal__section-title">2. Données collectées</h2>
          <p className="legal__text">
            Les données collectées via le site peuvent inclure les informations
            transmises volontairement par l&apos;utilisateur, notamment via les
            formulaires ou les échanges WhatsApp.
          </p>
          <p className="legal__text legal__text--muted">
            Liste précise des données : à compléter.
          </p>
        </section>

        {/* 3. Utilisation */}
        <section className="legal__section">
          <h2 className="legal__section-title">3. Utilisation des données</h2>
          <p className="legal__text">
            Les informations transmises sont utilisées pour répondre aux
            demandes et traiter les commandes.
          </p>
          <p className="legal__text legal__text--muted">
            Finalités détaillées : à compléter.
          </p>
        </section>

        {/* 4. Conservation */}
        <section className="legal__section">
          <h2 className="legal__section-title">4. Conservation</h2>
          <p className="legal__text">
            Les durées de conservation des données ne sont pas encore définies.
          </p>
          <p className="legal__text legal__text--muted">
            Durées de conservation : à compléter.
          </p>
        </section>

        {/* 5. Droits */}
        <section className="legal__section">
          <h2 className="legal__section-title">5. Droits des utilisateurs</h2>
          <p className="legal__text">
            Pour toute question relative à vos données, vous pouvez nous
            contacter via les coordonnées ci-dessous.
          </p>
          <p className="legal__text legal__text--muted">
            Droits applicables et procédure détaillée : à compléter.
          </p>
        </section>

        {/* 6. Contact */}
        <section className="legal__section">
          <h2 className="legal__section-title">6. Contact</h2>
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

        <div className="legal__back">
          <Link href="/" className="legal__back-link">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </article>
    </div>
  );
}