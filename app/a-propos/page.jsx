import Link from "next/link";
import "./page.css";

import Reveal from "@/components/animations/Reveal";
import SafeImage from "@/components/ui/SafeImage";

export const metadata = {
  title: "À propos",
  description:
    "WYZ Accessoires — créations artisanales en jute et wax, pagne, cuir local, Faso Danfani, Woodin et bogolan.",
};

/**
 * Page À propos.
 *
 * ⚠️ Informations non fournies : « À compléter ».
 */
export default function AProposPage() {
  return (
    <div className="a-propos">
      {/* En-tête */}
      <header className="a-propos__header container">
        <Reveal direction="up">
          <p className="a-propos__eyebrow">Notre univers</p>
          <h1 className="a-propos__title">À propos de WYZ Accessoires</h1>
          <p className="a-propos__subtitle">
            WYZ Accessoires crée des sacs, trousses, accessoires enfant et
            articles maison à partir de matières locales, travaillées à la main.
          </p>
        </Reveal>
      </header>

      {/* Section 1 : image gauche, texte droite */}
      <section
        className="a-propos__section container"
        aria-label="Créations artisanales"
      >
        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-1.jpg"
              alt="Créations artisanales WYZ"
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>

        <Reveal direction="left" className="a-propos__content">
          <h2 className="a-propos__section-title">Créations artisanales</h2>
          <p className="a-propos__text">
            Chaque pièce est confectionnée avec soin : sacs, trousses,
            accessoires enfant et articles maison. Le travail se fait à la main,
            en petites séries.
          </p>
          <p className="a-propos__text a-propos__text--muted">
            Informations complémentaires : à compléter.
          </p>
        </Reveal>
      </section>

      {/* Section 2 : texte gauche, image droite */}
      <section
        className="a-propos__section a-propos__section--reverse container"
        aria-label="Nos matières"
      >
        <Reveal direction="left" className="a-propos__content">
          <h2 className="a-propos__section-title">Nos matières</h2>
          <ul className="a-propos__list">
            <li>Pagne</li>
            <li>Cuir local</li>
            <li>Faso Danfani</li>
            <li>Woodin</li>
            <li>Bogolan</li>
          </ul>
          <p className="a-propos__text a-propos__text--muted">
            Informations complémentaires : à compléter.
          </p>
        </Reveal>

        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-2.jpg"
              alt="Matières utilisées par WYZ"
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="a-propos__cta container">
        <Reveal direction="up">
          <h2 className="a-propos__cta-title">Découvrir nos créations</h2>
          <div className="a-propos__cta-actions">
            <Link
              href="/boutique"
              className="a-propos__btn a-propos__btn--primary"
            >
              Voir la boutique
            </Link>
            <Link
              href="/contact"
              className="a-propos__btn a-propos__btn--ghost"
            >
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}