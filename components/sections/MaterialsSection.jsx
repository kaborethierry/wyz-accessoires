import SafeImage from "@/components/ui/SafeImage";
import "./MaterialsSection.css";

/**
 * MaterialsSection
 * Met en avant les matières / univers :
 *  - Pagne
 *  - Cuir local
 *  - Faso Danfani
 *  - Woodin
 *  - Bogolan
 *
 * Design : mosaïque de cartes visuelles.
 * Animation : hover avec zoom + reveal au scroll (via CSS).
 *
 * ⚠️ Aucune matière inventée : uniquement celles mentionnées dans
 *    les informations connues de WYZ.
 */
const materials = [
  {
    key: "pagne",
    name: "Koko Dunda Batik",
    image: "/images/materials/pagne.jpg",
  },
  {
    key: "cuir-local",
    name: "Cuir local",
    image: "/images/materials/cuir.jpg",
  },
  {
    key: "faso-danfani",
    name: "Batik",
    image: "/images/materials/faso-danfani.jpg",
  },
  {
    key: "woodin",
    name: "Koko Dunda Batik",
    image: "/images/materials/woodin.jpg",
  },
  {
    key: "bogolan",
    name: "Wax",
    image: "/images/materials/bogolan.jpg",
  },
];

export default function MaterialsSection() {
  return (
    <section className="materials" aria-label="Nos matières">
      <div className="container">
        <header className="materials__header">
          <h2 className="materials__title">Nos matières</h2>
          <p className="materials__subtitle">
            Des matières locales et soigneusement choisies pour chaque création.
          </p>
        </header>

        <div className="materials__grid">
          {materials.map((m, i) => (
            <article
              key={m.key}
              className="materials__card"
              style={{ "--i": i }}
            >
              <div className="materials__media">
                <SafeImage
                  src={m.image}
                  alt={m.name}
                  className="materials__img"
                  fallbackText={m.name}
                  fallbackClassName="materials__fallback"
                />
              </div>

              <div className="materials__body">
                <h3 className="materials__name">{m.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}