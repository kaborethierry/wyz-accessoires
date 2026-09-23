// lib/formatters.js
// Normaliser l'affichage : prix, "Prix sur demande", noms, slugs.

/**
 * Formate un prix en FCFA avec espace comme séparateur de milliers.
 * Exemple : 13000 → "13 000 FCFA"
 * @param {number} amount
 */
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return "Prix sur demande";
  return `${Number(amount).toLocaleString("fr-FR").replace(/\u202f/g, " ")} FCFA`;
}

/**
 * Renvoie "Prix sur demande" si amount est null/undefined.
 * Sinon, formate.
 * @param {number|null} amount
 */
export function formatPriceOrAsk(amount) {
  if (amount == null) return "Prix sur demande";
  return formatPrice(amount);
}

/**
 * Formate un nom : trim + capitalisation douce.
 * On ne touche pas aux majuscules internes déjà présentes.
 * @param {string} name
 */
export function formatName(name) {
  if (!name || typeof name !== "string") return "";
  return name.trim();
}

/**
 * Transforme un texte en slug propre.
 * Exemple : "Caba effiloché Madina" → "caba-effiloche-madina"
 * @param {string} text
 */
export function slugify(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Tronque un texte proprement.
 * @param {string} text
 * @param {number} max
 */
export function truncate(text, max = 120) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Formate un numéro de téléphone pour affichage.
 * Ici on garde simplement la valeur telle quelle si déjà formatée.
 * @param {string} phone
 */
export function formatPhone(phone) {
  if (!phone) return "";
  return String(phone).trim();
}

export default {
  formatPrice,
  formatPriceOrAsk,
  formatName,
  slugify,
  truncate,
  formatPhone,
};