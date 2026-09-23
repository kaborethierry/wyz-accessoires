import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import "./BrandStory.css";

/**
 * BrandStory
 * Raconte l'univers WYZ.
 *
 * ⚠️ Uniquement informations connues :
 *    - WYZ Accessoires
 *    - Artisanat en jute et wax
 *    - Basé au Burkina Faso
 *    - Contact WhatsApp / email
 *
 * Aucun slogan officiel, aucune histoire romancée inventée.
 */
export default function BrandStory() {
  return (
    <section className="brand-story" aria-label="À propos de WYZ">
      <div className="container brand-story__inner">
        {/* Image */}
        <div className="brand-story__media">
          <div className="brand-story__media-inner">
            <SafeImage
              src="/images/brand/story.jpg"
              alt="Atelier WYZ Accessoires"
              className="brand-story__img"
              fallbackText="WYZ"
              fallbackClassName="brand-story__media-fallback"
            />
          </div>
        </div>

        {/* Texte */}
        <div className="brand-story__content">
          <p className="brand-story__eyebrow">Notre histoire</p>

          <h2 className="brand-story__title">
            WYZ Accessoires, fait main au Burkina Faso
          </h2>

          <p className="brand-story__text">
            WYZ Accessoires crée des sacs, trousses, accessoires enfant et
            articles maison à partir de jute et de wax. Chaque pièce est
            confectionnée avec soin.
          </p>

          <p className="brand-story__text">
            Nous proposons également des créations en pagne, cuir local,
            Faso Danfani, Woodin et bogolan. Pour toute question ou commande,
            contactez-nous directement sur WhatsApp.
          </p>

          <Link href="/a-propos" className="brand-story__link">
            En savoir plus
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}