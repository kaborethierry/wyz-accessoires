import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import "./CompanyServices.css";

/**
 * CompanyServices
 * Met en avant les deux offres complémentaires :
 *  - Prestations entreprises (gadgets personnalisés)
 *  - Formations sur demande
 *
 * ⚠️ Photos : /images/gallery/i1.jpeg → i4.jpeg
 */
export default function CompanyServices() {
  return (
    <section className="services" aria-label="Prestations et formations">
      <div className="container">
        <header className="services__header">
          <p className="services__eyebrow">Au-delà de la boutique</p>
          <h2 className="services__title">Nos prestations</h2>
          <p className="services__subtitle">
            WYZ Accessoires accompagne également les entreprises et transmet
            son savoir-faire.
          </p>
        </header>

        <div className="services__grid">
          {/* -------- Prestations entreprises -------- */}
          <article className="services__card">
            <div className="services__media">
              <SafeImage
                src="/images/gallery/i1.jpeg"
                alt="Gadgets personnalisés pour entreprises"
                className="services__img"
                fallbackText="WYZ"
                fallbackClassName="services__fallback"
              />
            </div>

            <div className="services__body">
              <h3 className="services__card-title">
                Prestations entreprises
              </h3>
              <p className="services__text">
                Nous réalisons des <strong>gadgets personnalisés</strong> pour
                les entreprises : objets utiles et esthétiques, à votre image.
              </p>
              <Link href="/contact" className="services__link">
                Demander un devis
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>

          {/* -------- Formations -------- */}
          <article className="services__card">
            <div className="services__media">
              <SafeImage
                src="/images/gallery/i2.jpeg"
                alt="Formations artisanales WYZ"
                className="services__img"
                fallbackText="WYZ"
                fallbackClassName="services__fallback"
              />
            </div>

            <div className="services__body">
              <h3 className="services__card-title">Formations</h3>
              <p className="services__text">
                WYZ Accessoires propose des <strong>formations</strong> pour
                apprendre les techniques de création artisanale.
                Disponibles <strong>sur demande</strong>.
              </p>
              <Link href="/contact" className="services__link">
                Se renseigner
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}