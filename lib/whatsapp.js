// lib/whatsapp.js
// Centralise toute la logique WhatsApp pour WYZ Accessoires.
// Si le numéro change, on ne modifie QUE ce fichier.

import site from "@/data/site";

/**
 * Numéro WhatsApp officiel (format international sans "+", sans espaces).
 */
export const WHATSAPP_NUMBER = site.whatsapp; // "+22664450152"

/**
 * Numéro nettoyé (chiffres uniquement) pour wa.me
 */
export const WHATSAPP_NUMBER_CLEAN = WHATSAPP_NUMBER.replace(/\D/g, "");

/**
 * Construit un lien wa.me avec message optionnel.
 */
export function buildWhatsAppLink(message = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER_CLEAN}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Message général
 */
export function generalMessage() {
  return `Bonjour WYZ Accessoires, je souhaite avoir des informations.`;
}

/**
 * URL produit déterministe (SSR-safe). Utilise site.seo.url.
 */
export function productUrlFor(product) {
  if (!product) return "";
  return `${site.seo.url}/produit/${product.slug}`;
}

/**
 * Message pour un produit précis.
 */
export function productMessage(product, quantity = 1, productUrl = "") {
  if (!product) return generalMessage();

  const lines = [
    `Bonjour WYZ Accessoires,`,
    ``,
    `Je suis intéressé(e) par ce produit :`,
    `• ${product.name}`,
    `• Prix : ${product.priceDisplay ?? "Prix sur demande"}`,
  ];

  if (quantity && quantity > 1) {
    lines.push(`• Quantité : ${quantity}`);
  }

  if (productUrl) {
    lines.push(``, `Lien : ${productUrl}`);
  }

  lines.push(``, `Merci de me donner plus d'informations.`);
  return lines.join("\n");
}

/**
 * Message pour un panier complet.
 */
export function cartMessage(items = [], total = 0, totalDisplay = "") {
  if (!items.length) return generalMessage();

  const lines = [
    `Bonjour WYZ Accessoires,`,
    ``,
    `Je souhaite commander les articles suivants :`,
    ``,
  ];

  items.forEach((it, index) => {
    const priceLabel = it.priceDisplay ?? "Prix sur demande";
    lines.push(
      `${index + 1}. ${it.name}`,
      `   Quantité : ${it.quantity}`,
      `   Prix : ${priceLabel}`
    );
  });

  lines.push(``);
  if (totalDisplay) {
    lines.push(`Total (hors prix sur demande) : ${totalDisplay}`);
    lines.push(``);
  }
  lines.push(`Merci de me confirmer la disponibilité et la livraison.`);

  return lines.join("\n");
}

/**
 * Liens WhatsApp prêts à l'emploi
 */
export function whatsappGeneralLink() {
  return buildWhatsAppLink(generalMessage());
}

export function whatsappProductLink(product, quantity = 1) {
  return buildWhatsAppLink(
    productMessage(product, quantity, productUrlFor(product))
  );
}

export function whatsappCartLink(items = [], total = 0, totalDisplay = "") {
  return buildWhatsAppLink(cartMessage(items, total, totalDisplay));
}

export default {
  WHATSAPP_NUMBER,
  WHATSAPP_NUMBER_CLEAN,
  buildWhatsAppLink,
  generalMessage,
  productMessage,
  productUrlFor,
  cartMessage,
  whatsappGeneralLink,
  whatsappProductLink,
  whatsappCartLink,
};