import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import "./GalleryPreview.css";

/**
 * GalleryPreview
 * Extrait de la galerie (photos réelles uniquement).
 *
 * ⚠️ Tant que les photos ne sont pas fournies, on affiche des slots
 *    avec un fond dégradé et le label WYZ — aucune image inventée.
 *
 * Interaction : clic → /galerie
 */
const slots = [
  "/images/gallery/01.jpeg",
  "/images/gallery/02.jpeg",
  "/images/gallery/03.jpeg",
  "/images/gallery/04.jpeg",
  "/images/gallery/05.jpeg",
  "/images/gallery/06.jpeg",
];

export default function GalleryPreview() {
  return (
    <section className="gallery-preview" aria-label="Aperçu de la galerie">
      <div className="container">
        <header className="gallery-preview__header">
          <h2 className="gallery-preview__title">Galerie</h2>
          <p className="gallery-preview__subtitle">
            Quelques réalisations WYZ Accessoires.
          </p>
        </header>

        <div className="gallery-preview__grid">
          {slots.map((src, i) => (
            <Link
              key={i}
              href="/galerie"
              className="gallery-preview__item"
              style={{ "--i": i }}
              aria-label="Voir la galerie complète"
            >
              <SafeImage
                src={src}
                alt=""
                className="gallery-preview__img"
                fallbackText="WYZ"
                fallbackClassName="gallery-preview__fallback"
              />
              <span className="gallery-preview__overlay" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <div className="gallery-preview__cta">
          <Link href="/galerie" className="gallery-preview__cta-btn">
            Voir toute la galerie
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}