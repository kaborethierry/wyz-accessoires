// lib/seo.js
// Centralise les fonctions SEO : title, description, Open Graph, données structurées futures.

import site from "@/data/site";

const DEFAULT_TITLE = site.seo.defaultTitle;
const TITLE_TEMPLATE = site.seo.titleTemplate;
const DEFAULT_DESCRIPTION = site.seo.description;
const DEFAULT_URL = site.seo.url;
const DEFAULT_LOCALE = site.seo.locale;
const DEFAULT_KEYWORDS = site.seo.keywords;
const DEFAULT_IMAGE = site.logo;

/**
 * Construit un objet Metadata compatible Next.js App Router.
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {string} [options.path]
 * @param {string} [options.image]
 * @param {string[]} [options.keywords]
 */
export function buildMetadata(options = {}) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path = "",
    image = DEFAULT_IMAGE,
    keywords = DEFAULT_KEYWORDS,
  } = options;

  const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : DEFAULT_TITLE;
  const url = `${DEFAULT_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(DEFAULT_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: DEFAULT_LOCALE,
      type: "website",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : [],
    },
  };
}

/**
 * Données structurées : Organisation.
 * (à étendre plus tard avec Product, BreadcrumbList, etc.)
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: DEFAULT_URL,
    logo: `${DEFAULT_URL}${site.logo}`,
    email: site.email,
    telephone: site.phoneIntl,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.address.country,
    },
  };
}

/**
 * Données structurées : Produit.
 * Utilisable plus tard sur /produit/[slug].
 * @param {object} product
 * @param {string} productUrl
 */
export function productJsonLd(product, productUrl) {
  if (!product) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
  };

  if (product.price != null) {
    data.offers = {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "XOF",
      availability: "https://schema.org/InStock",
      url: productUrl,
    };
  }

  return data;
}

export default {
  buildMetadata,
  organizationJsonLd,
  productJsonLd,
};