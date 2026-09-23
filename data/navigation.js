// data/navigation.js
// Liens de navigation du site WYZ Accessoires

export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Catégories", href: "/categorie/sacs" },
  { label: "Galerie", href: "/galerie" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  boutique: [
    { label: "Tous les produits", href: "/boutique" },
    { label: "Sacs", href: "/categorie/sacs" },
    { label: "Trousses", href: "/categorie/trousses" },
    { label: "Enfant", href: "/categorie/enfant" },
    { label: "Maison", href: "/categorie/maison" },
  ],
  informations: [
    { label: "À propos", href: "/a-propos" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Galerie", href: "/galerie" },
  ],
  compte: [
    { label: "Panier", href: "/panier" },
    { label: "Favoris", href: "/favoris" },
    { label: "Commande", href: "/commande" },
  ],
  legal: [
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "Conditions", href: "/conditions" },
  ],
};

export default { mainNav, footerNav };