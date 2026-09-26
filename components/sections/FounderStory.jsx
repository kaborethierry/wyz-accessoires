import SafeImage from "@/components/ui/SafeImage";
import FounderVideo from "./FounderVideo";
import site from "@/data/site";
import "./FounderStory.css";

/**
 * FounderStory
 * Présente la promotrice de WYZ Accessoires : YAGUIBOU Zinatou Webikoura.
 *
 * - Photo : /images/brand/about-1.jpg
 * - Vidéo : lien TikTok (via FounderVideo)
 * - Texte soutenu + mots-clés en gras italique (police spéciale)
 */
export default function FounderStory() {
  const f = site.founder;

  return (
    <section className="founder" aria-label="Notre promotrice">
      <div className="container founder__inner">
        {/* Média : photo + CTA vidéo TikTok */}
        <div className="founder__media">
          <div className="founder__portrait">
            <SafeImage
              src="/images/brand/about-1.jpg"
              alt={f.name}
              className="founder__img"
              fallbackText="WYZ"
              fallbackClassName="founder__fallback"
            />
          </div>

          <FounderVideo videoUrl={f.tiktokVideoUrl} />
        </div>

        {/* Texte */}
        <div className="founder__content">
          <p className="founder__eyebrow">Notre promotrice</p>

          <h2 className="founder__name">{f.name}</h2>

          <p className="founder__title">{f.title}</p>

          <p className="founder__text">
            Diplômée en{" "}
            <strong className="founder__strong">Génie Biomédical</strong>,{" "}
            <strong className="founder__strong">{f.name}</strong> initie
            l&apos;aventure{" "}
            <strong className="founder__strong">WYZ Accessoires</strong> en{" "}
            <strong className="founder__strong">{f.startYear}</strong>, alors
            qu&apos;elle poursuit encore ses études. Un pari audacieux, porté par
            une conviction intime : transformer une passion en véritable
            activité économique.
          </p>

          <p className="founder__text">
            En <strong className="founder__strong">{f.sewingMachineYear}</strong>,
            elle fait l&apos;acquisition de sa{" "}
            <strong className="founder__strong">
              première machine à coudre
            </strong>{" "}
            et poursuit son chemin, en parallèle de son parcours académique. Le
            déclic survient en{" "}
            <strong className="founder__strong">{f.dedicationYear}</strong>, au
            moment de son mariage : concilier les deux vocations devenant
            difficile, elle choisit de se consacrer pleinement à sa passion, car
            le métier de{" "}
            <strong className="founder__strong">
              technicienne biomédicale
            </strong>{" "}
            exige une présence constante sur le terrain.
          </p>

          <p className="founder__highlight">
            🎬 Découvrez son parcours en vidéo ci-contre.
          </p>
        </div>
      </div>
    </section>
  );
}