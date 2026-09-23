// data/categories.js
// Définition des catégories de produits WYZ Accessoires.
// Les images pointent vers /images/categories/{slug}.jpeg
// Tant qu'un fichier est absent, un fallback "WYZ" s'affiche côté composant.

export const categories = [
  {
    slug: "sacs",
    name: "Sacs",
    description: "Sacs artisanaux en jute et wax",
    image: "/images/categories/sacs.jpeg",
  },
  {
    slug: "trousses",
    name: "Trousses",
    description: "Trousses et accessoires en jute et wax",
    image: "/images/categories/trousses.jpeg",
  },
  {
    slug: "enfant",
    name: "Enfant",
    description: "Accessoires pour enfant",
    image: "/images/categories/enfant.jpeg",
  },
  {
    slug: "maison",
    name: "Maison",
    description: "Articles pour la maison en jute et wax",
    image: "/images/categories/maison.jpeg",
  },
];

export default categories;