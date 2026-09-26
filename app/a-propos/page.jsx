import Link from "next/link";
import "./page.css";

import Reveal from "@/components/animations/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import site from "@/data/site";

export const metadata = {
  title: "À propos",
  description:
    "WYZ Accessoires — L'utile autrement. Découvrez l'histoire de YAGUIBOU Zinatou Webikoura, fondatrice, et nos créations artisanales en jute, wax, batik et koko dunda.",
};

/**
 * Page À propos.
 *
 * Contenu réel :
 *  - Histoire de la marque
 *  - Parcours de la promotrice
 *  - Nos matières (corrigées)
 *  - Nos valeurs
 *  - Prestations entreprises + formations
 */
export default function AProposPage() {
  const f = site.founder;

  return (
    <div className="a-propos">
      {/* ---------------------------------------------------------
          En-tête
          --------------------------------------------------------- */}
      <header className="a-propos__header container">
        <Reveal direction="up">
          <p className="a-propos__eyebrow">Notre univers</p>
          <h1 className="a-propos__title">À propos de WYZ Accessoires</h1>
          <p className="a-propos__subtitle">{site.sloganPhrase}</p>
        </Reveal>
      </header>

      {/* ---------------------------------------------------------
          Section 1 : Créations artisanales (image gauche, texte droite)
          --------------------------------------------------------- */}
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
            en petites séries, dans notre atelier au Burkina Faso.
          </p>
          <p className="a-propos__text">
            Nous créons des pièces <strong>utiles</strong>,{" "}
            <strong>créatives</strong> et <strong>authentiques</strong>, à
            partir de matières locales soigneusement choisies.
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------
          Section 2 : La promotrice (texte gauche, image droite)
          --------------------------------------------------------- */}
      <section
        className="a-propos__section a-propos__section--reverse container"
        aria-label="La promotrice"
      >
        <Reveal direction="left" className="a-propos__content">
          <p className="a-propos__eyebrow a-propos__eyebrow--inline">
            Notre promotrice
          </p>
          <h2 className="a-propos__section-title">{f.name}</h2>
          <p className="a-propos__lead">
            {f.diploma} — Fondatrice de WYZ Accessoires
          </p>

          <p className="a-propos__text">
            Diplômée en <strong>Génie Biomédical</strong>, {f.name} initie
            l&apos;aventure <strong>WYZ Accessoires</strong> en{" "}
            <strong>{f.startYear}</strong>, alors qu&apos;elle poursuit encore
            ses études. Une aventure qui démarre avec peu de moyens, mais portée
            par une conviction : transformer une passion en véritable activité
            économique.
          </p>

          <p className="a-propos__text">
            En <strong>{f.sewingMachineYear}</strong>, elle acquiert sa{" "}
            <strong>première machine à coudre</strong> et continue à avancer, en
            parallèle de ses études. Le déclic survient en{" "}
            <strong>{f.dedicationYear}</strong>, lorsqu&apos;elle se marie :
            difficile de concilier les deux métiers, elle choisit finalement de
            se consacrer pleinement à <strong>WYZ Accessoires</strong>, sa
            passion, car le métier de{" "}
            <strong>technicienne biomédicale</strong> exige d&apos;être
            constamment sur le terrain.
          </p>

          {f.tiktokVideoUrl && (
            <a
              href={f.tiktokVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="a-propos__video-link"
            >
              ▶ Découvrez son parcours en vidéo
            </a>
          )}
        </Reveal>

        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-2.jpg"
              alt={`Portrait de ${f.name}, fondatrice de WYZ Accessoires`}
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------
          Section 3 : Nos matières (image gauche, texte droite)
          --------------------------------------------------------- */}
      <section
        className="a-propos__section container"
        aria-label="Nos matières"
      >
        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-1.jpg"
              alt="Matières utilisées par WYZ"
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>

        <Reveal direction="left" className="a-propos__content">
          <h2 className="a-propos__section-title">Nos matières</h2>
          <p className="a-propos__text">
            Nous travaillons uniquement des matières locales, choisies pour leur
            qualité et leur authenticité.
          </p>
          <ul className="a-propos__list">
            <li>Pagne</li>
            <li>Cuir local</li>
            <li>Batik</li>
            <li>Koko Dunda Batik</li>
            <li>Wax</li>
          </ul>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------
          Section 4 : Nos valeurs (texte gauche, image droite)
          --------------------------------------------------------- */}
      <section
        className="a-propos__section a-propos__section--reverse container"
        aria-label="Nos valeurs"
      >
        <Reveal direction="left" className="a-propos__content">
          <h2 className="a-propos__section-title">Nos valeurs</h2>
          <p className="a-propos__text">
            Cinq principes guident chacune de nos créations :
          </p>
          <ul className="a-propos__values">
            {site.values.map((v) => (
              <li key={v} className="a-propos__value">
                <span className="a-propos__value-dot" aria-hidden="true" />
                <span className="a-propos__value-label">{v}</span>
              </li>
            ))}
          </ul>
          <p className="a-propos__text a-propos__text--muted">
            Utile • Créatif • Local • Authentique • Engagé
          </p>
        </Reveal>

        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-2.jpg"
              alt="Valeurs WYZ Accessoires"
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------
          Section 5 : Prestations & Formations
          --------------------------------------------------------- */}
      <section
        className="a-propos__section container"
        aria-label="Prestations et formations"
      >
        <Reveal direction="right" className="a-propos__media">
          <div className="a-propos__media-inner">
            <SafeImage
              src="/images/brand/about-1.jpg"
              alt="Prestations entreprises WYZ"
              className="a-propos__img"
              fallbackText="WYZ"
              fallbackClassName="a-propos__fallback"
            />
          </div>
        </Reveal>

        <Reveal direction="left" className="a-propos__content">
          <h2 className="a-propos__section-title">
            Prestations & Formations
          </h2>
          <p className="a-propos__text">
            Au-delà de la boutique, WYZ Accessoires accompagne les{" "}
            <strong>entreprises</strong> et transmet son savoir-faire à travers
            des <strong>formations</strong>.
          </p>

          <ul className="a-propos__services">
            <li className="a-propos__service">
              <h3 className="a-propos__service-title">
                Prestations entreprises
              </h3>
              <p className="a-propos__service-text">
                Réalisation de <strong>gadgets personnalisés</strong> :
                objets utiles et esthétiques à l&apos;image de votre entreprise.
              </p>
            </li>
            <li className="a-propos__service">
              <h3 className="a-propos__service-title">Formations</h3>
              <p className="a-propos__service-text">
                Apprentissage des techniques de création artisanale.{" "}
                <strong>Sur demande.</strong>
              </p>
            </li>
          </ul>

          <Link href="/contact" className="a-propos__services-link">
            Nous contacter pour un devis
            <span aria-hidden="true"> →</span>
          </Link>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------
          CTA final
          --------------------------------------------------------- */}
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